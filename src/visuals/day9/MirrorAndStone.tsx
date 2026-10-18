// Beats 12–13: the Mirror and the Stone, and "Think it through" after it.
// Abstract only: a mirror frame, light and places. No people or faces. The
// Stone is a single small ember-red point, never set against gold.
//
// Beat 12, following the retelling sentence by sentence:
//   Sentence 0   a tall mirror in a moonlit, empty classroom; two warm glows
//                appear in the glass behind a small candle point (no figures)
//   Sentence 1   the glass clouds over
//   Sentence 2   a stone chamber with torchlight, and the same mirror
//   Sentence 3   a cold, dark shadow shape stands beside the mirror
//   Sentence 4   a small ember-red point shows in the glass, out of reach
//   Sentence 5   the point leaves the glass and drops into the foreground
//                (slow motion; freeze-frame)
//   Sentence 6   the glass clears to soft light
//   Sentence 7   the red point fades to dust

import { easeInOut, lerp, progress } from '../../engine/anim';
import { SmokeShape } from '../figures';
import { cameraFor, fadeIn, fadeOut, Flame, Glow, Layer, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, line, linesOf, MirrorFrame } from './kit';
import { day9Palettes } from './palettes';

const m = day9Palettes.n9mirrorChamber;

// The empty classroom by moonlight: a tall window and its shaft of light.
function Classroom({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#0C1020" bottom="#1A2034" t={t} />
      </Layer>
      <Layer depth={0.25}>
        <path d="M 240 140 L 240 520 L 440 520 L 440 140 Q 340 60 240 140 Z" fill="#20304A" {...line('#5A6A80', 2)} />
        <path d="M 340 100 L 340 520 M 240 330 L 440 330" fill="none" {...line('#5A6A80', 1.5)} />
        <path d="M 240 520 L 440 520 L 900 900 L 520 900 Z" fill={m.accent} opacity={0.08} />
        {/* Desks pushed against the wall. */}
        <path d="M 1200 700 L 1460 700 M 1220 700 L 1220 780 M 1440 700 L 1440 780 M 1240 640 L 1480 640" fill="none" {...line('#4A5068', 2)} opacity={0.6} />
      </Layer>
    </>
  );
}

// The stone chamber beyond the trapdoor, lit by torches.
function Chamber({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={m.shadow} bottom={m.primary} t={t} />
      </Layer>
      <Layer depth={0.25}>
        {Array.from({ length: 7 }, (_, row) => (
          <path key={row} d={`M -200 ${120 + row * 110} L 1800 ${120 + row * 110}`} {...line('#2E2A36', 2)} />
        ))}
        {[260, 1340].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={300} r={220} colour={m.secondary} opacity={0.35 + 0.05 * Math.sin(t * 7 + i)} />
            <Flame x={x} y={320} size={0.6} t={t + i} outer={m.secondary} />
            <path d={`M ${x - 14} 330 L ${x + 14} 330 L ${x + 6} 390 L ${x - 6} 390 Z`} fill="#3A3028" />
          </g>
        ))}
      </Layer>
    </>
  );
}

export function MirrorAndStone({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? L[L.length - 1].end + 5 : t;

  const cam = cameraFor('pushIn', progress(T, 0, at(2)), T);
  const toChamber = fadeIn(T, at(2), 2);
  // In the glass: two warm glows behind a small candle point, then cloud.
  const glows = fadeIn(T, at(0) + 2, 2.5) * fadeOut(T, at(1) + 1, 2);
  const cloud = window2(T, at(1), at(2) + 2, 2);
  const shadow = fadeIn(T, at(3), 2.5) * fadeOut(T, at(6), 3);
  const inGlass = fadeIn(T, at(4), 2);
  const drop = easeInOut(progress(T, at(5) + 0.5, at(5) + 3));
  const clear = fadeIn(T, at(6), 2.5);
  const dust = progress(T, at(7) + 1, at(7) + 5);

  // The Stone: in the glass, then dropping into the foreground, then dust.
  const sx = lerp(860, 900, drop);
  const sy = lerp(470, 820, drop);
  const stoneOn = inGlass * (1 - dust);

  const glass = (
    <>
      <rect x={-200} y={-700} width={400} height={800} fill={m.accent} opacity={0.1 + 0.25 * clear} />
      <g opacity={glows}>
        {/* Two soft warm glows at different heights (never a pair of eyes). */}
        <Glow x={-55} y={-300} r={120} colour="#F2B26A" opacity={0.45} />
        <Glow x={60} y={-190} r={110} colour="#F2B26A" opacity={0.4} />
      </g>
      <rect x={-200} y={-700} width={400} height={800} fill="#C9D3E6" opacity={0.55 * cloud} />
    </>
  );

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toChamber < 1 && (
        <g opacity={1 - toChamber}>
          <Classroom t={T} />
        </g>
      )}
      {toChamber > 0 && (
        <g opacity={toChamber}>
          <Chamber t={T} />
        </g>
      )}
      <Layer depth={0.55}>
        <MirrorFrame x={800} y={860} scale={0.95} glass={glass} />
        {/* A small candle point in front of the glass (at Christmas). */}
        <g opacity={(1 - toChamber) * fadeIn(T, at(0) + 1, 1.5)}>
          <Flame x={800} y={820} size={0.35} t={T} outer="#E8B45A" pulse={pulse} />
        </g>
        {/* A cold, dark shadow shape beside the mirror. */}
        <SmokeShape x={1120} y={560} t={T} size={1.1} seed={8} colour="#2A3040" ember="#3A4A6A" opacity={0.9 * shadow} />
      </Layer>
      <Layer depth={0.8}>
        {stoneOn > 0.01 && (
          <g opacity={stoneOn}>
            <Glow x={sx} y={sy} r={40} colour="#E2552B" opacity={0.6} />
            <circle cx={sx} cy={sy} r={7} fill="#E2552B" />
          </g>
        )}
        {dust > 0 && dust < 1 &&
          Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={900 + Math.cos(i * 2.4) * dust * 120} cy={820 - dust * 80 - Math.sin(i * 1.7) * dust * 60} r={2} fill="#E2552B" opacity={0.7 * (1 - dust)} />
          ))}
      </Layer>
    </Stage>
  );
}

// Beat 13: the mirror frame, its glass softly lit, held faintly behind the
// questions. The glass brightens a little as each rung opens.
export function MirrorGlass({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  const glass = <rect x={-200} y={-700} width={400} height={800} fill={m.accent} opacity={0.18 + rungs * 0.03} />;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.05, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(2px) saturate(0.7)' }}>
        <Chamber t={20} />
        <Layer depth={0.55}>
          <MirrorFrame x={800} y={860} scale={0.95} glass={glass} />
        </Layer>
      </g>
    </Stage>
  );
}
