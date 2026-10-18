// Night 1's score plan, from the music brief in docs/direction/night-1.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day1.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, the ambience, and the
// sound captions (shown when captions are on).
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).

import type { BeatScore } from './score';

export const day1Score: Record<string, BeatScore> = {
  // Beat 1: the invocation. A bell, the tanpura, then the motif as the
  // mountain is revealed.
  'n1-b1': {
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.2 }, play: 'rise', caption: 'a bamboo flute plays a rising phrase' },
    ],
  },

  // Beat 2: a stiff harmonium in Daksha's palace; then santoor, light tabla
  // and a crackling fire on Kailasa, with a soft gust of wind now and then.
  'n1-b2': {
    start: { motifVoice: 'harmonium', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'a formal harmonium' },
      {
        when: { line: 1 },
        set: { motifVoice: 'santoor', layers: ['drone', 'motif'], ambience: { fire: 0.3 }, details: ['gusts'] },
        caption: 'santoor; a crackling fire on the mountain',
      },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'percussion'], taal: 'dadra' }, caption: 'light tabla' },
      { when: { line: 3, offset: 2 }, play: 'riseFragment', caption: 'the flute, briefly' },
    ],
  },

  // Beat 3: a low drum at the curse; strings enter; then the flute carries
  // Sati's longing, with distant festive chimes as the trails pass.
  'n1-b3': {
    start: { layers: ['drone'] },
    events: [
      { when: { line: 2 }, play: 'drumHit', set: { layers: ['drone', 'strings'] }, caption: 'a low drum stroke; bowed strings' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif'], motifVoice: 'bansuri', details: ['gusts'] }, caption: 'a longing flute melody' },
      { when: { line: 4 }, play: 'chimes', caption: 'a shimmer of small temple chimes' },
    ],
  },

  // Beat 4: the drone alone while the family decides; a flute phrase answers
  // each choice; one bell at "Sati went".
  'n1-b4': {
    start: { layers: ['drone'], ambience: { fire: 0.25 }, details: ['gusts'] },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'bell', caption: 'a single bell' },
    ],
  },

  // Beat 5: santoor for the welcome, silence for Daksha, a drum heartbeat
  // that stops at Sati's raised palm, strings for her speech; then one long
  // flute note that fades with the flame, near-silence, and a low swell.
  'n1-b5': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'], ambience: { fire: 0.25 } },
    events: [
      { when: { line: 0 }, caption: 'soft santoor' },
      { when: { line: 1 }, set: { layers: ['drone'] }, caption: 'the santoor stops' },
      { when: { line: 3 }, set: { layers: ['drone', 'percussion'], taal: 'heartbeat' }, caption: 'a slow drum, like a heartbeat' },
      { when: { line: 3, offset: 1.8 }, set: { layers: ['drone'] }, caption: 'the drum stops' },
      { when: { line: 4 }, set: { layers: ['drone', 'strings'] }, caption: 'bowed strings rise' },
      { when: { line: 7 }, set: { layers: ['drone'], ambience: {} } },
      { when: { line: 8 }, play: 'flameNote', caption: 'one long flute note, fading with the flame' },
      { when: { line: 8, offset: 7.5 }, set: { silence: 3 }, caption: 'near silence' },
      { when: { line: 9 }, play: 'swell', caption: 'a low swell of strings' },
    ],
  },

  // Beat 6: storm and grief; a deep drum as the hair strikes; the climax
  // (drums, rising strings, a conch-like call); then a lone bowed string as
  // Shiva wanders, soft bells for each sacred place, and the drone alone.
  'n1-b6': {
    start: { layers: ['drone', 'strings'], bpm: 60, ambience: { storm: 0.45 } },
    events: [
      { when: { line: 0 }, caption: 'storm wind; slow bowed strings' },
      { when: { line: 1, offset: 3.5 }, play: 'drumHit', caption: 'a deep drum' },
      {
        when: { line: 1, offset: 3.6 },
        play: 'conch',
        set: { layers: ['drone', 'strings', 'percussion', 'climax'], taal: 'drive', bpm: 96 },
        caption: 'pounding drums, rising strings and a conch-like call',
      },
      { when: { line: 2 }, set: { layers: ['drone', 'strings'], bpm: 60, ambience: {}, details: ['gusts'] }, caption: 'a lone bowed string; now and then, the wind' },
      { when: { line: 3, offset: 2 }, play: 'peethaBells', caption: 'soft bells, one for each sacred place' },
      { when: { line: 5 }, set: { layers: ['drone'], details: [] }, caption: 'the drone alone' },
    ],
  },

  // Beat 7: the drone while the family decides; a bell for each choice; at
  // the reveal the music turns to Bhupali, warmer, with strings and a bowl.
  'n1-b7': {
    start: { layers: ['drone'] },
    events: [
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a bell' },
      {
        when: { cue: 'reveal' },
        play: 'bowl',
        set: { raga: 'bhupali', layers: ['drone', 'strings', 'resolution'] },
        caption: 'the music turns brighter and warmer',
      },
    ],
  },

  // Beat 8: a temple bell as the flame relights; the motif rises and is
  // answered; then santoor, tabla, strings and bells at dawn, with birds.
  'n1-b8': {
    start: { layers: ['drone', 'strings'], ambience: { stream: 0.3 }, details: ['birds'] },
    events: [
      { when: { line: 0 }, caption: 'distant birds and a soft stream' },
      { when: { line: 1, offset: 1 }, play: 'bell', caption: 'a temple bell' },
      { when: { line: 1, offset: 2.5 }, play: 'rise', caption: "the flute: the night's rising phrase" },
      { when: { line: 1, offset: 6.5 }, play: 'answer', caption: 'the flute answers, falling home' },
      {
        when: { line: 2, offset: 2 },
        set: { motifVoice: 'santoor', layers: ['drone', 'motif', 'percussion', 'strings', 'resolution'], taal: 'keherwa' },
        caption: 'santoor, tabla and bells',
      },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 9: Yaman, slow santoor; one flute phrase for each idea opened.
  'n1-b9': {
    start: { motifVoice: 'santoor' },
    events: [
      { when: { at: 0 }, play: 'pageTurn' },
      { when: { cue: 'idea:' }, play: 'phrase', caption: 'a flute phrase' },
    ],
  },

  // Beat 10 (Hogwarts palette): low woodwind and a ticking clock; pizzicato
  // tightening and strings climbing; a sharp swell, then a stop; then a lone
  // harp and bells in the empty street.
  'n1-b10': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif'], details: ['clock'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low woodwind; a ticking clock' },
      // Moments follow the retelling's sentences (counting from 0).
      { when: { line: 3 }, set: { layers: ['drone', 'motif', 'percussion'] }, caption: 'pizzicato strings, tightening' }, // "she turns on his parents"
      { when: { line: 4 }, set: { layers: ['drone', 'motif', 'percussion', 'strings'] }, caption: 'strings climbing' },
      { when: { line: 5, offset: 1 }, play: 'outburst', caption: 'a sharp rising swell' }, // "his magic escapes him"
      { when: { line: 5, offset: 3.5 }, set: { layers: ['drone'], silence: 2, details: [] }, caption: 'silence' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp' }, caption: 'a lone harp' }, // "Harry drags his trunk"
      { when: { line: 7 }, set: { motifVoice: 'celesta' }, caption: 'soft bells' },
    ],
  },

  // Beat 11: the low string pad; one harp note for each rung of the ladder.
  'n1-b11': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 12 (Hogwarts palette), following the retelling: celesta-like bells; soft
  // strings at the choice; then solo harp and low clarinet at dawn.
  'n1-b12': {
    start: { motifVoice: 'celesta', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, caption: 'celesta-like bells' },
      { when: { line: 3 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'soft strings and harp at the moment of choice' }, // "not Slytherin"
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp', details: ['birds'] }, caption: 'solo harp; morning birds' }, // "A year later"
      { when: { line: 6 }, set: { motifVoice: 'clarinet' }, caption: 'a low clarinet' },
    ],
  },

  // Beat 13: the string pad, sparse harp.
  'n1-b13': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 14: tanpura and single harp notes alternate, never blending.
  'n1-b14': {
    events: [
      { when: { at: 0 }, caption: 'tanpura and harp, taking turns' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 15: Yaman, tanpura and soft santoor; a quiet room.
  'n1-b15': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 16: Yaman, very soft; at the takeaway it turns back to Bhupali
  // with a bell. (The closing, after Finish, is played by Score.closing().)
  'n1-b16': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', set: { raga: 'bhupali' }, caption: 'a temple bell' }],
  },
};

