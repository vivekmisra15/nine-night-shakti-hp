// Beat 12: Side by side. A faint night sky with the warm point of light on
// the left and a candle on the right: side by side, never merged (a Devi's
// light and a kindness in a story are different kinds of thing). A soft
// bell-like glow passes between them as each question opens.

import { cameraFor, Candle, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue } from '../day1/common';
import { DarkSky, LowRidges, Stars, WarmPoint } from './kit';

export function SideBySide({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const asked = latestCue(cues, 'question:', complete, 5) + 1;
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <DarkSky t={t} warmth={0.1} />
        <Stars t={t} count={70} opacity={0.7} />
      </Layer>
      <Layer depth={0.3}>
        <LowRidges fill="#0B0F22" far="#151A33" />
      </Layer>
      <Layer depth={0.5}>
        {/* A dark gap keeps the two lights apart. */}
        <WarmPoint x={560} y={420} t={t} size={1.1} pulse={pulse} />
        <Glow x={1040} y={470} r={160} colour="#E39A45" opacity={0.18 + 0.03 * asked} />
        <Candle x={1040} y={470} t={t} scale={1.3} outer="#E39A45" />
      </Layer>
    </Stage>
  );
}
