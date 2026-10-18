// Beats 11–12: The Patronus lessons, and "Think it through" after them.
// Abstract only: objects, light and places; no people, faces or film
// imagery. The player adds the letterbox bars.
//
// Beat 11, following the retelling sentence by sentence:
//   0   an empty classroom by candlelight; a tall wardrobe shape
//   1   the candles gutter and frost creeps in from the edges
//   2   a thin silver mist from a wand of light, then darkness (twice)
//   3   a brighter mist holds the cold back for a moment
//   4   candles burn down and are replaced, week after week
//   5   the lake at night, ringed by many dark shapes; a blaze of silver
//       from across the water
//   6   an hourglass turns; the far shore, empty
//   7   a silver stag of light runs across the lake (slow motion; freeze-frame)
// Camera: still in the classroom, then an aerial drift over the lake.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { Candle, fadeIn, fadeOut, Glow, H, Haze, Layer, mixCam, Particles, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { Stars } from './kit';

const room = palettes.n2lessonRoom;
const lake = palettes.n2nightLake;

// The classroom: stone wall, a tall window, a row of candles and the wardrobe.
// `lit` is how high the candle flames burn; `frost` 0 to 1; `wax` the candle length.
function Classroom({ t, lit, frost, wax }: { t: number; lit: number; frost: number; wax: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={room.primary} />
        {/* Stone courses. */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-400} y1={i * 100} x2={2000} y2={i * 100} stroke={room.shadow} strokeWidth={3} opacity={0.4} />
        ))}
        {/* A tall arched window, night outside. */}
        <path d="M 260 560 L 260 200 Q 340 110 420 200 L 420 560 Z" fill="#141A2A" stroke={room.shadow} strokeWidth={14} />
      </Layer>
      <Layer depth={0.4}>
        {/* The tall wardrobe shape, closed and still. */}
        <rect x={1060} y={180} width={240} height={540} fill="#262A34" stroke={room.shadow} strokeWidth={6} />
        <line x1={1180} y1={190} x2={1180} y2={710} stroke={room.shadow} strokeWidth={4} />
        <circle cx={1166} cy={450} r={5} fill={room.secondary} opacity={0.6} />
        <circle cx={1194} cy={450} r={5} fill={room.secondary} opacity={0.6} />
        <rect x={-400} y={720} width={2400} height={400} fill="#1A1D25" />
      </Layer>
      <Layer depth={0.6}>
        {/* A row of candles on a long desk. */}
        <rect x={180} y={640} width={720} height={24} fill="#3A2E24" />
        {[260, 420, 580, 740].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={640 - 80 * wax} r={110} colour={room.secondary} opacity={0.3 * lit} />
            <g transform={`translate(0 ${80 * (1 - wax)})`}>
              <Candle x={x} y={560} t={t + i} lit={lit} outer={room.secondary} />
            </g>
          </g>
        ))}
      </Layer>
      {/* Frost creeping in from the edges. */}
      {frost > 0 && (
        <g opacity={frost}>
          <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="none" stroke={room.accent} strokeWidth={260} opacity={0.18} />
          {/* Small frost crystals gathering near the edges. */}
          {Array.from({ length: 28 }, (_, i) => {
            const side = i % 4;
            const pos = ((i * 211) % 1500) + 50;
            const inset = 20 + ((i * 53) % 90);
            const [x, y] = side === 0 ? [pos, inset] : side === 1 ? [W - inset, pos * 0.55] : side === 2 ? [pos, H - inset] : [inset, pos * 0.55];
            const r = 5 + ((i * 7) % 6);
            return (
              <g key={i} transform={`translate(${x} ${y})`} stroke={room.accent} strokeWidth={1.2} opacity={0.55}>
                <line x1={-r} y1={0} x2={r} y2={0} />
                <line x1={-r / 2} y1={-r * 0.87} x2={r / 2} y2={r * 0.87} />
                <line x1={-r / 2} y1={r * 0.87} x2={r / 2} y2={-r * 0.87} />
              </g>
            );
          })}
        </g>
      )}
    </>
  );
}

