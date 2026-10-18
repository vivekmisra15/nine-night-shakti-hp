// Beat 12: The Prince's Tale, and the backdrop for Beat 13.
// Abstract only (the player adds letterbox bars): silver-blue mist and
// pearl, no people, no faces, no green. Each memory is a simple object seen
// in the mist above a stone basin.
//   Sentence 0   a stone basin with silver mist; the camera cranes down to it
//   Sentence 1   in the mist, a simple swing on a chain moves gently; then a
//                crack of light runs across it (the friendship broken)
//   Sentence 2   a candle goes out (Lily's family; no figures)
//   Sentence 3   a closed door, a thin line of light beneath it
//   Sentence 4   the silver doe, as a soft silver light that moves like a deer
//                (bounding arcs, no outline); freeze-frame
//   Sentence 5   the mist settles
//   Sentence 6   a cold, hard-edged row of classroom candles
//   Sentence 7   the basin still, one candle

import { lerp, progress, wobble } from '../../engine/anim';
import { cameraFor, fadeIn, Flame, Glow, H, Haze, Layer, mixCam, Particles, Smoke, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from './kit';
import { WarmRoom } from './TheGrim';
import { day7Palettes } from './palettes';

const p = day7Palettes.n7pensieve;
const MX = 800; // the centre of the memory mist
const MY = 360;

// The stone basin with its silver mist. `mist` (0 to 1) is how high it rises.
export function Basin({ t, mist = 1 }: { t: number; mist?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={p.shadow} />
        <Glow x={MX} y={MY} r={520} colour={p.secondary} opacity={0.9} />
      </Layer>
      <Layer depth={0.6}>
        {/* The basin: a wide shallow stone bowl on a pedestal. */}
        <path d="M 720 900 L 740 790 L 860 790 L 880 900 Z" fill="#2A3242" />
        <path d="M 520 700 Q 800 860 1080 700 Z" fill="#3A4456" />
        <ellipse cx={800} cy={700} rx={280} ry={46} fill="#1C2433" stroke="#6E7E96" strokeWidth={3} />
        <ellipse cx={800} cy={702} rx={250} ry={34} fill={p.primary} opacity={0.55 + 0.1 * wobble(t, 0.6)} />
        {/* Silver mist rising from the basin. */}
        <g opacity={mist}>
          {Array.from({ length: 7 }, (_, i) => (
            <Glow key={i} x={800 + Math.sin(t * 0.3 + i) * 140} y={660 - i * 50 * mist} r={150 - i * 8} colour={p.primary} opacity={0.18} />
          ))}
        </g>
      </Layer>
    </>
  );
}

export function PrincesTale({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[Math.min(i, L.length - 1)].start;
  const time = complete ? L[7].end + 2 : t;

  let cam = cameraFor('crane', progress(time, 0, at(1)), time);
  cam = mixCam(cam, cameraFor('drift', 0, time), fadeIn(time, at(1), 3));
  cam = mixCam(cam, cameraFor('pullBack', progress(time, at(7), L[7].end), time), fadeIn(time, at(7), 2));

  // Each memory shows in the mist while its sentence is on screen.
  const swing = window2(time, at(1), at(2) + 0.5);
  const crack = progress(time, at(1) + 10, at(1) + 12);
  const candle = window2(time, at(2), at(3) + 0.5);
  const candleOut = progress(time, at(2) + 6, at(2) + 10);
  const door = window2(time, at(3), at(4) + 0.5);
  const doe = complete ? 0.6 : window2(time, at(4), at(5) + 1);
  const settle = 1 - 0.5 * fadeIn(time, at(5), 4);
  const row = window2(time, at(6), at(7) + 0.5);
  const still = fadeIn(time, at(7), 2);

  // The doe's light: bounding across the mist in soft arcs, then resting.
  const run = progress(time, at(4) + 2, at(4) + 12);
  const dx = complete ? MX : lerp(520, 1080, run);
  const dy = complete ? MY : MY + 80 - Math.abs(Math.sin(run * Math.PI * 3)) * 110;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Basin t={time} mist={settle} />
      <Layer depth={0.3}>
        <Haze y={MY + 40} colour={p.primary} opacity={0.12} t={time} />
        {/* A swing on a chain, moving gently, then a crack of light across it. */}
        {swing > 0 && (
          <g opacity={swing} stroke={p.accent} strokeWidth={3} fill="none">
            <path d={`M ${MX - 160} ${MY - 170} L ${MX + 160} ${MY - 170}`} />
            <g transform={`rotate(${Math.sin(time * 1.1) * 14} ${MX} ${MY - 170})`}>
              <path d={`M ${MX - 50} ${MY - 170} L ${MX - 50} ${MY + 70} M ${MX + 50} ${MY - 170} L ${MX + 50} ${MY + 70}`} strokeDasharray="6 6" />
              <rect x={MX - 66} y={MY + 66} width={132} height={14} rx={4} fill={p.secondary} />
            </g>
            {crack > 0 && <path d={`M ${MX - 260} ${MY - 120} L ${MX - 120} ${MY - 40} L ${MX - 40} ${MY - 90} L ${MX + 60} ${MY + 20} L ${MX + 140} ${MY - 20} L ${MX + 260} ${MY + 90}`} pathLength={1} strokeDasharray={`${crack} 1`} stroke={p.highlight} strokeWidth={4} />}
          </g>
        )}
        {/* A single candle that goes out. */}
        {candle > 0 && (
          <g opacity={candle}>
            <rect x={MX - 12} y={MY - 10} width={24} height={150} rx={4} fill={p.accent} opacity={0.85} />
            <Glow x={MX} y={MY - 40} r={160} colour={p.accent} opacity={0.35 * (1 - candleOut)} />
            <Flame x={MX} y={MY - 10} size={0.8} t={time} height={1 - candleOut} core="#FFFFFF" outer={p.primary} />
            <Smoke x={MX} y={MY - 14} t={time} start={at(2) + 9.5} life={7} colour={p.accent} opacity={0.5} />
          </g>
        )}
        {/* A closed door with a thin line of light beneath it. */}
        {door > 0 && (
          <g opacity={door}>
            <rect x={MX - 110} y={MY - 200} width={220} height={360} fill="#2A3242" stroke={p.primary} strokeWidth={3} />
            <rect x={MX - 85} y={MY - 175} width={170} height={130} fill="none" stroke={p.primary} strokeWidth={2} opacity={0.6} />
            <rect x={MX - 85} y={MY - 20} width={170} height={150} fill="none" stroke={p.primary} strokeWidth={2} opacity={0.6} />
            <circle cx={MX + 80} cy={MY} r={6} fill={p.accent} />
            <rect x={MX - 110} y={MY + 160} width={220} height={4} fill={p.highlight} opacity={0.8} />
          </g>
        )}
        {/* The silver doe: a soft silver light that moves like a deer, with a faint trail. */}
        {doe > 0 && (
          <g opacity={doe}>
            {[0.06, 0.12, 0.18].map((lag, i) => {
              const r2 = Math.max(0, run - lag);
              return <Glow key={i} x={lerp(520, 1080, r2)} y={MY + 80 - Math.abs(Math.sin(r2 * Math.PI * 3)) * 110} r={60 - i * 12} colour={p.accent} opacity={0.25 - i * 0.06} />;
            })}
            <Glow x={dx} y={dy} r={160} colour={p.primary} opacity={0.5} />
            <ellipse cx={dx} cy={dy} rx={46} ry={26} fill={p.highlight} opacity={0.8} />
            <Particles kind="dust" t={time} count={20} colour={p.highlight} opacity={0.5} area={{ x: dx - 120, y: dy - 100, w: 240, h: 200 }} />
          </g>
        )}
        {/* A cold, hard-edged row of classroom candles. */}
        {row > 0 && (
          <g opacity={row}>
            <rect x={MX - 300} y={MY + 120} width={600} height={16} fill="#3A4456" />
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i}>
                <rect x={MX - 270 + i * 90} y={MY + 40} width={14} height={80} fill="#C9D3E6" />
                <path d={`M ${MX - 263 + i * 90} ${MY + 40} L ${MX - 270 + i * 90} ${MY + 22} L ${MX - 263 + i * 90} ${MY} L ${MX - 256 + i * 90} ${MY + 22} Z`} fill="#DCE6FF" />
              </g>
            ))}
          </g>
        )}
        {/* The end: the basin still, one candle. */}
        {still > 0 && (
          <g opacity={still}>
            <rect x={1180} y={600} width={18} height={100} rx={3} fill={p.accent} opacity={0.8} />
            <Glow x={1189} y={580} r={120} colour={p.accent} opacity={0.3} />
            <Flame x={1189} y={600} size={0.55} t={time} core="#FFFFFF" outer={p.primary} />
          </g>
        )}
      </Layer>
    </Stage>
  );
}

// Beat 13: Think it through, after the second scene, softly blurred: the
// basin for The Prince's Tale, or the warm lamp in the boarded room for the
// gentle alternative. A candle brightens a little as each rung opens.
export function SecondThink({ beat, t, frozen, complete, cues, gentle }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.08, rot: 0 }} frozen={frozen} label={beat.title}>
      {gentle ? (
        <g style={{ filter: 'blur(3px) saturate(0.8)' }}>
          <WarmRoom t={t} glow={rungs / 6} />
        </g>
      ) : (
        <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
          <Basin t={t} mist={0.7} />
          <Layer depth={0.6}>
            <rect x={1180} y={600} width={18} height={100} rx={3} fill={p.accent} opacity={0.8} />
            <Glow x={1189} y={580} r={110 + 15 * rungs} colour={p.accent} opacity={0.2 + 0.04 * rungs} />
            <Flame x={1189} y={600} size={0.55} t={t} core="#FFFFFF" outer={p.primary} />
          </Layer>
        </g>
      )}
      <Layer depth={0.8}>
        <Particles kind="dust" t={t} count={14} colour={p.accent} opacity={0.2} />
      </Layer>
    </Stage>
  );
}
