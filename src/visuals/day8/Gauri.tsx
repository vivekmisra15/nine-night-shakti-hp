// Beats 5–6: Gauri, and "What would you ask for?"
//
// Beat 5: the grove at night, by the water.
//   Sentences 0–1  the flame's glow widens into a calm ring of pearl light
//                  over the water. GUARDRAIL: the flame's own colour never
//                  changes; only the reach and steadiness of its glow grow.
//                  At sentence 1, a faint fine-line outline of face and
//                  shoulders shows in the light for a few seconds only
//                  (freeze-frame after sentence 1).
//   Sentence 2     Shiva's silver light descends
//   Sentence 3     his light pulses warmly twice ("Gauri, Gauri")
//   Sentence 4     a small gold lotus (the boon) appears between them
//
// Beat 6: the two lights by the grove. A small lamp lights for each option.
// At "what happened": small lights of visitors gather along the shore, then
// a gold outline shrine takes shape and Shiva's light settles into it.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, Layer, LightTrail, Particles, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, linesOf } from '../day1/common';
import { Tree, WaterReflection } from './kit';

const g = palettes.n8gauriRadiance;

// Where the Devi's flame and Shiva's light rest.
const DEVI = { x: 760, y: 600 };
const SHIVA = { x: 1080, y: 560 };

// The grove at night by the water, with the Devi's flame and its widening
// ring of pearl light (`ring` 0 to 1).
function GroveAtNight({ t, ring, pulse, outline = 0 }: { t: number; ring: number; pulse: number; outline?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={g.shadow} bottom={g.secondary} t={t} stars={90} starColour={g.highlight} />
      </Layer>
      <Layer depth={0.3}>
        {/* The grove, dark against the sky. */}
        {[220, 400, 1260, 1440].map((x, i) => (
          <Tree key={x} x={x} y={640} scale={0.9 + (i % 2) * 0.25} crown="#1A2244" trunk="#141A33" t={t} />
        ))}
        <rect x={-400} y={630} width={2400} height={500} fill="#1A2448" />
      </Layer>
      <Layer depth={0.6}>
        {/* The calm ring of light spreading over the water. */}
        <WaterReflection x={DEVI.x} waterY={640} t={t} colour={g.primary} length={200} ring={ring} opacity={0.6 + 0.4 * ring} />
        <WaterReflection x={DEVI.x} waterY={640} t={t} colour="#F29F3D" length={160} opacity={0.5} />
        {/* Her glow grows wider and calmer; the flame stays the same warm flame. */}
        <Glow x={DEVI.x} y={DEVI.y - 40} r={lerp(160, 420, ring)} colour={g.primary} opacity={0.12 + 0.18 * ring} />
        <DivineLight x={DEVI.x} y={DEVI.y} t={t} kind="warm" size={0.9} strength={1 + 0.15 * ring} pulse={pulse * (1 - ring * 0.5)} />
        <DeviOutline x={DEVI.x} y={DEVI.y - 70} size={1.3} opacity={0.32 * outline} />
      </Layer>
    </>
  );
}

export function Gauri({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const time = complete ? L[5].end + 2 : t;
  const cam = cameraFor('pushIn', progress(time, 0, L[5].end), time);

  const ring = easeInOut(progress(time, at(0), L[1].end));
  // The light-touch outline: a few seconds only, from sentence 1.
  const outline = complete ? 0 : window2(time, at(1) + 1, at(1) + 6, 1.5);
  // Shiva descends at sentence 2.
  const descend = easeInOut(progress(time, at(2), at(2) + 4));
  const shivaIn = fadeIn(time, at(2), 1.5);
  // Two warm pulses for "Gauri, Gauri".
  const beat1 = Math.max(0, 1 - Math.abs(time - (at(3) + 0.8)) / 0.5);
  const beat2 = Math.max(0, 1 - Math.abs(time - (at(3) + 2.0)) / 0.5);
  const boon = fadeIn(time, at(4) + 1, 2);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <GroveAtNight t={time} ring={ring} pulse={pulse} outline={outline} />
      <Layer depth={0.6}>
        <g opacity={shivaIn}>
          <DivineLight x={SHIVA.x} y={lerp(-120, SHIVA.y, descend)} t={time} kind="silver" size={0.8} strength={1 + 0.6 * (beat1 + beat2)} pulse={pulse} />
          <Glow x={SHIVA.x} y={SHIVA.y} r={200} colour="#F5C25A" opacity={0.3 * (beat1 + beat2)} />
        </g>
        {/* The boon: a small gold lotus between them. */}
        <g opacity={boon}>
          <Glow x={920} y={560} r={70} colour={g.accent} opacity={0.4} />
          <SymbolIcon name="lotus" x={920} y={560} size={0.9} colour={g.accent} />
        </g>
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="dust" t={time} count={20} colour={g.highlight} opacity={0.25 + 0.2 * ring} area={{ x: 400, y: 250, w: 800, h: 400 }} />
      </Layer>
    </Stage>
  );
}

// The shrine's outline, drawn as a line of light: a small temple with a
// curved tower (shikhara).
const shrinePath = 'M 1000 640 L 1000 540 L 1030 540 Q 1040 440 1080 400 Q 1120 440 1130 540 L 1160 540 L 1160 640 M 1060 640 L 1060 580 Q 1080 560 1100 580 L 1100 640 M 1080 400 L 1080 380';

export function WishesChoice({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const revealAge = cueAge(cues, 'reveal', t, complete);
  const gather = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 0, 6));
  const build = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 4, 10));
  const settle = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 9, 13));
  const cam = cameraFor('still', 0, t);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <GroveAtNight t={t} ring={1} pulse={pulse} />
      <Layer depth={0.6}>
        <SymbolIcon name="lotus" x={920} y={560} size={0.9} colour={g.accent} opacity={1 - gather} />
        {/* The shrine taking shape, and Shiva's light settling into it. */}
        <LightTrail d={shrinePath} amount={build} colour={g.accent} t={t} width={2.5} opacity={0.8} />
        <DivineLight x={lerp(SHIVA.x, 1080, settle)} y={lerp(SHIVA.y, 600, settle)} t={t} kind="silver" size={lerp(0.8, 0.4, settle)} pulse={pulse} />
      </Layer>
      <Layer depth={0.8}>
        {/* Visitors: small warm lights walking in along the shore. */}
        {Array.from({ length: 12 }, (_, i) => {
          const fromLeft = i % 2 === 0;
          const end = fromLeft ? 120 + i * 40 : 1500 - i * 30;
          const x = lerp(fromLeft ? -60 : 1660, end, gather);
          return <circle key={i} cx={x} cy={800 + (i % 3) * 22} r={4} fill="#FFE3B0" opacity={0.85 * gather} />;
        })}
        <path d="M -200 790 Q 800 760 1800 790" stroke={g.primary} strokeWidth={1.5} opacity={0.2} fill="none" />
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} x={110 + i * 80} y={880} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
    </Stage>
  );
}
