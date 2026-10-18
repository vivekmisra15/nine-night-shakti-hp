// Beat 6: Aparna, the one without leaves. (The parent bell rings at the
// start and again before sentence 1, where the fasting begins.)
//   Sentence 0     a bare peak; Parvati's flame with a faint head-and-shoulders
//                  outline within it
//   Sentence 1     the season ring: a fruit icon
//   Sentence 2     a leaf icon
//   Sentence 3     the leaf drifts away (a bead lights)
//   Sentence 4     the flame very still, a single upright line beneath it
//   Sentence 5     summer: four small fires around her, the flame unmoved (bead)
//   Sentence 6     the rains: slate rain lines on the rock (bead)
//   Sentence 7     winter: ice-blue water at her base (bead)
//   Sentence 8     saplings, outlined and watered
//   Sentence 9     outline animals lie down in pairs: lion and cow, cat and mouse
//   Sentence 10    trees fruit and flowers open
//   Sentence 11    stars wheel quickly overhead, years passing; the flame
//                  unchanged (freeze-frame)
// Camera: a very slow orbit around the peak.
// Fasting is shown only as symbols (a fruit, a leaf), never as a body.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, fadeOut, Flame, Glow, Layer, Ridge, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { Animal, BeadRing, beadsLit, Icon2, OutlineTree, Stars } from './kit';
import { seasonColours } from './palettes';

const s = palettes.n2tapasSeasons;
const FLAME = { x: 800, y: 486 };
// The bare peak she stands on.
const peak = 'M 200 1000 L 560 640 L 700 540 L 800 494 L 900 540 L 1040 640 L 1400 1000 Z';

export function Aparna({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = cameraFor('orbit', progress(t, 0, L[11].end), t);

  const fruit = window2(t, at(1), at(2) + 1.5);
  const leaf = fadeIn(t, at(2), 1.5);
  const drift = easeInOut(progress(t, at(3) + 1, at(3) + 6));
  const oneLeg = fadeIn(t, at(4), 2);
  const summer = window2(t, at(5), at(6) + 0.5);
  const rains = window2(t, at(6), at(7) + 0.5);
  const winter = window2(t, at(7), at(8) + 0.5);
  const saplings = fadeIn(t, at(8), 2);
  const grow = easeInOut(progress(t, at(8), at(10) + 4));
  const animals = fadeIn(t, at(9), 2.5);
  const bloom = fadeIn(t, at(10), 3);
  // Years passing: the stars wheel faster and faster.
  const wheel = progress(t, at(11), at(11) + 6);
  const starTurn = t * 0.4 + wheel * wheel * 160;
  const lit = beadsLit(t, 2, [at(3) + 2, at(5) + 1.5, at(6) + 1.5, at(7) + 1.5]);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={s.shadow} bottom={s.secondary} t={t} />
        <g transform={`rotate(${starTurn - t * 0.4} 800 450)`}>
          <Stars t={t} count={90} colour={s.highlight} />
        </g>
        {/* Star trails as the years pass. */}
        {wheel > 0 && (
          <g opacity={0.25 * wheel} fill="none" stroke={s.highlight} strokeWidth={1}>
            {[160, 260, 380, 520, 680].map((r, i) => (
              <path key={r} d={`M ${800 + r} 450 A ${r} ${r} 0 0 0 ${800 + r * Math.cos(-wheel * 2.5 - i * 0.2)} ${450 + r * Math.sin(-wheel * 2.5 - i * 0.2)}`} />
            ))}
          </g>
        )}
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={13} baseY={700} height={120} fill="#163024" />
      </Layer>
      <Layer depth={0.5}>
        <path d={peak} fill="#10261C" />
        <path d="M 560 640 L 700 540 L 800 494 L 900 540 L 1040 640" fill="none" stroke={s.primary} strokeWidth={2} opacity={0.25} />
        {/* Saplings she planted, growing into trees that fruit and flower. */}
        {[520, 640, 960, 1080].map((x, i) => (
          <g key={x} opacity={saplings}>
            <OutlineTree x={x} y={x < 800 ? 700 + (640 - x) * 0.4 : 700 + (x - 960) * 0.4} size={0.55 + (i % 2) * 0.1} grow={grow} bloom={bloom} />
          </g>
        ))}
        {/* Watering: a few drops falling on the saplings. */}
        {window2(t, at(8), at(9), 1) > 0 &&
          [520, 640, 960, 1080].map((x, i) => (
            <circle key={x} cx={x} cy={600 + ((t * 80 + i * 40) % 90)} r={3} fill={seasonColours.winter} opacity={0.7 * window2(t, at(8), at(9), 1)} />
          ))}
        {/* The animals at peace, lying down in pairs. */}
        <Animal kind="lion" x={440} y={790} size={1.2} opacity={animals} />
        <Animal kind="cow" x={550} y={796} size={1.2} opacity={animals} />
        <Animal kind="cat" x={1050} y={792} size={1.1} opacity={animals} />
        <Animal kind="mouse" x={1120} y={798} size={1.1} opacity={animals} />
      </Layer>
      <Layer depth={0.6}>
        {/* Summer: four small fires around her. */}
        {summer > 0 &&
          [
            [690, 560],
            [910, 560],
            [640, 610],
            [960, 610],
          ].map(([x, y], i) => (
            <g key={i} opacity={summer}>
              <Glow x={x} y={y - 16} r={60} colour={s.accent} opacity={0.4} />
              <Flame x={x} y={y} size={0.45} t={t + i} outer={s.accent} core="#FFD27A" />
            </g>
          ))}
        {/* The rains: slate lines falling on the rock. */}
        {rains > 0 && (
          <g opacity={rains} stroke={seasonColours.monsoon} strokeWidth={2} strokeLinecap="round">
            {Array.from({ length: 50 }, (_, i) => {
              const x = (i * 37) % 1200 + 200;
              const y = ((i * 71 + t * 420) % 800) - 50;
              return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 30} />;
            })}
          </g>
        )}
        {/* Winter: ice-blue water at her base. */}
        {winter > 0 && <ellipse cx={FLAME.x} cy={FLAME.y + 26} rx={110} ry={20} fill={seasonColours.winter} opacity={0.55 * winter} />}
        {/* Standing on one leg: a single upright line beneath the flame. */}
        <line x1={FLAME.x} y1={FLAME.y + 4} x2={FLAME.x} y2={FLAME.y + 40} stroke={s.highlight} strokeWidth={2} opacity={0.6 * oneLeg} />
        {/* Parvati, very still, with the faint outline of head and shoulders in her light. */}
        <DivineLight x={FLAME.x} y={FLAME.y} t={t * 0.4} kind="warm" size={0.7} pulse={pulse} />
        <DeviOutline x={FLAME.x} y={FLAME.y - 40} size={0.8} opacity={0.22 * fadeIn(t, 1, 3)} />
        {/* The season ring: fruit, then leaf (which drifts away). */}
        <Icon2 name="fruit" x={620} y={380} size={1.2} opacity={fruit} />
        <Icon2 name="leaf" x={lerp(980, 1300, drift)} y={lerp(380, 200, drift) + Math.sin(drift * 9) * 20} size={1.2} opacity={leaf * fadeOut(t, at(3) + 4, 2)} />
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={lit} t={t} />
      </Layer>
    </Stage>
  );
}
