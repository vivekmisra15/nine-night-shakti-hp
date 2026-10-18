// Beats 11–12: Through the trapdoor, and "Think it through" after it.
// Abstract only: the three friends are three small lights, each its own soft
// colour (no house colours). Objects and places carry the scene.
//
// Beat 11, following the retelling sentence by sentence:
//   Sentence 0  a trapdoor in a stone floor, three small lights at its edge
//   Sentence 1  the camera cranes down: dark ink tendrils curl, then retreat
//               from a burst of flame
//   Sentence 2  a room of fluttering key shapes; one light rises and catches one
//   Sentence 3  a chessboard of stone squares; one light steps forward and
//               goes dim (slow motion, then a freeze-frame)
//   Sentence 4  a row of small bottles in torchlight
//   Sentence 5  two lights part, one going back; the last goes on alone down
//               a corridor
//   Sentence 6  a long hall of floating candles; one small light set apart
//               brightens last
// Final frame: the candle hall.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, Candle, cameraFor, fadeIn, Flame, Glow, Layer, mixCam, Particles, rand, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';

const p = palettes.n6trapdoor;
const hall = palettes.greatHall;
// The three friends' lights: white-gold, pale blue and soft amber.
const FRIENDS = ['#FFF0C8', '#A9C8F0', '#F2C48A'];

function Spark({ x, y, colour, strength = 1, r = 34 }: { x: number; y: number; colour: string; strength?: number; r?: number }) {
  if (strength <= 0.01) return null;
  return (
    <g opacity={Math.min(1, strength)}>
      <Glow x={x} y={y} r={r * (0.6 + 0.4 * strength)} colour={colour} opacity={0.7} />
      <circle cx={x} cy={y} r={4.5} fill={colour} />
    </g>
  );
}

const Dark = () => (
  <Layer depth={0.05}>
    <rect x={-400} y={-400} width={2400} height={1700} fill={p.shadow} />
    <rect x={-400} y={-400} width={2400} height={1700} fill={p.primary} opacity={0.7} />
  </Layer>
);

