// The adaptive score. For the current beat it plays up to six layers:
//
//   drone       tanpura (or a low string pad for Hogwarts)
//   motif       the melody: bansuri, santoor or harmonium; celesta, harp or clarinet
//   percussion  tabla or mridangam (pizzicato for Hogwarts)
//   strings     sarangi-like lines (soft string chords and harp for Hogwarts)
//   climax      low drums
//   resolution  singing bowl and bells (high bells for Hogwarts)
//
// Which layers play, and how loud, comes from the beat's direction values
// (intensity, raga, tempo) and from the night's score plan (dayNScore.ts),
// which can change them at particular sentences or when the learner acts.
//
// The score follows the clock: pause, freeze and the end of a sequence fall
// back to the drone alone; slow motion halves the tempo and softens the tone;
// replay starts the beat's moments again.
//
// It works by looking a little ahead: every 50 ms, tick() schedules any notes
// due in the next quarter of a second.

import type { Beat, MusicLayer, Raga } from '../content/types';
import { lineTimes } from '../engine/storyTiming';
import { Ambience, type Bed, type Buses } from './engine';
import { freqOf, hogwartsChords, hogwartsPhrases, type Phrase, ragas, signatureAnswer, signatureRise } from './ragas';
import * as v from './voices';

// ---------------------------------------------------------------------------
// The score plan: what a night's file describes for each beat
// ---------------------------------------------------------------------------

export type MotifVoice = 'bansuri' | 'santoor' | 'harmonium' | 'celesta' | 'harp' | 'clarinet';
export type Taal = 'keherwa' | 'dadra' | 'heartbeat' | 'drive';
export type Detail = 'clock' | 'birds' | 'gusts'; // gusts: a soft gust of wind now and then

// One-off sounds the plan can trigger.
export type Sound =
  | 'bell'
  | 'softBell'
  | 'chime'
  | 'chimes'
  | 'bowl'
  | 'rise' // the signature motif, rising
  | 'answer' // the signature motif's falling answer
  | 'riseFragment'
  | 'phrase' // one phrase in the current raga, on the bansuri
  | 'flameNote' // one long bansuri note that fades with the lamp flame
  | 'drumHit'
  | 'conch'
  | 'swell' // a low swell of strings
  | 'outburst' // a sharp rising swell of strings, then a stop
  | 'peethaBells'
  | 'harpNote'
  | 'pageTurn';

// Changes to the music from a moment onwards.
export interface MusicChange {
  layers?: MusicLayer[];
  raga?: Raga;
  bpm?: number;
  motifVoice?: MotifVoice;
  taal?: Taal;
  ambience?: Partial<Record<Bed, number>>;
  details?: Detail[]; // small sounds over the beds: a ticking clock, birdsong
  silence?: number; // seconds of near-silence (drone at −24 dB)
}

// When something happens: at a time, at a sentence (plus an offset), or when
// the learner does something (a cue name, or a prefix ending in ':').
export type When = { at: number } | { line: number; offset?: number } | { cue: string };

export interface ScoreEvent {
  when: When;
  play?: Sound;
  set?: MusicChange;
  caption?: string; // shown when captions are on, e.g. "a temple bell"
}

export interface BeatScore {
  start?: MusicChange; // overrides of the beat's direction values at the start
  events?: ScoreEvent[];
}

// The sound caption to show now, if any: each shows for 3 seconds after its
// moment (a time, a sentence, or something the learner did).
export function captionAt(beat: Beat, plan: BeatScore | undefined, t: number, cues: Record<string, number>) {
  let found: string | undefined;
  let latest = -Infinity;
  for (const e of plan?.events ?? []) {
    if (!e.caption) continue;
    let at: number;
    if ('cue' in e.when) {
      const w = e.when.cue;
      const times = Object.entries(cues)
        .filter(([name]) => name === w || (w.endsWith(':') && name.startsWith(w)))
        .map(([, time]) => time);
      if (times.length === 0) continue;
      at = Math.max(...times);
    } else if ('at' in e.when) at = e.when.at;
    else at = lineTimes(beat, e.when.line).start + (e.when.offset ?? 0);
    if (t >= at && t < at + 3 && at >= latest) {
      latest = at;
      found = e.caption;
    }
  }
  return found;
}

