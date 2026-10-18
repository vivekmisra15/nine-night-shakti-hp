// Beat 7: Should he lead the army? (a choice)
// Before the reveal: the Devi's lap of light, the child-light resting on it
// and Agni's spear beside it, with Shiva's silver light near. A small light
// glows for each option chosen.
//
// When the family reveals what happened (about 24 seconds):
//   0–4 s    the child-light leaves the lap and becomes the bright point of
//            a spear of light, at the head of a line of small outline gods
//   2–6 s    Taraka gathers: a massing smoke shape on the right
//   5–8 s    Brahma's gold-white light brightens above (he speaks; no words shown)
//   8–10 s   the spear of light goes in, slowly
//   10–14 s  the smoke dissolves into ember points that go out
//   12–17 s  dawn light
//   16–22 s  the child-light comes home to the laps of light
// No body, no wound: light pushes the smoke away.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline, SmokeShape, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { ChildLight, p } from './kit';
import { WarmKailasa } from './MothersLap';

const c = p.n5battleDawn;
const SHIVA: [number, number] = [240, 560];
const DEVI: [number, number] = [440, 560];
const LAP: [number, number] = [DEVI[0], DEVI[1] + 56];
const TARAKA: [number, number] = [1300, 640];

export function LeadTheArmy({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const r = cueAge(cues, 'reveal', t, complete);
  const after = (a: number, b: number) => (r < 0 ? 0 : easeInOut(progress(r, a, b)));

  const leave = after(0.5, 4);
  const gods = after(1, 3.5) * (1 - after(15, 19));
  const mass = after(2, 6);
  const brahma = after(5, 7) * (1 - after(14, 18));
  const strike = after(8, 10);
  const dissolve = after(10, 14);
  const dawn = after(12, 17);
  const home = after(16, 22);

  // The child: on the lap, then the spear's point, then home again.
  const front: [number, number] = [lerp(900, 1230, strike), 660];
  const cx = home > 0 ? lerp(front[0], LAP[0], home) : lerp(LAP[0], front[0], leave);
  const cy = home > 0 ? lerp(front[1], LAP[1], home) - Math.sin(home * Math.PI) * 140 : lerp(LAP[1], front[1], leave) - Math.sin(leave * Math.PI) * 120;
  const spear = leave * (1 - home);

  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <WarmKailasa t={t} dawn={dawn} />
      <Layer depth={0.2}>
        {/* Brahma: his light brightens as he tells Kumara he was born for this. */}
        <g opacity={brahma}>
          <DivineLight x={1000} y={200} t={t} kind="gold" size={0.6} strength={1.3} />
        </g>
      </Layer>
      <Layer depth={0.6}>
        {/* Shiva's silver light and the Devi's lap of light. */}
        <DivineLight x={SHIVA[0]} y={SHIVA[1]} t={t} kind="silver" size={0.7} strength={0.8 + 0.3 * home} pulse={pulse} />
        <Glow x={DEVI[0]} y={DEVI[1]} r={280} colour="#E3A93B" opacity={0.3} />
        <path d={`M ${LAP[0] - 90} ${LAP[1] - 6} Q ${LAP[0]} ${LAP[1] + 36} ${LAP[0] + 90} ${LAP[1] - 6}`} stroke="#FFE3A3" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
        <DivineLight x={DEVI[0]} y={DEVI[1]} t={t} kind="warm" size={0.95} pulse={pulse} />
        <DeviOutline x={DEVI[0]} y={DEVI[1] - 64} size={1.25} opacity={0.22} />
        {/* Agni's spear beside the lap, until he takes it up. */}
        <SymbolIcon name="vel" x={LAP[0] + 110} y={LAP[1] - 10} size={1.3} colour="#F7B733" opacity={1 - spear} />
      </Layer>
      <Layer depth={0.7}>
        {/* Taraka, a massing smoke, dissolving into ember points that go out. */}
        {r >= 0 && (
          <SmokeShape x={TARAKA[0]} y={TARAKA[1]} t={t} seed={5} size={lerp(0.5, 1.7, mass)} dissolve={dissolve} colour="#221E28" ember="#E2552B" opacity={0.95} />
        )}
        {dissolve > 0 && dissolve < 1 &&
          Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const d = 60 + dissolve * 260;
            return <circle key={i} cx={TARAKA[0] + Math.cos(a) * d} cy={TARAKA[1] + Math.sin(a) * d * 0.6 - dissolve * 80} r={3} fill="#E2552B" opacity={(1 - dissolve) * 0.8} />;
          })}
        {/* The gods behind him, small outlines in a line. */}
        {gods > 0 &&
          [0, 1, 2, 3, 4].map((i) => (
            <Outline key={i} x={lerp(600, 880 - i * 70, gods)} y={770} scale={0.3} colour="#F3E2C0" opacity={0.7 * gods} />
          ))}
        {/* The spear of light, with the child-light as its bright point. */}
        {spear > 0.02 && (
          <g opacity={spear}>
            <path d={`M ${cx - 200} ${cy + 18} L ${cx - 10} ${cy}`} stroke={c.accent} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
            <Glow x={cx - 100} y={cy + 9} r={90} colour={c.accent} opacity={0.25} />
          </g>
        )}
        <ChildLight x={cx} y={cy} t={t} size={0.85} faces={1} />
        {/* One small light for each option chosen. */}
        {[0, 1, 2, 3].map((i) => {
          const lit = cueAge(cues, `pick:${i}`, t, false) >= 0;
          return (
            <g key={i}>
              {lit && <Glow x={100 + i * 40} y={860} r={26} colour={c.accent} opacity={0.9} />}
              <circle cx={100 + i * 40} cy={860} r={3} fill={lit ? '#FFFFFF' : '#5A4A3A'} />
            </g>
          );
        })}
      </Layer>
      {/* The first light of dawn after the battle. */}
      {dawn > 0 && <Glow x={1300} y={700} r={900} colour={c.highlight} opacity={0.2 * dawn * fadeIn(r, 12, 3)} />}
    </Stage>
  );
}
