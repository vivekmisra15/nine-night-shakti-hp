// Night 5's score plan, from the music brief in docs/direction/night-5.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day5.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// Why each raga (the brief's choices):
//   Marwa    (Beat 2, Beat 7)  twilight unease with no Pa to rest on: Taraka's
//                              rule and the battle never settle until he falls.
//   Bhupali  (Beats 1, 3, 8)   serene devotion, open and bright: the three
//                              worlds' joy at the birth; Skandamata worshipped.
//   Bageshri (Beats 4–5)       longing: the Krittikas' fierce love, and the
//                              fear of losing him at the door.
//   Yaman    (Beats 6, 9, 14–16, closing)  a tender, warm evening: a
//                              mother's lap; the theme; the night ends warm.
// The night's motif is the rising bansuri phrase ('rise'), "held, then
// sent", heard whole at Beats 6 and 8, with fragments elsewhere.
// Hogwarts beats (10–13) use the separate original palette (low woodwind,
// harp, celesta-like bells, soft strings) and never imitate a film theme.
// There are no continuous noise beds: only an occasional soft gust.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).

import type { BeatScore } from './score';

export const day5Score: Record<string, BeatScore> = {
  // Beat 1: a resolution bell, the tanpura, then the night's phrase previewed once, softly.
  'n5-b1': {
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins', set: { details: ['gusts'] } },
      { when: { at: 12 }, play: 'riseFragment', caption: 'a bamboo flute, a few rising notes' },
    ],
  },

  // Beat 2: Marwa, uneasy; a low drum as Taraka's rule spreads, with a gust.
  'n5-b2': {
    start: { taal: 'heartbeat' },
    events: [
      { when: { line: 0 }, caption: 'a low, uneasy flute over the drone' },
      { when: { line: 1 }, play: 'chime', caption: 'a soft chime as Brahma appears' },
      { when: { line: 7 }, play: 'drumHit', set: { details: ['gusts'] }, caption: 'a low drum stroke; a gust of wind' },
      { when: { line: 9 }, set: { layers: ['drone', 'motif'] }, caption: 'the drum falls away' },
    ],
  },

  // Beat 3: Bhupali, bright; santoor shimmer and a bell as the child appears.
  'n5-b3a': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { line: 2 }, play: 'riseFragment', caption: 'the flute, as the spark falls' },
      { when: { line: 3 }, caption: 'santoor and soft strings' },
      { when: { line: 7 }, play: 'chimes', caption: 'a shimmer of santoor and small bells' },
      { when: { line: 7, offset: 2 }, play: 'bell', caption: 'a temple bell' },
    ],
  },
  'n5-b3b': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 4: Bageshri; the flute's longing, strings as the six faces open.
  'n5-b4a': {
    events: [
      { when: { line: 0 }, caption: 'a longing flute melody' },
      { when: { line: 2, offset: 1 }, play: 'chime', caption: 'a soft chime' },
    ],
  },
  'n5-b4b': {
    events: [{ when: { line: 1, offset: 2 }, play: 'bowl', caption: 'a singing bowl as the six become one' }],
  },

  // Beat 5: the drone alone while choosing; a phrase for each choice; the
  // motif returns at the reveal.
  'n5-b5': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, set: { layers: ['drone', 'motif'] }, caption: 'the flute melody returns' },
    ],
  },

  // Beat 6: Yaman; the night's phrase heard whole; a soft bell for each gift.
  'n5-b6': {
    start: { motifVoice: 'bansuri', details: ['gusts'] },
    events: [
      { when: { line: 1, offset: 1 }, play: 'rise', caption: "the flute: the night's rising phrase" },
      { when: { line: 3, offset: 3 }, play: 'chime', caption: 'a bright chime, like laughter' },
      { when: { line: 5, offset: 2 }, play: 'softBell', caption: 'a soft bell for each gift' },
      { when: { line: 5, offset: 4 }, play: 'softBell' },
      { when: { line: 5, offset: 6.5 }, play: 'softBell' },
      { when: { line: 6, offset: 1.5 }, play: 'softBell' },
      { when: { line: 8 }, play: 'answer', caption: 'the flute answers, falling home' },
    ],
  },

  // Beat 7: Marwa, the drone alone while choosing; on the reveal, drums,
  // strings and the climax, with one conch call at the strike.
  'n5-b7': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a bell' },
      {
        when: { cue: 'reveal' },
        play: 'conch',
        set: { layers: ['drone', 'percussion', 'strings', 'climax'], taal: 'drive' },
        caption: 'drums, rising strings and a conch-like call',
      },
    ],
  },

  // Beat 8: Bhupali; the phrase whole; a bell for each symbol tapped.
  'n5-b8a': {
    events: [{ when: { line: 0, offset: 1 }, play: 'rise', caption: "the flute: the night's rising phrase" }],
  },
  'n5-b8b': {
    events: [
      { when: { line: 1, offset: 1 }, play: 'chime', caption: 'a soft chime as the vel passes' },
      { when: { cue: 'hotspot:' }, play: 'bell', caption: 'a temple bell' },
    ],
  },

  // Beat 9: Yaman, drone and soft santoor.
  'n5-b9': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, play: 'pageTurn' }],
  },

  // Beat 10 (Hogwarts palette): low woodwind and soft strings; a celesta-like
  // bell as Lupin steadies the table.
  'n5-b10': {
    start: { motifVoice: 'clarinet' },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low woodwind and soft strings' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings', 'percussion'] }, caption: 'pizzicato strings, back and forth' },
      { when: { line: 5 }, play: 'harpNote', set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'celesta' }, caption: 'a celesta-like bell; the strings settle' },
      { when: { line: 8 }, set: { layers: ['drone', 'motif'], motifVoice: 'clarinet' }, caption: 'a low clarinet, fading' },
    ],
  },

  // Beat 11: the string pad; a harp note for each rung of the ladder.
  'n5-b11': {
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette): soft strings and harp; a harp pulse for the
  // heartbeat; no climax.
  'n5-b12': {
    start: { motifVoice: 'harp', details: ['gusts'] },
    events: [
      { when: { at: 0 }, caption: 'soft strings and harp; wind in the trees' },
      { when: { line: 3, offset: 1 }, play: 'harpNote', caption: 'a harp note, like a heartbeat' },
      { when: { line: 3, offset: 1.9 }, play: 'harpNote' },
      { when: { line: 5 }, set: { layers: ['drone', 'strings'], details: [] }, caption: 'the strings hold' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif'], motifVoice: 'celesta' }, caption: 'distant celesta-like bells' },
    ],
  },

  // Beat 13: the drone and sparse harp.
  'n5-b13': {
    start: { motifVoice: 'harp' },
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: the Yaman drone; a soft bell for each question.
  'n5-b14': {
    events: [{ when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' }],
  },

  // Beat 15: Yaman, the drone and soft santoor.
  'n5-b15': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 16: Yaman, very soft; one temple bell at the theme. (The closing,
  // after Finish, is played by Score.closing().)
  'n5-b16': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', caption: 'a temple bell' }],
  },
};