// ---------------------------------------------------------------------------

export interface Transport {
  t: number;
  playing: boolean; // false when paused, frozen or ended
  slow: boolean;
}

const layerNames: MusicLayer[] = ['drone', 'motif', 'percussion', 'strings', 'climax', 'resolution'];

// Taal patterns, one entry per eighth-note: 'L' low stroke, 'H' high, 'h' soft high, '.' rest.
const taals: Record<Taal, string> = {
  keherwa: 'LHhHLhHh',
  dadra: 'LHhLhh',
  heartbeat: 'L..L....',
  drive: 'LHLHLHLH',
};

export class Score {
  private ambience: Ambience;
  private layerGain: Record<MusicLayer, GainNode>;
  private beat: Beat | null = null;
  private plan: BeatScore = {};
  private transport: Transport = { t: 0, playing: false, slow: false };

  // The music as it is now (the beat's direction values plus any changes).
  private layers = new Set<MusicLayer>();
  private raga: Raga = 'bhupali';
  private bpm = 60;
  private palette: 'indian' | 'hogwarts' | 'both' = 'indian';
  private motifVoice: MotifVoice = 'bansuri';
  private taal: Taal = 'keherwa';
  private intensity = 1;

  // Scheduling state.
  private nextStep = 0;
  private step = 0;
  private nextPluck = 0;
  private pluck = 0;
  private melody: { note: number; steps: number; left: number }[] = [];
  private restSteps = 2;
  private lastT = 0;
  private silentUntil = -1;
  private activity = false;
  private fired = new Set<number>();
  private enabled = true;
  private free = false; // playing without a beat (the opening splash)

  constructor(private b: Buses) {
    this.ambience = new Ambience(b);
    const make = () => {
      const g = b.ctx.createGain();
      g.gain.value = 0;
      g.connect(b.musicTone);
      return g;
    };
    this.layerGain = { drone: make(), motif: make(), percussion: make(), strings: make(), climax: make(), resolution: make() };
  }

  private get now() {
    return this.b.ctx.currentTime;
  }

  // The opening splash: calm tanpura and bansuri in Bhupali (serene
  // devotion, the night's home raga), sparse, with a little wind.
  playSplash() {
    this.beat = null;
    this.free = true;
    this.plan = {};
    this.palette = 'indian';
    this.raga = 'bhupali';
    this.bpm = 56;
    this.intensity = 2;
    this.motifVoice = 'bansuri';
    this.layers = new Set(['drone', 'motif', 'resolution']);
    this.transport = { t: 0, playing: true, slow: false };
    this.nextStep = Math.max(this.nextStep, this.now + 0.05);
    this.nextPluck = Math.max(this.nextPluck, this.now + 0.05);
    // Start softly and rise gently over several seconds.
    this.updateGains(2.5);
  }

  // Start a new beat.
  setBeat(beat: Beat, plan: BeatScore) {
    this.free = false;
    this.beat = beat;
    this.plan = plan;
    const m = beat.direction.music;
    this.palette = m.palette;
    this.raga = m.raga ?? 'bhupali';
    this.bpm = m.bpm;
    this.layers = new Set(m.layers);
    this.intensity = beat.direction.intensity;
    this.motifVoice = m.palette === 'hogwarts' ? 'celesta' : 'bansuri';
    this.taal = 'keherwa';
    this.ambience.set({});
    this.beds = {};
    this.details = new Set();
    if (plan.start) this.apply(plan.start);
    this.fired.clear();
    this.lastT = -0.001;
    this.silentUntil = -1;
    this.melody = [];
    this.restSteps = 2;
    this.nextStep = Math.max(this.nextStep, this.now + 0.05);
    this.nextPluck = Math.max(this.nextPluck, this.now + 0.05);
    this.updateGains();
  }

