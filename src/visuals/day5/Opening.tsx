// Beat 1: Before we begin.
// Night sky over Kailasa's ridge. Last night's warm egg of light (Kushmanda)
// glows high in the sky, then slowly gathers itself down into a single small
// spark resting in a warm gold glow: the spark that carries tonight's story.
// A gentle camera drift; the final frame holds the spark.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { cameraFor, Glow, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop } from '../day1/common';
import { Spark } from './kit';

export function Opening({ beat, t: time, frozen, complete, pulse }: VisualProps) {
  const t = complete ? 40 : time;
  const cam = cameraFor('drift', 0, t);
  // The egg of light (0–9 s), shrinking into the spark (9–16 s).
  const egg = 1 - easeInOut(progress(t, 8, 15));
  const settle = easeInOut(progress(t, 9, 16));
  const sy = lerp(230, 330, settle);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KailasaBackdrop t={t} snow={false} />
      <Layer depth={0.25}>
        {/* Kushmanda's cosmic egg: a warm oval of light. */}
        {egg > 0.01 && (
          <g opacity={egg}>
            <Glow x={1180} y={230} r={320} colour="#F7B733" opacity={0.4} />
            <ellipse cx={1180} cy={230} rx={70 + 6 * Math.sin(t)} ry={95 + 6 * Math.sin(t)} fill="#FFE3A3" opacity={0.55} />
            <ellipse cx={1180} cy={230} rx={40} ry={56} fill="#FFF4D6" opacity={0.7} />
          </g>
        )}
        {/* The spark that remains, resting in a warm gold glow. */}
        <Glow x={1180} y={sy} r={220} colour="#F29F3D" opacity={0.3 * settle + pulse * 0.05} />
        <Spark x={1180} y={sy} t={t} size={1.2} opacity={settle} />
      </Layer>
      <Layer depth={0.7}>
        <Particles kind="dust" t={t} count={18} colour="#FFF4D6" opacity={0.3} area={{ x: 900, y: 100, w: 600, h: 400 }} />
      </Layer>
    </Stage>
  );
}
