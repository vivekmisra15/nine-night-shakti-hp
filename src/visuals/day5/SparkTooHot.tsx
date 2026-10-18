// Beat 3: A spark too hot to hold (two screens).
//
// 3.1, following the narration:
//   Sentence 0     Kailasa: Shiva's silver light and Parvati's warm flame on the peak
//   Sentence 1     small outline gods climb towards them
//   Sentence 2     a single bright spark falls from the silver light (slow motion)
//   Sentence 3     Agni, a dove of ember-red light, takes it and glows hotter
//   Sentences 4–5  the spark passes along a chain: six faint outline women,
//                  then the mountain ridge, then down into a river of light
//   Sentence 6     the river carries it and lays it among tall reeds
//   Sentence 7     the reeds part on a radiant small light: the child
//   Sentence 8     the sky brightens; far off on Kailasa the warm flame brightens too
// Camera: a crane, from the peak down to the river.
//
// 3.2, Other tellings: the river at dusk, the child resting in the reeds,
// Agni's ember light on one bank and the river's shimmer carrying the light;
// for the Mahabharata, a second soft light (Svaha) joins Agni's.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline } from '../figures';
import { type Cam, cameraFor, fadeIn, Glow, Haze, Layer, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { along, ChildLight, MiniIcon, p, Reeds, River, Spark } from './kit';

const c = p.n5emberRiver;

// Where things are. The peak is high on the left; the river runs along the bottom.
const SHIVA: [number, number] = [380, 210];
const PARVATI: [number, number] = [540, 230];
const GROUND: [number, number] = [470, 400];
const WOMEN = [700, 790, 880, 970, 1060, 1150];
const CHILD: [number, number] = [1300, 770];

// Kailasa, the slope, the river and the reeds, shared by both screens.
function Valley({ t, glow = 0, part = 0 }: { t: number; glow?: number; part?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom="#24403F" t={t} stars={40} starColour={c.highlight} />
        <Glow x={1300} y={500} r={700} colour={c.highlight} opacity={0.18 * glow} />
      </Layer>
      <Layer depth={0.2}>
        {/* Kailasa: the high snow peak on the left. */}
        <Ridge seed={4} baseY={560} height={120} fill="#1E3A3E" peak={{ x: 460, h: 330 }} snow="#E8ECF4" />
      </Layer>
      <Layer depth={0.4}>
        <Haze y={560} colour={c.primary} opacity={0.2} t={t} />
        {/* Himavat, the mountain: a long ridge the spark passes over. */}
        <Ridge seed={9} baseY={700} height={110} fill="#173033" />
      </Layer>
      <Layer depth={0.7}>
        <rect x={-400} y={720} width={2400} height={400} fill="#0E2224" />
        <River y={790} t={t} colour={c.primary} />
        <Reeds baseY={830} t={t} from={1060} to={1700} part={part} cx={CHILD[0]} colour={c.secondary} count={40} height={200} />
      </Layer>
    </>
  );
}

export function SparkTooHot({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  // The crane: from the peak (looking up) down to the river.
  const down = easeInOut(progress(t, at(3), at(6) + 4));
  const cam: Cam = { ...cameraFor('crane', down, t), y: lerp(110, -70, down), zoom: 1.12 };

  const gods = easeInOut(progress(t, at(1), at(2) + 2));
  // The spark's journey, one stage per sentence.
  const fall = easeInOut(progress(t, at(2), at(2) + 2.5)); // slow motion
  const fly = easeInOut(progress(t, at(3) + 1.5, at(4)));
  const chain = progress(t, at(4), at(5) + 4);
  const intoRiver = easeInOut(progress(t, at(5) + 4, at(6)));
  const carried = easeInOut(progress(t, at(6), at(7)));
  const part = easeInOut(progress(t, at(7), at(7) + 4));
  const joy = fadeIn(t, at(8), 3);

  // Where the spark is now.
  let spark: [number, number] = SHIVA;
  if (t >= at(2)) spark = along([SHIVA, GROUND], fall);
  if (t >= at(3) + 1.5) spark = along([GROUND, [WOMEN[0] - 60, 470]], fly);
  if (t >= at(4)) spark = along([[WOMEN[0] - 60, 470], ...WOMEN.map((x) => [x, 470] as [number, number]), [1180, 600]], chain);
  if (t >= at(5) + 4) spark = along([[1180, 600], [1150, 790]], intoRiver);
  if (t >= at(6)) spark = along([[1150, 790], CHILD], carried);
  const prev: [number, number] = [spark[0] - 12, spark[1] - 10];
  const born = t >= at(7) + 1;

  // Agni, the dove of ember light, holds the spark and flies with it.
  const dove = t >= at(3) ? fadeIn(t, at(3), 1.2) * (1 - fadeIn(t, at(4) + 1, 1.5)) : 0;
  const doveAt: [number, number] = t < at(3) + 1.5 ? [GROUND[0] + 120 * (1 - fadeIn(t, at(3), 1.4)), GROUND[1] - 40] : [spark[0], spark[1] - 6];

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Valley t={t} glow={joy} part={part} />
      <Layer depth={0.2}>
        {/* Shiva's silver light and Parvati's warm flame on the peak. */}
        <DivineLight x={SHIVA[0]} y={SHIVA[1]} t={t} kind="silver" size={0.6} pulse={pulse} />
        <DivineLight x={PARVATI[0]} y={PARVATI[1] + 20} t={t} kind="warm" size={0.55} strength={1 + 0.5 * joy} pulse={pulse} />
        {/* The gods climbing towards them, small outlines with no faces. */}
        {[0, 1, 2].map((i) => (
          <Outline key={i} x={lerp(980 + i * 70, 700 + i * 60, gods)} y={360 + i * 6} scale={0.22} colour="#D8E6E0" opacity={0.75 * fadeIn(t, at(1), 1.5) * (1 - fadeIn(t, at(3), 2))} />
        ))}
      </Layer>
      <Layer depth={0.4}>
        {/* Six faint outline women, wives of the sages, who carry it for a while. */}
        {WOMEN.map((x, i) => (
          <Outline key={x} x={x} y={560} scale={0.36} head="veiled" arms="heart" colour="#E9D9B8" opacity={0.55 * fadeIn(t, at(4) - 1 + i * 0.4, 1.5) * (1 - fadeIn(t, at(6), 2.5))} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        {/* Agni as a dove of ember-red light, glowing hotter with the spark inside. */}
        {dove > 0.01 && (
          <g opacity={dove}>
            <DivineLight x={doveAt[0]} y={doveAt[1]} t={t} kind="ember" size={0.35} strength={t > at(3) + 1.5 ? 1.5 : 1} />
            <MiniIcon name="dove" x={doveAt[0]} y={doveAt[1]} size={1.1} colour="#FFD9A0" />
          </g>
        )}
      </Layer>
      <Layer depth={0.7}>
        {/* The spark, passed from bearer to bearer; then the child among the reeds. */}
        {!born && t >= at(2) - 0.5 && <Spark x={spark[0]} y={spark[1]} t={t} size={0.9} from={t >= at(2) ? prev : undefined} />}
        <ChildLight x={CHILD[0]} y={CHILD[1] - 20} t={t} size={1} opacity={fadeIn(t, at(7), 2.5)} faces={0} />
        <Particles kind="dust" t={t} count={20} colour={c.highlight} opacity={0.4 * joy} area={{ x: 1000, y: 400, w: 600, h: 400 }} />
      </Layer>
    </Stage>
  );
}

// 3.2: Other tellings.
export function OtherTellings({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const svaha = fadeIn(t, L[1].start, 2.5);
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Valley t={t} glow={0.6} part={1} />
      <Layer depth={0.7}>
        {/* Agni on the bank, and (in the Mahabharata) Svaha beside him. */}
        <DivineLight x={900} y={690} t={t} kind="ember" size={0.6} pulse={pulse} />
        <g opacity={svaha}>
          <DivineLight x={1010} y={680} t={t} kind="rose" size={0.5} pulse={pulse} />
        </g>
        <ChildLight x={CHILD[0]} y={CHILD[1] - 20} t={t} size={1} />
      </Layer>
    </Stage>
  );
}
