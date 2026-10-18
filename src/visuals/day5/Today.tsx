// Beat 15: Today, "The news at home". A house at night with one lit window
// downstairs and a smaller one upstairs, where a younger child's lamp is
// still on. No people: just the ordinary warmth of a home, and a question.

import { cameraFor, Glow, Layer, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { palettes } from '../palettes';

const r = palettes.reflective;

export function Today({ beat, t, frozen }: VisualProps) {
  const flicker = 0.9 + 0.1 * Math.sin(t * 0.7);
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom={r.secondary} t={t} stars={40} starColour={r.highlight} />
      </Layer>
      <Layer depth={0.3}>
        {/* Neighbouring roofs, dark. */}
        <path d="M -400 640 L 200 640 L 300 560 L 400 640 L 1200 640 L 1300 540 L 1420 640 L 2000 640 L 2000 1200 L -400 1200 Z" fill="#0F1430" />
      </Layer>
      <Layer depth={0.55}>
        {/* The house. */}
        <path d="M 560 760 L 560 440 L 800 290 L 1040 440 L 1040 760 Z" fill="#1A1F3D" />
        {/* Downstairs: the grown-ups' window, warm. */}
        <Glow x={700} y={630} r={200} colour={r.accent} opacity={0.3 * flicker} />
        <rect x={630} y={580} width={140} height={110} fill="#F5C97A" opacity={0.85 * flicker} />
        <path d="M 700 580 L 700 690 M 630 635 L 770 635" stroke="#1A1F3D" strokeWidth={6} />
        {/* Upstairs: a smaller window, a younger child's lamp still on. */}
        <Glow x={900} y={470} r={120} colour="#F2B5A7" opacity={0.25} />
        <rect x={865} y={440} width={70} height={64} fill="#F7D9B0" opacity={0.75} />
        <rect x={-400} y={760} width={2400} height={400} fill="#0A0E22" />
      </Layer>
    </Stage>
  );
}
