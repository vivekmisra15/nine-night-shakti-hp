// Beats 2 and 3: Heaven lost, and "What should the gods do?" (a choice).
//
// Beat 2, following the narration sentence by sentence:
//   Sentence 0   far off on a ridge line, two hosts clash: a row of small
//                coloured lights (the gods) against smoke (the asuras)
//   Sentence 2   "The gods lost": the lights dim
//   Sentence 3   a throne outline high in the clouds; a smoke shape settles
//                on it as Indra's white light slips away
//   Sentence 4   sun and moon icons fade under smoke
//   Sentence 5   the gods' lights drift low and scattered across a grey plain
//                (freeze-frame): small dim lights under an ash sky
// The camera drifts slowly down over the whole beat.
//
// Beat 3: Beat 2's last frame, breathing. A small lamp lights for each
// option chosen. At the reveal the scattered lights gather and travel up to a
// rose-gold glow (Brahma), then on to silver and blue (Shiva and Vishnu).

import { easeInOut, lerp, progress } from '../../engine/anim';
import { SmokeShape, SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { type Cam, Diya, fadeIn, Glow, Haze, Layer, rand, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, linesOf } from '../day1/common';
import { AshPlain, GodOrb, GODS, Throne } from './kit';

const e = palettes.n6exile;
const LIGHTS = GODS.slice(0, 12);

// Where light i is: in the battle line on the far ridge, or wandering on the plain.
const linePlace = (i: number) => ({ x: 330 + i * 36, y: 478 + Math.sin(i * 1.7) * 6 });
const plainPlace = (i: number) => ({ x: 120 + rand(i, 61) * 1360, y: 730 + rand(i, 62) * 120 });

interface ExileState {
  t: number;
  clash: number; // 0–1: the two hosts visible on the far ridge
  lost: number; // 0–1: the gods' lights dim
  throne: number; // 0–1: the throne in the clouds, and the smoke settling on it
  sunMoon: number; // 0–1: the sun and moon fade under smoke
  wander: number; // 0–1: the lights drift down onto the plain
}

// The whole exile scene at a given state, so Beat 3 can reuse its last frame.
export function ExileScene({ t, clash, lost, throne, sunMoon, wander }: ExileState) {
  // Indra's white light slips down from the throne as the smoke settles.
  const indraFall = easeInOut(progress(throne, 0.4, 1));
  return (
    <>
      <AshPlain t={t} />
      <Layer depth={0.1}>
        {/* The sun and the moon, whose work Mahishasura takes. */}
        <g opacity={1 - 0.75 * sunMoon}>
          <circle cx={250} cy={150} r={26} fill="none" stroke="#F2C66B" strokeWidth={2} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={`M ${250 + Math.cos(a) * 34} ${150 + Math.sin(a) * 34} L ${250 + Math.cos(a) * 46} ${150 + Math.sin(a) * 46}`} stroke="#F2C66B" strokeWidth={2} strokeLinecap="round" />;
          })}
          <SymbolIcon name="moon" x={1350} y={150} size={0.9} colour={e.highlight} />
        </g>
        {sunMoon > 0 && (
          <>
            <SmokeShape x={250} y={160} t={t} size={0.8 * sunMoon} seed={4} opacity={0.8} colour="#2A2D40" ember="#2A2D40" />
            <SmokeShape x={1350} y={160} t={t} size={0.8 * sunMoon} seed={6} opacity={0.8} colour="#2A2D40" ember="#2A2D40" />
          </>
        )}
      </Layer>
      <Layer depth={0.12} opacity={throne}>
        {/* Indra's throne high in the clouds, with smoke settling on it. */}
        <Haze y={270} colour={e.highlight} opacity={0.14} t={t} />
        <Throne x={800} y={300} scale={0.8} colour="#C9B27A" />
        <SmokeShape x={800} y={lerp(140, 230, throne)} t={t} size={0.9} seed={3} opacity={0.9 * throne} colour="#2A2338" />
      </Layer>
      {throne > 0 && indraFall < 1 && (
        <Layer depth={0.12}>
          <GodOrb x={lerp(800, 860, indraFall)} y={lerp(250, 470, indraFall)} t={t} colour="#F4F7FF" size={0.4} strength={1 - indraFall * 0.7} />
        </Layer>
      )}
      <Layer depth={0.2} opacity={clash * (1 - wander)}>
        {/* The asuras, as smoke, pressing against the line of lights. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <SmokeShape key={i} x={880 + i * 90 - lost * 40 + Math.sin(t * 0.8 + i) * 12} y={470 - (i % 2) * 18} t={t} size={0.45} seed={i + 1} opacity={0.85} colour="#262033" />
        ))}
      </Layer>
      <Layer depth={lerp(0.2, 0.6, wander)}>
        {LIGHTS.map((god, i) => {
          const a = linePlace(i);
          const b = plainPlace(i);
          const w = easeInOut(progress(wander, i * 0.03, 0.6 + i * 0.03));
          const x = lerp(a.x - lost * 30, b.x, w) + Math.sin(t * 0.3 + i) * 10 * w;
          const y = lerp(a.y, b.y, w);
          const strength = clash * lerp(1, 0.4, lost);
          return (
            <g key={god.id} opacity={strength}>
              <Glow x={x} y={y} r={lerp(30, 50, w)} colour={god.colour} opacity={0.6} />
              <circle cx={x} cy={y} r={lerp(3.5, 5, w)} fill={god.colour} />
            </g>
          );
        })}
      </Layer>
    </>
  );
}

export function HeavenLost({ beat, t, duration, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const state: ExileState = complete
    ? { t, clash: 1, lost: 1, throne: 1, sunMoon: 1, wander: 1 }
    : {
        t,
        clash: fadeIn(t, 0.5, 3),
        lost: fadeIn(t, at(2), 3),
        throne: fadeIn(t, at(3), 4),
        sunMoon: fadeIn(t, at(4), 4),
        wander: easeInOut(progress(t, at(5), at(5) + 8)),
      };
  // A slow aerial drift down over the whole beat.
  const p = complete ? 1 : easeInOut(progress(t, 0, duration));
  const cam: Cam = { x: 0, y: lerp(50, -50, p), zoom: lerp(1.1, 1.04, p), rot: 0 };
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <ExileScene {...state} />
    </Stage>
  );
}

export function GodsGoForHelp({ beat, t, frozen, complete, cues }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  // The lights gather and rise to Brahma (0–6 s), then all go on to Shiva and Vishnu (6–13 s).
  const gather = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 6));
  const onward = reveal < 0 ? 0 : easeInOut(progress(reveal, 6, 13));
  const brahma = reveal < 0 ? 0 : fadeIn(reveal, 1, 3);
  const shivaVishnu = reveal < 0 ? 0 : fadeIn(reveal, 6, 3);
  const cam: Cam = { x: 0, y: lerp(-50, 40, gather * 0.6 + onward * 0.4), zoom: 1.04 + Math.sin(t * 0.4) * 0.006, rot: 0 };
  const bx = 800;
  const by = lerp(330, 230, onward);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <rect x={-200} y={-200} width={2000} height={1300} fill={e.shadow} />
      {/* Beat 2's last frame, breathing. */}
      <g opacity={1 - 0.6 * gather}>
        <ExileScene t={t} clash={1} lost={1} throne={1 - gather} sunMoon={1} wander={1} />
      </g>
      {gather > 0 && (
        <>
          <Layer depth={0.3}>
            <GodOrb x={bx} y={by} t={t} colour="#F2B58A" size={0.7} strength={brahma} />
            <GodOrb x={620} y={170} t={t} colour="#DCE6FF" size={0.75} strength={shivaVishnu} />
            <GodOrb x={980} y={170} t={t} colour="#93AEF5" size={0.75} strength={shivaVishnu} />
          </Layer>
          <Layer depth={0.5}>
            {LIGHTS.map((god, i) => {
              const a = plainPlace(i);
              const ring = { x: bx + Math.cos(i * 0.52 + t * 0.15) * 190, y: by + 150 + Math.sin(i * 0.52 + t * 0.15) * 50 };
              const w = easeInOut(progress(gather, i * 0.03, 0.7 + i * 0.03));
              const x = lerp(a.x, ring.x, w);
              const y = lerp(a.y, ring.y, w);
              return (
                <g key={god.id}>
                  <Glow x={x} y={y} r={36} colour={god.colour} opacity={0.6} />
                  <circle cx={x} cy={y} r={4} fill={god.colour} />
                </g>
              );
            })}
          </Layer>
        </>
      )}
      <Layer depth={0.9}>
        {/* One small lamp for each option, lit when it is chosen. */}
        {[0, 1, 2, 3].map((i) => (
          <Diya key={i} x={110 + i * 80} y={880} t={t + i} scale={0.4} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
    </Stage>
  );
}
