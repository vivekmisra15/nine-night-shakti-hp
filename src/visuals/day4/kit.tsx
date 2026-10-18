// Drawing pieces made for Night 4 (docs/direction/night-4.md, "New drawing
// pieces"). They live here, in Night 4's own folder; any could later move to
// the shared kit if other nights want them.
//
//   DarkSky     the primordial dark, warming towards gold
//   CosmicEgg   a glowing egg of light (the brahmanda, and the golden embryo)
//   SunDisc     a sun with a slow-turning corona, heat shimmer and a calm
//               warm point of light at its heart
//   EightRays   eight fine rays opening from a glow like a wheel, each tipped
//               with a small gold symbol: the Devi's arms, as light
//   AshGourd    an ash gourd in fine gold line (the offering in Beat 6)
//   WarmPoint   the night's signature: one small point of warm light

import { useId } from 'react';
import { lerp, wobble } from '../../engine/anim';
import { GOLD, SymbolIcon, type SymbolName } from '../figures';
import { Glow, rand, Ridge, Sky } from '../shared';
import { day4Palettes } from './palettes';

export const pd = day4Palettes.n4primordialDark;
export const sc = day4Palettes.n4sunCore;
export const ge = day4Palettes.n4goldenEgg;

// Mix two hex colours (#RRGGBB); amount 0 gives a, 1 gives b.
export function mixColour(a: string, b: string, amount: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const m = pa.map((v, i) => Math.round(lerp(v, pb[i], Math.min(1, Math.max(0, amount)))));
  return `#${m.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

// The night's signature: one small point of warm light, breathing gently.
export function WarmPoint({ x, y, t, size = 1, opacity = 1, pulse = 0 }: { x: number; y: number; t: number; size?: number; opacity?: number; pulse?: number }) {
  if (opacity <= 0.01) return null;
  const breathe = 1 + wobble(t, 0.7, x) * 0.08 + pulse * 0.1;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={110 * size * breathe} colour={pd.accent} opacity={0.45} />
      <Glow x={x} y={y} r={34 * size * breathe} colour={pd.highlight} opacity={0.9} />
      <circle cx={x} cy={y} r={5 * size} fill="#FFFBEF" />
    </g>
  );
}

// Stars that can fade in (the shared Sky draws them at full strength only).
// `reveal` (0 to 1) lets them appear one by one, as if born from the egg.
export function Stars({ t, count = 90, opacity = 1, reveal = 1, colour = pd.highlight }: { t: number; count?: number; opacity?: number; reveal?: number; colour?: string }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) =>
        rand(i, 9) > reveal ? null : (
          <circle
            key={i}
            cx={rand(i, 1) * 2000 - 200}
            cy={rand(i, 2) * 620 - 120}
            r={0.8 + rand(i, 3) * 1.8}
            fill={colour}
            opacity={0.35 + 0.35 * wobble(t, 0.8 + rand(i, 4), i)}
          />
        ),
      )}
    </g>
  );
}

// The primordial dark. `warmth` (0 to 1) warms the sky from blue-black
// towards a deep honey glow low down; `stars` fade in as the universe unfolds.
export function DarkSky({ t, warmth = 0, stars = 0, starCount = 90, grain = 0 }: { t: number; warmth?: number; stars?: number; starCount?: number; grain?: number }) {
  const hazeId = useId();
  const top = mixColour(pd.shadow, '#1A1430', warmth);
  const bottom = mixColour(pd.primary, '#5A3A1E', warmth);
  return (
    <>
      <Sky top={top} bottom={bottom} t={t} />
      {stars > 0 && <Stars t={t} count={starCount} opacity={stars} />}
      {/* The faintest grain of indigo haze: soft clouds, drifting very slowly. */}
      {grain > 0 && (
        <>
          <defs>
            <radialGradient id={hazeId}>
              <stop offset="0" stopColor={pd.secondary} stopOpacity={0.5} />
              <stop offset="1" stopColor={pd.secondary} stopOpacity={0} />
            </radialGradient>
          </defs>
          {Array.from({ length: 6 }, (_, i) => (
            <ellipse
              key={i}
              cx={100 + i * 290 + Math.sin(t / 14 + i) * 40}
              cy={220 + rand(i, 5) * 460}
              rx={520}
              ry={170}
              fill={`url(#${hazeId})`}
              opacity={grain * (0.5 + 0.3 * rand(i, 6))}
            />
          ))}
        </>
      )}
    </>
  );
}

