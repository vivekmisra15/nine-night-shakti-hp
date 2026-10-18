// Night 2's own drawing pieces (docs/direction/night-2.md, "New drawing
// pieces"). They are built here rather than in the shared kit, so other
// nights are not affected; any that prove useful can move to shared.tsx later.
//
// Everything is a gold outline or soft light, in the iconographic style of
// figures.tsx.

import { useId } from 'react';
import { clamp, lerp, wobble } from '../../engine/anim';
import { GOLD } from '../figures';
import { fadeIn, Glow } from '../shared';

const FILL = 'rgba(8, 10, 26, 0.55)';
const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// The bead ring: the night's signature (the japa mala)
// ---------------------------------------------------------------------------

export const BEADS = 9;

// How many beads are lit at time t: `before` already lit, plus one more
// fading in at each of the given times.
export const beadsLit = (t: number, before: number, times: number[]) => before + times.reduce((sum, at) => sum + fadeIn(t, at, 1.2), 0);

// A ring of nine beads of light, seen a little from above, low in the frame.
// `lit` can be fractional: the next bead is part-way through lighting.
export function BeadRing({ lit, t, x = 800, y = 805, rx = 140, ry = 30, opacity = 0.85 }: { lit: number; t: number; x?: number; y?: number; rx?: number; ry?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {/* The thread the beads are strung on. */}
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.35} />
      {Array.from({ length: BEADS }, (_, i) => {
        // Start at the front (bottom) of the ring and go round.
        const a = Math.PI / 2 + (i / BEADS) * Math.PI * 2;
        const bx = x + Math.cos(a) * rx;
        const by = y + Math.sin(a) * ry;
        const on = clamp(lit - i);
        const front = 0.75 + 0.25 * Math.sin(a); // beads at the back are a little smaller
        return (
          <g key={i}>
            {on > 0 && <Glow x={bx} y={by} r={26 * front} colour="#FFE3A3" opacity={0.7 * on * (0.85 + 0.15 * wobble(t, 1.2, i))} />}
            <circle cx={bx} cy={by} r={6 * front} fill={on > 0.5 ? '#FFF4D6' : '#2A2340'} fillOpacity={on > 0.5 ? on : 0.6} stroke={GOLD} strokeWidth={1.2} opacity={0.6 + 0.4 * on} />
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Kama's arrow and Shiva's third eye
// ---------------------------------------------------------------------------

// A fine arrow of light flying from (x1, y1) to (x2, y2); p is 0 to 1 of its flight.
export function ArrowOfLight({ x1, y1, x2, y2, p, colour = '#FFD1DC' }: { x1: number; y1: number; x2: number; y2: number; p: number; colour?: string }) {
  if (p <= 0 || p >= 1) return null;
  const hx = lerp(x1, x2, p);
  const hy = lerp(y1, y2, p);
  const tail = Math.max(0, p - 0.25);
  const tx = lerp(x1, x2, tail);
  const ty = lerp(y1, y2, tail);
  return (
    <g>
      <line x1={tx} y1={ty} x2={hx} y2={hy} stroke={colour} strokeWidth={10} opacity={0.18} strokeLinecap="round" />
      <line x1={tx} y1={ty} x2={hx} y2={hy} stroke={colour} strokeWidth={2.5} opacity={0.9} strokeLinecap="round" />
      <Glow x={hx} y={hy} r={30} colour="#FFFFFF" opacity={0.8} />
    </g>
  );
}

// A bright point opening in a light, then a white flash that fades. p: 0 to 1.
export function ThirdEyeFlash({ x, y, p }: { x: number; y: number; p: number }) {
  if (p <= 0 || p >= 1) return null;
  const open = clamp(p / 0.3);
  const flash = clamp((p - 0.3) / 0.1) * (1 - clamp((p - 0.4) / 0.6));
  return (
    <g>
      {/* The eye of light: a small upright almond, opening. */}
      <path d={`M ${x} ${y - 16} Q ${x + 8 * open} ${y} ${x} ${y + 16} Q ${x - 8 * open} ${y} ${x} ${y - 16} Z`} fill="#FFFFFF" opacity={0.95 * (1 - flash * 0.5)} />
      <Glow x={x} y={y} r={60 + 200 * open} colour="#FFFFFF" opacity={0.6 * open} />
      <rect x={-400} y={-400} width={2400} height={1700} fill="#FFFFFF" opacity={0.85 * flash} />
    </g>
  );
}

// Grey ash drifting down that turns to soft pink petals as it falls (`turn`: 0 ash, 1 petals).
export function AshAndPetals({ t, start, turn, count = 34, opacity = 0.8 }: { t: number; start: number; turn: number; count?: number; opacity?: number }) {
  const age = t - start;
  if (age < 0) return null;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
        // Thrown outwards from the flash point (around 760, 360), then drifting down.
        const burst = Math.min(1, age / 3);
        const x = 760 + (r1 - 0.5) * 900 * burst + Math.sin(age * 0.6 + i) * 30;
        const y = 360 + (r2 - 0.3) * 300 * burst + ((age * (14 + r2 * 22)) % 600);
        const petal = clamp(turn * 1.4 - r1 * 0.4);
        const spin = age * 40 * (r2 - 0.5) + i * 30;
        return (
          <g key={i} opacity={opacity * Math.min(1, age)}>
            {petal < 1 && <circle cx={x} cy={y} r={1.6 + r2 * 2} fill="#9AA3B5" opacity={1 - petal} />}
            {petal > 0 && <ellipse cx={x} cy={y} rx={8} ry={4.5} fill="#F2A7B8" opacity={petal} transform={`rotate(${spin} ${x} ${y})`} />}
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Small gold outline icons for this night
// ---------------------------------------------------------------------------

export type Icon2Name =
  | 'fruit'
  | 'leaf'
  | 'flowers'
  | 'umbrella'
  | 'staff'
  | 'veena'
  | 'jewel'
  | 'shard'
  | 'footprint'
  | 'cloth'
  | 'face'; // the calm face: a simple crescent of light

const icon2: Record<Icon2Name, string> = {
  fruit: 'M 0 -14 Q -22 -16 -22 6 Q -20 26 0 24 Q 20 26 22 6 Q 22 -16 0 -14 Z M 0 -14 Q 2 -24 8 -28 M 2 -20 Q 12 -30 20 -22 Q 10 -16 2 -20 Z',
  leaf: 'M -24 20 Q -26 -16 22 -24 Q 24 14 -24 20 Z M -24 20 Q -2 0 14 -14 M -30 26 L -24 20',
  flowers: 'M -14 6 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 12 0 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0 M 0 -14 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0 M -26 16 Q 0 28 26 16',
  umbrella: 'M -32 -4 Q -30 -30 0 -32 Q 30 -30 32 -4 Q 22 -10 16 -4 Q 8 -10 0 -4 Q -8 -10 -16 -4 Q -22 -10 -32 -4 Z M 0 -4 L 0 28 Q 0 34 -6 34',
  staff: 'M 0 -36 L 0 36 M -6 -30 Q 0 -40 6 -30',
  veena: 'M -36 10 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0 M 20 -4 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M -26 4 L 34 -16 M -24 10 L 32 -10 M 34 -16 L 38 -24',
  jewel: 'M -18 -8 L -10 -20 L 10 -20 L 18 -8 L 0 22 Z M -18 -8 L 18 -8 M -10 -20 L -4 -8 L 0 22 M 10 -20 L 4 -8',
  shard: 'M -12 -20 L 10 -24 L 16 4 L -2 22 L -16 6 Z M -6 -10 L 4 8',
  footprint: 'M 0 -8 Q -11 -8 -11 10 Q -10 26 0 26 Q 10 26 10 10 Q 11 -8 0 -8 Z M -9 -16 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M -2 -20 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 6 -18 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0',
  cloth: 'M -22 -24 L 22 -24 Q 18 0 24 24 Q 0 18 -24 24 Q -18 0 -22 -24 Z M -10 -24 Q -6 0 -12 22 M 8 -24 Q 12 0 6 22',
  face: 'M 10 -22 A 24 24 0 1 0 10 22 A 18 18 0 1 1 10 -22 Z',
};

export function Icon2({ name, x, y, size = 1, colour = GOLD, opacity = 1 }: { name: Icon2Name; x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d={icon2[name]} fill={FILL} {...line(colour)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The forest at peace: outline animals lying down, saplings and trees
// ---------------------------------------------------------------------------

const animals = {
  // Lying down, in profile, facing right.
  lion: 'M -40 10 Q -42 -6 -22 -8 L 14 -8 Q 22 -22 34 -18 Q 44 -12 40 0 Q 36 8 26 6 L 22 10 Z M 22 -18 Q 18 -30 30 -32 Q 46 -30 46 -14 M -40 4 Q -54 0 -50 -12',
  cow: 'M -38 10 Q -40 -8 -18 -10 L 16 -10 Q 22 -14 30 -12 Q 40 -8 38 2 L 28 4 L 20 10 Z M 26 -12 Q 24 -22 30 -24 M 34 -10 Q 42 -18 40 -24 M -38 4 Q -46 8 -44 18',
  cat: 'M -26 8 Q -28 -6 -10 -6 L 10 -6 Q 12 -16 20 -16 L 22 -22 L 25 -15 L 28 -22 L 30 -14 Q 34 -8 30 0 L 24 8 Z M -26 6 Q -40 4 -36 -8',
  mouse: 'M -12 6 Q -12 -6 2 -6 Q 12 -4 14 4 L 18 6 L 12 8 Z M 4 -6 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M -12 4 Q -22 6 -26 0',
};

export function Animal({ kind, x, y, size = 1, opacity = 1, colour = GOLD }: { kind: keyof typeof animals; x: number; y: number; size?: number; opacity?: number; colour?: string }) {
  if (opacity <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d={animals[kind]} fill={FILL} {...line(colour, 1.6)} />
    </g>
  );
}

// A tree in outline: `grow` 0 to 1 raises it from a sapling; `bloom` 0 to 1
// opens small flowers and fruit on it.
export function OutlineTree({ x, y, size = 1, grow = 1, bloom = 0, colour = GOLD, flower = '#F2A7B8' }: { x: number; y: number; size?: number; grow?: number; bloom?: number; colour?: string; flower?: string }) {
  const h = lerp(30, 120, grow);
  const crown = lerp(10, 54, grow);
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path d={`M 0 0 L 0 ${-h} M 0 ${-h * 0.6} Q ${-crown * 0.4} ${-h * 0.75} ${-crown * 0.6} ${-h * 0.9} M 0 ${-h * 0.7} Q ${crown * 0.4} ${-h * 0.85} ${crown * 0.55} ${-h}`} fill="none" {...line(colour, 1.6)} />
      <ellipse cx={0} cy={-h - crown * 0.3} rx={crown} ry={crown * 0.75} fill={FILL} {...line(colour, 1.6)} />
      {bloom > 0 &&
        [
          [-0.5, -0.1],
          [0.35, -0.4],
          [0.1, 0.25],
          [-0.2, -0.55],
          [0.55, 0.15],
        ].map(([dx, dy], i) => <circle key={i} cx={dx * crown} cy={-h - crown * 0.3 + dy * crown} r={5 * bloom} fill={i % 2 ? flower : '#F4C27A'} opacity={0.9 * bloom} />)}
    </g>
  );
}

// ---------------------------------------------------------------------------
// A word drawn in fine gold light (the name Uma)
// ---------------------------------------------------------------------------

export function NameGlyph({ text, x, y, p, size = 120 }: { text: string; x: number; y: number; p: number; size?: number }) {
  const id = useId();
  if (p <= 0) return null;
  return (
    <g>
      <defs>
        <filter id={id}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* A soft glow behind, then the fine letters, drawn stroke by stroke. */}
      <text x={x} y={y} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize={size} fill="none" stroke="#FFE3A3" strokeWidth={6} opacity={0.4 * p} filter={`url(#${id})`}>
        {text}
      </text>
      <text x={x} y={y} textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize={size} fill="#FFE3A3" fillOpacity={0.25 * p} stroke={GOLD} strokeWidth={1.6} pathLength={1} strokeDasharray={`${p} 1`}>
        {text}
      </text>
    </g>
  );
}

// ---------------------------------------------------------------------------
// The high ridge where Shiva meditates (Beats 1–4, 17 and the closing): the
// night sky, the peak to the right, and the lower slope where Parvati comes.
// ---------------------------------------------------------------------------

export function Stars({ t, count = 60, colour = '#FFF4D6', speed = 0 }: { t: number; count?: number; colour?: string; speed?: number }) {
  // `speed` turns the sky round a point (stars wheeling as years pass).
  return (
    <g transform={`rotate(${t * speed} 800 -200)`}>
      {Array.from({ length: count }, (_, i) => {
        const r1 = Math.abs(Math.sin(i * 91.7) * 9999) % 1;
        const r2 = Math.abs(Math.sin(i * 17.3) * 9999) % 1;
        return <circle key={i} cx={r1 * 2400 - 400} cy={r2 * 1100 - 500} r={0.8 + (i % 3) * 0.7} fill={colour} opacity={0.3 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.7 + i))} />;
      })}
    </g>
  );
}
