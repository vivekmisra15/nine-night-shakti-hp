// Beats 12–13: Molly's duel, and "Think it through" after it.
// Abstract only (the player adds letterbox bars): lights and smoke in a great
// hall, never figures. Nothing is shown being hit, and nothing falls.
// (The parent bell rings at the start, and again just before sentence 7.)
//
// Beat 12, following the retelling sentence by sentence:
//   Sentence 0     a great hall in drifting smoke, broken light through high
//                  windows
//   Sentence 1     a cold, dark light duels three small lights; at the end of
//                  the sentence a pale streak passes just beside one of them
//                  (slow motion)
//   Sentence 2     a warm, hearth-like glow, threaded with a fine line of
//                  yarn-gold, turns
//   Sentence 3     it crosses the hall, shedding a dark cloak-shape; the three
//                  small lights draw back
//   Sentence 4     the dark light flares mockingly
//   Sentence 6     warm and cold lights exchange fast flashes
//   Sentence 7     the cold light flickers and dissolves into smoke
//   The end        smoke settling; the warm glow alone, and dimmer
//
// Beat 13 shows the smoke settling (or, if the family chose the gentle
// alternative, the alley with its streetlamps lit again).

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Layer, mixCam, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';
import { Alley } from './SavesDudley';

const b = palettes.n3battleHall;
const COLD = { x: 1120, y: 540 };

// A streak of pale light from a to b, `p` of the way along (0 to 1).
function Streak({ a, b: to, p, colour = '#E8E8F0' }: { a: { x: number; y: number }; b: { x: number; y: number }; p: number; colour?: string }) {
  if (p <= 0 || p >= 1) return null;
  const head = Math.min(1, p * 1.4);
  const tail = Math.max(0, p * 1.4 - 0.5);
  const x1 = lerp(a.x, to.x, tail);
  const y1 = lerp(a.y, to.y, tail);
  const x2 = lerp(a.x, to.x, head);
  const y2 = lerp(a.y, to.y, head);
  return (
    <g strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={14} opacity={0.15} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={3} opacity={0.85} />
    </g>
  );
}

// The hall: dark stone, three tall windows with broken light, and smoke.
function BattleHall({ t, smoke = 1 }: { t: number; smoke?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={2400} height={1800} fill={b.shadow} />
        <rect x={-400} y={-200} width={2400} height={980} fill={b.secondary} />
        {[420, 800, 1180].map((x, i) => (
          <g key={x}>
            {/* A tall pointed window, part of it broken away. */}
            <path d={`M ${x - 60} 420 L ${x - 60} 160 Q ${x} 60 ${x + 60} 160 L ${x + 60} 420 Z`} fill="#2A3150" opacity={0.8} />
            <path d={`M ${x - 60} 420 L ${x - 60} 160 Q ${x} 60 ${x + 60} 160 L ${x + 60} 420`} fill="none" stroke={b.highlight} strokeWidth={2} opacity={0.25} />
            {/* The broken light falling through it. */}
            <path d={`M ${x - 40} 200 L ${x + 40} 200 L ${x + 220 + i * 20} 860 L ${x + 60} 860 Z`} fill={b.highlight} opacity={0.05 + 0.02 * wobble(t, 0.3, i)} />
          </g>
        ))}
        <rect x={-400} y={780} width={2400} height={600} fill="#0E1018" />
      </Layer>
      <Layer depth={0.4}>
        {[200, 620, 1000, 1400].map((x, i) => (
          <SmokeShape key={x} x={x + Math.sin(t / 9 + i) * 40} y={620 + (i % 2) * 90} t={t} size={2.2} seed={i + 3} opacity={0.35 * smoke} colour={b.primary} ember={b.primary} />
        ))}
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="dust" t={t} count={30} colour={b.highlight} opacity={0.25} speed={0.6} />
      </Layer>
    </>
  );
}

// The cold, dark light: a deep glow with a pale edge.
function ColdLight({ x, y, t, flare = 0, opacity = 1 }: { x: number; y: number; t: number; flare?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={180 * (1 + flare * 0.6)} colour="#05060C" opacity={0.9} />
      <circle cx={x} cy={y} r={34 * (1 + flare * 0.3)} fill="#0A0C18" stroke="#B8BCD8" strokeWidth={2} opacity={0.9} />
      <circle cx={x} cy={y} r={(40 + 30 * ((t * 0.7) % 1)) * (1 + flare * 0.5)} fill="none" stroke="#B8BCD8" strokeWidth={1.2} opacity={0.4 * (1 - ((t * 0.7) % 1))} />
    </g>
  );
}

