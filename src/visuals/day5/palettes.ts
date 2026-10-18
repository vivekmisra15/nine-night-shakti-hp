// Night 5's colour palettes, from docs/direction/night-5.md ("ember, river
// and lap of gold"). Every key starts with n5 so it never clashes with
// another night's. Night 1's kailasa and reflective are reused as they are.

import type { Palette } from '../palettes';

export const day5Palettes: Record<string, Palette> = {
  // Taraka's rule: smoke grey and bruise violet, with ember points.
  n5tarakaShadow: { primary: '#3A3640', secondary: '#2B2340', accent: '#E2552B', shadow: '#0A080E', highlight: '#C9A45C' },
  // The spark's journey: river teal and reed green, with Agni's ember.
  n5emberRiver: { primary: '#3F7F86', secondary: '#5E7A4A', accent: '#F06A2A', shadow: '#0C1A1E', highlight: '#FFF1C9' },
  // The six Krittikas: deep night and the blue-white stars of the Pleiades.
  n5krittikaStars: { primary: '#10173A', secondary: '#8FA8E8', accent: '#F2F5FF', shadow: '#060A1E', highlight: '#F5C66B' },
  // The Devi's lap of light: deep warm gold and lotus rose.
  n5motherGold: { primary: '#E3A93B', secondary: '#E7A3A6', accent: '#F7B733', shadow: '#2A1A10', highlight: '#FFF5DC' },
  // The battle, and the dawn after it.
  n5battleDawn: { primary: '#F2B66B', secondary: '#4A4652', accent: '#FFF0C2', shadow: '#14111A', highlight: '#FFF8E7' },
  // Hogwarts: the kitchen at Grimmauld Place, lamp amber and soot.
  n5grimmauldKitchen: { primary: '#B9823F', secondary: '#4A3B2E', accent: '#2B3550', shadow: '#120E0B', highlight: '#FFD9A0' },
  // Hogwarts: the forest at night. Greens stay greyed; moon white, never silver on green.
  n5forestNight: { primary: '#0F1820', secondary: '#3C4E58', accent: '#DDE4EE', shadow: '#05090C', highlight: '#E8B45A' },
};
