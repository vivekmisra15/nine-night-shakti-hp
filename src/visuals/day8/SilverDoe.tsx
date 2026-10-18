// Beats 12–13: The silver doe, and "Think it through" after it.
// Abstract only: light, snow, objects. Harry, Ron and Hermione are never
// drawn; at most each is a small point of light. No house colours.
//
// Beat 12, following the retelling sentence by sentence:
//   0     an empty tent glowing faintly amber in snow; one of three small
//         lights moves away
//   1     bare trees in snow; a soft silver light that moves like a deer
//         walks between them; a frozen pool with a sword of light beneath
//   2     the ice breaks; the water darkens and a locket's chain of light
//         tightens (no body)
//   3     a warm light rises from the water with the sword (freeze-frame)
//   4–5   the locket opens into whirling dark smoke; the sword of light
//         comes down (slow motion) and the smoke scatters
//   6–7   the tent glows again with three lights, one a little apart
// Camera: low angle on the pool, then a pull back.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Layer, mixCam, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';
import { BareTree, DeerLight, Locket, SmallLight, SwordOfLight, Tent } from './kit';

const f = palettes.n8forestOfDean;
const POOL = { x: 860, y: 740 };

// The snowy forest at night: sky, two rows of bare trees, snowy ground.
function Forest({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={f.shadow} bottom="#2A3448" t={t} stars={40} starColour={f.highlight} />
      </Layer>
      <Layer depth={0.25}>
        {[60, 260, 480, 1100, 1320, 1520].map((x, i) => (
          <BareTree key={x} x={x} y={640} scale={0.8 + (i % 3) * 0.1} colour="#2E3444" />
        ))}
        <rect x={-400} y={630} width={2400} height={500} fill="#8A96AA" />
      </Layer>
      <Layer depth={0.5}>
        <path d="M -200 680 Q 800 650 1800 690 L 1800 1100 L -200 1100 Z" fill={f.primary} opacity={0.9} />
        {[180, 1400].map((x) => (
          <BareTree key={x} x={x} y={720} scale={1.2} colour={f.secondary} />
        ))}
      </Layer>
    </>
  );
}

// The tent with up to three small lights by it (`apart` moves the third
// light a little away from the others).
function TentScene({ t, glow, lights, leaving = 0, apart = 0 }: { t: number; glow: number; lights: number; leaving?: number; apart?: number }) {
  return (
    <>
      <Forest t={t} />
      <Layer depth={0.5}>
        <Tent x={800} y={760} scale={1.3} glow={glow} />
        <SmallLight x={700} y={760} opacity={lights >= 1 ? 1 : 0} />
        <SmallLight x={740} y={770} opacity={lights >= 2 ? 1 : 0} />
        {/* The third light: leaving at the start, standing a little apart at the end. */}
        <SmallLight x={lerp(lerp(900, 1500, leaving), 1000, apart)} y={lerp(770, 720, leaving)} opacity={lights >= 3 ? 1 : 0} />
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="snow" t={t} count={50} colour={f.highlight} opacity={0.6} />
      </Layer>
    </>
  );
}

