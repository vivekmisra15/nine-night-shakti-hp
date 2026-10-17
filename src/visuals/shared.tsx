// The shared drawing kit for every night's illustrations. Everything is a
// plain SVG drawing that depends only on the time value t, so pausing,
// replaying and slow motion all just work.
//
// The picture is 1600 × 900. Scenes are built from layers at different
// depths: when the camera moves, near layers move more than far ones
// (parallax), which gives the 2.5D feel the direction asks for.

import { createContext, useContext, useId, type ReactNode } from 'react';
import type { CameraMove } from '../content/types';
import { clamp, easeInOut, lerp, progress, wobble } from '../engine/anim';

export const W = 1600;
export const H = 900;

// A repeatable "random" number from 0 to 1, so particles stay in the same
// place from frame to frame.
export const rand = (i: number, salt = 0) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Fade something in from `start` over `length` seconds (0 to 1).
export const fadeIn = (t: number, start: number, length = 1.5) => easeInOut(progress(t, start, start + length));
// Fade something out from `start` over `length` seconds (1 to 0).
export const fadeOut = (t: number, start: number, length = 1.5) => 1 - fadeIn(t, start, length);
// Visible between two times, fading at both ends.
export const window2 = (t: number, start: number, end: number, fade = 1.2) =>
  Math.min(fadeIn(t, start, fade), fadeOut(t, end - fade, fade));

// ---------------------------------------------------------------------------
// Camera and layers
// ---------------------------------------------------------------------------

export interface Cam {
  x: number;
  y: number;
  zoom: number;
  rot: number;
}

const CameraContext = createContext<Cam>({ x: 0, y: 0, zoom: 1, rot: 0 });

// Where the camera is for a move, `p` of the way through it (0 to 1).
export function cameraFor(move: CameraMove, p: number, t: number): Cam {
  const e = easeInOut(clamp(p));
  switch (move) {
    case 'pushIn':
      return { x: 0, y: 0, zoom: 1 + 0.14 * e, rot: 0 };
    case 'pullBack':
      return { x: 0, y: 0, zoom: 1.14 - 0.14 * e, rot: 0 };
    case 'aerial':
      return { x: 0, y: lerp(-90, 40, e), zoom: 1.06, rot: 0 };
    case 'crane':
      return { x: 0, y: lerp(60, -40, e), zoom: 1.06, rot: 0 };
    case 'lowAngle':
      return { x: 0, y: lerp(30, -30, e), zoom: 1.08, rot: 0 };
    case 'orbit':
      return { x: lerp(-40, 40, e), y: 0, zoom: 1.08, rot: lerp(-1.2, 1.2, e) };
    case 'pan':
      return { x: lerp(50, -50, e), y: 0, zoom: 1.06, rot: 0 };
    case 'drift':
      return { x: Math.sin(t / 9) * 18, y: Math.sin(t / 13) * 6, zoom: 1.04, rot: 0 };
    case 'still':
      return { x: 0, y: 0, zoom: 1.02, rot: 0 };
  }
}

// Combine two camera positions (for scenes that change shot part-way).
export const mixCam = (a: Cam, b: Cam, amount: number): Cam => ({
  x: lerp(a.x, b.x, amount),
  y: lerp(a.y, b.y, amount),
  zoom: lerp(a.zoom, b.zoom, amount),
  rot: lerp(a.rot, b.rot, amount),
});

// A layer at a depth: 0 = the far sky (barely moves), 1 = the foreground.
export function Layer({ depth, children, opacity = 1 }: { depth: number; children: ReactNode; opacity?: number }) {
  const cam = useContext(CameraContext);
  const zoom = 1 + (cam.zoom - 1) * (0.3 + depth);
  const transform = `translate(${W / 2 + cam.x * depth} ${H / 2 + cam.y * depth}) rotate(${cam.rot * depth}) scale(${zoom}) translate(${-W / 2} ${-H / 2})`;
  return (
    <g transform={transform} opacity={opacity}>
      {children}
    </g>
  );
}

