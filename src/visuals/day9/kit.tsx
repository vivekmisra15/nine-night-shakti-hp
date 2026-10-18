// Night 9's drawing pieces (docs/direction/night-9.md, "New drawing pieces").
// Everything is fine gold line-art and soft light, drawn from a time value.
// The night's thread is the lotus of light: closed at the opening, open as
// Siddhidatri gives the siddhis, and at the centre of the ring of nine diyas.

import { useId, type ReactNode } from 'react';
import { clamp, lerp, wobble } from '../../engine/anim';
import { GOLD, SymbolIcon } from '../figures';
import { Diya, Glow, Layer, rand, Ridge, Sky, W } from '../shared';

export { cueAge, latestCue, linesOf } from '../day1/common';

const FILL = 'rgba(8, 10, 26, 0.55)';

// Stroke settings for fine outlines (the same as the shared figures).
export const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// Water
// ---------------------------------------------------------------------------

// Calm water from height y down: a dark band with slow shimmer lines.
export function Water({ y, t, colour, shimmer = '#FFF6E8', opacity = 1, lines = 22 }: { y: number; t: number; colour: string; shimmer?: string; opacity?: number; lines?: number }) {
  return (
    <g opacity={opacity}>
      <rect x={-400} y={y} width={W + 800} height={900} fill={colour} />
      {Array.from({ length: lines }, (_, i) => {
        const depth = rand(i, 41);
        const ly = y + 8 + depth * depth * 260;
        const lx = rand(i, 42) * (W + 200) - 100 + Math.sin(t / 4 + i) * 20;
        const len = 30 + depth * 120;
        return <path key={i} d={`M ${lx} ${ly} L ${lx + len} ${ly}`} {...line(shimmer, 1.2)} opacity={0.12 + 0.12 * wobble(t, 0.6, i)} />;
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The lotus of light (Siddhidatri's seat)
// ---------------------------------------------------------------------------

// A full-blown lotus drawn in fine gold over soft pink light. `open` goes
// from 0 (a closed bud) to 1 (fully open).
export function LotusSeat({ x, y, size = 1, open, t, colour = '#F4B6C2', edge = '#E8B33C', glow = 1, opacity = 1 }: { x: number; y: number; size?: number; open: number; t: number; colour?: string; edge?: string; glow?: number; opacity?: number }) {
  const o = clamp(open);
  const breathe = 1 + wobble(t, 0.5, x) * 0.01;
  // Outer petals spread wide; inner petals stand more upright.
  const outer = [-1, -0.7, -0.4, -0.13, 0.13, 0.4, 0.7, 1];
  const inner = [-1, -0.5, 0, 0.5, 1];
  const petal = (angle: number, len: number, wide: number, i: number, fillOp: number) => (
    <path
      key={`${len}-${i}`}
      d={`M 0 0 Q ${-wide} ${-len * 0.45} 0 ${-len} Q ${wide} ${-len * 0.45} 0 0 Z`}
      transform={`rotate(${angle})`}
      fill={colour}
      fillOpacity={fillOp}
      {...line(edge, 1.4)}
    />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${size * breathe})`} opacity={opacity}>
      {glow > 0 && <Glow x={0} y={-30} r={170} colour={colour} opacity={0.35 * glow * (0.4 + 0.6 * o)} />}
      {outer.map((a, i) => petal(a * lerp(14, 82, o), lerp(70, 92, o), lerp(16, 26, o), i, 0.22))}
      {inner.map((a, i) => petal(a * lerp(6, 40, o), lerp(78, 70, o), lerp(14, 22, o), i, 0.32))}
      {/* The seed-head at the centre, showing once it has opened. */}
      <ellipse cx={0} cy={-6} rx={22 * o} ry={6 * o} fill={edge} opacity={0.5 * o} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Ardhanarishvara: one being of two lights
// ---------------------------------------------------------------------------

// One tall oval of light: the left half Shiva's cool silver, the right half
// Shakti's warm saffron, joined by a soft seam. Formless: no body is drawn.
export function JoinedLight({ x, y, t, size = 1, opacity = 1, pulse = 0 }: { x: number; y: number; t: number; size?: number; opacity?: number; pulse?: number }) {
  const id = useId();
  if (opacity <= 0.01) return null;
  const s = size * (1 + wobble(t, 0.7) * 0.02 + pulse * 0.03);
  const rx = 70 * s;
  const ry = 170 * s;
  return (
    <g opacity={opacity}>
      <defs>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9D3E6" stopOpacity={0.15} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0.95} />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity={0.95} />
          <stop offset="1" stopColor="#F2A54A" stopOpacity={0.15} />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <ellipse cx={x} cy={y} rx={rx} ry={ry} />
        </clipPath>
      </defs>
      <Glow x={x - rx * 0.6} y={y} r={ry * 1.5} colour="#C9D3E6" opacity={0.3} />
      <Glow x={x + rx * 0.6} y={y} r={ry * 1.5} colour="#F2A54A" opacity={0.3} />
      <g clipPath={`url(#${id}-c)`}>
        <rect x={x - rx} y={y - ry} width={rx} height={ry * 2} fill={`url(#${id}-l)`} />
        <rect x={x} y={y - ry} width={rx} height={ry * 2} fill={`url(#${id}-r)`} />
      </g>
      {/* The seam: a soft vertical line of pearl light where the two halves meet. */}
      <rect x={x - 3} y={y - ry * 0.92} width={6} height={ry * 1.84} fill="#FFFDF4" opacity={0.7} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" {...line('#FFF4D6', 1.2)} opacity={0.5} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Sparks (the eight siddhis)
// ---------------------------------------------------------------------------

export function Spark({ x, y, t, r = 7, opacity = 1, colour = '#FFF6E8', seed = 0 }: { x: number; y: number; t: number; r?: number; opacity?: number; colour?: string; seed?: number }) {
  if (opacity <= 0.01) return null;
  const twinkle = 0.75 + 0.25 * wobble(t, 1.6, seed);
  return (
    <g opacity={opacity * twinkle}>
      <Glow x={x} y={y} r={r * 6} colour={colour} opacity={0.5} />
      <circle cx={x} cy={y} r={r} fill={colour} />
      <path d={`M ${x - r * 2.6} ${y} L ${x + r * 2.6} ${y} M ${x} ${y - r * 2.6} L ${x} ${y + r * 2.6}`} {...line(colour, 1)} opacity={0.5} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The riverbank
// ---------------------------------------------------------------------------

// The earthen image the two seekers made: a simple clay form, no detail,
// on a low base, with a diya before it.
export function EarthenImage({ x, y, t, scale = 1, lit = 1, pulse = 0 }: { x: number; y: number; t: number; scale?: number; lit?: number; pulse?: number }) {
  return (
    <g>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M -38 0 L 38 0 L 32 -12 L -32 -12 Z" fill="#8A5A2B" {...line('#CDB68A', 1.2)} />
        <path d="M -24 -12 Q -30 -60 -12 -78 Q 0 -86 12 -78 Q 30 -60 24 -12 Z" fill="#9A6A3A" {...line('#CDB68A', 1.2)} />
        <circle cx={0} cy={-96} r={14} fill="#9A6A3A" {...line('#CDB68A', 1.2)} />
      </g>
      <Diya x={x - 4 * scale} y={y + 34 * scale} t={t} scale={0.45 * scale} lit={lit} pulse={pulse} />
    </g>
  );
}

// A fine-line tree (for the forest): a trunk, and a few branching strokes.
export function LineTree({ x, y, h = 300, colour = '#CDB68A', opacity = 0.5, seed = 1 }: { x: number; y: number; h?: number; colour?: string; opacity?: number; seed?: number }) {
  const lean = (rand(seed, 3) - 0.5) * 20;
  const branches = Array.from({ length: 5 }, (_, i) => {
    const by = y - h * (0.35 + i * 0.13);
    const side = i % 2 ? 1 : -1;
    const len = h * (0.28 - i * 0.04);
    return `M ${x + lean * (i / 5)} ${by} Q ${x + side * len * 0.6} ${by - len * 0.3} ${x + side * len} ${by - len * 0.55}`;
  });
  return (
    <g opacity={opacity} fill="none">
      <path d={`M ${x} ${y} Q ${x + lean * 0.5} ${y - h * 0.5} ${x + lean} ${y - h}`} {...line(colour, 2)} />
      {branches.map((d, i) => (
        <path key={i} d={d} {...line(colour, 1.2)} />
      ))}
    </g>
  );
}

// A small outline palace: a domed hall with two towers.
export function Palace({ x, y, scale = 1, colour = GOLD, opacity = 1, lights = 0 }: { x: number; y: number; scale?: number; colour?: string; opacity?: number; lights?: number }) {
  const d =
    'M -90 0 L -90 -60 L -70 -60 L -70 -110 L -60 -124 L -50 -110 L -50 -60 L -30 -60 L -30 -80 Q 0 -140 30 -80 L 30 -60 L 50 -60 L 50 -110 L 60 -124 L 70 -110 L 70 -60 L 90 -60 L 90 0 Z M -12 0 L -12 -30 Q 0 -44 12 -30 L 12 0';
  // Tiny lamps along its outline (Mysuru's palace, lit up).
  const lamps = [
    [-90, -60], [-70, -110], [-60, -124], [-50, -110], [-30, -80], [-15, -104], [0, -110], [15, -104], [30, -80], [50, -110], [60, -124], [70, -110], [90, -60], [-90, -30], [90, -30], [-30, -60], [30, -60],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path d={d} fill={FILL} {...line(colour, 1.6)} />
      {lights > 0 &&
        lamps.map(([lx, ly], i) => (
          <g key={i} opacity={clamp(lights * 17 - i)}>
            <circle cx={lx} cy={ly} r={9} fill="#F7C46A" opacity={0.25} />
            <circle cx={lx} cy={ly} r={2.6} fill="#FFF3DA" />
          </g>
        ))}
    </g>
  );
}

// A small crown icon (the kingdom Suratha asked for).
export function CrownIcon({ x, y, size = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d="M -26 14 L -30 -14 L -14 0 L 0 -22 L 14 0 L 30 -14 L 26 14 Z M -26 20 L 26 20" fill={FILL} {...line(colour)} />
      <circle cx={0} cy={-26} r={3} fill="none" {...line(colour, 1.2)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Vijayadashami vignettes (Beat 8)
// ---------------------------------------------------------------------------

// A shami tree with a bow hidden in its branches.
export function ShamiTree({ x, y, size = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none">
      <path d="M 0 60 Q -4 20 0 -10 M 0 10 Q -20 -6 -34 -22 M 0 0 Q 18 -14 30 -30 M 0 -10 Q -4 -30 2 -44" {...line(colour, 1.8)} />
      {/* Small leaf clusters. */}
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 1.3 + Math.PI * 0.85;
        const rr = 26 + rand(i, 5) * 22;
        const lx = Math.cos(a) * rr * 1.2;
        const ly = -20 + Math.sin(a) * rr;
        return <path key={i} d={`M ${lx - 4} ${ly} Q ${lx} ${ly - 3} ${lx + 4} ${ly}`} {...line(colour, 1)} opacity={0.75} />;
      })}
      {/* The bow, tucked among the branches. */}
      <g transform="translate(10 -18) rotate(-60) scale(0.55)">
        <path d="M -10 -34 Q 26 0 -10 34 M -10 -34 L -10 34" {...line('#FFF3DA', 1.6)} />
      </g>
    </g>
  );
}

// A tall effigy outline (no face), dissolving into rising embers.
export function Effigy({ x, y, t, dissolve, colour = '#9A8AAA' }: { x: number; y: number; t: number; dissolve: number; colour?: string }) {
  const d = clamp(dissolve);
  return (
    <g>
      <g opacity={1 - d} transform={`translate(${x} ${y})`}>
        <path d="M -40 0 L -34 -160 L -60 -200 L -30 -210 L -24 -250 Q 0 -290 24 -250 L 30 -210 L 60 -200 L 34 -160 L 40 0 Z" fill="#1E1A2C" {...line(colour, 2)} />
        <path d="M -24 -250 L -30 -282 L -12 -268 L 0 -296 L 12 -268 L 30 -282 L 24 -250" fill="none" {...line(colour, 1.4)} />
      </g>
      {/* Embers rising from it, more as it dissolves. */}
      {Array.from({ length: 26 }, (_, i) => {
        const age = (t * 0.35 + rand(i, 7)) % 1;
        const ex = x + (rand(i, 8) - 0.5) * 90 + Math.sin(t + i) * 12;
        const ey = y - 40 - rand(i, 9) * 200 - age * 260;
        return <circle key={i} cx={ex} cy={ey} r={1.5 + rand(i, 10) * 2} fill="#F7A541" opacity={d * (1 - age) * 0.9} />;
      })}
    </g>
  );
}

// An image-boat: a warm glow on a small raft, floating on the river.
export function ImageBoat({ x, y, t, opacity = 1 }: { x: number; y: number; t: number; opacity?: number }) {
  const bob = Math.sin(t * 0.9) * 3;
  return (
    <g opacity={opacity} transform={`translate(0 ${bob})`}>
      <Glow x={x} y={y - 30} r={120} colour="#F7A541" opacity={0.45} />
      <path d={`M ${x - 60} ${y} L ${x + 60} ${y} L ${x + 46} ${y + 14} L ${x - 46} ${y + 14} Z`} fill="#3A2A20" {...line('#E8B33C', 1.4)} />
      <ellipse cx={x} cy={y - 26} rx={18} ry={26} fill="#FFF3DA" opacity={0.8} />
      <ellipse cx={x} cy={y + 22} rx={70} ry={6} fill="#F7A541" opacity={0.25} />
    </g>
  );
}

// A tray of rice, with a fingertip line being traced in it (no letter shown).
export function RiceTray({ x, y, trace, opacity = 1 }: { x: number; y: number; trace: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <ellipse cx={x} cy={y} rx={120} ry={34} fill="#3A3020" {...line(GOLD, 1.6)} />
      <ellipse cx={x} cy={y - 4} rx={104} ry={26} fill="#F3E6CC" opacity={0.85} />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={x + (rand(i, 21) - 0.5) * 190} cy={y - 4 + (rand(i, 22) - 0.5) * 40} r={1.4} fill="#CDB68A" />
      ))}
      <path d={`M ${x - 50} ${y + 2} q 20 -18 36 -2 t 34 -4 q 14 -10 30 4`} pathLength={1} strokeDasharray={`${trace} 1`} {...line('#8A6A3A', 3)} fill="none" />
    </g>
  );
}

// A two-lobed apta leaf.
export function AptaLeaf({ x, y, size = 1, colour = '#F7C46A', opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d="M 0 30 L 0 -6 Q -40 -4 -36 -34 Q -16 -48 0 -20 Q 16 -48 36 -34 Q 40 -4 0 -6" fill={FILL} {...line(colour, 1.6)} />
      <path d="M 0 -6 L -20 -28 M 0 -6 L 20 -28" fill="none" {...line(colour, 1)} opacity={0.7} />
    </g>
  );
}

// A small outline palanquin (a deity carried in procession), as a canopy.
export function Palanquin({ x, y, size = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none">
      <path d="M -40 0 L 40 0 M -20 0 L -20 -30 M 20 0 L 20 -30 M -28 -30 Q 0 -60 28 -30 Z" {...line(colour, 1.6)} />
      <circle cx={0} cy={-18} r={6} fill="#FFF3DA" opacity={0.7} />
    </g>
  );
}

// The tools honoured at Ayudha Puja: a book, a pen, a veena-like instrument
// and a laptop, resting before a diya.
export function Tools({ x, y, t, opacity = 1, pulse = 0 }: { x: number; y: number; t: number; opacity?: number; pulse?: number }) {
  const c = GOLD;
  return (
    <g opacity={opacity} fill={FILL}>
      <Glow x={x} y={y - 40} r={260} colour="#F7A541" opacity={0.3} />
      {/* Two books, stacked. */}
      <path d={`M ${x - 300} ${y} l 150 0 l 0 -24 l -150 0 Z M ${x - 290} ${y - 24} l 130 0 l 0 -22 l -130 0 Z`} {...line(c, 1.6)} />
      {/* A pen laid across. */}
      <path d={`M ${x - 140} ${y + 6} l 90 -16 l 6 6 l -90 16 Z`} {...line(c, 1.4)} />
      {/* A veena-like instrument: a long neck with a round gourd at each end. */}
      <path d={`M ${x + 70} ${y - 20} L ${x + 250} ${y - 70}`} {...line(c, 2)} />
      <circle cx={x + 60} cy={y - 14} r={26} {...line(c, 1.6)} />
      <circle cx={x + 262} cy={y - 76} r={14} {...line(c, 1.4)} />
      {/* A laptop. */}
      <path d={`M ${x + 120} ${y + 40} l 150 0 l 20 16 l -190 0 Z M ${x + 132} ${y + 40} l 0 -70 l 126 0 l 0 70`} {...line(c, 1.6)} />
      <Diya x={x - 30} y={y + 70} t={t} scale={0.7} pulse={pulse} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The look-back: nine diyas in a ring
// ---------------------------------------------------------------------------

// A small sun icon (Kushmanda, Night 4): a circle with short rays.
function Sun({ x, y, size = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none">
      <circle r={12} fill={FILL} {...line(colour)} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <path key={i} d={`M ${Math.cos(a) * 18} ${Math.sin(a) * 18} L ${Math.cos(a) * 26} ${Math.sin(a) * 26}`} {...line(colour, 1.4)} />;
      })}
    </g>
  );
}

// Each night's small symbol, in order (from the direction brief): moon,
// rosary and water-pot, bell, sun, lotus with a child-glow, sword of light,
// raised hand, bull, lotus.
export function NightIcon({ night, x, y, size = 0.55, opacity = 1 }: { night: number; x: number; y: number; size?: number; opacity?: number }) {
  const icon = (): ReactNode => {
    switch (night) {
      case 1:
        return <SymbolIcon name="moon" x={x} y={y} size={size} />;
      case 2:
        return (
          <>
            <SymbolIcon name="rosary" x={x - 14} y={y} size={size * 0.75} />
            <SymbolIcon name="waterPot" x={x + 16} y={y} size={size * 0.75} />
          </>
        );
      case 3:
        return <SymbolIcon name="bell" x={x} y={y} size={size} />;
      case 4:
        return <Sun x={x} y={y} size={size} />;
      case 5:
        return (
          <>
            <SymbolIcon name="lotus" x={x} y={y} size={size} />
            <Glow x={x} y={y - 6} r={16} colour="#FFF6E8" opacity={0.9} />
          </>
        );
      case 6:
        return (
          <>
            <Glow x={x} y={y} r={26} colour="#FFF6E8" opacity={0.35} />
            <SymbolIcon name="sword" x={x} y={y} size={size} colour="#FFF6E8" />
          </>
        );
      case 7:
        return <SymbolIcon name="abhaya" x={x} y={y} size={size} />;
      case 8:
        return <SymbolIcon name="bull" x={x} y={y} size={size} />;
      default:
        return <SymbolIcon name="lotus" x={x} y={y} size={size} />;
    }
  };
  return <g opacity={opacity}>{icon()}</g>;
}

// Where diya i (0 to 8) sits on a ring around (cx, cy), seen at an angle.
// `turn` (0 to 1) turns the whole ring once.
export function ringPlace(i: number, cx: number, cy: number, rx: number, ry: number, turn = 0) {
  const a = Math.PI / 2 + (i / 9) * Math.PI * 2 + turn * Math.PI * 2;
  return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, front: Math.sin(a) };
}

// The ring of nine diyas. `lit(i)` says how lit each one is (0 to 1); each
// lit diya shows its night's symbol beside it.
export function NineDiyaRing({ cx, cy, rx, ry, t, lit, turn = 0, icons = 1, pulse = 0 }: { cx: number; cy: number; rx: number; ry: number; t: number; lit: (i: number) => number; turn?: number; icons?: number; pulse?: number }) {
  const places = Array.from({ length: 9 }, (_, i) => ({ i, ...ringPlace(i, cx, cy, rx, ry, turn) }));
  // Draw the far diyas first, so near ones overlap them.
  places.sort((a, b) => a.front - b.front);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" {...line(GOLD, 1)} strokeDasharray="2 10" opacity={0.35} />
      {places.map(({ i, x, y, front }) => {
        const scale = 0.5 + 0.12 * front;
        const l = lit(i);
        return (
          <g key={i}>
            <Glow x={x} y={y - 10} r={90} colour="#F7B733" opacity={0.3 * l} />
            <Diya x={x} y={y} t={t + i} scale={scale} lit={l} pulse={pulse} />
            <NightIcon night={i + 1} x={x} y={y + 52 * scale + 26} size={0.42 + 0.06 * front} opacity={icons * l} />
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Hogwarts objects (abstract: objects and light only)
// ---------------------------------------------------------------------------

// A thin wand of light from (x1, y1) to (x2, y2).
export function WandOfLight({ x1, y1, x2, y2, glow = 1, colour = '#FFF6E0', opacity = 1 }: { x1: number; y1: number; x2: number; y2: number; glow?: number; colour?: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={colour} strokeWidth={14} strokeLinecap="round" opacity={0.18 * glow} />
      <path d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={colour} strokeWidth={4} strokeLinecap="round" opacity={0.6 + 0.4 * glow} />
      <Glow x={x2} y={y2} r={40 * (0.4 + glow)} colour={colour} opacity={0.6 * glow} />
    </g>
  );
}

// A tall mirror frame with a pointed top and two feet. `glass` draws what
// shows in the glass, clipped to it. (x, y) is the base centre.
export function MirrorFrame({ x, y, scale = 1, glass, frame = '#A8A6B0', opacity = 1 }: { x: number; y: number; scale?: number; glass?: ReactNode; frame?: string; opacity?: number }) {
  const id = useId();
  const glassPath = 'M -110 -40 L -110 -440 Q -110 -520 0 -560 Q 110 -520 110 -440 L 110 -40 Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <defs>
        <clipPath id={id}>
          <path d={glassPath} />
        </clipPath>
      </defs>
      <path d={glassPath} fill="#141824" />
      <g clipPath={`url(#${id})`}>{glass}</g>
      {/* The frame: a heavy band, an inner line, and claw-like feet. */}
      <path d="M -134 -30 L -134 -446 Q -134 -540 0 -588 Q 134 -540 134 -446 L 134 -30 Z" fill="none" {...line(frame, 2.5)} />
      <path d={glassPath} fill="none" {...line(frame, 1.4)} opacity={0.8} />
      <path d="M -134 -30 L 134 -30 M -120 -30 L -130 0 M 120 -30 L 130 0 M -150 0 L -110 0 M 110 0 L 150 0" fill="none" {...line(frame, 2)} />
      <circle cx={0} cy={-572} r={6} fill="none" {...line(frame, 1.4)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The violet night over still water (Beats 1–3, 14–17 and the closing)
// ---------------------------------------------------------------------------

const lotusNight = { shadow: '#0E0A22', secondary: '#241A4A', highlight: '#FFF6E8' };

// Deep violet sky with stars, faint far hills, and still water from y = 640.
// `dawn` (0 to 1) brings up the saffron dawn of Vijayadashami.
export function VioletNight({ t, dawn = 0, waterY = 640 }: { t: number; dawn?: number; waterY?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={lotusNight.shadow} bottom={lotusNight.secondary} t={t} stars={80} starColour={lotusNight.highlight} />
        {dawn > 0 && (
          <g opacity={dawn}>
            <Sky top="#2B2440" bottom="#F7A541" t={t} />
            <Glow x={800} y={waterY} r={700} colour="#FFF3DA" opacity={0.45} />
          </g>
        )}
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={21} baseY={waterY + 4} height={70} fill={dawn > 0.5 ? '#4A3A5A' : '#1A1438'} />
      </Layer>
      <Layer depth={0.4}>
        <Water y={waterY} t={t} colour={dawn > 0 ? mixColour('#120E2C', '#5A4A6A', dawn) : '#120E2C'} shimmer={dawn > 0.3 ? '#FFF3DA' : '#F4B6C2'} />
      </Layer>
    </>
  );
}

// Mix two #RRGGBB colours.
export function mixColour(a: string, b: string, amount: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const m = pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(amount))));
  return `#${m.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
