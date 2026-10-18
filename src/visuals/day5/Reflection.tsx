// Beat 16: Reflection, and the night's closing.
// The lotus lake before dawn, with the Devi's warm glow faint on the far
// shore and the child-light on her lap, both turned towards the horizon.
// When the theme appears at the end (16.2), the sky brightens to dawn.
//
// The closing (13 seconds, after Finish): dawn over the lotus lake; the
// Devi's glow with the child on her lap, facing the horizon. The spark lifts
// from her lap and flies out of the frame, to become diya 5 on the map.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { cameraFor, fadeIn, Glow, H, Layer, Lotus, Particles, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { DeviOnLotus, p, Spark } from './kit';

const c = p.n5motherGold;
const d = p.n5battleDawn;

// The lake, from night (dawn = 0) to first light (dawn = 1).
function LotusLake({ t, dawn, devi = 0.6, child = 1, pulse = 0 }: { t: number; dawn: number; devi?: number; child?: number; pulse?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#141A33" bottom="#2A1A10" t={t} stars={50} starColour={c.highlight} />
        <g opacity={dawn}>
          <Sky top="#4A3550" bottom={d.primary} t={t} />
        </g>
        <Glow x={800} y={600} r={800} colour={d.highlight} opacity={0.25 * dawn} />
      </Layer>
      <Layer depth={0.2}>
        <path d="M -400 600 Q 200 570 800 585 Q 1400 570 2000 600 L 2000 640 L -400 640 Z" fill="#1E1420" />
      </Layer>
      <Layer depth={0.4}>
        {/* The still lake, reflecting the sky. */}
        <rect x={-400} y={620} width={2400} height={600} fill="#1A2238" />
        <rect x={-400} y={620} width={2400} height={600} fill={d.primary} opacity={0.25 * dawn} />
        {/* The Devi on the far shore, faint, facing the horizon with the child on her lap. */}
        <g opacity={devi}>
          <DeviOnLotus x={800} y={500} t={t} size={0.7} pulse={pulse} outline={0.2} child={child} seat={0.8} />
        </g>
      </Layer>
      <Layer depth={0.75}>
        {[220, 420, 1150, 1380, 640, 980].map((x, i) => (
          <Lotus key={x} x={x} y={780 + (i % 3) * 40} scale={0.7 + (i % 2) * 0.2} colour={c.secondary} centre={c.accent} />
        ))}
        <Particles kind="dust" t={t} count={16} colour={c.highlight} opacity={0.3} area={{ x: 300, y: 300, w: 1000, h: 400 }} />
      </Layer>
    </>
  );
}

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const theme = cueAge(cues, 'takeaway', t, false);
  const dawn = theme >= 0 ? easeInOut(progress(theme, 0, 6)) : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <LotusLake t={t} dawn={dawn} devi={0.5 + 0.4 * dawn} pulse={pulse} />
    </Stage>
  );
}

// The closing (13 seconds; see closing in day5.ts). Registered as 'n5-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = easeInOut(progress(t, 0, 5));
  const lift = progress(t, 9, 12);
  const out = fadeIn(t, 11.5, 1.5);
  // The spark rises from her lap and flies out of the frame, to the map.
  const sx = lerp(800, 1500, easeInOut(lift)) + Math.sin(lift * 5) * 20;
  const sy = lerp(535, -60, easeInOut(lift));
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 5 closing">
      <LotusLake t={t} dawn={dawn} devi={0.9} child={1} />
      {lift > 0 && lift < 1 && <Spark x={sx} y={sy} t={t} size={1.2} from={[sx - 20, sy + 24]} />}
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