// The frame every illustration draws into.
export function Stage({
  cam,
  frozen,
  label,
  children,
}: {
  cam: Cam;
  frozen: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg className="visual" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <CameraContext.Provider value={cam}>{children}</CameraContext.Provider>
      {/* A freeze-frame dims the picture a little (20%). */}
      {frozen && <rect width={W} height={H} fill="#000" opacity={0.2} />}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Sky, land and atmosphere
// ---------------------------------------------------------------------------

export function Sky({ top, bottom, t, stars = 0, starColour = '#fff' }: { top: string; bottom: string; t: number; stars?: number; starColour?: string }) {
  const id = useId();
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={`url(#${id})`} />
      {Array.from({ length: stars }, (_, i) => (
        <circle
          key={i}
          cx={rand(i, 1) * (W + 400) - 200}
          cy={rand(i, 2) * 520 - 120}
          r={0.8 + rand(i, 3) * 1.8}
          fill={starColour}
          opacity={0.35 + 0.35 * wobble(t, 0.8 + rand(i, 4), i)}
        />
      ))}
    </>
  );
}

// A mountain ridge: a jagged line across the picture, filled below.
// `seed` changes the shape; `peak` lifts one summit (x position, height).
export function ridgePath(seed: number, baseY: number, height: number, peak?: { x: number; h: number }) {
  const points: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const x = -400 + i * 100;
    let y = baseY - height * (0.3 + 0.7 * rand(i, seed));
    if (peak) y -= peak.h * Math.max(0, 1 - Math.abs(x - peak.x) / 380);
    points.push(`${x} ${y}`);
  }
  return `M -400 ${H + 400} L ${points.join(' L ')} L 2000 ${H + 400} Z`;
}

export function Ridge({ seed, baseY, height, fill, peak, snow }: { seed: number; baseY: number; height: number; fill: string; peak?: { x: number; h: number }; snow?: string }) {
  return (
    <>
      <path d={ridgePath(seed, baseY, height, peak)} fill={fill} />
      {snow && peak && (
        // A snow cap on the high peak.
        <path
          d={`M ${peak.x - 90} ${baseY - height * 0.65 - peak.h * 0.76} L ${peak.x} ${baseY - height * 0.75 - peak.h} L ${peak.x + 95} ${baseY - height * 0.65 - peak.h * 0.75} L ${peak.x + 40} ${baseY - height * 0.7 - peak.h * 0.8} L ${peak.x - 20} ${baseY - height * 0.66 - peak.h * 0.74} Z`}
          fill={snow}
          opacity={0.9}
        />
      )}
    </>
  );
}

// Soft mist lying across the picture at height y.
export function Haze({ y, colour, opacity = 0.35, t = 0 }: { y: number; colour: string; opacity?: number; t?: number }) {
  const id = useId();
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colour} stopOpacity={0} />
          <stop offset="0.5" stopColor={colour} stopOpacity={opacity} />
          <stop offset="1" stopColor={colour} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={-400 + Math.sin(t / 10) * 40} y={y - 120} width={W + 800} height={240} fill={`url(#${id})`} />
    </>
  );
}

// A soft round glow (a light source, or the light around a flame).
export function Glow({ x, y, r, colour, opacity = 0.5 }: { x: number; y: number; r: number; colour: string; opacity?: number }) {
  const id = useId();
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={colour} stopOpacity={opacity} />
          <stop offset="1" stopColor={colour} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </>
  );
}

