// The instruments, all synthesised live with Web Audio: no recordings or
// samples. Each function plays one note: it builds a few small audio nodes,
// shapes their volume over time, and lets them stop by themselves.
//
//   ctx   the audio context
//   out   where the sound goes (the music, ambience or effects bus)
//   when  the start time, in the audio context's seconds
//   freq  the pitch in Hz
//   dur   how long the note is held, in seconds
//   vel   loudness, 0 to 1

type Ctx = BaseAudioContext;

// A short buffer of white noise, shared by every voice that needs breath,
// hammer or wind sounds.
let noiseBuffer: AudioBuffer | null = null;
export function noise(ctx: Ctx) {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ctx.sampleRate) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function osc(ctx: Ctx, type: OscillatorType, freq: number, when: number, stop: number, out: AudioNode, detuneCents = 0) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, when);
  o.detune.setValueAtTime(detuneCents, when);
  o.connect(out);
  o.start(when);
  o.stop(stop);
  return o;
}

function gain(ctx: Ctx, out: AudioNode, value = 0) {
  const g = ctx.createGain();
  g.gain.value = value;
  g.connect(out);
  return g;
}

function filter(ctx: Ctx, out: AudioNode, type: BiquadFilterType, freq: number, q = 0.7) {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  f.connect(out);
  return f;
}

// A gentle vibrato: a slow oscillator wobbling another oscillator's pitch.
function vibrato(ctx: Ctx, target: OscillatorNode, when: number, stop: number, rate: number, cents: number, delay = 0.3) {
  const lfo = ctx.createOscillator();
  lfo.frequency.value = rate;
  const depth = ctx.createGain();
  depth.gain.setValueAtTime(0, when);
  depth.gain.linearRampToValueAtTime(cents, when + delay + 0.3);
  lfo.connect(depth);
  depth.connect(target.detune);
  lfo.start(when);
  lfo.stop(stop);
}

// A burst of filtered noise (breath, a hammer, a drum's skin).
function noiseBurst(ctx: Ctx, out: AudioNode, when: number, length: number, type: BiquadFilterType, freq: number, vel: number, q = 1) {
  const src = ctx.createBufferSource();
  src.buffer = noise(ctx);
  const env = gain(ctx, out);
  const f = filter(ctx, env, type, freq, q);
  src.connect(f);
  env.gain.setValueAtTime(vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + length);
  src.start(when, Math.random());
  src.stop(when + length + 0.05);
}

// ---------------------------------------------------------------------------
// The Indian palette
// ---------------------------------------------------------------------------

// Tanpura: a long, buzzing pluck. The moving band-pass filter imitates the
// "jawari" shimmer of the real instrument's bridge.
export function tanpura(ctx: Ctx, out: AudioNode, when: number, freq: number, vel = 0.5) {
  const length = 4;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.12 * vel, when + 0.03);
  env.gain.exponentialRampToValueAtTime(0.0001, when + length);
  const lp = filter(ctx, env, 'lowpass', 2200);
  const shimmer = filter(ctx, env, 'bandpass', 3000, 4);
  shimmer.frequency.setValueAtTime(3200, when);
  shimmer.frequency.exponentialRampToValueAtTime(700, when + length);
  for (const d of [-4, 4]) {
    const o = osc(ctx, 'sawtooth', freq, when, when + length, lp, d);
    o.connect(shimmer);
  }
}

// Bansuri (bamboo flute): a soft, pure tone with breath and a slow vibrato.
export function bansuri(ctx: Ctx, out: AudioNode, when: number, freq: number, dur: number, vel = 0.6) {
  const stop = when + dur + 0.4;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.16 * vel, when + 0.12);
  env.gain.setValueAtTime(0.16 * vel, when + dur);
  env.gain.exponentialRampToValueAtTime(0.0001, stop);
  const tone = osc(ctx, 'sine', freq, when, stop, env);
  const soft = gain(ctx, env, 0.25);
  const body = osc(ctx, 'triangle', freq, when, stop, soft);
  vibrato(ctx, tone, when, stop, 5.2, 12);
  vibrato(ctx, body, when, stop, 5.2, 12);
  noiseBurst(ctx, env, when, Math.min(dur, 0.5), 'bandpass', freq * 2, 0.25, 2);
}

