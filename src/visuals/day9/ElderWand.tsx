// Beats 10–11: the Elder Wand, and "Think it through" after it.
// Abstract only: places, objects and light. No people, faces, crests or
// film imagery. (The player adds the letterbox bars.)
//
// Beat 10, following the retelling sentence by sentence:
//   Sentence 0   bright mist, the faint arches of a station, a bench, a lamp
//   Sentences 1–2 a pale flame flickers low, then steadies (the confession)
//   Sentence 3   darkness clears to a grey dawn; a thin wand of light arcs
//                through the air and settles in the centre of the frame
//   Sentence 4   a wooden desk in a round, shadowed office; a broken wand of
//                light lies in two pieces; one touch of the bright wand, and
//                the pieces join with a small glow (slow motion; freeze-frame)
//   Sentence 5   a white marble tomb by dark water; the bright wand is laid
//                down, and its glow goes quiet
//   Sentences 6–7 the tomb holds under a paling sky

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { cameraFor, type Cam, fadeIn, Flame, Glow, Haze, Layer, mixCam, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, line, linesOf, Water, WandOfLight } from './kit';
import { day9Palettes } from './palettes';

const k = day9Palettes.n9kingsCross;

// The bright, misty place like a station: faint arches, a bench, a lamp.
function Mist({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={k.highlight} bottom={k.secondary} t={t} />
      </Layer>
      <Layer depth={0.2}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${-100 + i * 420} 760 L ${-100 + i * 420} 380 Q ${110 + i * 420} 120 ${320 + i * 420} 380 L ${320 + i * 420} 760`} fill="none" {...line(k.secondary, 3)} opacity={0.5} />
        ))}
        <Haze y={300} colour={k.highlight} opacity={0.7} t={t} />
      </Layer>
      <Layer depth={0.5}>
        {/* A bench, and a lamp with an amber glow. */}
        <path d="M 400 760 L 640 760 M 410 760 L 410 800 M 630 760 L 630 800 M 400 720 L 640 720" fill="none" {...line('#8A98A8', 3)} opacity={0.7} />
        <path d="M 1180 820 L 1180 460 M 1160 460 L 1200 460" fill="none" {...line('#8A98A8', 3)} opacity={0.7} />
        <Glow x={1180} y={450} r={110} colour={k.accent} opacity={0.6} />
        <Haze y={720} colour={k.highlight} opacity={0.8} t={t + 5} />
      </Layer>
    </>
  );
}

// The round, shadowed office with a wooden desk.
export function Office({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#0E1018" bottom="#1E2232" t={t} />
      </Layer>
      <Layer depth={0.2}>
        {/* The curved wall, with faint shelves following its curve. */}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M -200 ${200 + i * 90} Q 800 ${120 + i * 90} 1800 ${200 + i * 90}`} fill="none" {...line('#5A5060', 1.5)} opacity={0.4} />
        ))}
        <Glow x={300} y={300} r={240} colour="#E8B45A" opacity={0.12} />
        <Glow x={1300} y={300} r={240} colour="#E8B45A" opacity={0.12} />
      </Layer>
      <Layer depth={0.6}>
        <path d="M 260 640 L 1340 640 L 1460 760 L 140 760 Z" fill="#3A2C22" {...line('#8A6A4A', 1.5)} />
        <path d="M 140 760 L 1460 760 L 1460 800 L 140 800 Z" fill="#2A2018" />
      </Layer>
    </>
  );
}

// The white marble tomb by dark water, under a paling sky.
function Tomb({ t, pale }: { t: number; pale: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#121C3D" bottom={pale > 0.5 ? '#6A7A92' : '#2A3456'} t={t} stars={20} starColour="#DCE6FF" />
        <Glow x={800} y={620} r={700} colour="#DCE6FF" opacity={0.25 * pale} />
      </Layer>
      <Layer depth={0.3}>
        <Water y={620} t={t} colour="#0A1022" shimmer="#DCE6FF" />
      </Layer>
      <Layer depth={0.6}>
        <path d="M 600 720 L 1000 720 L 1000 600 L 600 600 Z" fill="#E9ECEF" fillOpacity={0.12} {...line('#F4F6FA', 2)} />
        <path d="M 580 600 L 1020 600 L 1000 570 L 600 570 Z" fill="#E9ECEF" fillOpacity={0.18} {...line('#F4F6FA', 2)} />
        <path d="M 560 760 Q 800 740 1040 760" fill="none" {...line('#5A6A80', 1.5)} />
      </Layer>
    </>
  );
}

