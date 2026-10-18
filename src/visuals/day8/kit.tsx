// Drawing pieces for Night 8 (docs/direction/night-8.md, "New drawing
// pieces"): the moonlit coast at Prabhasa, a light's reflection in still
// water, the linga, the five fires, rain, the folded white cloth, and the
// Hogwarts objects (locket, sword of light, tent, deer-like light).
// Everything is drawn from the time value t.

import { useId } from 'react';
import { lerp, wobble } from '../../engine/anim';
import { GOLD } from '../figures';
import { Diya, Flame, Glow, H, Layer, rand, Ridge, Sky, W } from '../shared';
import { palettes } from '../palettes';

const c = palettes.n8prabhasaCoast;
const dawnP = palettes.n8seaDawn;

// The sea's surface starts at this height in every coast picture.
export const SEA_Y = 560;

// ---------------------------------------------------------------------------
// The coast at Prabhasa
// ---------------------------------------------------------------------------

// The moonlit coast: sky and stars, the pale moon (`moon` 0 = below the
// horizon, 1 = high), a low headland, the sea with moonlight on it, and a
// sandy bank in the lower left. `dawn` (0 to 1) turns it to a pale dawn.
export function Coast({ t, moon = 1, dawn = 0, moonX = 1180 }: { t: number; moon?: number; dawn?: number; moonX?: number }) {
  const moonY = lerp(620, 190, moon);
  return (
    <>
      <Layer depth={0.04}>
        <Sky top={c.shadow} bottom={c.primary} t={t} stars={80} starColour={c.highlight} />
        {dawn > 0 && (
          <g opacity={dawn}>
            <Sky top={dawnP.secondary} bottom={dawnP.primary} t={t} />
          </g>
        )}
        {/* The moon, rising; it fades as dawn comes. */}
        <g opacity={1 - dawn * 0.85}>
          <Glow x={moonX} y={moonY} r={220} colour={c.highlight} opacity={0.25} />
          <circle cx={moonX} cy={moonY} r={34} fill={c.highlight} />
        </g>
      </Layer>
      <Layer depth={0.12}>
        {/* A low headland across the bay, near Somnath. */}
        <Ridge seed={5} baseY={SEA_Y + 4} height={50} fill={dawn > 0.5 ? '#6A6F8C' : '#141E38'} />
      </Layer>
      <Layer depth={0.3}>
        <Sea t={t} moonX={moonX} moon={moon * (1 - dawn * 0.7)} dawn={dawn} />
      </Layer>
    </>
  );
}

// The sea, from the horizon down, with slow lines of swell and a path of
// moonlight beneath the moon.
export function Sea({ t, moonX = 1180, moon = 1, dawn = 0 }: { t: number; moonX?: number; moon?: number; dawn?: number }) {
  const id = useId();
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dawn > 0 ? mix('#22355A', '#8EA0BC', dawn) : '#22355A'} />
          <stop offset="1" stopColor={dawn > 0 ? mix('#0A1224', '#3A3F5C', dawn) : '#0A1224'} />
        </linearGradient>
      </defs>
      <rect x={-400} y={SEA_Y} width={W + 800} height={H - SEA_Y + 400} fill={`url(#${id})`} />
      {/* Long, slow lines of swell. */}
      {Array.from({ length: 9 }, (_, i) => {
        const y = SEA_Y + 20 + i * i * 5 + Math.sin(t * 0.4 + i) * 3;
        return <path key={i} d={`M -400 ${y} Q 800 ${y - 4} 2000 ${y}`} stroke={c.highlight} strokeWidth={1} opacity={0.06 + i * 0.006} fill="none" />;
      })}
      {/* The moon's path on the water: short glinting strokes. */}
      {moon > 0.05 &&
        Array.from({ length: 22 }, (_, i) => {
          const y = SEA_Y + 8 + i * 14;
          const w = 12 + i * 3 + rand(i, 3) * 20;
          const dx = Math.sin(t * 0.9 + i * 1.3) * (6 + i);
          return <rect key={i} x={moonX - w / 2 + dx} y={y} width={w} height={2} fill={c.highlight} opacity={(0.4 - i * 0.012) * moon} />;
        })}
    </>
  );
}

// A sandy bank in the near foreground, lower left.
export function Shore({ dawn = 0 }: { dawn?: number }) {
  return (
    <Layer depth={0.85}>
      <path d="M -200 760 Q 200 720 520 790 Q 640 830 700 920 L -200 920 Z" fill={dawn > 0 ? mix('#3A3A40', '#9A8A78', dawn) : '#3A3A40'} />
      <path d="M -200 760 Q 200 720 520 790 Q 640 830 700 920" stroke={c.secondary} strokeWidth={2} opacity={0.35} fill="none" />
    </Layer>
  );
}