// Sentence 0: the trapdoor in the stone floor.
function TrapdoorFloor({ t, open }: { t: number; open: number }) {
  return (
    <>
      <Dark />
      <Layer depth={0.5}>
        <path d="M -400 520 L 2000 520 L 2000 1300 L -400 1300 Z" fill="#2A2E3A" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M ${-400 + i * 360} 520 L ${-900 + i * 520} 1300`} stroke="#1A1E28" strokeWidth={3} />
        ))}
        {[600, 720, 880].map((y) => (
          <path key={y} d={`M -400 ${y} L 2000 ${y}`} stroke="#1A1E28" strokeWidth={3} />
        ))}
        {/* The trapdoor: a dark opening, the lid tilting up. */}
        <path d="M 640 640 L 960 640 L 1000 760 L 600 760 Z" fill="#06080F" />
        <path d={`M 640 640 L 960 640 L ${960 - open * 10} ${640 - open * 150} L ${640 + open * 10} ${640 - open * 150} Z`} fill="#4A3A28" stroke="#6B5A40" strokeWidth={3} />
        <circle cx={800} cy={640 - open * 80} r={10} fill="none" stroke={p.accent} strokeWidth={3} />
        {FRIENDS.map((c, i) => (
          <Spark key={c} x={680 + i * 120} y={800 + Math.sin(t + i) * 4} colour={c} />
        ))}
      </Layer>
    </>
  );
}

// Sentence 1: ink tendrils curl, then retreat from a burst of flame.
function Snare({ t, burst }: { t: number; burst: number }) {
  const reach = 1 - easeInOut(burst);
  return (
    <>
      <Dark />
      <Layer depth={0.5}>
        {Array.from({ length: 9 }, (_, i) => {
          const x0 = i < 5 ? -100 : 1700;
          const y0 = 120 + i * 90;
          const dir = i < 5 ? 1 : -1;
          const len = (420 + rand(i, 5) * 260) * (0.3 + 0.7 * reach);
          const wave = Math.sin(t * 0.8 + i) * 40;
          const d = `M ${x0} ${y0} C ${x0 + dir * len * 0.4} ${y0 - 80 + wave}, ${x0 + dir * len * 0.7} ${y0 + 90 - wave}, ${x0 + dir * len} ${y0 + wave * 0.5}`;
          return <path key={i} d={d} stroke="#05070C" strokeWidth={22 - (i % 3) * 5} fill="none" strokeLinecap="round" opacity={0.95} />;
        })}
        {FRIENDS.map((c, i) => (
          <Spark key={c} x={700 + i * 100} y={460 + Math.sin(t * 2 + i) * 6} colour={c} />
        ))}
        {burst > 0 && (
          <g opacity={window2(burst * 10, 0, 10, 2)}>
            <Glow x={800} y={420} r={420 * burst} colour={p.accent} opacity={0.6} />
            <Flame x={800} y={480} size={2.2 * burst} t={t} core="#FFF0C8" outer={p.accent} />
          </g>
        )}
      </Layer>
    </>
  );
}

// Sentence 2: a room of fluttering keys; one light rises and catches one.
function Keys({ t, catchIt }: { t: number; catchIt: number }) {
  const target = { x: 1040, y: 220 };
  const c = easeInOut(catchIt);
  return (
    <>
      <Dark />
      <Layer depth={0.4}>
        {Array.from({ length: 26 }, (_, i) => {
          const x = 120 + rand(i, 21) * 1360 + Math.sin(t * 1.2 + i) * 40;
          const y = 90 + rand(i, 22) * 420 + Math.cos(t * 1.5 + i * 2) * 26;
          const flap = Math.abs(Math.sin(t * 12 + i)) * 10;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 37) % 360})`} opacity={0.75}>
              <ellipse cx={-4} cy={-6} rx={9} ry={2 + flap * 0.4} fill="#9AA3B8" opacity={0.6} />
              <circle cx={-10} cy={0} r={5} fill="none" stroke="#C9C2A8" strokeWidth={2} />
              <path d="M -5 0 L 12 0 M 8 0 L 8 5 M 12 0 L 12 4" stroke="#C9C2A8" strokeWidth={2} />
            </g>
          );
        })}
        {/* The key that fits, glowing once caught. */}
        <g transform={`translate(${target.x} ${target.y})`} opacity={0.4 + 0.6 * c}>
          <Glow x={0} y={0} r={60 * c} colour={p.accent} opacity={0.6} />
          <circle cx={-14} cy={0} r={7} fill="none" stroke="#F2E2C0" strokeWidth={3} />
          <path d="M -7 0 L 18 0 M 12 0 L 12 7 M 18 0 L 18 6" stroke="#F2E2C0" strokeWidth={3} />
        </g>
        <path d="M -400 820 L 2000 820 L 2000 1300 L -400 1300 Z" fill="#1E2230" />
        {FRIENDS.map((col, i) => {
          const rising = i === 0;
          const x = rising ? lerp(700, target.x - 20, c) : 700 + i * 110;
          const y = rising ? lerp(780, target.y + 10, c) : 780;
          return <Spark key={col} x={x} y={y} colour={col} />;
        })}
      </Layer>
    </>
  );
}

