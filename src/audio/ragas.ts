// The scales and melodic phrases the score is built from.
//
// All of Night 1 uses D as Sa (the tonic), so the traditional and Hogwarts
// palettes share a home note and can sit side by side (Beat 14) without
// clashing, while sounding completely different in instruments and style.
//
// Notes are written as semitones above Sa (D4, 293.66 Hz): 0 = Sa, 2 = Re,
// 4 = Ga, 7 = Pa, 12 = Sa an octave up, -1 = Ni below, and so on.
// A phrase is a list of [note, length in eighth-notes].

import type { Raga } from '../content/types';

export const SA = 293.66; // D4
export const freqOf = (semitones: number) => SA * 2 ** (semitones / 12);

export type Phrase = [number, number][];

export interface RagaInfo {
  notes: number[]; // the scale, for the slow string lines
  phrases: Phrase[];
  // The tanpura's first string. Usually Pa; for ragas that leave out Pa it is
  // tuned to another note of the raga instead.
  droneNote: number;
  restNote: number; // the note long string tones lean on
}

export const ragas: Record<Raga, RagaInfo> = {
  // BHUPALI — serene devotion. Five notes (Sa Re Ga Pa Dha), no Ma or Ni,
  // so nothing pulls or aches: it sounds open, bright and steady, like the
  // mountain. Used for the opening, Kailasa, the rebirth and the close, and
  // it carries the night's signature motif.
  bhupali: {
    notes: [0, 2, 4, 7, 9, 12],
    droneNote: -5, // Pa below Sa
    restNote: 4,
    phrases: [
      [[0, 2], [2, 2], [4, 2], [7, 4]], // S R G P (the rising motif)
      [[4, 2], [2, 2], [0, 4]], // G R S
      [[9, 2], [7, 2], [4, 2], [2, 2], [0, 4]], // D P G R S (the answer)
      [[7, 2], [9, 2], [12, 4], [9, 2], [7, 2], [4, 4]], // P D S' D P G
      [[-3, 2], [0, 2], [2, 2], [4, 4]], // D. S R G
    ],
  },

  // BAGESHRI — longing. Komal (flat) Ga and Ni give it a tender, yearning
  // sound, traditionally of late night: Sati missing her mother and sisters
  // and the home she grew up in (Beats 3–4).
  bageshri: {
    notes: [0, 2, 3, 5, 9, 10, 12],
    droneNote: -7, // Ma below Sa: Bageshri leans on Ma, and uses Pa only lightly
    restNote: 5,
    phrases: [
      [[0, 2], [-2, 2], [-3, 2], [-2, 2], [0, 2], [5, 4]], // S n. D. n. S m
      [[5, 2], [3, 2], [2, 2], [0, 4]], // m g R S
      [[9, 2], [10, 2], [12, 2], [5, 2], [3, 2], [5, 2], [9, 4]], // D n S' m g m D
      [[3, 3], [5, 1], [9, 2], [10, 2], [9, 2], [5, 2], [3, 4]], // g m D n D m g
    ],
  },

  // MARWA — tension and twilight. Komal Re and tivra (sharp) Ma, and no Pa
  // at all, so the music never finds a place to rest: unsettled, like
  // sunset turning to dark. Used for her father's house and Shiva's grief
  // (Beats 5–7).
  marwa: {
    notes: [-1, 1, 4, 6, 9, 11, 13],
    droneNote: -1, // Ni below Sa: with no Pa in Marwa, the tanpura is tuned to Ni
    restNote: 9,
    phrases: [
      [[-1, 2], [1, 2], [4, 2], [6, 2], [9, 4]], // N. r G M D
      [[9, 2], [6, 2], [4, 2], [1, 4]], // D M G r
      [[1, 2], [-1, 2], [-3, 2], [1, 4]], // r N. D. r
      [[4, 2], [6, 2], [9, 2], [11, 2], [9, 4], [6, 2], [4, 2], [1, 4]], // G M D N D M G r
    ],
  },

  // YAMAN — a tender evening. Tivra Ma gives warmth and light without
  // tension; it is gentle and reflective. Used while the family thinks
  // together: the ideas, today and the reflection.
  yaman: {
    notes: [-1, 2, 4, 6, 7, 9, 11, 12],
    droneNote: -5, // Pa below Sa
    restNote: 4,
    phrases: [
      [[-1, 2], [2, 2], [4, 4]], // N. R G
      [[4, 2], [6, 2], [9, 2], [11, 2], [14, 4]], // G M D N R'
      [[4, 2], [6, 2], [2, 2], [0, 4]], // G M R S
      [[-1, 2], [2, 2], [4, 2], [6, 2], [7, 4]], // N R G M P
      [[11, 2], [9, 2], [7, 2], [6, 2], [4, 4]], // N D P M G
    ],
  },
};

// The night's signature motif, on the bansuri: rising "the mountain"
// (Sa Re Ga Pa), and the falling answer "coming home" (Dha Pa Ga Re Sa).
export const signatureRise: Phrase = [[0, 2], [2, 2], [4, 2], [7, 6]];
export const signatureAnswer: Phrase = [[9, 2], [7, 2], [4, 2], [2, 2], [0, 6]];

// HOGWARTS — a separate, original palette in D Dorian (D E F G A B C).
// To keep well away from any film theme, the melodies here are in 4/4 (never
// a 3/8 waltz), move by step within a narrow range (no wide leaps), and are
// played on harp, celesta-like bells, soft strings and low woodwind.
export const hogwartsPhrases: Phrase[] = [
  [[0, 2], [2, 2], [3, 2], [5, 4], [3, 2], [2, 4]],
  [[7, 2], [5, 2], [3, 2], [2, 2], [0, 4]],
  [[3, 2], [5, 2], [7, 4], [9, 2], [7, 4]],
  [[-2, 2], [0, 2], [2, 4], [0, 4]],
];

// Chords for the harp and strings: Dm, C, G, Dm (each as notes above D).
export const hogwartsChords: number[][] = [
  [-12, -5, 0, 3, 7],
  [-14, -7, -2, 2, 5],
  [-19, -12, -7, -1, 2],
  [-12, -5, 0, 3, 7],
];

