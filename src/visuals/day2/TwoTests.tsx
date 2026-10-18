// Beats 7 and 8: Two tests, and "How should Parvati answer the stranger?"
//
// Beat 7:
//   Sentences 0–1  the gods feel the heat: a shimmer rises from the peak
//   Sentence 2     seven topknot outlines (the sages) arrive in a row
//   Sentences 3–5  they speak, gesturing
//   Sentences 6–8  her flame flares bright as she laughs, steady as a mountain
//   Sentence 9     the sages bow and leave (a bead lights)
//   Sentence 10    an old ascetic arrives with an umbrella and a staff; a faint
//                  silver edge to his line is the only hint of who he is
//   Sentence 11    her flame bows in welcome
//   Sentence 12    Vijaya, a veiled outline, beside her
//   13–17          the ascetic's gestures sweep; the flame does not move
//   Sentence 18    a jewel and a piece of glass, side by side (freeze-frame)
// Camera: a pan between the sages and the flame, then a low angle on the ascetic.
//
// Beat 8 (a choice): the frozen last frame of Beat 7. At the reveal her flame
// rises and turns away; the ascetic's outline dissolves upwards into Shiva's
// silver light, which bows to her flame; the two lights stand together, the
// sky cools to Kailasa's indigo, and a bead lights.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, fadeOut, H, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, linesOf } from '../day1/common';
import { BeadRing, beadsLit, Icon2, OutlineTree } from './kit';

const h = palettes.n2hermitage;
const k = palettes.kailasa;
const FLAME = { x: 960, y: 740 };

interface HermitageState {
  t: number;
  pulse: number;
  shimmer: number; // the heat of her tapas, rising
  sages: number; // 0 not yet come, 1 arrived, 2 gone
  sagesTalk: number; // 0 to 1, gesturing
  sagesBow: number; // 0 to 1
  laugh: number; // 0 to 1, her flame flaring
  ascetic: number; // 0 to 1, walking in
  asceticSweep: boolean;
  welcome: number; // 0 to 1, her flame bowing
  vijaya: number;
  emblems: number; // the jewel and the glass
  reveal: number; // Beat 8: 0 to 1, the ascetic becomes Shiva's light
  lit: number; // beads lit
}

