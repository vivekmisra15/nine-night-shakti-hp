// Beats 8–9: Hagrid's cake at midnight, and "Think it through" after it.
// Abstract only: objects, light and places; no people, faces or film
// imagery. (The player adds the letterbox bars.)
//
// Beat 8, following the retelling sentence by sentence:
//   Sentence 0   a small hut on a black rock in a grey sea, rain slanting,
//                one dim window; a few envelopes drift and settle on the waves
//   Sentence 1   inside: a bare floor in shadow, and a faint glowing watch
//                dial counting
//   Sentence 2   a coat-hanger outline hangs briefly in the dark, then fades
//   Sentence 3   a sudden bang: the door bursts inward and warm lantern
//                light floods the floor; a huge shadow fills the doorway (no
//                figure, no face) (slow motion)
//   Sentence 4   a small, slightly squashed box in a pool of light
//   Sentence 5   the lid lifts and a soft glow rises from the cake (no
//                lettering)
//   Sentence 6   the light holds; nothing moves (freeze)
//   Sentence 7   a fire catches in the grate, sparks rise, the room turns amber
// Camera: aerial over the sea, then a push in through the window; still from
// the box to the held light; a slow pull back at the fire.

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { type Cam, fadeIn, Flame, Glow, H, Layer, mixCam, Particles, rand, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from '../day1/common';
import { day4Palettes } from './palettes';

const s = day4Palettes.n4stormHut;

// Slanting rain over the whole frame.
function Rain({ t, opacity = 0.35 }: { t: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: 80 }, (_, i) => {
        const x0 = rand(i, 1) * 2000 - 200;
        const fall = (rand(i, 2) * 1100 + t * 900) % 1100;
        const x = x0 - fall * 0.35;
        const y = fall - 120;
        return <line key={i} x1={x} y1={y} x2={x - 14} y2={y + 40} stroke="#9FB0C2" strokeWidth={1.4} />;
      })}
    </g>
  );
}

// A small envelope, drifting and rocking on the sea.
function Envelope({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-16} y={-11} width={32} height={22} fill="#E9DFC8" opacity={0.85} />
      <path d="M -16 -11 L 0 2 L 16 -11" fill="none" stroke="#8C7A66" strokeWidth={1.2} />
    </g>
  );
}

// Outside: the hut on its rock in the stormy sea.
function Storm({ t, envelopes }: { t: number; envelopes: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={s.shadow} bottom={s.primary} t={t} />
        {/* Heavy, slow storm clouds. */}
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx={(i * 340 + t * 6) % 2200 - 300} cy={120 + (i % 3) * 60} rx={360} ry={70} fill="#1A2029" opacity={0.6} />
        ))}
      </Layer>
      <Layer depth={0.3}>
        {/* The black rock and the small hut, with one dim window. */}
        <path d="M 560 640 Q 620 520 760 500 Q 900 490 980 540 Q 1060 590 1080 650 Z" fill="#07090D" />
        <rect x={720} y={420} width={200} height={110} fill="#11151C" />
        <path d="M 700 425 L 820 360 L 940 425 Z" fill="#0B0E13" />
        <rect x={840} y={455} width={34} height={28} fill={s.highlight} opacity={0.35 + 0.08 * wobble(t, 2)} />
        <Glow x={857} y={469} r={60} colour={s.accent} opacity={0.2} />
      </Layer>
      <Layer depth={0.6}>
        {/* The grey sea, rolling. */}
        {Array.from({ length: 6 }, (_, i) => {
          const y = 620 + i * 60;
          const d = `M -400 ${y} ${Array.from({ length: 13 }, (_, k) => `Q ${-400 + k * 200 + 100} ${y - 18 + wobble(t, 0.8, i + k) * 8} ${-200 + k * 200} ${y}`).join(' ')} L 2000 ${H + 400} L -400 ${H + 400} Z`;
          return <path key={i} d={d} fill={i % 2 ? s.secondary : '#3B4A58'} opacity={0.55 + i * 0.07} />;
        })}
        {/* A few letters, drifting down and settling on the waves. */}
        {Array.from({ length: 7 }, (_, i) => {
          const land = 700 + (i % 3) * 60;
          const fall = progress(envelopes, i * 0.08, i * 0.08 + 0.5);
          const x = 260 + i * 180 + Math.sin(t * 0.6 + i) * 20;
          const y = lerp(-40, land, fall) + (fall >= 1 ? wobble(t, 0.9, i) * 6 : 0);
          return <Envelope key={i} x={x} y={y} rot={Math.sin(t + i) * 20} />;
        })}
      </Layer>
      <Layer depth={0.9}>
        <Rain t={t} />
      </Layer>
    </>
  );
}