// Rays of golden light fanning down from a point (divine light, dawn).
export function LightRays({ x, y, t, colour, opacity = 0.25, count = 9, length = 1100 }: { x: number; y: number; t: number; colour: string; opacity?: number; count?: number; length?: number }) {
  return (
    <g style={{ mixBlendMode: 'screen' }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = 30 + (i / (count - 1)) * 120 + Math.sin(t / 5 + i) * 2;
        const rad = (angle * Math.PI) / 180;
        const spread = 0.05;
        const x1 = x + Math.cos(rad - spread) * length;
        const y1 = y + Math.sin(rad - spread) * length;
        const x2 = x + Math.cos(rad + spread) * length;
        const y2 = y + Math.sin(rad + spread) * length;
        return (
          <path
            key={i}
            d={`M ${x} ${y} L ${x1} ${y1} L ${x2} ${y2} Z`}
            fill={colour}
            opacity={opacity * (0.5 + 0.5 * wobble(t, 0.4, i))}
          />
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Flames, lamps and candles
// ---------------------------------------------------------------------------

// A flame. `height` 0 to 1 lets a flame grow or go out; `pulse` (0 to 1)
// is the music's level, so flames breathe gently with the score.
export function Flame({ x, y, size = 1, t, height = 1, core = '#FFF4D6', outer = '#F29F3D', pulse = 0 }: { x: number; y: number; size?: number; t: number; height?: number; core?: string; outer?: string; pulse?: number }) {
  if (height <= 0.01) return null;
  const sway = wobble(t, 5, x) * 6 * size;
  const tall = (60 + wobble(t, 7, y) * 6 + pulse * 6) * size * height;
  const wide = 15 * size * (0.6 + 0.4 * height);
  return (
    <g>
      <Glow x={x} y={y - tall * 0.4} r={tall * 1.6} colour={outer} opacity={0.35 * height} />
      <path
        d={`M ${x} ${y} Q ${x - wide * 1.6} ${y - tall * 0.45} ${x + sway} ${y - tall} Q ${x + wide * 1.6} ${y - tall * 0.45} ${x} ${y} Z`}
        fill={outer}
        opacity={0.9}
      />
      <path
        d={`M ${x} ${y - 2} Q ${x - wide * 0.8} ${y - tall * 0.35} ${x + sway * 0.6} ${y - tall * 0.7} Q ${x + wide * 0.8} ${y - tall * 0.35} ${x} ${y - 2} Z`}
        fill={core}
      />
    </g>
  );
}

// A clay diya with its flame. `lit` 0 to 1.
export function Diya({ x, y, t, scale = 1, lit = 1, pulse = 0, clay = '#8A5A2B', core, outer }: { x: number; y: number; t: number; scale?: number; lit?: number; pulse?: number; clay?: string; core?: string; outer?: string }) {
  return (
    <g>
      <Flame x={x + 18 * scale} y={y - 8 * scale} size={scale * 0.8} t={t} height={lit} pulse={pulse} core={core} outer={outer} />
      <path
        d={`M ${x - 46 * scale} ${y - 10 * scale} Q ${x} ${y + 34 * scale} ${x + 46 * scale} ${y - 10 * scale} L ${x + 32 * scale} ${y - 12 * scale} Q ${x} ${y - 4 * scale} ${x - 32 * scale} ${y - 12 * scale} Z`}
        fill={clay}
      />
      <path
        d={`M ${x - 40 * scale} ${y - 8 * scale} Q ${x} ${y + 24 * scale} ${x + 40 * scale} ${y - 8 * scale}`}
        stroke="#C98A4B"
        strokeWidth={2 * scale}
        fill="none"
        opacity={0.6}
      />
    </g>
  );
}

// A candle for the Hogwarts scenes (abstract: a candle is just a candle).
export function Candle({ x, y, t, scale = 1, lean = 0, lit = 1, wax = '#EFE6D2', outer = '#E8B45A' }: { x: number; y: number; t: number; scale?: number; lean?: number; lit?: number; wax?: string; outer?: string }) {
  return (
    <g>
      <rect x={x - 9 * scale} y={y} width={18 * scale} height={80 * scale} rx={3 * scale} fill={wax} opacity={0.9} />
      <g transform={`rotate(${lean} ${x} ${y})`}>
        <Flame x={x} y={y} size={scale * 0.55} t={t} height={lit} outer={outer} core="#FFF0C8" />
      </g>
    </g>
  );
}

// A thin thread of smoke rising from a point, fading over `life` seconds.
export function Smoke({ x, y, t, start, life = 6, colour = '#C9D3E6', opacity = 0.4 }: { x: number; y: number; t: number; start: number; life?: number; colour?: string; opacity?: number }) {
  const age = t - start;
  if (age < 0 || age > life) return null;
  const rise = (age / life) * 300;
  const fade = opacity * (1 - age / life);
  const d = `M ${x} ${y} C ${x + Math.sin(age) * 20} ${y - rise * 0.3}, ${x - 30 + Math.sin(age * 1.3) * 25} ${y - rise * 0.6}, ${x + Math.sin(age * 0.7) * 30} ${y - rise}`;
  return <path d={d} stroke={colour} strokeWidth={4} fill="none" strokeLinecap="round" opacity={fade} />;
}

// ---------------------------------------------------------------------------
// Particles: embers, snow, petals, golden dust, fireflies
// ---------------------------------------------------------------------------

type ParticleKind = 'embers' | 'snow' | 'petals' | 'dust' | 'fireflies';

export function Particles({ kind, t, count = 30, colour, opacity = 0.7, area = { x: 0, y: 0, w: W, h: H }, seed = 0, speed = 1 }: { kind: ParticleKind; t: number; count?: number; colour: string; opacity?: number; area?: { x: number; y: number; w: number; h: number }; seed?: number; speed?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const r1 = rand(i, seed + 11);
        const r2 = rand(i, seed + 12);
        const r3 = rand(i, seed + 13);
        // Rising (embers, dust) or falling (snow, petals), wrapping round.
        const rising = kind === 'embers' || kind === 'dust';
        const v = (kind === 'embers' ? 60 : kind === 'dust' ? 18 : kind === 'snow' ? 40 : kind === 'petals' ? 55 : 8) * (0.6 + r3) * speed;
        const travel = (r2 * area.h + t * v) % area.h;
        const y = rising ? area.y + area.h - travel : area.y + travel;
        const x = area.x + r1 * area.w + Math.sin(t * (0.5 + r3) + i) * (kind === 'petals' ? 40 : 15);
        const twinkle = kind === 'fireflies' ? 0.5 + 0.5 * Math.sin(t * 2 + i * 3) : 1;
        if (kind === 'petals') {
          const spin = t * 60 * (r3 - 0.5) + i * 40;
          return (
            <ellipse key={i} cx={x} cy={y} rx={9} ry={5} fill={colour} opacity={opacity} transform={`rotate(${spin} ${x} ${y})`} />
          );
        }
        const size = kind === 'snow' ? 2 + r3 * 3 : kind === 'embers' ? 1.5 + r3 * 2.5 : 1.2 + r3 * 2;
        return <circle key={i} cx={x} cy={y} r={size} fill={colour} opacity={opacity * twinkle * (0.5 + 0.5 * r1)} />;
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Motion design: mandalas and light trails
// ---------------------------------------------------------------------------

// A turning mandala of petals. `turns` is how far it has rotated (0 to 1 = one turn).
export function Mandala({ x, y, r, turns, colour, opacity = 0.1, petals = 9 }: { x: number; y: number; r: number; turns: number; colour: string; opacity?: number; petals?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turns * 360})`} opacity={opacity} fill="none" stroke={colour} strokeWidth={2}>
      <circle r={r} />
      <circle r={r * 0.62} />
      <circle r={r * 0.25} />
      {Array.from({ length: petals }, (_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / petals})`}>
          <path d={`M 0 ${-r * 0.25} Q ${r * 0.22} ${-r * 0.6} 0 ${-r * 0.98} Q ${-r * 0.22} ${-r * 0.6} 0 ${-r * 0.25} Z`} />
          <path d={`M 0 ${-r * 0.62} Q ${r * 0.1} ${-r * 0.75} 0 ${-r * 0.85}`} />
        </g>
      ))}
    </g>
  );
}

