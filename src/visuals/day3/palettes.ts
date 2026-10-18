// Night 3's colour palettes, from docs/direction/night-3.md.
// Colour identity: "moon-silver and bell-gold". Every key starts with n3 so
// it never clashes with another night's. Night 1's kailasa, himalayanDawn,
// reflective and greatHall are reused as they are.

import type { Palette } from '../palettes';

export const day3Palettes: Record<string, Palette> = {
  // The wedding day: marigold festival light on the mountain palace.
  n3weddingDay: { primary: '#F4A93B', secondary: '#D9897A', accent: '#C8432B', shadow: '#2B1A1F', highlight: '#FFF1D2' },
  // Shiva's procession, and Mena's terror and anger: smoky violet and ash.
  n3procession: { primary: '#3B3157', secondary: '#8C8A93', accent: '#E07A3C', shadow: '#0F0D18', highlight: '#C9D3E6' },
  // Chandraghanta: bell-gold and moon-silver held together.
  n3moonBell: { primary: '#E8B84A', secondary: '#DDE4F2', accent: '#F29F3D', shadow: '#141A33', highlight: '#FFF6DC' },
  // Hogwarts: the common room at night, hearth amber and ink blue.
  n3commonRoomNight: { primary: '#C8873F', secondary: '#1D2440', accent: '#E9DCC0', shadow: '#0D0F1A', highlight: '#FFD9A0' },
  // Hogwarts: the battle hall, smoke and night blue with one warm ember.
  n3battleHall: { primary: '#4A4A52', secondary: '#151A2E', accent: '#D9733A', shadow: '#08090F', highlight: '#CFCFD6' },
  // Hogwarts: a summer alley at dusk under sodium lamps, then frost.
  n3summerAlley: { primary: '#D8A24A', secondary: '#6B4A3E', accent: '#A9C4E0', shadow: '#10131C', highlight: '#EEF3FA' },
};
