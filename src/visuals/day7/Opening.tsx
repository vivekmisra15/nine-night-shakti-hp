// Beat 1: Before we begin, with the night's opening invocation (7 seconds).
//   0–3 s    black; the open hand (abhaya, "do not fear") glows faintly
//            for a moment and fades: the night's signature, before
//            anything else is drawn
//   3–5.5 s  a deep night sky with sparse stars over a low ridge, and a
//            small warm flame in the centre
//   5.5–7 s  the title fades in
// Then a slow push-in while the text is read.

import { mapStops } from '../../content/journey';
import { progress } from '../../engine/anim';
import { OPENING_SECONDS } from '../../engine/storyTiming';
import { DivineLight, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, H, Layer, Particles, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { InkNight } from './kit';
import { day7Palettes } from './palettes';

const n = day7Palettes.n7darkNight;
const night7 = mapStops[6];

export function Opening({ beat, t, duration, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('pushIn', progress(t, OPENING_SECONDS, duration), t);
  // The open hand: a faint glow for about two seconds.
  const hand = complete ? 0 : window2(t, 0.3, 3, 1);
  const night = complete ? 1 : fadeIn(t, 2.6, 2.2);
  const flame = complete ? 1 : fadeIn(t, 3.6, 1.6);
  const title = complete ? 1 : fadeIn(t, 5.5, 1.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#000" />
      <g opacity={night}>
        <InkNight t={t} stars={60} />
        <Layer depth={0.7}>
          <Glow x={800} y={760} r={260} colour="#F29F3D" opacity={0.18 * flame} />
          <DivineLight x={800} y={790} t={t} kind="warm" size={0.55} strength={flame} pulse={pulse} />
          <Particles kind="dust" t={t} count={14} colour={n.highlight} opacity={0.18} area={{ x: 600, y: 420, w: 400, h: 360 }} />
        </Layer>
      </g>
      {hand > 0 && (
        <g opacity={hand}>
          <Glow x={800} y={430} r={200} colour="#E8B45A" opacity={0.35} />
          <SymbolIcon name="abhaya" x={800} y={430} size={3} colour="#F2DA8F" />
        </g>
      )}
      <g opacity={title} textAnchor="middle" fill={n.highlight}>
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night7.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night7.night}: {night7.meaning}
        </text>
      </g>
    </Stage>
  );
}