// Santoor (hammered dulcimer): a bright, quickly fading strike, slightly
// doubled because each note has more than one string.
export function santoor(ctx: Ctx, out: AudioNode, when: number, freq: number, vel = 0.6) {
  const length = 1.6;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.13 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + length);
  osc(ctx, 'triangle', freq, when, when + length, env, -5);
  osc(ctx, 'triangle', freq, when, when + length, env, 5);
  const bright = gain(ctx, env, 0.2);
  osc(ctx, 'sine', freq * 2, when, when + length, bright);
  noiseBurst(ctx, out, when, 0.03, 'highpass', 4000, 0.05 * vel);
}

// Sarangi-like bowed strings: a rich, singing, slightly nasal line.
export function sarangi(ctx: Ctx, out: AudioNode, when: number, freq: number, dur: number, vel = 0.5) {
  const stop = when + dur + 0.8;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.09 * vel, when + 0.35);
  env.gain.setValueAtTime(0.09 * vel, when + dur);
  env.gain.exponentialRampToValueAtTime(0.0001, stop);
  const lp = filter(ctx, env, 'lowpass', 1800);
  const formant = filter(ctx, env, 'bandpass', 900, 3);
  const o = osc(ctx, 'sawtooth', freq, when, stop, lp);
  o.connect(formant);
  vibrato(ctx, o, when, stop, 5.8, 18, 0.4);
}

// Harmonium: a steady reed drone (used, stiff and formal, in Daksha's palace).
export function harmonium(ctx: Ctx, out: AudioNode, when: number, freq: number, dur: number, vel = 0.4) {
  const stop = when + dur + 0.3;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.05 * vel, when + 0.1);
  env.gain.setValueAtTime(0.05 * vel, when + dur);
  env.gain.linearRampToValueAtTime(0, stop);
  const lp = filter(ctx, env, 'lowpass', 1400);
  osc(ctx, 'square', freq, when, stop, lp);
  osc(ctx, 'sawtooth', freq * 2, when, stop, lp, 3);
}

// Tabla. 'high' is the small drum's ringing "na"; 'low' is the large drum's
// deep "ge", with its pitch sliding down.
export function tabla(ctx: Ctx, out: AudioNode, when: number, stroke: 'high' | 'low', vel = 0.6) {
  const env = gain(ctx, out);
  if (stroke === 'high') {
    env.gain.setValueAtTime(0.18 * vel, when);
    env.gain.exponentialRampToValueAtTime(0.0001, when + 0.3);
    const o = osc(ctx, 'sine', 440, when, when + 0.32, env);
    o.frequency.exponentialRampToValueAtTime(410, when + 0.3);
    noiseBurst(ctx, out, when, 0.03, 'bandpass', 3000, 0.06 * vel, 2);
  } else {
    env.gain.setValueAtTime(0.25 * vel, when);
    env.gain.exponentialRampToValueAtTime(0.0001, when + 0.6);
    const o = osc(ctx, 'sine', 95, when, when + 0.62, env);
    o.frequency.exponentialRampToValueAtTime(62, when + 0.5);
  }
}

// Mridangam: a deeper, rounder two-headed drum, used for heartbeat and drive.
export function mridangam(ctx: Ctx, out: AudioNode, when: number, stroke: 'high' | 'low', vel = 0.6) {
  const env = gain(ctx, out);
  const f = stroke === 'high' ? 210 : 78;
  const length = stroke === 'high' ? 0.35 : 0.7;
  env.gain.setValueAtTime(0.24 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + length);
  const o = osc(ctx, 'sine', f, when, when + length + 0.02, env);
  o.frequency.exponentialRampToValueAtTime(f * 0.8, when + length);
  noiseBurst(ctx, out, when, 0.04, 'lowpass', 1200, 0.08 * vel);
}

