// Every night's score plan, found automatically: each src/audio/dayNScore.ts
// exports one object of beat id → BeatScore, and they are merged here (beat
// ids such as 'n2-b5' never repeat between nights).

import type { BeatScore } from './score';

const files = import.meta.glob<Record<string, unknown>>('./day*Score.ts', { eager: true });

export const scores: Record<string, BeatScore> = {};
for (const file of Object.values(files)) {
  // Only the beat-id maps (a file may also export lists, e.g. closing captions).
  for (const value of Object.values(file)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) Object.assign(scores, value);
  }
}
