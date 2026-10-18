// Drawing pieces made for Night 5 (docs/direction/night-5.md, "New drawing
// pieces"). They live here, inside Night 5's folder, so the shared kit stays
// untouched; later nights can move any of them into shared.tsx if they want.
//
//   Spark        the night's signature: one small bright point that is
//                passed from carer to carer
//   ChildLight   the radiant child, with six faces as six small points
//   StarCluster  the six linked stars of the Pleiades (the Krittikas)
//   River, Reeds a river of light and a reed bed that parts
//   MiniIcon     small gold outline icons the shared SymbolIcon lacks:
//                snake, elephant, dove, throat circle
//   DeviOnLotus  the Devi as warm light, seated on a lotus, with the child
//                on her lap

import { lerp, wobble } from '../../engine/anim';
import { DeviOutline, DivineLight, GOLD } from '../figures';
import { Glow, Lotus, rand } from '../shared';
import { day5Palettes } from './palettes';

export const p = day5Palettes;

// The same see-through fill and fine line as the shared outlines.
const FILL = 'rgba(8, 10, 26, 0.55)';
const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// The spark
// ---------------------------------------------------------------------------

// A point along a path of [x, y] points, `u` of the way along (0 to 1),
// moving at an even speed from point to point.
export function along(points: [number, number][], u: number): [number, number] {
  const k = Math.max(0, Math.min(0.9999, u)) * (points.length - 1);
  const i = Math.floor(k);
  const f = k - i;
  const a = points[i];
  const b = points[Math.min(points.length - 1, i + 1)];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
}

