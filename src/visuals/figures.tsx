// Figures for the illustrations, in the iconographic style agreed on
// 17 October 2026 (docs/direction/night-1.md, "Revision"):
//
// - People (Daksha, family, sages, crowds) are fine gold outlines, with no
//   faces: posture and gesture carry the feeling.
// - The Devi and the gods are formless. They appear only as light: Shiva a
//   cool silver light, Sati and Shailaputri a warm flame, Vishnu a soft blue
//   light. Never as drawn bodies.
// - Symbols (trident, lotus, crescent moon, the bull, the mountain) are small
//   gold outline icons.

import { useId } from 'react';
import { wobble } from '../engine/anim';
import { Flame, Glow } from './shared';

export const GOLD = '#E8B45A';
const FILL = 'rgba(8, 10, 26, 0.55)'; // a dark, see-through fill, so outlines read against any sky

// Stroke settings shared by every outline. "non-scaling-stroke" keeps lines
// the same fine width however large or small the figure is drawn.
const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// Outline people
// ---------------------------------------------------------------------------

export type Pose = 'stand' | 'sit' | 'kneel';
export type Arms = 'rest' | 'anjali' | 'raised' | 'welcome' | 'sweep' | 'heart' | 'bless';
export type Head = 'plain' | 'crown' | 'veiled' | 'topknot' | 'goat' | 'wild';

// Elbow and hand positions for each gesture, with the shoulders at y = -232
// for a standing figure. "Left" is the viewer's left.
const armPoints: Record<Arms, { l: number[]; r: number[] }> = {
  rest: { l: [-44, -172, -38, -120], r: [44, -172, 38, -120] },
  anjali: { l: [-42, -182, -4, -200], r: [42, -182, 4, -200] },
  raised: { l: [-44, -172, -38, -120], r: [66, -200, 70, -262] },
  welcome: { l: [-78, -212, -124, -222], r: [78, -212, 124, -222] },
  sweep: { l: [-44, -172, -38, -120], r: [78, -222, 128, -214] },
  heart: { l: [-44, -172, -38, -120], r: [34, -180, 8, -212] },
  bless: { l: [-44, -172, -38, -120], r: [70, -200, 80, -248] },
};

export interface OutlineProps {
  x: number;
  y: number; // the base: feet, seat or knees
  scale?: number;
  pose?: Pose;
  arms?: Arms;
  head?: Head;
  colour?: string;
  opacity?: number;
  lean?: number; // degrees, leaning towards something
  headTilt?: number; // degrees, bowing or turning away
}

export function Outline({ x, y, scale = 1, pose = 'stand', arms = 'rest', head = 'plain', colour = GOLD, opacity = 1, lean = 0, headTilt = 0 }: OutlineProps) {
  // Sitting and kneeling lower the upper body.
  const drop = pose === 'sit' ? 80 : pose === 'kneel' ? 60 : 0;
  const a = armPoints[arms];
  const arm = ([ex, ey, hx, hy]: number[], side: number) => (
    <path d={`M ${side * 28} -230 Q ${ex} ${ey} ${hx} ${hy}`} fill="none" {...line(colour)} />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <g transform={`rotate(${lean} 0 0)`}>
        {/* The lower body: a robe, or a seated or kneeling lap. */}
        {pose === 'stand' && <path d="M -30 -232 Q -40 -150 -56 0 L 56 0 Q 40 -150 30 -232 Z" fill={FILL} {...line(colour)} />}
        {pose === 'sit' && (
          <path d="M -100 0 Q -92 -48 -40 -62 Q -36 -110 -30 -152 L 30 -152 Q 36 -110 40 -62 Q 92 -48 100 0 Z" fill={FILL} {...line(colour)} />
        )}
        {pose === 'kneel' && (
          <path d="M -56 0 Q -66 -40 -34 -66 Q -40 -120 -30 -172 L 30 -172 Q 42 -120 40 -68 Q 76 -30 66 0 Z" fill={FILL} {...line(colour)} />
        )}
        <g transform={`translate(0 ${drop})`}>
          {/* A fold of cloth across the body, for a little life. */}
          <path d="M -26 -226 Q 0 -160 36 -116" fill="none" {...line(colour, 1.2)} opacity={0.7} />
          {arm(a.l, -1)}
          {arm(a.r, 1)}
          <g transform={`rotate(${headTilt} 0 -238)`}>
            <OutlineHead head={head} colour={colour} />
          </g>
        </g>
      </g>
    </g>
  );
}

