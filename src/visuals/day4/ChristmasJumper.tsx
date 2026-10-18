// Beats 10–11: The Christmas jumper, and "Think it through" after it.
// Abstract only: a room, objects and light; no people, faces or film
// imagery, and no house colours. The jumper's emerald is lit only by cream
// and candle-gold, never set beside silver or grey-white. (The player adds
// the letterbox bars.)
//
// Beat 10, following the retelling sentence by sentence:
//   Sentence 0   a tall window with soft snow-light in a dark dormitory
//   Sentence 1   a small pile of parcels at the foot of a bed, catching the light
//   Sentence 2   a single coin glints, small and cold; then a lumpy parcel
//   Sentence 3   the parcel opens and a hand-knitted jumper unfolds (stitch
//                texture, no letter on it) beside a box of fudge (freeze)
//   Sentence 4   a second jumper, folded and darker, at the next bed
//   Sentence 5   the two jumpers side by side
//   Sentence 6   a soft candle-glow warms the scene
//   Sentence 7   a thin thread of warm light runs from the jumper out of the
//                window to a far, distant house-light (the warmth comes from
//                somewhere)
// Camera: a drift across the room, then a slow push in on the jumper; still
// from the jumper on.

import { useId } from 'react';
import { easeInOut, lerp, progress } from '../../engine/anim';
import { type Cam, cameraFor, Candle, fadeIn, Glow, Layer, LightTrail, mixCam, Particles, Stage, W, H } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';
import { day4Palettes } from './palettes';

const c = day4Palettes.n4christmasMorning;
const SNOW = '#F3E3C4'; // cream snow-light, so the emerald never sits beside white

// A hand-knitted jumper, laid flat, with rows of small knit stitches.
// `open` (0 to 1) unfolds it from a folded square.
function Jumper({ x, y, scale = 1, open = 1, colour = c.accent }: { x: number; y: number; scale?: number; open?: number; colour?: string }) {
  const sleeve = lerp(0, 1, open);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* The sleeves, swinging out as it unfolds. */}
      <path d={`M -70 -60 L ${-70 - 80 * sleeve} ${-20 + 40 * sleeve} L ${-58 - 80 * sleeve} ${-2 + 44 * sleeve} L -70 ${-10}`} fill={colour} stroke="#1A3A28" strokeWidth={2} />
      <path d={`M 70 -60 L ${70 + 80 * sleeve} ${-20 + 40 * sleeve} L ${58 + 80 * sleeve} ${-2 + 44 * sleeve} L 70 ${-10}`} fill={colour} stroke="#1A3A28" strokeWidth={2} />
      {/* The body, with a round neck and a ribbed hem. */}
      <path d={`M -70 -66 Q -30 -76 -20 -70 Q 0 -54 20 -70 Q 30 -76 70 -66 L 70 ${lerp(10, 70, open)} L -70 ${lerp(10, 70, open)} Z`} fill={colour} stroke="#1A3A28" strokeWidth={2} />
      {/* Knit stitches: rows of small v-shapes. */}
      {Array.from({ length: Math.round(lerp(3, 7, open)) }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => {
          const sx = -56 + col * 16;
          const sy = -46 + row * 16;
          return <path key={`${row}-${col}`} d={`M ${sx - 4} ${sy - 3} L ${sx} ${sy + 3} L ${sx + 4} ${sy - 3}`} stroke={colour === c.accent ? '#4FA078' : '#8A5A50'} strokeWidth={1.2} fill="none" opacity={0.55} />;
        }),
      )}
      <path d={`M -70 ${lerp(10, 70, open) - 8} L 70 ${lerp(10, 70, open) - 8}`} stroke="#1A3A28" strokeWidth={1.5} opacity={0.7} />
    </g>
  );
}

