// Beat 4: What should Parvati do now? (a choice)
// The empty ridge after the fire, in ash greys; Parvati's flame small and
// low, Shiva's seat empty. A small lamp lights for each option chosen.
// At the reveal, the sage Narada (a topknot outline with a small veena)
// comes to her, and one bead of the ring lights as he gives the mantra.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { HighRidge, ledgeY } from './common';
import { BeadRing, Icon2 } from './kit';

const g = palettes.grief;

export function WhatNow({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const come = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 5));
  const nx = lerp(-80, 470, come);
  const bead = reveal < 0 ? 0 : easeInOut(progress(reveal, 5, 6.5));
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <HighRidge t={t} skyTop={g.shadow} skyBottom={g.primary} far="#2A2F4A" mid="#1D2138" near="#0C0E1C" snow={false} stars={30} />
      <Layer depth={0.8}>
        {/* Ash still drifting over the empty ridge. */}
        <Particles kind="snow" t={t} count={26} colour={g.secondary} opacity={0.45} seed={7} speed={0.4} />
      </Layer>
      <Layer depth={0.65}>
        {/* Parvati, small and low: heartbroken. She brightens a little when Narada comes. */}
        <DivineLight x={620} y={ledgeY(620) - 4} t={t} kind="warm" size={0.42} strength={0.6 + 0.35 * come} pulse={pulse} />
        {/* Narada, the sage, with his veena. */}
        {come > 0 && (
          <g opacity={Math.min(1, come * 2)}>
            <Outline x={nx} y={ledgeY(nx)} scale={0.56} head="topknot" arms={come >= 1 ? 'bless' : 'rest'} colour="#E8B45A" />
            <Icon2 name="veena" x={nx + 6} y={ledgeY(nx) - 96} size={0.7} />
          </g>
        )}
        {/* One small lamp for each option, lit when it is chosen. */}
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} x={1180 + i * 80} y={ledgeY(1180 + i * 80) + 50} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={1 + bead} t={t} />
      </Layer>
    </Stage>
  );
}
