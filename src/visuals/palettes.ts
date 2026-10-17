// Colour palettes from docs/direction/night-1.md. Beats name a palette by its
// key; the illustrations take their colours from here.

import type { PaletteKey } from '../content/types';

export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  shadow: string;
  highlight: string;
}

export const palettes: Record<Exclude<PaletteKey, 'split'>, Palette> = {
  // Kailasa: moonlit snow and indigo night, with a saffron flame.
  kailasa: { primary: '#E8ECF4', secondary: '#1E2A5A', accent: '#F29F3D', shadow: '#0E1430', highlight: '#FFF4D6' },
  // Daksha's court: heavy gold and temple red, the wrong house for Sati.
  dakshaCourt: { primary: '#B8862B', secondary: '#8E1B24', accent: '#F5A623', shadow: '#2A0F12', highlight: '#FFE3A3' },
  // Shiva's grief: storm indigo and ash, with ember accents.
  grief: { primary: '#1B1F3B', secondary: '#5B6B8C', accent: '#E2552B', shadow: '#07080F', highlight: '#C9D3E6' },
  // The rebirth: rose-gold Himalayan dawn.
  himalayanDawn: { primary: '#F2B5A7', secondary: '#F4F6FA', accent: '#F7B733', shadow: '#5A4E7A', highlight: '#FFF8E7' },
  // Ideas, Today and Reflection: parchment on night.
  reflective: { primary: '#F3E6CC', secondary: '#141A33', accent: '#F5A623', shadow: '#0B0F22', highlight: '#FFF4D6' },
  // Hogwarts scenes are cooler and more muted, so the two worlds never blur.
  hogwartsDinner: { primary: '#C98A3E', secondary: '#5E5A48', accent: '#6E1E2B', shadow: '#15130F', highlight: '#FFD9A0' },
  greatHall: { primary: '#121C3D', secondary: '#E8B45A', accent: '#DCE6FF', shadow: '#070A18', highlight: '#FFF0C8' },
};
