// Night 8's colour palettes, from docs/direction/night-8.md ("sea, seasons
// and moonlight"). Every key starts with n8 so it never clashes with another
// night's. Night 1's kailasa and reflective are reused as they are.

import type { Palette } from '../palettes';

export const day8Palettes: Record<string, Palette> = {
  // The quiet coast at Prabhasa under a pale moon, with the shore lamp.
  n8prabhasaCoast: { primary: '#2B3F66', secondary: '#D9C9A8', accent: '#F29F3D', shadow: '#0C1426', highlight: '#F2F0E6' },
  // The small grove through four seasons of tapas.
  n8tapasSeasons: { primary: '#6B7A5E', secondary: '#B07A3A', accent: '#E2702B', shadow: '#1A1A14', highlight: '#FFF4D6' },
  // Gauri: a soft pearl light on an indigo night. (The Devi's flame keeps its
  // own warm colour; only the reach of its glow grows.)
  n8gauriRadiance: { primary: '#F4F1EA', secondary: '#26305C', accent: '#F5C25A', shadow: '#10162E', highlight: '#FFFDF5' },
  // Hogwarts: the kitchen at Grimmauld Place, ink-blue and candle amber.
  n8grimmauldKitchen: { primary: '#1C2238', secondary: '#8A7445', accent: '#E8B45A', shadow: '#0A0C14', highlight: '#FFD9A0' },
  // Hogwarts: the snowy Forest of Dean (no green anywhere).
  n8forestOfDean: { primary: '#DCE4EE', secondary: '#4A5160', accent: '#EEF3FF', shadow: '#0B0F1A', highlight: '#F7FAFF' },
  // The closing: a pale dawn over the sea.
  n8seaDawn: { primary: '#F1D3C4', secondary: '#6E85A3', accent: '#F7B733', shadow: '#3A3F5C', highlight: '#FFF8E7' },
};
