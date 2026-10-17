// Beat 3: A sacrifice without Shiva.
//   Sentences 0–2  the assembly hall: everyone stands except two seated
//                  figures; Daksha's arm sweeps out as he curses, and his
//                  shadow grows long
//   Sentences 3–5  Kailasa at twilight, from behind Sati at the cliff edge,
//                  orbiting to her face. About eight trails of light (the
//                  gods' wives on their way) cross the sky, in slow motion.
//                  The last trail curves down into the valley: the path of Beat 4.

import { easeInOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight, Outline } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, LightTrail, mixCam, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop, linesOf } from './common';
import { Palace } from './DaughterWhoChose';

const k = palettes.kailasa;

export function SacrificeWithoutShiva({ beat, t, duration, frozen }: VisualProps) {
  const L = linesOf(beat);
  const toCliff = fadeIn(t, L[3].start, 2.5);
  const curse = easeInOut(progress(t, L[2].start, L[2].start + 3));
  const hallCam = cameraFor('pushIn', progress(t, L[1].start, L[3].start), t);
  const cliffCam = cameraFor('orbit', progress(t, L[3].start, duration), t);
  const cam = mixCam(hallCam, cliffCam, toCliff);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toCliff < 1 && (
        <>
          <Palace t={t} dakshaArm={curse > 0.3 ? 'sweep' : 'rest'} shadow={curse} />
          {/* The two who stay seated: Brahma (an outline) and Shiva (a quiet silver light). */}
          <Layer depth={0.55}>
            <Outline x={420} y={760} scale={0.55} pose="sit" head="crown" colour="#FFE3A3" opacity={0.8} />
            <DivineLight x={1180} y={660} t={t} kind="silver" size={0.5} />
          </Layer>
        </>
      )}
      <g opacity={toCliff}>
        <KailasaBackdrop t={t} snow={false} />
        <Layer depth={0.25}>
          {/* The trails cross left to right in gentle arcs, one after another. */}
          {Array.from({ length: 8 }, (_, i) => {
            const start = L[4].start + i * 1.1 - 1;
            const amount = easeInOut(progress(t, start, start + 4));
            const y = 120 + i * 32;
            const last = i === 7;
            const d = last
              ? `M -100 ${y} Q 600 ${y - 120} 1100 ${y + 120} Q 1300 620 1500 780`
              : `M -100 ${y + 60} Q 800 ${y - 140} 1700 ${y + 40}`;
            return <LightTrail key={i} d={d} amount={amount} colour={i % 2 ? '#FFE3A3' : k.accent} t={t + i} width={5} opacity={0.6} />;
          })}
          <Particles kind="dust" t={t} count={30} colour="#FFE3A3" opacity={0.4 * fadeIn(t, L[4].start, 3)} area={{ x: 0, y: 60, w: 1600, h: 360 }} />
        </Layer>
        <Layer depth={0.9}>
          <path d="M -200 900 L 200 760 Q 600 720 900 790 L 960 1100 L -200 1100 Z" fill="#0E1430" />
          <Glow x={620} y={500} r={280} colour={k.accent} opacity={0.12} />
          {/* Sati at the cliff edge: her flame, leaning towards the trails, towards home. */}
          <g transform={`rotate(6 620 760)`}>
            <DivineLight x={620} y={760} t={t} kind="warm" size={0.9} />
          </g>
        </Layer>
      </g>
    </Stage>
  );
}
