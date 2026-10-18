// Beat 1: Before we begin.
// The night sea at Prabhasa, a single diya on a stone at the water's edge,
// its reflection long on the water.
//   0–10 s    "Last night" (Kalaratri): a faint deep-indigo glow with the
//             small "do not fear" hand fades in high in the sky, then softens
//   8 s on    the moon rises and the lamp brightens
//   the end   the lamp and its reflection, still (slow push-in over 30 s)

import { progress } from '../../engine/anim';
import { SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { Coast, Shore, ShoreLamp } from './kit';

export function Opening({ beat, t, frozen, complete, pulse }: VisualProps) {
  const time = complete ? 40 : t;
  const cam = cameraFor('pushIn', progress(time, 0, 30), time);
  // Kalaratri's glow: in by 3 s, softening to a faint memory by 12 s.
  const kala = fadeIn(time, 0.5, 2.5) * (1 - 0.7 * fadeIn(time, 8, 4));
  const moon = progress(time, 8, 26);
  const lit = 0.55 + 0.45 * fadeIn(time, 10, 6);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Coast t={time} moon={moon} />
      <Layer depth={0.08}>
        <g opacity={kala}>
          <Glow x={560} y={150} r={190} colour="#3A3FA0" opacity={0.55} />
          <SymbolIcon name="abhaya" x={560} y={150} size={1.3} colour="#8A7FE0" />
        </g>
      </Layer>
      <Shore />
      <Layer depth={0.6}>
        <ShoreLamp t={time} x={820} y={620} lit={lit} pulse={pulse} />
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="dust" t={time} count={14} colour="#F2F0E6" opacity={0.25} area={{ x: 500, y: 300, w: 700, h: 400 }} />
      </Layer>
    </Stage>
  );
}
