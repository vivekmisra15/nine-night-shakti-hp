// Beats 10–11: Neville stands in the way, and "Think it through" after it.
// Abstract only (the player adds letterbox bars): no people, faces, crests
// or house colours. Candles stand in for the four friends.
//
// Beat 10, following the retelling sentence by sentence:
//   Sentences 0–2  a common room at night: a hearth's low embers, an
//                  armchair's silhouette and an oval doorway of faint light;
//                  three small candle flames move towards the doorway
//   Sentence 3     a fourth, smaller candle slides out from behind the
//                  armchair and stands in front of the doorway
//   Sentence 4     its flame trembles (freeze-frame: the activity's moment)
//   Sentence 5     a pale flash; the small candle tips over stiffly, still lit
//   Sentence 6     the three flames pass, and the doorway closes
//   Sentence 7     a dark hall of floating candles: ten motes of plain white
//                  light drop into a clear glass, which brims

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, fadeIn, Flame, Glow, Layer, mixCam, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';

const c = palettes.n3commonRoomNight;
const g = palettes.greatHall;
const DOOR = { x: 1180, y: 560 };

// A small candle standing at (x, y) (the base). `tip` 0 to 1 lays it over
// stiffly on its side; its flame stays lit and points up.
function SmallCandle({ x, y, t, scale = 1, tip = 0, tremble = 0, lit = 1, opacity = 1 }: { x: number; y: number; t: number; scale?: number; tip?: number; tremble?: number; lit?: number; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const h = 90 * scale;
  const angle = tip * 88;
  const rad = (angle * Math.PI) / 180;
  const topX = x + Math.sin(rad) * h;
  const topY = y - Math.cos(rad) * h;
  const shake = tremble * Math.sin(t * 22) * 3;
  return (
    <g opacity={opacity}>
      <Glow x={topX} y={topY - 20 * scale} r={90 * scale} colour={c.primary} opacity={0.35 * lit} />
      <g transform={`rotate(${angle} ${x} ${y})`}>
        <rect x={x - 10 * scale} y={y - h} width={20 * scale} height={h} rx={3 * scale} fill="#E9DCC0" opacity={0.9} />
      </g>
      <Flame x={topX + shake} y={topY - 2} size={0.95 * scale * (1 - 0.2 * tremble)} t={t * (1 + tremble * 2)} height={lit} outer={c.primary} core={c.highlight} />
    </g>
  );
}

// The common room at night.
function CommonRoom({ t, door = 1 }: { t: number; door?: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={2400} height={1800} fill={c.shadow} />
        <rect x={-400} y={-100} width={2400} height={820} fill={c.secondary} opacity={0.8} />
        {/* The oval doorway, a faint light in the wall. */}
        <Glow x={DOOR.x} y={DOOR.y} r={300 * door} colour={c.accent} opacity={0.3 * door} />
        <ellipse cx={DOOR.x} cy={DOOR.y} rx={110} ry={170 * door + 1} fill={c.highlight} opacity={0.14 * door} />
        <ellipse cx={DOOR.x} cy={DOOR.y} rx={110} ry={170} fill="none" stroke={c.accent} strokeWidth={3} opacity={0.4} />
      </Layer>
      <Layer depth={0.3}>
        {/* The hearth, with low embers. */}
        <path d="M 120 760 L 120 470 L 440 470 L 440 760" fill="none" stroke={c.accent} strokeWidth={3} opacity={0.35} />
        <path d="M 170 760 L 170 540 Q 280 480 390 540 L 390 760 Z" fill="#090A12" />
        <Glow x={280} y={730} r={200} colour={c.primary} opacity={0.4 + 0.08 * wobble(t, 2)} />
        <ellipse cx={280} cy={745} rx={90} ry={14} fill="#D9733A" opacity={0.7} />
        <Particles kind="embers" t={t} count={10} colour={c.highlight} opacity={0.6} area={{ x: 220, y: 560, w: 120, h: 180 }} />
        {/* The floor. */}
        <rect x={-400} y={760} width={2400} height={500} fill="#141320" />
      </Layer>
    </>
  );
}

// The armchair's silhouette, in front.
function Armchair() {
  return <path d="M 600 800 L 600 600 Q 600 560 640 560 L 760 560 Q 800 560 800 600 L 800 800 Z M 570 680 L 830 680 L 830 800 L 570 800 Z" fill="#0A0B14" stroke={c.accent} strokeWidth={1.5} strokeOpacity={0.2} />;
}

// The feast: a dark hall of floating candles, and a clear glass that the ten
// points fill to the brim.
function Feast({ t, motes }: { t: number; motes: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={2400} height={1800} fill={g.shadow} />
        <rect x={-400} y={-400} width={2400} height={1100} fill={g.primary} opacity={0.8} />
      </Layer>
      <Layer depth={0.3}>
        {/* Floating candles high in the dark. */}
        {Array.from({ length: 28 }, (_, i) => {
          const x = (i % 14) * 120 + 20 + (i > 13 ? 60 : 0);
          const y = 120 + (i > 13 ? 110 : 0) + wobble(t, 0.4, i) * 8;
          return (
            <g key={i}>
              <rect x={x - 4} y={y} width={8} height={34} fill="#EFE6D2" opacity={0.6} />
              <Flame x={x} y={y} size={0.25} t={t + i} outer={g.secondary} core={g.highlight} />
            </g>
          );
        })}
        {/* Long tables, as faint lines. */}
        {[640, 700, 760].map((y) => (
          <path key={y} d={`M -200 ${y} L 1800 ${y - 20}`} stroke={g.secondary} strokeWidth={2} opacity={0.15} />
        ))}
      </Layer>
      <Layer depth={0.6}>
        {/* The clear glass, and the ten motes of white light dropping in. */}
        <Glow x={800} y={600} r={220} colour={g.accent} opacity={0.15 + 0.25 * motes} />
        <rect x={760} y={760 - 150 * motes} width={80} height={150 * motes} fill={g.accent} opacity={0.35} />
        <path d="M 755 600 L 755 765 Q 800 775 845 765 L 845 600" fill="none" stroke={g.accent} strokeWidth={3} opacity={0.6} />
        {Array.from({ length: 10 }, (_, i) => {
          const drop = progress(motes * 10, i, i + 1);
          if (drop <= 0 || drop >= 1) return null;
          return <circle key={i} cx={800 + (i % 3 - 1) * 14} cy={lerp(320, 760 - 150 * (i / 10), drop * drop)} r={6} fill="#FFFFFF" opacity={0.9} />;
        })}
      </Layer>
    </>
  );
}

export function NevilleStands({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? at(5) + 2.5 : t; // Reading mode: the moment after the spell
  // The three friends' candles move towards the doorway, then through it.
  const approach = easeInOut(progress(T, at(1), at(3)));
  const pass = easeInOut(progress(T, at(6), at(6) + 3.5));
  // Neville's small candle slides out and stands before the doorway.
  const out = easeInOut(progress(T, at(3), at(3) + 2.5));
  const tremble = T >= at(4) && T < at(5) ? 1 : 0;
  const flash = T >= at(5) + 1 ? Math.max(0, 1 - (T - at(5) - 1) / 0.8) : 0;
  const tip = easeInOut(progress(T, at(5) + 1.2, at(5) + 1.9));
  const door = 1 - easeInOut(progress(T, at(6) + 3, at(6) + 5));
  const toFeast = complete ? 0 : fadeIn(T, at(7) - 0.5, 2.5);
  const motes = progress(T, at(7) + 3, at(7) + 11);

  const room: Cam = { x: 0, y: 0, zoom: 1.04, rot: 0 };
  const cam = mixCam(room, { x: -60, y: 0, zoom: 1.06, rot: 0 }, easeInOut(progress(T, at(7) - 1, at(7) + 6)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toFeast < 1 && (
        <g opacity={1 - toFeast}>
          <CommonRoom t={t} door={door} />
          <Layer depth={0.6}>
            {[0, 1, 2].map((i) => {
              const x = lerp(260 + i * 70, 870 + i * 50, approach) + pass * (DOOR.x - 870 - i * 50);
              return <SmallCandle key={i} x={x} y={800 - i * 6} t={t + i * 2} scale={1.05} opacity={1 - pass} />;
            })}
          </Layer>
          <Layer depth={0.7}>
            <SmallCandle x={lerp(700, 1080, out)} y={810} t={t} scale={0.8} tip={tip} tremble={tremble} opacity={fadeIn(T, at(3) - 0.5, 0.8)} />
            <Armchair />
            {flash > 0 && <Glow x={1080} y={740} r={260} colour="#FFFFFF" opacity={0.6 * flash} />}
          </Layer>
        </g>
      )}
      {toFeast > 0 && (
        <g opacity={toFeast}>
          <Feast t={t} motes={motes} />
        </g>
      )}
    </Stage>
  );
}

// Beat 11: the doorway of faint light, with the small candle standing before
// it, softly blurred behind the questions. It brightens a little for each
// rung of the ladder.
export function DoorwayFrozen({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.1, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <CommonRoom t={12} />
        <Layer depth={0.7}>
          <SmallCandle x={1080} y={810} t={20.3} scale={0.8} />
          <Glow x={1080} y={700} r={160} colour={c.highlight} opacity={0.1 + (0.3 * rungs) / 6} />
          <Armchair />
        </Layer>
      </g>
    </Stage>
  );
}
