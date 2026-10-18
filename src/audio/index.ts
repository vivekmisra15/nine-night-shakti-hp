// How the rest of the app talks to the sound. Components use these few
// functions and the useScore hook; everything else in src/audio is internal.

import { useEffect, useRef } from 'react';
import type { Beat, Raga } from '../content/types';
import type { Settings } from '../state/progress';
import { applySettings, getBuses, musicLevel, unlock } from './engine';
import { type BeatScore, Score } from './score';

export { unlock, musicLevel };

let score: Score | null = null;

// The score exists once sound has been unlocked by a tap or click.
function getScore() {
  const buses = getBuses();
  if (!buses) return null;
  if (!score) score = new Score(buses);
  return score;
}

// For the activity timer: duck the music while it runs, and tick.
export function setActivity(on: boolean) {
  getScore()?.setActivity(on);
}
export function playEffect(name: 'tick' | 'hotspot') {
  getScore()?.effect(name);
}
export function sendCue(name: string) {
  getScore()?.cue(name);
}
export function playClosing(raga?: Raga) {
  getScore()?.closing(raga);
}
export function stopMusic() {
  getScore()?.stop();
}

// The calm music under the opening splash and the map. It starts once sound
// is unlocked (the first tap), and fades when a night begins.
export function useSplashMusic(settings: Settings, active: boolean) {
  const latest = useRef(settings);
  latest.current = settings;

  useEffect(() => {
    applySettings(settings);
    getScore()?.setEnabled(settings.music && !settings.muted);
  }, [settings]);

  useEffect(() => {
    if (!active) return;
    let started = false;
    const id = setInterval(() => {
      const s = getScore();
      if (!s) return;
      if (!started) {
        started = true;
        applySettings(latest.current);
        s.setEnabled(latest.current.music && !latest.current.muted);
        s.playSplash();
      }
      s.tick();
    }, 50);
    return () => {
      clearInterval(id);
      if (started) stopMusic();
    };
  }, [active]);
}

interface UseScoreOptions {
  beat: Beat;
  plan: BeatScore | undefined;
  t: number;
  playing: boolean;
  slow: boolean;
  settings: Settings;
}

// Keeps the score in step with the night player: the current beat, the
// clock (t, playing, slow motion) and the settings.
export function useScore({ beat, plan, t, playing, slow, settings }: UseScoreOptions) {
  const current = useRef<string | null>(null);
  const transport = useRef({ t, playing, slow });
  transport.current = { t, playing, slow };

  useEffect(() => {
    applySettings(settings);
    getScore()?.setEnabled(settings.music && !settings.muted);
  }, [settings]);

  // Every 50 ms: start the beat's score if needed (sound may only just have
  // been unlocked), pass on the clock, and schedule what's due next.
  useEffect(() => {
    const id = setInterval(() => {
      const s = getScore();
      if (!s) return;
      if (current.current !== beat.id) {
        current.current = beat.id;
        s.setEnabled(settings.music && !settings.muted);
        s.setBeat(beat, plan ?? {});
      }
      s.setTransport(transport.current);
      s.tick();
    }, 50);
    return () => clearInterval(id);
  }, [beat, plan, settings.music, settings.muted]);

  // Leaving the night: fade everything out.
  useEffect(() => () => stopMusic(), []);
}
