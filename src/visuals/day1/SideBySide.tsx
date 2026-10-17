// Beat 14: Side by side.
// A split frame: the diya on the mountain on the left, a candle on the
// dinner table on the right, and a thin dark gap between them that is never
// bridged. Each lights its own half; they never mix. Each question that is
// revealed gives a soft pulse on both flames.

import { palettes } from '../palettes';
import { cameraFor, Candle, Diya, Glow, H, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop, latestCue } from './common';
import { DinnerRoom } from './MargesDinner';

const m = palettes.hogwartsDinner;

export function SideBySide({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('drift', 0, t);
  const last = latestCue(cues, 'question:', complete, -1);
  const since = last >= 0 && !complete ? t - cues[`question:${last}`] : 99;
  const questionPulse = since < 2 ? 1 - since / 2 : 0;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <defs>
        <clipPath id="side-left">
          <rect x={0} y={0} width={792} height={H} />
        </clipPath>
        <clipPath id="side-right">
          <rect x={808} y={0} width={792} height={H} />
        </clipPath>
      </defs>
      <g clipPath="url(#side-left)">
        <g transform="translate(-400 0)">
          <KailasaBackdrop t={t} />
          <Layer depth={1}>
            <Glow x={800} y={780} r={160 + questionPulse * 80} colour="#F29F3D" opacity={0.3 + questionPulse * 0.3} />
            <Diya x={800} y={780} t={t} scale={1.1} pulse={pulse + questionPulse} />
          </Layer>
        </g>
      </g>
      <g clipPath="url(#side-right)">
        <g transform="translate(400 0)" style={{ filter: 'saturate(0.8)' }}>
          <DinnerRoom t={t} tension={0} wave={0} />
          <Layer depth={0.9}>
            <Glow x={800} y={500} r={140 + questionPulse * 80} colour={m.highlight} opacity={0.2 + questionPulse * 0.3} />
            <Candle x={800} y={500} t={t} scale={1.2} outer={m.primary} />
          </Layer>
        </g>
      </g>
      {/* The gap that is never bridged. */}
      <rect x={792} y={0} width={16} height={H} fill="#05060C" />
    </Stage>
  );
}
