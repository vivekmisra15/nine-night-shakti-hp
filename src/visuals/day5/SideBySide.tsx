// Beat 14: Side by side. A faint night sky with the six stars and the
// spark between them, drifting slowly behind the questions. Each question
// opened brightens one more star.

import { cameraFor, Glow, Layer, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue } from '../day1/common';
import { p, Spark, StarCluster } from './kit';

const c = p.n5krittikaStars;

export function SideBySide({ beat, t, frozen, complete, cues }: VisualProps) {
  const opened = latestCue(cues, 'question:', complete, 4) + 1;
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom={c.primary} t={t} stars={90} starColour={c.secondary} />
      </Layer>
      <Layer depth={0.2}>
        <StarCluster x={620} y={360} t={t} scale={2.2} link={1} bright={0.8 + opened * 0.15} colour={c.accent} />
        <Glow x={1060} y={520} r={260} colour="#F29F3D" opacity={0.15} />
        <Spark x={1060} y={520} t={t} size={1.3} />
      </Layer>
    </Stage>
  );
}
