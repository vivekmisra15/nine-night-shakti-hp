// Night 2's score plan, from the music brief in docs/direction/night-2.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day2.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// Why each raga (all on D as Sa, with the tanpura on Sa and Pa, as Night 1):
// - Bhupali (serene devotion): the opening, Beat 2, Beat 8's reveal, Beat 9
//   and the closing. The mountain raga of Night 1: Parvati's steadiness, and
//   the return of Shiva.
// - Marwa (twilight unease): Beats 3 and 7. The out-of-season spring is a
//   scheme, and the tests unsettle; Marwa has no Pa to rest on.
// - Bageshri (longing): Beats 4 and 5. Parvati's heartbreak, and Mena's
//   loving fear for her daughter.
// - Malkauns (deep night, inward and austere; new tonight): Beat 6.
//   Traditionally a late-night, meditative raga often linked with Shiva, it
//   suits the long, silent tapas.
// - Yaman (tender evening): Beats 10, 15, 16 and 17, warm and thoughtful
//   for the theme and Reflect.
// - The Hogwarts scenes (Beats 11–14) use their own original palette:
//   celesta-like bells, harp, soft strings and low woodwind. Never a film theme.
//
// The night's motif: the bansuri's rising Sa Re Ga Pa ('rise'), played again
// and again like practice; its falling answer ('answer') comes only at
// Shiva's reveal (Beat 8) and at the close. A soft chime marks each bead of
// the ring as it lights.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).

import type { BeatScore } from './score';

