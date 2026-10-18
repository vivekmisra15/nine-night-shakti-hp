// Beats 2–3: A name that stung, and "What would you do?"
//
// Beat 2: a pleasant place in the mountains at evening. Shiva is a cool
// silver light and the Devi a warm flame, side by side, beside a small pool.
//   Sentence 1   ("Kali"; the narration reads the bracketed note and
//                "Once, he says..." as one sentence) Shiva's light flickers
//                lightly, playful
//   Sentence 3   ("She did not hear it as one") the Devi's flame dips, and
//                her reflection in the pool trembles (freeze-frame)
//   Sentence 4   her flame leans away and flares sharply once
//
// Beat 3: the same place, breathing. A small lamp lights for each option
// chosen. At "what happened", her flame travels away down a path towards a
// distant moonlit coast, with small companion lights following.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, Layer, LightTrail, mixCam, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, KailasaBackdrop, linesOf } from '../day1/common';
import { WaterReflection } from './kit';

const k = palettes.kailasa;

// The meadow and the pool, with both lights. `devi` places her flame.
function Meadow({ t, shiva, devi, tremble, pulse, coast = 0 }: { t: number; shiva: number; devi: { x: number; y: number; strength: number; size?: number }; tremble: number; pulse: number; coast?: number }) {
  return (
    <>
      <KailasaBackdrop t={t} snow={false} />
      <Layer depth={0.25}>
        {/* Far away to the right, a glint of moonlit sea (the coast she will go to). */}
        <g opacity={coast}>
          <rect x={1300} y={640} width={400} height={8} fill={k.primary} opacity={0.35} />
          <Glow x={1460} y={640} r={160} colour={k.primary} opacity={0.25} />
        </g>
      </Layer>
      <Layer depth={0.85}>
        {/* A soft meadow at evening. */}
        <path d="M -200 770 Q 400 700 800 720 Q 1200 700 1800 770 L 1800 1100 L -200 1100 Z" fill="#26325E" />
        {/* The small pool in front of them. */}
        <ellipse cx={880} cy={810} rx={300} ry={40} fill="#3A4C80" opacity={0.85} />
        {/* Her reflection in the pool (it fades once she has walked away). */}
        <WaterReflection x={devi.x} waterY={790} t={t} colour={k.accent} length={50} tremble={tremble} opacity={0.9 * Math.min(1, devi.strength) * (devi.x < 1100 ? 1 : 0)} />
        <WaterReflection x={640} waterY={790} t={t} colour="#DCE6FF" length={40} opacity={0.6} />
        <DivineLight x={640} y={680} t={t} kind="silver" size={0.85} strength={shiva} pulse={pulse} />
        <DivineLight x={devi.x} y={devi.y} t={t} kind="warm" size={devi.size ?? 0.8} strength={devi.strength} pulse={pulse} />
      </Layer>
    </>
  );
}

export function NameThatStung({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const time = complete ? L[5].end + 2 : t;

  // Still, then a slow drift once she answers.
  const cam = mixCam(cameraFor('still', 0, time), cameraFor('drift', 0, time), fadeIn(time, at(4), 4));

  // Shiva's playful flicker while he jokes.
  const joking = time >= at(1) + 5 && time < at(3);
  const shiva = joking ? 1 + 0.25 * Math.sin(time * 9) * Math.sin(time * 2.3) : 1;
  // Her flame dips at sentence 3, then flares once and leans away at 4.
  const dip = fadeIn(time, at(3), 1.2);
  const flare = Math.max(0, 1 - Math.abs(time - (at(4) + 0.8)) / 0.7);
  const lean = easeInOut(progress(time, at(4), at(4) + 2.5));
  const strength = 1 - 0.35 * dip + 0.35 * lean + 0.8 * flare;
  const tremble = time >= at(3) ? 1 - 0.6 * progress(time, at(3) + 6, L[5].end + 2) : 0;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Meadow t={time} shiva={shiva} devi={{ x: lerp(960, 1010, lean), y: 700, strength }} tremble={tremble} pulse={pulse} />
    </Stage>
  );
}

const awayPath = 'M 1010 700 Q 1150 670 1260 660 Q 1380 650 1460 640';

export function WhatWouldYouDo({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const revealAge = cueAge(cues, 'reveal', t, complete);
  const walk = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 0, 12));
  const cam = cameraFor('pan', walk * 0.6, t);
  // Her flame along the path towards the coast, small companions behind.
  const px = lerp(1010, 1460, walk);
  const py = 700 - Math.sin(walk * Math.PI * 0.9) * 40 - walk * 30;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Meadow
        t={t}
        shiva={1}
        devi={walk === 0 ? { x: 1010, y: 700, strength: 1.05 + 0.08 * Math.sin(t * 0.8) } : { x: px, y: py, strength: 0.9, size: lerp(0.8, 0.35, walk) }}
        tremble={0.15}
        pulse={pulse}
        coast={0.4 + 0.6 * walk}
      />
      <Layer depth={0.85}>
        {walk > 0 && <LightTrail d={awayPath} amount={walk} colour={k.accent} t={t} width={2} opacity={0.3} />}
        {/* Her companions: small warm lights following her. */}
        {walk > 0 &&
          [0.08, 0.15, 0.22].map((lag, i) => {
            const w = Math.max(0, walk - lag);
            return <circle key={i} cx={lerp(1010, 1460, w)} cy={700 - Math.sin(w * Math.PI * 0.9) * 40 - w * 30 + 20} r={4} fill="#FFE3B0" opacity={0.8 * fadeIn(revealAge, 1 + i, 1)} />;
          })}
        {/* One small lamp for each option, lit when it is chosen. */}
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} x={110 + i * 80} y={880} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
    </Stage>
  );
}
