// Beat 12 (gentle alternative): The Grim.
// Abstract only (the player adds letterbox bars): fog, lamps, roots, a
// boarded room and wands as lines of light. No person is ever drawn; the
// only shapes are a dog's shadow and a small scurrying shadow.
//   Sentence 0   a large dark four-legged shadow at the edge of a lamp's
//                light, in fog
//   Sentence 1   a tunnel of roots under a twisted tree, leading to a
//                boarded-up room lit by one shaft of moonlight
//   Sentence 2   in the room, the shadow rises and dissolves into a tall dim
//                column of lamplight
//   Sentence 3   a raised wand of light, trembling
//   Sentence 4   a second lamp glows in the doorway, and a small scurrying
//                shadow is caught in a ring of light
//   Sentence 5   the wand lowers; the two lights draw close and warm
//   Sentence 6   two wands of light rise towards the small shadow, and a
//                third, smaller wand moves between them (slow motion)
//   Sentence 7   the wands lowered, warm light in the boarded room (freeze)

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { cameraFor, fadeIn, Glow, H, Haze, Layer, mixCam, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { FaintStars, linesOf } from './kit';
import { day7Palettes } from './palettes';

const g = day7Palettes.n7grimNight;

// A wand as a thin line of light from (x, y), at an angle (degrees, 0 = up).
function Wand({ x, y, angle, length = 150, opacity = 1, tremble = 0, t }: { x: number; y: number; angle: number; length?: number; opacity?: number; tremble?: number; t: number }) {
  if (opacity <= 0.01) return null;
  const a = ((angle + Math.sin(t * 30) * 2.5 * tremble) * Math.PI) / 180;
  const x2 = x + Math.sin(a) * length;
  const y2 = y - Math.cos(a) * length;
  return (
    <g opacity={opacity}>
      <path d={`M ${x} ${y} L ${x2} ${y2}`} stroke={g.highlight} strokeWidth={10} strokeLinecap="round" opacity={0.2} />
      <path d={`M ${x} ${y} L ${x2} ${y2}`} stroke={g.highlight} strokeWidth={3} strokeLinecap="round" />
      <Glow x={x2} y={y2} r={40} colour={g.accent} opacity={0.6} />
    </g>
  );
}

// The dog's shadow: a soft, dark four-legged shape, blurred into the fog.
function DogShadow({ x, y, opacity }: { x: number; y: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} style={{ filter: 'blur(5px)' }} transform={`translate(${x} ${y}) scale(1.6)`}>
      <path d="M -90 -40 Q -60 -70 20 -64 Q 60 -96 84 -78 Q 104 -66 92 -52 Q 80 -44 68 -46 Q 60 -30 56 -20 L 58 40 L 44 40 L 40 -8 L -50 -6 L -56 40 L -70 40 L -72 -10 Q -100 -16 -116 -44 Q -100 -36 -90 -40 Z" fill="#07090F" />
    </g>
  );
}

// Fog and a lamp on a post, with the shadow at the edge of its light.
function FogScene({ t, dog }: { t: number; dog: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={g.shadow} />
        <FaintStars t={t} count={14} seed={15} colour={g.highlight} />
      </Layer>
      <Layer depth={0.4}>
        <rect x={-400} y={720} width={W + 800} height={600} fill="#10141F" />
        {/* The lamp. */}
        <rect x={496} y={300} width={8} height={430} fill="#2A2E38" />
        <Glow x={500} y={300} r={300} colour={g.accent} opacity={0.45} />
        <Glow x={500} y={720} r={260} colour={g.accent} opacity={0.2} />
        <rect x={484} y={282} width={32} height={30} rx={4} fill={g.accent} opacity={0.9} />
        {/* Pale fog behind the shadow, so its shape shows at the edge of the light. */}
        <Glow x={980} y={640} r={340} colour={g.primary} opacity={0.35} />
        <DogShadow x={960} y={700} opacity={dog} />
      </Layer>
      <Layer depth={0.7}>
        <Haze y={560} colour={g.primary} opacity={0.25} t={t} />
        <Haze y={800} colour={g.primary} opacity={0.3} t={t + 4} />
      </Layer>
    </>
  );
}

// A tunnel of roots under a twisted tree, leading to a small lit room.
function Tunnel({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#0A0C12" />
        {/* The far end: the boarded room, with a shaft of moonlight. */}
        <rect x={740} y={380} width={120} height={140} fill="#1A2236" />
        <path d="M 760 380 L 840 380 L 820 520 L 780 520 Z" fill={g.highlight} opacity={0.25 + 0.05 * wobble(t, 0.5)} />
      </Layer>
      <Layer depth={0.45}>
        {/* Rings of earth narrowing towards the room. */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={800} cy={450} rx={180 + i * 170} ry={140 + i * 130} fill="none" stroke="#1E1A16" strokeWidth={70 - i * 10} />
        ))}
      </Layer>
      <Layer depth={0.75}>
        {/* Roots reaching down through the tunnel. */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = 120 + i * 150;
          return <path key={i} d={`M ${x} -50 C ${x + 40} 120 ${x - 30} 220 ${x + 20 + (i % 3) * 30} ${300 + (i % 4) * 60}`} stroke="#3A2E22" strokeWidth={10 - (i % 3) * 2} fill="none" strokeLinecap="round" />;
        })}
      </Layer>
    </>
  );
}

