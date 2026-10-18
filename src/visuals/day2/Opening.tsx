// Beat 1: Before we begin.
// Night 1's last frame, continued: Kailasa at night, Shiva's silver light
// still on the high peak, Parvati's warm flame far below on the mountain.
// The bead ring (the night's signature) fades in, unlit. A slow pull-back.

import { progress } from '../../engine/anim';
import { DivineLight } from '../figures';
import { cameraFor, fadeIn, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop } from '../day1/common';
import { BeadRing } from './kit';

export function Opening({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 36), t);
  const ring = complete ? 1 : fadeIn(t, 6, 4);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KailasaBackdrop t={t} />
      <Layer depth={0.15}>
        {/* Shiva, deep in meditation on the high peak: a small, still silver light. */}
        <DivineLight x={800} y={175} t={t} kind="silver" size={0.45} />
      </Layer>
      <Layer depth={0.7}>
        {/* Parvati, the daughter of the mountain: a warm flame far below. */}
        <DivineLight x={430} y={790} t={t} kind="warm" size={0.45} pulse={pulse} />
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={0} t={t} opacity={0.75 * ring} />
      </Layer>
    </Stage>
  );
}
