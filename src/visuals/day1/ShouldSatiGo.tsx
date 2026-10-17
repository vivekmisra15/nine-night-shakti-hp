// Beat 4: Should Sati go? (a choice)
// Kailasa at dusk. Shiva's silver light brightens gently as he warns her.
// Two paths pull apart: one down the mountain to the glowing palace, one
// staying by the fire. A small lamp lights for each option chosen. When the
// learner reveals what happened, Sati's flame travels down the valley path,
// while Shiva's light stays where it is.

import { easeInOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight } from '../figures';
import { cameraFor, Diya, Glow, Layer, LightTrail, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, KailasaBackdrop } from './common';

const k = palettes.kailasa;
const valleyPath = 'M 900 800 Q 1100 760 1180 700 Q 1300 620 1460 640';

export function ShouldSatiGo({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const revealAge = cueAge(cues, 'reveal', t, complete);
  const walk = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 0, 12));
  const cam = cameraFor('crane', walk, t);

  // Where Sati's light is along the path: a simple curve walk.
  const sx = 900 + walk * 560;
  const sy = 800 - Math.sin(walk * Math.PI * 0.8) * 120 - walk * 60;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KailasaBackdrop t={t} />
      <Layer depth={0.35}>
        {/* The palace glow far below in the valley. */}
        <Glow x={1460} y={660} r={260} colour="#F5A623" opacity={0.45} />
        <rect x={1420} y={610} width={80} height={50} fill="#B8862B" opacity={0.8} />
      </Layer>
      <Layer depth={0.85}>
        <path d="M -200 880 Q 400 790 900 810 Q 1300 820 1800 900 L 1800 1100 L -200 1100 Z" fill="#E8ECF4" opacity={0.85} />
        <LightTrail d={valleyPath} amount={1} colour={k.accent} t={t} width={3} opacity={0.35} />
        <Glow x={520} y={820} r={200} colour={k.accent} opacity={0.35} />
        <Diya x={520} y={840} t={t} scale={0.8} pulse={pulse} />
        {/* Shiva: a silver light that brightens gently as he warns her. */}
        <DivineLight x={660} y={720} t={t} kind="silver" size={0.75} strength={revealAge < 0 ? 1 + 0.25 * Math.sin(t * 1.2) ** 2 : 0.85} pulse={pulse} />
        {walk === 0 ? (
          <DivineLight x={880} y={790} t={t} kind="warm" size={0.65} pulse={pulse} />
        ) : (
          // Sati's flame, small, on her way down the valley.
          <DivineLight x={sx} y={sy - 20} t={t} kind="warm" size={0.4} />
        )}
        {/* One small lamp for each option, lit when it is chosen. */}
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} x={110 + i * 80} y={880} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
    </Stage>
  );
}