// A box of homemade fudge, its lid off, with squares inside.
function Fudge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-50} y={-30} width={100} height={60} fill="#5A3E24" stroke="#C9A06A" strokeWidth={2} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={-44 + (i % 4) * 22} y={-24 + Math.floor(i / 4) * 24} width={18} height={20} rx={2} fill="#B07A48" />
      ))}
    </g>
  );
}

// The dormitory. Each value is 0 to 1.
export function Dormitory({ t, parcels, coin, lumpy, jumper, second, candle, thread }: { t: number; parcels: number; coin: number; lumpy: number; jumper: number; second: number; candle: number; thread: number }) {
  const clip = useId();
  return (
    <>
      <Layer depth={0.05}>
        {/* The dark room, warm stone in shadow. */}
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={c.shadow} />
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={c.primary} opacity={0.12 + 0.12 * candle} />
      </Layer>
      <Layer depth={0.15}>
        {/* The tall window with soft snow-light, and snow falling outside. */}
        <rect x={640} y={40} width={320} height={460} rx={150} fill={c.secondary} />
        <g>
          <clipPath id={clip}>
            <rect x={640} y={40} width={320} height={460} rx={150} />
          </clipPath>
          <g clipPath={`url(#${clip})`}>
            {/* Far away, a small warm house-light in the snow. */}
            <path d="M 820 430 L 820 400 L 840 384 L 860 400 L 860 430 Z" fill="#1E2840" />
            <Glow x={840} y={412} r={30 + 30 * thread} colour="#F2C27A" opacity={0.35 + 0.5 * thread} />
            <rect x={834} y={406} width={12} height={10} fill="#F2C27A" opacity={0.6 + 0.4 * thread} />
            <path d="M 640 440 Q 800 420 960 445 L 960 520 L 640 520 Z" fill="#5A6888" />
            <Particles kind="snow" t={t} count={40} colour={SNOW} opacity={0.7} area={{ x: 640, y: 40, w: 320, h: 460 }} speed={0.5} />
          </g>
        </g>
        <path d="M 800 40 L 800 500 M 640 270 L 960 270" stroke="#241C14" strokeWidth={10} />
        <rect x={640} y={40} width={320} height={460} rx={150} fill="none" stroke="#3A2E22" strokeWidth={16} />
        {/* The snow-light falling into the room. */}
        <path d="M 650 500 L 950 500 L 1150 900 L 450 900 Z" fill={SNOW} opacity={0.07} />
      </Layer>
      <Layer depth={0.5}>
        {/* The feet of two beds: posts and a rail, in warm dark wood. */}
        {[360, 1240].map((bx) => (
          <g key={bx}>
            <rect x={bx - 180} y={520} width={18} height={300} fill="#3A2A1C" />
            <rect x={bx + 162} y={520} width={18} height={300} fill="#3A2A1C" />
            <rect x={bx - 180} y={600} width={360} height={16} fill="#4A3624" />
            <path d={`M ${bx - 170} 610 Q ${bx} 580 ${bx + 170} 610 L ${bx + 170} 660 L ${bx - 170} 660 Z`} fill="#2A1E16" />
          </g>
        ))}
      </Layer>
      <Layer depth={0.75}>
        {/* The floor. */}
        <rect x={-400} y={800} width={W + 800} height={400} fill="#1E1812" />
        {/* The parcels at the foot of the bed. */}
        <g opacity={parcels * (1 - jumper * 0.6)}>
          <rect x={250} y={740} width={90} height={60} fill="#6E5A44" stroke="#C9A06A" strokeWidth={1.5} />
          <rect x={300} y={700} width={60} height={42} fill="#7A6450" stroke="#C9A06A" strokeWidth={1.5} />
          <Glow x={330} y={760} r={120} colour={c.highlight} opacity={0.12} />
        </g>
        {/* A single coin, small and cold, glinting. */}
        <g opacity={coin * (1 - jumper)}>
          <circle cx={430} cy={790} r={9} fill="#B8A27A" />
          <path d={`M 430 ${770 - 6 * Math.sin(t * 3)} L 430 ${810 + 6 * Math.sin(t * 3)} M 410 790 L 450 790`} stroke="#F3E3C4" strokeWidth={1.5} opacity={0.5 + 0.4 * Math.sin(t * 3)} />
        </g>
        {/* The lumpy parcel, before it opens. */}
        <g opacity={lumpy * (1 - jumper)}>
          <path d="M 470 800 Q 460 740 520 735 Q 560 720 600 745 Q 640 760 630 800 Z" fill="#8A7458" stroke="#C9A06A" strokeWidth={2} />
          <path d="M 548 732 L 552 800" stroke="#C9A06A" strokeWidth={1.5} />
        </g>
        {/* The jumper, unfolded, beside the fudge, in candle-gold light. */}
        <g opacity={jumper}>
          <Glow x={540} y={760} r={260} colour={c.highlight} opacity={0.2 + 0.15 * candle} />
          <Jumper x={540} y={760} scale={0.95} open={jumper} />
          <Fudge x={740} y={800} />
        </g>
        {/* The second jumper, folded and darker, at the next bed. */}
        <g opacity={second}>
          <Glow x={1180} y={780} r={180} colour={c.highlight} opacity={0.14} />
          <Jumper x={1180} y={790} scale={0.85} open={0} colour="#5E3A34" />
        </g>
        {/* A candle, warming the scene. */}
        <g opacity={candle}>
          <Glow x={960} y={700} r={320} colour="#F2C27A" opacity={0.3} />
          <Candle x={960} y={700} t={t} scale={1.1} outer="#F2C27A" />
        </g>
        {/* The thread of warm light from the jumper out of the window. */}
        <LightTrail d="M 540 720 C 600 560 760 520 840 412" amount={thread} colour="#F2C27A" width={2.5} t={t} opacity={0.7} />
      </Layer>
    </>
  );
}

