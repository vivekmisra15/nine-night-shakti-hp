// Beats 14–17 and the closing: Side by side, the look-back over all nine
// nights, Today, Reflection, and the end of the series.
//
// Beat 15, step 15.1: the lotus of light at the centre of dark water. As each
// night's line is read, one diya around it lights, in order, with that night's
// small symbol beside it as a gold icon. As the ninth lights, the ring turns
// once, slowly (the music plays the series' rising phrase whole).
// Step 15.2: the ring holds; fine gold threads link the diyas named in each
// thread that kept coming back. The camera cranes up towards an aerial view.
//
// The closing (14 seconds): the saffron dawn of Vijayadashami rises behind
// the ring of nine diyas, which lifts into the nine-diya map, every diya lit
// along the finished dotted path.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, line, LotusSeat, NightIcon, NineDiyaRing, ringPlace, VioletNight, WandOfLight } from './kit';

// When diya i lights in step 15.1 (seconds into the look-back).
export const diyaLightsAt = (i: number) => 3 + i * 3.5;
const NINTH = diyaLightsAt(8);

// The ring sits on the water around the lotus.
const RING = { cx: 800, cy: 640, rx: 560, ry: 170 };

// The threads that kept coming back, as the nights each one names.
const threads = [
  [1, 9],
  [3, 5, 7],
  [3, 7, 8],
  [1, 6],
  [6, 9],
  [1, 8],
];

// The lotus at the centre with its warm light (Siddhidatri's seat).
function CentreLotus({ t, pulse = 0, light = 1 }: { t: number; pulse?: number; light?: number }) {
  return (
    <>
      <Glow x={RING.cx} y={RING.cy - 60} r={260} colour="#F4B6C2" opacity={0.25 * light} />
      <LotusSeat x={RING.cx} y={RING.cy} size={0.9} open={1} t={t} glow={0.8 + pulse * 0.3} />
      <ellipse cx={RING.cx} cy={RING.cy + 14} rx={110} ry={8} fill="#F4B6C2" opacity={0.18} />
    </>
  );
}

// Beat 15: the look-back.
export function LookBack({ beat, t, frozen, complete, pulse, stepKind }: VisualProps) {
  const T = complete ? 120 : t;
  const cam = cameraFor('crane', progress(T, 0, NINTH + 12), T);
  const lit = (i: number) => fadeIn(T, diyaLightsAt(i), 1.2);
  const turn = complete ? 0 : easeInOut(progress(T, NINTH + 1.5, NINTH + 13));
  // Step 15.2 (and the activity after it): fine gold threads link the diyas
  // each thread names, brightening one after another in turn.
  const threadsOn = complete || stepKind === 'lookBackThreads' || stepKind === 'lookBackActivity';
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <VioletNight t={T} waterY={470} />
      <Layer depth={0.6}>
        <CentreLotus t={T} pulse={pulse} />
        {threads.map((nights, k) => {
          if (!threadsOn) return null;
          const show = 1;
          const bright = 0.3 + 0.4 * Math.max(0, Math.sin(((T / 3 - k) * Math.PI) / threads.length) ** 8);
          const pts = nights.map((n) => ringPlace(n - 1, RING.cx, RING.cy, RING.rx, RING.ry, turn));
          const d = pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y - 30}`).join(' ');
          return <path key={k} d={d} fill="none" {...line('#E8B33C', 1.4)} opacity={show * bright} />;
        })}
        <NineDiyaRing {...RING} t={T} lit={lit} turn={turn} pulse={pulse} />
        <Particles kind="dust" t={T} count={20} colour="#FFF6E8" opacity={0.25 * lit(8)} area={{ x: 400, y: 300, w: 800, h: 300 }} />
      </Layer>
    </Stage>
  );
}

// Beat 14: Side by side. A faint night sky with the lotus of light on one
// side and a wand of light on the other, far apart.
export function SideBySide({ beat, t, frozen, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <VioletNight t={t} />
      <Layer depth={0.6}>
        <LotusSeat x={400} y={700} size={0.9} open={1} t={t} />
        <Glow x={400} y={620} r={200} colour="#F29F3D" opacity={0.3 + pulse * 0.1} />
        <WandOfLight x1={1080} y1={620} x2={1320} y2={580} glow={0.8} />
      </Layer>
    </Stage>
  );
}

// The finished ring, every diya lit (Today and Reflection).
function LitRing({ t, pulse, dawn = 0 }: { t: number; pulse: number; dawn?: number }) {
  return (
    <>
      <VioletNight t={t} waterY={470} dawn={dawn} />
      <Layer depth={0.6}>
        <CentreLotus t={t} pulse={pulse} />
        <NineDiyaRing {...RING} t={t} lit={() => 1} pulse={pulse} />
      </Layer>
    </>
  );
}

// Beat 16: Today. The ring of diyas, faint, behind the situation.
export function Today({ beat, t, frozen, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <g opacity={0.75}>
        <LitRing t={t} pulse={pulse} />
      </g>
    </Stage>
  );
}

// Beat 17: Reflection. The ring of diyas while the camera slowly pulls back;
// when the theme is shown again (step 17.2), the sky begins to pale.
export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, false);
  const dawn = takeaway < 0 ? 0 : 0.35 * easeInOut(progress(takeaway, 0, 10));
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <LitRing t={t} pulse={pulse} dawn={dawn} />
    </Stage>
  );
}

// Where diya i sits on the nine-diya map: a winding dotted path.
const mapPlace = (i: number) => ({ x: 180 + i * 155, y: 720 + Math.sin(i * 1.15 + 0.4) * 70 });
const mapPath = Array.from({ length: 9 }, (_, i) => mapPlace(i))
  .map((p, i, all) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = all[i - 1];
    return `Q ${(prev.x + p.x) / 2} ${prev.y + (p.y - prev.y) * 0.1 - 30} ${p.x} ${p.y}`;
  })
  .join(' ');

// The closing, played by itself after Finish (14 seconds; see closing in
// day9.ts). Registered as 'n9-closing'.
export function Closing({ t }: { t: number }) {
  const dawn = easeInOut(progress(t, 0, 6));
  const lift = easeInOut(progress(t, 5, 10.5));
  const out = fadeIn(t, 12.5, 1.5);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 9 closing">
      <VioletNight t={t} waterY={470} dawn={dawn} />
      <Layer depth={0.6}>
        <g opacity={1 - lift}>
          <CentreLotus t={t} />
        </g>
        {/* The finished dotted path of the map, appearing as the ring lifts. */}
        <path d={mapPath} pathLength={1} fill="none" stroke="#FFF3DA" strokeWidth={3} strokeDasharray="0.006 0.012" opacity={0.7 * lift} />
        {Array.from({ length: 9 }, (_, i) => {
          const from = ringPlace(i, RING.cx, RING.cy, RING.rx, RING.ry);
          const to = mapPlace(i);
          const x = lerp(from.x, to.x, lift);
          const y = lerp(from.y, to.y, lift) - Math.sin(lift * Math.PI) * 60;
          const scale = lerp(0.5 + 0.12 * from.front, 0.42, lift);
          return (
            <g key={i}>
              <Glow x={x} y={y - 10} r={90} colour="#F7B733" opacity={0.3} />
              <Diya x={x} y={y} t={t + i} scale={scale} />
              <NightIcon night={i + 1} x={x} y={y + 52 * scale + 26} size={0.42} opacity={0.9} />
            </g>
          );
        })}
      </Layer>
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
