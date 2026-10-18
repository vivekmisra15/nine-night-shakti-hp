// Night 6's score plan, from the music brief in docs/direction/night-6.md.
// Each beat's raga, tempo and layers come from its direction values in
// src/content/day6.ts; this file adds the moments: what changes at which
// sentence, which sounds play when the learner acts, and the sound captions
// (shown when captions are on).
//
// Why each raga:
//   Bhupali  (Beat 1 and the closing) the series' home raga, serene and open:
//            the night begins and ends in devotion.
//   Bageshri (Beats 2–3) longing: the gods have lost their home and wander
//            the earth.
//   Durga    (Beats 4 and 7) bright, steady and heroic (S R M P D): a strong,
//            uncomplicated brightness for the Devi taking form, distinct from
//            Bhupali's calm.
//   Marwa    (Beats 5–6) tension that never rests, with no Pa to settle on:
//            Mahishasura's charge and the battle, until the victory.
//   Yaman    (Beats 8, 13–15) a tender evening raga, warm and thoughtful for
//            the theme and the closing talk.
// The Hogwarts scenes (Beats 9–12) use the separate original palette only:
// celesta-like bells, harp, soft strings and low woodwind.
//
// `line: n` means "when sentence n of the narration starts" (counting from 0).
// There are no continuous noise beds: only an occasional soft gust of wind.

import type { BeatScore, ScoreEvent } from './score';
import { GIFTS } from '../visuals/day6/BornOfLight';

// Beat 4: a small bell as each gift arrives (the second gift from the same
// god follows two seconds later, as the picture shows).
const giftBells: ScoreEvent[] = GIFTS.map((gift, i) => ({
  when: { line: gift.line, offset: 0.8 + (gift.later ? 2.2 : 0) },
  play: 'softBell',
  caption: i === 0 ? 'a small bell for each gift' : undefined,
}));

