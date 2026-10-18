// Night 9's colour palettes, from docs/direction/night-9.md ("lotus, pearl
// and the tenth dawn"). Keys start with n9 so they never clash with other
// nights. Night 1's reflective and greatHall are reused as they are.

import type { Palette } from '../palettes';

export const day9Palettes: Record<string, Palette> = {
  // Siddhidatri: lotus pink and full gold on deep violet night, with pearl light.
  n9siddhiLotus: { primary: '#F4B6C2', secondary: '#241A4A', accent: '#E8B33C', shadow: '#0E0A22', highlight: '#FFF6E8' },
  // Ardhanarishvara: Shiva's moon silver joined with Shakti's warm saffron.
  n9ardhanari: { primary: '#D8DEEA', secondary: '#F2A54A', accent: '#E8B33C', shadow: '#12142E', highlight: '#FFF4D6' },
  // The two seekers' riverbank: slate water, pale sand and earth.
  n9riverbank: { primary: '#3E5A6E', secondary: '#CDB68A', accent: '#B9773A', shadow: '#0D1820', highlight: '#F3E6CC' },
  // Vijayadashami: saffron dawn over a blue river, with one touch of sindoor.
  n9vijayaDawn: { primary: '#F7A541', secondary: '#6E8FB0', accent: '#C8322A', shadow: '#2B2440', highlight: '#FFF3DA' },
  // Hogwarts: the misty white station, and the stone chamber with the Mirror.
  n9kingsCross: { primary: '#E9ECEF', secondary: '#A9B6C4', accent: '#E8C57A', shadow: '#2A3038', highlight: '#FFFFFF' },
  n9mirrorChamber: { primary: '#1C1A24', secondary: '#D99A4A', accent: '#BFD3E6', shadow: '#0A0910', highlight: '#FFF0D0' },
};