// The boarded room in the shack: boards over the window, one moon shaft.
function BoardedRoom({ warm }: { warm: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#14110E" />
        {/* The boarded window, and the shaft of moonlight through it. */}
        <rect x={680} y={110} width={240} height={200} fill="#1A2236" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={660} y={140 + i * 60} width={280} height={26} fill="#3A2E22" transform={`rotate(${i % 2 ? 6 : -5} 800 ${150 + i * 60})`} />
        ))}
        <path d="M 720 300 L 880 300 L 1000 760 L 620 760 Z" fill={g.highlight} opacity={0.08} />
        {/* Bare floorboards. */}
        <rect x={-400} y={760} width={W + 800} height={600} fill="#2A2018" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M ${-200 + i * 180} 760 L ${-400 + i * 220} 1100`} stroke="#1A140F" strokeWidth={3} />
        ))}
        {/* The doorway on the right. */}
        <rect x={1240} y={330} width={180} height={430} fill="#0B0907" />
        <Glow x={800} y={560} r={600} colour={g.accent} opacity={0.15 * warm} />
      </Layer>
    </>
  );
}

export function TheGrim({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[Math.min(i, L.length - 1)].start;
  const time = complete ? L[7].end + 2 : t;

  const toTunnel = fadeIn(time, at(1), 2.5);
  const toRoom = fadeIn(time, at(2) - 1, 2.5);
  let cam = cameraFor('drift', 0, time);
  cam = mixCam(cam, cameraFor('crane', progress(time, at(1), at(2)), time), toTunnel * (1 - toRoom));
  cam = mixCam(cam, cameraFor('pushIn', progress(time, at(2), L[7].end), time), toRoom);

  // The room's moments.
  const rise = easeInOut(progress(time, at(2) + 1, at(2) + 6));
  const wandUp = fadeIn(time, at(3), 1.2);
  const lower = easeInOut(progress(time, at(5), at(5) + 3));
  const door = fadeIn(time, at(4), 2);
  const ring = fadeIn(time, at(4) + 3, 1.5);
  const close = easeInOut(progress(time, at(5) + 1, at(5) + 5));
  const twoWands = easeInOut(progress(time, at(6), at(6) + 2));
  const between = easeInOut(progress(time, at(6) + 2, at(6) + 5));
  const settle = easeInOut(progress(time, at(7), at(7) + 3));
  const warm = Math.max(close, settle);
  // The two lamplights (Sirius's column and Lupin's lamp) draw closer.
  const c1 = lerp(1000, 900, close);
  const c2 = lerp(1330, 1060, close);
  const scurry = 640 + Math.sin(time * 3) * 20;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toTunnel < 1 && <FogScene t={time} dog={fadeIn(time, 0.5, 3)} />}
      {toTunnel > 0 && toRoom < 1 && (
        <g opacity={toTunnel}>
          <Tunnel t={time} />
        </g>
      )}
      {toRoom > 0 && (
        <g opacity={toRoom}>
          <BoardedRoom warm={warm} />
          <Layer depth={0.5}>
            {/* The shadow rises and dissolves into a tall dim column of lamplight. */}
            <Glow x={1000} y={660} r={260} colour={g.primary} opacity={0.25 * (1 - rise)} />
            <DogShadow x={1000} y={740} opacity={1 - rise} />
            <g opacity={rise}>
              <Glow x={c1} y={480} r={220} colour={g.accent} opacity={0.3 + 0.15 * warm} />
              <rect x={c1 - 34} y={240} width={68} height={500} rx={34} fill={g.accent} opacity={0.14 + 0.1 * warm} style={{ filter: 'blur(8px)' }} />
            </g>
            {/* The second lamp, in the doorway, drawing closer. */}
            <g opacity={door}>
              <Glow x={c2} y={470} r={200} colour={g.accent} opacity={0.35 + 0.15 * warm} />
              <rect x={c2 - 12} y={455} width={24} height={30} rx={4} fill={g.accent} />
            </g>
            {/* The small scurrying shadow, caught in a ring of light. */}
            <g opacity={door}>
              <ellipse cx={scurry} cy={800} rx={26} ry={10} fill="#07090F" style={{ filter: 'blur(2px)' }} />
              <ellipse cx={640} cy={804} rx={80} ry={22} fill="none" stroke={g.highlight} strokeWidth={3} opacity={0.6 * ring} />
            </g>
            {/* Harry's wand: raised and trembling, then lowered. */}
            <Wand x={360} y={720} angle={lerp(35, 110, lower)} opacity={wandUp} tremble={1 - lower} t={time} />
            {/* Two wands rise towards the small shadow; a third, smaller one moves between. */}
            <Wand x={c1 - 50} y={640} angle={lerp(200, 245, twoWands) - 60 * settle} opacity={twoWands} t={time} length={170} />
            <Wand x={c2 - 40} y={620} angle={lerp(200, 240, twoWands) - 60 * settle} opacity={twoWands} t={time} length={170} />
            <Wand x={lerp(360, 760, between)} y={760} angle={lerp(70, 10, between) + 80 * settle} opacity={between} t={time} length={110} />
          </Layer>
          <Layer depth={0.8}>
            <Haze y={720} colour={g.primary} opacity={0.12} t={time} />
          </Layer>
        </g>
      )}
    </Stage>
  );
}

// The boarded room at the end, warm and calm (used behind Beat 13 when the
// family chose this scene). `glow` (0 to 1) brightens the lamp.
export function WarmRoom({ t, glow = 0 }: { t: number; glow?: number }) {
  return (
    <>
      <BoardedRoom warm={1} />
      <Layer depth={0.5}>
        <Glow x={980} y={470} r={240 + 60 * glow} colour={g.accent} opacity={0.4 + 0.2 * glow} />
        <rect x={968} y={455} width={24} height={30} rx={4} fill={g.accent} />
        <Haze y={720} colour={g.primary} opacity={0.12} t={t} />
      </Layer>
    </>
  );
}
