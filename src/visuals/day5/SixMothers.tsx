// Beat 4: Six mothers by the river (two screens).
//
// 4.1, following the narration:
//   Sentence 0     six outline women in saris come to the riverbank; above
//                  them the six stars of the Pleiades, linked by fine lines
//   Sentence 1     they reach towards the shining child
//   Sentence 2     six small points of light open around the child (his six
//                  faces), one turned to each woman (freeze-frame)
//   Sentence 3 on  a small outline home under the six stars; the child rests there
//   Sentence 5     (the Ramayana: the Krittikas are the Pleiades) fine lines
//                  of starlight join each star to one woman
// Camera: a slow push-in.
//
// 4.2, Tamil tradition: six lotuses on the lake Saravana, each holding a
// small light; when the Devi's warm light embraces them, the six lights draw
// together into one child with six faces.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Lotus, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { ChildLight, p, River, StarCluster, starPoints } from './kit';

const c = p.n5krittikaStars;
const STARS: [number, number] = [800, 170];
const CHILD: [number, number] = [800, 690];
// The six women, in a shallow arc around the child.
const women = [-375, -225, -75, 75, 225, 375].map((dx) => ({ x: 800 + dx, y: 780 - Math.abs(dx) * 0.12 }));

// The night sky over the river, with the six stars. Shared by Beats 4 and 5.
export function KrittikaNight({ t, link = 1, bright = 1 }: { t: number; link?: number; bright?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom={c.primary} t={t} stars={80} starColour={c.secondary} />
        <StarCluster x={STARS[0]} y={STARS[1]} t={t} scale={1.6} link={link} bright={bright} colour={c.accent} />
      </Layer>
      <Layer depth={0.3}>
        <path d="M -400 640 Q 400 600 800 620 Q 1200 600 2000 640 L 2000 1200 L -400 1200 Z" fill="#141C40" />
      </Layer>
    </>
  );
}

// The Krittikas' small home: a simple outline hut under the stars.
export function Home({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} fill="rgba(8, 10, 26, 0.55)" stroke={c.highlight} strokeWidth={2} strokeLinejoin="round">
      <path d={`M ${x - 110} ${y} L ${x - 110} ${y - 90} L ${x} ${y - 160} L ${x + 110} ${y - 90} L ${x + 110} ${y} Z`} />
      <path d={`M ${x - 26} ${y} L ${x - 26} ${y - 66} Q ${x} ${y - 86} ${x + 26} ${y - 66} L ${x + 26} ${y}`} fill="#3A2A12" />
      <Glow x={x} y={y - 40} r={80} colour={c.highlight} opacity={0.35} />
    </g>
  );
}

export function SixMothers({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = cameraFor('pushIn', progress(t, 0, duration), t);

  const arrive = easeInOut(progress(t, at(0), at(0) + 5));
  const reach = easeInOut(progress(t, at(1), at(1) + 2.5));
  const faces = easeInOut(progress(t, at(2) + 1, at(2) + 5));
  const home = easeInOut(progress(t, at(3), at(3) + 5));
  const starLines = fadeIn(t, at(5), 3);

  // The child moves from the riverbank to the doorway of the home.
  const cx = CHILD[0];
  const cy = lerp(CHILD[1], 560, home);
  const stars = starPoints(STARS[0], STARS[1], 1.6);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KrittikaNight t={t} link={fadeIn(t, 0.5, 4)} bright={1 + 0.5 * starLines} />
      <Layer depth={0.35}>
        <Home x={800} y={620} opacity={home} />
      </Layer>
      <Layer depth={0.5}>
        <River y={860} t={t} colour="#2A3C78" shine={c.secondary} height={80} />
      </Layer>
      <Layer depth={0.6}>
        {/* The Ramayana: each star is one of the Krittikas. */}
        {starLines > 0 &&
          women.map((w, i) => (
            <path key={i} d={`M ${stars[i][0]} ${stars[i][1]} L ${w.x} ${lerp(w.y, 700, home) - 200}`} stroke={c.accent} strokeWidth={1} opacity={0.25 * starLines} />
          ))}
        {/* The six women, arriving at the bank, reaching towards the child,
            then gathering round the home. */}
        {women.map((w, i) => {
          const side = w.x < 800 ? -1 : 1;
          const x = lerp(lerp(w.x + side * 260, w.x, arrive), 800 + (w.x - 800) * 0.75, home);
          const y = lerp(w.y, 700, home);
          return (
            <Outline key={i} x={x} y={y} scale={0.45} head="veiled" arms={reach > 0.5 && home < 0.5 ? 'welcome' : 'heart'} lean={-side * 8 * reach * (1 - home)} colour={i % 2 ? '#C9D6F5' : c.highlight} opacity={0.85 * fadeIn(t, at(0) + i * 0.3, 2)} />
          );
        })}
      </Layer>
      <Layer depth={0.7}>
        <ChildLight x={cx} y={cy} t={t} size={1.4} faces={faces} />
        <Glow x={cx} y={cy} r={180} colour={c.secondary} opacity={0.15 + pulse * 0.05} />
        <Particles kind="fireflies" t={t} count={14} colour={c.accent} opacity={0.5} area={{ x: 300, y: 500, w: 1000, h: 300 }} />
      </Layer>
    </Stage>
  );
}

// 4.2: six babies on six lotuses in the lake Saravana, joined by Parvati's embrace.
const lotusPlaces = [-300, -180, -60, 60, 180, 300].map((dx, i) => ({ x: 800 + dx, y: 720 + (i % 2) * 30 }));

export function Saravana({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const embrace = fadeIn(t, L[1].start, 3);
  const join = easeInOut(progress(t, L[1].start + 2, L[1].start + 8));
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <KrittikaNight t={t} />
      <Layer depth={0.5}>
        {/* The lake. */}
        <ellipse cx={800} cy={740} rx={560} ry={90} fill="#22336E" opacity={0.85} />
        {lotusPlaces.map((q, i) => (
          <g key={i}>
            <Lotus x={q.x} y={q.y + 10} scale={0.9} colour="#E7C3D6" centre={c.highlight} />
            {/* A small light on each lotus, drawing in to the centre as they join. */}
            <ChildLight x={lerp(q.x, 800, join)} y={lerp(q.y - 20, 600, join)} t={t + i} size={0.45} opacity={1 - join * 0.9} />
          </g>
        ))}
      </Layer>
      <Layer depth={0.6}>
        {/* Parvati's embrace: her warm light, gathering the six into one. */}
        <g opacity={embrace}>
          <DivineLight x={800} y={560} t={t} kind="warm" size={0.8} pulse={pulse} />
        </g>
        <ChildLight x={800} y={600} t={t} size={1} faces={join} opacity={join} />
      </Layer>
    </Stage>
  );
}
