// Night 3's score plan, from the music brief in docs/direction/night-3.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day3.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).
//
// Why each raga (the direction brief's choices):
// - Bhupali (opening splash feel, Beat 2, Beat 7's reveal): serene, open
//   devotion. Festive expectation on the wedding day, and the return to joy
//   when the wedding goes ahead.
// - Marwa (Beats 3 and 5): twilight unease with no resting note. Mena's
//   terror and anger: nothing settles until someone calms it.
// - Bageshri (Beat 4): longing and a gentle ache. Parvati is caught between
//   two people she loves.
// - Durga (Beats 1, 6 and 8): bright, steady devotional valour (S R M P D),
//   traditionally linked with the Devi. Strong without being harsh, which is
//   exactly "fierce and calm at once". Its phrases include the night's motif,
//   Sa Re Ma Pa ("the bell lifted") and Dha Pa Ma Re Sa ("the bell at rest").
// - Yaman (Beat 9, Beats 14–16): tender evening, warm and reflective, for the
//   theme and the Reflect section.
// The Hogwarts scenes use the separate original palette (celesta-like bells,
// harp, soft strings, low woodwind). Molly's duel uses only low strings and
// low drum, and ends in the drone with no climax or celebration.
//
// The night's signature sound is one soft temple bell, and it always rings
// just *before* something happens, never on an impact.
//
// Note: the shared 'rise' and 'answer' sounds play Night 1's motif (with Ga,
// which Raga Durga does not use), so tonight's motif is heard through
// 'phrase', which picks a phrase from the current raga's own bank.

import type { BeatScore } from './score';

