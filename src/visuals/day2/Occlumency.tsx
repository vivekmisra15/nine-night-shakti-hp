// Beats 13–14: Occlumency, and "Think it through" after it.
// Abstract only: objects, light and places; no figures, no veil. Each
// sentence of the retelling is its own quiet vignette, cross-fading:
//   0   a long dark corridor ending in a door, glowing faint blue (push-in)
//   1   a single desk lamp in a stone room
//   2   a notebook of nights, its pages turning, left blank
//   3   a basin of silver light; a ripple; the lamp is put out
//   4   an exam hall of empty desks; the corridor flashes over it
//       (the parent bell rings again here)
//   5   a small fire in a grate (amber, never green), a brief cold flare
//   6   the door opens on darkness; a single candle goes out (freeze-frame)
//   7   an office window at dawn, grey and still

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { Candle, fadeIn, Flame, Glow, H, Layer, Particles, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';

const c = palettes.n2closedDoor;

// The corridor in perspective, ending in a door. `open` 0 to 1 swings it open on darkness.
function Corridor({ glow = 1, open = 0 }: { glow?: number; open?: number }) {
  return (
    <>
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={c.shadow} />
      {/* Walls, floor and ceiling converging on the door. */}
      <path d="M -400 -400 L 720 330 L 720 640 L -400 1300 Z" fill={c.primary} />
      <path d="M 2000 -400 L 880 330 L 880 640 L 2000 1300 Z" fill={c.primary} />
      <path d="M -400 1300 L 720 640 L 880 640 L 2000 1300 Z" fill="#10131E" />
      {/* Stone joints receding. */}
      {[0.2, 0.4, 0.6, 0.8].map((f) => (
        <g key={f} stroke={c.secondary} strokeWidth={2} opacity={0.25}>
          <line x1={lerp(-400, 720, f)} y1={lerp(-400, 330, f)} x2={lerp(-400, 720, f)} y2={lerp(1300, 640, f)} />
          <line x1={lerp(2000, 880, f)} y1={lerp(-400, 330, f)} x2={lerp(2000, 880, f)} y2={lerp(1300, 640, f)} />
        </g>
      ))}
      {/* The door at the end, glowing faintly blue. */}
      <Glow x={800} y={485} r={260} colour={c.accent} opacity={0.35 * glow} />
      <rect x={730} y={340} width={140} height={300} fill="#0A0C14" />
      <path d={`M 730 340 L ${730 + 140 * (1 - open * 0.8)} ${340 - 20 * open} L ${730 + 140 * (1 - open * 0.8)} ${640 + 20 * open} L 730 640 Z`} fill="#1E2436" stroke={c.accent} strokeWidth={2} opacity={0.95} />
      <rect x={730} y={340} width={140} height={300} fill="none" stroke={c.accent} strokeWidth={3} opacity={0.6 * glow} />
    </>
  );
}

// A stone room with a single desk lamp. `lamp` 0 to 1.
function LampRoom({ t, lamp = 1 }: { t: number; lamp?: number }) {
  return (
    <>
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={c.primary} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={-400} y1={i * 110} x2={2000} y2={i * 110} stroke={c.shadow} strokeWidth={3} opacity={0.5} />
      ))}
      <rect x={-400} y={640} width={2400} height={500} fill="#191C28" />
      <rect x={480} y={600} width={640} height={30} fill="#2C2620" />
      <Glow x={800} y={520} r={360} colour="#E8B45A" opacity={0.35 * lamp} />
      {/* The lamp: a shade on a stand. */}
      <path d="M 760 600 L 790 600 L 790 470 L 774 470 Z" fill="#3A3226" />
      <path d="M 730 480 L 830 480 L 806 420 L 754 420 Z" fill="#6A5634" />
      <Flame x={780} y={472} size={0.3} t={t} height={lamp} outer="#E8B45A" />
    </>
  );
}

