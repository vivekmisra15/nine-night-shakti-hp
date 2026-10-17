// The audio engine: one audio context, three buses with their own volume
// (music, ambience, effects), and a master chain that keeps the level safe.
//
//   music ─┐
//   ambience ─┼─► compressor ─► limiter ─► output (−1 dB) ─► speakers
//   effects ─┘
//
// Browsers only allow sound after the user has tapped or clicked something,
// so nothing is created until unlock() is called from a click.

import type { Settings } from '../state/progress';
import { noise } from './voices';

export interface Buses {
  ctx: BaseAudioContext;
  music: GainNode; // the score's layers connect here (through musicTone)
  musicTone: BiquadFilterNode; // softened in slow motion
  ambience: GainNode;
  effects: GainNode;
  analyser: AnalyserNode; // measures the music's level, for music-reactive light
  output: GainNode;
}

// Build the buses and the master chain on any audio context. (The level
// check runs this same chain on an offline context.)
export function buildBuses(ctx: BaseAudioContext): Buses {
  // The very last stage: a gentle clipper that can never go above −1 dBFS
  // (0.89). Web Audio's compressors add their own "makeup" gain, so this is
  // what actually guarantees the sound never clips. Quiet sounds pass
  // through it unchanged; only peaks near the ceiling are rounded off.
  const CEILING = 0.89;
  const ceiling = ctx.createWaveShaper();
  const curve = new Float32Array(2049);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1; // −1 to 1
    const input = x * 2; // the curve covers inputs up to ±2 (+6 dB over)
    curve[i] = Math.abs(input) < 0.6 ? input : Math.sign(input) * (0.6 + (CEILING - 0.6) * Math.tanh((Math.abs(input) - 0.6) / (CEILING - 0.6)));
  }
  ceiling.curve = curve;
  ceiling.connect(ctx.destination);
  // The curve above expects its input halved (so it can cover ±2).
  const output = ctx.createGain();
  output.gain.value = 0.5 * 0.7; // and a trim of about −3 dB, for headroom
  output.connect(ceiling);

  // A brick-wall-style limiter: anything over −3 dB is held down hard.
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.002;
  limiter.release.value = 0.1;
  limiter.connect(output);

  // A gentle compressor that glues the layers together.
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 8;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.25;
  compressor.connect(limiter);

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;

  const music = ctx.createGain();
  const musicTone = ctx.createBiquadFilter();
  musicTone.type = 'lowpass';
  musicTone.frequency.value = 16000;
  musicTone.connect(music);
  music.connect(compressor);
  music.connect(analyser);

  const ambience = ctx.createGain();
  ambience.connect(compressor);
  const effects = ctx.createGain();
  effects.connect(compressor);

  return { ctx, music, musicTone, ambience, effects, analyser, output };
}

let buses: Buses | null = null;
let settings: Settings | null = null;

export const getBuses = () => buses;

// Call from a click or tap. Safe to call many times.
export function unlock() {
  try {
    if (!buses) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      buses = buildBuses(new Ctx());
      if (settings) applySettings(settings);
    }
    const ctx = buses.ctx as AudioContext;
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    // No audio on this device: the app works silently.
  }
}

// Volumes, music on/off and mute, smoothed so changes never click.
export function applySettings(next: Settings) {
  settings = next;
  if (!buses) return;
  const { ctx } = buses;
  const now = ctx.currentTime;
  const on = (volume: number, enabled = true) => (next.muted || !enabled ? 0 : volume);
  buses.music.gain.setTargetAtTime(on(next.volumes.music, next.music), now, 0.15);
  buses.ambience.gain.setTargetAtTime(on(next.volumes.ambience), now, 0.15);
  buses.effects.gain.setTargetAtTime(on(next.volumes.effects), now, 0.15);
}

// The music's current level from 0 to 1, for gently music-reactive visuals.
const levelData = new Uint8Array(512);
export function musicLevel() {
  if (!buses) return 0;
  buses.analyser.getByteTimeDomainData(levelData);
  let sum = 0;
  for (let i = 0; i < levelData.length; i++) {
    const v = (levelData[i] - 128) / 128;
    sum += v * v;
  }
  return Math.min(1, Math.sqrt(sum / levelData.length) * 4);
}

// ---------------------------------------------------------------------------
// Ambience beds: continuous, quiet background sounds made from filtered
// noise. Each bed has its own volume, faded smoothly when the scene changes.
// ---------------------------------------------------------------------------

// Only a few quiet beds: long stretches of filtered noise start to sound like
// hiss, so wind is played as occasional gusts instead (see score.ts).
export type Bed = 'fire' | 'stream' | 'storm';

// How each bed is shaped: a filter type, its frequency and sharpness, a slow
// wobble in loudness (for gusts and murmurs), and its overall level.
const bedShapes: Record<Bed, { type: BiquadFilterType; freq: number; q: number; wobble: number; level: number }> = {
  fire: { type: 'lowpass', freq: 260, q: 0.7, wobble: 0.5, level: 0.35 },
  stream: { type: 'bandpass', freq: 1500, q: 1.2, wobble: 1.3, level: 0.25 },
  storm: { type: 'lowpass', freq: 300, q: 0.7, wobble: 0.2, level: 0.45 },
};

export class Ambience {
  private beds = new Map<Bed, GainNode>();
  constructor(private b: Buses) {}

  private bed(name: Bed) {
    let g = this.beds.get(name);
    if (g) return g;
    const { ctx } = this.b;
    const shape = bedShapes[name];
    const src = ctx.createBufferSource();
    src.buffer = noise(ctx);
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = shape.type;
    f.frequency.value = shape.freq;
    f.Q.value = shape.q;
    const swell = ctx.createGain();
    swell.gain.value = shape.level;
    // A slow wobble in loudness.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = shape.wobble;
    const depth = ctx.createGain();
    depth.gain.value = shape.level * 0.4;
    lfo.connect(depth);
    depth.connect(swell.gain);
    g = ctx.createGain();
    g.gain.value = 0;
    src.connect(f);
    f.connect(swell);
    swell.connect(g);
    g.connect(this.b.ambience);
    src.start();
    lfo.start();
    this.beds.set(name, g);
    return g;
  }

  // Fade every bed to its new level (beds not listed fade out).
  set(levels: Partial<Record<Bed, number>>, fade = 2) {
    const now = this.b.ctx.currentTime;
    for (const name of Object.keys(bedShapes) as Bed[]) {
      const target = levels[name] ?? 0;
      if (target === 0 && !this.beds.has(name)) continue;
      this.bed(name).gain.setTargetAtTime(target, now, fade / 3);
    }
  }
}