// A shimmering trail of light along a curve, drawn `amount` of the way (0 to 1).
export function LightTrail({ d, amount, colour, width = 6, t, opacity = 0.7 }: { d: string; amount: number; colour: string; width?: number; t: number; opacity?: number }) {
  if (amount <= 0) return null;
  return (
    <g opacity={opacity}>
      <path d={d} pathLength={1} stroke={colour} strokeWidth={width * 3} strokeLinecap="round" fill="none" opacity={0.25} strokeDasharray={`${amount} 1`} />
      <path
        d={d}
        pathLength={1}
        stroke={colour}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${amount} 1`}
        opacity={0.75 + 0.25 * Math.sin(t * 6)}
      />
    </g>
  );
}

// A lotus of light (used for the Shakti Peethas and the rebirth).
export function LightLotus({ x, y, size, open, colour, opacity = 1 }: { x: number; y: number; size: number; open: number; colour: string; opacity?: number }) {
  if (open <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${size * open})`} opacity={opacity}>
      <Glow x={0} y={-10} r={60} colour={colour} opacity={0.6} />
      {[-60, -30, 0, 30, 60].map((angle) => (
        <path key={angle} d="M 0 0 Q -14 -24 0 -46 Q 14 -24 0 0 Z" fill={colour} opacity={0.85} transform={`rotate(${angle * open})`} />
      ))}
    </g>
  );
}

// A lotus flower (on the pond in Beat 8).
export function Lotus({ x, y, scale = 1, colour = '#F2B5A7', centre = '#F7B733' }: { x: number; y: number; scale?: number; colour?: string; centre?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[-50, -25, 0, 25, 50].map((a) => (
        <path key={a} d="M 0 0 Q -10 -18 0 -36 Q 10 -18 0 0 Z" fill={colour} transform={`rotate(${a})`} />
      ))}
      <circle cx={0} cy={-6} r={5} fill={centre} />
    </g>
  );
}
