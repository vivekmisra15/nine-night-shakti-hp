// Night 6's palettes, from docs/direction/night-6.md ("ash, gathered fire,
// lion-gold dawn"). Every key starts with n6 so it never clashes with another
// night's. Ideas, Today and Reflection reuse Night 1's 'reflective', and the
// feast in Beat 11 reuses Night 1's 'greatHall'.

import type { Palette } from '../palettes';

export const day6Palettes: Record<string, Palette> = {
  // The gods' exile: ash grey and dusk indigo, a dim ember, a pale moon.
  n6exile: { primary: '#8A8A94', secondary: '#2A2D4F', accent: '#B5562E', shadow: '#0D0E1C', highlight: '#D6DAE6' },
  // The gods' many lights gathering into one saffron-gold blaze.
  n6gatheredLight: { primary: '#F4A93A', secondary: '#161A3A', accent: '#F7D27A', shadow: '#0A0C1F', highlight: '#FFF4D6' },
  // The battle: her gold against a deep smoke-violet shadow.
  n6battleShadow: { primary: '#3B2B4A', secondary: '#11101E', accent: '#F4A93A', shadow: '#050409', highlight: '#E2552B' },
  // The clear gold dawn after the battle.
  n6lionDawn: { primary: '#F6C65B', secondary: '#F2B5A7', accent: '#F29F3D', shadow: '#5A4E7A', highlight: '#FFF8E7' },
  // Hogwarts: the Hog's Head, dusty amber and soot, with candlelight.
  n6hogsHead: { primary: '#A87C4A', secondary: '#3E3226', accent: '#FFD9A0', shadow: '#14100B', highlight: '#F2E2C0' },
  // Hogwarts: below the trapdoor, ink blue-black and stone, with torchlight.
  n6trapdoor: { primary: '#121A2E', secondary: '#6B6F7A', accent: '#E8B45A', shadow: '#06080F', highlight: '#FFF0C8' },
};
