// Beat 14: Side by side. Full width, over a faint night sky with the open
// hand glowing softly. Each question revealed brightens the hand a little.

import { DivineLight, SymbolIcon } from '../figures';
import { cameraFor, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { InkNight, latestCue } from './kit';

export function SideBySide({ beat, t, frozen, complete, cues }: VisualProps) {
  const last = latestCue(cues, 'question:', complete, -1);
  const since = last >= 0 && !complete ? t - cues[`question:${last}`] : 99;
  const questionPulse = since < 2 ? 1 - since / 2 : 0;
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <InkNight t={t} stars={50} />
      <Layer depth={0.4}>
        <Glow x={800} y={420} r={240 + 60 * questionPulse} colour="#E8B45A" opacity={0.1 + 0.15 * questionPulse} />
        <SymbolIcon name="abhaya" x={800} y={420} size={3} colour="#E8B45A" opacity={0.28 + 0.2 * questionPulse} />
      </Layer>
      <Layer depth={0.6}>
        <DivineLight x={800} y={800} t={t} kind="warm" size={0.35} />
      </Layer>
    </Stage>
  );
}