export function SilverDoe({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const time = complete ? L[L.length - 1].end + 2 : t;

  const toPool = fadeIn(time, at(1), 2.5);
  const toTent = fadeIn(time, at(6), 2.5);
  const leaving = easeInOut(progress(time, 1, at(1)));
  const deer = easeInOut(progress(time, at(1), at(2)));
  const crack = fadeIn(time, at(2), 0.8);
  const chain = easeInOut(progress(time, at(2) + 0.5, at(2) + 4));
  const rise = easeInOut(progress(time, at(3), at(3) + 3));
  const smoke = fadeIn(time, at(4) + 1.5, 2);
  const strike = easeInOut(progress(time, at(5) + 0.3, at(5) + 2));
  const scatter = progress(time, at(5) + 1.8, at(5) + 4.5);
  const close = progress(time, at(7), at(7) + 4);

  // Low angle on the pool, then a pull back to the tent.
  let cam = cameraFor('lowAngle', progress(time, at(1), at(5)), time);
  cam = mixCam(cam, cameraFor('pullBack', progress(time, at(6), L[L.length - 1].end), time), toTent);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toPool < 1 && <TentScene t={time} glow={0.35} lights={3} leaving={leaving} />}
      {toPool > 0 && toTent < 1 && (
        <g opacity={toPool * (1 - toTent)}>
          <Forest t={time} />
          <Layer depth={0.5}>
            {/* The frozen pool; it darkens when the ice breaks. */}
            <ellipse cx={POOL.x} cy={POOL.y} rx={260} ry={60} fill={crack > 0 ? '#1C2A3E' : '#B8C8DA'} />
            <ellipse cx={POOL.x} cy={POOL.y} rx={260} ry={60} fill="#C8D6E6" opacity={1 - crack} />
            {/* The sword beneath the ice, then rising with a warm light. */}
            <g opacity={1 - smoke}>
              <SwordOfLight x={POOL.x + 20} y={lerp(POOL.y + 30, 560, rise)} scale={0.5} rot={rise > 0 ? lerp(90, 0, rise) : 90} opacity={0.5 + 0.5 * rise} />
            </g>
            {rise > 0 && <Glow x={POOL.x - 40} y={lerp(POOL.y, 640, rise)} r={120} colour="#FFE3B0" opacity={0.5 * rise * (1 - scatter)} />}
            {/* Cracks in the ice. */}
            <g opacity={crack * (1 - rise)}>
              <path d={`M ${POOL.x - 120} ${POOL.y - 10} L ${POOL.x - 30} ${POOL.y + 6} L ${POOL.x + 40} ${POOL.y - 14} L ${POOL.x + 150} ${POOL.y + 10} M ${POOL.x - 30} ${POOL.y + 6} L ${POOL.x - 10} ${POOL.y + 36}`} stroke={f.highlight} strokeWidth={2.5} fill="none" />
            </g>
            {/* The locket's chain of light tightening in the dark water. */}
            {chain > 0 && rise < 1 && (
              <ellipse cx={POOL.x - 40} cy={POOL.y + 6} rx={lerp(120, 26, chain)} ry={lerp(30, 10, chain)} fill="none" stroke="#E8D48A" strokeWidth={5} strokeDasharray="8 6" opacity={0.95 * (1 - rise)} />
            )}
            {/* The locket opening into whirling smoke, scattered by the sword. */}
            {smoke > 0 && (
              <>
                <Locket x={POOL.x - 120} y={650} scale={0.9} />
                <SmokeShape x={POOL.x - 120} y={560} t={time * 2.2} size={1.3 + smoke * 0.6} seed={4} dissolve={scatter} colour="#16141C" ember="#7A6A8A" />
                <SwordOfLight x={POOL.x - 40} y={lerp(380, 600, strike)} scale={0.7} rot={lerp(-40, 10, strike)} opacity={fadeIn(time, at(5), 0.6)} />
              </>
            )}
          </Layer>
          <Layer depth={0.6}>
            {/* The deer-like silver light, walking between the trees to the pool. */}
            <DeerLight x={lerp(200, POOL.x + 260, deer)} y={lerp(650, 690, deer)} t={time} opacity={fadeIn(time, at(1) + 0.5, 1.5) * (1 - fadeIn(time, at(2) + 1, 2))} />
          </Layer>
          <Layer depth={0.9}>
            <Particles kind="snow" t={time} count={40} colour={f.highlight} opacity={0.5} />
          </Layer>
        </g>
      )}
      {toTent > 0 && (
        <g opacity={toTent}>
          <TentScene t={time} glow={0.8} lights={3} apart={1 - close * 0.4} />
        </g>
      )}
    </Stage>
  );
}

// Beat 13: the tent in snow with its three lights, one a little apart,
// softly blurred behind the questions. It glows a little more with each rung.
export function TentFrozen({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: -20, zoom: 1.15, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <TentScene t={20} glow={0.5 + 0.4 * (rungs / 6)} lights={3} apart={0.7} />
      </g>
    </Stage>
  );
}
