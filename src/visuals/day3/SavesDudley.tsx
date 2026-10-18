// Beat 12, the gentle alternative: Harry saves Dudley.
// Abstract only (the player adds letterbox bars): lights, shadow shapes and
// frost in a summer alley; no figures, and the silver light is a soft,
// undetailed shape (no stag is drawn).
//   Sentence 0   a summer alley at dusk under sodium streetlamps, heat haze;
//                two small lights walk along it, one larger
//   Sentence 1   frost creeps across the ground, the lamps go out, and two
//                tall shadow shapes glide in
//   Sentence 2   (freeze-frame: the rule he knows)
//   Sentence 3   a shadow closes on the larger light, and a burst of silver
//                light appears; the camera pushes in a little
//   Sentence 4   the silver light runs as a soft shape and drives both
//                shadows back; the two lights move on together, one leaning
//                on the other
//   Sentence 5   a letter of light arrives through the dark

import { easeInOut, easeOut, lerp, progress, wobble } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, rand, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';

const a = palettes.n3summerAlley;

// The alley: dusk sky, brick walls, a fence line and two sodium streetlamps.
// `lamps` 0 to 1 is how brightly they burn; `frost` 0 to 1 how far the
// frost has crept across the ground (from the right).
export function Alley({ t, lamps = 1, frost = 0, dark = 0 }: { t: number; lamps?: number; frost?: number; dark?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#2A2238" bottom={a.primary} t={t} />
        <rect x={-400} y={-400} width={2400} height={1800} fill={a.shadow} opacity={0.75 * dark} />
      </Layer>
      <Layer depth={0.25}>
        {/* Rooftops beyond the wall. */}
        <path d="M -300 420 L 100 420 L 180 360 L 260 420 L 700 420 L 780 350 L 860 420 L 1300 420 L 1380 370 L 1460 420 L 1900 420 L 1900 600 L -300 600 Z" fill="#1E1A24" />
        {/* The brick wall along the alley. */}
        <rect x={-300} y={470} width={2200} height={300} fill={a.secondary} />
        {Array.from({ length: 6 }, (_, row) => (
          <path key={row} d={`M -300 ${500 + row * 45} L 1900 ${500 + row * 45}`} stroke="#4A3229" strokeWidth={2} opacity={0.6} />
        ))}
        <rect x={-300} y={-400} width={2200} height={1200} fill={a.shadow} opacity={0.6 * dark} />
      </Layer>
      <Layer depth={0.5}>
        {/* The path, with heat haze over it. */}
        <rect x={-300} y={770} width={2200} height={400} fill="#2A2420" />
        <Haze y={760} colour={a.primary} opacity={0.18 * lamps} t={t} />
        {/* Frost creeping in from the right. */}
        {frost > 0 &&
          Array.from({ length: 40 }, (_, i) => {
            const x = 1700 - rand(i, 51) * 1800 * frost;
            const y = 790 + rand(i, 52) * 110;
            const l = 20 + rand(i, 53) * 40;
            return <path key={i} d={`M ${x} ${y} L ${x - l} ${y - l * 0.2} M ${x - l * 0.5} ${y - l * 0.1} L ${x - l * 0.7} ${y - l * 0.5}`} stroke={a.accent} strokeWidth={1.5} opacity={0.6} />;
          })}
        {frost > 0 && <rect x={1700 - 1800 * frost} y={770} width={1800 * frost} height={300} fill={a.accent} opacity={0.12} />}
        {/* Two streetlamps. */}
        {[360, 1240].map((x) => (
          <g key={x}>
            <rect x={x - 4} y={330} width={8} height={460} fill="#141414" />
            <path d={`M ${x - 18} 330 L ${x + 18} 330 L ${x + 10} 310 L ${x - 10} 310 Z`} fill="#141414" />
            <Glow x={x} y={340} r={240} colour={a.primary} opacity={0.55 * lamps} />
            <Glow x={x} y={780} r={220} colour={a.primary} opacity={0.25 * lamps} />
            <circle cx={x} cy={338} r={8} fill="#FFE2A0" opacity={0.2 + 0.8 * lamps} />
          </g>
        ))}
      </Layer>
    </>
  );
}

// A tall shadow shape: a dark, ragged column, with no face or detail.
function Shadow({ x, y, t, opacity }: { x: number; y: number; t: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  const s = wobble(t, 1.1, x) * 8;
  const hem = Array.from({ length: 7 }, (_, i) => `L ${x + 50 - i * 16} ${y + (i % 2 ? -18 : 0) + wobble(t, 2, i) * 6}`).join(' ');
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y - 160} r={200} colour="#000000" opacity={0.6} />
      <path d={`M ${x - 46} ${y} Q ${x - 60 + s} ${y - 200} ${x - 10 + s} ${y - 330} Q ${x + 10 + s} ${y - 350} ${x + 30 + s} ${y - 320} Q ${x + 66 + s} ${y - 180} ${x + 50} ${y} ${hem} Z`} fill="#06070C" opacity={0.92} />
    </g>
  );
}

