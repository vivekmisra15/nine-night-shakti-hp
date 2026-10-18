// Beat 9: the theme, Fearlessness ("Face the dark without becoming part of
// it"). It is shown faintly behind the theme's words.
// A small steady flame in a wide dark night. Ember drops fall towards the
// ground line and fade out before they touch it (the drop that never lands),
// and the open hand glows faintly behind it all.

import { progress } from '../../engine/anim';
import { DivineLight, SymbolIcon } from '../figures';
import { cameraFor, Glow, Layer, rand, Stage } from '../shared';
import type { VisualProps } from '../types';
import { InkNight, Spark } from './kit';

// Ember drops that fall and go out just above the ground line (y = 820).
export function NeverLanding({ t, count = 7, top = 120, ground = 820 }: { t: number; count?: number; top?: number; ground?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const cycle = 7 + rand(i, 3) * 4;
        const p = ((t + rand(i, 4) * cycle) % cycle) / cycle;
        const y = top + (ground - top) * p * p;
        // Fades out over the last part of the fall, before the ground.
        const out = 1 - progress(p, 0.72, 0.9);
        return <Spark key={i} x={160 + rand(i, 5) * 1280} y={y} opacity={0.75 * out * progress(p, 0, 0.1)} />;
      })}
    </>
  );
}

export function Theme({ beat, t, frozen, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <InkNight t={t} stars={60} />
      <Layer depth={0.3}>
        <Glow x={800} y={380} r={260} colour="#E8B45A" opacity={0.08} />
        <SymbolIcon name="abhaya" x={800} y={380} size={3.4} colour="#E8B45A" opacity={0.16} />
      </Layer>
      <Layer depth={0.6}>
        <NeverLanding t={t} />
        <DivineLight x={800} y={790} t={t} kind="warm" size={0.5} pulse={pulse} />
      </Layer>
    </Stage>
  );
}
