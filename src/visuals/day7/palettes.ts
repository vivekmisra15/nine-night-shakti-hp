// Night 7's colour palettes, from docs/direction/night-7.md ("ink, ember and
// starlight"). Every key starts with n7 so it never clashes with another
// night's. The brief's `reflective` palette is Night 1's, reused as it is.

import type { Palette } from '../palettes';

export const day7Palettes: Record<string, Palette> = {
  // Beat 2: the Devi on her golden peak at dusk.
  n7goldenPeak: { primary: '#C99A3B', secondary: '#1E2A5A', accent: '#E8A33D', shadow: '#0E1430', highlight: '#FFF0C8' },
  // The darkest night of the nine: ink indigo, ember and cold starlight.
  n7darkNight: { primary: '#121633', secondary: '#2B1F4A', accent: '#D9482B', shadow: '#05060F', highlight: '#DCE6FF' },
  // The battles: grey-brown smoke and dull embers, never as dark as the Devi.
  n7smokeBattle: { primary: '#4A4038', secondary: '#7A6E66', accent: '#E2552B', shadow: '#0B0907', highlight: '#FFC27A' },
  // Beat 5: the seven Mothers rising as lights.
  n7matrikas: { primary: '#1B1F3B', secondary: '#E8C66A', accent: '#FFE3A3', shadow: '#07080F', highlight: '#FFF4D6' },
  // Beat 8: Kalaratri's dark light, with its ember core and lightning garland.
  n7kalaratri: { primary: '#1A1D45', secondary: '#B8321F', accent: '#FFE9A8', shadow: '#05060F', highlight: '#FFF8E7' },
  // Hogwarts scenes: cooler lamp-amber and silver-blue (no house colour pairs).
  n7boggartRoom: { primary: '#C98A3E', secondary: '#5A4632', accent: '#D6DCE8', shadow: '#15110D', highlight: '#FFD9A0' },
  n7pensieve: { primary: '#9FB3CC', secondary: '#1C2433', accent: '#EDEFF5', shadow: '#0A0D14', highlight: '#FFFFFF' },
  n7grimNight: { primary: '#6E7480', secondary: '#1A2236', accent: '#E0A85A', shadow: '#090B12', highlight: '#F2E6D0' },
  // The closing: the pearl light before dawn, a hint of tomorrow's Mahagauri.
  n7preDawn: { primary: '#E9E4EE', secondary: '#5A4E7A', accent: '#F7D27A', shadow: '#1E1A33', highlight: '#FFFDF7' },
};
