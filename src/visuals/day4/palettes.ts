// Night 4's colour palettes, from docs/direction/night-4.md ("from the dark,
// a warm gold"). Every key starts with n4 so it never clashes with another
// night's. Night 1's reflective and himalayanDawn are reused as they are.

import type { Palette } from '../palettes';

export const day4Palettes: Record<string, Palette> = {
  // Before anything: deep blue-black, faint indigo, one warm ember.
  n4primordialDark: { primary: '#0A0C1C', secondary: '#1C2148', accent: '#F2A23A', shadow: '#03040A', highlight: '#FFE9B8' },
  // The heart of the sun: saffron, honey and white-gold.
  n4sunCore: { primary: '#F4A93B', secondary: '#E8C26A', accent: '#FFF4D6', shadow: '#3A1E0C', highlight: '#FFFBEF' },
  // The gourd and the golden egg: ash-gourd grey-green at dusk, egg gold.
  n4goldenEgg: { primary: '#9AA79A', secondary: '#3B3557', accent: '#E9B949', shadow: '#14121F', highlight: '#FFF1C9' },
  // Hagrid's cake: storm slate and sea grey-blue, with firelight amber.
  n4stormHut: { primary: '#2B3440', secondary: '#4C5D6E', accent: '#E39A45', shadow: '#0C0F14', highlight: '#FFD9A0' },
  // The Christmas jumper: warm stone, window blue, knit emerald, cream light
  // (the emerald is never set beside silver or grey-white).
  n4christmasMorning: { primary: '#8C7A66', secondary: '#3E4F72', accent: '#2F7A55', shadow: '#16120E', highlight: '#FFF0D4' },
};
