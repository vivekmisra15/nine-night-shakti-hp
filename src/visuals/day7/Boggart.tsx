// Beats 10–11: The boggart in the wardrobe, and "Think it through" after it.
// Abstract only (the player adds letterbox bars): objects, light and places,
// never a person, a face or film imagery. Lamp-amber, worn oak and moon silver.
//
// Beat 10, following the retelling sentence by sentence:
//   Sentence 0   a candlelit room; a tall wardrobe rattles
//   Sentence 1   a swirl of grey smoke spills out of it
//   Sentence 2   the smoke tumbles into a heap of soft fabric and the candles
//                flare: the laughter, as light (no figure is drawn)
//   Sentence 3   the smoke turns towards us, a shadow steps between, and the
//                smoke becomes a pale full moon that pops into mist (slow motion)
//   Sentences 5–6 two steaming teacups by a window
//   Sentence 7   a full moon over dark trees

import { easeInOut, lerp, progress } from '../../engine/anim';
import { type Cam, Candle, cameraFor, fadeIn, Glow, H, Layer, mixCam, Particles, Smoke, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { FaintStars, latestCue, linesOf } from './kit';
import { day7Palettes } from './palettes';

const b = day7Palettes.n7boggartRoom;
const SMOKE = '#8A8E98';

// A soft grey swirl (the boggart before it takes a shape): puffs of mist
// turning slowly round a centre.
function Swirl({ x, y, t, size = 1, opacity = 0.7 }: { x: number; y: number; t: number; size?: number; opacity?: number }) {
  if (opacity <= 0.01 || size <= 0.01) return null;
  return (
    <g opacity={opacity}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = t * 0.8 + i * 0.8;
        const r = (30 + i * 9) * size;
        return <Glow key={i} x={x + Math.cos(a) * r} y={y + Math.sin(a) * r * 0.7} r={(60 - i * 3) * size} colour={SMOKE} opacity={0.55} />;
      })}
    </g>
  );
}

// The classroom: wall, sconces with candles, floor, and the tall wardrobe.
// `rattle` shakes the wardrobe; `open` opens its door; `flare` brightens the
// candles (laughter); `blur` is used for the frozen backdrop.
export function Classroom({ t, rattle = 0, open = 0, flare = 0, candleGlow = 0 }: { t: number; rattle?: number; open?: number; flare?: number; candleGlow?: number }) {
  const jx = rattle > 0 ? Math.sin(t * 38) * 4 * rattle : 0;
  const jr = rattle > 0 ? Math.sin(t * 29) * 0.6 * rattle : 0;
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={b.shadow} />
        {/* Panelled oak walls. */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={-200 + i * 240} y={140} width={200} height={480} fill={b.secondary} opacity={0.35} />
        ))}
      </Layer>
      <Layer depth={0.3}>
        {/* Candles in wall sconces, flaring together when the room laughs. */}
        {[220, 560, 1500].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={300} r={140 + 90 * flare + 40 * candleGlow} colour={b.highlight} opacity={0.3 + 0.35 * flare + 0.2 * candleGlow} />
            <Candle x={x} y={300} t={t + i} scale={0.9 + 0.25 * flare} outer={b.primary} />
          </g>
        ))}
      </Layer>
      <Layer depth={0.55}>
        <rect x={-400} y={760} width={W + 800} height={600} fill="#241A12" />
        {/* The tall wardrobe, rattling. */}
        <g transform={`translate(${jx} 0) rotate(${jr} 1110 780)`}>
          <rect x={980} y={200} width={260} height={580} rx={6} fill="#3A2A1C" stroke="#6E553A" strokeWidth={4} />
          <rect x={980} y={190} width={260} height={24} fill="#4A3624" />
          {/* The right door swings open. */}
          <path d={`M 1110 220 L ${lerp(1230, 1300, open)} ${lerp(220, 190, open)} L ${lerp(1230, 1300, open)} ${lerp(770, 800, open)} L 1110 770 Z`} fill="#2E2116" stroke="#6E553A" strokeWidth={3} />
          <rect x={990} y={220} width={120} height={550} fill="#2E2116" stroke="#6E553A" strokeWidth={3} />
          {open > 0 && <rect x={1112} y={222} width={116 * (1 - open * 0.3)} height={546} fill="#0B0806" opacity={open} />}
          <circle cx={1100} cy={500} r={5} fill={b.primary} />
        </g>
      </Layer>
    </>
  );
}

// Tea by the window: two steaming cups, the night outside.
function TeaByWindow({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#1E160F" />
        <rect x={520} y={110} width={560} height={420} fill="#0E1626" />
        <FaintStars t={t} count={16} seed={12} colour={b.accent} />
        <rect x={520} y={110} width={560} height={420} fill="none" stroke="#4A3624" strokeWidth={22} />
        <path d="M 800 110 L 800 530 M 520 320 L 1080 320" stroke="#4A3624" strokeWidth={10} />
      </Layer>
      <Layer depth={0.5}>
        <rect x={-400} y={620} width={W + 800} height={600} fill="#3A2A1C" />
        <Glow x={800} y={600} r={380} colour={b.highlight} opacity={0.18} />
        {[700, 900].map((x, i) => (
          <g key={x}>
            <path d={`M ${x - 45} 560 L ${x + 45} 560 L ${x + 35} 625 Q ${x} 640 ${x - 35} 625 Z`} fill="#D9CBB2" />
            <path d={`M ${x + 44} 575 Q ${x + 72} 585 ${x + 40} 608`} stroke="#D9CBB2" strokeWidth={7} fill="none" />
            <ellipse cx={x} cy={636} rx={70} ry={10} fill="#C9B89A" />
            {/* Rising steam. */}
            {[0, 2.3, 4.6].map((s) => (
              <Smoke key={s} x={x + (i ? 8 : -8)} y={555} t={t % 7} start={s} life={7} colour="#F2E6D0" opacity={0.35} />
            ))}
          </g>
        ))}
      </Layer>
    </>
  );
}

