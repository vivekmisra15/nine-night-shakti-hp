// Beat 15: Today, the rumour that keeps multiplying. Full width, over a faint
// night sky: small ember drops fall and fade before they reach the ground
// line, as the drops did in Beat 7. No people, no phones.

import { cameraFor, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { InkNight } from './kit';
import { NeverLanding } from './Theme';

export function Today({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <InkNight t={t} stars={50} />
      <Layer depth={0.6}>
        <NeverLanding t={t} count={11} />
      </Layer>
    </Stage>
  );
}