  setTransport(next: Transport) {
    // Replay (or jumping back): start the beat's moments again.
    if (next.t < this.transport.t - 0.5) {
      if (this.beat) this.setBeat(this.beat, this.plan);
      this.lastT = next.t - 0.001;
    }
    const changed = next.playing !== this.transport.playing || next.slow !== this.transport.slow;
    this.transport = next;
    if (changed) this.updateGains();
  }

  // An activity timer is running: duck to the drone alone, at −12 dB.
  setActivity(on: boolean) {
    this.activity = on;
    this.updateGains();
  }

  // The music switch: when off, nothing is scheduled at all.
  setEnabled(on: boolean) {
    this.enabled = on;
  }

  // The learner did something (chose, revealed, opened a question...).
  cue(name: string) {
    for (const e of this.plan.events ?? []) {
      if (!('cue' in e.when)) continue;
      const w = e.when.cue;
      if (w === name || (w.endsWith(':') && name.startsWith(w))) this.fire(e, this.now + 0.02);
    }
  }

  // An effect on the effects bus (not part of the score).
  effect(name: 'tick' | 'hotspot') {
    const when = this.now + 0.01;
    if (name === 'tick') v.woodTick(this.b.ctx, this.b.effects, when, 0.6);
    else v.chime(this.b.ctx, this.b.effects, when, freqOf([12, 14, 16, 19, 21][Math.floor(Math.random() * 5)]), 0.6);
  }

  // The night's closing: the falling answer on the bansuri, one temple bell,
  // and a calm tanpura tail that fades over five seconds.
  closing() {
    const when = this.now + 0.1;
    this.layers = new Set(['drone']);
    this.updateGains();
    // The flute plays through the motif layer, so open it for the answer.
    this.layerGain.motif.gain.setTargetAtTime(0.25, this.now, 0.05);
    this.layerGain.drone.gain.setTargetAtTime(0.35, this.now, 0.05);
    this.playPhrase(signatureAnswer, when, 'bansuri', 60);
    // The tanpura keeps sounding under the closing, then fades.
    for (let i = 0; i < 8; i++) {
      v.tanpura(this.b.ctx, this.layerGain.drone, when + i * 0.95, freqOf([-17, -12, -12, -24][i % 4]), 0.3);
    }
    v.templeBell(this.b.ctx, this.layerGain.resolution, when + 4.2, 587.33, 0.5);
    this.layerGain.resolution.gain.setTargetAtTime(0.4, when, 0.1);
    this.ambience.set({}, 4);
    this.layerGain.drone.gain.setTargetAtTime(0, when + 6, 1.6);
    this.beat = null;
  }

  // Stop everything gently (leaving a night).
  stop() {
    this.beat = null;
    this.free = false;
    for (const l of layerNames) this.layerGain[l].gain.setTargetAtTime(0, this.now, 0.4);
    this.ambience.set({}, 1.5);
  }

  // ---------------------------------------------------------------------------

  private apply(change: MusicChange) {
    if (change.layers) this.layers = new Set(change.layers);
    if (change.raga) this.raga = change.raga;
    if (change.bpm) this.bpm = change.bpm;
    if (change.motifVoice) {
      this.motifVoice = change.motifVoice;
      this.melody = [];
    }
    if (change.taal) this.taal = change.taal;
    if (change.ambience) {
      this.ambience.set(change.ambience);
      this.beds = change.ambience;
    }
    if (change.details) this.details = new Set(change.details);
    if (change.silence) this.silentUntil = this.transport.t + change.silence;
    this.updateGains();
  }

  // Set each layer's loudness from the beat's intensity and the transport.
  // `fade` is how gently it moves there (a time constant in seconds).
  private updateGains(fade = 0.4) {
    const now = this.now;
    const i = this.intensity;
    const levels: Record<MusicLayer, number> = {
      drone: 0.75,
      motif: 0.5 + 0.05 * i,
      percussion: 0.35 + 0.06 * i,
      strings: 0.45 + 0.05 * i,
      climax: 0.6 + 0.04 * i,
      resolution: 0.6,
    };
    const silent = this.transport.t < this.silentUntil;
    const droneOnly = !this.transport.playing || this.activity || silent;
    for (const l of layerNames) {
      let target = this.layers.has(l) ? levels[l] : 0;
      if (l === 'drone') {
        target = levels.drone * (silent ? 0.06 : this.activity ? 0.25 : this.transport.playing ? 1 : 0.5);
      } else if (droneOnly) target = 0;
      this.layerGain[l].gain.setTargetAtTime(target, now, fade);
    }
    // Slow motion softens the tone as well as the tempo.
    this.b.musicTone.frequency.setTargetAtTime(this.transport.slow ? 2400 : 16000, now, 0.3);
  }

