// Beat 6: The gourd and the golden egg.
//   Sentence 0   dusk: an ash gourd in fine gold line on a low stone ledge,
//                with a diya beside it (an offering)
//   Sentence 1   the gourd's outline glows softly
//   Sentence 2   the camera drifts up into the sky above the ledge
//   Sentence 3   a golden embryo of light (a smaller, deeper-gold cosmic egg)
//                glows high in the sky
//   Sentence 4   the egg's light becomes the sun's disc, rising behind the
//                ridge
//   Sentence 5   the sun's warm point, the egg-glow and the gourd's glow line
//                up in one vertical column of light; the final frame holds
// Camera: a gentle drift, then a crane up, then a slow push in on the column.

import { useId } from 'react';
import { easeInOut, lerp, progress } from '../../engine/anim';
import { type Cam, cameraFor, Diya, fadeIn, Glow, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { AshGourd, CosmicEgg, ge, Stars, SunDisc } from './kit';

// A soft vertical column of light at x, from top to bottom.
function LightColumn({ x, top, bottom, opacity }: { x: number; top: number; bottom: number; opacity: number }) {
  const id = useId();
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={ge.highlight} stopOpacity={0} />
          <stop offset="0.5" stopColor={ge.highlight} stopOpacity={0.55} />
          <stop offset="1" stopColor={ge.highlight} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={x - 46} y={top} width={92} height={bottom - top} fill={`url(#${id})`} />
      <rect x={x - 1.5} y={top} width={3} height={bottom - top} fill="#FFFBEF" opacity={0.6} />
    </g>
  );
}

export function GourdAndEgg({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;

  const glow = fadeIn(t, at(1), 3);
  const up = easeInOut(progress(t, at(2), at(3) + 2));
  const egg = fadeIn(t, at(3), 3);
  // The last sentence (5): "Kushmanda's story joins these old ideas...".
  const last = L.length - 1;
  const sun = easeInOut(progress(t, at(4), at(last)));
  const column = easeInOut(progress(t, at(last), at(last) + 5));

  // Drift, then look up into the sky (near layers slide down), then come
  // back down a little and push in on the column of light.
  const drift = cameraFor('drift', 0, t);
  const look: Cam = { x: 0, y: 320, zoom: 1.04, rot: 0 };
  const column_: Cam = { x: 0, y: 10, zoom: 1.07, rot: 0 };
  let cam = mixCam(drift, look, up);
  cam = mixCam(cam, column_, column);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.03}>
        {/* Dusk: violet above, the last warm light low down. */}
        <Sky top={ge.shadow} bottom={ge.secondary} t={t} />
        <Stars t={t} count={60} opacity={0.6} reveal={0.5 + 0.5 * up} />
      </Layer>
      <Layer depth={0.08}>
        {/* The golden embryo, high in the sky; its light passes to the sun. */}
        <CosmicEgg x={800} y={210} size={0.55} bright={egg * (1 - sun * 0.6)} t={t} gold="#D99A2B" />
      </Layer>
      <Layer depth={0.2}>
        {/* The sun, rising behind the ridge. */}
        {sun > 0 && <SunDisc x={800} y={lerp(720, 470, sun)} r={95} t={t} corona={sun} point={sun} pulse={pulse} />}
      </Layer>
      <Layer depth={0.35}>
        <Ridge seed={51} baseY={720} height={110} fill="#2A2440" />
        <Haze y={700} colour={ge.secondary} opacity={0.4} t={t} />
      </Layer>
      <Layer depth={0.5}>
        {/* The column of light joining the sun, the egg and the gourd. */}
        <LightColumn x={800} top={150} bottom={820} opacity={column} />
      </Layer>
      <Layer depth={0.9}>
        {/* The low stone ledge, the ash gourd and the diya beside it. */}
        <path d="M 300 800 Q 800 770 1300 800 L 1360 1000 L 240 1000 Z" fill="#2A2538" />
        <path d="M 300 800 Q 800 770 1300 800" stroke="#5A5070" strokeWidth={3} fill="none" />
        <AshGourd x={790} y={784} scale={1.3} glow={glow} />
        <Glow x={1040} y={782} r={130} colour={ge.accent} opacity={0.3} />
        <Diya x={1040} y={792} t={t} scale={0.85} pulse={pulse} />
        <Particles kind="dust" t={t} count={14} colour={ge.highlight} opacity={0.3 * glow} area={{ x: 600, y: 500, w: 400, h: 320 }} />
      </Layer>
    </Stage>
  );
}
