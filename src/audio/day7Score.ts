// Night 7's score plan, from the music brief in docs/direction/night-7.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day7.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).
//
// Why these ragas (root D, tanpura Sa–Pa, as on Night 1):
// - Malkauns (opening, Beat 8): a late-night raga with no Re or Pa (S g m d n),
//   heavy and inward. It is the sound of "the dark night" that is calm, not
//   menacing, so Kalaratri's open hand is heard as stillness, not threat.
// - Marwa (Beats 2–7): it has no Pa to rest on, so the threat of the army and
//   the multiplying demon never settles until the drops are caught in Beat 7.
// - Yaman (Beats 9, 14, 15, 16): the warm, reflective evening voice the series
//   uses for ideas and talk.
// - Bhupali (the closing): Night 1's raga of serene devotion, for the pearl
//   light before dawn, a hint that light returns (set as day7.closing.raga).
// Hogwarts scenes (Beats 10–13) use the separate original palette: celesta-
// like bells, harp, soft strings and low woodwind, never a film theme.

import type { BeatScore } from './score';

export const day7Score: Record<string, BeatScore> = {
  // Beat 1: one temple bell, then the tanpura and a low bansuri in Malkauns.
  'n7-b1': {
    start: { motifVoice: 'bansuri', details: ['gusts'] },
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a single temple bell' },
      { when: { at: 1.5 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.5 }, play: 'riseFragment', caption: 'a low bamboo flute' },
    ],
  },

  // Beat 2: Marwa, uneasy; a soft low drum as the army gathers; a low swell
  // as the Devi's face darkens.
  'n7-b2': {
    start: { motifVoice: 'bansuri', details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'a restless flute over the drone' },
      { when: { line: 5, offset: 6.5 }, play: 'bell', caption: 'one ringing sound' }, // her single sound
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'percussion'], taal: 'heartbeat' }, caption: 'a soft, low drum' },
      { when: { line: 9 }, play: 'swell', set: { layers: ['drone', 'strings'] }, caption: 'a low swell of strings' },
    ],
  },

  // Beat 3: the Marwa drone with a soft tabla pulse while the family decides.
  'n7-b3': {
    start: { taal: 'heartbeat' },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'drumHit', caption: 'a deep drum' },
    ],
  },

  // Beat 4: the battle builds; the climax (low drums, swelling strings) as
  // the generals fall; then the drone alone for the naming, and one bell on
  // "Chamunda".
  'n7-b4': {
    start: { taal: 'keherwa' },
    events: [
      { when: { line: 0 }, play: 'drumHit', caption: 'a deep drum as Kali rises' },
      { when: { line: 3 }, set: { taal: 'drive' }, caption: 'driving drums' },
      {
        when: { line: 6 },
        set: { layers: ['drone', 'motif', 'percussion', 'strings', 'climax'], taal: 'drive' },
        caption: 'pounding low drums and swelling strings',
      },
      { when: { line: 7 }, set: { layers: ['drone'] }, caption: 'the drone alone' },
      { when: { line: 8, offset: 6 }, play: 'bell', caption: 'a temple bell' },
    ],
  },

  // Beat 5: everything but the resolution; each landing drop a quiet low thud.
  'n7-b5': {
    start: { taal: 'keherwa' },
    events: [
      { when: { line: 1 }, play: 'chimes', caption: 'a shimmer of bells as the Mothers rise' },
      { when: { line: 4 }, play: 'drumHit', caption: 'a heavy drum' },
      { when: { line: 6, offset: 1.5 }, play: 'drumHit', caption: 'a soft low thud as a drop lands' },
      { when: { line: 6, offset: 4.7 }, play: 'drumHit' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif', 'percussion', 'strings', 'climax'], taal: 'drive' }, caption: 'low drums, faster and faster' },
      { when: { line: 9 }, play: 'swell', caption: 'strings, rising and unresolved' },
    ],
  },

  // Beat 6: the Marwa drone with a low, uneasy string pedal.
  'n7-b6': {
    events: [
      { when: { at: 0 }, caption: 'a low, uneasy string note' },
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a soft bell' },
      { when: { cue: 'reveal' }, play: 'bell', caption: 'a single bell' },
    ],
  },

  // Beat 7: a low laugh of bells; the climax on the catching of the drops;
  // then drone and singing bowl as the sky clears, and a bell for the last copy.
  'n7-b7': {
    start: { taal: 'keherwa' },
    events: [
      { when: { line: 0, offset: 1 }, play: 'chimes', caption: 'a low laugh of bells' },
      { when: { line: 5 }, set: { taal: 'drive' }, caption: 'drums gather' },
      {
        when: { line: 6 },
        set: { layers: ['drone', 'motif', 'percussion', 'strings', 'climax'], taal: 'drive' },
        caption: 'the full drums and strings as the drops are caught',
      },
      { when: { line: 8 }, play: 'bowl', set: { layers: ['drone', 'resolution'] }, caption: 'a singing bowl; the drums fall away' },
      { when: { line: 8, offset: 4 }, play: 'bell', caption: 'a bell as the last copy fades' },
    ],
  },

  // Beat 8: Malkauns, the night's motif whole on the bansuri; a temple bell
  // on the open hand; a soft chime for each symbol.
  'n7-b8': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { line: 0 }, caption: 'a slow, deep flute melody' },
      { when: { line: 0, offset: 2 }, play: 'rise', caption: "the flute: the night's phrase" },
      { when: { line: 7, offset: 1 }, play: 'bell', caption: 'a temple bell' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 9: Yaman, tanpura and slow santoor, very soft.
  'n7-b9': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, play: 'pageTurn', caption: 'soft santoor' }],
  },

  // Beat 10 (Hogwarts palette): low woodwind and pizzicato; the wardrobe's
  // short rattle; celesta bells on the laughter; a ticking clock and soft
  // harp for the tea.
  'n7-b10': {
    start: { motifVoice: 'clarinet' },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low woodwind and plucked strings' },
      { when: { line: 0, offset: 2 }, play: 'drumHit', caption: 'a low knock from the wardrobe' },
      { when: { line: 2, offset: 5 }, play: 'chimes', set: { motifVoice: 'celesta' }, caption: 'bright bells, like laughter' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif'], motifVoice: 'clarinet' }, caption: 'the plucking stops' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp', details: ['clock'] }, caption: 'a soft harp; a ticking clock' },
      { when: { line: 7 }, set: { motifVoice: 'celesta', details: [] }, caption: 'soft bells' },
    ],
  },

  // Beat 11: the low string pad; a harp note for each rung of the ladder.
  'n7-b11': {
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette): soft strings and low woodwind; a falling harp
  // for the candle; celesta for the silver light; thin cool strings at the end.
  'n7-b12': {
    start: { motifVoice: 'clarinet' },
    events: [
      { when: { at: 0 }, caption: 'soft strings and low woodwind' },
      { when: { line: 2 }, set: { motifVoice: 'harp' }, caption: 'a slow, falling harp' },
      { when: { line: 4 }, play: 'chimes', set: { motifVoice: 'celesta' }, caption: 'celesta-like bells' },
      { when: { line: 6 }, set: { layers: ['drone', 'strings'] }, caption: 'thin, cool strings' },
      { when: { line: 7 }, set: { layers: ['drone'] }, caption: 'the string pad alone' },
    ],
  },

  // Beat 12, the gentle alternative (Hogwarts palette): low woodwind, a tense
  // string pedal in the room, then harp and celesta warming.
  'n7-b12g': {
    start: { motifVoice: 'clarinet', details: ['gusts'] },
    events: [
      { when: { at: 0 }, caption: 'low woodwind; a soft gust of wind' },
      { when: { line: 2 }, set: { layers: ['drone', 'strings'], details: [] }, caption: 'a tense, held string note' },
      { when: { line: 4 }, play: 'drumHit', caption: 'a low knock' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp' }, caption: 'a warm harp' },
      { when: { line: 7 }, set: { motifVoice: 'celesta' }, caption: 'soft bells' },
    ],
  },

  // Beat 13: the string pad; a harp note for each rung.
  'n7-b13': {
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: the Yaman drone, very soft; a bell for each question.
  'n7-b14': {
    events: [
      { when: { at: 0 }, caption: 'a soft tanpura drone' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 15: Yaman, tanpura and santoor, very soft.
  'n7-b15': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 16: Yaman, very soft; a bell when the theme is shown again. (The
  // closing, after Finish, plays Bhupali's cadence: see day7.closing.)
  'n7-b16': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', caption: 'a temple bell' }],
  },
};