// A full moon over dark trees.
function MoonOverTrees({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#0B1020" />
        <FaintStars t={t} count={40} seed={14} colour={b.accent} />
        <Glow x={1000} y={300} r={260} colour={b.accent} opacity={0.3} />
        <circle cx={1000} cy={300} r={80} fill={b.accent} />
      </Layer>
      <Layer depth={0.5}>
        {Array.from({ length: 16 }, (_, i) => {
          const x = -100 + i * 120;
          const h = 220 + ((i * 53) % 120);
          return <path key={i} d={`M ${x - 70} 900 L ${x} ${900 - h - 260} L ${x + 70} 900 Z`} fill="#05070E" />;
        })}
      </Layer>
    </>
  );
}

export function Boggart({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[Math.min(i, L.length - 1)].start;
  const time = complete ? L[L.length - 1].end + 2 : t;

  const rattle = 1 - fadeIn(time, at(1) + 1, 1.5);
  const open = easeInOut(progress(time, at(1), at(1) + 2));
  const spill = easeInOut(progress(time, at(1) + 1, at(1) + 5));
  const tumble = easeInOut(progress(time, at(2) + 3, at(2) + 6));
  const flare = Math.max(0, Math.sin(Math.PI * progress(time, at(2) + 5, at(2) + 10)));
  const turn = easeInOut(progress(time, at(3), at(3) + 2));
  const between = easeInOut(progress(time, at(3) + 1.5, at(3) + 3.5));
  const moon = easeInOut(progress(time, at(3) + 4, at(3) + 6));
  const pop = progress(time, at(3) + 9, at(3) + 11);
  const toTea = fadeIn(time, at(5) - 1, 2.5);
  const toMoon = fadeIn(time, at(7), 3);

  const drift = cameraFor('drift', 0, time);
  const push: Cam = { x: 0, y: 20, zoom: 1.22, rot: 0 };
  let cam = mixCam(drift, push, easeInOut(progress(time, at(3), at(3) + 4)) * (1 - toTea));
  cam = mixCam(cam, cameraFor('still', 0, time), toTea);

  // The boggart swirl: spills from the wardrobe, tumbles down, rises again.
  const sx = lerp(1110, 760, spill);
  const sy = lerp(460, 520, spill) + 200 * tumble * (1 - turn);
  const swirlOpacity = 0.75 * spill * (1 - moon);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toTea < 1 && (
        <g>
          <Classroom t={time} rattle={rattle} open={open} flare={flare} />
          <Layer depth={0.7}>
            {/* The heap of soft fabric (the fear made funny). */}
            <g opacity={tumble * (1 - turn)}>
              <path d="M 640 780 Q 660 700 720 710 Q 760 660 810 700 Q 870 690 880 780 Z" fill="#8A6E7A" opacity={0.75} />
              <path d="M 690 780 Q 720 730 760 740 Q 800 720 830 780" stroke="#C9B0A0" strokeWidth={3} fill="none" opacity={0.6} />
            </g>
            {flare > 0 && <Particles kind="dust" t={time} count={30} colour={b.highlight} opacity={0.6 * flare} area={{ x: 300, y: 200, w: 1000, h: 500 }} speed={2} />}
            <Swirl x={sx} y={sy} t={time} size={0.8 + 0.4 * turn} opacity={swirlOpacity} />
            {/* The shadow that steps between: a soft dark column, no figure. */}
            <rect x={lerp(260, 470, between)} y={140} width={160} height={700} rx={80} fill="#0A0806" opacity={0.55 * between * (1 - pop)} style={{ filter: 'blur(14px)' }} />
            {/* The pale full moon, which pops into mist. */}
            {moon > 0 && pop < 1 && (
              <g opacity={1 - pop}>
                <Glow x={760} y={430} r={180 * (1 + pop)} colour={b.accent} opacity={0.4} />
                <circle cx={760} cy={430} r={70 * (1 + pop * 1.5)} fill={b.accent} opacity={moon * (1 - pop)} />
              </g>
            )}
            {pop > 0 && pop < 1 && <Particles kind="dust" t={time} count={30} colour={b.accent} opacity={0.6 * (1 - pop)} area={{ x: 600, y: 280, w: 320, h: 300 }} speed={3} />}
          </Layer>
        </g>
      )}
      {toTea > 0 && toMoon < 1 && (
        <g opacity={toTea}>
          <TeaByWindow t={time} />
        </g>
      )}
      {toMoon > 0 && (
        <g opacity={toMoon}>
          <MoonOverTrees t={time} />
        </g>
      )}
    </Stage>
  );
}

// Beat 11: the classroom, softly blurred behind the questions. One candle
// brightens a little as each rung opens.
export function BoggartFrozen({ beat, frozen, complete, cues, t }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.1, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <Classroom t={t} candleGlow={rungs / 6} />
      </g>
    </Stage>
  );
}
