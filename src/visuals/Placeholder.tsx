// A stand-in illustration for any beat, until the real Night 1 artwork is
// built (step 5). It already follows the beat's direction values: palette,
// camera move and intensity. Everything is drawn from the time value t.

import type { CameraMove } from '../content/types';
import { easeInOut, progress, wobble } from '../engine/anim';
import { palettes, type Palette } from './palettes';
import type { VisualProps } from './types';

// The slow camera move, as an SVG transform. `p` runs from 0 to 1.
function cameraTransform(camera: CameraMove, p: number, t: number) {
  const e = easeInOut(p);
  switch (camera) {
    case 'pushIn':
      return `translate(800 450) scale(${1 + 0.12 * e}) translate(-800 -450)`;
    case 'pullBack':
      return `translate(800 450) scale(${1.12 - 0.12 * e}) translate(-800 -450)`;
    case 'aerial':
    case 'crane':
      return `translate(0 ${60 - 120 * e}) scale(1.08)`;
    case 'lowAngle':
      return `translate(0 ${-40 * e}) scale(1.1)`;
    case 'orbit':
      return `rotate(${-2 + 4 * e} 800 450) scale(1.1)`;
    case 'pan':
      return `translate(${40 - 80 * e} 0) scale(1.08)`;
    case 'drift':
      return `translate(${Math.sin(t / 8) * 15} 0) scale(1.04)`;
    case 'still':
      return '';
  }
}

// A small diya with a flickering flame.
function Diya({ x, y, t, colours, scale = 1 }: { x: number; y: number; t: number; colours: Palette; scale?: number }) {
  const flicker = 1 + wobble(t, 6, x) * 0.08;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={70 * flicker} fill={colours.accent} opacity={0.18} />
      <path d="M -40 0 Q 0 30 40 0 L 30 -8 L -30 -8 Z" fill={colours.accent} opacity={0.9} />
      <path
        d={`M 0 -10 Q ${-12 * flicker} -30 0 ${-60 * flicker} Q ${12 * flicker} -30 0 -10 Z`}
        fill={colours.highlight}
      />
    </g>
  );
}

function Scene({ colours, t, hogwarts }: { colours: Palette; t: number; hogwarts: boolean }) {
  // Fixed star positions, so they don't jump between frames.
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 397) % 1600,
    y: (i * 211) % 420,
    r: 1 + (i % 3),
  }));

  return (
    <>
      <rect x={-200} y={-200} width={2000} height={1300} fill={colours.shadow} />
      <rect x={-200} y={-200} width={2000} height={900} fill="url(#sky)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={colours.highlight} opacity={0.4 + wobble(t, 1.5, i) * 0.3} />
      ))}
      {hogwarts ? (
        // Hogwarts placeholder: a row of floating candles, abstract only.
        Array.from({ length: 7 }, (_, i) => (
          <g key={i} transform={`translate(0 ${Math.sin(t * 2 + i) * 6})`}>
            <rect x={240 + i * 190} y={420} width={16} height={60} fill={colours.highlight} opacity={0.8} />
            <Diya x={248 + i * 190} y={420} t={t + i} colours={colours} scale={0.35} />
          </g>
        ))
      ) : (
        // Traditional placeholder: the mountain ridge and the single diya.
        <>
          <path
            d="M -200 700 L 200 480 L 420 560 L 760 260 L 1040 520 L 1260 420 L 1800 700 L 1800 1100 L -200 1100 Z"
            fill={colours.secondary}
          />
          <path d="M 680 330 L 760 260 L 840 330 L 800 320 L 760 345 L 720 320 Z" fill={colours.primary} opacity={0.85} />
          <Diya x={800} y={780} t={t} colours={colours} />
        </>
      )}
    </>
  );
}

export function Placeholder({ beat, t, duration, frozen }: VisualProps) {
  const { direction } = beat;
  // For looping beats, the camera move repeats every 40 seconds.
  const p = Number.isFinite(duration) ? progress(t, 0, duration) : (t % 40) / 40;
  const split = direction.palette === 'split';
  const colours = (direction.palette === 'split' ? undefined : palettes[direction.palette]) ?? palettes.kailasa;
  const hogwarts = direction.music.palette === 'hogwarts';

  return (
    <svg className="visual" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={beat.title}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colours.shadow} />
          <stop offset="1" stopColor={colours.secondary} />
        </linearGradient>
        <clipPath id="right-half">
          <rect x={808} y={0} width={800} height={900} />
        </clipPath>
      </defs>
      <g transform={cameraTransform(direction.camera, p, t)}>
        <Scene colours={colours} t={t} hogwarts={hogwarts} />
      </g>
      {split && (
        // Beat 14: the two worlds side by side, with a gap that is never bridged.
        <g clipPath="url(#right-half)">
          <Scene colours={palettes.hogwartsDinner} t={t} hogwarts />
        </g>
      )}
      {split && <rect x={792} y={0} width={16} height={900} fill="#000" />}
      {/* A freeze-frame dims the picture a little. */}
      {frozen && <rect width={1600} height={900} fill="#000" opacity={0.2} />}
      <text x={24} y={880} fill="#fff" opacity={0.45} fontSize={22}>
        Placeholder illustration · intensity {direction.intensity}
      </text>
    </svg>
  );
}