export function Occlumency({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const last = L.length - 1;
  // How visible vignette n is now: in its own sentence, fading at each end.
  const show = (n: number) => (complete ? (n === last ? 1 : 0) : n === last ? fadeIn(t, at(n) - 0.6, 1.2) : window2(t, at(n) - 0.6, L[n].end + 0.6, 1.2));
  const push = easeInOut(progress(t, 0, L[0].end));

  // Sentence 2: the pages turning, blank night after night.
  const pageTurn = ((t - at(2)) / 1.4) % 1;
  // Sentence 3: a ripple in the basin, then the lamp put out.
  const ripple = progress(t, at(3) + 1, at(3) + 5);
  const lampOut = 1 - fadeIn(t, at(3) + 6, 1);
  // Sentence 4: the corridor flashes over the exam hall.
  const flash = window2(t, at(4) + 3, at(4) + 6, 0.4);
  // Sentence 5: a brief cold flare in the fire.
  const flare = window2(t, at(5) + 3, at(5) + 4.5, 0.3);
  // Sentence 6: the door opens on darkness; a candle goes out.
  const doorOpen = easeInOut(progress(t, at(6) + 1, at(6) + 4));
  const candle = 1 - fadeIn(t, at(6) + 6, 1.5);

  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.02, rot: 0 }} frozen={frozen} label={beat.title}>
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#000" />
      {show(0) > 0 && (
        <g opacity={show(0)} transform={`translate(800 485) scale(${1 + 0.25 * push}) translate(-800 -485)`}>
          <Corridor />
        </g>
      )}
      {show(1) > 0 && (
        <g opacity={show(1)}>
          <LampRoom t={t} />
        </g>
      )}
      {show(2) > 0 && (
        <g opacity={show(2)}>
          <LampRoom t={t} />
          {/* An open notebook, its blank pages turning. */}
          <path d="M 640 590 L 800 610 L 960 590 L 960 540 L 800 560 L 640 540 Z" fill="#E6E0D0" opacity={0.85} />
          <line x1={800} y1={560} x2={800} y2={610} stroke="#9A9488" strokeWidth={2} />
          <path d={`M 800 560 Q ${lerp(960, 640, pageTurn)} ${540 - Math.sin(pageTurn * Math.PI) * 60} ${lerp(960, 640, pageTurn)} ${540 + 0}`} fill="none" stroke="#F4F0E4" strokeWidth={3} opacity={0.9} />
        </g>
      )}
      {show(3) > 0 && (
        <g opacity={show(3)}>
          <LampRoom t={t} lamp={lampOut} />
          {/* A shallow stone basin full of silver light. */}
          <ellipse cx={1120} cy={590} rx={130} ry={26} fill="#2A2E3C" />
          <ellipse cx={1120} cy={584} rx={112} ry={18} fill={c.highlight} opacity={0.75} />
          <Glow x={1120} y={570} r={180} colour={c.highlight} opacity={0.4} />
          {ripple > 0 && ripple < 1 && <ellipse cx={1120} cy={584} rx={112 * ripple} ry={18 * ripple} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={1 - ripple} />}
        </g>
      )}
      {show(4) > 0 && (
        <g opacity={show(4)}>
          <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#2A2E3A" />
          <rect x={-400} y={420} width={2400} height={700} fill="#1E212B" />
          {/* Rows of empty desks, in perspective. */}
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 7 }, (_, i) => {
              const s = 0.5 + row * 0.25;
              const x = 800 + (i - 3) * 190 * s;
              const y = 480 + row * 110;
              return <rect key={`${row}-${i}`} x={x - 50 * s} y={y} width={100 * s} height={14 * s} fill="#4A4436" opacity={0.9} />;
            }),
          )}
          <g opacity={0.75 * flash}>
            <Corridor glow={1.6} />
          </g>
        </g>
      )}
      {show(5) > 0 && (
        <g opacity={show(5)}>
          <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#241C1A" />
          {/* A stone fireplace with a small amber fire. */}
          <path d="M 560 760 L 560 380 L 1040 380 L 1040 760 L 940 760 L 940 480 L 660 480 L 660 760 Z" fill="#3A3330" />
          <rect x={660} y={480} width={280} height={280} fill="#0E0A08" />
          <Glow x={800} y={700} r={200} colour="#E89A4A" opacity={0.45} />
          {[770, 800, 830].map((x, i) => (
            <Flame key={x} x={x} y={740} size={0.6} t={t + i} outer="#E89A4A" core="#FFE0A8" />
          ))}
          {/* The brief cold flare. */}
          <Glow x={800} y={640} r={260} colour="#DCE8FF" opacity={0.7 * flare} />
        </g>
      )}
      {show(6) > 0 && (
        <g opacity={show(6)}>
          <Corridor glow={1 - doorOpen * 0.6} open={doorOpen} />
          {/* A single candle at the threshold, going out. */}
          <Candle x={800} y={720} t={t} lit={candle} outer="#E8B45A" />
          {candle < 0.5 && <path d={`M 800 718 q 10 -40 -6 -80 q -12 -30 4 -60`} fill="none" stroke={c.highlight} strokeWidth={2} opacity={0.4 * (1 - fadeIn(t, at(6) + 10, 3))} />}
        </g>
      )}
      {show(7) > 0 && (
        <g opacity={show(7)}>
          <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#262A33" />
          {/* An office window at dawn: grey light, still. */}
          <path d="M 560 760 L 560 260 Q 800 120 1040 260 L 1040 760 Z" fill="#8E96A6" />
          <path d="M 560 760 L 560 260 Q 800 120 1040 260 L 1040 760 Z" fill="none" stroke="#1A1D24" strokeWidth={18} />
          <path d="M 800 160 L 800 760 M 560 460 L 1040 460" stroke="#1A1D24" strokeWidth={10} />
          <Glow x={800} y={420} r={420} colour="#C9D3E6" opacity={0.25} />
          <Layer depth={0.9}>
            <Particles kind="dust" t={t} count={14} colour="#E6ECF5" opacity={0.3} area={{ x: 560, y: 260, w: 480, h: 500 }} />
          </Layer>
        </g>
      )}
    </Stage>
  );
}

// Beat 14: faint behind the questions. With Occlumency, the corridor and
// its closed door; with the gentle alternative, the lamplit room where the
// practice went on late into the night.
export function DoorFaint({ beat, t, frozen, gentle }: VisualProps) {
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }} opacity={0.85}>
        {gentle ? <LampRoom t={t} /> : <Corridor glow={0.7} />}
      </g>
    </Stage>
  );
}