  // Seconds per eighth-note, halved in tempo for slow motion.
  private get eighth() {
    return 60 / this.bpm / 2 / (this.transport.slow ? 0.5 : 1);
  }

  // Called about every 50 ms by the player (or by the offline level check).
  tick() {
    if ((!this.beat && !this.free) || !this.enabled) return;
    const now = this.now;
    const horizon = now + 0.25;

    // 1. Moments tied to the clock: fire any we have just passed.
    const t = this.transport.t;
    (this.plan.events ?? []).forEach((e, index) => {
      if ('cue' in e.when || this.fired.has(index)) return;
      const at = this.timeOf(e.when);
      if (at > this.lastT && at <= t) {
        this.fired.add(index);
        this.fire(e, now + 0.02);
      }
    });
    if (this.silentUntil > 0 && t >= this.silentUntil) {
      this.silentUntil = -1;
      this.updateGains();
    }
    this.lastT = t;

    // 2. The drone: tanpura strings, plucked in turn, whatever the tempo.
    while (this.nextPluck < horizon) {
      this.playDrone(this.nextPluck);
      this.nextPluck += (this.palette === 'hogwarts' ? 4 : 0.95) * (this.transport.slow ? 1.6 : 1);
    }

    // 3. The other layers, step by step in eighth-notes.
    while (this.nextStep < horizon) {
      if (this.transport.playing) this.playStep(this.nextStep, this.step);
      this.nextStep += this.eighth;
      this.step++;
    }
    // Ambient one-shots (fire crackle, birds...) are part of the plan's beds.
    this.ambientDetails(now);
  }

  private timeOf(when: When) {
    if ('at' in when) return when.at;
    if ('line' in when && this.beat) return lineTimes(this.beat, when.line).start + (when.offset ?? 0);
    return Infinity;
  }

  private fire(e: ScoreEvent, when: number) {
    if (e.set) this.apply(e.set);
    if (e.play) this.playSound(e.play, when);
  }

  // ---------------------------------------------------------------------------

  private playDrone(when: number) {
    const { ctx } = this.b;
    const out = this.layerGain.drone;
    if (this.palette === 'hogwarts') {
      // A low, soft string pad on D and A.
      v.softStrings(ctx, out, when, freqOf(-24), 4.5, 0.8);
      v.softStrings(ctx, out, when, freqOf(-17), 4.5, 0.6);
      return;
    }
    // The four tanpura strings: the raga's drone note, Sa, Sa, low Sa.
    const strings = [ragas[this.raga].droneNote - 12, 0 - 12, 0 - 12, -24];
    v.tanpura(ctx, out, when, freqOf(strings[this.pluck % 4]), this.pluck % 4 === 3 ? 0.8 : 0.6);
    this.pluck++;
  }

