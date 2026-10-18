// Beat 13: Today, the new person at lunch. A faint night sky over a low
// ridge, with a few small diya points scattered across the land, and one a
// little apart from the others: a small warmth that could reach it.

import { cameraFor, Diya, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { DarkSky, LowRidges, Stars } from './kit';

const diyas = [
  { x: 380, y: 800 },
  { x: 470, y: 820 },
  { x: 560, y: 795 },
  { x: 650, y: 818 },
  { x: 1180, y: 805 }, // the one a little apart
];

export function Today({ beat, t, frozen, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <DarkSky t={t} warmth={0.1} />
        <Stars t={t} count={80} opacity={0.7} />
      </Layer>
      <Layer depth={0.3}>
        <LowRidges fill="#0B0F22" far="#151A33" />
      </Layer>
      <Layer depth={0.7}>
        {diyas.map((d, i) => (
          <g key={i}>
            <Glow x={d.x} y={d.y - 10} r={80} colour="#F5A623" opacity={0.2} />
            <Diya x={d.x} y={d.y} t={t + i * 1.7} scale={0.45} pulse={pulse} lit={i === 4 ? 0.7 : 1} />
          </g>
        ))}
      </Layer>
    </Stage>
  );
}