// Light spreading outward in every direction from a point. `spread` (0 to 1)
// is how far the rays have reached.
export function RadialRays({ x, y, t, spread, count = 18, length = 1300, colour = pd.highlight, opacity = 0.18 }: { x: number; y: number; t: number; spread: number; count?: number; length?: number; colour?: string; opacity?: number }) {
  if (spread <= 0.01) return null;
  const reach = length * spread;
  return (
    <g style={{ mixBlendMode: 'screen' }}>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.sin(t / 7 + i) * 0.02;
        const w = 0.035 + 0.02 * rand(i, 7);
        const long = reach * (0.7 + 0.3 * rand(i, 8));
        return (
          <path
            key={i}
            d={`M ${x} ${y} L ${x + Math.cos(a - w) * long} ${y + Math.sin(a - w) * long} L ${x + Math.cos(a + w) * long} ${y + Math.sin(a + w) * long} Z`}
            fill={colour}
            opacity={opacity * (0.6 + 0.4 * wobble(t, 0.4, i))}
          />
        );
      })}
    </g>
  );
}

// A glowing egg of light with a soft inner gradient and a faint rim.
// `bright` (0 to 1) is how strongly it shines; `open` (0 to 1) lets the
// light spill out of it, as the universe unfolds.
export function CosmicEgg({ x, y, size = 1, bright = 1, open = 0, t, gold = '#E9B949' }: { x: number; y: number; size?: number; bright?: number; open?: number; t: number; gold?: string }) {
  const id = useId();
  if (bright <= 0.01) return null;
  const breathe = 1 + wobble(t, 0.5, y) * 0.015;
  const rx = 70 * size * breathe;
  const ry = 92 * size * breathe;
  return (
    <g opacity={Math.min(1, bright)}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#FFFBEF" stopOpacity={1} />
          <stop offset="0.45" stopColor="#FFE9B8" stopOpacity={0.95} />
          <stop offset="1" stopColor={gold} stopOpacity={0.75} />
        </radialGradient>
      </defs>
      <Glow x={x} y={y} r={ry * (2.6 + open * 2)} colour={gold} opacity={0.35 + open * 0.2} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id})`} opacity={1 - open * 0.5} />
      {/* The faint rim. */}
      <ellipse cx={x} cy={y} rx={rx + 6} ry={ry + 6} fill="none" stroke="#FFF4D6" strokeWidth={1.5} opacity={0.5 * (1 - open)} />
      {/* As it opens, a thin seam of white light across the middle. */}
      {open > 0 && <path d={`M ${x - rx} ${y} Q ${x} ${y - 10} ${x + rx} ${y}`} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={open * 0.8} />}
    </g>
  );
}

// A sun with a slow-turning corona and a calm warm point of light at its
// centre. `corona` 0 to 1 grows the corona; `shimmer` 0 to 1 adds heat haze.
export function SunDisc({ x, y, r, t, corona = 1, shimmer = 0, point = 1, pulse = 0 }: { x: number; y: number; r: number; t: number; corona?: number; shimmer?: number; point?: number; pulse?: number }) {
  const id = useId();
  const turn = t * 1.5; // degrees: a very slow turn
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={sc.highlight} />
          <stop offset="0.55" stopColor={sc.accent} />
          <stop offset="0.85" stopColor={sc.secondary} />
          <stop offset="1" stopColor={sc.primary} />
        </radialGradient>
      </defs>
      <Glow x={x} y={y} r={r * (3.2 + corona)} colour={sc.primary} opacity={0.35 + pulse * 0.05} />
      {/* The corona: thin rays of light around the disc, turning slowly. */}
      <g transform={`translate(${x} ${y}) rotate(${turn})`} opacity={0.32 * corona}>
        {Array.from({ length: 36 }, (_, i) => {
          const long = r * (1.25 + (i % 2 ? 0.25 : 0.55) * corona + 0.06 * wobble(t, 0.6, i));
          return (
            <path
              key={i}
              transform={`rotate(${i * 10})`}
              d={`M ${-r * 0.035} ${-r * 0.98} L 0 ${-long} L ${r * 0.035} ${-r * 0.98} Z`}
              fill={sc.secondary}
            />
          );
        })}
      </g>
      {/* Heat shimmer: faint wavering rings. */}
      {shimmer > 0 &&
        [1.35, 1.7, 2.1].map((k, i) => (
          <ellipse
            key={k}
            cx={x}
            cy={y}
            rx={r * k + wobble(t, 1.4, i) * 6}
            ry={r * k + wobble(t, 1.1, i + 4) * 6}
            fill="none"
            stroke={sc.accent}
            strokeWidth={2}
            opacity={shimmer * 0.25 * (1 - i * 0.25)}
          />
        ))}
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
      {/* The warm point at the heart of the sun: calm, whatever the heat. */}
      <WarmPoint x={x} y={y} t={t} size={0.9} opacity={point} pulse={pulse} />
    </g>
  );
}

// The eight icons of Kushmanda's hands, in order round the wheel.
export const armIcons: SymbolName[] = ['waterPot', 'bow', 'arrow', 'lotus', 'kalasha', 'discus', 'mace', 'rosary'];

// Where the tip of ray i is, `len` from the centre. The rays start a little
// off vertical, so none points straight down at the lion.
export function rayTip(i: number, x: number, y: number, len: number) {
  const a = ((-67.5 + i * 45) * Math.PI) / 180;
  return { x: x + Math.cos(a) * len, y: y + Math.sin(a) * len };
}

// Eight fine rays opening from a glow like a wheel, each tipped with a small
// gold symbol icon: her arms, as light, never as a body.
export function EightRays({ x, y, len, open, t, inner = 0, iconSize = 1.1, iconColour = GOLD, rayColour = '#FFF4D6' }: { x: number; y: number; len: number; open: number; t: number; inner?: number; iconSize?: number; iconColour?: string; rayColour?: string }) {
  if (open <= 0.01) return null;
  return (
    <g>
      {armIcons.map((name, i) => {
        // Each ray opens a little after the one before it.
        const o = Math.min(1, Math.max(0, open * 1.6 - i * 0.075));
        if (o <= 0) return null;
        // Each ray starts at `inner` (e.g. the sun's rim) and grows outward.
        const base = rayTip(i, x, y, inner);
        const tip = rayTip(i, x, y, inner + (len - inner) * o);
        return (
          <g key={name}>
            <line x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke={rayColour} strokeWidth={10} opacity={0.12 * o} strokeLinecap="round" />
            <line x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke={rayColour} strokeWidth={2.5} opacity={(0.6 + 0.2 * wobble(t, 0.8, i)) * o} strokeLinecap="round" />
            <Glow x={tip.x} y={tip.y} r={60} colour={sc.primary} opacity={0.35 * o} />
            <SymbolIcon name={name} x={tip.x} y={tip.y} size={iconSize} colour={iconColour} opacity={o} />
          </g>
        );
      })}
    </g>
  );
}

// An ash gourd lying on its side, in fine gold line with a faint grey-green
// fill, its ribs drawn lightly. `glow` 0 to 1 lights it softly from within.
export function AshGourd({ x, y, scale = 1, glow = 0 }: { x: number; y: number; scale?: number; glow?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {glow > 0 && <Glow x={0} y={-40} r={180} colour={ge.accent} opacity={0.45 * glow} />}
      <path d="M -110 -40 Q -112 -92 -40 -96 L 50 -96 Q 116 -92 114 -40 Q 112 6 50 10 L -40 10 Q -108 8 -110 -40 Z" fill={ge.primary} fillOpacity={0.28 + 0.15 * glow} stroke={GOLD} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      {/* The ribs, running along its length. */}
      {[-62, -40, -18].map((yy, i) => (
        <path key={i} d={`M -96 ${yy} Q 0 ${yy - 14 + i * 7} 98 ${yy}`} fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.5} vectorEffect="non-scaling-stroke" />
      ))}
      {/* The short stem. */}
      <path d="M 112 -48 Q 128 -54 132 -68" fill="none" stroke={GOLD} strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* A dusting of pale bloom on the skin. */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={-80 + rand(i, 2) * 170} cy={-82 + rand(i, 3) * 80} r={1.6} fill={ge.highlight} opacity={0.35 + 0.3 * glow} />
      ))}
    </g>
  );
}

// A low ridge line under a dark sky, used for the land the light reaches.
export function LowRidges({ fill = '#0E1022', far = '#171A33', y = 0 }: { fill?: string; far?: string; y?: number }) {
  return (
    <>
      <Ridge seed={21} baseY={760 + y} height={110} fill={far} />
      <Ridge seed={25} baseY={860 + y} height={80} fill={fill} />
    </>
  );
}
