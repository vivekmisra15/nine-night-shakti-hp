// Beat 5: At her father's house. (The "For the parent" note is shown first.)
//   Sentence 0   her mother and sisters run to welcome her
//   Sentence 1   Daksha turns his head away
//   Sentence 2   a slow pan to the empty seat where Shiva's share should be
//   Sentence 3   Shiva's attendants surge forward; Sati's flame flares and they stop
//   4–6          a low-angle shot of Sati's flame as she speaks, burning steadily
//   Sentence 7   she sits in meditation: her flame settles slowly down into a
//                single diya, and the camera pushes in
//   (People are gold outlines with no faces; Sati is her flame throughout.)
//   Sentence 8   GUARDRAIL: the lamp flame alone rises, brightens to
//                white-gold, thins and goes out (slow motion), and a thread
//                of smoke rises. No body, and no fire around any figure.
//                Freeze-frame on the empty lamp.
//   Sentence 9   a soft wave of light passes outward and every outline
//                turns towards Daksha; the colour drains towards grief

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight, Outline } from '../figures';
import { type Cam, Diya, fadeIn, fadeOut, Flame, Glow, H, Layer, mixCam, Particles, Sky, Smoke, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from './common';

const d = palettes.dakshaCourt;
const g = palettes.grief;

// The camera's shots, one per part of the narration.
const shots: Record<string, Cam> = {
  welcome: { x: 220, y: -40, zoom: 1.18, rot: 0 },
  seat: { x: -260, y: -40, zoom: 1.18, rot: 0 },
  sati: { x: 0, y: 40, zoom: 1.28, rot: 0 },
  diya: { x: 0, y: -470, zoom: 1.55, rot: 0 },
};

export function FathersHouse({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  // Move between shots, easing over about 3 seconds each time.
  let cam = shots.welcome;
  cam = mixCam(cam, shots.seat, easeInOut(progress(t, at(2), at(2) + 4)));
  cam = mixCam(cam, shots.sati, easeInOut(progress(t, at(3), at(3) + 3)));
  cam = mixCam(cam, shots.diya, easeInOut(progress(t, at(7) + 2, L[7].end + 2)));

  // The welcome: mother and sisters run in from the left.
  const run = easeInOut(progress(t, at(0), at(0) + 4));
  // Daksha turns away.
  const turnAway = easeInOut(progress(t, at(1), at(1) + 2)) * 28;
  // The attendants surge, then stop when Sati raises her palm.
  const surge = easeInOut(progress(t, at(3), at(3) + 1.5)) - 0.6 * easeInOut(progress(t, at(3) + 2, at(3) + 3.5));
  const palmUp = t >= at(3) + 1.8 && t < at(4) + 1;
  // Sati's flame: steady, flaring as she stops the attendants, then settling
  // down into the diya as she sits in meditation.
  const settle = easeInOut(progress(t, at(7) + 1.5, at(7) + 5));
  const satiStrength = palmUp ? 1.6 : t > at(4) && settle === 0 ? 1.15 + 0.1 * Math.sin(t * 1.5) : 1;
  const inLamp = t >= at(7) + 5; // from here the lamp's own flame carries on
  const satiFade = fadeOut(t, at(7) + 4, 3);

  // The lamp flame (sentence 8): grows, brightens, thins, goes out.
  const f0 = at(8);
  const grow = easeInOut(progress(t, f0, f0 + 3));
  const thin = easeInOut(progress(t, f0 + 4.5, f0 + 7.5));
  const flameHeight = t < f0 ? 1 : lerp(1, 2.2, grow) * (1 - thin);
  const flameOut = t >= f0 + 7.5;
  // Everything else dims to 10% for the flame moment.
  // After the cry, the light returns a little so the turning silhouettes show.
  const dim = fadeIn(t, at(7) + 3, 3) * 0.9 * (1 - 0.45 * fadeIn(t, at(9), 3));
  const wave = progress(t, at(9), at(9) + 4);
  const turnToDaksha = easeInOut(progress(t, at(9) + 0.5, at(9) + 3));
  const toGrief = fadeIn(t, at(9), 4);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top="#3A1A3A" bottom="#C46A2B" t={t} stars={10} />
      </Layer>
      <Layer depth={0.2}>
        <path d="M 1000 520 L 1000 300 Q 1180 230 1360 300 L 1360 520 Z" fill="#4A1C14" />
        <rect x={-400} y={520} width={2400} height={500} fill="#3A120F" />
      </Layer>
      <Layer depth={0.35}>
        {/* The assembly, as faint outlines; at the end they all turn to Daksha. */}
        {Array.from({ length: 14 }, (_, i) => (
          <Outline key={i} x={100 + i * 110} y={640} scale={0.42} colour="#B8862B" opacity={0.45} lean={turnToDaksha * (i < 11 ? 8 : -8)} />
        ))}
      </Layer>
      <Layer depth={0.6}>
        {/* The sacrificial fire, in its pit, well away from Sati. */}
        <rect x={60} y={740} width={200} height={40} fill="#5C2018" />
        <Glow x={160} y={720} r={170} colour={d.accent} opacity={0.4} />
        {[110, 145, 180, 210].map((x, i) => (
          <Flame key={x} x={x} y={745} size={0.9} t={t + i} />
        ))}
        <Particles kind="embers" t={t} count={16} colour={d.accent} area={{ x: 90, y: 480, w: 150, h: 260 }} />
        {/* The empty seat where Shiva's share should be, glowing faintly. */}
        <ellipse cx={1050} cy={770} rx={70} ry={18} fill={d.secondary} />
        <ellipse cx={1050} cy={758} rx={36} ry={8} fill="#B8862B" />
        <Glow x={1050} y={750} r={90} colour="#FFE3A3" opacity={0.3 * fadeIn(t, at(2), 2)} />
        {/* Daksha on his dais. */}
        <rect x={1190} y={660} width={200} height={60} fill={d.secondary} />
        <Outline x={1290} y={660} scale={0.8} head="crown" headTilt={turnAway} colour="#FFE3A3" />
      </Layer>
      <Layer depth={0.8}>
        {/* Mother and sisters, arms open in welcome. */}
        {[0, 1, 2].map((i) => (
          <Outline key={i} x={lerp(-60 - i * 90, 640 - i * 90, run)} y={820} scale={0.8 - i * 0.06} head="veiled" arms={run < 1 ? 'welcome' : 'heart'} colour={['#F2B5A7', '#E8B45A', '#F7D58A'][i]} opacity={satiFade} />
        ))}
        {/* Shiva's attendants: wild-haired outlines in a cooler tone, stopped by Sati. */}
        {[0, 1, 2].map((i) => (
          <Outline key={i} x={920 + i * 70 + surge * 140} y={830} scale={0.62} head="wild" colour="#C9D3E6" lean={-surge * 10} opacity={satiFade} />
        ))}
      </Layer>

      {/* The flame moment: all other light dims; only the lamp remains. */}
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#07080F" opacity={dim} />
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={g.primary} opacity={toGrief * 0.35} style={{ mixBlendMode: 'color' }} />
      <Layer depth={0.8}>
        {/* Sati, as her flame: above the dimming, so she stays bright as the room darkens. */}
        {!inLamp && (
          <DivineLight x={lerp(800, 818, settle)} y={lerp(700, 852, settle)} t={t} kind="warm" size={lerp(0.9, 0.62, settle)} strength={satiStrength} pulse={pulse} />
        )}
        <g opacity={fadeIn(t, at(7) + 3, 2)}>
          <Diya x={800} y={860} t={t} scale={1} lit={0} />
          {inLamp && !flameOut && (
            <Flame x={818} y={852} size={0.9} t={t} height={flameHeight} core="#FFFFFF" outer={grow > 0.6 ? '#FFF1C1' : '#F29F3D'} pulse={pulse} />
          )}
          <Smoke x={818} y={850} t={t} start={f0 + 7} life={7} opacity={0.45} />
        </g>
        {/* "A great cry went up across the worlds": a soft ring of light. */}
        {wave > 0 && wave < 1 && (
          <circle cx={800} cy={840} r={40 + wave * 1400} fill="none" stroke={g.highlight} strokeWidth={30 * (1 - wave)} opacity={0.5 * (1 - wave)} />
        )}
      </Layer>
    </Stage>
  );
}
