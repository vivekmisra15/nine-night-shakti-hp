// Beat 14: Today. A faint night sky over a ridge, with the lit windows of a
// small town below: an ordinary evening, close to home. No people.

import { cameraFor, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { NightRidge } from './kit';

export function Today({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <NightRidge t={t} dim={0.8} />
      <Layer depth={0.6}>
        {/* A row of simple houses, a few windows lit. */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = 120 + i * 145;
          const y = 800 - (i % 3) * 14;
          return (
            <g key={i}>
              <path d={`M ${x - 50} ${y + 100} L ${x - 50} ${y} L ${x} ${y - 40} L ${x + 50} ${y} L ${x + 50} ${y + 100} Z`} fill="#0A0C1C" />
              {i % 3 !== 1 && (
                <>
                  <Glow x={x} y={y + 30} r={40} colour="#F5A623" opacity={0.3 + 0.1 * Math.sin(t * 0.5 + i)} />
                  <rect x={x - 12} y={y + 20} width={24} height={20} fill="#F5C66B" opacity={0.75} />
                </>
              )}
            </g>
          );
        })}
      </Layer>
    </Stage>
  );
}