  private playStep(when: number, step: number) {
    const { ctx } = this.b;
    const L = this.layers;
    const hog = this.palette === 'hogwarts';
    const both = this.palette === 'both';

    // Melody: phrases with rests between them; busier at higher intensity.
    if (L.has('motif')) {
      if (both) {
        // Beat 14: tanpura on the left, single harp notes on the right,
        // alternating and never blending.
        if (step % 8 === 4) v.harp(ctx, this.layerGain.motif, when, freqOf(hogwartsChords[0][2 + (step % 3)]), 0.5);
      } else {
        // Between phrases, count down a rest; then pick the next phrase.
        if (this.melody.length === 0 && this.restSteps-- <= 0) {
          const bank: Phrase[] = hog ? hogwartsPhrases : ragas[this.raga].phrases;
          const phrase = bank[Math.floor(Math.random() * bank.length)];
          this.melody = phrase.map(([note, steps]) => ({ note, steps, left: steps }));
          this.restSteps = Math.max(1, Math.round((10 - this.intensity) * (0.6 + Math.random())));
        }
        // Start each note on its first step, then let it ring for its length.
        const n = this.melody[0];
        if (n) {
          if (n.left === n.steps) this.voiceNote(this.motifVoice, when, freqOf(n.note), n.steps * this.eighth);
          if (--n.left <= 0) this.melody.shift();
        }
      }
    }

    // Percussion: a taal pattern (or pizzicato for Hogwarts).
    if (L.has('percussion')) {
      const pattern = taals[this.taal];
      const stroke = pattern[step % pattern.length];
      const heavy = this.intensity >= 6 || this.taal === 'heartbeat' || this.taal === 'drive';
      const play = heavy ? v.mridangam : v.tabla;
      if (hog) {
        const chord = hogwartsChords[Math.floor(step / 8) % hogwartsChords.length];
        if (step % 2 === 0) v.pizzicato(ctx, this.layerGain.percussion, when, freqOf(chord[1]), 0.6);
      } else if (stroke === 'L') play(ctx, this.layerGain.percussion, when, 'low', 0.7);
      else if (stroke === 'H') play(ctx, this.layerGain.percussion, when, 'high', 0.6);
      else if (stroke === 'h') play(ctx, this.layerGain.percussion, when, 'high', 0.3);
    }

    // Strings: long sarangi tones near the raga's resting note, or soft
    // chords with a harp arpeggio for Hogwarts.
    if (L.has('strings')) {
      if (hog) {
        const chord = hogwartsChords[Math.floor(step / 8) % hogwartsChords.length];
        if (step % 8 === 0) for (const n of chord.slice(1)) v.softStrings(ctx, this.layerGain.strings, when, freqOf(n), this.eighth * 8, 0.6);
        v.harp(ctx, this.layerGain.strings, when, freqOf(chord[1 + (step % 4)] + 12), 0.25);
      } else if (step % 8 === 0) {
        const r = ragas[this.raga];
        const pick = Math.random() < 0.5 ? r.restNote : r.notes[Math.floor(Math.random() * r.notes.length)];
        v.sarangi(ctx, this.layerGain.strings, when, freqOf(pick - 12), this.eighth * 7, 0.7);
      }
    }

    // Climax: low drums on every beat.
    if (L.has('climax') && step % 2 === 0) v.lowDrum(ctx, this.layerGain.climax, when, step % 8 === 0 ? 0.9 : 0.55);

    // Resolution: bowls and bells, sparse and spacious.
    if (L.has('resolution') && step % 16 === 0 && Math.random() < 0.55) {
      if (hog) v.celesta(ctx, this.layerGain.resolution, when, freqOf(19), 0.35);
      else v.singingBowl(ctx, this.layerGain.resolution, when, freqOf(-12), 0.6);
    }
  }

  private voiceNote(voice: MotifVoice, when: number, freq: number, dur: number, out: AudioNode = this.layerGain.motif) {
    const { ctx } = this.b;
    if (voice === 'bansuri') v.bansuri(ctx, out, when, freq * 2, dur * 0.95, 0.7);
    else if (voice === 'santoor') v.santoor(ctx, out, when, freq * 2, 0.6);
    else if (voice === 'harmonium') v.harmonium(ctx, out, when, freq, dur, 0.6);
    else if (voice === 'celesta') v.celesta(ctx, out, when, freq * 2, 0.5);
    else if (voice === 'harp') v.harp(ctx, out, when, freq, 0.6);
    else v.clarinet(ctx, out, when, freq / 2, dur * 0.95, 0.7);
  }

  private playPhrase(phrase: Phrase, when: number, voice: MotifVoice, bpm: number, out?: AudioNode) {
    const eighth = 60 / bpm / 2;
    let time = when;
    for (const [note, length] of phrase) {
      this.voiceNote(voice, time, freqOf(note), length * eighth, out);
      time += length * eighth;
    }
  }

