// Beat 5: The messengers at the door (a choice).
// The Krittikas' home under the six stars, ringed by a wide crowd of outline
// attendants led by Nandin (the bull, as a gold outline icon). The six women
// draw close round the doorway where the child-light rests. A small star
// lights for each option chosen. When the family reveals what happened, the
// child-light and the six women travel up the mountain path together,
// towards Kailasa, where the silver and warm lights wait.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline, SymbolIcon } from '../figures';
import { cameraFor, Glow, Layer, LightTrail, Ridge, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { along, ChildLight, p } from './kit';
import { Home, KrittikaNight } from './SixMothers';

const c = p.n5krittikaStars;
const pathPoints: [number, number][] = [[800, 600], [620, 560], [520, 480], [400, 420], [300, 360]];
const pathD = 'M 800 600 Q 640 580 560 500 Q 470 420 300 360';

export function Messengers({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const revealAge = cueAge(cues, 'reveal', t, complete);
  const go = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 0.5, 14));
  const back = revealAge < 0 ? 0 : easeInOut(progress(revealAge, 0, 4));
  const cam = cameraFor('still', 0, t);
  const [cx, cy] = along(pathPoints, go);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KrittikaNight t={t} />
      <Layer depth={0.15}>
        {/* Kailasa, far off, with the silver and warm lights waiting. */}
        <Ridge seed={14} baseY={560} height={90} fill="#1B2552" peak={{ x: 260, h: 260 }} snow="#C9D6F5" />
        <DivineLight x={220} y={300} t={t} kind="silver" size={0.22} />
        <DivineLight x={300} y={316} t={t} kind="warm" size={0.2} strength={1 + 0.4 * go} />
      </Layer>
      <Layer depth={0.35}>
        <LightTrail d={pathD} amount={1} colour={c.highlight} t={t} width={2} opacity={0.25 + 0.3 * go} />
        <Home x={800} y={640} opacity={1} />
      </Layer>
      <Layer depth={0.55}>
        {/* Shiva's host: a wide ring of outline attendants, wild-haired. */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = Math.PI * (0.05 + (i / 11) * 0.9);
          const x = 800 + Math.cos(a) * lerp(620, 760, back);
          const y = 860 - Math.sin(a) * 120;
          return <Outline key={i} x={x} y={y} scale={0.34} head="wild" colour="#B7C4DE" opacity={0.6 * (1 - 0.5 * back)} />;
        })}
        {/* Nandin, leading them: the bull. */}
        <Glow x={1180} y={760} r={120} colour={c.highlight} opacity={0.2} />
        <SymbolIcon name="bull" x={1180} y={770} size={1.8} colour={c.highlight} />
      </Layer>
      <Layer depth={0.65}>
        {/* The six Krittikas, close round the door; then walking with him up the path. */}
        {Array.from({ length: 6 }, (_, i) => {
          const home: [number, number] = [800 + (i < 3 ? -1 : 1) * (150 + (i % 3) * 85), 770];
          const u = Math.max(0, go - 0.04 * (i + 1));
          const [wx, wy] = go > 0 ? along(pathPoints, u) : home;
          const x = lerp(home[0], wx + (i - 2.5) * 10, Math.min(1, go * 4));
          const y = lerp(home[1], wy + 60, Math.min(1, go * 4));
          return <Outline key={i} x={x} y={y} scale={lerp(0.42, 0.18, go)} head="veiled" arms="heart" lean={go > 0 ? -10 : (i < 3 ? 6 : -6)} colour={c.highlight} opacity={0.85} />;
        })}
        <ChildLight x={cx} y={cy} t={t} size={lerp(0.9, 0.5, go)} faces={1} />
        {/* One small star for each option chosen. */}
        {[0, 1, 2, 3].map((i) => {
          const lit = cueAge(cues, `pick:${i}`, t, false) >= 0;
          return (
            <g key={i}>
              {lit && <Glow x={100 + i * 40} y={860} r={26} colour={c.accent} opacity={0.9} />}
              <circle cx={100 + i * 40} cy={860} r={3} fill={lit ? '#FFFFFF' : '#3A4680'} />
            </g>
          );
        })}
        <Glow x={cx} y={cy} r={140} colour={c.secondary} opacity={0.12 + pulse * 0.05} />
      </Layer>
    </Stage>
  );
}
