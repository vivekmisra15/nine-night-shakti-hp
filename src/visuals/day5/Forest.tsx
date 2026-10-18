// Beats 12–13: Narcissa's lie, and "Think it through".
// Abstract only: no people, no faces, no film imagery. A night forest of bare
// trunks around a clearing in moonlight. Greens stay greyed; moon white.
//
// Beat 12, following the retelling:
//   Sentence 0   a pale low shape on the ground, suggested only by
//                moonlight on the leaves
//   Sentence 3   a single lantern-amber point kneels close, and a tiny pulse
//                of light beats twice beneath it, the heartbeat (slow motion)
//   Sentence 4   the lantern point leans closer and dims
//   Sentence 5   it rises (freeze-frame)
//   Sentence 6   far off between the trees, a castle window glows
// Camera: a low angle, almost still.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { fadeIn, Glow, Layer, Particles, rand, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { p } from './kit';

const f = p.n5forestNight;
const GROUND: [number, number] = [800, 760];

// Bare trunks at three depths.
function Trunks({ seed, count, y, colour, width }: { seed: number; count: number; y: number; colour: string; width: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = -200 + ((2000 * (i + 0.5)) / count) + (rand(i, seed) - 0.5) * 120;
        if (Math.abs(x - 800) < 220 && seed > 1) return null; // keep the clearing open
        const w = width * (0.7 + 0.6 * rand(i, seed + 1));
        return (
          <g key={i}>
            <path d={`M ${x - w / 2} ${y} L ${x - w / 3} -200 L ${x + w / 3} -200 L ${x + w / 2} ${y} Z`} fill={colour} />
            {/* A bare branch or two. */}
            <path d={`M ${x} ${200 + rand(i, seed + 2) * 200} q ${rand(i, seed + 3) > 0.5 ? 80 : -80} -40 ${rand(i, seed + 3) > 0.5 ? 140 : -140} -120`} stroke={colour} strokeWidth={w / 5} fill="none" />
          </g>
        );
      })}
    </>
  );
}

export function Clearing({ t, shape = 1, window = 0 }: { t: number; shape?: number; window?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={f.shadow} bottom={f.primary} t={t} stars={30} starColour={f.accent} />
        {/* The moon. */}
        <Glow x={1250} y={130} r={220} colour={f.accent} opacity={0.3} />
        <circle cx={1250} cy={130} r={34} fill={f.accent} opacity={0.9} />
      </Layer>
      <Layer depth={0.15}>
        <Trunks seed={1} count={22} y={760} colour="#162129" width={26} />
        {/* Far off between the trees: a castle window, lit. */}
        <g opacity={window}>
          <Glow x={1040} y={470} r={45} colour={f.highlight} opacity={0.6} />
          <rect x={1032} y={456} width={16} height={26} fill={f.highlight} />
        </g>
      </Layer>
      <Layer depth={0.35}>
        <Trunks seed={4} count={12} y={800} colour="#0E161C" width={44} />
        {/* The clearing floor, and moonlight falling on it. */}
        <path d="M -400 740 Q 800 700 2000 740 L 2000 1200 L -400 1200 Z" fill="#111B21" />
        <Glow x={GROUND[0]} y={GROUND[1]} r={420} colour={f.accent} opacity={0.14} />
        {/* A pale low shape on the ground: only moonlight on leaves. */}
        <g opacity={shape}>
          <ellipse cx={GROUND[0]} cy={GROUND[1]} rx={150} ry={16} fill={f.accent} opacity={0.18} />
          {Array.from({ length: 26 }, (_, i) => (
            <ellipse key={i} cx={GROUND[0] - 170 + rand(i, 31) * 340} cy={GROUND[1] - 14 + rand(i, 32) * 28} rx={7} ry={3} fill={f.accent} opacity={0.25 + 0.2 * rand(i, 33)} transform={`rotate(${rand(i, 34) * 180} ${GROUND[0] - 170 + rand(i, 31) * 340} ${GROUND[1] - 14 + rand(i, 32) * 28})`} />
          ))}
        </g>
      </Layer>
      <Layer depth={0.8}>
        <Trunks seed={7} count={6} y={1000} colour="#05090C" width={90} />
        <Particles kind="dust" t={t} count={14} colour={f.accent} opacity={0.2} speed={0.5} />
      </Layer>
    </>
  );
}

export function Forest({ beat, t: time, duration, frozen, complete }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = { x: 0, y: lerp(30, 0, progress(t, 0, duration)), zoom: 1.08, rot: 0 };

  const shape = fadeIn(t, at(0), 3);
  const kneel = easeInOut(progress(t, at(3) - 0.5, at(3) + 1));
  const lean = easeInOut(progress(t, at(4), at(4) + 2));
  const rise = easeInOut(progress(t, at(5), at(5) + 2.5));
  const lantern = fadeIn(t, at(2) + 1, 2);
  const lx = lerp(lerp(940, 870, kneel), 840, lean * (1 - rise));
  const ly = lerp(lerp(560, 712, kneel) + lean * 14, 560, rise);
  const bright = 1 - 0.45 * lean * (1 - rise);
  // The heartbeat: two small pulses beneath the lantern.
  const beat1 = progress(t, at(3) + 1.0, at(3) + 1.6);
  const beat2 = progress(t, at(3) + 1.9, at(3) + 2.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Clearing t={t} shape={shape} window={fadeIn(t, at(6), 3)} />
      <Layer depth={0.35}>
        {[beat1, beat2].map((b, i) =>
          b > 0 && b < 1 ? <circle key={i} cx={830} cy={GROUND[1] - 4} r={4 + b * 26} fill="none" stroke={f.highlight} strokeWidth={2} opacity={0.8 * (1 - b)} /> : null,
        )}
        {/* The lantern-amber point. */}
        <g opacity={lantern * bright}>
          <Glow x={lx} y={ly} r={70} colour={f.highlight} opacity={0.6} />
          <circle cx={lx} cy={ly} r={5} fill="#FFE7B0" />
        </g>
      </Layer>
    </Stage>
  );
}

// Beat 13: the clearing, the castle window glowing, softly blurred.
export function ClearingStill({ beat, frozen }: VisualProps) {
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.1, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <Clearing t={30} shape={0.6} window={1} />
      </g>
    </Stage>
  );
}
