// Beat 1: Before we begin, with the night's opening invocation (7 seconds).
//   0–1 s    black, a temple bell
//   1–4 s    Night 8's pearl-white diya glows on still water under a violet
//            sky, then shrinks into a closed lotus bud of light
//   4–5.5 s  eight faint diyas glow along the far horizon (the nights so far)
//   5.5–7 s  the title fades in
// Then a slow push-in on the bud, which breathes while the text is read.

import { mapStops } from '../../content/journey';
import { easeInOut, progress } from '../../engine/anim';
import { OPENING_SECONDS } from '../../engine/storyTiming';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { LotusSeat, VioletNight } from './kit';

const night9 = mapStops[8];

export function Opening({ beat, t, duration, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('pushIn', progress(t, OPENING_SECONDS, duration), t);
  const black = complete ? 0 : 1 - fadeIn(t, 0.2, 1.4);
  // Night 8's diya becomes the bud.
  const become = complete ? 1 : easeInOut(progress(t, 2, 4.5));
  const horizon = complete ? 1 : fadeIn(t, 4, 2);
  const title = complete ? 1 : fadeIn(t, 5.5, 1.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <VioletNight t={t} />
      <Layer depth={0.2}>
        {/* Eight faint diyas along the far horizon: the nights so far. */}
        {Array.from({ length: 8 }, (_, i) => (
          <Diya key={i} x={260 + i * 154} y={636} t={t + i} scale={0.22} lit={0.55 * horizon} />
        ))}
      </Layer>
      <Layer depth={0.7}>
        {/* Night 8's pearl-white diya, shrinking away... */}
        <g opacity={1 - become}>
          <Glow x={800} y={700} r={200} colour="#FFF6E8" opacity={0.3} />
          <Diya x={800} y={740} t={t} scale={1.1 - become * 0.6} lit={1 - become} core="#FFFFFF" outer="#E9ECEF" />
        </g>
        {/* ...and becoming a closed bud of light on the water. */}
        <LotusSeat x={800} y={740} size={1.25 * become} open={0.3 + 0.05 * Math.sin(t * 0.6)} t={t} opacity={become} glow={1 + pulse * 0.4} />
        <ellipse cx={800} cy={760} rx={120} ry={10} fill="#F4B6C2" opacity={0.18 * become} />
        <Particles kind="dust" t={t} count={16} colour="#FFF6E8" opacity={0.25 * become} area={{ x: 600, y: 420, w: 400, h: 320 }} />
      </Layer>
      {/* The title. */}
      <g opacity={title} textAnchor="middle" fill="#FFF6E8">
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night9.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night9.night}: {night9.meaning}
        </text>
      </g>
      <rect width={W} height={H} fill="#000" opacity={black} />
    </Stage>
  );
}
