// Beat 13 (gentle alternative): The Summoning Charm.
// Abstract only: objects, light and places; the dragon is a shadow of smoke.
//   0     a far-off ember-dark smoke shape over the hills
//   1     a single lamp
//   2     a small broom, far away, high in a tower window
//   3–4   in an empty classroom, small objects of light twitch and fall back
//   5     a clock moves on, the lamps burn low, then an object flies cleanly
//         to the hand of light
//   6     the arena: the smoke shape coils; a wand of light rises
//   7     the broom streaks in and rises; a small golden egg glints
//         (freeze-frame)
// Camera: still, then a pull-back to the sky at the end.

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Candle, fadeIn, Glow, H, Layer, mixCam, Particles, Ridge, Sky, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { Stars } from './kit';

const m = palettes.n2midnightPractice;

// A small broom, as a simple outline: a handle and a bound brush.
function Broom({ x, y, size = 1, angle = 0, opacity = 1 }: { x: number; y: number; size?: number; angle?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`} opacity={opacity} fill="none" stroke={m.accent} strokeWidth={2.5} strokeLinecap="round">
      <line x1={-60} y1={0} x2={30} y2={0} />
      <path d="M 30 -4 L 70 -16 M 30 0 L 72 0 M 30 4 L 70 16 M 30 -2 L 72 -8 M 30 2 L 72 8" />
      <line x1={28} y1={-6} x2={28} y2={6} strokeWidth={4} />
    </g>
  );
}

// The empty classroom by lamplight, with small objects on a desk.
function PracticeRoom({ t, lamps, twitch, fly, clock }: { t: number; lamps: number; twitch: number; fly: number; clock: number }) {
  const objects = [
    { x: 1000, y: 600, w: 50, h: 34 },
    { x: 1100, y: 604, w: 34, h: 30 },
    { x: 1190, y: 600, w: 44, h: 38 },
  ];
  // The hand of light that calls them, on the left.
  const hand = { x: 420, y: 520 };
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={m.secondary} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={-400} y1={i * 110} x2={2000} y2={i * 110} stroke={m.shadow} strokeWidth={3} opacity={0.4} />
        ))}
        {/* A clock face on the wall; its hand moves on through the night. */}
        <circle cx={800} cy={200} r={70} fill="#151B33" stroke={m.primary} strokeWidth={4} />
        <line x1={800} y1={200} x2={800 + 50 * Math.sin(clock * Math.PI * 2)} y2={200 - 50 * Math.cos(clock * Math.PI * 2)} stroke={m.accent} strokeWidth={4} strokeLinecap="round" />
        <line x1={800} y1={200} x2={800 + 30 * Math.sin(clock * Math.PI / 3)} y2={200 - 30 * Math.cos(clock * Math.PI / 3)} stroke={m.accent} strokeWidth={5} strokeLinecap="round" />
      </Layer>
      <Layer depth={0.5}>
        <rect x={-400} y={640} width={2400} height={500} fill="#141A30" />
        <rect x={900} y={620} width={400} height={24} fill="#3A2E24" />
        {[200, 1400].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={500} r={220} colour={m.primary} opacity={0.4 * lamps} />
            <Candle x={x} y={520} t={t + i} lit={lamps} outer={m.primary} />
          </g>
        ))}
        {/* The small objects: twitching, falling back, then one flying cleanly to the hand. */}
        {objects.map((o, i) => {
          const jump = twitch > 0 ? Math.max(0, Math.sin(t * 3 + i * 2)) * 30 * twitch : 0;
          const go = i === 1 ? easeOut(fly) : 0;
          const x = lerp(o.x, hand.x + 40, go);
          const y = lerp(o.y - jump, hand.y, go) - Math.sin(go * Math.PI) * 120;
          return (
            <g key={i}>
              <rect x={x - o.w / 2} y={y - o.h} width={o.w} height={o.h} rx={4} fill="none" stroke={m.accent} strokeWidth={2.5} />
              <Glow x={x} y={y - o.h / 2} r={40} colour={m.accent} opacity={0.3 + 0.3 * go} />
            </g>
          );
        })}
        <Glow x={hand.x} y={hand.y} r={70} colour={m.highlight} opacity={0.5} />
        <line x1={hand.x - 60} y1={hand.y + 60} x2={hand.x} y2={hand.y} stroke={m.highlight} strokeWidth={4} strokeLinecap="round" />
      </Layer>
    </>
  );
}

// The night outside: hills, the castle tower with its window, and the smoke shape.
function Grounds({ t, smoke, tower, broom, arena, wand, streak, egg }: { t: number; smoke: number; tower: number; broom: number; arena: number; wand: number; streak: number; egg: number }) {
  const bx = lerp(1300, 760, easeInOut(streak));
  const by = lerp(240, 560, easeInOut(Math.min(1, streak * 1.2))) - easeInOut(progress(streak, 0.8, 1)) * 220;
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={m.shadow} bottom={m.secondary} t={t} />
        <Stars t={t} count={60} colour={m.highlight} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={21} baseY={640} height={120} fill="#121830" />
        {/* The far tower, with one lit window and the small broom in it. */}
        <g opacity={tower}>
          <rect x={1260} y={140} width={90} height={500} fill="#0C1022" />
          <path d="M 1250 140 L 1305 60 L 1360 140 Z" fill="#0C1022" />
          <rect x={1285} y={210} width={40} height={56} fill={m.primary} opacity={0.8} />
          <Broom x={1305} y={240} size={0.22} angle={-30} opacity={broom} />
        </g>
      </Layer>
      <Layer depth={0.4}>
        {/* The arena: a ring of stands in the dark. */}
        <g opacity={arena}>
          <path d="M -200 700 Q 800 560 1800 700 L 1800 1100 L -200 1100 Z" fill="#1A2140" />
          <path d="M -200 700 Q 800 560 1800 700" fill="none" stroke={m.primary} strokeWidth={3} opacity={0.4} />
          <ellipse cx={800} cy={800} rx={600} ry={90} fill="#232B4A" />
        </g>
        {/* The dragon, as a shadow of smoke with ember points. */}
        <SmokeShape x={lerp(380, 600, arena)} y={lerp(540, 690, arena)} t={t} size={lerp(1.1, 1.5, arena)} seed={5} opacity={0.9 * smoke} colour="#2A201C" ember="#E2552B" />
      </Layer>
      <Layer depth={0.7}>
        {/* The wand of light, raised. */}
        <g opacity={wand}>
          <line x1={1000} y1={860} x2={1040} y2={lerp(860, 760, wand)} stroke={m.highlight} strokeWidth={4} strokeLinecap="round" />
          <Glow x={1040} y={lerp(860, 760, wand)} r={40} colour={m.highlight} opacity={0.7} />
        </g>
        {/* The broom streaking in, then rising. */}
        {streak > 0 && (
          <g>
            <line x1={bx + 60} y1={by - 20} x2={bx + 260} y2={by - 120} stroke={m.accent} strokeWidth={6} opacity={0.25 * (1 - progress(streak, 0.8, 1))} strokeLinecap="round" />
            <Broom x={bx} y={by} size={1.1} angle={-20 - 20 * progress(streak, 0.8, 1)} />
          </g>
        )}
        {/* A small golden egg, glinting. */}
        {egg > 0 && (
          <g opacity={egg}>
            <Glow x={760} y={760} r={70} colour="#F4C27A" opacity={0.6 + 0.2 * Math.sin(t * 4)} />
            <ellipse cx={760} cy={760} rx={18} ry={24} fill="#E8B45A" stroke="#FFF4DC" strokeWidth={2} />
          </g>
        )}
        <Particles kind="embers" t={t} count={10} colour="#E2552B" opacity={0.5 * arena} area={{ x: 400, y: 500, w: 500, h: 300 }} />
      </Layer>
    </>
  );
}

export function SummoningCharm({ beat, t, frozen }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const inRoom = window2(t, at(1) - 0.5, at(6), 1.2);
  const lamps = 1 - 0.6 * fadeIn(t, at(5) + 2, 4) * (1 - fadeIn(t, at(6), 1));
  const twitch = fadeIn(t, at(3) + 2, 1) * (1 - fadeIn(t, at(5) + 7, 1));
  const fly = progress(t, at(5) + 9, at(5) + 11);
  const clock = progress(t, at(3), at(6)) * 4;
  // Sentence 2 shows the tower window alone, inside the night (a short inset).
  const towerOnly = window2(t, at(2) - 0.5, at(3), 1);

  const cam = mixCam(cameraFor('still', 0, t), cameraFor('pullBack', progress(t, at(7), at(7) + 6), t), fadeIn(t, at(7), 2));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Grounds t={t} smoke={1 - towerOnly} tower={1} broom={1 - fadeIn(t, at(7), 0.5)} arena={fadeIn(t, at(6), 2)} wand={fadeIn(t, at(6) + 3, 1.5)} streak={progress(t, at(7), at(7) + 5)} egg={fadeIn(t, at(7) + 5, 1.5)} />
      {inRoom > 0 && (
        <g opacity={inRoom * (1 - towerOnly)}>
          <PracticeRoom t={t} lamps={lamps} twitch={twitch} fly={fly} clock={clock} />
        </g>
      )}
      {/* Sentence 2: closer on the tower window, where the broom waits. */}
      {towerOnly > 0 && (
        <g opacity={towerOnly}>
          <g transform="translate(800 420) scale(3) translate(-1305 -240)">
            <Grounds t={t} smoke={0} tower={1} broom={1} arena={0} wand={0} streak={0} egg={0} />
          </g>
        </g>
      )}
    </Stage>
  );
}
