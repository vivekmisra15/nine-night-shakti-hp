// The two choice backdrops (Beats 3 and 5). Both hold the dark of the
// beginning, breathing gently behind the cards. Each option chosen lights a
// tiny mote low in the dark. When the learner reveals what happened:
//   Beat 3  the glow returns and the cosmic egg forms again
//   Beat 5  the single held spark warms and grows into the sun of Beat 4

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { cameraFor, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { Beginning } from './BeforeAnything';
import { DarkSky, LowRidges, pd, Stars, SunDisc } from './kit';

// One tiny warm mote for each option chosen, in a row low in the dark.
function ChoiceMotes({ t, cues }: { t: number; cues: Record<string, number> }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const age = cueAge(cues, `pick:${i}`, t, false);
        const on = age < 0 ? 0 : Math.min(1, age / 1.2);
        return <Glow key={i} x={620 + i * 120} y={800} r={26} colour={pd.highlight} opacity={0.15 + 0.6 * on} />;
      })}
    </>
  );
}

// Beat 3: What comes first?
export function WhatComesFirst({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const r = (a: number, b: number) => (reveal < 0 ? 0 : easeInOut(progress(reveal, a, b)));
  // Before the reveal, the dark breathes: the haze swells and settles.
  const breath = 0.5 + 0.5 * wobble(t, 0.25);
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <Beginning t={t} bloom={r(0, 3) || 0.05 * breath} rays={r(1, 6)} egg={r(2.5, 7)} unfold={0} settle={0} pulse={pulse} />
      <Layer depth={0.5}>
        <ChoiceMotes t={t} cues={complete ? {} : cues} />
      </Layer>
    </Stage>
  );
}

// Beat 5: How much does it take?
export function HowMuch({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const warm = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 8));
  const rise = reveal < 0 ? 0 : easeInOut(progress(reveal, 1, 9));
  return (
    <Stage cam={cameraFor('crane', rise, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.03}>
        <DarkSky t={t} warmth={0.6 * warm} stars={0.8} starCount={60} />
        <Stars t={t} count={40} opacity={0.5} />
      </Layer>
      <Layer depth={0.2}>
        {/* The single spark, held still; at the reveal it grows into the sun. */}
        <Glow x={800} y={430} r={lerp(40, 120, warm)} colour={pd.highlight} opacity={0.9 * (1 - warm * 0.5)} />
        <circle cx={800} cy={430} r={lerp(4, 10, warm)} fill="#FFFBEF" opacity={1 - warm} />
        {warm > 0 && (
          <g opacity={warm}>
            <SunDisc x={800} y={430} r={lerp(20, 140, rise)} t={t} corona={rise} point={1} pulse={pulse} />
          </g>
        )}
      </Layer>
      <Layer depth={0.4}>
        <LowRidges fill={warm > 0 ? '#1E1208' : '#06070F'} far="#0F1124" />
        <ChoiceMotes t={t} cues={complete ? {} : cues} />
      </Layer>
    </Stage>
  );
}
