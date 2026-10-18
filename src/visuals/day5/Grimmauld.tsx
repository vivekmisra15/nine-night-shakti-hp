// Beats 10–11: the argument at Grimmauld Place, and "Think it through".
// Abstract only: no people, no faces, no film imagery. A long dark kitchen
// table with a row of candles; the argument shows through the flames.
//
// Beat 10, following the retelling sentence by sentence:
//   Sentence 1     empty chairs on both sides, and their shadows on the wall
//   Sentences 2–4  two candles on opposite sides flare in turn and lean away
//                  from each other as the argument goes back and forth
//                  (freeze-frame after sentence 4)
//   Sentence 5     a third candle between them steadies and brightens
//   Sentence 6     a small candle at the far end is snuffed (sent to bed)
//   Sentence 8     the candles dim, one by one
// Camera: a slow pan along the table.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { Candle, fadeIn, Glow, H, Layer, Smoke, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { p } from './kit';

const k = p.n5grimmauldKitchen;
// The candles along the table. Two arguing candles, one steadying candle
// between them, and a small one at the far end.
const candles = [180, 450, 640, 800, 960, 1150, 1420];
const LEFT = 1;
const MIDDLE = 3;
const RIGHT = 5;
const SMALL = 6;

export interface KitchenState {
  flareLeft: number; // 0 to 1
  flareRight: number;
  steady: number; // the middle candle brightening
  snuffed: number; // 0 lit, 1 out
  dim: (i: number) => number; // 1 lit, 0 dim, per candle
  chairs: number; // 0 to 1
}

export function Kitchen({ t, s }: { t: number; s: KitchenState }) {
  return (
    <>
      <Layer depth={0.1}>
        {/* Soot-dark walls and a high window of ink-blue night. */}
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={k.shadow} />
        <rect x={-400} y={-400} width={W + 800} height={900} fill={k.secondary} opacity={0.45} />
        <rect x={1180} y={90} width={180} height={150} fill={k.accent} />
        <path d="M 1270 90 L 1270 240 M 1180 165 L 1360 165" stroke={k.shadow} strokeWidth={8} />
        {/* The chairs' shadows on the wall, leaning with the flames. */}
        {candles.slice(0, 6).map((x, i) => (
          <path key={i} d={`M ${x - 40} 520 L ${x - 50 - (s.flareLeft - s.flareRight) * 30} 330 L ${x + 30} 330 L ${x + 40} 520 Z`} fill="#000" opacity={0.25 * s.chairs} />
        ))}
      </Layer>
      <Layer depth={0.3}>
        {/* A low lamp, turned down. */}
        <Glow x={800} y={40} r={420} colour={k.highlight} opacity={0.12} />
        <path d="M 770 0 L 830 0 L 860 50 L 740 50 Z" fill={k.primary} opacity={0.7} />
        {/* Empty chair backs behind the table. */}
        {candles.slice(0, 6).map((x, i) => (
          <path key={i} d={`M ${x - 40} 560 L ${x - 40} 430 Q ${x} 410 ${x + 40} 430 L ${x + 40} 560`} fill="none" stroke="#2A2018" strokeWidth={10} opacity={s.chairs} />
        ))}
      </Layer>
      <Layer depth={0.6}>
        {/* The long table. */}
        <rect x={-200} y={560} width={2000} height={50} fill="#3A2A1C" />
        <rect x={-200} y={560} width={2000} height={6} fill={k.primary} opacity={0.35} />
        <rect x={-200} y={610} width={2000} height={400} fill="#1A130D" />
        {candles.map((x, i) => {
          let lit = s.dim(i);
          let lean = Math.sin(t * 1.1 + i) * 3;
          let scale = 1;
          if (i === LEFT) {
            lit *= 1 + 0.9 * s.flareLeft;
            lean -= 22 * s.flareLeft;
          }
          if (i === RIGHT) {
            lit *= 1 + 0.9 * s.flareRight;
            lean += 22 * s.flareRight;
          }
          if (i === MIDDLE) lit *= 1 + 0.4 * s.steady;
          if (i === SMALL) {
            lit *= 1 - s.snuffed;
            scale = 0.7;
          }
          return (
            <g key={x}>
              <Glow x={x} y={520} r={140 * lit} colour={k.highlight} opacity={0.18 + (i === MIDDLE ? 0.15 * s.steady : 0)} />
              <Candle x={x} y={500 + (1 - scale) * 60} t={t + i} scale={scale} lean={lean} lit={lit} outer={k.primary} wax="#D9CDB4" />
            </g>
          );
        })}
      </Layer>
      <Layer depth={0.9}>
        {/* Near chairs in silhouette. */}
        {[300, 900, 1400].map((x) => (
          <path key={x} d={`M ${x - 60} 900 L ${x - 60} 720 Q ${x} 700 ${x + 60} 720 L ${x + 60} 900`} fill="none" stroke="#0C0907" strokeWidth={16} opacity={s.chairs} />
        ))}
      </Layer>
    </>
  );
}

export function Grimmauld({ beat, t: time, duration, frozen, complete }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = { x: lerp(60, -60, progress(t, 0, duration)), y: 0, zoom: 1.08, rot: 0 };

  const s: KitchenState = {
    chairs: fadeIn(t, at(1), 2.5),
    // Back and forth: the left candle with sentences 2 and 4, the right with sentence 3.
    flareLeft: Math.max(window2(t, at(2), at(3), 1), window2(t, at(4), at(5) + 1, 1)) * (1 - 0.6 * fadeIn(t, at(5), 2)),
    flareRight: window2(t, at(3), at(4), 1) * (1 - 0.6 * fadeIn(t, at(5), 2)),
    steady: fadeIn(t, at(5), 2.5),
    snuffed: easeInOut(progress(t, at(6) + 3, at(6) + 4)),
    dim: (i) => 1 - 0.75 * easeInOut(progress(t, at(8) + i * 0.8, at(8) + i * 0.8 + 1.5)),
  };
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Kitchen t={t} s={s} />
      <Layer depth={0.6}>
        <Smoke x={candles[SMALL]} y={540} t={t} start={at(6) + 4} life={6} colour="#B9A88A" opacity={0.4} />
      </Layer>
    </Stage>
  );
}

// Beat 11: the table with its candles low, softly blurred behind the questions.
export function KitchenStill({ beat, frozen }: VisualProps) {
  const s: KitchenState = { chairs: 1, flareLeft: 0, flareRight: 0, steady: 0.6, snuffed: 1, dim: () => 0.4 };
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.12, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <Kitchen t={20} s={s} />
      </g>
    </Stage>
  );
}