// A silver mist from the wand's tip, `amount` 0 to 1 of the way to the wardrobe.
function SilverMist({ amount, strength, t }: { amount: number; strength: number; t: number }) {
  if (amount <= 0) return null;
  return (
    <g opacity={strength}>
      {Array.from({ length: 10 }, (_, i) => {
        const p = (i / 9) * amount;
        return <Glow key={i} x={lerp(640, 1080, p)} y={lerp(560, 420, p) + Math.sin(t * 2 + i) * 14} r={40 + 70 * p} colour={lake.accent} opacity={0.35} />;
      })}
    </g>
  );
}

// The lake at night, with the dark shapes ringing it and the far shore.
export function Lake({ t, shapes, blaze, hourglass, stag }: { t: number; shapes: number; blaze: number; hourglass: number; stag: number }) {
  // Where the stag of light runs, from the far shore across the water.
  const sx = lerp(1350, 300, stag);
  const sy = 640 + Math.sin(stag * Math.PI) * -30;
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={lake.shadow} bottom={lake.primary} t={t} />
        <Stars t={t} count={70} colour={lake.highlight} />
        <Glow x={1240} y={170} r={120} colour={lake.highlight} opacity={0.25} />
        <circle cx={1240} cy={170} r={40} fill={lake.highlight} opacity={0.6} />
      </Layer>
      <Layer depth={0.2}>
        {/* The far shore and trees, black against the sky. */}
        <path d="M -400 520 Q 200 470 800 500 Q 1300 470 2000 520 L 2000 560 L -400 560 Z" fill="#070C18" />
      </Layer>
      <Layer depth={0.35}>
        {/* The water, with the moon's reflection. */}
        <rect x={-400} y={540} width={2400} height={600} fill="#0B1424" />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={1180 + Math.sin(t + i) * 20} y1={580 + i * 30} x2={1300 + Math.sin(t * 1.2 + i) * 20} y2={580 + i * 30} stroke={lake.accent} strokeWidth={2} opacity={0.18} />
        ))}
        <Haze y={560} colour={lake.secondary} opacity={0.25} t={t} />
      </Layer>
      <Layer depth={0.5}>
        {/* Many dark shapes ringing the lake. */}
        {shapes > 0 &&
          Array.from({ length: 12 }, (_, i) => (
            <SmokeShape key={i} x={-100 + i * 160} y={360 + (i % 3) * 40} t={t} size={0.55} seed={i + 2} colour="#1A2233" ember="#2A3448" opacity={0.85 * shapes} />
          ))}
        {/* A blaze of silver from across the water. */}
        {blaze > 0 && (
          <g opacity={blaze}>
            <Glow x={1380} y={520} r={420} colour={lake.accent} opacity={0.6} />
            <Glow x={1380} y={520} r={120} colour="#FFFFFF" opacity={0.8} />
          </g>
        )}
      </Layer>
      <Layer depth={0.7}>
        {/* The stag of light: a fine silver outline running across the water. */}
        {stag > 0 && (
          <g transform={`translate(${sx} ${sy}) scale(-1.4 1.4)`} opacity={Math.min(1, stag * 5)}>
            <Glow x={0} y={-30} r={160} colour={lake.accent} opacity={0.55} />
            <path
              d={`M -50 0 L -44 -40 Q -20 -52 24 -48 L 40 -70 L 54 -68 L 50 -44 L 44 -40 L 40 0 M -44 -40 L -${30 + Math.sin(stag * 40) * 8} 0 M 30 -46 L ${20 + Math.sin(stag * 40 + 1) * 8} 0 M 46 -70 L 40 -96 L 30 -110 M 40 -96 L 54 -110 M 50 -70 L 62 -96 L 74 -104 M 62 -96 L 60 -112`}
              fill="none"
              stroke="#F4F8FF"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
        {/* A trail of silver light behind it. */}
        {stag > 0 && <Particles kind="dust" t={t} count={30} colour={lake.highlight} opacity={0.6 * Math.min(1, stag * 3)} area={{ x: sx, y: 560, w: 1400 - sx, h: 120 }} />}
      </Layer>
      {/* An hourglass, turning. */}
      {hourglass > 0 && (
        <g opacity={hourglass} transform={`translate(800 260) rotate(${180 * easeInOut(Math.min(1, hourglass * 1.2))})`} fill="none" stroke={lake.accent} strokeWidth={3}>
          <path d="M -40 -60 L 40 -60 L 4 0 L 40 60 L -40 60 L -4 0 Z" />
          <line x1={-50} y1={-60} x2={50} y2={-60} />
          <line x1={-50} y1={60} x2={50} y2={60} />
          <circle cx={0} cy={0} r={90} opacity={0.3} />
        </g>
      )}
    </>
  );
}

