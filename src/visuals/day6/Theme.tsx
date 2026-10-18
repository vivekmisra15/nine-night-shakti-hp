// Beat 8: the theme, Courage ("When something is wrong, stand up to it, and
// stand together"). Shown faintly behind the theme's words: many small
// coloured lights drawn faintly, flowing slowly into one gold flame.

import { easeOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Flame, Glow, Layer, LightTrail, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { GODS, NightRidge } from './kit';

const r = palettes.reflective;
const F = { x: 800, y: 520 }; // the base of the gold flame

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('still', 0, t);
  // Each light's thread grows towards the flame, one after another.
  const grow = (i: number) => (complete ? 1 : easeOut(progress(t, 1 + i * 0.7, 9 + i * 0.7)));
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <NightRidge t={t} dim={0.7} />
      <Layer depth={0.4}>
        {GODS.map((g, i) => {
          const d = `M ${g.x} ${g.y * 0.9} Q ${(g.x + F.x) / 2} ${Math.min(g.y, F.y) - 140} ${F.x} ${F.y - 40}`;
          return (
            <g key={g.id}>
              <LightTrail d={d} amount={grow(i)} colour={g.colour} t={t + i} width={2} opacity={0.4} />
              <Glow x={g.x} y={g.y * 0.9} r={26} colour={g.colour} opacity={0.5} />
              <circle cx={g.x} cy={g.y * 0.9} r={3} fill={g.colour} opacity={0.8} />
            </g>
          );
        })}
        <Glow x={F.x} y={F.y - 60} r={260} colour={r.accent} opacity={0.3 + pulse * 0.1} />
        <Flame x={F.x} y={F.y} size={1.6} t={t} pulse={pulse} core="#FFF4D6" outer="#F4A93A" />
        <Particles kind="dust" t={t} count={18} colour={r.highlight} opacity={0.3} area={{ x: 600, y: 200, w: 400, h: 300 }} />
      </Layer>
    </Stage>
  );
}