function OutlineHead({ head, colour }: { head: Head; colour: string }) {
  const cy = -262;
  if (head === 'goat') {
    // Daksha restored with a goat's head, as in temple art: quiet and
    // dignified, the horns curving back, a garland hiding the join.
    return (
      <g fill={FILL}>
        <path d={`M -14 ${cy + 24} Q -22 ${cy - 4} -4 ${cy - 20} Q 14 ${cy - 24} 20 ${cy - 6} Q 34 ${cy + 8} 30 ${cy + 24} Q 18 ${cy + 32} 4 ${cy + 28} Z`} {...line(colour)} />
        <path d={`M -4 ${cy - 18} Q -36 ${cy - 40} -42 ${cy - 6}`} fill="none" {...line(colour)} />
        <path d={`M -10 ${cy - 4} Q -28 ${cy} -32 ${cy + 8}`} fill="none" {...line(colour, 1.4)} />
        <path d={`M -26 ${cy + 40} Q 0 ${cy + 56} 26 ${cy + 40}`} fill="none" {...line(colour, 1.4)} strokeDasharray="2 5" />
      </g>
    );
  }
  return (
    <g fill={FILL}>
      {head === 'veiled' && <path d={`M -26 ${cy + 46} Q -32 ${cy - 30} 0 ${cy - 30} Q 32 ${cy - 30} 26 ${cy + 46}`} fill="none" {...line(colour, 1.4)} />}
      <ellipse cx={0} cy={cy} rx={18} ry={22} {...line(colour)} />
      {head === 'crown' && <path d={`M -16 ${cy - 16} L -13 ${cy - 42} L -5 ${cy - 30} L 0 ${cy - 50} L 5 ${cy - 30} L 13 ${cy - 42} L 16 ${cy - 16}`} fill="none" {...line(colour)} />}
      {head === 'topknot' && <circle cx={0} cy={cy - 30} r={8} {...line(colour)} />}
      {head === 'wild' && (
        // Shiva's attendants: wild, flowing hair.
        <path d={`M -16 ${cy - 14} Q -40 ${cy - 30} -34 ${cy + 10} M 16 ${cy - 14} Q 40 ${cy - 30} 34 ${cy + 10} M 0 ${cy - 22} Q 6 ${cy - 46} -6 ${cy - 52}`} fill="none" {...line(colour, 1.4)} />
      )}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The divine, as light
// ---------------------------------------------------------------------------

export type LightKind = 'warm' | 'silver' | 'blue';

const lightColours: Record<LightKind, { glow: string; core: string; ring: string }> = {
  warm: { glow: '#F29F3D', core: '#FFF4D6', ring: '#F7B733' }, // Sati, Shailaputri: the signature flame
  silver: { glow: '#C9D3E6', core: '#FFFFFF', ring: '#DCE6FF' }, // Shiva
  blue: { glow: '#6F8FE8', core: '#E3EBFF', ring: '#93AEF5' }, // Vishnu: clearly bluer than Shiva's silver
};

interface LightProps {
  x: number;
  y: number;
  t: number;
  kind: LightKind;
  size?: number;
  strength?: number; // 0 (out) to about 2 (blazing); 1 is calm
  pulse?: number; // the music's level, for a gentle breath
}

// A presence of light. The warm kind is a flame; silver and blue are a soft
// orb with slowly widening rings, so Shiva and Vishnu never look like flames.
export function DivineLight({ x, y, t, kind, size = 1, strength = 1, pulse = 0 }: LightProps) {
  const id = useId();
  const c = lightColours[kind];
  if (strength <= 0.01) return null;
  const breathe = 1 + wobble(t, 0.8, x) * 0.04 + pulse * 0.05;
  const s = size * breathe;
  if (kind === 'warm') {
    return (
      <g>
        <Glow x={x} y={y - 40 * size} r={170 * s * Math.min(1.6, strength)} colour={c.glow} opacity={0.35 * Math.min(1, strength)} />
        <Flame x={x} y={y} size={1.4 * size} t={t} height={Math.min(2.2, strength)} core={c.core} outer={c.glow} pulse={pulse} />
      </g>
    );
  }
  const ring = (t * 0.25 + x * 0.001) % 1;
  return (
    <g opacity={Math.min(1, strength)}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={c.core} stopOpacity={1} />
          <stop offset="0.35" stopColor={c.ring} stopOpacity={0.6} />
          <stop offset="1" stopColor={c.glow} stopOpacity={0} />
        </radialGradient>
      </defs>
      <Glow x={x} y={y} r={190 * s * strength} colour={c.glow} opacity={0.3} />
      {/* A faint shaft of light above and below. */}
      <rect x={x - 3 * size} y={y - 220 * size} width={6 * size} height={440 * size} fill={c.ring} opacity={0.12 * strength} />
      <circle cx={x} cy={y} r={46 * s} fill={`url(#${id})`} />
      <circle cx={x} cy={y} r={(30 + ring * 90) * size} fill="none" stroke={c.ring} strokeWidth={1.5} opacity={0.5 * (1 - ring)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Symbol icons (gold outlines)
// ---------------------------------------------------------------------------

export type SymbolName = 'bull' | 'trident' | 'lotus' | 'moon' | 'mountain';

// One small icon, centred on (x, y), about 70 units across at size 1.
export function SymbolIcon({ name, x, y, size = 1, colour = GOLD, opacity = 1 }: { name: SymbolName; x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  const shapes: Record<SymbolName, string> = {
    // Nandi, seated, in profile: back, hump, head and horns, folded legs.
    bull: 'M -34 14 Q -38 -8 -18 -14 Q 0 -18 16 -14 L 22 -22 Q 30 -26 36 -18 Q 40 -8 32 -4 L 24 -6 Q 22 10 14 14 Z M 26 -22 Q 24 -32 30 -34 M 34 -20 Q 40 -28 36 -34 M -34 14 L 14 14',
    trident: 'M 0 32 L 0 -20 M -16 -30 Q -16 -12 0 -10 Q 16 -12 16 -30 M 0 -10 L 0 -36 M -19 -24 L -16 -32 L -13 -24 M 13 -24 L 16 -32 L 19 -24 M -4 -32 L 0 -40 L 4 -32',
    lotus: 'M 0 14 Q -8 -2 0 -22 Q 8 -2 0 14 Z M 0 14 Q -22 4 -24 -12 Q -10 -6 0 14 Z M 0 14 Q 22 4 24 -12 Q 10 -6 0 14 Z M -28 18 Q 0 26 28 18',
    moon: 'M 8 -26 A 26 26 0 1 0 8 26 A 20 20 0 1 1 8 -26 Z',
    mountain: 'M -34 22 L -10 -14 L 0 -4 L 12 -26 L 34 22 Z M 4 -14 L 12 -26 L 20 -14',
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d={shapes[name]} fill={FILL} {...line(colour)} />
    </g>
  );
}
