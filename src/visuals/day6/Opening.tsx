// Beat 1: Before we begin, with the series invocation (7 seconds).
//   0–1.5 s  black, a soft temple bell
//   1.5–3 s  a single diya lights at the centre
//   3–5.5 s  the camera pulls back: the diya sits below a low ridge under
//            the stars
//   5.5–7 s  the title fades in
// Then, while the text is read, faint points of coloured light appear one by
// one across the sky: the gods' lights, scattered and not yet joined.

import { mapStops } from '../../content/journey';
import { easeInOut, lerp, progress } from '../../engine/anim';
import { OPENING_SECONDS } from '../../engine/storyTiming';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { Black, GODS, NightRidge } from './kit';

const g = palettes.n6gatheredLight;
const night6 = mapStops[5];

export function Opening({ beat, t, duration, frozen, complete, pulse }: VisualProps) {
  const lit = complete ? 1 : fadeIn(t, 1.5, 1.2);
  const pull = complete ? 1 : easeInOut(progress(t, 3, 5.5));
  const zoom = lerp(2.4, 1, pull);
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, OPENING_SECONDS, duration), t);
  const black = complete ? 0 : 1 - fadeIn(t, 0.2, 1.6);
  const title = complete ? 1 : fadeIn(t, 5.5, 1.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <g transform={`translate(800 760) scale(${zoom}) translate(-800 -760)`}>
        <NightRidge t={t} />
        <Layer depth={0.1}>
          {/* The gods' scattered lights, each its own colour, appearing in turn. */}
          {GODS.slice(0, 10).map((god, i) => {
            const on = complete ? 1 : fadeIn(t, OPENING_SECONDS + 2 + i * 1.6, 2.5);
            const x = 160 + ((i * 523) % 1280);
            const y = 120 + ((i * 197) % 300);
            return (
              <g key={god.id} opacity={on * (0.55 + 0.25 * Math.sin(t * 0.7 + i))}>
                <Glow x={x} y={y} r={34} colour={god.colour} opacity={0.6} />
                <circle cx={x} cy={y} r={3.5} fill={god.colour} />
              </g>
            );
          })}
        </Layer>
        <Layer depth={1}>
          {/* A stone ledge and the diya, with its reflection. */}
          <path d="M 560 790 Q 800 770 1040 790 L 1060 900 L 540 900 Z" fill="#0E1128" />
          <Glow x={800} y={790} r={170} colour={g.primary} opacity={0.28 * lit} />
          <Diya x={800} y={780} t={t} scale={1.1} lit={lit} pulse={pulse} />
          <ellipse cx={818} cy={812} rx={24} ry={6} fill={g.primary} opacity={0.3 * lit} />
          <Particles kind="dust" t={t} count={16} colour={g.highlight} opacity={0.15 * lit} area={{ x: 600, y: 400, w: 400, h: 400 }} />
        </Layer>
      </g>
      <g opacity={title} textAnchor="middle" fill={g.highlight}>
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night6.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night6.night}: {night6.meaning}
        </text>
      </g>
      <Black opacity={black} />
    </Stage>
  );
}