  private playSound(sound: Sound, when: number) {
    const { ctx } = this.b;
    const res = this.layerGain.resolution;
    // One-off sounds play even when the layer they use is otherwise quiet.
    const direct = this.b.musicTone;
    switch (sound) {
      case 'bell':
        return v.templeBell(ctx, direct, when, 587.33, 0.7);
      case 'softBell':
        return v.templeBell(ctx, direct, when, 587.33, 0.35);
      case 'chime':
        return v.chime(ctx, direct, when, freqOf(24), 0.5);
      case 'chimes':
        for (let i = 0; i < 6; i++) v.chime(ctx, direct, when + i * 0.35, freqOf([24, 26, 28, 31, 33, 36][i]), 0.3);
        return;
      case 'bowl':
        return v.singingBowl(ctx, direct, when, freqOf(-12), 0.7);
      case 'rise':
        return this.playPhrase(signatureRise, when, 'bansuri', 60, direct);
      case 'answer':
        return this.playPhrase(signatureAnswer, when, 'bansuri', 60, direct);
      case 'riseFragment':
        return this.playPhrase(signatureRise.slice(0, 3), when, 'bansuri', 60, direct);
      case 'phrase': {
        const bank = ragas[this.raga].phrases;
        return this.playPhrase(bank[Math.floor(Math.random() * bank.length)], when, 'bansuri', this.bpm, direct);
      }
      case 'flameNote':
        return v.bansuri(ctx, direct, when, freqOf(9) * 2, 7, 0.6);
      case 'drumHit':
        return v.lowDrum(ctx, direct, when, 1);
      case 'conch':
        return v.conch(ctx, direct, when, freqOf(-12), 3, 0.7);
      case 'swell':
        for (const n of [-24, -12, -5]) v.sarangi(ctx, direct, when, freqOf(n), 4, 0.6);
        return;
      case 'outburst':
        for (const n of [-12, -5, 0, 3]) v.softStrings(ctx, direct, when, freqOf(n), 2.5, 1);
        return;
      case 'peethaBells':
        for (let i = 0; i < 12; i++) v.chime(ctx, res, when + i * 0.9, freqOf([12, 14, 16, 19, 21][i % 5]), 0.35);
        this.layerGain.resolution.gain.setTargetAtTime(0.7, when, 0.2);
        return;
      case 'harpNote':
        return v.harp(ctx, direct, when, freqOf(hogwartsChords[0][2 + Math.floor(Math.random() * 3)]), 0.5);
      case 'pageTurn':
        return v.pageTurn(ctx, this.b.effects, when, 0.6);
    }
  }

  // Small random sounds that go with the ambience: crackle with fire,
  // thunder with the storm, and the plan's details (a clock, birds).
  private beds: Partial<Record<Bed, number>> = {};
  private details = new Set<Detail>();
  private lastTick = 0;
  private nextGust = 0;
  private ambientDetails(now: number) {
    const { ctx } = this.b;
    if ((this.beds.fire ?? 0) > 0 && Math.random() < 0.18) v.crackle(ctx, this.b.ambience, now + Math.random() * 0.2, this.beds.fire);
    if (this.details.has('birds') && Math.random() < 0.025) v.chirp(ctx, this.b.ambience, now + 0.1, 0.6);
    // Wind as occasional gusts: one every 10 to 18 seconds, a few seconds long.
    if (this.details.has('gusts') && now >= this.nextGust) {
      if (this.nextGust > 0) v.gust(ctx, this.b.ambience, now + 0.1, 3.5 + Math.random() * 2, 0.5 + Math.random() * 0.3);
      this.nextGust = now + 10 + Math.random() * 8;
    }
    if ((this.beds.storm ?? 0) > 0 && Math.random() < 0.004) v.thunder(ctx, this.b.ambience, now + 0.1, this.beds.storm);
    if (this.details.has('clock') && now - this.lastTick >= 1) {
      this.lastTick = Math.floor(now);
      v.woodTick(ctx, this.b.ambience, this.lastTick + 1, 0.2);
    }
  }
}
