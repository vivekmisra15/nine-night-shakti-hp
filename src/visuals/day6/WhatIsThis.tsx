// Beat 5: "What is this?" (a choice).
// Her light stands high on the ridge and pulses with her roar: soft rings
// spread out from it and the mountains tremble a little. Far below, on the
// stolen throne, a smoke shape stirs. A small lamp lights for each option
// chosen. At the reveal, the smoke surges up the slope with ember points (his
// army), and her light grows until it fills the frame from top to bottom.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { type Cam, Diya, fadeIn, Glow, Layer, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { Throne } from './kit';

const b = palettes.n6battleShadow;

export function WhatIsThis({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const surge = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 8));
  const grow = reveal < 0 ? 0 : easeInOut(progress(reveal, 2, 10));
  // The roar: a ring every 4 seconds, and a small tremble with each.
  const roarAge = t % 4;
  const tremble = roarAge < 1 ? Math.sin(t * 50) * 3 * (1 - roarAge) : 0;
  const cam: Cam = { x: 0, y: lerp(0, -20, grow), zoom: 1.03 + Math.sin(t / 7) * 0.008, rot: 0 };
  const deviX = lerp(560, 640, grow);
  const deviY = lerp(420, 640, grow);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={b.secondary} bottom={b.primary} t={t} stars={40} starColour="#E8DDF0" />
      </Layer>
      <g transform={`translate(${tremble} 0)`}>
        <Layer depth={0.2}>
          <Ridge seed={51} baseY={600} height={160} fill="#2A2038" peak={{ x: 560, h: 120 }} />
        </Layer>
        <Layer depth={0.35}>
          {/* The rings of her roar spreading through the sky. */}
          {[0, 1, 2].map((k) => {
            const age = (t + k * 1.3) % 4;
            return <circle key={k} cx={deviX} cy={deviY - 80} r={60 + age * 260} fill="none" stroke={b.accent} strokeWidth={2} opacity={0.35 * (1 - age / 4) * (1 - grow * 0.5)} />;
          })}
          <Glow x={deviX} y={deviY - 80} r={lerp(260, 620, grow)} colour={b.accent} opacity={0.4 + pulse * 0.05} />
          <DivineLight x={deviX} y={deviY} t={t} kind="warm" size={lerp(1.1, 3.2, grow)} pulse={pulse} />
        </Layer>
        <Layer depth={0.5}>
          <Ridge seed={54} baseY={780} height={110} fill="#1A1426" />
          {/* Far below: the stolen throne, and the smoke on it stirring. */}
          <Throne x={1260} y={740} scale={0.45} colour="#8E7A5A" opacity={0.8} />
          <SmokeShape x={1260 + Math.sin(t * 0.9) * 8} y={680} t={t} size={0.7 + 0.05 * Math.sin(t * 1.4)} seed={3} colour="#0C0914" />
        </Layer>
        <Layer depth={0.7}>
          {/* At the reveal: his whole army surges up the slope. */}
          {surge > 0 &&
            Array.from({ length: 9 }, (_, i) => {
              const p = easeInOut(progress(surge, i * 0.05, 0.6 + i * 0.05));
              return (
                <SmokeShape key={i} x={lerp(1350 + (i % 3) * 90, 900 + (i % 3) * 100, p)} y={lerp(860, 700 - (i % 4) * 40, p)} t={t} size={0.6 + (i % 3) * 0.15} seed={i + 5} opacity={0.8 * fadeIn(surge, i * 0.05, 0.2)} colour="#0C0914" />
              );
            })}
          <path d="M -400 880 Q 800 820 2000 880 L 2000 1300 L -400 1300 Z" fill="#0E0A16" />
          {/* One small lamp for each option, lit when it is chosen. */}
          {[0, 1, 2, 3].map((i) => (
            <Diya key={i} x={110 + i * 80} y={880} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
          ))}
        </Layer>
      </g>
    </Stage>
  );
}
