// Beat 9: the theme, Wholeness ("You are whole when you know you are part of
// the whole"). Shown faintly behind the theme's words: a calm sea of gold
// light at night. Every so often one small wave rises, glints, and settles
// back into it, with no line where the wave ends: a wave discovering it was
// always the ocean.

import { useId } from 'react';
import { easeInOut } from '../../engine/anim';
import { cameraFor, Glow, Layer, Particles, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';

// The sea's surface, with one wave of height `h` at x = 800.
function surface(h: number, t: number) {
  const points: string[] = [];
  for (let x = -400; x <= W + 400; x += 20) {
    const bump = Math.exp(-(((x - 800) / 140) ** 2)) * h;
    const swell = Math.sin(x / 160 + t / 3) * 4;
    points.push(`${x} ${620 - bump + swell}`);
  }
  return `M -400 1300 L ${points.join(' L ')} L ${W + 400} 1300 Z`;
}

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const id = useId();
  // One wave every 14 seconds: rising, a glint at the top, settling back.
  const cycle = complete ? 0.5 : (t % 14) / 14;
  const h = easeInOut(Math.max(0, Math.sin(cycle * Math.PI))) * 90;
  const glint = Math.max(0, Math.sin(cycle * Math.PI) - 0.7) / 0.3;
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top="#0B0F22" bottom="#141A33" t={t} stars={80} starColour="#FFF4D6" />
      </Layer>
      <Layer depth={0.5}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5C66A" stopOpacity={0.55} />
            <stop offset="0.25" stopColor="#E8A63C" stopOpacity={0.3} />
            <stop offset="1" stopColor="#141A33" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Glow x={800} y={620} r={700} colour="#F5A623" opacity={0.18 + pulse * 0.05} />
        <path d={surface(h, t)} fill={`url(#${id})`} />
        {/* The glint at the top of the wave. */}
        <Glow x={800} y={620 - h} r={60} colour="#FFF4D6" opacity={0.8 * glint} />
        <Particles kind="dust" t={t} count={20} colour="#FFF4D6" opacity={0.25} area={{ x: 300, y: 380, w: 1000, h: 240 }} />
      </Layer>
    </Stage>
  );
}
