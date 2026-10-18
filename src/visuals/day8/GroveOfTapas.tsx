// Beat 4: The grove of tapas.
// The same small grove at Prabhasa, a linga drawn as a simple gold outline
// stone, and the Devi's flame beside it: always still, always at a distance.
//   Sentence 2   the flame stands narrow and upright
//   Sentence 3   summer: a blazing sun, and five small fires ring the flame
//   Sentence 4   the rains: soft lines of rain
//   Sentence 5   early winter: the flame stands in still water, its
//                reflection unbroken
//   Sentence 6   the four seasons cycle once more, quickly, behind the
//                unmoving flame (slow motion), then the sun again
// Camera: still, then a slow pull back.

import { lerp, progress } from '../../engine/anim';
import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { FiveFires, Linga, mix, Rain, Tree, WaterReflection } from './kit';

const p = palettes.n8tapasSeasons;

// How much of each season is showing (0 to 1 each).
interface Seasons {
  sun: number;
  rain: number;
  winter: number;
}

// The four seasons cycle quickly from `start`, 2.2 seconds each.
function cycle(t: number, start: number): Seasons | null {
  const phase = (t - start) / 2.2;
  if (phase < 0 || phase >= 4) return null;
  const i = Math.floor(phase);
  const blend = Math.min(1, (phase - i) * 3); // a quick cross-fade into each
  const order: (keyof Seasons)[] = ['sun', 'rain', 'winter', 'sun'];
  const s: Seasons = { sun: 0, rain: 0, winter: 0 };
  s[order[i]] = blend;
  if (i > 0) s[order[i - 1]] = Math.max(s[order[i - 1]], 1 - blend);
  return s;
}

export function GroveOfTapas({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const time = complete ? L[7].end + 2 : t;

  // The seasons, one sentence each, then the quick cycle.
  let s: Seasons = {
    sun: fadeIn(time, at(3), 1.5) * (1 - fadeIn(time, at(4), 1.5)),
    rain: fadeIn(time, at(4), 1.5) * (1 - fadeIn(time, at(5), 1.5)),
    winter: fadeIn(time, at(5), 1.5) * (1 - fadeIn(time, at(6), 1)),
  };
  s = cycle(time, at(6)) ?? (time >= at(6) ? { sun: 0.6, rain: 0, winter: 0 } : s);

  const cam = mixCam(cameraFor('still', 0, time), cameraFor('pullBack', progress(time, at(6), L[7].end + 2), time), fadeIn(time, at(6), 2));

  // The sky's colour follows the season.
  const skyTop = mix(mix(mix('#1A1A14', '#C9782E', s.sun), '#3A4048', s.rain), '#2A3A52', s.winter);
  const skyBottom = mix(mix(mix('#4A4A38', '#F2C66A', s.sun), '#6B7480', s.rain), '#8FA2B8', s.winter);
  // The flame narrows to stand upright from sentence 2.
  const upright = fadeIn(time, at(2), 2);
  const fx = 900;
  const fy = 720;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={skyTop} bottom={skyBottom} t={time} stars={Math.round(40 * (1 - Math.max(s.sun, s.rain, s.winter)))} starColour={p.highlight} />
        {/* The summer sun. */}
        <g opacity={s.sun}>
          <Glow x={1200} y={200} r={300} colour="#FFE3A3" opacity={0.6} />
          <circle cx={1200} cy={200} r={60} fill="#FFF4D6" />
        </g>
      </Layer>
      <Layer depth={0.2}>
        {/* The sea beyond the grove. */}
        <rect x={-400} y={560} width={2400} height={60} fill={mix('#2B3F66', '#8FA2B8', s.winter)} opacity={0.6} />
        <Haze y={600} colour={p.highlight} opacity={0.12} t={time} />
      </Layer>
      <Layer depth={0.45}>
        <rect x={-400} y={600} width={2400} height={500} fill={mix('#2A2A1E', '#5A4A2A', s.sun * 0.6)} />
        {/* The small grove: a few soft trees. */}
        {[340, 520, 1180, 1360].map((x, i) => (
          <Tree key={x} x={x} y={640 + (i % 2) * 20} scale={0.9 + (i % 2) * 0.2} crown={mix(p.primary, '#9AA2A8', s.winter * 0.6)} t={time} />
        ))}
      </Layer>
      <Layer depth={0.7}>
        {/* Winter: still water round her, the reflection unbroken. */}
        <g opacity={s.winter}>
          <ellipse cx={fx} cy={fy + 20} rx={280} ry={40} fill="#5A7090" opacity={0.7} />
          <WaterReflection x={fx} waterY={fy + 6} t={time} colour="#F29F3D" length={70} />
        </g>
        <Linga x={700} y={735} scale={1.1} />
        <FiveFires x={fx} y={fy + 20} t={time} on={s.sun * fadeIn(time, at(3) + 0.5, 1)} pulse={pulse} />
        {/* The Devi's flame: still and steady, small, at a distance. */}
        <DivineLight x={fx} y={fy} t={time} kind="warm" size={lerp(0.7, 0.55, upright)} strength={lerp(1, 1.25, upright)} pulse={pulse * 0.4} />
      </Layer>
      <Layer depth={0.9}>
        <Rain t={time} amount={s.rain} />
        {s.sun > 0.2 && <Particles kind="dust" t={time} count={16} colour="#FFE3A3" opacity={0.3 * s.sun} area={{ x: 600, y: 400, w: 600, h: 300 }} />}
      </Layer>
    </Stage>
  );
}
