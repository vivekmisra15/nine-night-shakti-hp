// Beat 13: Side by side.
// A split frame: on the left, the faint gathered gold light with the gods'
// colours round it; on the right, a faint hall of floating candles. A thin
// dark gap between them is never bridged. Each question revealed gives a soft
// pulse on both lights.

import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { Candle, cameraFor, Glow, H, Layer, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { GODS } from './kit';

const g = palettes.n6gatheredLight;
const hall = palettes.greatHall;

export function SideBySide({ beat, t, frozen, cues, pulse }: VisualProps) {
  const cam = cameraFor('drift', 0, t);
  // The latest question asked brings a soft pulse that fades over 3 seconds.
  const ages = Object.keys(cues).filter((k) => k.startsWith('question:')).map((k) => cueAge(cues, k, t, false));
  const last = ages.length ? Math.min(...ages) : -1;
  const glow = last >= 0 && last < 3 ? 1 - last / 3 : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <defs>
        <clipPath id="n6-left">
          <rect x={-200} y={-200} width={980} height={H + 400} />
        </clipPath>
        <clipPath id="n6-right">
          <rect x={820} y={-200} width={980} height={H + 400} />
        </clipPath>
      </defs>
      <rect x={-200} y={-200} width={2000} height={H + 400} fill="#05060C" />
      <g clipPath="url(#n6-left)" opacity={0.7}>
        <Layer depth={0.05}>
          <Sky top={g.shadow} bottom={g.secondary} t={t} stars={40} starColour={g.highlight} />
        </Layer>
        <Layer depth={0.4}>
          <Glow x={400} y={420} r={300} colour={g.primary} opacity={0.3 + 0.2 * glow} />
          <DivineLight x={400} y={520} t={t} kind="warm" size={1.2} strength={1 + 0.3 * glow} pulse={pulse} />
          {GODS.slice(0, 8).map((god, i) => {
            const a = (i / 8) * Math.PI * 2 + t * 0.05;
            return <circle key={god.id} cx={400 + Math.cos(a) * 230} cy={440 + Math.sin(a) * 170} r={4} fill={god.colour} opacity={0.7} />;
          })}
        </Layer>
      </g>
      <g clipPath="url(#n6-right)" opacity={0.7}>
        <Layer depth={0.05}>
          <Sky top={hall.shadow} bottom={hall.primary} t={t} stars={30} starColour={hall.accent} />
        </Layer>
        <Layer depth={0.4}>
          <Glow x={1200} y={420} r={300} colour={hall.secondary} opacity={0.15 + 0.2 * glow} />
          {Array.from({ length: 15 }, (_, i) => (
            <Candle key={i} x={900 + (i % 5) * 150} y={260 + Math.floor(i / 5) * 140 + Math.sin(t * 0.6 + i) * 8} t={t + i} scale={0.5} />
          ))}
        </Layer>
      </g>
    </Stage>
  );
}
