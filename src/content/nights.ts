// Every built night, found automatically. Any file named src/content/dayN.ts
// that exports a Night is picked up here, so adding a night needs no edits
// elsewhere. (import.meta.glob is a Vite feature: it imports every file whose
// name matches the pattern.)

import type { Night } from './types';

const files = import.meta.glob<Record<string, unknown>>('./day*.ts', { eager: true });

const isNight = (value: unknown): value is Night => typeof value === 'object' && value !== null && 'beats' in value && 'number' in value;

export const nights: Record<number, Night> = {};
for (const file of Object.values(files)) {
  for (const value of Object.values(file)) {
    if (isNight(value)) nights[value.number] = value;
  }
}