// The warm, hearth-like glow, with a fine thread of yarn-gold turning round it.
function WarmGlow({ x, y, t, turn, strength = 1 }: { x: number; y: number; t: number; turn: number; strength?: number }) {
  return (
    <g opacity={strength}>
      <Glow x={x} y={y} r={220} colour={b.accent} opacity={0.5} />
      <Glow x={x} y={y} r={60} colour="#FFD9A0" opacity={0.9} />
      <circle cx={x} cy={y} r={14} fill="#FFF1D2" />
      <g transform={`rotate(${turn * 360 + t * 12} ${x} ${y})`}>
        <path d={`M ${x - 70} ${y} Q ${x - 40} ${y - 70} ${x + 10} ${y - 50} T ${x + 70} ${y + 10} Q ${x + 30} ${y + 70} ${x - 20} ${y + 50}`} fill="none" stroke="#E8C66A" strokeWidth={1.4} opacity={0.75} />
      </g>
    </g>
  );
}

export function MollysDuel({ beat, t, duration, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 1e4 : t;

  // The three small lights, which draw back when the warm glow arrives.
  const back = easeInOut(progress(T, at(3) + 1, at(3) + 4));
  const smalls = [
    { x: 760, y: 520 },
    { x: 840, y: 610 },
    { x: 700, y: 640 },
  ].map((s, i) => ({ x: lerp(s.x, 420 + i * 60, back), y: lerp(s.y, 380 + i * 40, back) }));
  // Duel flashes between the cold light and the three (sentence 1).
  const duel = (n: number) => progress(T, at(1) + n * 1.3, at(1) + n * 1.3 + 0.7);
  const nearMiss = progress(T, L[1].end - 2.4, L[1].end - 1.2);
  // The warm glow: appears, turns, crosses the hall.
  const warmOn = fadeIn(T, at(2), 2);
  const cross = easeInOut(progress(T, at(3), at(3) + 3.5));
  const warm = { x: lerp(220, 640, cross), y: lerp(640, 560, cross) };
  // The cloak, shed as it crosses, lying in the smoke and fading.
  const cloak = progress(T, at(3) + 1, at(3) + 2) * (1 - fadeIn(T, at(4) + 2, 3));
  const flare = T >= at(4) && T < at(5) ? 0.5 + 0.5 * Math.sin((T - at(4)) * 5) : 0;
  // The fast exchange (sentence 6).
  const exchange = (n: number) => progress(T, at(6) + n * 0.55, at(6) + n * 0.55 + 0.45);
  // The cold light flickers and dissolves into smoke (sentence 7).
  const gone = progress(T, at(7) + 1, at(7) + 5);
  const flicker = T > at(7) && gone < 1 ? 0.5 + 0.5 * Math.sin(T * 30) : 1;
  const coldOn = (1 - gone) * flicker;
  const dim = 1 - 0.4 * fadeIn(T, at(7) + 2, 4);

  const cam = mixCam(cameraFor('drift', 0, T), cameraFor('still', 0, T), easeInOut(progress(T, at(6), duration)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <BattleHall t={t} />
      <Layer depth={0.6}>
        {smalls.map((s, i) => (
          <g key={i} opacity={1 - 0.5 * back}>
            <Glow x={s.x} y={s.y} r={70} colour="#FFE8C0" opacity={0.5} />
            <circle cx={s.x} cy={s.y} r={7} fill="#FFF6E6" />
          </g>
        ))}
        {[0, 1, 2].map((n) => (
          <Streak key={n} a={COLD} b={smalls[n % 3]} p={duel(n)} />
        ))}
        {/* The near miss: a pale streak passing just beside one small light. */}
        <Streak a={COLD} b={{ x: smalls[1].x - 220, y: smalls[1].y - 40 }} p={nearMiss} />
        {/* The dark cloak-shape, shed. */}
        {cloak > 0 && <path d={`M ${380} 760 Q 420 690 470 700 Q 520 720 540 770 Q 460 790 380 760 Z`} fill="#05060C" opacity={0.8 * cloak} />}
        <ColdLight x={COLD.x} y={COLD.y} t={t} flare={flare} opacity={coldOn} />
        {gone > 0 && <SmokeShape x={COLD.x} y={COLD.y} t={t} size={1.2} seed={7} dissolve={gone} colour={b.primary} ember={b.primary} opacity={0.7} />}
        {warmOn > 0 && <WarmGlow x={warm.x} y={warm.y} t={t} turn={easeInOut(progress(T, at(2), at(3)))} strength={warmOn * dim} />}
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <Streak key={n} a={n % 2 ? COLD : warm} b={n % 2 ? warm : COLD} p={exchange(n)} colour={n % 2 ? '#C8CCE0' : '#FFD9A0'} />
        ))}
      </Layer>
    </Stage>
  );
}

// Beat 13: the smoke settling, with the warm glow alone and dim, softly
// blurred behind the questions; or, after the gentle alternative, the alley
// with its streetlamps lit again (`gentle`: the family chose that scene).
export function SmokeSettling({ beat, t, frozen, complete, cues, gentle }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.06, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        {gentle ? (
          <Alley t={t} lamps={1} />
        ) : (
          <>
            <BattleHall t={t} smoke={0.7} />
            <Layer depth={0.6}>
              <WarmGlow x={640} y={560} t={t} turn={0} strength={0.5 + (0.3 * rungs) / 6} />
            </Layer>
          </>
        )}
      </g>
    </Stage>
  );
}
