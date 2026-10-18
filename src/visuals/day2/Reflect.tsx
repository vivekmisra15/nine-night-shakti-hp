// Beats 15–17 and the closing.
//
// Beat 15, Side by side: the night sky with a faint flame and a faint silver
//   mist side by side, never blending.
// Beat 16, Today: the night sky and a small flame, with the faint lines of a
//   school playing field: an ordinary place, no people.
// Beat 17, Reflection: dawn beginning over the ridge; the bead ring complete.
// The closing (13 seconds, after Finish): dawn over the Himalaya; the theme
//   is shown over it by the closing screen. The bead ring draws in to a
//   single bead of light, which rises out of the frame (it becomes diya 2 on
//   the map); then the picture fades.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, H, Layer, Particles, Ridge, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { BEADS, BeadRing, Stars } from './kit';

const r = palettes.reflective;
const k = palettes.kailasa;
const lake = palettes.n2nightLake;

function NightSky({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom={r.secondary} t={t} />
        <Stars t={t} count={70} colour={r.highlight} />
      </Layer>
      <Layer depth={0.25}>
        <Ridge seed={3} baseY={760} height={120} fill="#1A2045" />
      </Layer>
    </>
  );
}

export function SideBySide({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <NightSky t={t} />
      <Layer depth={0.5}>
        {/* The flame on the left; the silver mist on the right; a clear gap between. */}
        <DivineLight x={560} y={520} t={t * 0.5} kind="warm" size={0.6} strength={0.8} />
        {Array.from({ length: 6 }, (_, i) => (
          <Glow key={i} x={1040 + Math.sin(t / 3 + i) * 40 + i * 12} y={460 + Math.cos(t / 4 + i) * 30} r={70 + i * 10} colour={lake.accent} opacity={0.18} />
        ))}
      </Layer>
    </Stage>
  );
}

export function Today({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <NightSky t={t} />
      <Layer depth={0.5}>
        <rect x={-400} y={700} width={2400} height={500} fill="#141A33" />
        {/* The faint white lines of a school field, and a goal in the distance. */}
        <g stroke={r.primary} strokeWidth={2} fill="none" opacity={0.25}>
          <path d="M 200 900 L 560 720 L 1040 720 L 1400 900" />
          <line x1={800} y1={720} x2={800} y2={900} />
          <ellipse cx={800} cy={800} rx={120} ry={30} />
          <path d="M 740 720 L 740 660 L 860 660 L 860 720" />
        </g>
        <Glow x={800} y={530} r={200} colour={r.accent} opacity={0.2} />
        <DivineLight x={800} y={560} t={t * 0.5} kind="warm" size={0.45} strength={0.8} />
        <Particles kind="fireflies" t={t} count={12} colour={r.highlight} opacity={0.4} area={{ x: 300, y: 500, w: 1000, h: 250 }} />
      </Layer>
    </Stage>
  );
}

// The ridge at dawn, `dawn` 0 (night) to 1 (rose light).
function DawnRidge({ t, dawn }: { t: number; dawn: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={k.shadow} bottom={k.secondary} t={t} />
        <g opacity={dawn}>
          <Sky top="#5A4E7A" bottom="#F4C27A" t={t} />
        </g>
        <g opacity={1 - dawn}>
          <Stars t={t} count={60} colour={k.highlight} />
        </g>
        <Glow x={800} y={640} r={600} colour="#FFE3A3" opacity={0.3 * dawn} />
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={3} baseY={560} height={150} fill={dawn > 0.5 ? '#7A6C96' : '#2B3A6E'} peak={{ x: 800, h: 300 }} snow={k.primary} />
      </Layer>
      <Layer depth={0.3}>
        <Ridge seed={7} baseY={700} height={120} fill={dawn > 0.5 ? '#4E4470' : '#1A2550'} />
      </Layer>
      <Layer depth={0.6}>
        <Ridge seed={11} baseY={860} height={90} fill="#141A33" />
      </Layer>
    </>
  );
}

export function Reflection({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const dawn = complete ? 0.35 : 0.35 * fadeIn(t, 2, 20);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <DawnRidge t={t} dawn={dawn} />
      <Layer depth={0.9}>
        <BeadRing lit={BEADS} t={t} y={780} />
        <DivineLight x={800} y={760} t={t * 0.5} kind="warm" size={0.4} pulse={pulse} />
      </Layer>
    </Stage>
  );
}

// The closing animation, played by itself after Finish (13 seconds; see
// closing in day2.ts). Registered as 'n2-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = lerp(0.35, 1, easeInOut(progress(t, 0, 5)));
  // The ring draws in to one bead (4–8 s), which then rises out of the frame (8.5–11.5 s).
  const draw = easeInOut(progress(t, 4, 8));
  const rise = easeInOut(progress(t, 8.5, 11.5));
  const out = fadeIn(t, 11.5, 1.5);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 2 closing">
      <DawnRidge t={t} dawn={dawn} />
      <Layer depth={0.9}>
        {draw < 1 && <BeadRing lit={BEADS} t={t} y={780} rx={lerp(140, 4, draw)} ry={lerp(30, 2, draw)} opacity={0.85 * (1 - draw * 0.5)} />}
        {draw > 0.6 && (
          <g>
            <Glow x={800} y={lerp(780, -60, rise)} r={50} colour="#FFF4D6" opacity={0.9 * fadeIn(t, 7, 1)} />
            <circle cx={800} cy={lerp(780, -60, rise)} r={7} fill="#FFF4D6" />
          </g>
        )}
      </Layer>
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
