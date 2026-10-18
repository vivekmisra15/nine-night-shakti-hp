// Which illustration goes with which beat. Each night's folder has an
// index.ts (e.g. src/visuals/day2/index.ts) exporting a map of beat id →
// illustration; they are found automatically and merged here. A beat without
// an entry uses the placeholder.

import type { ComponentType } from 'react';
import { Placeholder } from './Placeholder';
import type { VisualProps } from './types';

const files = import.meta.glob<Record<string, Record<string, ComponentType<VisualProps>>>>('./day*/index.ts', { eager: true });

const illustrations: Record<string, ComponentType<VisualProps>> = {};
for (const file of Object.values(files)) {
  for (const map of Object.values(file)) Object.assign(illustrations, map);
}

export function illustrationFor(beatId: string): ComponentType<VisualProps> {
  return illustrations[beatId] ?? Placeholder;
}

export type { VisualProps };
