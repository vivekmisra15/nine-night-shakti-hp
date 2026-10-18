// Beat 15: Reflection, and the night's closing.
// A faint night sky with one diya on a stone ledge, while the camera very
// slowly pulls back. When the theme appears again, golden dust rises once and
// the sky begins to lighten.
//
// The closing (13 seconds, after the learner presses Finish): the gold dawn
// from Beat 6 rises over a low ridge (0–5 s) while the theme is shown over it
// (by the closing screen); the gods' many small lights drift in and settle
// into one diya (3–8 s); its flame becomes a spark and rises out of the frame
// (9–12 s); then the picture fades and the map appears with diya 6 lit.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { GODS, GoldDawn, NightRidge } from './kit';

const g = palettes.n6gatheredLight;

function Ledge({ t, lit = 1, pulse = 0 }: { t: number; lit?: number; pulse?: number }) {
  return (
    <Layer depth={1}>
      <path d="M 560 790 Q 800 770 1040 790 L 1060 900 L 540 900 Z" fill="#0E1128" />
      <Glow x={800} y={800} r={170} colour={g.primary} opacity={0.28 * lit} />
      <Diya x={800} y={780} t={t} scale={1.1} lit={lit} pulse={pulse} />
    </Layer>
  );
}

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, false);
  const dust = takeaway >= 0 && takeaway < 8 ? 1 - takeaway / 8 : 0;
  // The sky begins to lighten once the theme is shown again (at most a third of the way to dawn).
  const lighten = takeaway >= 0 ? 0.35 * easeInOut(progress(takeaway, 0, 12)) : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <NightRidge t={t} />
      {lighten > 0 && <GoldDawn t={t} amount={lighten} />}
      <Ledge t={t} pulse={pulse} />
      {dust > 0 && (
        <Layer depth={0.9}>
          <Particles kind="dust" t={takeaway} count={40} colour={g.highlight} opacity={0.7 * dust} area={{ x: 500, y: 200, w: 600, h: 600 }} speed={3} />
        </Layer>
      )}
    </Stage>
  );
}

// The closing animation, played by itself after Finish (13 seconds; see
// closing in day6.ts). Registered as 'n6-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = easeInOut(progress(t, 0, 5));
  const gather = easeInOut(progress(t, 3, 8));
  const ember = 1 - 0.75 * easeInOut(progress(t, 7, 9));
  const spark = progress(t, 9, 12);
  const out = fadeIn(t, 11.5, 1.5);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 6 closing">
      <NightRidge t={t} />
      <GoldDawn t={t} amount={dawn} />
      <Layer depth={0.8}>
        {/* The many lights drifting in to settle into the one diya. */}
        {GODS.map((god, i) => {
          const a = (i / GODS.length) * Math.PI * 2;
          const x = lerp(800 + Math.cos(a) * 520, 818, gather);
          const y = lerp(440 + Math.sin(a) * 280, 760, gather);
          const o = Math.min(fadeIn(t, 1 + i * 0.1, 1.5), 1 - progress(gather, 0.85, 1));
          return o > 0 ? (
            <g key={god.id} opacity={o}>
              <Glow x={x} y={y} r={24} colour={god.colour} opacity={0.6} />
              <circle cx={x} cy={y} r={3.5} fill={god.colour} />
            </g>
          ) : null;
        })}
      </Layer>
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
