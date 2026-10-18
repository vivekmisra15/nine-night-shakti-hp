// The text-led beats' backdrops (shown faintly behind the words), and the
// night's closing.
//   Beat 9 (the theme, Renewal)  a single diya on the shore, its reflection
//                                on still water slowly widening into a calm
//                                ring of light
//   Beat 14 (Side by side)       the shore lamp on one side and a candle on
//                                the other, at the same height
//   Beat 15 (Today)              a faint night sky over the shore
//   Beat 16 (Reflection)         the shore lamp and its reflection, as in
//                                Beat 1; golden dust rises once at the theme
//   Closing (13 s)               the moon fades into a pale dawn over the sea;
//                                the reflection draws in to one spark that
//                                rises out of the frame; then a fade

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Candle, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { Coast, Shore, ShoreLamp } from './kit';

const c = palettes.n8prabhasaCoast;
const kitchen = palettes.n8grimmauldKitchen;

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const ring = complete ? 1 : easeInOut(progress(t, 1, 16));
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <Coast t={t} moon={0.85} />
      <Shore />
      <Layer depth={0.6}>
        <ShoreLamp t={t} x={800} y={620} ring={ring} pulse={pulse} />
      </Layer>
    </Stage>
  );
}

export function SideBySide({ beat, t, frozen, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Coast t={t} moon={0.8} moonX={420} />
      <Layer depth={0.5}>
        {/* The right half: an ink-blue room with one candle. */}
        <rect x={800} y={-400} width={1200} height={H + 800} fill={kitchen.primary} />
        <path d="M 800 -400 L 800 1300" stroke={c.secondary} strokeWidth={2} opacity={0.3} />
        <rect x={800} y={660} width={1200} height={400} fill="#14182A" />
      </Layer>
      <Layer depth={0.6}>
        <ShoreLamp t={t} x={400} y={620} pulse={pulse} />
        <Glow x={1200} y={590} r={200} colour={kitchen.accent} opacity={0.35} />
        <Candle x={1200} y={590} t={t} scale={1.2} outer={kitchen.accent} />
      </Layer>
    </Stage>
  );
}

export function Today({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Coast t={t} moon={0.75} />
      <Shore />
      <Layer depth={0.9}>
        <Particles kind="fireflies" t={t} count={10} colour="#FFE3B0" opacity={0.4} area={{ x: 100, y: 700, w: 500, h: 150 }} />
      </Layer>
    </Stage>
  );
}

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, false);
  const dust = takeaway >= 0 && takeaway < 8 ? 1 - takeaway / 8 : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Coast t={t} moon={1} />
      <Shore />
      <Layer depth={0.6}>
        <ShoreLamp t={t} x={820} y={620} pulse={pulse} />
      </Layer>
      {dust > 0 && (
        <Layer depth={0.9}>
          <Particles kind="dust" t={takeaway} count={40} colour={c.highlight} opacity={0.7 * dust} area={{ x: 500, y: 200, w: 600, h: 600 }} speed={3} />
        </Layer>
      )}
    </Stage>
  );
}

// The closing animation, played by itself after Finish (13 seconds; see
// closing in day8.ts). Registered as 'n8-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = easeInOut(progress(t, 0, 6));
  // The reflection draws in, the flame calms to an ember, then one spark rises.
  const drawIn = easeInOut(progress(t, 3, 8));
  const spark = progress(t, 8.5, 12);
  const out = fadeIn(t, 11.5, 1.5);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 8 closing">
      <Coast t={t} moon={1 - dawn * 0.3} dawn={dawn} />
      <Shore dawn={dawn} />
      <Layer depth={0.6}>
        <ShoreLamp t={t} x={820} y={620} lit={1 - 0.7 * drawIn} />
      </Layer>
      {spark > 0 && spark < 1 && (
        <g>
          <Glow x={838 + Math.sin(spark * 6) * 20} y={lerp(590, -40, spark)} r={30} colour="#FFF4D6" opacity={0.9} />
          <circle cx={838 + Math.sin(spark * 6) * 20} cy={lerp(590, -40, spark)} r={4} fill="#FFF4D6" />
        </g>
      )}
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
