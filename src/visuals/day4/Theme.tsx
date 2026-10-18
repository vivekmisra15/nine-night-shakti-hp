// Beat 7: the theme, Creation ("What you make carries something of why you
// made it"). It is shown faintly behind the theme's words.
// The warm point of light rests in a small open palm of gold rays, like a
// hand still holding what it made, with a thin thread of light running from
// it to a tiny sun: making something starts a relationship with it.

import { easeOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Glow, Layer, LightTrail, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { DarkSky, Stars, SunDisc, WarmPoint } from './kit';

const r = palettes.reflective;
const P = { x: 700, y: 520 }; // the warm point, in the palm

// The open palm: short curved rays fanning upward beneath the point.
const palm = [-70, -48, -26, 0, 26, 48, 70].map((deg) => {
  const a = ((deg + 90) * Math.PI) / 180;
  const x1 = P.x + Math.cos(a) * 40;
  const y1 = P.y + Math.sin(a) * 40;
  const x2 = P.x + Math.cos(a) * 150;
  const y2 = P.y + Math.sin(a) * 110 - 40;
  return `M ${x1} ${y1} Q ${(x1 + x2) / 2 + (deg < 0 ? -20 : deg > 0 ? 20 : 0)} ${Math.max(y1, y2) + 30} ${x2} ${y2 - 60}`;
});

// The thread of light from the point up to the tiny sun.
const thread = `M ${P.x} ${P.y} C 820 420 980 260 1120 230`;

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('drift', 0, t);
  const grow = complete ? 1 : easeOut(progress(t, 1, 8));
  const link = complete ? 1 : easeOut(progress(t, 5, 12));
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <DarkSky t={t} warmth={0.15} />
        <Stars t={t} count={60} opacity={0.6} colour={r.highlight} />
      </Layer>
      <Layer depth={0.3}>
        {/* The tiny sun the light is still connected to. */}
        <g opacity={link}>
          <SunDisc x={1120} y={230} r={34} t={t} corona={0.6} point={0.6} />
        </g>
        <LightTrail d={thread} amount={link} colour="#FFE9B8" width={2} t={t} opacity={0.5} />
      </Layer>
      <Layer depth={0.5}>
        {/* The palm of gold rays, holding the warm point. */}
        {palm.map((d, i) => (
          <LightTrail key={i} d={d} amount={grow} colour="#E8B45A" width={3} t={t + i} opacity={0.55} />
        ))}
        <Glow x={P.x} y={P.y} r={240} colour={r.accent} opacity={0.22 + pulse * 0.08} />
        <WarmPoint x={P.x} y={P.y} t={t} size={1.1} pulse={pulse} />
        <Particles kind="dust" t={t} count={18} colour={r.highlight} opacity={0.3} area={{ x: 500, y: 250, w: 450, h: 350 }} />
      </Layer>
    </Stage>
  );
}
