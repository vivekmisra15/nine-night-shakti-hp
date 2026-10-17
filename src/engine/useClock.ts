// The clock: one time value (t, in seconds) that drives a beat's animation.
//
// - play / pause / toggle
// - replay: back to the start
// - slow motion: everything runs at SLOW_RATE, either because the learner
//   switched it on (S key) or because t is inside the beat's slow-motion window
// - freeze-frames: the clock stops by itself at each time in `freezeAt`;
//   play (Space) continues from there
// - when t reaches `duration`, the clock stops and `ended` becomes true
//
// Other parts of the app (the music, later) can read `rate` and `playing`.

import { useCallback, useEffect, useRef, useState } from 'react';

export const SLOW_RATE = 0.35;

export interface ClockOptions {
  duration: number; // seconds; Infinity for beats that just loop ambient motion
  freezeAt?: number[];
  slowMo?: { from: number; to: number };
  slowMotion: boolean; // the learner's slow-motion switch
  autoPlay: boolean;
  resetKey: string; // a new key (for example a new beat) restarts the clock
}

export function useClock({ duration, freezeAt = [], slowMo, slowMotion, autoPlay, resetKey }: ClockOptions) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [frozen, setFrozen] = useState(false);

  // The animation loop reads these through refs, so it never uses stale values.
  const tRef = useRef(0);
  const passedFreezes = useRef(new Set<number>());

  const inSlowWindow = slowMo !== undefined && t >= slowMo.from && t < slowMo.to;
  const rate = slowMotion || inSlowWindow ? SLOW_RATE : 1;
  const rateRef = useRef(rate);
  rateRef.current = rate;

  const freezeKey = freezeAt.join(',');

  // Start again whenever the beat changes.
  useEffect(() => {
    tRef.current = 0;
    passedFreezes.current = new Set();
    setT(0);
    setFrozen(false);
    setPlaying(autoPlay);
  }, [resetKey, autoPlay]);

  // The animation loop: runs only while playing.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Cap the step so a background tab doesn't jump far ahead.
      const dt = Math.min((now - last) / 1000, 0.1) * rateRef.current;
      last = now;
      let next = tRef.current + dt;

      // Stop at the first freeze-frame we cross.
      const freeze = freezeAt.find((f) => f > tRef.current && f <= next && !passedFreezes.current.has(f));
      if (freeze !== undefined) {
        passedFreezes.current.add(freeze);
        tRef.current = freeze;
        setT(freeze);
        setFrozen(true);
        setPlaying(false);
        return;
      }

      if (next >= duration) {
        next = duration;
        tRef.current = next;
        setT(next);
        setPlaying(false);
        return;
      }

      tRef.current = next;
      setT(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // freezeKey stands in for freezeAt, which is a new array on every render.
  }, [playing, duration, freezeKey]);

  const ended = Number.isFinite(duration) && t >= duration;

  const play = useCallback(() => {
    setFrozen(false);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => setPlaying(false), []);

  const replay = useCallback(() => {
    tRef.current = 0;
    passedFreezes.current = new Set();
    setT(0);
    setFrozen(false);
    setPlaying(true);
  }, []);

  // Jump to a time (tapping an earlier sentence, or dragging the progress
  // bar). Freeze-frames after that time will stop the clock again.
  const seek = useCallback(
    (to: number) => {
      const next = Math.max(0, Math.min(to, Number.isFinite(duration) ? duration : to));
      tRef.current = next;
      passedFreezes.current = new Set([...passedFreezes.current].filter((f) => f <= next));
      setT(next);
      setFrozen(false);
    },
    [duration],
  );

  // Jump straight to the end, for example in Reading mode.
  const finish = useCallback(() => {
    if (!Number.isFinite(duration)) return;
    tRef.current = duration;
    setT(duration);
    setPlaying(false);
    setFrozen(false);
  }, [duration]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else if (ended) replay();
    else play();
  }, [playing, ended, pause, play, replay]);

  return { t, playing, frozen, ended, rate, play, pause, toggle, replay, finish, seek };
}

export type Clock = ReturnType<typeof useClock>;