// The hermitage at twilight, with everything placed by its state.
function Hermitage(s: HermitageState) {
  const { t } = s;
  const sageIn = easeInOut(Math.min(1, s.sages));
  const sageOut = easeInOut(Math.max(0, s.sages - 1));
  const ax = lerp(-80, 560, easeInOut(s.ascetic));
  // Beat 8: the flame rises and turns away; Shiva's light comes to stand beside it.
  const turn = easeInOut(progress(s.reveal, 0, 0.35));
  const rise = easeInOut(progress(s.reveal, 0.25, 0.65));
  const bowTo = easeInOut(progress(s.reveal, 0.6, 0.85)) * (1 - easeInOut(progress(s.reveal, 0.85, 1)));
  const fx = FLAME.x + 40 * turn;
  const shivaX = lerp(ax, FLAME.x - 150, easeInOut(progress(s.reveal, 0.45, 0.8)));
  const shivaY = lerp(560, 640, easeInOut(progress(s.reveal, 0.45, 0.8))) + 30 * bowTo;
  const toKailasa = easeInOut(progress(s.reveal, 0.4, 1));
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={h.shadow} bottom={h.primary} t={t} stars={40} starColour={h.highlight} />
        <g opacity={toKailasa}>
          <Sky top={k.shadow} bottom={k.secondary} t={t} stars={60} starColour={k.highlight} />
        </g>
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={17} baseY={600} height={150} fill="#22304E" peak={{ x: 1000, h: 200 }} snow={h.highlight} />
        {/* The heat of her tapas, rising from the peak as a shimmer. */}
        {s.shimmer > 0 &&
          Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M ${880 + i * 40} 300 q 12 -40 0 -80 q -12 -40 0 -80`} fill="none" stroke="#FFE9C2" strokeWidth={2} opacity={0.25 * s.shimmer * (0.5 + 0.5 * Math.sin(t * 2 + i))} transform={`translate(0 ${-((t * 30 + i * 20) % 60)})`} />
          ))}
      </Layer>
      <Layer depth={0.4}>
        <Haze y={700} colour={h.secondary} opacity={0.15} t={t} />
        <path d="M -400 1100 L -400 820 Q 800 760 2000 820 L 2000 1100 Z" fill="#162238" />
        {[120, 260, 1320, 1470].map((x, i) => (
          <OutlineTree key={x} x={x} y={812} size={0.9 + (i % 2) * 0.2} colour={h.secondary} />
        ))}
      </Layer>
      <Layer depth={0.7}>
        {/* The seven sages, in a row. */}
        {sageIn > 0 &&
          Array.from({ length: 7 }, (_, i) => {
            const x = lerp(-300 - i * 70, 120 + i * 85, sageIn) - sageOut * 700;
            const talking = s.sagesTalk > 0 && s.sagesBow === 0 && Math.sin(t * 1.4 + i * 1.3) > 0.3;
            return (
              <Outline key={i} x={x} y={860} scale={0.48} head="topknot" arms={s.sagesBow > 0 ? 'anjali' : talking ? 'sweep' : 'rest'} headTilt={s.sagesBow * 18} colour="#D9C08A" opacity={0.85 * (1 - sageOut)} />
            );
          })}
        {/* The old ascetic, with his umbrella and staff. A faint silver edge
            under the gold line is the only hint that he is Shiva. */}
        {s.ascetic > 0 && (
          <g opacity={1 - easeInOut(progress(s.reveal, 0.2, 0.6))} transform={`translate(0 ${-140 * easeInOut(progress(s.reveal, 0.2, 0.6))})`}>
            <Outline x={ax} y={866} scale={0.66} head="topknot" arms={s.asceticSweep ? 'sweep' : 'rest'} colour="#DCE6FF" opacity={0.35} />
            <Outline x={ax} y={862} scale={0.66} head="topknot" arms={s.asceticSweep ? 'sweep' : 'rest'} colour="#E8B45A" />
            <Icon2 name="umbrella" x={ax - 50} y={640} size={1.1} />
            <Icon2 name="staff" x={ax - 34} y={790} size={1.6} />
          </g>
        )}
        {/* Vijaya, Parvati's friend. */}
        <Outline x={1110} y={866} scale={0.6} head="veiled" arms="anjali" colour="#F2B5A7" opacity={s.vijaya} />
      </Layer>
      <Layer depth={0.75}>
        {/* Shiva's own silver light, rising from where the ascetic stood. */}
        {s.reveal > 0.2 && (
          <g opacity={easeInOut(progress(s.reveal, 0.2, 0.55))}>
            <DivineLight x={shivaX} y={shivaY} t={t} kind="silver" size={0.75} pulse={s.pulse} />
          </g>
        )}
        {/* Parvati: the flame, unmoved by the words. */}
        <g transform={`translate(${fx} ${FLAME.y - 120 * rise}) translate(${-fx} ${-FLAME.y})`}>
          <DivineLight x={fx} y={FLAME.y + 26 * s.welcome} t={t} kind="warm" size={0.7} strength={1 + 0.7 * s.laugh} pulse={s.pulse} />
        </g>
        <Particles kind="fireflies" t={t} count={14} colour="#FFE9C2" opacity={0.4} area={{ x: 200, y: 500, w: 1200, h: 300 }} />
      </Layer>
      <Layer depth={0.8}>
        {/* "Why trade a jewel for a piece of glass?" */}
        <g opacity={s.emblems}>
          <Icon2 name="jewel" x={720} y={340} size={1.6} colour="#FFE9C2" />
          <Icon2 name="shard" x={880} y={340} size={1.6} colour="#9FB0C8" />
        </g>
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={s.lit} t={t} y={866} rx={150} ry={14} opacity={0.75} />
      </Layer>
    </>
  );
}

export function TwoTests({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const pan = cameraFor('pan', progress(t, at(2), at(10)), t);
  const low = cameraFor('lowAngle', progress(t, at(10), L[18].end), t);
  const cam = mixCam(pan, low, fadeIn(t, at(10), 3));
  const state: HermitageState = {
    t,
    pulse,
    shimmer: fadeIn(t, 0.5, 2) * fadeOut(t, at(2) + 2, 2),
    sages: progress(t, at(2), at(2) + 5) + progress(t, at(9) + 2, at(9) + 6),
    sagesTalk: fadeIn(t, at(3), 0.5),
    sagesBow: easeInOut(progress(t, at(9), at(9) + 2)),
    laugh: fadeIn(t, at(6), 1) * fadeOut(t, L[8].end, 2),
    ascetic: progress(t, at(10), at(10) + 6),
    asceticSweep: t > at(13) && t < L[17].end,
    welcome: fadeIn(t, at(11), 1.5) * fadeOut(t, at(11) + 4, 2),
    vijaya: fadeIn(t, at(12), 2),
    emblems: fadeIn(t, at(18), 2),
    reveal: 0,
    lit: beadsLit(t, 6, [at(9) + 2]),
  };
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Hermitage {...state} />
    </Stage>
  );
}

export function AnswerTheStranger({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const age = cueAge(cues, 'reveal', t, complete);
  const reveal = age < 0 ? 0 : easeInOut(progress(age, 0, 10));
  const state: HermitageState = {
    t,
    pulse,
    shimmer: 0,
    sages: 2,
    sagesTalk: 0,
    sagesBow: 0,
    laugh: 0,
    ascetic: 1,
    asceticSweep: reveal === 0,
    welcome: 0,
    vijaya: 1 - reveal * 0.6,
    emblems: 1 - fadeIn(age < 0 ? 0 : age, 0.5, 2),
    reveal,
    lit: 7 + (age < 0 ? 0 : fadeIn(age, 8.5, 1.5)),
  };
  return (
    <Stage cam={cameraFor('lowAngle', 1, t)} frozen={frozen} label={beat.title}>
      <Hermitage {...state} />
      {/* A soft wash of white light at the moment of the reveal. */}
      {age > 2 && age < 6 && <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#FFFFFF" opacity={0.18 * Math.sin(((age - 2) / 4) * Math.PI)} />}
    </Stage>
  );
}
