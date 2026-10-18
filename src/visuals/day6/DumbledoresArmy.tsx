// Beats 9–10: Dumbledore's Army, and "Think it through" after it.
// Abstract only: objects, light and places; no people, faces, crests or film
// imagery. The night's signature returns small: candle points gathering.
//
// Beat 9, following the retelling sentence by sentence:
//   Sentence 0  a closed book on a desk, no light
//   Sentence 1  a sheet of newsprint curling in shadow
//   Sentence 2  a single candle is lit
//   Sentence 3  the candle wavers
//   Sentence 4  a low pub doorway; then candle points appear one by one
//               around a table until there are many (a slow push-in)
//   Sentence 5  a parchment, with a line of small lights running down it as
//               names are added (freeze-frame)
//   Sentence 6  a blank stone wall where a door slowly outlines itself in light
//   Sentence 7  a warm room, the many small lights rising together, and one
//               bright spark (the Disarming Charm)
// Final frame: many lights in one room.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, Candle, fadeIn, Flame, Glow, Layer, LightTrail, Particles, rand, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';

const h = palettes.n6hogsHead;

// A dim room wall behind everything.
function Wall({ warm = 0 }: { warm?: number }) {
  return (
    <Layer depth={0.05}>
      <rect x={-400} y={-400} width={2400} height={1700} fill={h.shadow} />
      <rect x={-400} y={-400} width={2400} height={1700} fill={h.secondary} opacity={0.45 + 0.35 * warm} />
    </Layer>
  );
}

// Sentences 0–3: the desk, the closed book, the newspaper and the candle.
function Desk({ t, paper, candle, waver }: { t: number; paper: number; candle: number; waver: number }) {
  return (
    <>
      <Wall />
      <Layer depth={0.5}>
        <rect x={-400} y={600} width={2400} height={700} fill="#2A2018" />
        <path d="M -400 600 L 2000 600" stroke="#4A3A28" strokeWidth={4} />
        {/* The closed book: a plain cover and spine, no title. */}
        <path d="M 520 640 L 860 610 L 920 680 L 570 716 Z" fill="#4A3A2A" />
        <path d="M 570 716 L 920 680 L 920 696 L 572 732 Z" fill="#D8CBB0" opacity={0.6} />
        {/* The newspaper, curling at one corner, no words. */}
        <g opacity={paper}>
          <path d="M 980 650 L 1300 630 L 1330 700 Q 1290 690 1270 730 L 1000 744 Z" fill="#B8AE98" opacity={0.75} />
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={`M ${1010 + i * 4} ${668 + i * 14} L ${1250 + i * 2} ${654 + i * 14}`} stroke="#6E6656" strokeWidth={3} opacity={0.6} />
          ))}
        </g>
        {/* The single candle, which wavers. */}
        <g opacity={candle}>
          <Glow x={760} y={470} r={260 * candle} colour={h.accent} opacity={0.35} />
          <Candle x={760} y={480} t={t} scale={1.2} lean={waver * 22 * Math.sin(t * 2.4)} lit={candle * (1 - 0.4 * waver * (0.5 + 0.5 * Math.sin(t * 3.1)))} outer={h.primary} />
        </g>
      </Layer>
    </>
  );
}

// Sentence 4: a low doorway, then candle points gathering round a table.
export function HogsHead({ t, gathered, door = 1 }: { t: number; gathered: number; door?: number }) {
  const count = 24;
  return (
    <>
      <Wall warm={gathered * 0.5} />
      <Layer depth={0.2}>
        {/* The low, arched pub doorway, glowing at its edges. */}
        <g opacity={door}>
          <path d="M 1240 640 L 1240 380 Q 1330 300 1420 380 L 1420 640" fill="#1A140E" stroke={h.primary} strokeWidth={4} />
          <Glow x={1330} y={520} r={180} colour={h.accent} opacity={0.18} />
        </g>
      </Layer>
      <Layer depth={0.55}>
        <rect x={-400} y={680} width={2400} height={600} fill="#241C14" />
        {/* The table. */}
        <ellipse cx={720} cy={700} rx={420} ry={90} fill="#3A2C1E" />
        <ellipse cx={720} cy={692} rx={420} ry={86} fill="none" stroke={h.primary} strokeWidth={2} opacity={0.6} />
        {/* Candle points around it, appearing one by one. */}
        {Array.from({ length: count }, (_, i) => {
          const on = progress(gathered * count, i, i + 1);
          if (on <= 0) return null;
          const a = (i / count) * Math.PI * 2 + 0.3;
          const x = 720 + Math.cos(a) * (360 + rand(i, 81) * 60);
          const y = 692 + Math.sin(a) * (80 + rand(i, 82) * 20) - 20;
          return (
            <g key={i} opacity={on}>
              <Glow x={x} y={y - 12} r={50} colour={h.accent} opacity={0.4} />
              <Flame x={x} y={y} size={0.32} t={t + i} core="#FFF0C8" outer={h.accent} />
            </g>
          );
        })}
      </Layer>
    </>
  );
}