// Low cinematic drum, for the climax.
export function lowDrum(ctx: Ctx, out: AudioNode, when: number, vel = 0.7) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.4 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 1.4);
  const o = osc(ctx, 'sine', 58, when, when + 1.45, env);
  o.frequency.exponentialRampToValueAtTime(38, when + 1.2);
  noiseBurst(ctx, out, when, 0.15, 'lowpass', 400, 0.2 * vel);
}

// Temple bell: inharmonic partials that ring for a long time.
export function templeBell(ctx: Ctx, out: AudioNode, when: number, freq = 587.33, vel = 0.6) {
  const partials: [number, number, number][] = [
    [1, 1, 6],
    [2.32, 0.5, 4.5],
    [4.25, 0.3, 3],
    [6.63, 0.18, 2],
    [9.38, 0.1, 1.2],
  ];
  for (const [ratio, amp, length] of partials) {
    const env = gain(ctx, out);
    env.gain.setValueAtTime(0.09 * vel * amp, when);
    env.gain.exponentialRampToValueAtTime(0.0001, when + length);
    osc(ctx, 'sine', freq * ratio, when, when + length, env);
    osc(ctx, 'sine', freq * ratio * 1.002, when, when + length, env); // a slow beating shimmer
  }
}

// A small, high chime.
export function chime(ctx: Ctx, out: AudioNode, when: number, freq = 1760, vel = 0.5) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.06 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 1.6);
  osc(ctx, 'sine', freq, when, when + 1.6, env);
  osc(ctx, 'sine', freq * 2.76, when, when + 0.6, gain(ctx, env, 0.3));
}

// Singing bowl: two close tones beating slowly, very long.
export function singingBowl(ctx: Ctx, out: AudioNode, when: number, freq = 293.66, vel = 0.5) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.07 * vel, when + 0.4);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 8);
  osc(ctx, 'sine', freq, when, when + 8, env);
  osc(ctx, 'sine', freq * 1.004, when, when + 8, env);
  osc(ctx, 'sine', freq * 2.71, when, when + 5, gain(ctx, env, 0.25));
}

// Conch: a single, slow, swelling call.
export function conch(ctx: Ctx, out: AudioNode, when: number, freq = 146.83, dur = 3, vel = 0.6) {
  const stop = when + dur + 1;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.12 * vel, when + dur * 0.6);
  env.gain.linearRampToValueAtTime(0, stop);
  const lp = filter(ctx, env, 'lowpass', 300, 2);
  lp.frequency.setValueAtTime(300, when);
  lp.frequency.linearRampToValueAtTime(1300, when + dur * 0.6);
  lp.frequency.linearRampToValueAtTime(400, stop);
  const o = osc(ctx, 'sawtooth', freq, when, stop, lp);
  o.frequency.setValueAtTime(freq * 0.97, when);
  o.frequency.linearRampToValueAtTime(freq, when + 0.6);
}

// ---------------------------------------------------------------------------
// The Hogwarts palette (kept separate, so the two worlds sound distinct)
// ---------------------------------------------------------------------------

// Celesta-like bells: a soft, glassy strike.
export function celesta(ctx: Ctx, out: AudioNode, when: number, freq: number, vel = 0.5) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.1 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 1.4);
  osc(ctx, 'sine', freq, when, when + 1.4, env);
  osc(ctx, 'sine', freq * 4, when, when + 0.5, gain(ctx, env, 0.25));
}

// Harp: a warm pluck that rings.
export function harp(ctx: Ctx, out: AudioNode, when: number, freq: number, vel = 0.5) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.12 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);
  const lp = filter(ctx, env, 'lowpass', 2600);
  osc(ctx, 'triangle', freq, when, when + 2.6, lp);
  osc(ctx, 'sine', freq * 2, when, when + 1, gain(ctx, lp, 0.2));
}

// Soft strings: a slow-swelling chord tone, several detuned voices.
export function softStrings(ctx: Ctx, out: AudioNode, when: number, freq: number, dur: number, vel = 0.4) {
  const stop = when + dur + 1.5;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.035 * vel, when + 0.9);
  env.gain.setValueAtTime(0.035 * vel, when + dur);
  env.gain.linearRampToValueAtTime(0, stop);
  const lp = filter(ctx, env, 'lowpass', 1300);
  for (const d of [-8, 0, 8]) osc(ctx, 'sawtooth', freq, when, stop, lp, d);
}

