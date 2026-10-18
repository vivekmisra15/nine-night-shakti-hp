// Night 8's score plan, from the music brief in docs/direction/night-8.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day8.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).
//
// Why these ragas:
// - Bageshri (Beats 2–4): longing and a quiet hurt. Its komal (flat) Ga and
//   Ni ache without anger: the sting of the joke and the long going-away.
// - Bhupali (the opening, Beats 5 and 8): serene, open devotion. It suits
//   the calm brightness of Gauri and Mahagauri, and it links back to
//   Shailaputri's bull on Night 1. Its "coming home" phrase (Dha Pa Ga Re
//   Sa, the bansuri's falling answer) plays at Gauri and at the close.
// - Yaman (Beats 6, 7, 9 and 14–16): a tender evening raga, warm and
//   thoughtful, for the wishes, the theme and the talk at the end. Beat 7
//   stays on drone and soft santoor in Yaman, so that no telling sounds
//   more "right" than another.
// - Bhairav (approved for the closing): a solemn, fresh dawn raga for
//   "begin again". (The shared closing plays the falling answer; see the
//   note in the handover report.)
// The Hogwarts scenes (Beats 10–13) use the separate original palette:
// celesta-like bells, harp, soft strings and low woodwind.
// There are no continuous noise beds tonight: only an occasional gust, and
// a brief fire crackle in summer.

import type { BeatScore } from './score';

export const day8Score: Record<string, BeatScore> = {
  // Beat 1: a temple bell, then the tanpura and a fragment of the flute
  // as the moon rises over the sea.
  'n8-b1': {
    start: { details: ['gusts'] },
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 9 }, play: 'riseFragment', caption: 'the flute, briefly' },
    ],
  },

  // Beat 2: Bageshri on the flute; a single low note as the joke stings
  // (sentence 3, "She did not hear it as one").
  'n8-b2': {
    start: { motifVoice: 'bansuri', details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'a quiet flute, longing' },
      { when: { line: 3 }, play: 'drumHit', set: { layers: ['drone'] }, caption: 'one low note; the flute stops' },
      { when: { line: 4 }, set: { layers: ['drone', 'motif'] }, caption: 'the flute returns, sharper' },
    ],
  },

  // Beat 3: the drone alone under the cards; a phrase for each choice; one
  // bell as she leaves for the coast.
  'n8-b3': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 4: drone and sustained sarangi-like strings; a soft bell at each
  // change of season; a brief fire crackle in summer.
  'n8-b4': {
    start: { layers: ['drone', 'strings'] },
    events: [
      { when: { line: 0 }, caption: 'the drone and a long bowed string' },
      { when: { line: 3 }, play: 'softBell', set: { ambience: { fire: 0.2 } }, caption: 'a soft bell; small fires crackle' },
      { when: { line: 4 }, play: 'softBell', set: { ambience: {}, details: ['gusts'] }, caption: 'a soft bell; wind and rain' },
      { when: { line: 5 }, play: 'softBell', set: { details: [] }, caption: 'a soft bell; still water' },
      { when: { line: 6 }, play: 'chimes', caption: 'the seasons turn: a shimmer of small chimes' },
    ],
  },

  // Beat 5: Bhupali; the "coming home" phrase as she shines; a temple bell
  // as Shiva comes; bells and a bowl for the boon.
  'n8-b5': {
    start: { layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'Bhupali on the flute, open and calm' },
      { when: { line: 1, offset: 1 }, play: 'answer', caption: 'the flute falls home' },
      { when: { line: 2 }, play: 'bell', set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'a temple bell' },
      { when: { line: 4, offset: 1 }, play: 'bowl', caption: 'a singing bowl' },
    ],
  },

  // Beat 6: Yaman, drone and soft santoor; a phrase for each choice; at the
  // reveal, small temple chimes as the visitors gather.
  'n8-b6': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, caption: 'soft santoor' },
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'chimes', caption: 'small temple chimes' },
    ],
  },

  // Beat 7: the drone and soft santoor only, so no telling sounds more
  // "right" than another.
  'n8-b7a': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'the drone and soft santoor' }],
  },
  'n8-b7b': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { line: 7 }, play: 'softBell', caption: 'a soft bell' }],
  },

  // Beat 8: a temple bell; Bhupali with bells; a chime for each symbol.
  'n8-b8': {
    start: { layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { line: 0 }, play: 'bell', caption: 'a temple bell' },
      { when: { line: 1 }, set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'the flute, with soft bells' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 9: Yaman, slow santoor, very soft.
  'n8-b9': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { at: 0 }, play: 'pageTurn' },
      { when: { cue: 'idea:' }, play: 'phrase', caption: 'a flute phrase' },
    ],
  },

  // Beat 10 (Hogwarts palette): low woodwind and soft strings in the dark
  // kitchen; strings only in the cave; celesta as the locket is given; harp
  // as the kitchen brightens.
  'n8-b10': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif', 'strings'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low woodwind and soft strings' },
      { when: { line: 2 }, set: { layers: ['drone', 'strings'] }, caption: 'the cave: low strings, a drip of water' },
      { when: { line: 3, offset: 2 }, set: { silence: 2 }, caption: 'near silence' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'celesta' }, caption: 'celesta-like bells' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'resolution'], motifVoice: 'harp' }, caption: 'a warm harp' },
    ],
  },

  // Beat 11: the low string pad; one harp note for each rung of the ladder.
  'n8-b11': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette): a gust of wind in the snow; harp and
  // celesta for the doe; low strings swell to the climax layer (softly) as
  // the sword comes down; resolution as the three are together again.
  'n8-b12': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { at: 0 }, caption: 'wind in the snow; a low clarinet' },
      { when: { line: 1 }, set: { motifVoice: 'celesta', layers: ['drone', 'motif'] }, caption: 'harp and celesta-like bells' },
      { when: { line: 2 }, play: 'drumHit', set: { layers: ['drone', 'strings'] }, caption: 'the ice cracks; low strings' },
      { when: { line: 4 }, set: { layers: ['drone', 'strings', 'percussion'] }, caption: 'strings tightening' },
      { when: { line: 5 }, play: 'swell', set: { layers: ['drone', 'strings', 'climax'] }, caption: 'a swell of strings' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp', details: [] }, caption: 'a lone harp' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'soft high bells' },
    ],
  },

  // Beat 13: the string pad, sparse harp.
  'n8-b13': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: the Yaman drone; a soft bell for each question.
  'n8-b14': {
    events: [
      { when: { at: 0 }, caption: 'the tanpura drone' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 15: Yaman, tanpura and soft santoor.
  'n8-b15': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 16: Yaman under the questions; at the theme, Bhupali and a bell.
  // (The closing, after Finish, is played by Score.closing().)
  'n8-b16': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', set: { raga: 'bhupali' }, caption: 'a temple bell' }],
  },
};
