// Beat 7: What will Shiva do with his grief? (a choice)
// The snowy cave mouth at night, with four small lamps in a row. Each
// option lights its own lamp. At the reveal ("all four, in different
// texts") the rest light together, warm dust rises, and the camera moves
// past the lamps to the restored sacrifice: the gods as outlines with palms
// joined, Shiva as a calm silver light, and Daksha restored as an outline with
// a goat's head, kneeling and asking forgiveness. Quiet and serious, never comic.

import { easeInOut, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight, Outline } from '../figures';
import { cameraFor, Diya, fadeIn, Flame, Glow, Layer, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from './common';

const g = palettes.grief;

export function FourLamps({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const revealAge = cueAge(cues, 'reveal', t, complete);
  const revealed = revealAge >= 0;
  const push = revealed ? easeInOut(progress(revealAge, 0.5, 10)) : 0;
  const cam = cameraFor('pushIn', push, t);
  const inset = revealed ? fadeIn(revealAge, 1.5, 2.5) : 0;
  const tear = revealed ? progress(revealAge, 6, 8.5) : 0;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={g.shadow} bottom={revealed ? '#3A3050' : g.primary} t={t} stars={40} starColour={g.highlight} />
      </Layer>
      <Layer depth={0.4}>
        {/* The cave mouth in the snow. */}
        <path d="M 200 900 Q 220 300 800 260 Q 1380 300 1400 900 L 1700 900 L 1700 -100 L -100 -100 L -100 900 Z" fill="#0B0E1E" />
        <path d="M 200 900 Q 220 300 800 260 Q 1380 300 1400 900" stroke={g.highlight} strokeWidth={14} fill="none" opacity={0.6} />
      </Layer>

      {/* The restored sacrifice, seen as a glowing vignette inside the cave. */}
      {inset > 0 && (
        <Layer depth={0.5} opacity={inset}>
          <Glow x={800} y={560} r={360} colour="#F5A623" opacity={0.35} />
          {/* The restored fire. */}
          <rect x={740} y={640} width={120} height={22} fill="#5C2018" />
          {[770, 800, 830].map((x, i) => (
            <Flame key={x} x={x} y={642} size={0.7} t={t + i} />
          ))}
          {/* The gods, gentle outlines with palms joined. */}
          {[440, 520, 1080, 1160].map((x) => (
            <Outline key={x} x={x} y={700} scale={0.5} arms="anjali" head="crown" colour="#C9B8E0" opacity={0.6} />
          ))}
          {/* Shiva: a calm silver light, blessing. */}
          <DivineLight x={990} y={540} t={t} kind="silver" size={0.75} pulse={pulse} />
          {/* Daksha, restored, kneeling with palms joined, head bowing. */}
          <Outline x={640} y={720} scale={0.72} pose="kneel" head="goat" arms="anjali" colour="#FFE3A3" headTilt={easeInOut(progress(revealAge, 3, 7)) * 14} />
          {/* A single tear of light. */}
          {tear > 0 && tear < 1 && <circle cx={652} cy={560 + tear * 50} r={3} fill="#FFF4D6" opacity={1 - tear} />}
          <Particles kind="dust" t={t} count={24} colour="#FFE3A3" opacity={0.5} area={{ x: 500, y: 300, w: 600, h: 400 }} />
        </Layer>
      )}

      <Layer depth={0.9}>
        <path d="M -200 860 Q 800 800 1800 860 L 1800 1100 L -200 1100 Z" fill={g.highlight} opacity={0.75} />
        {/* Four lamps: one for each option. */}
        {[0, 1, 2, 3].map((i) => {
          const picked = cueAge(cues, `pick:${i}`, t, false) >= 0;
          const lit = picked || revealed ? 1 : 0;
          return <Diya key={i} x={560 + i * 160} y={850} t={t + i * 2} scale={0.75} lit={lit} pulse={pulse} />;
        })}
        {revealed && <Particles kind="dust" t={t} count={20} colour="#FFE3A3" opacity={0.4} area={{ x: 500, y: 500, w: 600, h: 350 }} />}
      </Layer>
      <Layer depth={1}>
        <Particles kind="snow" t={t} count={36} colour={g.highlight} opacity={0.5} />
      </Layer>
    </Stage>
  );
}