// Low woodwind (clarinet-like): hollow and warm.
export function clarinet(ctx: Ctx, out: AudioNode, when: number, freq: number, dur: number, vel = 0.5) {
  const stop = when + dur + 0.3;
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.07 * vel, when + 0.1);
  env.gain.setValueAtTime(0.07 * vel, when + dur);
  env.gain.linearRampToValueAtTime(0, stop);
  const lp = filter(ctx, env, 'lowpass', 1100);
  const o = osc(ctx, 'square', freq, when, stop, lp);
  vibrato(ctx, o, when, stop, 4.5, 6, 0.5);
}

// Pizzicato strings: short plucks, for tension at the dinner table.
export function pizzicato(ctx: Ctx, out: AudioNode, when: number, freq: number, vel = 0.5) {
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.1 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 0.35);
  osc(ctx, 'triangle', freq, when, when + 0.36, filter(ctx, env, 'lowpass', 1200));
}

// ---------------------------------------------------------------------------
// Effects
// ---------------------------------------------------------------------------

// A soft wooden tick (the activity timer, every 10 seconds; a clock).
export function woodTick(ctx: Ctx, out: AudioNode, when: number, vel = 0.5) {
  noiseBurst(ctx, out, when, 0.05, 'bandpass', 1800, 0.25 * vel, 4);
  const env = gain(ctx, out);
  env.gain.setValueAtTime(0.06 * vel, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 0.06);
  osc(ctx, 'sine', 900, when, when + 0.07, env);
}

// A bird call: a quick rising chirp.
export function chirp(ctx: Ctx, out: AudioNode, when: number, vel = 0.3) {
  const env = gain(ctx, out);
  const f = 2400 + Math.random() * 1200;
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.04 * vel, when + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 0.15);
  const o = osc(ctx, 'sine', f, when, when + 0.16, env);
  o.frequency.exponentialRampToValueAtTime(f * 1.4, when + 0.12);
}

// A fire crackle: a tiny, sharp pop.
export function crackle(ctx: Ctx, out: AudioNode, when: number, vel = 0.3) {
  noiseBurst(ctx, out, when, 0.02 + Math.random() * 0.03, 'highpass', 2500, 0.3 * vel);
}

// Distant thunder: a long, low rumble.
export function thunder(ctx: Ctx, out: AudioNode, when: number, vel = 0.4) {
  const src = ctx.createBufferSource();
  src.buffer = noise(ctx);
  const env = gain(ctx, out);
  const lp = filter(ctx, env, 'lowpass', 180);
  src.connect(lp);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.5 * vel, when + 0.3);
  env.gain.exponentialRampToValueAtTime(0.0001, when + 3.5);
  src.start(when);
  src.stop(when + 3.6);
}

// Cloth or paper rustle, used for the page-turn transition.
export function pageTurn(ctx: Ctx, out: AudioNode, when: number, vel = 0.4) {
  noiseBurst(ctx, out, when, 0.35, 'bandpass', 2200, 0.15 * vel, 0.8);
}

// A single soft gust of wind: a low, dark swell of air that rises over a
// couple of seconds and dies away. Played now and then (never continuously),
// so it never turns into a steady hiss.
export function gust(ctx: Ctx, out: AudioNode, when: number, length = 4.5, vel = 0.5) {
  const src = ctx.createBufferSource();
  src.buffer = noise(ctx);
  src.loop = true;
  const env = gain(ctx, out);
  const lp = filter(ctx, env, 'lowpass', 260, 0.9);
  src.connect(lp);
  // The filter opens and closes with the gust, so it "whooshes" rather than hisses.
  lp.frequency.setValueAtTime(220, when);
  lp.frequency.linearRampToValueAtTime(520, when + length * 0.45);
  lp.frequency.linearRampToValueAtTime(200, when + length);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(0.16 * vel, when + length * 0.45);
  env.gain.linearRampToValueAtTime(0, when + length);
  src.start(when, Math.random());
  src.stop(when + length + 0.05);
}
