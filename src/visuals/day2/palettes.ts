// Night 2's colour palettes, from docs/direction/night-2.md ("Palettes").
// New keys start with n2 so they never clash with another night's. Night 1's
// kailasa, grief and reflective are reused as they are.

import type { Palette } from '../palettes';

export const day2Palettes: Record<string, Palette> = {
  // Kama's false spring: blossom pink and young green, the night's one sweet colour.
  n2vasanta: { primary: '#F2A7B8', secondary: '#8DBF7A', accent: '#E2557A', shadow: '#1C2333', highlight: '#FFF2E0' },
  // Mena's lamplit home: sandstone, deep plum and lamp saffron.
  n2himavatHome: { primary: '#D9B98C', secondary: '#4A2E4F', accent: '#F29F3D', shadow: '#1A1020', highlight: '#FFF1D6' },
  // The tapas through the seasons, around one still white-gold light.
  // The accent is summer fire; monsoon slate and winter ice are in seasonColours.
  n2tapasSeasons: { primary: '#F4F2EC', secondary: '#1F3A2E', accent: '#F07A2B', shadow: '#0C1712', highlight: '#FFF7E6' },
  // The hermitage at twilight, for the two tests.
  n2hermitage: { primary: '#2C3E63', secondary: '#8FA58A', accent: '#FFE9C2', shadow: '#0E1526', highlight: '#F6F1E4' },
  // Brahmacharini: pure white, soft saffron and gold.
  n2brahmacharini: { primary: '#F7F5F0', secondary: '#F4C27A', accent: '#D9A441', shadow: '#2A2340', highlight: '#FFFFFF' },
  // Hogwarts scenes stay cooler, so the two worlds never blur.
  n2lessonRoom: { primary: '#3B4252', secondary: '#D8A35A', accent: '#E6ECF5', shadow: '#11141B', highlight: '#F8F4EA' },
  n2nightLake: { primary: '#0F1A2E', secondary: '#6F8199', accent: '#DCE8F5', shadow: '#050912', highlight: '#F4F8FF' },
  n2closedDoor: { primary: '#141826', secondary: '#4F5566', accent: '#7FA3D9', shadow: '#07080D', highlight: '#C9D3E6' },
  n2midnightPractice: { primary: '#C98A3E', secondary: '#1D2747', accent: '#FFE7B8', shadow: '#0E1220', highlight: '#FFF4DC' },
};

// The two extra season colours in the tapasSeasons row of the brief.
export const seasonColours = { monsoon: '#5D7186', winter: '#CFE3F0' };