export function ChristmasJumper({ beat, t, frozen }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;

  const parcels = fadeIn(t, at(1), 2);
  const coin = fadeIn(t, at(2), 1.5);
  const lumpy = fadeIn(t, at(2) + 3, 1.5);
  const jumper = easeInOut(progress(t, at(3), at(3) + 3));
  const second = fadeIn(t, at(4), 2);
  const candle = fadeIn(t, at(6), 2.5);
  const thread = easeInOut(progress(t, at(7), at(7) + 5));

  // Drift across the room, push in on the jumper, then frame both jumpers.
  const drift = cameraFor('drift', 0, t);
  const across: Cam = { x: lerp(120, -40, progress(t, 0, at(3))), y: 0, zoom: 1.06, rot: 0 };
  const onJumper: Cam = { x: 160, y: -120, zoom: 1.3, rot: 0 };
  const both: Cam = { x: 0, y: -40, zoom: 1.08, rot: 0 };
  let cam = mixCam(drift, across, 0.8);
  cam = mixCam(cam, onJumper, easeInOut(progress(t, at(3) - 1, at(3) + 3)));
  cam = mixCam(cam, both, easeInOut(progress(t, at(4), at(5))));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.02, rot: 0 }, easeInOut(progress(t, at(7), at(7) + 4)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Dormitory t={t} parcels={parcels} coin={coin} lumpy={lumpy} jumper={jumper} second={second} candle={candle} thread={thread} />
    </Stage>
  );
}

// Beat 11: the jumper by the window, snow falling slowly, softly blurred
// behind the questions. The candle warms a little as each rung opens.
export function JumperWindow({ beat, t, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 60, y: -40, zoom: 1.12, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(2.5px) saturate(0.8)' }}>
        <Dormitory t={t} parcels={0} coin={0} lumpy={0} jumper={1} second={0} candle={0.3 + 0.7 * (rungs / 6)} thread={0.6} />
      </g>
    </Stage>
  );
}
