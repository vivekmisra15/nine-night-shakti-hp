// Drawing pieces made for Night 7 (docs/direction/night-7.md, "New drawing
// pieces"). They live here so no shared file changes; other nights could
// later move them into the shared kit.
//
//   N7Icon        extra gold outline icons: noose, hook, curved sword, donkey,
//                 the Mothers' mounts (swan, peacock, Garuda, boar, elephant)
//                 and the three eyes
//   DarkLight     the Devi's dark form (Kali, Kalaratri): indigo light with an
//                 ember core, and an optional faint outline with loose hair
//   MotherLight   one of the seven Mothers: a small soft light in her own colour
//   SoundRing     an expanding ring of light, for a sound that acts
//   InkNight      the deep indigo night sky with sparse stars and low ridges

import { useId } from 'react';
import { clamp, wobble } from '../../engine/anim';
import { DeviOutline, DivineLight, GOLD } from '../figures';
import { Glow, Layer, rand, Ridge, Sky, W } from '../shared';
import { day7Palettes } from './palettes';

export { cueAge, latestCue, linesOf } from '../day1/common';

const FILL = 'rgba(8, 10, 26, 0.55)';
const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// Icons (same style as SymbolIcon: about 70 units across at size 1)
// ---------------------------------------------------------------------------

export type N7IconName = 'noose' | 'hook' | 'curvedSword' | 'donkey' | 'swan' | 'peacock' | 'garuda' | 'boar' | 'elephant' | 'threeEyes';