export const day2Score: Record<string, BeatScore> = {
  // Beat 1: a soft bell, the tanpura, the rising phrase once; one soft gust.
  'n2-b1': {
    start: { details: ['gusts'] },
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.2 }, play: 'rise', caption: 'a bamboo flute plays a rising phrase' },
    ],
  },

  // Beat 2: Bhupali on the ridge; light strings; a bell for the daily
  // offerings, and a chime as the first bead lights.
  'n2-b2': {
    start: { layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'tanpura and flute; now and then, the wind' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft bowed strings' },
      { when: { line: 9 }, play: 'softBell', caption: 'a temple bell' },
      { when: { line: 9, offset: 2 }, play: 'chime', caption: 'a soft chime: the first bead lights' },
    ],
  },

  // Beat 3: Marwa; birdsong only while the false spring lasts; the tempo
  // rises with the scheme; a low drum at the flash (no conch), two seconds
  // of silence, then the drone alone.
  'n2-b3': {
    start: { layers: ['drone', 'motif'], bpm: 72 },
    events: [
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'strings, uneasy' },
      { when: { line: 4 }, set: { details: ['birds'], layers: ['drone', 'motif', 'strings', 'percussion'], taal: 'keherwa', bpm: 78 }, caption: 'birdsong; light tabla' },
      { when: { line: 7 }, set: { bpm: 84 }, caption: 'the music quickens' },
      { when: { line: 9, offset: 1.5 }, play: 'drumHit', set: { layers: ['drone'], details: [], silence: 2 }, caption: 'a low drum stroke, then silence' },
      { when: { line: 10 }, caption: 'the drone alone' },
      { when: { line: 12 }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 4: Bageshri; drone and soft flute; a flute phrase for each choice;
  // at the reveal a bell, and a chime as the second bead lights.
  'n2-b4': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'bell', set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'a single bell; the flute returns' },
      { when: { cue: 'reveal', offset: 5.5 }, play: 'chime', caption: 'a soft chime: a bead lights' },
    ],
  },

  // Beat 5: Bageshri in the lamplit home; sarangi-like strings for Mena; a
  // quiet lamp crackle.
  'n2-b5': {
    start: { layers: ['drone', 'motif'], ambience: { fire: 0.15 } },
    events: [
      { when: { line: 0 }, caption: 'a flute; a lamp crackles quietly' },
      { when: { line: 1 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'bowed strings, pleading' },
      { when: { line: 5 }, set: { layers: ['drone', 'strings'] } },
      { when: { line: 6 }, play: 'chimes', set: { layers: ['drone', 'motif'] }, caption: 'a shimmer of small chimes' },
    ],
  },

  // Beat 6: Malkauns, drone and flute only; a singing bowl at each season
  // (and a chime as each bead lights); a short fire crackle in summer,
  // nothing in winter.
  'n2-b6': {
    start: { layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'a deep, slow flute in the night' },
      { when: { line: 3, offset: 2 }, play: 'bowl', caption: 'a singing bowl' },
      { when: { line: 5 }, play: 'bowl', set: { ambience: { fire: 0.2 } }, caption: 'a singing bowl; fires crackle' },
      { when: { line: 6 }, play: 'bowl', set: { ambience: {} }, caption: 'a singing bowl; the rains' },
      { when: { line: 7 }, play: 'bowl', caption: 'a singing bowl; winter, silent' },
      { when: { line: 11 }, play: 'rise', caption: 'the rising phrase, once more' },
    ],
  },

  // Beat 7: Marwa; light percussion and strings; one tabla figure as she
  // laughs; a chime as the sages bow; the drone hardens as the ascetic speaks.
  'n2-b7': {
    start: { layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'strings' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'strings', 'percussion'], taal: 'dadra' }, caption: 'a bright tabla figure' },
      { when: { line: 9 }, set: { layers: ['drone', 'motif'] } },
      { when: { line: 9, offset: 2 }, play: 'chime', caption: 'a soft chime: a bead lights' },
      { when: { line: 13 }, set: { layers: ['drone', 'strings'] }, caption: 'low strings' },
      { when: { line: 18 }, set: { layers: ['drone'] }, caption: 'the drone alone' },
    ],
  },

  // Beat 8: near silence while the family decides; at the reveal Bhupali
  // returns with the falling answer, a temple bell and the resolution layer.
  'n2-b8': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a bell' },
      { when: { cue: 'reveal' }, play: 'bell', set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'a temple bell' },
      { when: { cue: 'reveal' }, play: 'answer', caption: 'the flute answers, falling home' },
      { when: { cue: 'reveal', offset: 9 }, play: 'chime', caption: 'a soft chime: a bead lights' },
    ],
  },

  // Beat 9: Bhupali; santoor; the rising phrase three times, each a little
  // later; a bell as the ring becomes her rosary.
  'n2-b9': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif', 'resolution'] },
    events: [
      { when: { line: 0 }, play: 'rise', caption: 'the rising flute phrase' },
      { when: { line: 1 }, play: 'rise' },
      { when: { line: 2 }, play: 'rise', caption: 'the rising phrase, a third time' },
      { when: { line: 2, offset: 4 }, play: 'bell', caption: 'a temple bell' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 10: Yaman; drone and soft flute.
  'n2-b10': {
    events: [{ when: { at: 0 }, play: 'pageTurn', caption: 'a soft flute' }],
  },

  // Beat 11 (Hogwarts palette): a low string drone, harp and celesta; a
  // hush when the candles gutter; strings swell as the stag runs.
  'n2-b11': {
    start: { motifVoice: 'harp', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'a harp, softly' },
      { when: { line: 1 }, set: { layers: ['drone'] }, caption: 'a cold hush' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif'], motifVoice: 'celesta' }, caption: 'celesta-like bells' },
      { when: { line: 5 }, set: { layers: ['drone', 'strings'] }, caption: 'low strings over the lake' },
      { when: { line: 7 }, play: 'swell', set: { layers: ['drone', 'motif', 'strings'] }, caption: 'a swell of strings' },
    ],
  },

  // Beat 12: the string pad; one harp note for each rung of the ladder.
  'n2-b12': {
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 13 (Hogwarts palette): low woodwind and a string drone; one low
  // pulse as the door opens, then two seconds of silence.
  'n2-b13': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'a low woodwind' },
      { when: { line: 4 }, set: { layers: ['drone'] }, caption: 'the woodwind falls silent' },
      { when: { line: 6, offset: 1 }, play: 'drumHit', set: { silence: 2 }, caption: 'one low pulse, then silence' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif'] }, caption: 'a lone woodwind at dawn' },
    ],
  },

  // Beat 13, gentle alternative (Hogwarts palette): celesta, harp and light
  // pizzicato; a bright harp run when the charm works, and again at the arena.
  'n2-b13g': {
    start: { motifVoice: 'celesta', layers: ['drone', 'motif'], details: ['clock'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'celesta-like bells' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif', 'percussion'] }, caption: 'light pizzicato; a ticking clock' },
      { when: { line: 5, offset: 9 }, play: 'chimes', caption: 'a bright run of bells' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'harp', details: [] }, caption: 'harp and strings' },
      { when: { line: 7 }, play: 'chimes', caption: 'a bright run of bells' },
    ],
  },

  // Beat 14: the string pad; one harp note for each rung.
  'n2-b14': {
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 15: Yaman, drone and sparse santoor; a soft bell for each question.
  'n2-b15': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { at: 0 }, caption: 'soft santoor' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 16: the Yaman drone, quiet.
  'n2-b16': {
    events: [{ when: { at: 0 }, caption: 'the tanpura, quietly' }],
  },

  // Beat 17: Yaman, very soft. (The closing, after Finish, is played by
  // Score.closing(): the falling answer, one temple bell, a tanpura tail.)
  'n2-b17': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },
};
