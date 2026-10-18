// Beat 9: the theme, Nurture ("True care helps someone grow strong enough
// to go their own way"). Shown faintly behind the theme's words.
// A small diya cupped in two outline hands; its flame leans outward, towards
// an open doorway of light. The doorway slowly brightens.

import { easeInOut, progress } from '../../engine/anim';
import { GOLD } from '../figures';
import { cameraFor, Diya, Glow, Layer, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { palettes } from '../palettes';

const r = palettes.reflective;

// Two cupped hands, as fine gold outlines, holding something at (x, y).
export function CuppedHands({ x, y, scale = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; scale?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none" stroke={colour} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {/* Left hand: palm curving up, fingers along the rim. */}
      <path d="M -150 60 Q -120 30 -70 34 Q -30 36 -4 30 M -150 60 Q -110 70 -60 62 Q -20 56 0 40 M -70 34 Q -66 20 -50 18 M -44 32 Q -40 18 -24 18 M -20 30 Q -16 18 -2 20" />
      {/* Right hand, mirrored. */}
      <path d="M 150 60 Q 120 30 70 34 Q 30 36 4 30 M 150 60 Q 110 70 60 62 Q 20 56 0 40 M 70 34 Q 66 20 50 18 M 44 32 Q 40 18 24 18 M 20 30 Q 16 18 2 20" />
    </g>
  );
}

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const open = complete ? 1 : easeInOut(progress(t, 1, 10));
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom={r.secondary} t={t} stars={50} starColour={r.highlight} />
      </Layer>
      <Layer depth={0.3}>
        {/* The open doorway of light. */}
        <Glow x={1180} y={420} r={420} colour={r.highlight} opacity={0.25 * open} />
        <rect x={1080} y={200} width={200} height={420} rx={100} ry={100} fill={r.highlight} opacity={0.12 + 0.25 * open} />
        <rect x={1080} y={200} width={200} height={420} rx={100} ry={100} fill="none" stroke={r.accent} strokeWidth={2} opacity={0.6} />
        <rect x={-400} y={620} width={2400} height={500} fill="#0E1328" />
      </Layer>
      <Layer depth={0.5}>
        {/* The diya held in two hands; its flame leans towards the doorway. */}
        <Glow x={620} y={520} r={220} colour={r.accent} opacity={0.3 + pulse * 0.1} />
        <g transform="rotate(14 620 560)">
          <Diya x={620} y={560} t={t} scale={1.1} pulse={pulse} />
        </g>
        <CuppedHands x={620} y={560} scale={1.1} colour={GOLD} opacity={0.85} />
        <Particles kind="dust" t={t} count={18} colour={r.highlight} opacity={0.35} area={{ x: 640, y: 300, w: 600, h: 300 }} />
      </Layer>
    </Stage>
  );
}
