// Beats 10–11: Kreacher's tale, and "Think it through" after it.
// Abstract only: told through objects and light. No characters are drawn.
//
// Beat 10, following the retelling sentence by sentence:
//   0–1   a dark, cluttered kitchen lit by one candle; a tarnished oval
//         locket on the table
//   2     the scene dims to dark water in a cave: a small boat-shaped glow
//         and a basin with a faint glow (no figures); a soft drip
//   3     a second, smaller candle over the water goes out, gently (Regulus)
//   4     back in the kitchen
//   5     the locket is set down beside the candle; the candle steadies
//         (freeze-frame)
//   6     the kitchen brightens: pans glint, a folded white cloth, the
//         locket gleaming (push-in on the locket)
//   7     many tiny lights stream out of the kitchen door into a dark hall

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, Candle, fadeIn, Glow, H, Layer, mixCam, rand, Smoke, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';
import { Locket, mix } from './kit';

const k = palettes.n8grimmauldKitchen;
const CANDLE = { x: 720, y: 520 };
const LOCKET_REST = { x: 830, y: 590 };

// The kitchen at Grimmauld Place. `bright` (0 to 1) is how scrubbed and
// warm it is; `door` (0 to 1) opens the door on the right; `steady` calms
// the candle's flame.
export function Kitchen({ t, bright, steady, door = 0, locket, gleam }: { t: number; bright: number; steady: number; door?: number; locket: { x: number; y: number }; gleam: number }) {
  const lean = (1 - steady) * 14 * Math.sin(t * 1.7);
  return (
    <>
      <Layer depth={0.1}>
        {/* Stone walls, ink-blue, warming as the kitchen is scrubbed. */}
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={mix(k.shadow, '#2A2A3A', bright)} />
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} x={(i % 10) * 180 - 120 + (Math.floor(i / 10) % 2) * 90} y={Math.floor(i / 10) * 110 + 40} width={170} height={100} fill="none" stroke={k.primary} strokeWidth={3} opacity={0.6} />
        ))}
        {/* The doorway on the right, to the dark hall. */}
        <rect x={1300} y={150} width={200} height={470} fill="#05060A" />
        <rect x={1300} y={150} width={200} height={470} fill={k.accent} opacity={0.15 * door} />
        <path d={`M 1300 150 L ${lerp(1500, 1360, door)} ${lerp(150, 120, door)} L ${lerp(1500, 1360, door)} ${lerp(620, 650, door)} L 1300 620 Z`} fill="#3A2E1E" />
      </Layer>
      <Layer depth={0.3}>
        {/* Shelves of pans: dull at first, glinting once scrubbed. */}
        <rect x={60} y={260} width={520} height={8} fill={k.secondary} />
        <rect x={60} y={400} width={520} height={8} fill={k.secondary} />
        {[110, 230, 350, 470].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={i % 2 ? 220 : 360} r={36} fill={mix('#3A3426', '#B8954F', bright)} />
            <rect x={x + 32} y={(i % 2 ? 220 : 360) - 4} width={50} height={8} fill={mix('#3A3426', '#8A7445', bright)} />
            {bright > 0.3 && <path d={`M ${x - 18} ${(i % 2 ? 220 : 360) - 20} Q ${x - 6} ${(i % 2 ? 220 : 360) - 30} ${x + 8} ${(i % 2 ? 220 : 360) - 26}`} stroke="#FFD9A0" strokeWidth={3} strokeLinecap="round" fill="none" opacity={bright * (0.6 + 0.4 * Math.sin(t * 2 + i))} />}
          </g>
        ))}
        {/* Clutter in the dark: jars, dimming as the room is cleared. */}
        {[120, 200, 300, 420, 520].map((x, i) => (
          <rect key={x} x={x} y={410 - 30 - (i % 2) * 20} width={30} height={30 + (i % 2) * 20} fill="#22202A" opacity={1 - bright} />
        ))}
      </Layer>
      <Layer depth={0.6}>
        {/* The long table. */}
        <path d="M -100 600 L 1700 600 L 1800 960 L -200 960 Z" fill={mix('#1E1A16', '#4A3A28', bright)} />
        <path d="M -100 600 L 1700 600" stroke={k.secondary} strokeWidth={4} opacity={0.7} />
        <Glow x={CANDLE.x} y={CANDLE.y} r={lerp(240, 520, bright)} colour={k.accent} opacity={lerp(0.35, 0.5, bright)} />
        <Candle x={CANDLE.x} y={CANDLE.y} t={t} scale={1.2} lean={lean} outer={k.accent} />
        {/* A folded white cloth, once the kitchen is clean. */}
        <g opacity={bright}>
          <path d="M 960 590 L 1100 590 L 1110 610 L 950 610 Z" fill="#EFE6D2" />
          <path d="M 950 610 L 1110 610 L 1100 630 L 960 630 Z" fill="#DCD2BE" />
        </g>
        <Locket x={locket.x} y={locket.y} scale={1.1} gleam={gleam} />
      </Layer>
    </>
  );
}

