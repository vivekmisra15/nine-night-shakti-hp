// Beat 2: The daughter who chose.
//   Sentence 0      Daksha's palace by day: a low-angle tilt up to Daksha,
//                   proud and still, with incense smoke
//   Sentences 1–2   cross-fade to Kailasa at dusk: an aerial glide up the
//                   mountain; Shiva's wild spirits drift as lights
//   Sentences 3–4   a gentle push-in to Shiva and Sati together by the fire
//   The end         the snow turns to marigold petals, leading into Beat 3

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight, Outline } from '../figures';
import { cameraFor, fadeIn, Flame, Glow, Haze, Layer, mixCam, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop, linesOf } from './common';

const d = palettes.dakshaCourt;
const k = palettes.kailasa;

// Daksha's palace: pillars, domes, courtiers and the throne.
export function Palace({ t, dakshaArm = 'rest', dakshaTilt = 0, shadow = 0 }: { t: number; dakshaArm?: 'rest' | 'sweep'; dakshaTilt?: number; shadow?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#E8B45A" bottom={d.primary} t={t} />
        {/* Gold domes. */}
        {[300, 800, 1300].map((x, i) => (
          <path key={x} d={`M ${x - 120} 380 Q ${x} ${170 - i * 10} ${x + 120} 380 Z`} fill="#8A6420" opacity={0.7} />
        ))}
      </Layer>
      <Layer depth={0.3}>
        <rect x={-400} y={380} width={2400} height={600} fill="#5C2018" />
        {/* Rows of courtiers, as faint gold outlines. */}
        {Array.from({ length: 16 }, (_, i) => (
          <Outline key={i} x={140 + i * 90 + (i > 7 ? 260 : 0)} y={700} scale={0.45} arms="anjali" colour="#B8862B" opacity={0.55} />
        ))}
        {/* Incense smoke curling to the right. */}
        <Particles kind="dust" t={t} count={14} colour="#FFE3A3" opacity={0.25} area={{ x: 500, y: 300, w: 700, h: 400 }} />
      </Layer>
      <Layer depth={0.5}>
        {/* Daksha's long shadow grows as he speaks (Beat 3). */}
        <ellipse cx={800} cy={720} rx={100 + 260 * shadow} ry={22} fill="#1A0806" opacity={0.5 * shadow} />
        {/* The throne platform and Daksha enthroned. */}
        <rect x={680} y={640} width={240} height={80} fill={d.secondary} />
        <path d="M 700 640 L 700 470 Q 800 420 900 470 L 900 640 Z" fill="#B8862B" opacity={0.9} />
        <Outline x={800} y={640} scale={0.95} head="crown" arms={dakshaArm} headTilt={dakshaTilt} colour="#FFE3A3" />
      </Layer>
      <Layer depth={0.9}>
        {/* Carved pillars in the foreground. */}
        {[60, 1540].map((x) => (
          <g key={x}>
            <rect x={x - 60} y={-100} width={120} height={1100} fill="#3A1A10" />
            <rect x={x - 70} y={140} width={140} height={20} fill="#B8862B" />
            <rect x={x - 70} y={700} width={140} height={20} fill="#B8862B" />
          </g>
        ))}
      </Layer>
    </>
  );
}

// Kailasa at dusk: Shiva (a cool silver light) and Sati (a warm flame) by a
// small fire, with Shiva's wild spirits drifting as lights.
export function KailasaCouple({ t, pulse }: { t: number; pulse: number }) {
  return (
    <>
      <KailasaBackdrop t={t} />
      <Layer depth={0.7}>
        {/* Shiva's wild spirits, as playful drifting lights. */}
        <Particles kind="fireflies" t={t} count={22} colour="#C9F0E0" opacity={0.7} area={{ x: 200, y: 450, w: 1200, h: 300 }} />
      </Layer>
      <Layer depth={0.85}>
        <path d="M -200 860 Q 400 780 800 800 Q 1200 780 1800 860 L 1800 1100 L -200 1100 Z" fill="#E8ECF4" opacity={0.85} />
        {/* A small campfire of logs: lower and redder than Sati's flame, so the two are never confused. */}
        <Glow x={800} y={800} r={200} colour="#E2552B" opacity={0.3} />
        <path d="M 770 822 L 830 806 M 772 806 L 828 822" stroke="#3A2414" strokeWidth={9} strokeLinecap="round" />
        <Flame x={790} y={812} size={0.5} t={t} pulse={pulse} outer="#E2552B" core="#F5A623" />
        <Flame x={810} y={814} size={0.4} t={t + 1} outer="#E2552B" core="#F5A623" />
        <Particles kind="embers" t={t} count={14} colour={k.accent} opacity={0.8} area={{ x: 760, y: 560, w: 80, h: 250 }} />
        <DivineLight x={600} y={700} t={t} kind="silver" size={0.9} pulse={pulse} />
        <DivineLight x={1000} y={760} t={t} kind="warm" size={0.8} pulse={pulse} />
      </Layer>
    </>
  );
}

export function DaughterWhoChose({ beat, t, duration, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const toKailasa = fadeIn(t, L[1].start, 3);
  const glide = progress(t, L[1].start, L[2].end);
  const push = progress(t, L[3].start, duration);

  const palaceCam = cameraFor('lowAngle', progress(t, 0, L[1].start), t);
  const kailasaCam = mixCam(cameraFor('aerial', glide, t), cameraFor('pushIn', push, t), easeInOut(progress(t, L[3].start - 1, L[3].start + 3)));
  const cam = mixCam(palaceCam, kailasaCam, toKailasa);
  const petals = fadeIn(t, duration - 5, 3);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toKailasa < 1 && <Palace t={t} />}
      <g opacity={toKailasa}>
        <KailasaCouple t={t} pulse={pulse} />
        <Haze y={lerp(900, 700, push)} colour={k.primary} opacity={0.08} t={t} />
      </g>
      {petals > 0 && (
        <Layer depth={1}>
          <Particles kind="petals" t={t} count={26} colour={d.accent} opacity={0.8 * petals} />
        </Layer>
      )}
    </Stage>
  );
}
