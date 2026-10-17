// Beat 9: the theme, Rootedness ("What you are rooted in can survive what
// you lose"). It is shown faintly behind the theme's words.
// A single diya on the mountain; from it, fine roots of golden light grow
// slowly down into the rock and spread, steady under the night sky.

import { easeOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Diya, Glow, Layer, LightTrail, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';

const k = palettes.kailasa;

// The roots, as curves spreading down from the diya at (800, 470).
const roots = [
  'M 800 480 C 790 560 740 620 660 690 S 520 790 430 860',
  'M 800 480 C 812 570 860 630 940 700 S 1080 800 1180 870',
  'M 800 480 C 800 580 796 680 790 900',
  'M 800 480 C 770 540 700 560 600 600 S 440 640 360 700',
  'M 800 480 C 830 540 900 560 1000 600 S 1160 640 1250 690',
  'M 760 640 C 720 700 700 760 640 820',
  'M 860 650 C 900 720 930 780 990 830',
];

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('drift', 0, t);
  // The roots grow over about 12 seconds, one after another.
  const grow = (i: number) => (complete ? 1 : easeOut(progress(t, 1 + i * 0.8, 9 + i * 0.8)));
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={k.shadow} bottom={k.secondary} t={t} stars={70} starColour={k.highlight} />
      </Layer>
      <Layer depth={0.3}>
        <Ridge seed={3} baseY={900} height={120} fill="#2B3A6E" peak={{ x: 800, h: 520 }} snow={k.primary} />
      </Layer>
      <Layer depth={0.5}>
        {roots.map((d, i) => (
          <LightTrail key={i} d={d} amount={grow(i)} colour="#E8B45A" t={t + i} width={i < 5 ? 3 : 2} opacity={0.55} />
        ))}
        <Glow x={800} y={460} r={220} colour={k.accent} opacity={0.3 + pulse * 0.1} />
        <Diya x={800} y={470} t={t} scale={0.9} pulse={pulse} />
        <Particles kind="dust" t={t} count={18} colour={k.highlight} opacity={0.3} area={{ x: 600, y: 200, w: 400, h: 300 }} />
      </Layer>
    </Stage>
  );
}