// Inside the hut. Each value is 0 to 1: the burst of lantern light from the
// door, the box, the glow from the cake, and the fire in the grate.
export function HutInside({ t, dial, hanger, burst, box, cake, fire }: { t: number; dial: number; hanger: number; burst: number; box: number; cake: number; fire: number }) {
  return (
    <>
      <Layer depth={0.1}>
        {/* Bare walls in shadow, warming to amber with the fire. */}
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#0C0F14" />
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={s.accent} opacity={0.12 * fire} />
        {/* Wall planks. */}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={i * 130 - 100} y1={-100} x2={i * 130 - 100} y2={560} stroke="#000" strokeWidth={3} opacity={0.4} />
        ))}
        {/* The small window, storm-grey. */}
        <rect x={700} y={140} width={150} height={120} fill="#1E2630" />
        <path d="M 775 140 L 775 260 M 700 200 L 850 200" stroke="#0A0C10" strokeWidth={8} />
        {/* The coat-hanger, hanging briefly in the dark. */}
        <g opacity={hanger} fill="none" stroke="#C9B48A" strokeWidth={2.5} strokeLinecap="round">
          <path d="M 1000 250 Q 1000 228 1014 228 Q 1026 230 1024 242 Q 1022 250 1012 256 L 1012 266" />
          <path d="M 1012 266 L 920 320 L 1104 320 Z" />
        </g>
      </Layer>
      <Layer depth={0.4}>
        {/* The grate on the left, where the fire will catch. */}
        <path d="M 160 560 L 160 400 L 400 400 L 400 560" fill="#0A0806" stroke="#2A2118" strokeWidth={10} />
        {fire > 0 && (
          <>
            <Glow x={280} y={500} r={420 * fire} colour={s.accent} opacity={0.45 * fire} />
            <Flame x={250} y={555} size={1.1} t={t} height={fire} outer={s.accent} core={s.highlight} />
            <Flame x={300} y={558} size={0.9} t={t + 1.3} height={fire} outer={s.accent} core={s.highlight} />
            <Flame x={280} y={556} size={1.3} t={t + 2.1} height={fire} outer="#C9662A" core={s.highlight} />
            <Particles kind="embers" t={t} count={18} colour={s.highlight} opacity={0.8 * fire} area={{ x: 200, y: 160, w: 160, h: 400 }} />
          </>
        )}
        {/* The door on the right: it bursts inward, and lantern light floods in. */}
        <rect x={1200} y={230} width={200} height={330} fill="#06080B" />
        {burst > 0 && (
          <>
            <rect x={1200} y={230} width={200} height={330} fill={s.highlight} opacity={0.85 * burst} />
            {/* The huge shadow filling the doorway: a dark shape, no figure, no face. */}
            <path d="M 1212 560 L 1212 300 Q 1300 210 1388 300 L 1388 560 Z" fill="#0C0A08" opacity={0.92 * burst * (1 - cake * 0.4)} />
          </>
        )}
        {/* The door itself, swinging in towards us. */}
        <path
          d={`M 1200 230 L ${lerp(1400, 1120, burst)} ${lerp(230, 200, burst)} L ${lerp(1400, 1120, burst)} ${lerp(560, 600, burst)} L 1200 560 Z`}
          fill="#2A2118"
          stroke="#3A2E22"
          strokeWidth={4}
        />
      </Layer>
      <Layer depth={0.7}>
        {/* The floorboards, in shadow. */}
        <path d="M -400 560 L 2000 560 L 2000 1300 L -400 1300 Z" fill="#14100C" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-200 + i * 260} y1={560} x2={-900 + i * 420} y2={1000} stroke="#000" strokeWidth={3} opacity={0.5} />
        ))}
        {/* The lantern light flooding across the floor from the door. */}
        {burst > 0 && <path d="M 1200 560 L 1400 560 L 1300 1000 L 300 1000 Z" fill={s.highlight} opacity={0.18 * burst} />}
        {/* The faint glowing watch dial on the floor, counting. */}
        <g opacity={dial * (1 - box)}>
          <Glow x={620} y={720} r={70} colour="#CFE0C8" opacity={0.25} />
          <ellipse cx={620} cy={720} rx={34} ry={20} fill="none" stroke="#CFE0C8" strokeWidth={2} opacity={0.6} />
          <line x1={620} y1={720} x2={620 + Math.cos(t * 0.6) * 24} y2={720 + Math.sin(t * 0.6) * 13} stroke="#CFE0C8" strokeWidth={2} opacity={0.7} />
        </g>
        {/* The squashed box, in its pool of light; the lid lifts; the glow rises. */}
        <g opacity={box}>
          <Glow x={800} y={760} r={260} colour={s.highlight} opacity={0.35} />
          <path d="M 720 800 L 724 742 Q 760 732 800 738 Q 846 732 880 746 L 884 800 Z" fill="#6E5034" stroke="#C9A06A" strokeWidth={2} />
          <path d="M 800 738 L 802 800" stroke="#C9A06A" strokeWidth={1.2} opacity={0.6} />
          {/* The lid, lifting and tipping back. */}
          <g transform={`translate(0 ${-50 * cake}) rotate(${-24 * cake} 720 742)`}>
            <path d="M 712 744 Q 760 728 800 734 Q 848 728 890 744 L 886 734 Q 846 720 800 724 Q 756 720 716 734 Z" fill="#7E5C3C" stroke="#C9A06A" strokeWidth={2} />
          </g>
          {cake > 0 && (
            <>
              <Glow x={800} y={720} r={180 * cake} colour="#FFE3B0" opacity={0.6 * cake} />
              <Particles kind="dust" t={t} count={14} colour="#FFF0D0" opacity={0.6 * cake} area={{ x: 720, y: 520, w: 160, h: 220 }} />
            </>
          )}
        </g>
      </Layer>
    </>
  );
}