export const day3Score: Record<string, BeatScore> = {
  // Beat 1: one bell at the start, the tanpura, then a Durga phrase as the
  // bell-moon appears; a soft gust now and then.
  'n3-b1': {
    start: { motifVoice: 'bansuri', details: ['gusts'] },
    events: [
      { when: { at: 0.2 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.6 }, play: 'phrase', caption: 'a bamboo flute: the bell lifted' },
    ],
  },

  // Beat 2: Bhupali, santoor and festive tabla; a small bell as each god
  // appears in the sky.
  'n3-b2': {
    start: { motifVoice: 'santoor', taal: 'keherwa' },
    events: [
      { when: { line: 0 }, caption: 'santoor and light festive tabla' },
      { when: { line: 4 }, play: 'softBell', caption: 'a small bell' }, // Indra
      { when: { line: 6 }, play: 'softBell', caption: 'a small bell' }, // the moon
      { when: { line: 6, offset: 2.6 }, play: 'softBell' }, // the sun
      { when: { line: 6, offset: 5.2 }, play: 'softBell' }, // Brihaspati
    ],
  },

  // Beat 3: Marwa. Frame drums and low strings as the ganas rush past, with
  // soft gusts; a low drum stroke as Shiva appears; the drums drop out when
  // Mena faints.
  'n3-b3': {
    start: { layers: ['drone', 'strings'], details: ['gusts'] },
    events: [
      { when: { line: 0 }, set: { layers: ['drone', 'percussion', 'strings'], taal: 'drive' }, caption: 'frame drums and low strings, rushing like wind' },
      { when: { line: 3 }, play: 'drumHit', caption: 'a deep drum stroke' },
      { when: { line: 5 }, set: { layers: ['drone', 'strings'], details: [] }, caption: 'the drums stop' },
      { when: { line: 6 }, set: { layers: ['drone'] }, caption: 'the drone alone' },
    ],
  },

  // Beat 4: Bageshri, the drone and a longing flute; a flute phrase answers
  // each choice.
  'n3-b4': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { at: 0 }, caption: 'a longing flute' },
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 5: Marwa, drone and bowed strings, no percussion; the strings fall
  // away as Parvati answers, and the flute returns softly.
  'n3-b5': {
    start: { layers: ['drone', 'strings'] },
    events: [
      { when: { line: 0 }, caption: 'tense bowed strings' },
      { when: { line: 3 }, play: 'swell', caption: 'a low swell of strings' },
      { when: { line: 4 }, set: { layers: ['drone', 'motif'], motifVoice: 'bansuri' }, caption: 'the strings fall away; a soft flute' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'gentle strings return' },
    ],
  },

  // Beat 6: Durga. A bell just before the form appears; drums, a conch and
  // swelling strings peak on "This was Chandraghanta"; then singing bowl and
  // bells as the rings spread.
  'n3-b6': {
    start: { layers: ['drone', 'motif'], motifVoice: 'bansuri' },
    events: [
      { when: { line: 1, offset: -0.6 }, play: 'bell', caption: 'a temple bell' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'percussion', 'strings'], taal: 'keherwa' }, caption: 'drums and rising strings' },
      { when: { line: 3 }, play: 'conch', set: { layers: ['drone', 'motif', 'percussion', 'climax'] }, caption: 'a conch-like call; the music swells' },
      { when: { line: 4 }, play: 'bowl', set: { layers: ['drone', 'motif', 'resolution'] }, caption: 'a singing bowl; the music settles' },
      { when: { line: 5 }, play: 'phrase', caption: 'the flute: the bell at rest' },
    ],
  },

  // Beat 7: the drone while the family decides; a bell for each choice; at
  // the reveal Bhupali returns, warm and joyful, with a bell on Mena's bow.
  'n3-b7': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a bell' },
      {
        when: { cue: 'reveal' },
        set: { raga: 'bhupali', layers: ['drone', 'motif', 'percussion'], motifVoice: 'santoor', taal: 'dadra' },
        caption: 'the music turns bright and joyful',
      },
      { when: { cue: 'reveal' }, play: 'chimes' },
    ],
  },

  // Beat 8: Durga, calm. A bell just before sentence 2, then the motif; a
  // soft chime for each symbol tapped.
  'n3-b8': {
    start: { motifVoice: 'bansuri' },
    events: [
      { when: { line: 0 }, caption: 'a calm flute over the drone' },
      { when: { line: 2, offset: -0.6 }, play: 'bell', caption: 'a temple bell' },
      { when: { line: 4 }, play: 'phrase', caption: 'the flute: the bell lifted, and at rest' },
      { when: { line: 5 }, play: 'bowl', caption: 'a singing bowl' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 9: Yaman, slow santoor, and a page turn.
  'n3-b9': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, play: 'pageTurn', caption: 'soft santoor' }],
  },

  // Beat 10 (Hogwarts palette): celesta and harp; a low woodwind as the
  // small candle tips over; soft strings for the ten points.
  'n3-b10': {
    start: { motifVoice: 'celesta', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'celesta-like bells and a quiet fire' },
      { when: { line: 3 }, set: { motifVoice: 'harp' }, caption: 'a lone harp' },
      { when: { line: 5, offset: 1.2 }, set: { motifVoice: 'clarinet' }, caption: 'a low woodwind' },
      { when: { line: 7 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'celesta' }, caption: 'soft strings and bells' },
    ],
  },

  // Beat 11: the low string pad; a harp note for each rung of the ladder.
  'n3-b11': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette): low strings and a low drum through the duel;
  // everything drops to the drone at the last sentence. No climax, no
  // celebration. Captions describe sounds only (no shouted line).
  'n3-b12': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'strings'] },
    events: [
      { when: { at: 0 }, caption: 'low strings in a smoky hall' },
      { when: { line: 1 }, set: { layers: ['drone', 'percussion', 'strings'] }, caption: 'a low, urgent drum' },
      { when: { line: 2 }, set: { layers: ['drone', 'strings'] }, caption: 'the drum stops' },
      { when: { line: 3 }, set: { layers: ['drone', 'percussion', 'strings'] }, caption: 'the drum returns, faster' },
      { when: { line: 7 }, set: { layers: ['drone'] }, caption: 'the drone alone' },
      { when: { line: 7, offset: 2 }, set: { silence: 3 }, caption: 'near silence' },
    ],
  },

  // Beat 12, the gentle alternative (Hogwarts palette): strings in the warm
  // evening; the music thins as the cold comes; harp and celesta on the
  // silver light; one low woodwind note when the letter arrives.
  'n3-b12g': {
    start: { motifVoice: 'harp', layers: ['drone', 'strings'] },
    events: [
      { when: { at: 0 }, caption: 'soft strings on a summer evening' },
      { when: { line: 1 }, set: { layers: ['drone'] }, caption: 'the music thins to a cold drone' },
      { when: { line: 3, offset: 1.6 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'celesta' }, caption: 'harp and celesta, bright and silver' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'clarinet' }, caption: 'one low woodwind note' },
    ],
  },

  // Beat 13: the string pad; a harp note for each rung.
  'n3-b13': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: the Yaman drone; a soft bell for each question.
  'n3-b14': {
    events: [
      { when: { at: 0 }, caption: 'the tanpura drone' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 15: Yaman, drone and soft santoor fragments.
  'n3-b15': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 16: Yaman, very soft. (The closing, after Finish, is played by the
  // shared Score.closing(): a falling flute phrase, one bell and the drone.)
  'n3-b16': {
    start: { motifVoice: 'bansuri' },
    events: [{ when: { at: 0 }, caption: 'a soft flute over the drone' }],
  },
};