// Sentence 5: a parchment; a line of small lights runs down it as names are added.
function Parchment({ names }: { names: number }) {
  const rows = 24;
  return (
    <>
      <Wall />
      <Layer depth={0.5}>
        <path d="M 560 120 L 1040 120 L 1040 820 Q 800 800 560 820 Z" fill={h.highlight} opacity={0.85} />
        <ellipse cx={800} cy={120} rx={250} ry={18} fill="#D8C49A" />
        {Array.from({ length: rows }, (_, i) => {
          const on = progress(names * rows, i, i + 1);
          if (on <= 0) return null;
          const y = 170 + i * 26;
          const x = 640 + (i % 3) * 90;
          return (
            <g key={i} opacity={on}>
              <Glow x={x} y={y} r={22} colour={h.accent} opacity={0.7} />
              <circle cx={x} cy={y} r={3} fill="#FFF0C8" />
              <path d={`M ${x + 14} ${y} L ${x + 80 + rand(i, 3) * 120} ${y}`} stroke={h.primary} strokeWidth={2} opacity={0.5} />
            </g>
          );
        })}
      </Layer>
    </>
  );
}

// Sentence 6: a blank stone wall where a door outlines itself in light.
function StoneWall({ t, door }: { t: number; door: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={2400} height={1700} fill="#2C2620" />
        {Array.from({ length: 12 }, (_, row) =>
          Array.from({ length: 14 }, (_, col) => (
            <rect key={`${row}-${col}`} x={-200 + col * 150 + (row % 2) * 75} y={-100 + row * 90} width={146} height={86} fill="#3A332A" opacity={0.6 + rand(row * 14 + col, 9) * 0.3} />
          )),
        )}
      </Layer>
      <Layer depth={0.4}>
        <Glow x={800} y={520} r={340 * door} colour={h.accent} opacity={0.3} />
        <LightTrail d="M 680 820 L 680 360 Q 800 250 920 360 L 920 820" amount={door} colour="#FFE7B8" t={t} width={4} opacity={0.9} />
      </Layer>
    </>
  );
}

// Sentence 7 (and Beat 10): the warm room, many small lights rising together.
export function RoomOfLights({ t, spark, dim = 0 }: { t: number; spark: number; dim?: number }) {
  return (
    <>
      <Wall warm={1 - dim} />
      <Layer depth={0.2}>
        <Glow x={800} y={500} r={700} colour={h.accent} opacity={0.22 * (1 - dim * 0.5)} />
        {/* Tall shelves and cushions, as soft shapes. */}
        {[120, 1340].map((x) => (
          <rect key={x} x={x} y={160} width={140} height={600} fill="#2A2018" opacity={0.8} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        <rect x={-400} y={760} width={2400} height={600} fill="#2A2018" />
        {Array.from({ length: 30 }, (_, i) => {
          const x = 260 + rand(i, 91) * 1080;
          const y = 720 - ((t * 10 + rand(i, 92) * 380) % 380);
          return (
            <g key={i}>
              <Glow x={x} y={y} r={28} colour={h.accent} opacity={0.45} />
              <circle cx={x} cy={y} r={3} fill="#FFF0C8" />
            </g>
          );
        })}
        {spark > 0 && (
          <>
            <Glow x={800} y={420} r={200 * spark} colour="#FFFFFF" opacity={0.7 * spark} />
            <circle cx={800} cy={420} r={6} fill="#FFFFFF" opacity={spark} />
          </>
        )}
        <Particles kind="dust" t={t} count={20} colour={h.highlight} opacity={0.3} />
      </Layer>
    </>
  );
}

export function DumbledoresArmy({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 10000 : t;

  // Which scene shows: each cross-fades into the next at its sentence.
  const desk = 1 - fadeIn(T, at(4) - 0.5, 1.5);
  const pub = window2(T, at(4) - 0.5, at(5) + 0.8, 1.5);
  const parchment = window2(T, at(5) - 0.5, at(6) + 0.8, 1.5);
  const wall = window2(T, at(6) - 0.5, at(7) + 0.8, 1.5);
  const room = fadeIn(T, at(7) - 0.5, 1.5);

  const push = easeInOut(progress(T, at(4), at(6)));
  const cam: Cam = { x: 0, y: 0, zoom: lerp(1.02, 1.14, push) * (1 - room) + 1.04 * room, rot: 0 };

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {desk > 0 && (
        <g opacity={desk}>
          <Desk t={T} paper={fadeIn(T, at(1), 2)} candle={fadeIn(T, at(2), 1.5)} waver={fadeIn(T, at(3), 1.5)} />
        </g>
      )}
      {pub > 0 && (
        <g opacity={pub}>
          <HogsHead t={T} gathered={progress(T, at(4) + 2, at(5) - 1)} />
        </g>
      )}
      {parchment > 0 && (
        <g opacity={parchment}>
          <Parchment names={progress(T, at(5) + 1, at(6) - 1)} />
        </g>
      )}
      {wall > 0 && (
        <g opacity={wall}>
          <StoneWall t={T} door={progress(T, at(6) + 1, at(6) + 9)} />
        </g>
      )}
      {room > 0 && (
        <g opacity={room}>
          <RoomOfLights t={T} spark={window2(T, at(7) + 6, at(7) + 11, 1) * (complete ? 0 : 1)} />
        </g>
      )}
    </Stage>
  );
}

// Beat 10: the room of many small lights, dimmed behind the questions. The
// lights brighten a little as each rung of the ladder opens.
export function RoomDimmed({ beat, t, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.06, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }} opacity={0.6 + 0.07 * rungs}>
        <RoomOfLights t={t * 0.3} spark={0} dim={0.6} />
      </g>
    </Stage>
  );
}
