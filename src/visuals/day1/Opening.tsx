// Beat 1: Before we begin, with the night's opening invocation (7 seconds).
//   0–1.5 s  black, a temple bell
//   1.5–3 s  a single diya ignites, its reflection on stone
//   3–5.5 s  the camera pulls back and up: the diya sits below a snow
//            mountain under the stars; a nine-petal mandala turns once
//   5.5–7 s  the title fades in
// Then a slow push-in on the diya while the text is read.

import { mapStops } from '../../content/journey';
import { easeInOut, lerp, progress } from '../../engine/anim';
import { OPENING_SECONDS } from '../../engine/storyTiming';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Mandala, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop } from './common';

const k = palettes.kailasa;
const night1 = mapStops[0];

export function Opening({ beat, t, duration, frozen, pulse }: VisualProps) {
  const lit = fadeIn(t, 1.5, 1.2);
  // The pull-back: from close on the diya (zoom 2.6) to the wide shot.
  const pull = easeInOut(progress(t, 3, 5.5));
  const zoom = lerp(2.6, 1, pull);
  const after = progress(t, OPENING_SECONDS, duration);
  const cam = cameraFor('pushIn', after, t);
  const black = 1 - fadeIn(t, 0.2, 1.6);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {/* Zoom about the diya for the invocation. */}
      <g transform={`translate(800 760) scale(${zoom}) translate(-800 -760)`}>
        <KailasaBackdrop t={t} />
        <Layer depth={0.2}>
          <Mandala x={800} y={300} r={240} turns={pull + t / 60} colour={k.highlight} opacity={0.08 * fadeIn(t, 3, 1.5) * (1 + pulse * 0.5)} petals={9} />
        </Layer>
        <Layer depth={0.8}>
          {/* Nine faint diyas in a ring, for the nine nights, glowing in turn. */}
          {Array.from({ length: 9 }, (_, i) => {
            const angle = Math.PI * (1.08 + (0.84 * i) / 8);
            const glow = 0.25 + 0.25 * Math.max(0, Math.sin(t * 0.4 - i * 0.7));
            return <Diya key={i} x={800 + Math.cos(angle) * 420} y={835 + Math.sin(angle) * 60} t={t + i} scale={0.32} lit={glow * fadeIn(t, 5, 2)} />;
          })}
        </Layer>
        <Layer depth={1}>
          {/* The stone ledge and the diya, with its reflection. */}
          <path d="M 560 790 Q 800 770 1040 790 L 1060 900 L 540 900 Z" fill="#141A33" />
          <Glow x={800} y={800} r={160} colour={k.accent} opacity={0.25 * lit} />
          <Diya x={800} y={780} t={t} scale={1.1} lit={lit} pulse={pulse} />
          <ellipse cx={818} cy={812} rx={24} ry={6} fill={k.accent} opacity={0.3 * lit} />
          <Particles kind="dust" t={t} count={18} colour={k.highlight} opacity={0.15 * lit} area={{ x: 600, y: 400, w: 400, h: 400 }} />
        </Layer>
      </g>
      {/* The title. */}
      <g opacity={fadeIn(t, 5.5, 1.5)} textAnchor="middle" fill={k.highlight}>
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night1.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night1.night}: {night1.meaning}
        </text>
      </g>
      <rect width={W} height={H} fill="#000" opacity={black} />
    </Stage>
  );
}