export function PatronusLessons({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  // The classroom.
  const gutter = fadeIn(t, at(1), 2);
  const frost = fadeIn(t, at(1) + 1, 3) * (1 - 0.7 * fadeIn(t, at(3) + 2, 3));
  // Sentence 2: two thin mists that fail, each followed by darkness.
  const s2 = at(2);
  const try1 = progress(t, s2 + 0.5, s2 + 2.5);
  const try2 = progress(t, s2 + 6.5, s2 + 8.5);
  const dark = Math.max(fadeIn(t, s2 + 2.5, 0.6) * fadeOut(t, s2 + 4.5, 1.2), fadeIn(t, s2 + 8.5, 0.6) * fadeOut(t, s2 + 10.5, 1.2));
  const thinMist = t < s2 + 6 ? try1 * fadeOut(t, s2 + 2.6, 0.4) : try2 * fadeOut(t, s2 + 8.6, 0.4);
  // Sentence 3: a brighter mist holds the cold back.
  const holdMist = easeInOut(progress(t, at(3) + 1, at(3) + 4)) * fadeOut(t, at(4) + 2, 2);
  // Sentence 4: the candles burn down and are replaced, week after week.
  const weeks = t > at(4) ? ((t - at(4)) / 1.6) % 1 : 0;
  const wax = t > at(4) && t < at(5) ? 1 - weeks * 0.8 : 1;
  const lit = 1 - 0.6 * gutter * (1 - fadeIn(t, at(4), 1));

  const toLake = fadeIn(t, at(5) - 0.5, 2.5);
  const roomCam = { x: 0, y: 0, zoom: 1.04, rot: 0 };
  const lakeCam = { x: 0, y: lerp(-40, 30, progress(t, at(5), L[7].end)), zoom: 1.08, rot: 0 };
  const cam = mixCam(roomCam, lakeCam, toLake);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toLake < 1 && (
        <g>
          <Classroom t={t} lit={lit} frost={frost} wax={wax} />
          <Layer depth={0.6}>
            {/* The wand: a fine line of light. */}
            <line x1={560} y1={640} x2={640} y2={560} stroke={room.highlight} strokeWidth={4} strokeLinecap="round" opacity={fadeIn(t, s2, 1)} />
            <Glow x={640} y={560} r={30} colour={room.highlight} opacity={0.6 * fadeIn(t, s2, 1) * (0.8 + pulse * 0.2)} />
            <SilverMist amount={Math.max(thinMist * 0.35, holdMist)} strength={holdMist > 0 ? 1 : 0.6} t={t} />
          </Layer>
          <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#000" opacity={0.85 * dark} />
        </g>
      )}
      {toLake > 0 && (
        <g opacity={toLake}>
          <Lake
            t={t}
            shapes={fadeIn(t, at(5), 2) * fadeOut(t, at(5) + 10, 3)}
            blaze={fadeIn(t, at(5) + 8, 1) * fadeOut(t, at(5) + 11, 3)}
            hourglass={fadeIn(t, at(6), 1.5) * fadeOut(t, at(6) + 7, 2)}
            stag={progress(t, at(7) + 0.5, at(7) + 8)}
          />
        </g>
      )}
    </Stage>
  );
}

// Beat 12: the lake, faint behind the questions, with a little silver mist.
export function LakeFaint({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.06, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <Lake t={t} shapes={0} blaze={0} hourglass={0} stag={0} />
        <Glow x={800} y={600} r={300} colour={lake.accent} opacity={0.25 + 0.05 * Math.sin(t / 2)} />
      </g>
    </Stage>
  );
}
