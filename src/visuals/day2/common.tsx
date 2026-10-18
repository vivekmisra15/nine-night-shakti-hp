// Backdrops shared by several of Night 2's pictures.

import { lerp } from '../../engine/anim';
import { palettes } from '../palettes';
import { Haze, Layer, Particles, Ridge, Sky } from '../shared';
import { Stars } from './kit';

const k = palettes.kailasa;

// The near ledge of the high ridge, as points from left to right. Parvati
// climbs it from the left; Shiva sits where it is highest, at x = 1120.
const ledge: [number, number][] = [
  [-400, 790],
  [300, 770],
  [700, 712],
  [1120, 628],
  [1500, 640],
  [2000, 660],
];
export const SHIVA_SEAT = { x: 1120, y: 618 };

// The height of the ledge at x, so figures stand on it.
export function ledgeY(x: number) {
  for (let i = 1; i < ledge.length; i++) {
    const [x0, y0] = ledge[i - 1];
    const [x1, y1] = ledge[i];
    if (x <= x1) return lerp(y0, y1, (x - x0) / (x1 - x0));
  }
  return ledge[ledge.length - 1][1];
}

// The high ridge of the Himalaya at night, where Shiva meditates (Beats 2–4).
// `tint` colours the sky (Kama's spring, the ash afterwards); `snow` drifts.
export function HighRidge({ t, skyTop = k.shadow, skyBottom = k.secondary, far = '#2B3A6E', mid = '#1A2550', near = '#0E1430', snow = true, stars = 70 }: { t: number; skyTop?: string; skyBottom?: string; far?: string; mid?: string; near?: string; snow?: boolean; stars?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={skyTop} bottom={skyBottom} t={t} />
        <Stars t={t} count={stars} colour={k.highlight} />
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={5} baseY={540} height={150} fill={far} peak={{ x: 1180, h: 260 }} snow={k.primary} />
      </Layer>
      <Layer depth={0.3}>
        <Haze y={600} colour={k.primary} opacity={0.1} t={t} />
        <Ridge seed={9} baseY={660} height={100} fill={mid} />
      </Layer>
      <Layer depth={0.6}>
        <path d={`M -400 1100 L ${ledge.map(([x, y]) => `${x} ${y}`).join(' L ')} L 2000 1100 Z`} fill={near} />
        {/* A thin line of snow along the ledge's edge. */}
        <path d={`M ${ledge.map(([x, y]) => `${x} ${y}`).join(' L ')}`} fill="none" stroke={k.primary} strokeWidth={3} opacity={0.35} />
      </Layer>
      {snow && (
        <Layer depth={0.9}>
          <Particles kind="snow" t={t} count={30} colour={k.primary} opacity={0.4} seed={2} />
        </Layer>
      )}
    </>
  );
}
