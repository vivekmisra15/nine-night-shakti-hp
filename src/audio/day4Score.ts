// Night 4's score plan, from the music brief in docs/direction/night-4.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day4.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).
//
// Why these ragas:
// - MALKAUNS, for Beat 2's first two sentences and under Beat 3's cards: a
//   midnight raga with no Re and no Pa. It suits "nothing to see and no one
//   to see it", the time before anything, and gives way at the smile.
// - BHUPALI, from the smile (Beat 2), for the sun (Beat 4), the gourd and the
//   golden egg (Beat 6) and the close: five bright notes with nothing that
//   pulls or aches, so it sounds like the first light. It carries the night's
//   motif, Sa Re Ga then a held Pa ("the first light").
// - YAMAN, for the opening, the theme, Side by side, Today and Reflection: a
//   tender evening raga, the night's thinking voice, as on Night 1.
// - Bageshri and Marwa are not used: there is no longing, loss or peril in
//   Kushmanda's story. There is no climax tonight, only a bloom.
// - Hogwarts beats (8–11) use the separate Hogwarts palette: celesta, harp,
//   soft strings and low clarinet, never a film theme.
//
// Ambience is kept to an occasional soft gust (no continuous noise beds).

import type { BeatScore } from './score';

export const day4Score: Record<string, BeatScore> = {
  // Beat 1: one soft temple bell, Yaman on the tanpura, one bansuri phrase.
  'n4-b1': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.5 }, play: 'phrase', caption: 'a single flute phrase' },
    ],
  },

  // Beat 2: Malkauns, drone only, in the dark; a bell at the smile, then
  // Bhupali and the full motif; a singing bowl as the universe unfolds.
  'n4-b2': {
    start: { raga: 'malkauns', bpm: 52, layers: ['drone'] },
    events: [
      { when: { line: 0 }, caption: 'a low drone in the dark' },
      { when: { line: 2 }, play: 'bell', caption: 'a single temple bell' },
      {
        when: { line: 2, offset: 1.5 },
        play: 'rise',
        set: { raga: 'bhupali', bpm: 60, layers: ['drone', 'motif'], motifVoice: 'bansuri' },
        caption: "the flute: the night's rising phrase, the first light",
      },
      { when: { line: 3 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft bowed strings open out' },
      { when: { line: 4 }, play: 'bowl', set: { layers: ['drone', 'motif', 'strings', 'resolution'] }, caption: 'a singing bowl' },
      { when: { line: 5, offset: 1 }, play: 'answer', caption: 'the flute answers, falling home' },
    ],
  },

  // Beat 3: the Malkauns drone under the cards; a flute phrase answers each
  // choice; at the reveal, a fragment of the Bhupali motif as the egg forms.
  'n4-b3': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a soft bell' },
      {
        when: { cue: 'reveal' },
        play: 'riseFragment',
        set: { raga: 'bhupali', layers: ['drone', 'resolution'] },
        caption: 'the flute, briefly: the first light',
      },
    ],
  },

  // Beat 4: Bhupali; the full motif as the sun rises; strings and soft
  // keherwa tabla; a bell as the eight rays open; a chime for each symbol.
  'n4-b4': {
    start: { layers: ['drone', 'strings'], motifVoice: 'bansuri' },
    events: [
      { when: { line: 0, offset: 1 }, play: 'rise', set: { layers: ['drone', 'motif', 'strings'] }, caption: "the flute: the night's rising phrase" },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings', 'percussion'], taal: 'keherwa' }, caption: 'soft tabla' },
      { when: { line: 3 }, play: 'bell', set: { layers: ['drone', 'motif', 'strings', 'percussion', 'resolution'] }, caption: 'a temple bell' },
      { when: { line: 4 }, set: { motifVoice: 'santoor' }, caption: 'santoor and bells' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 5: drone and a soft santoor figure; a bell for each choice; at the
  // reveal the spark warms into the sun, with a short flute phrase.
  'n4-b5': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, caption: 'soft santoor' },
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a soft bell' },
      { when: { cue: 'reveal' }, play: 'riseFragment', set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'the flute, briefly' },
    ],
  },

  // Beat 6: Bhupali at dusk, santoor, a fragment of the motif; now and then
  // a soft evening gust; a soft bell as the three lights line up.
  'n4-b6': {
    start: { motifVoice: 'santoor', details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'santoor; now and then, a soft evening breeze' },
      { when: { line: 3, offset: 1 }, play: 'riseFragment', caption: 'the flute, briefly' },
      { when: { line: 5 }, play: 'softBell', caption: 'a soft bell' }, // "Kushmanda's story joins these old ideas..."
    ],
  },

  // Beat 7: Yaman, the drone and one bansuri phrase.
  'n4-b7': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { at: 0 }, play: 'pageTurn' },
      { when: { at: 2 }, play: 'phrase', caption: 'a flute phrase' },
    ],
  },

  // Beat 8 (Hogwarts palette), following the retelling: a low string drone and
  // low woodwind in the storm; a soft drum thud as the door bursts in;
  // celesta and harp from the box; warm strings as the fire catches.
  'n4-b8': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low strings and woodwind; storm gusts' },
      { when: { line: 1 }, set: { details: ['gusts', 'clock'] }, caption: 'a quiet ticking watch' }, // "counting down the minutes"
      { when: { line: 3 }, play: 'drumHit', set: { layers: ['drone'], details: ['gusts'] }, caption: 'a deep, soft thud' }, // "a tremendous bang"
      { when: { line: 4 }, set: { layers: ['drone', 'motif'], motifVoice: 'celesta', details: [] }, caption: 'celesta-like bells' }, // the squashed box
      { when: { line: 5 }, set: { motifVoice: 'harp' }, caption: 'a soft harp' }, // the cake
      { when: { line: 7 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'warm strings as the fire catches' },
    ],
  },

  // Beat 9: the low string pad; one harp note for each rung of the ladder.
  'n4-b9': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 10 (Hogwarts palette): harp and celesta, soft strings; a light bell
  // as the jumper unfolds.
  'n4-b10': {
    start: { motifVoice: 'harp', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'a soft harp' },
      { when: { line: 1 }, set: { motifVoice: 'celesta' }, caption: 'celesta-like bells' }, // the pile of presents
      { when: { line: 3 }, play: 'chime', set: { layers: ['drone', 'motif', 'strings'] }, caption: 'a light bell; soft strings' }, // the jumper
      { when: { line: 6 }, set: { motifVoice: 'harp' }, caption: 'the harp again' }, // the twins
    ],
  },

  // Beat 11: the string pad; one harp note for each rung of the ladder.
  'n4-b11': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12: Yaman, drone and santoor; a soft bell for each question.
  'n4-b12': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { at: 0 }, caption: 'tanpura and soft santoor' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 13: Yaman, tanpura and soft santoor; a quiet room.
  'n4-b13': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 14: Yaman, very soft, under the questions; at the theme it turns
  // back to Bhupali with a bell. (The closing is played by Score.closing().)
  'n4-b14': {
    start: { motifVoice: 'bansuri' },
    events: [{ when: { cue: 'takeaway' }, play: 'bell', set: { raga: 'bhupali' }, caption: 'a temple bell' }],
  },
};
