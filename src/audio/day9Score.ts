// Night 9's score plan, from the music brief in docs/direction/night-9.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day9.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// Why these ragas (root D, tanpura on Sa–Pa; nothing tonight above mf):
// - Bhupali (Beats 1, 2, 3, 7 and 15): serene, open devotion. The series
//   began in Bhupali on Night 1, so returning to it for the giver of
//   perfection and the look-back closes the circle.
// - Yaman (Beats 4, 9, 14, 16 and 17): a tender evening raga; its gentle
//   sharp Ma suits Shiva and Shakti as one being, and the quiet screens.
// - Bageshri (Beats 5 and 6): longing, for two men who have lost everything
//   and still worry about the people who wronged them.
// - Bhairav (Beat 8): a grave, devotional dawn raga for the tenth day; its
//   flat Re and Dha give sacred weight without tension.
// - Marwa is not used: nothing on this night is tense or unsettled.
// The Hogwarts scenes (Beats 10–13) keep their own palette: celesta-like
// bells, harp, soft strings and low woodwind, never imitating a film theme.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).

import type { BeatScore, ScoreEvent } from './score';

// Beat 2: a santoor shimmer for each of the eight sparks as it leaves the
// lotus. The same moments as sparkLeaves in GiverOfPerfection.tsx:
// [sentence, seconds after it starts].
const sparkLeaves: [number, number][] = [[4, 0.3], [4, 2.3], [4, 4.3], [5, 0.3], [5, 2.3], [5, 4.3], [6, 0.3], [6, 2.3]];
const sparkChimes: ScoreEvent[] = sparkLeaves.map(([line, offset], i) => ({
  when: { line, offset },
  play: 'chime' as const,
  caption: i === 0 ? 'a santoor shimmer for each spark' : undefined,
}));

// Beat 15: a soft bell as each of the nine diyas lights (the same times as
// LookBack.tsx), and the series' rising flute phrase whole at the ninth.
const diyaLightsAt = (i: number) => 3 + i * 3.5;
const diyaBells: ScoreEvent[] = Array.from({ length: 9 }, (_, i) => ({
  when: { at: diyaLightsAt(i) },
  play: 'softBell' as const,
  caption: i === 0 ? 'a soft bell as each diya lights' : undefined,
}));

