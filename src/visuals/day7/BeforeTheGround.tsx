// Beat 7: Before it touches the ground.
//   Sentence 0      the sky is full of copies; the Devi's flame brightens,
//                   and her laugh is a ripple of light
//   Sentences 1–4   Kali's darkness widens into one low arc of dark light
//                   above the ground line
//   Sentences 5–6   the Devi strikes (flashes of light); the sparks fall and
//                   are caught in the arc before they reach the ground, each
//                   going out softly (slow motion on the catching)
//   Sentence 7      a small rush of smoke at the Devi's flame breaks apart
//   Sentence 8      the copies thin and the tall smoke shape fades
//   Sentences 9–10  the sky clears to stars; the seven Mothers and the gods'
//                   lights glow; the camera cranes up
// No blood is shown: the drops are ember sparks that never land.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, mixCam, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf, SoundRing, Spark } from './kit';
import { BattleSky, Copies, copies, DEMON, Ground, GROUND, MothersRow, Raktabija } from './Multiplied';

// The arc of Kali's darkness, from her at the lower left across to the right.
const ARC = { x0: 300, x1: 1560, lift: 400 };
const arcY = (x: number) => {
  const u = (x - ARC.x0) / (ARC.x1 - ARC.x0);
  return GROUND - 10 - ARC.lift * u * (1 - u);
};
const arcPath = `M ${ARC.x0} ${GROUND - 10} Q ${(ARC.x0 + ARC.x1) / 2} ${GROUND - 10 - ARC.lift / 2} ${ARC.x1} ${GROUND - 10}`;

// The strikes: when each happens (seconds after sentence 6 starts), and
// where its spark is caught.
const strikes = Array.from({ length: 9 }, (_, i) => ({ at: -2 + i * 1.3, x: 900 + ((i * 97) % 300) }));

export function BeforeTheGround({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const time = complete ? L[10].end + 2 : t;

  const cam = mixCam(cameraFor('still', 0, time), cameraFor('crane', progress(time, at(8), L[10].end), time), fadeIn(time, at(8), 3));
  const laugh = progress(time, at(0) + 1, at(0) + 4);
  const widen = easeInOut(progress(time, at(1), at(4)));
  const clear = fadeIn(time, at(9) - 1, 5);
  const demonGone = easeInOut(progress(time, at(8), at(8) + 4));
  const mace = progress(time, at(7) + 0.5, at(7) + 3);
  const s6 = at(6);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <BattleSky t={time} smoke={1 - clear} />
      {/* The gods' lights return to the clearing sky. */}
      <Layer depth={0.15} opacity={clear}>
        {(['silver', 'blue', 'gold', 'violet'] as const).map((kind, i) => (
          <DivineLight key={kind} x={980 + i * 150} y={190 + (i % 2) * 50} t={time} kind={kind} size={0.3} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        <Ground t={time} devi={1 + 0.5 * Math.sin(Math.PI * laugh)} pulse={pulse} />
        {/* The Devi's laugh: a ripple of light. */}
        <SoundRing x={240} y={GROUND - 60} p={laugh} colour="#FFE9A8" reach={500} />
        <MothersRow t={time} appear={() => 1} size={1 + 0.15 * clear} />
        <Raktabija t={time} strength={1 - demonGone} dissolve={demonGone * 0.9} />
        {/* The copies thin away, one after another, once the drops are caught. */}
        <Copies t={time} spawnAt={() => -100} sparks={false} gone={(_, i) => easeInOut(progress(time, s6 + 2 + (i / copies.length) * 12, s6 + 4 + (i / copies.length) * 12))} />
        {/* Kali's darkness, widened into one low arc above the ground. */}
        {widen > 0 && (
          <g opacity={1 - 0.6 * clear}>
            <path d={arcPath} pathLength={1} strokeDasharray={`${widen} 1`} stroke="#3A3F9E" strokeWidth={70} strokeLinecap="round" fill="none" opacity={0.35} />
            <path d={arcPath} pathLength={1} strokeDasharray={`${widen} 1`} stroke="#5A5FD0" strokeWidth={18} strokeLinecap="round" fill="none" opacity={0.5} />
            <path d={arcPath} pathLength={1} strokeDasharray={`${widen} 1`} stroke="#B8321F" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.7} />
          </g>
        )}
        {/* The strikes: a flash from the Devi, a spark falling, caught in the arc. */}
        {strikes.map((s, i) => {
          const hit = s6 + s.at;
          const flash = progress(time, hit, hit + 0.5);
          const fall = progress(time, hit + 0.2, hit + 1.4);
          const caught = progress(time, hit + 1.4, hit + 2.2);
          const y = lerp(DEMON.y + 40, arcY(s.x), fall * fall);
          return (
            <g key={i}>
              {flash > 0 && flash < 1 && <path d={`M 240 ${GROUND - 80} L ${DEMON.x} ${DEMON.y}`} stroke="#FFE9A8" strokeWidth={4} opacity={0.7 * (1 - flash)} />}
              {fall > 0 && caught < 1 && <Spark x={lerp(DEMON.x, s.x, fall)} y={y} opacity={1 - caught} />}
              {caught > 0 && caught < 1 && <Glow x={s.x} y={arcY(s.x)} r={50} colour="#8A7FE0" opacity={0.5 * (1 - caught)} />}
            </g>
          );
        })}
        {/* The demon's mace cannot hurt her: a rush of smoke breaks apart. */}
        {mace > 0 && mace < 1 && <SmokeShape x={lerp(DEMON.x, 330, mace)} y={lerp(DEMON.y, GROUND - 80, mace)} t={time} size={0.3} seed={7} dissolve={progress(mace, 0.6, 1)} colour="#5A4E44" />}
      </Layer>
      <Layer depth={0.9} opacity={clear}>
        <Particles kind="dust" t={time} count={24} colour="#FFF4D6" opacity={0.35} />
      </Layer>
    </Stage>
  );
}