// The shore lamp: a diya on a flat stone at the water's edge, with its
// reflection on the water below. `tremble` shakes the reflection; `ring`
// (0 to 1) widens it into a calm ring of light.
export function ShoreLamp({ t, x = 800, y = 640, lit = 1, tremble = 0, ring = 0, pulse = 0, scale = 1 }: { t: number; x?: number; y?: number; lit?: number; tremble?: number; ring?: number; pulse?: number; scale?: number }) {
  return (
    <g>
      <WaterReflection x={x + 18 * scale} waterY={y + 14 * scale} t={t} colour={c.accent} length={220 * scale} tremble={tremble} ring={ring} opacity={lit} />
      <ellipse cx={x} cy={y + 12 * scale} rx={90 * scale} ry={18 * scale} fill="#1A2238" />
      <path d={`M ${x - 90 * scale} ${y + 12 * scale} Q ${x} ${y - 4 * scale} ${x + 90 * scale} ${y + 12 * scale}`} stroke={c.secondary} strokeWidth={1.5} opacity={0.3} fill="none" />
      <Glow x={x + 18 * scale} y={y - 20 * scale} r={150 * scale} colour={c.accent} opacity={0.3 * lit} />
      <Diya x={x} y={y} t={t} scale={scale} lit={lit} pulse={pulse} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Water reflection: the night's signature motif
// ---------------------------------------------------------------------------

// A light's reflection in still water: a column of short glowing strokes
// below `waterY`. `tremble` (0 to 1) shakes it, as when the joke stings;
// `ring` (0 to 1) spreads a calm ring of light across the water.
export function WaterReflection({ x, waterY, t, colour, length = 200, tremble = 0, ring = 0, opacity = 1 }: { x: number; waterY: number; t: number; colour: string; length?: number; tremble?: number; ring?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const n = 11;
  const r = 60 + ring * 420;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={waterY + length * 0.35} r={length * 0.7} colour={colour} opacity={0.12} />
      {Array.from({ length: n }, (_, i) => {
        const y = waterY + 6 + (i / n) * length;
        const w = (34 - i * 2.4) * (1 + ring * 0.6);
        // A slow, calm shimmer, plus a quick shake while it trembles.
        const dx = Math.sin(t * 0.8 + i) * 2.5 + Math.sin(t * 9 + i * 1.9) * tremble * 16;
        return <rect key={i} x={x - w / 2 + dx} y={y} width={w} height={3} rx={1.5} fill={colour} opacity={0.55 * (1 - i / n)} />;
      })}
      {ring > 0.01 && (
        <>
          <ellipse cx={x} cy={waterY + 30} rx={r} ry={r * 0.11} fill="none" stroke={colour} strokeWidth={2} opacity={0.45 * ring} />
          <ellipse cx={x} cy={waterY + 30} rx={r * 0.6} ry={r * 0.066} fill="none" stroke={colour} strokeWidth={1.5} opacity={0.3 * ring} />
          <ellipse cx={x} cy={waterY + 30} rx={r} ry={r * 0.11} fill={colour} opacity={0.06 * ring} />
        </>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The grove of tapas
// ---------------------------------------------------------------------------

// A Shiva linga: a simple, small gold outline stone on its base. Respectful
// and plain.
export function Linga({ x, y, scale = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; scale?: number; colour?: string; opacity?: number }) {
  const s = scale;
  return (
    <g opacity={opacity} fill="rgba(8,10,26,0.5)" stroke={colour} strokeWidth={2} strokeLinejoin="round">
      {/* The base (yoni-pitha), with its spout to the north. */}
      <path d={`M ${x - 50 * s} ${y} L ${x + 50 * s} ${y} L ${x + 44 * s} ${y - 16 * s} L ${x + 78 * s} ${y - 20 * s} L ${x + 78 * s} ${y - 28 * s} L ${x - 50 * s} ${y - 28 * s} Z`} />
      {/* The rounded stone. */}
      <path d={`M ${x - 22 * s} ${y - 28 * s} L ${x - 22 * s} ${y - 70 * s} Q ${x} ${y - 100 * s} ${x + 22 * s} ${y - 70 * s} L ${x + 22 * s} ${y - 28 * s} Z`} />
      {/* Three fine lines of sacred ash. */}
      <path d={`M ${x - 14 * s} ${y - 60 * s} L ${x + 14 * s} ${y - 60 * s} M ${x - 14 * s} ${y - 54 * s} L ${x + 14 * s} ${y - 54 * s} M ${x - 14 * s} ${y - 48 * s} L ${x + 14 * s} ${y - 48 * s}`} strokeWidth={1.2} />
    </g>
  );
}

// A simple tree: a trunk and a soft rounded crown.
export function Tree({ x, y, scale = 1, crown, trunk = '#2A2A20', t }: { x: number; y: number; scale?: number; crown: string; trunk?: string; t: number }) {
  const sway = Math.sin(t * 0.5 + x) * 3;
  return (
    <g>
      <path d={`M ${x - 8 * scale} ${y} L ${x - 4 * scale} ${y - 120 * scale} L ${x + 4 * scale} ${y - 120 * scale} L ${x + 8 * scale} ${y} Z`} fill={trunk} />
      <ellipse cx={x + sway} cy={y - 150 * scale} rx={70 * scale} ry={55 * scale} fill={crown} />
      <ellipse cx={x - 40 * scale + sway} cy={y - 120 * scale} rx={45 * scale} ry={35 * scale} fill={crown} />
      <ellipse cx={x + 42 * scale + sway} cy={y - 124 * scale} rx={46 * scale} ry={36 * scale} fill={crown} />
    </g>
  );
}

// Five small fires in a ring around a point (summer's tapas). `on` 0 to 1.
export function FiveFires({ x, y, t, on, pulse = 0 }: { x: number; y: number; t: number; on: number; pulse?: number }) {
  if (on <= 0.01) return null;
  const places = [-150, -80, 0, 80, 150].map((dx, i) => ({ dx, dy: i === 2 ? -20 : Math.abs(dx) > 100 ? 4 : 18 }));
  return (
    <g opacity={on}>
      {places.map((p, i) => (
        <g key={i}>
          <path d={`M ${x + p.dx - 18} ${y + p.dy + 4} L ${x + p.dx + 18} ${y + p.dy - 4} M ${x + p.dx - 18} ${y + p.dy - 4} L ${x + p.dx + 18} ${y + p.dy + 4}`} stroke="#3A2414" strokeWidth={6} strokeLinecap="round" />
          <Flame x={x + p.dx} y={y + p.dy} size={0.45} t={t + i * 1.3} height={on} outer="#E2702B" core="#F5A623" pulse={pulse} />
        </g>
      ))}
    </g>
  );
}

// Soft rain: thin slanting lines falling across the picture. `amount` 0 to 1.
export function Rain({ t, amount, colour = '#C9D3E6' }: { t: number; amount: number; colour?: string }) {
  if (amount <= 0.01) return null;
  return (
    <g opacity={amount}>
      {Array.from({ length: 70 }, (_, i) => {
        const x = rand(i, 21) * (W + 400) - 200;
        const y = ((rand(i, 22) * (H + 200) + t * 520) % (H + 200)) - 100;
        return <path key={i} d={`M ${x} ${y} l -10 34`} stroke={colour} strokeWidth={1.4} opacity={0.35} />;
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Mahagauri's symbols that the shared kit does not have
// ---------------------------------------------------------------------------

// A folded white cloth (her white clothing), as a small outline icon.
export function ClothIcon({ x, y, size = 1, colour = GOLD, opacity = 1 }: { x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="rgba(255,253,245,0.18)" stroke={colour} strokeWidth={2} strokeLinejoin="round" style={{ vectorEffect: 'non-scaling-stroke' }}>
      <path d="M -30 -8 L 30 -8 L 34 4 L -34 4 Z" />
      <path d="M -34 4 L 34 4 L 30 18 L -30 18 Z" />
      <path d="M -26 -8 Q -20 -22 0 -22 Q 20 -22 26 -8" fill="none" />
    </g>
  );
}

// A pearl light, the same size and shape as the Devi's warm flame
// (DivineLight), for Beat 7's "two equal lights".
export function PearlLight({ x, y, t, size = 1, pulse = 0 }: { x: number; y: number; t: number; size?: number; pulse?: number }) {
  const s = size * (1 + wobble(t, 0.8, x) * 0.04 + pulse * 0.05);
  return (
    <g>
      <Glow x={x} y={y - 40 * size} r={170 * s} colour="#F4F1EA" opacity={0.35} />
      <Flame x={x} y={y} size={1.4 * size} t={t} core="#FFFFFF" outer="#E8E2D2" pulse={pulse} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Hogwarts objects (abstract: objects and light only, no people)
// ---------------------------------------------------------------------------

// A plain oval locket on a fine chain, with no emblem. `gleam` 0 to 1.
export function Locket({ x, y, scale = 1, gleam = 0, rot = 0 }: { x: number; y: number; scale?: number; gleam?: number; rot?: number }) {
  const metal = mix('#6A5A38', '#E8C27A', gleam);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      {gleam > 0 && <Glow x={0} y={0} r={90} colour="#FFD9A0" opacity={0.35 * gleam} />}
      <path d="M 0 -30 Q -40 -70 -70 -40 M 0 -30 Q 40 -70 70 -40" stroke={metal} strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
      <circle cx={0} cy={-30} r={5} fill="none" stroke={metal} strokeWidth={2.5} />
      <ellipse cx={0} cy={0} rx={22} ry={27} fill={mix('#3A3020', '#B8954F', gleam)} stroke={metal} strokeWidth={3} />
      <ellipse cx={0} cy={0} rx={14} ry={18} fill="none" stroke={metal} strokeWidth={1.2} opacity={0.6} />
      {gleam > 0.3 && <path d="M -10 -12 Q -4 -18 4 -16" stroke="#FFF4D6" strokeWidth={2.5} strokeLinecap="round" opacity={gleam} fill="none" />}
    </g>
  );
}

// A plain sword made of light (no jewels, no crest).
export function SwordOfLight({ x, y, scale = 1, rot = 0, opacity = 1 }: { x: number; y: number; scale?: number; rot?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`} opacity={opacity}>
      <Glow x={0} y={-60} r={140} colour="#EEF3FF" opacity={0.35} />
      <path d="M 0 -170 L 8 -150 L 8 10 L -8 10 L -8 -150 Z" fill="#F7FAFF" opacity={0.9} />
      <path d="M -40 10 L 40 10" stroke="#F7FAFF" strokeWidth={6} strokeLinecap="round" />
      <path d="M 0 14 L 0 54" stroke="#DCE4EE" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
}

// A small tent in the snow, glowing faintly from inside. `glow` 0 to 1.
export function Tent({ x, y, scale = 1, glow = 0.5 }: { x: number; y: number; scale?: number; glow?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <Glow x={0} y={-50} r={200} colour="#E8B45A" opacity={0.35 * glow} />
      <path d="M -120 0 L 0 -130 L 120 0 Z" fill={mix('#2A3040', '#8A6A40', glow * 0.6)} />
      <path d="M -120 0 L 0 -130 L 120 0" stroke="#DCE4EE" strokeWidth={2} fill="none" opacity={0.5} />
      <path d="M 0 -130 L -26 0 L 26 0 Z" fill="#E8B45A" opacity={0.25 + 0.5 * glow} />
      <path d="M -150 0 L 150 0" stroke="#DCE4EE" strokeWidth={2} opacity={0.4} />
    </g>
  );
}

// A small person-light (Harry, Ron or Hermione are never drawn: each is just
// a small warm point of light).
export function SmallLight({ x, y, opacity = 1, colour = '#FFE3B0' }: { x: number; y: number; opacity?: number; colour?: string }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={46} colour={colour} opacity={0.6} />
      <circle cx={x} cy={y} r={5} fill="#FFF8E7" />
    </g>
  );
}

// The deer-like silver light: a soft, long glow that bobs as it walks, with
// a faint trail. No outline of an animal.
export function DeerLight({ x, y, t, opacity = 1 }: { x: number; y: number; t: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const bob = Math.abs(Math.sin(t * 2.2)) * 14;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y - bob} r={150} colour="#EEF3FF" opacity={0.45} />
      <ellipse cx={x} cy={y - bob} rx={46} ry={20} fill="#F7FAFF" opacity={0.75} />
      <ellipse cx={x + 34} cy={y - bob - 26} rx={12} ry={16} fill="#F7FAFF" opacity={0.6} />
      {[-30, -18, 18, 30].map((dx, i) => (
        <path key={dx} d={`M ${x + dx} ${y - bob + 12} l ${Math.sin(t * 4.4 + i * 1.6) * 6} ${34 + bob * 0.6}`} stroke="#F7FAFF" strokeWidth={3} strokeLinecap="round" opacity={0.25} />
      ))}
    </g>
  );
}

// A bare winter tree.
export function BareTree({ x, y, scale = 1, colour = '#4A5160' }: { x: number; y: number; scale?: number; colour?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={colour} strokeLinecap="round" fill="none">
      <path d="M 0 0 L 0 -320" strokeWidth={10} />
      <path d="M 0 -120 Q -40 -170 -90 -200 M 0 -170 Q 40 -220 100 -240 M 0 -230 Q -30 -270 -60 -300 M 0 -260 Q 20 -290 50 -320 M -50 -186 L -70 -230 M 60 -226 L 80 -270" strokeWidth={4} />
    </g>
  );
}

// ---------------------------------------------------------------------------

// Mix two #rrggbb colours.
export function mix(a: string, b: string, amount: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const m = Math.max(0, Math.min(1, amount));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * m).toString(16).padStart(2, '0')).join('')}`;
}