// A small walking light.
function WalkingLight({ x, y, r, opacity = 1 }: { x: number; y: number; r: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={r * 6} colour="#FFE8C0" opacity={0.45} />
      <circle cx={x} cy={y} r={r} fill="#FFF6E6" />
    </g>
  );
}

export function SavesDudley({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 1e4 : t;

  // The two lights walk along the alley, then stop when the cold comes.
  const walk = easeInOut(progress(T, 0, at(1) + 1));
  const home = easeInOut(progress(T, at(4) + 2, at(5) + 2));
  const harry = { x: lerp(200, 700, walk) + home * 500, y: 760 - 4 * Math.sin(T * 3) * (walk < 1 || home > 0 ? 1 : 0) };
  const dudley = { x: lerp(270, 790, walk) + home * 470, y: 750 + home * 12 };
  // The cold: frost, the lamps going out, the shadows gliding in.
  const frost = easeOut(progress(T, at(1), at(1) + 5)) * (1 - 0.6 * progress(T, at(4), at(5)));
  const lampsOut = 1 - fadeIn(T, at(1) + 1, 1.5);
  const glide = easeInOut(progress(T, at(1) + 1, at(3)));
  const close = easeInOut(progress(T, at(3), at(3) + 2));
  // The silver burst, and the soft running shape that drives the shadows back.
  const burst = fadeIn(T, at(3) + 1.6, 0.8) * (1 - 0.5 * fadeIn(T, at(4) + 3, 2));
  const run = easeInOut(progress(T, at(4), at(4) + 3.5));
  const shadowsBack = easeInOut(progress(T, at(4) + 0.6, at(4) + 4));
  const shadows = [
    { x: lerp(1700, 1080, glide) - close * 140 + shadowsBack * 900, y: 800 },
    { x: lerp(1900, 1280, glide) + shadowsBack * 900, y: 800 },
  ];
  // The letter of light, arriving through the dark.
  const letter = easeOut(progress(T, at(5), at(5) + 3));
  const letterPos = { x: lerp(1650, dudley.x + 60, letter), y: lerp(120, 640, letter) };

  const cam = mixCam(cameraFor('still', 0, T), { x: 40, y: 0, zoom: 1.16, rot: 0 }, easeInOut(progress(T, at(3), at(3) + 3)) * (1 - easeInOut(progress(T, at(4) + 2, at(5)))));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Alley t={t} lamps={lampsOut} frost={frost} dark={1 - lampsOut} />
      <Layer depth={0.65}>
        {shadows.map((s, i) => (
          <Shadow key={i} x={s.x} y={s.y} t={t + i * 3} opacity={fadeIn(T, at(1) + 1, 2) * (1 - shadowsBack)} />
        ))}
        <WalkingLight x={harry.x} y={harry.y} r={7} />
        <WalkingLight x={dudley.x} y={dudley.y} r={10} opacity={1 - 0.4 * close * (1 - run)} />
        {burst > 0 && (
          <g opacity={burst}>
            <Glow x={harry.x + 20} y={harry.y - 20} r={320} colour={a.highlight} opacity={0.55} />
            <circle cx={harry.x + 20} cy={harry.y - 20} r={16} fill="#FFFFFF" />
          </g>
        )}
        {run > 0 && run < 1 && (
          // The silver light runs: a soft, undetailed shape with a trail.
          <g>
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={i} cx={lerp(harry.x + 40, 1700, run) - i * 50} cy={720 - Math.sin(run * Math.PI) * 60} rx={70 - i * 12} ry={30 - i * 5} fill={a.highlight} opacity={0.5 - i * 0.1} />
            ))}
            <Glow x={lerp(harry.x + 40, 1700, run)} y={720 - Math.sin(run * Math.PI) * 60} r={200} colour={a.highlight} opacity={0.5} />
          </g>
        )}
        {letter > 0 && (
          <g transform={`translate(${letterPos.x} ${letterPos.y}) rotate(${(1 - letter) * 40})`}>
            <Glow x={0} y={0} r={90} colour="#FFF6E6" opacity={0.5} />
            <rect x={-30} y={-20} width={60} height={40} fill="#FFF6E6" opacity={0.85} />
            <path d="M -30 -20 L 0 4 L 30 -20" fill="none" stroke={a.secondary} strokeWidth={2} />
          </g>
        )}
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="dust" t={t} count={16} colour={frost > 0.3 ? a.accent : a.primary} opacity={0.3} />
      </Layer>
    </Stage>
  );
}