export function HagridsCake({ beat, t, frozen }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;

  const envelopes = progress(t, 0.5, at(1));
  const inside = fadeIn(t, at(1) - 1.5, 2.5);
  const dial = fadeIn(t, at(1), 2);
  const hanger = Math.min(fadeIn(t, at(2) + 1, 1.5), 1 - fadeIn(t, at(3) - 1.5, 1.5));
  const burst = easeInOut(progress(t, at(3), at(3) + 1.6));
  const box = fadeIn(t, at(4), 2);
  const cake = easeInOut(progress(t, at(5), at(5) + 3));
  const fire = easeInOut(progress(t, at(7), at(7) + 4));

  // Aerial over the sea, then a push in towards the window; inside, still,
  // close on the box; then a slow pull back as the fire catches.
  const aerial: Cam = { x: 0, y: lerp(-80, 20, progress(t, 0, at(1))), zoom: lerp(1.04, 1.5, easeInOut(progress(t, at(1) - 3, at(1)))), rot: 0 };
  const room: Cam = { x: 0, y: 0, zoom: 1.04, rot: 0 };
  const onBox: Cam = { x: 0, y: -60, zoom: 1.22, rot: 0 };
  const wide: Cam = { x: 0, y: 0, zoom: 1.02, rot: 0 };
  let cam = mixCam(aerial, room, inside);
  cam = mixCam(cam, onBox, easeInOut(progress(t, at(4), at(4) + 3)));
  cam = mixCam(cam, wide, easeInOut(progress(t, at(7), at(7) + 6)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {inside < 1 && (
        // Zoom about the hut window as we go in.
        <g transform={`translate(857 469) scale(${1 + inside * 2}) translate(-857 -469)`}>
          <Storm t={t} envelopes={envelopes} />
        </g>
      )}
      {inside > 0 && (
        <g opacity={inside}>
          <HutInside t={t} dial={dial} hanger={hanger} burst={burst} box={box} cake={cake} fire={fire} />
        </g>
      )}
    </Stage>
  );
}

// Beat 9: the hut's fire glowing low behind the questions, softly blurred.
// The fire brightens a little as each rung of the ladder opens.
export function HutFire({ beat, t, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.1, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.7)' }}>
        <HutInside t={t} dial={0} hanger={0} burst={0.6} box={1} cake={1} fire={0.6 + 0.4 * (rungs / 6)} />
      </g>
    </Stage>
  );
}