// Sentence 3: the stone chessboard; one light steps forward and goes dim.
export function Chessboard({ step, dim = 0 }: { step: number; dim?: number }) {
  // A board in perspective: rows get narrower towards the back.
  const rows = 8;
  const rowY = (r: number) => 340 + r * r * 8 + r * 20;
  const rowW = (r: number) => 500 + r * 120;
  const s = easeInOut(step);
  return (
    <>
      <Dark />
      <Layer depth={0.5}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => {
            const y1 = rowY(r);
            const y2 = rowY(r + 1);
            const x = (w: number, k: number) => 800 - w / 2 + (w / 8) * k;
            const d = `M ${x(rowW(r), c)} ${y1} L ${x(rowW(r), c + 1)} ${y1} L ${x(rowW(r + 1), c + 1)} ${y2} L ${x(rowW(r + 1), c)} ${y2} Z`;
            return <path key={`${r}-${c}`} d={d} fill={(r + c) % 2 ? '#5A5E68' : '#2E323C'} stroke="#1A1E28" strokeWidth={1} />;
          }),
        )}
        {/* Tall stone pieces on the far rows, as plain shapes. */}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M ${560 + i * 68} 330 L ${566 + i * 68} 250 Q ${574 + i * 68} 230 ${582 + i * 68} 250 L ${588 + i * 68} 330 Z`} fill="#3A3E48" opacity={0.9} />
        ))}
        <Glow x={800} y={560} r={500} colour={p.accent} opacity={0.08} />
        {/* The three lights; the pale blue one steps forward and goes dim. */}
        <Spark x={650} y={830} colour={FRIENDS[0]} strength={1 - dim * 0.4} />
        <Spark x={950} y={830} colour={FRIENDS[2]} strength={1 - dim * 0.4} />
        <Spark x={lerp(800, 800, s)} y={lerp(830, 560, s)} colour={FRIENDS[1]} strength={lerp(1, 0.25, easeInOut(progress(step, 0.6, 1)))} r={lerp(34, 26, s)} />
      </Layer>
    </>
  );
}

// Sentence 4: a row of small bottles in torchlight.
function Bottles({ t }: { t: number }) {
  return (
    <>
      <Dark />
      <Layer depth={0.5}>
        {[300, 1300].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={300} r={260} colour={p.accent} opacity={0.35} />
            <rect x={x - 6} y={300} width={12} height={90} fill="#3A2C1E" />
            <Flame x={x} y={300} size={0.8} t={t + i} core="#FFF0C8" outer={p.accent} />
          </g>
        ))}
        <rect x={380} y={600} width={840} height={24} fill="#3A332A" />
        {Array.from({ length: 7 }, (_, i) => {
          const x = 460 + i * 112;
          const tall = 70 + ((i * 29) % 50);
          return (
            <g key={i}>
              <path d={`M ${x - 22} 600 L ${x - 22} ${600 - tall * 0.6} Q ${x - 22} ${600 - tall * 0.75} ${x - 8} ${600 - tall * 0.8} L ${x - 8} ${600 - tall} L ${x + 8} ${600 - tall} L ${x + 8} ${600 - tall * 0.8} Q ${x + 22} ${600 - tall * 0.75} ${x + 22} ${600 - tall * 0.6} L ${x + 22} 600 Z`} fill="#8FA0B8" opacity={0.25 + (i % 3) * 0.1} stroke="#C9D3E6" strokeWidth={2} />
              <ellipse cx={x} cy={590} rx={18} ry={5} fill={p.accent} opacity={0.25} />
            </g>
          );
        })}
        <path d="M -400 800 L 2000 800 L 2000 1300 L -400 1300 Z" fill="#1E2230" />
        <Spark x={720} y={760} colour={FRIENDS[0]} />
        <Spark x={880} y={760} colour={FRIENDS[2]} />
      </Layer>
    </>
  );
}

// Sentence 5: two lights part; one goes back, one goes on down a corridor.
function Corridor({ t, part }: { t: number; part: number }) {
  const back = easeInOut(progress(part, 0, 0.5));
  const on = easeInOut(progress(part, 0.2, 1));
  return (
    <>
      <Dark />
      <Layer depth={0.4}>
        {/* The corridor in perspective, with torches down its walls. */}
        <path d="M -200 900 L 720 420 L 880 420 L 1800 900 Z" fill="#1E2230" />
        <path d="M -200 -100 L 720 360 L 880 360 L 1800 -100 Z" fill="#0E121C" />
        <path d="M -200 -100 L 720 360 L 720 420 L -200 900 Z" fill="#262A36" />
        <path d="M 1800 -100 L 880 360 L 880 420 L 1800 900 Z" fill="#262A36" />
        {[0.15, 0.4, 0.62].map((k, i) => (
          <g key={k}>
            <Flame x={lerp(-100, 700, k)} y={lerp(260, 380, k)} size={lerp(0.9, 0.3, k)} t={t + i} core="#FFF0C8" outer={p.accent} />
            <Flame x={lerp(1700, 900, k)} y={lerp(260, 380, k)} size={lerp(0.9, 0.3, k)} t={t + i + 2} core="#FFF0C8" outer={p.accent} />
          </g>
        ))}
        <Spark x={lerp(760, 200, back)} y={lerp(760, 860, back)} colour={FRIENDS[2]} strength={1 - back * 0.7} />
        <Spark x={lerp(840, 800, on)} y={lerp(760, 430, on)} colour={FRIENDS[0]} r={lerp(34, 16, on)} />
      </Layer>
    </>
  );
}

// Sentence 6: the hall of floating candles at the feast. A small light set
// apart from the others brightens last.
function CandleHall({ t, apart }: { t: number; apart: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={hall.shadow} bottom={hall.primary} t={t} stars={60} starColour={hall.accent} />
      </Layer>
      <Layer depth={0.3}>
        {Array.from({ length: 36 }, (_, i) => {
          const x = 100 + (i % 12) * 127 + (Math.floor(i / 12) % 2) * 60;
          const y = 200 + Math.floor(i / 12) * 110 + Math.sin(t * 0.6 + i) * 8;
          return <Candle key={i} x={x} y={y} t={t + i} scale={0.5 - Math.floor(i / 12) * 0.06} />;
        })}
      </Layer>
      <Layer depth={0.6}>
        <path d="M -400 700 L 2000 700 L 2000 1300 L -400 1300 Z" fill="#141A30" />
        {[760, 860].map((y) => (
          <rect key={y} x={-400} y={y} width={2400} height={22} fill="#2A2A3A" />
        ))}
        {FRIENDS.map((c, i) => (
          <Spark key={c} x={620 + i * 120} y={730} colour={c} />
        ))}
        {/* The light set apart, brightening last. */}
        <Spark x={1320} y={730} colour="#F2E2C0" strength={0.25 + 0.95 * apart} r={30 + 20 * apart} />
        <Particles kind="dust" t={t} count={16} colour={hall.highlight} opacity={0.3} />
      </Layer>
    </>
  );
}

export function ThroughTheTrapdoor({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 10000 : t;

  const scene = (n: number, last = false) => (last ? fadeIn(T, at(n) - 0.5, 1.5) : window2(T, n === 0 ? -5 : at(n) - 0.5, at(n + 1) + 0.8, 1.5));
  // Crane down through the trapdoor at sentence 1, then a slow pan.
  let cam: Cam = cameraFor('crane', progress(T, 0, at(1) + 2), T);
  cam = mixCam(cam, cameraFor('pan', progress(T, at(2), at(6)), T), fadeIn(T, at(2), 2));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.03, rot: 0 }, fadeIn(T, at(6), 2));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {scene(0) > 0 && <g opacity={scene(0)}><TrapdoorFloor t={T} open={fadeIn(T, 2, 3)} /></g>}
      {scene(1) > 0 && <g opacity={scene(1)}><Snare t={T} burst={progress(T, at(1) + 4, at(1) + 8)} /></g>}
      {scene(2) > 0 && <g opacity={scene(2)}><Keys t={T} catchIt={progress(T, at(2) + 3, at(2) + 7)} /></g>}
      {scene(3) > 0 && <g opacity={scene(3)}><Chessboard step={progress(T, at(3) + 1, at(3) + 6)} /></g>}
      {scene(4) > 0 && <g opacity={scene(4)}><Bottles t={T} /></g>}
      {scene(5) > 0 && <g opacity={scene(5)}><Corridor t={T} part={progress(T, at(5) + 0.5, at(6) - 0.5)} /></g>}
      {scene(6, true) > 0 && <g opacity={scene(6, true)}><CandleHall t={T} apart={fadeIn(T, at(6) + 10, 3)} /></g>}
    </Stage>
  );
}

// Beat 12: the stone chessboard, dimmed behind the questions; the stepped-
// forward light glows a little more as each rung opens.
export function ChessDimmed({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.06, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }} opacity={0.55 + 0.06 * rungs}>
        <Chessboard step={1} dim={0.5} />
      </g>
    </Stage>
  );
}