// The peacock's fanned tail: five feathers, each ending in a small "eye".
const peacockTail = [-70, -50, -30, -10, 10]
  .map((deg) => {
    const a = (deg * Math.PI) / 180;
    const x = -4 + Math.cos(a - Math.PI / 2) * 36;
    const y = 12 + Math.sin(a - Math.PI / 2) * 36;
    return `M -4 12 L ${x.toFixed(1)} ${y.toFixed(1)} M ${(x + 4).toFixed(1)} ${y.toFixed(1)} A 4 4 0 1 0 ${(x - 4).toFixed(1)} ${y.toFixed(1)} A 4 4 0 1 0 ${(x + 4).toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(' ');

const shapes: Record<N7IconName, string> = {
  // A loop of rope with its two ends hanging down.
  noose: 'M -5 -8 A 18 18 0 1 1 5 -8 M -5 -8 Q -12 12 -4 34 M 5 -8 Q 12 12 4 34',
  // The elephant goad (ankusha): a straight shaft, a point and a curved hook.
  hook: 'M 0 34 L 0 -30 M -4 -30 L 0 -40 L 4 -30 M 0 -16 Q 18 -18 18 -4 Q 18 6 8 6',
  // A curved sword, its blade sweeping up from the hilt.
  curvedSword: 'M -4 32 L 4 32 M 0 32 L 0 20 M -12 20 L 12 20 M -4 20 Q -12 -8 10 -38 Q 2 -6 4 20 Z',
  // The donkey, standing, in profile: long ears, a short mane, four legs.
  donkey: 'M -30 4 Q -32 -12 -14 -12 L 14 -12 L 22 -24 Q 28 -30 34 -24 L 33 -14 Q 30 -9 26 -4 L 20 4 Z M 24 -26 L 19 -42 M 29 -27 L 30 -43 M -24 4 L -25 24 M -14 4 L -14 24 M 8 4 L 8 24 M 17 4 L 18 24 M -30 -6 L -38 8 M 10 -14 L 18 -24',
  // Brahmani's swan, gliding.
  swan: 'M -32 10 Q -20 26 10 22 Q 30 18 30 4 Q 18 10 6 6 Q -2 -6 4 -20 Q 8 -32 18 -30 L 26 -27 L 18 -25 Q 12 -23 12 -14 Q 10 0 22 0 M -32 10 Q -18 2 -4 10',
  // Kaumari's peacock: a small body and a fanned tail.
  peacock: `M -4 22 Q -12 8 -2 -6 Q 2 -16 9 -13 L 14 -11 L 9 -9 Q 6 0 10 22 Z M 9 -15 L 7 -22 M 11 -15 L 12 -22 ${peacockTail}`,
  // Garuda, the eagle, wings spread.
  garuda: 'M 0 -14 L 0 22 M -6 24 L 6 24 M 0 -4 Q -20 -24 -38 -14 Q -24 -12 -16 -2 Q -26 0 -32 8 Q -14 6 0 4 Q 14 6 32 8 Q 26 0 16 -2 Q 24 -12 38 -14 Q 20 -24 0 -4 M 5 -20 A 5 5 0 1 0 -5 -20 A 5 5 0 1 0 5 -20 M 4 -21 L 11 -18 L 4 -16',
  // Varahi's boar: a heavy body, a snout and a small tusk.
  boar: 'M -32 6 Q -32 -14 -8 -16 Q 14 -18 22 -8 L 34 -2 L 34 6 L 22 8 Q 10 14 -20 12 Z M 28 0 Q 34 -8 28 -10 M -22 12 L -22 22 M -10 12 L -10 22 M 8 12 L 8 22 M 18 10 L 18 20 M 6 -16 L 2 -24 L 10 -18',
  // Aindri's elephant: a domed head, an ear, the trunk curling down.
  elephant: 'M -30 16 L -30 -6 Q -28 -22 -6 -22 Q 14 -22 20 -10 Q 28 -6 28 8 Q 28 22 34 24 M -30 16 L -20 16 L -20 6 M -10 6 L -10 16 L 2 16 L 2 4 M 12 2 L 12 16 L 20 16 L 20 6 M 4 -18 Q -4 -6 8 -2',
  // Three eyes: two side by side and one above, each a small almond.
  threeEyes: 'M -26 6 Q -16 -4 -6 6 Q -16 14 -26 6 Z M 6 6 Q 16 -4 26 6 Q 16 14 6 6 Z M 0 -12 Q -6 -20 0 -30 Q 6 -20 0 -12 Z',
};

export function N7Icon({ name, x, y, size = 1, colour = GOLD, opacity = 1, glow = 0 }: { name: N7IconName; x: number; y: number; size?: number; colour?: string; opacity?: number; glow?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      {glow > 0 && <Glow x={x} y={y} r={60 * size} colour={colour} opacity={0.5 * glow} />}
      <g transform={`translate(${x} ${y}) scale(${size})`}>
        <path d={shapes[name]} fill={FILL} {...line(colour)} />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------
// The Devi's dark form
// ---------------------------------------------------------------------------

// Kali and Kalaratri: a deep indigo glow with an ember core (light, never a
// shadow), and at key moments a very faint fine-line outline of head and
// shoulders with loose, flowing hair lines. No features, no body.
// (x, y) is the base of the flame; `outline` 0 to 1 fades the outline in.
export function DarkLight({ x, y, t, size = 1, strength = 1, outline = 0, pulse = 0 }: { x: number; y: number; t: number; size?: number; strength?: number; outline?: number; pulse?: number }) {
  if (strength <= 0.01) return null;
  const k = day7Palettes.n7kalaratri;
  // Where the outline sits: the neck at the flame's heart.
  const neckY = y - 120 * size;
  const s = 1.6 * size;
  // Loose hair: wavy lines flowing out and down from each side of the head.
  const hair = [-1, 1].flatMap((side) =>
    [0, 1, 2].map((i) => {
      const sway = wobble(t, 0.5, i + side * 3) * 6;
      const x0 = side * (12 + i * 3);
      const y0 = -50 + i * 6;
      return `M ${x0} ${y0} Q ${side * (32 + i * 8) + sway} ${-24 + i * 8} ${side * (24 + i * 6)} ${4 + i * 6} T ${side * (38 + i * 8) + sway} ${30 + i * 8}`;
    }),
  );
  return (
    <g>
      {/* A wide indigo glow: the dark that reads as light. */}
      <Glow x={x} y={y - 110 * size} r={330 * size * Math.min(1.5, strength)} colour="#3A3F9E" opacity={0.42 * Math.min(1, strength)} />
      <Glow x={x} y={y - 80 * size} r={150 * size} colour={k.secondary} opacity={0.3 * Math.min(1, strength) * (1 + pulse * 0.3)} />
      <DivineLight x={x} y={y} t={t} kind="dark" size={size} strength={strength} pulse={pulse} />
      {outline > 0.01 && (
        <g opacity={outline}>
          <DeviOutline x={x} y={neckY} size={s} opacity={0.34} colour={k.highlight} />
          <g transform={`translate(${x} ${neckY}) scale(${s})`} fill="none" opacity={0.2}>
            {hair.map((d, i) => (
              <path key={i} d={d} {...line(k.highlight, 1)} />
            ))}
          </g>
        </g>
      )}
    </g>
  );
}

// One of the seven Mothers (Matrikas): a small soft light in her own colour.
export function MotherLight({ x, y, t, colour, size = 1, strength = 1 }: { x: number; y: number; t: number; colour: string; size?: number; strength?: number }) {
  const id = useId();
  if (strength <= 0.01) return null;
  const breathe = 1 + wobble(t, 0.9, x) * 0.06;
  return (
    <g opacity={clamp(strength)}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="0.4" stopColor={colour} stopOpacity={0.8} />
          <stop offset="1" stopColor={colour} stopOpacity={0} />
        </radialGradient>
      </defs>
      <Glow x={x} y={y} r={110 * size * breathe} colour={colour} opacity={0.35} />
      <circle cx={x} cy={y} r={26 * size * breathe} fill={`url(#${id})`} />
    </g>
  );
}

// A sound that acts (the Devi's single sound in Beat 2): a ring of light
// spreading out from (x, y). `p` runs from 0 to 1.
export function SoundRing({ x, y, p, colour, reach = 900 }: { x: number; y: number; p: number; colour: string; reach?: number }) {
  if (p <= 0 || p >= 1) return null;
  return (
    <g fill="none" stroke={colour}>
      <circle cx={x} cy={y} r={20 + p * reach} strokeWidth={26 * (1 - p)} opacity={0.45 * (1 - p)} />
      <circle cx={x} cy={y} r={10 + p * reach * 0.7} strokeWidth={8 * (1 - p)} opacity={0.35 * (1 - p)} />
    </g>
  );
}

// A small ember spark (the drop that never lands, or the one that does).
export function Spark({ x, y, opacity = 1, colour = '#FFC27A' }: { x: number; y: number; opacity?: number; colour?: string }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={22} colour={colour} opacity={0.8} />
      <circle cx={x} cy={y} r={3.5} fill="#FFF1D6" />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The night
// ---------------------------------------------------------------------------

const n = day7Palettes.n7darkNight;

// The deep indigo-black night of Night 7: sparse cold stars over low ridges,
// and a faint ground line. `light` (0 to 1) lifts the sky towards the pearl
// before dawn (the closing).
export function InkNight({ t, stars = 50, light = 0, ground = true }: { t: number; stars?: number; light?: number; ground?: boolean }) {
  const p = day7Palettes.n7preDawn;
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={n.shadow} bottom={n.primary} t={t} stars={stars} starColour={n.highlight} />
        {light > 0 && (
          <g opacity={light}>
            <Sky top={p.secondary} bottom={p.primary} t={t} />
          </g>
        )}
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={21} baseY={640} height={110} fill={light > 0.5 ? '#3E3560' : '#1A1B3A'} />
      </Layer>
      <Layer depth={0.35}>
        <Ridge seed={24} baseY={760} height={80} fill={light > 0.5 ? '#2C2648' : '#0D0F24'} />
      </Layer>
      {ground && (
        <Layer depth={0.6}>
          <path d={`M -400 820 L ${W + 400} 820 L ${W + 400} 1300 L -400 1300 Z`} fill="#06070F" />
          <path d={`M -400 820 L ${W + 400} 820`} stroke={n.highlight} strokeWidth={1.5} opacity={0.18} />
        </Layer>
      )}
    </>
  );
}

// A few faint cold stars that twinkle, for scenes with their own sky.
export function FaintStars({ t, count = 30, seed = 5, colour = n.highlight }: { t: number; count?: number; seed?: number; colour?: string }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={rand(i, seed) * 1800 - 100} cy={rand(i, seed + 1) * 520 - 40} r={0.8 + rand(i, seed + 2) * 1.6} fill={colour} opacity={0.3 + 0.3 * wobble(t, 0.7 + rand(i, seed + 3), i)} />
      ))}
    </g>
  );
}