export const day6Score: Record<string, BeatScore> = {
  // Beat 1: the invocation. A soft bell, the tanpura, then the flute.
  'n6-b1': {
    events: [
      { when: { at: 0 }, play: 'bell', caption: 'a soft temple bell' },
      { when: { at: 1 }, caption: 'the tanpura drone begins' },
      { when: { at: 3.2 }, play: 'rise', caption: 'a bamboo flute plays a rising phrase' },
    ],
  },

  // Beat 2: Bageshri, drone and low strings for the lost war; the flute
  // carries the gods' longing as they wander; now and then a gust of wind.
  'n6-b2': {
    start: { layers: ['drone', 'strings'], details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'slow bowed strings; now and then, the wind' },
      { when: { line: 2 }, play: 'drumHit', caption: 'a low drum stroke' }, // "The gods lost."
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'bansuri' }, caption: 'a longing flute melody' },
    ],
  },

  // Beat 3: the drone alone while the family decides; a flute phrase for each
  // choice; at the reveal the motif returns as the lights rise to Brahma.
  'n6-b3': {
    start: { layers: ['drone'], details: ['gusts'] },
    events: [
      { when: { cue: 'pick:' }, play: 'phrase', caption: 'a short flute phrase' },
      { when: { cue: 'reveal' }, play: 'bell', set: { layers: ['drone', 'motif'], motifVoice: 'bansuri' }, caption: 'a bell; the flute returns' },
    ],
  },

  // Beat 4: Durga. Santoor and strings as the gods' anger becomes light,
  // swelling to the climax as it merges into a mountain of fire; a conch as
  // she takes form; a small bell with each gift.
  'n6-b4': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'] },
    events: [
      { when: { line: 0 }, caption: 'santoor, bright and steady' },
      { when: { line: 2 }, set: { layers: ['drone', 'motif', 'strings'] }, caption: 'strings gather' },
      { when: { line: 3 }, play: 'swell', set: { layers: ['drone', 'motif', 'strings', 'percussion', 'climax'], taal: 'keherwa' }, caption: 'drums and strings swell' },
      { when: { line: 4 }, play: 'conch', caption: 'a conch' },
      { when: { line: 6 }, set: { layers: ['drone', 'motif', 'strings', 'resolution'] }, caption: 'bells and strings, softer' },
      ...giftBells,
      { when: { line: 25 }, play: 'answer', set: { layers: ['drone', 'motif'] }, caption: 'the flute answers' },
    ],
  },

  // Beat 5: Marwa. The drone and a restless drum while the family decides; a
  // low drum hit at the reveal as his army charges.
  'n6-b5': {
    start: { layers: ['drone', 'percussion'], taal: 'heartbeat' },
    events: [
      { when: { at: 0 }, caption: 'a restless drum, like a heartbeat' },
      { when: { cue: 'pick:' }, play: 'softBell', caption: 'a bell' },
      { when: { cue: 'reveal' }, play: 'drumHit', set: { layers: ['drone', 'percussion', 'strings'], taal: 'drive' }, caption: 'a low drum; driving rhythm' },
    ],
  },

  // Beat 6: Marwa, every layer. Driving drums for the generals; slower and
  // darker for the shape changes; the climax at sentence 12 (strong, not too
  // loud); then the resolution at dawn, with a temple bell and a warm pad.
  'n6-b6': {
    start: { layers: ['drone', 'percussion', 'strings'], taal: 'drive', details: ['gusts'] },
    events: [
      { when: { line: 0 }, caption: 'driving drums and strings' },
      { when: { line: 2 }, play: 'drumHit', caption: 'a deep drum as the lion charges' },
      { when: { line: 4 }, set: { layers: ['drone', 'strings', 'percussion'], taal: 'heartbeat' }, caption: 'a slow, heavy drum' },
      { when: { line: 6 }, play: 'drumHit', caption: 'a drum stroke' },
      { when: { line: 9 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'bansuri' }, caption: 'the flute, light as laughter' },
      {
        when: { line: 12 },
        play: 'conch',
        set: { layers: ['drone', 'motif', 'percussion', 'strings', 'climax'], taal: 'drive' },
        caption: 'drums, rising strings and a conch',
      },
      { when: { line: 14, offset: 3 }, set: { layers: ['drone'], silence: 2, details: [] }, caption: 'silence' },
      { when: { line: 15 }, play: 'bell', set: { layers: ['drone', 'strings', 'resolution'], bpm: 60 }, caption: 'a temple bell; warm strings' },
      { when: { line: 16 }, play: 'chimes', caption: 'a shimmer of small temple chimes' },
      { when: { line: 18 }, set: { layers: ['drone', 'resolution'] }, caption: 'the drone, at rest' },
    ],
  },

  // Beat 7: Durga, calm: drone and santoor at dawn; a chime for each symbol.
  'n6-b7': {
    start: { motifVoice: 'santoor', layers: ['drone', 'motif'], details: ['birds'] },
    events: [
      { when: { line: 0 }, caption: 'soft santoor; morning birds' },
      { when: { line: 9 }, play: 'bell', caption: 'a temple bell' },
      { when: { cue: 'hotspot:' }, play: 'chime', caption: 'a soft chime' },
    ],
  },

  // Beat 8: Yaman, drone and a soft motif.
  'n6-b8': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, play: 'pageTurn' }],
  },

  // Beat 9 (Hogwarts palette): low strings and celesta; the harp joins at the
  // Hog's Head; soft bells as the names are signed; a bright chime for the
  // first spell.
  'n6-b9': {
    start: { motifVoice: 'celesta', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low strings; celesta-like bells' },
      { when: { line: 1 }, set: { motifVoice: 'clarinet' }, caption: 'a low clarinet' }, // the newspapers call Harry a liar
      { when: { line: 4 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'harp' }, caption: 'harp and soft strings' }, // the Hog's Head
      { when: { line: 5 }, play: 'harpNote', caption: 'a harp note for the names' },
      { when: { line: 7 }, set: { motifVoice: 'celesta' }, caption: 'bells, brighter' },
      { when: { line: 7, offset: 6 }, play: 'chime', caption: 'a bright chime' },
    ],
  },

  // Beat 10: the low string pad; one harp note for each rung of the ladder.
  'n6-b10': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 11 (Hogwarts palette): low woodwind and harp below the trapdoor;
  // strings at the chess move; a celesta chime at the feast.
  'n6-b11': {
    start: { motifVoice: 'clarinet', layers: ['drone', 'motif'] },
    events: [
      { when: { at: 0 }, play: 'pageTurn', caption: 'low woodwind' },
      { when: { line: 2 }, set: { motifVoice: 'harp' }, caption: 'a quick harp' }, // the flying keys
      { when: { line: 3 }, set: { layers: ['drone', 'motif', 'strings'], motifVoice: 'clarinet' }, caption: 'soft strings for the chess move' },
      { when: { line: 5 }, set: { layers: ['drone', 'motif'], motifVoice: 'harp' }, caption: 'a lone harp' }, // Harry goes on alone
      { when: { line: 6 }, play: 'chime', set: { motifVoice: 'celesta', layers: ['drone', 'motif', 'resolution'] }, caption: 'a celesta chime; high bells' },
    ],
  },

  // Beat 12: the string pad; one harp note per rung.
  'n6-b12': {
    start: {},
    events: [{ when: { cue: 'rung:' }, play: 'harpNote', caption: 'a harp note' }],
  },

  // Beat 13: Yaman, the drone; a soft bell as each question is revealed.
  'n6-b13': {
    events: [
      { when: { at: 0 }, caption: 'the tanpura drone' },
      { when: { cue: 'question:' }, play: 'softBell', caption: 'a soft bell' },
    ],
  },

  // Beat 14: Yaman, tanpura and soft santoor.
  'n6-b14': {
    start: { motifVoice: 'santoor' },
    events: [{ when: { at: 0 }, caption: 'soft santoor' }],
  },

  // Beat 15: Yaman, very soft; at the theme it turns to Bhupali with a bell.
  // (The closing, after Finish, is played by Score.closing().)
  'n6-b15': {
    events: [{ when: { cue: 'takeaway' }, play: 'bell', set: { raga: 'bhupali' }, caption: 'a temple bell' }],
  },
};
