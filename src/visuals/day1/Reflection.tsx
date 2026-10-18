// Beat 16: Reflection, and the night's closing.
// The mountain at night with the single diya on its stone ledge, mirroring
// Beat 1, while the camera very slowly pulls back. When the takeaway
// appears, golden dust rises once.
//
// The closing (8 seconds, after the learner presses Finish):
//   the night turns to the first rose light of dawn; the diya flame shrinks
//   to a calm ember and rises out of the frame as a single spark; then the
//   picture fades and the map appears with diya 1 lit.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, KailasaBackdrop } from './common';

const k = palettes.kailasa;

function Ledge({ t, lit = 1, pulse = 0 }: { t: number; lit?: number; pulse?: number }) {
  return (
    <Layer depth={1}>
      <path d="M 560 790 Q 800 770 1040 790 L 1060 900 L 540 900 Z" fill="#141A33" />
      <Glow x={800} y={800} r={160} colour={k.accent} opacity={0.25 * lit} />
      <Diya x={800} y={780} t={t} scale={1.1} lit={lit} pulse={pulse} />
    </Layer>
  );
}

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, false);
  const dust = takeaway >= 0 && takeaway < 8 ? 1 - takeaway / 8 : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KailasaBackdrop t={t} />
      <Ledge t={t} pulse={pulse} />
      {dust > 0 && (
        <Layer depth={0.9}>
          <Particles kind="dust" t={takeaway} count={40} colour={k.highlight} opacity={0.7 * dust} area={{ x: 500, y: 200, w: 600, h: 600 }} speed={3} />
        </Layer>
      )}
    </Stage>
  );
}

// 13 seconds: dawn rises (0–5 s); the primary idea is shown over it (2.5–11 s,
// by the closing screen); the flame becomes a spark (9–12 s); then fade out.
// The closing animation, played by itself after Finish (13 seconds; see
// closing in day1.ts). Registered as 'n1-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = easeInOut(progress(t, 0, 5));
  const ember = 1 - 0.75 * easeInOut(progress(t, 1.5, 4));
  const spark = progress(t, 9, 12);
  const out = fadeIn(t, 11.5, 1.5);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 1 closing">
      <KailasaBackdrop t={t} dawn={dawn} />
      <Ledge t={t} lit={ember} />
      {spark > 0 && spark < 1 && (
        <g>
          <Glow x={818 + Math.sin(spark * 6) * 20} y={lerp(740, -40, spark)} r={30} colour="#FFF4D6" opacity={0.9} />
          <circle cx={818 + Math.sin(spark * 6) * 20} cy={lerp(740, -40, spark)} r={4} fill="#FFF4D6" />
        </g>
      )}
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