export const day9Score: Record<string, BeatScore> = {
  // Beat 1: a temple bell, the tanpura, then the bansuri's rising phrase
  // (Sa Re Ga Pa, "the mountain rising") whole, as the bud appears.
  'n9-b1': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.5 }, play: 'rise', caption: "the flute: the series' rising phrase" },
    ],
  },

  // Beat 2: the santoor, the giver's shimmer, with soft strings.
  'n9-b2': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'santoor' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft strings' },
      ...sparkChimes,
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 3: the drone and a held santoor; at "what happens", the music
  // thins a little (the warnings).
  'n9-b3': {
    start: { layers: ['drone'], motifVoice: 'santoor' },
    events: [
      { when: { cue: 'pick:' }, play: 'chime', caption: 'a soft santoor note' },
      { when: { cue: 'reveal' }, play: 'softBell', set: { layers: ['drone'] }, caption: 'a soft bell' },
    ],
  },

  // Beat 4.1: Yaman; a singing bowl as the two lights join.
  'n9-b4a': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 1 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft strings' },
      { when: { line: 1, offset: 3.5 }, play: 'bowl', caption: 'a singing bowl' },
    ],
  },

  // Beat 4.2: Yaman; Night 1's rising fragment at the cross-fade to Kailasa.
  'n9-b4b': {
    start: { motifVoice: 'santoor', layers: ['drone', 'strings'] },
    events: [
      { when: { line: 2, offset: 2 }, set: { layers: ['drone', 'motif', 'strings'] } },
      { when: { line: 6, offset: 1 }, play: 'riseFragment', caption: "the flute, briefly: Night 1's phrase" },
    ],
  },

  // Beat 5: Bageshri on the bansuri, light tabla; now and then a soft gust
  // in the forest; a temple bell as the Devi appears.
  'n9-b5': {
    start: { motifVoice: 'bansuri', layers: ['drone', 'motif'], details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'a longing flute; now and then, the wind' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'percussion'], taal: 'dadra' }, caption: 'light tabla' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif'], details: [] }, caption: 'the river, quiet' },
      { when: { line: 10 }, play: 'bell', caption: 'a temple bell' },
    ],
  },

  // Beat 6: the Bageshri drone alone while the family decides.
  'n9-b6': {
    start: { layers: ['drone'] },
    events: [{ when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' }],
  },

  // Beat 7: Bhupali returns; the climax layer swells gently as her light
  // reaches both men (mf, no more); a single bell as she vanishes.
  'n9-b7': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'santoor, warm and open' },
      { when: { line: 4 }, play: 'swell', set: { layers: ['drone', 'motif', 'strings', 'climax'] }, caption: 'strings swell gently' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'strings', 'resolution'] } },
      { when: { line: 8 }, play: 'bell', set: { layers: ['drone', 'resolution'] }, caption: 'a single bell' },
    ],
  },

  // Beat 8 (steps 8.1–8.4): Bhairav at dawn, with light percussion.
  'n9-b8a': {
    start: { motifVoice: 'bansuri', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'a dawn raga on the flute' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'percussion'], taal: 'keherwa' }, caption: 'light percussion' },
    ],
  },
  // The effigy: a short crackle only; then, for Bengal, a soft dhak-like
  // drum pattern, very quiet.
  'n9-b8b': {
    start: { motifVoice: 'bansuri', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, set: { ambience: { fire: 0.2 } }, caption: 'a little fire crackle' },
      { when: { line: 1 }, set: { ambience: {}, layers: ['drone', 'motif', 'percussion'], taal: 'drive' }, caption: 'a soft festival drum' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif'] } },
    ],
  },
  'n9-b8c': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif', 'percussion'], taal: 'keherwa' },
    events: [
      { when: { line: 0 }, caption: 'santoor and light percussion' },
    ],
  },

  // Beat 9: Yaman, the drone and a slow santoor phrase.
  'n9-b9': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { at: 0 }, play: 'pageTurn' },
      { when: { cue: 'idea:' }, play: 'phrase', caption: 'a flute phrase' },
    ],
  },

  // Beat 10 (Hogwarts palette): a low string pad, harp and celesta; one
  // bell at the mending; the pad thins to a single low woodwind note as the
  // wand is laid down; a soft gust by the water.
  'n9-b10': {
    start: { motifVoice: 'harp', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'a low string pad; harp' },
      { when: { line: 1 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft strings' },
      { when: { line: 3 }, set: { motifVoice: 'celesta' }, caption: 'celesta-like bells' },
      { when: { line: 4, offset: 2.4 }, play: 'chime', caption: 'one bell, as the wand mends' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'clarinet', details: ['gusts'] }, caption: 'a single low woodwind; a soft gust by the water' },
      { when: { line: 6 }, set: { layers: ['drone'], details: [] } },
    ],
  },

  // Beat 11: the low string pad only; a harp note for each rung.
  'n9-b11': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette): harp, celesta and low woodwind; a celesta
  // note as the Stone drops.
  'n9-b12': {
    start: { motifVoice: 'harp', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, caption: 'harp' },
      { when: { line: 2 }, set: { motifVoice: 'clarinet' }, caption: 'a low woodwind, in the stone chamber' },
      { when: { line: 5, offset: 1 }, play: 'chime', caption: 'a celesta note as the Stone drops' },
      { when: { line: 6 }, set: { motifVoice: 'celesta' }, caption: 'soft celesta-like bells' },
    ],
  },

  // Beat 13: the string pad only.
  'n9-b13': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: the Yaman drone; a soft bell for each question revealed.
  'n9-b14': {
    events: [
      { when: { at: 0 }, caption: 'the tanpura drone' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 15: Bhupali; a soft bell for each diya, and the series' rising
  // phrase whole as the ninth lights.
  'n9-b15': {
    start: { motifVoice: 'santoor', layers: ['drone', 'strings'] },
    events: [
      ...diyaBells,
      { when: { at: diyaLightsAt(8) + 0.8 }, play: 'rise', caption: "the flute: the series' rising phrase, whole" },
      { when: { at: diyaLightsAt(8) + 6 }, set: { layers: ['drone', 'motif', 'strings'] } },
    ],
  },

  // Beat 16: Yaman, the drone and a slow santoor line.
  'n9-b16': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 17: Yaman, very soft; a temple bell when the theme is shown again.
  // (The closing, after Finish, is played by Score.closing(): the flute's
  // falling answer, a bell and a tanpura tail.)
  'n9-b17': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', set: { raga: 'bhupali' }, caption: 'a temple bell' }],
  },
};