// The cave by the sea: dark water, a rock arch, a small boat-shaped glow and
// a basin with a faint glow. No figures. `candle` is the small candle over
// the water (1 = lit, 0 = out); `out` is when it went out.
function Cave({ t, candle, out }: { t: number; candle: number; out: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#05070C" />
        {/* The rock arch overhead. */}
        <path d="M -400 -400 L 2000 -400 L 2000 700 Q 1700 160 800 120 Q -100 160 -400 700 Z" fill="#0C0F18" />
      </Layer>
      <Layer depth={0.4}>
        <rect x={-400} y={560} width={2400} height={600} fill="#08101C" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M -400 ${600 + i * 40} Q 800 ${596 + i * 40 + Math.sin(t * 0.5 + i) * 4} 2000 ${600 + i * 40}`} stroke="#4A6A8A" strokeWidth={1} opacity={0.18} fill="none" />
        ))}
        {/* The basin on its rock island, with a faint glow. */}
        <path d="M 1000 560 Q 1100 520 1200 560 Z" fill="#141A24" />
        <path d="M 1060 530 Q 1100 556 1140 530 Z" fill="#1E2A30" />
        <Glow x={1100} y={530} r={100} colour="#BFE0E8" opacity={0.3} />
        {/* The small boat, a faint glow at its prow. */}
        <path d="M 420 640 Q 500 670 580 640" stroke="#4A6A8A" strokeWidth={4} fill="none" opacity={0.7} />
        <Glow x={500} y={640} r={80} colour="#BFE0E8" opacity={0.2} />
        {/* The second, smaller candle over the water, going out gently. */}
        <Candle x={820} y={560} t={t} scale={0.7} lit={candle} outer="#E8B45A" />
        <Smoke x={820} y={560} t={t} start={out} life={6} opacity={0.35} />
      </Layer>
      <Layer depth={0.8}>
        {/* A drip, falling now and then. */}
        {(() => {
          const phase = (t * 0.5) % 1;
          return <circle cx={1300} cy={lerp(180, 600, phase)} r={3} fill="#9FB8D0" opacity={0.5 * (1 - phase)} />;
        })()}
      </Layer>
    </>
  );
}

export function KreachersTale({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const time = complete ? L[L.length - 1].end + 2 : t;

  const toCave = fadeIn(time, at(2), 2.5) * (1 - fadeIn(time, at(4), 2.5));
  const candleOut = at(3) + 2;
  const candle = 1 - progress(time, at(3) + 1, candleOut);
  // The locket is set down beside the candle at sentence 5.
  const set = easeInOut(progress(time, at(5), at(5) + 3));
  const locket = { x: lerp(1200, LOCKET_REST.x, set), y: lerp(610, LOCKET_REST.y, set) - Math.sin(set * Math.PI) * 60 };
  const steady = fadeIn(time, at(5) + 2, 2);
  const bright = easeInOut(progress(time, at(6), at(6) + 5));
  const door = fadeIn(time, at(7), 2);
  const stream = progress(time, at(7) + 1, at(7) + 12);

  // Drift, then push in on the locket from sentence 5.
  const drift: Cam = { x: Math.sin(time / 9) * 30, y: Math.sin(time / 13) * 8, zoom: 1.06, rot: 0 };
  const push: Cam = { x: -60, y: -80, zoom: 1.3, rot: 0 };
  let cam = mixCam(drift, push, easeInOut(progress(time, at(5), at(6) + 4)));
  cam = mixCam(cam, { x: -120, y: 0, zoom: 1.08, rot: 0 }, easeInOut(progress(time, at(7), at(7) + 4)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toCave < 1 && <Kitchen t={time} bright={bright} steady={steady} door={door} locket={locket} gleam={bright} />}
      {toCave > 0 && (
        <g opacity={toCave}>
          <Cave t={time} candle={candle} out={candleOut} />
        </g>
      )}
      {stream > 0 && (
        <Layer depth={0.3}>
          {/* Many tiny lights streaming out through the door into the hall. */}
          {Array.from({ length: 40 }, (_, i) => {
            const p = (stream * 2.5 + rand(i, 5)) % 1;
            return <circle key={i} cx={lerp(1100, 1520, p)} cy={300 + rand(i, 6) * 280 - p * 30} r={2 + rand(i, 7) * 2} fill="#FFD9A0" opacity={0.8 * (1 - p) * Math.min(1, stream * 5)} />;
          })}
        </Layer>
      )}
    </Stage>
  );
}

// Beat 11: the bright kitchen, the candle and the locket, softly blurred
// behind the questions. The candle brightens a little as each rung opens.
export function KitchenFrozen({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: -60, y: -60, zoom: 1.25, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <Kitchen t={12.4} bright={0.45 + 0.25 * (rungs / 6)} steady={1} locket={LOCKET_REST} gleam={1} />
      </g>
    </Stage>
  );
}