export function ElderWand({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? L[L.length - 1].end + 5 : t;

  const toDawn = fadeIn(T, at(3) - 0.5, 2);
  const toDesk = fadeIn(T, at(4) - 0.8, 1.5);
  const toTomb = fadeIn(T, at(5), 2.5);

  // Drift through the mist; push in on the desk.
  let cam: Cam = cameraFor('drift', 0, T);
  cam = mixCam(cam, cameraFor('pushIn', progress(T, at(4), at(5)), T), toDesk);
  cam = mixCam(cam, cameraFor('still', 0, T), toTomb);

  // The pale flame: low and flickering, then steady.
  const steady = progress(T, at(1) + 2, at(2) + 3);
  const flicker = lerp(0.35 + 0.25 * Math.abs(Math.sin(T * 5.3)), 0.9, steady);

  // The wand of light arcing in, and settling horizontal in the centre.
  const arc = easeOut(progress(T, at(3) + 0.5, at(3) + 5));
  const cx = lerp(160, 800, arc);
  const cy = lerp(760, 450, arc) - Math.sin(arc * Math.PI) * 180;
  const angle = lerp(-1.2, 0, arc);
  const half = 130;

  // The mending: the bright wand touches the broken one, and it joins.
  const touch = easeInOut(progress(T, at(4) + 0.5, at(4) + 2));
  const join = easeInOut(progress(T, at(4) + 2, at(4) + 3.2));
  const mendGlow = Math.max(0, 1 - Math.abs(T - (at(4) + 2.6)) / 1.6);

  // Laying the wand down on the tomb; its glow goes quiet.
  const lay = easeInOut(progress(T, at(5) + 1, at(5) + 4));
  const quiet = lerp(1, 0.35, progress(T, at(5) + 3.5, at(5) + 7));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toDawn < 1 && (
        <g opacity={1 - toDawn}>
          <Mist t={T} />
          <Layer depth={0.6}>
            <g opacity={fadeIn(T, at(1), 1.5)}>
              <Flame x={800} y={760} size={1.6} t={T} height={flicker} core="#FFFFFF" outer={k.accent} pulse={pulse} />
            </g>
          </Layer>
        </g>
      )}
      {toDawn > 0 && toDesk < 1 && (
        <g opacity={toDawn * (1 - toDesk)}>
          <Layer depth={0.05}>
            <Sky top="#2A3038" bottom="#A9B6C4" t={T} />
          </Layer>
          <Layer depth={0.6}>
            <WandOfLight x1={cx - Math.cos(angle) * half} y1={cy - Math.sin(angle) * half} x2={cx + Math.cos(angle) * half} y2={cy + Math.sin(angle) * half} glow={1} />
          </Layer>
        </g>
      )}
      {toDesk > 0 && toTomb < 1 && (
        <g opacity={toDesk * (1 - toTomb)}>
          <Office t={T} />
          <Layer depth={0.6}>
            {/* His own broken wand, in two pieces, joining. */}
            <WandOfLight x1={lerp(560, 640, join)} y1={lerp(705, 700, join)} x2={lerp(720, 800, join)} y2={lerp(690, 700, join)} glow={0.2 + join * 0.5} colour="#E8C57A" />
            <WandOfLight x1={lerp(860, 800, join)} y1={lerp(715, 700, join)} x2={lerp(1010, 960, join)} y2={700} glow={0.2 + join * 0.5} colour="#E8C57A" />
            <Glow x={800} y={700} r={160} colour="#FFF6E0" opacity={0.8 * mendGlow} />
            {/* The Elder Wand, bright, touching it once. */}
            <WandOfLight x1={lerp(1300, 1060, touch)} y1={lerp(420, 560, touch)} x2={lerp(1060, 820, touch)} y2={lerp(500, 684, touch)} glow={1} />
          </Layer>
        </g>
      )}
      {toTomb > 0 && (
        <g opacity={toTomb}>
          <Tomb t={T} pale={progress(T, at(5), at(7) + 6)} />
          <Layer depth={0.6}>
            <WandOfLight x1={680} y1={lerp(420, 566, lay)} x2={920} y2={lerp(400, 566, lay)} glow={quiet} />
          </Layer>
        </g>
      )}
    </Stage>
  );
}

// Beat 11: the desk with two wands, held faintly behind the questions: his
// own mended wand, and the Elder Wand laid beside it. The light warms a
// little as each rung of the ladder opens.
export function WandOnDesk({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 40, zoom: 1.2, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(2px) saturate(0.7)' }}>
        <Office t={20} />
        <Layer depth={0.6}>
          <WandOfLight x1={560} y1={700} x2={880} y2={700} glow={0.4} colour="#E8C57A" />
          <WandOfLight x1={940} y1={690} x2={1220} y2={660} glow={0.7 + rungs * 0.05} />
          <Glow x={800} y={600} r={400} colour="#E8B45A" opacity={0.06 * rungs} />
        </Layer>
      </g>
    </Stage>
  );
}