// The spark: a small white-gold point with a soft glow and, when it moves,
// a faint trail pointing back the way it came (from = where it was a moment ago).
export function Spark({ x, y, t, size = 1, from, colour = '#FFF1C9', opacity = 1 }: { x: number; y: number; t: number; size?: number; from?: [number, number]; colour?: string; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const twinkle = 1 + 0.15 * Math.sin(t * 7);
  return (
    <g opacity={opacity}>
      {from && <path d={`M ${from[0]} ${from[1]} L ${x} ${y}`} stroke={colour} strokeWidth={5 * size} strokeLinecap="round" opacity={0.35} />}
      <Glow x={x} y={y} r={46 * size * twinkle} colour={colour} opacity={0.75} />
      <circle cx={x} cy={y} r={5 * size} fill="#FFFFFF" />
    </g>
  );
}

// The child: a radiant small light. `faces` (0 to 1) opens six small points
// of light around it, his six faces, evenly spaced and turned outward.
export function ChildLight({ x, y, t, size = 1, faces = 0, opacity = 1 }: { x: number; y: number; t: number; size?: number; faces?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const breathe = 1 + wobble(t, 0.9, x) * 0.05;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={90 * size * breathe} colour="#FFE3A3" opacity={0.6} />
      <circle cx={x} cy={y} r={12 * size} fill="#FFF8E7" />
      {faces > 0 &&
        Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const r = 30 * size * faces;
          return <circle key={i} cx={x + Math.cos(a) * r} cy={y + Math.sin(a) * r} r={4.5 * size} fill="#FFF8E7" opacity={faces} />;
        })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Sky, river and reeds
// ---------------------------------------------------------------------------

// The six stars of the Pleiades, linked by fine lines. `link` (0 to 1) draws
// the lines; `bright` lifts the stars.
const pleiades: [number, number][] = [
  [-70, -10], [-30, -38], [10, -18], [52, -40], [70, 6], [18, 30],
];
export function StarCluster({ x, y, t, scale = 1, link = 1, bright = 1, colour = '#F2F5FF' }: { x: number; y: number; t: number; scale?: number; link?: number; bright?: number; colour?: string }) {
  const pts = pleiades.map(([dx, dy]) => [x + dx * scale, y + dy * scale] as [number, number]);
  const d = `M ${pts.map((q) => q.join(' ')).join(' L ')} Z`;
  return (
    <g>
      {link > 0 && <path d={d} pathLength={1} strokeDasharray={`${link} 1`} fill="none" stroke={colour} strokeWidth={1.2} opacity={0.4} />}
      {pts.map(([sx, sy], i) => (
        <g key={i}>
          <Glow x={sx} y={sy} r={18 * scale * bright} colour={colour} opacity={0.5} />
          <circle cx={sx} cy={sy} r={(2.4 + 0.6 * Math.sin(t * 1.5 + i)) * scale} fill={colour} opacity={Math.min(1, 0.6 + 0.4 * bright)} />
        </g>
      ))}
    </g>
  );
}

// The positions of the six stars, for lines drawn from them.
export const starPoints = (x: number, y: number, scale = 1) => pleiades.map(([dx, dy]) => [x + dx * scale, y + dy * scale] as [number, number]);

// A river of light: a band across the picture with slow shimmering lines.
export function River({ y, t, colour = p.n5emberRiver.primary, shine = '#BFE3E0', height = 90, opacity = 1 }: { y: number; t: number; colour?: string; shine?: string; height?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path d={`M -400 ${y - height / 2} Q 800 ${y - height / 2 - 20} 2000 ${y - height / 2} L 2000 ${y + height / 2} Q 800 ${y + height / 2 + 20} -400 ${y + height / 2} Z`} fill={colour} opacity={0.8} />
      {Array.from({ length: 9 }, (_, i) => {
        const yy = y - height / 2 + 10 + (i % 3) * (height / 3.2);
        const shift = ((t * 30 + i * 230) % 2400) - 400;
        return <path key={i} d={`M ${shift} ${yy} q 60 -6 120 0`} stroke={shine} strokeWidth={2} fill="none" opacity={0.35} />;
      })}
    </g>
  );
}

// A bed of tall reeds along the bank. `part` (0 to 1) bends the reeds near
// `cx` apart, as if opening on the child.
export function Reeds({ baseY, t, from = -200, to = 1800, part = 0, cx = 800, colour = p.n5emberRiver.secondary, count = 70, height = 220 }: { baseY: number; t: number; from?: number; to?: number; part?: number; cx?: number; colour?: string; count?: number; height?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const x = from + ((to - from) * (i + rand(i, 5) * 0.8)) / count;
        const h = height * (0.6 + 0.5 * rand(i, 6));
        const near = Math.max(0, 1 - Math.abs(x - cx) / 160);
        const sway = wobble(t, 0.7, i) * 10 + Math.sign(x - cx) * near * part * 90;
        return (
          <g key={i}>
            <path d={`M ${x} ${baseY} Q ${x + sway * 0.4} ${baseY - h * 0.6} ${x + sway} ${baseY - h}`} stroke={colour} strokeWidth={3} fill="none" opacity={0.9} />
            <ellipse cx={x + sway} cy={baseY - h - 8} rx={3.5} ry={12} fill={colour} transform={`rotate(${sway * 0.4} ${x + sway} ${baseY - h - 8})`} />
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Small icons the shared SymbolIcon doesn't have
// ---------------------------------------------------------------------------

export type MiniName = 'snake' | 'elephant' | 'dove' | 'throat';

const miniShapes: Record<MiniName, string> = {
  // A small coiled snake, its head raised.
  snake: 'M -26 10 Q -26 22 -10 22 Q 10 22 12 10 Q 14 -2 0 -2 Q -12 -2 -10 8 Q -8 14 0 12 M 12 10 Q 22 6 22 -10 Q 22 -20 30 -22 L 34 -18',
  // Indra's elephant in profile: body, head, trunk, ear, legs.
  elephant: 'M -30 16 Q -34 -14 -6 -16 Q 12 -18 18 -10 Q 30 -8 30 6 Q 30 18 36 24 M 18 -10 Q 8 -2 10 8 M -26 16 L -26 26 M -12 16 L -12 26 M 6 16 L 6 26 M -30 16 L 18 16',
  // A dove in flight (Agni's form).
  dove: 'M -30 4 Q -8 -2 6 4 Q 18 0 26 -6 Q 22 4 14 8 Q 4 16 -14 12 Z M -6 2 Q -2 -22 14 -28 Q 8 -10 6 4',
  // The throat (Vishuddha) chakra: a circle with sixteen petals, kept simple.
  throat: 'M 16 0 A 16 16 0 1 0 -16 0 A 16 16 0 1 0 16 0 Z M 0 -26 L 0 -18 M 0 18 L 0 26 M -26 0 L -18 0 M 18 0 L 26 0 M -18 -18 L -13 -13 M 13 13 L 18 18 M 18 -18 L 13 -13 M -13 13 L -18 18 M 7 -7 L -7 7 M -7 -7 L 7 7',
};

export function MiniIcon({ name, x, y, size = 1, colour = GOLD, opacity = 1, rot = 0 }: { name: MiniName; x: number; y: number; size?: number; colour?: string; opacity?: number; rot?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`} opacity={opacity}>
      <path d={miniShapes[name]} fill={name === 'snake' || name === 'throat' ? 'none' : FILL} {...line(colour)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The Devi on her lotus, with the child on her lap
// ---------------------------------------------------------------------------

// The Devi is light (a warm flame) with, at most, a very faint outline of
// head and shoulders. Below the flame a soft arc of gold is her lap; the
// child-light rests on it, facing outward. (x, y) is the base of the flame.
export function DeviOnLotus({ x, y, t, size = 1, pulse = 0, outline = 0.3, child = 1, childFaces = 1, seat = 1, strength = 1 }: { x: number; y: number; t: number; size?: number; pulse?: number; outline?: number; child?: number; childFaces?: number; seat?: number; strength?: number }) {
  return (
    <g>
      <Glow x={x} y={y + 20 * size} r={300 * size} colour={p.n5motherGold.primary} opacity={0.3 * strength} />
      {/* The lotus seat. */}
      {seat > 0 && (
        <g opacity={seat}>
          <Lotus x={x} y={y + 120 * size} scale={2.4 * size} colour={p.n5motherGold.secondary} centre={p.n5motherGold.accent} />
        </g>
      )}
      {/* Her lap: a soft arc of gold light. */}
      <path d={`M ${x - 90 * size} ${y + 50 * size} Q ${x} ${y + 92 * size} ${x + 90 * size} ${y + 50 * size}`} stroke="#FFE3A3" strokeWidth={6 * size} fill="none" opacity={0.45 * strength} strokeLinecap="round" />
      <DivineLight x={x} y={y} t={t} kind="warm" size={size} strength={strength} pulse={pulse} />
      <DeviOutline x={x} y={y - 70 * size} size={1.3 * size} opacity={outline} />
      <ChildLight x={x} y={y + 50 * size} t={t} size={0.8 * size} faces={childFaces} opacity={child} />
    </g>
  );
}
