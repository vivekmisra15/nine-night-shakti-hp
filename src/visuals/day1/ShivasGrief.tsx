// Beat 6: Shiva's grief.
//   Sentence 0  a storm over Kailasa; Narada (an outline) brings the news;
//               Shiva's silver light, dim with grief, flares into fury
//   Sentence 1  the lock of hair thrown down in one sweeping arc of shadow
//               (slow motion); Virabhadra rises as a towering column of light and
//               shadow, not a monster; the sacrifice scatters (pillars
//               topple in silhouette, embers, no gore)
//   Sentence 2  a vast dim land seen from above; Shiva's light moves slowly
//               across it, carrying Sati's dimmed flame. No body is drawn.
//   Sentence 3  Vishnu's soft blue light rises; Sati's flame scatters gently
//               into petals of light (never cutting), and the petals drift down
//   Sentence 4  where each petal lands a Shakti Peetha blooms as a lotus of
//               light; Kamakhya and Kalighat are labelled
//   Sentence 5  snow returns: Shiva's light rests in a mountain cave, completely still

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { DivineLight, Outline } from '../figures';
import { cameraFor, fadeIn, fadeOut, Glow, Layer, LightLotus, mixCam, Particles, rand, Ridge, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from './common';

const g = palettes.grief;

// Where the petals land, and the two places that are labelled.
const peethas = Array.from({ length: 12 }, (_, i) => ({ x: 220 + rand(i, 5) * 1160, y: 560 + rand(i, 6) * 260 }));
peethas[9] = { x: 1240, y: 600 }; // Kamakhya, in Assam (north-east)
peethas[10] = { x: 1120, y: 720 }; // Kalighat, in Kolkata (east)

export function ShivasGrief({ beat, t, duration, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const storm = fadeOut(t, at(1) + 7, 1.5);
  const scattered = window2(t, at(1) + 7, at(2) + 1, 1);
  const land = window2(t, at(2), at(5) + 0.5, 1.5);
  const cave = fadeIn(t, at(5), 2);

  // Camera: close-up, then low angle, then aerial drift, then push-in.
  const closeUp = { x: 0, y: -200, zoom: 1.6, rot: 0 };
  let cam = mixCam(closeUp, cameraFor('lowAngle', progress(t, at(1), at(1) + 8), t), easeInOut(progress(t, at(1), at(1) + 3)));
  cam = mixCam(cam, cameraFor('aerial', progress(t, at(2), at(5)), t), fadeIn(t, at(2), 1.5));
  cam = mixCam(cam, cameraFor('pushIn', progress(t, at(5), duration), t), cave);

  // Sentence 1: the hair-throw, the strike, and Virabhadra rising.
  const throwArc = easeInOut(progress(t, at(1), at(1) + 3.5));
  const strike = t >= at(1) + 3.5;
  const rise = easeInOut(progress(t, at(1) + 3.6, at(1) + 7));
  const lightning = Math.max(0, Math.sin(t * 2.1) * Math.sin(t * 5.3)) > 0.85 ? 0.35 : 0;

  // Sentences 2–4: the walk, the dissolving, and the Peethas.
  const walk = progress(t, at(2), at(4));
  const step = Math.abs(Math.sin(walk * Math.PI * 9)) * 6; // a slow, heavy step
  const shivaX = lerp(220, 760, walk); // stays clear of the labelled Peethas on the right
  const gone = easeInOut(progress(t, at(3) + 1, L[3].end));
  const vishnu = window2(t, at(3), at(4) + 2, 1.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {/* The storm over Kailasa, and Shiva's grief turning to fury. */}
      {storm > 0 && (
        <g opacity={storm}>
          <Layer depth={0.05}>
            <Sky top={g.shadow} bottom={g.primary} t={t} />
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx={((i * 260 + t * (20 + i * 4)) % 2200) - 300} cy={120 + (i % 4) * 70} rx={320} ry={70} fill={g.secondary} opacity={0.25} />
            ))}
            <rect x={-400} y={-400} width={2400} height={1700} fill={g.highlight} opacity={lightning} />
          </Layer>
          <Layer depth={0.3}>
            <Ridge seed={3} baseY={760} height={160} fill="#10142A" peak={{ x: 800, h: 220 }} />
          </Layer>
          <Layer depth={0.6}>
            {/* Narada, small and respectful, with his veena. */}
            <g opacity={fadeOut(t, at(1), 1.5)}>
              <Outline x={300} y={880} scale={0.6} head="topknot" arms="heart" colour="#E8ECF4" />
              <path d="M 270 740 L 350 640" stroke="#8A5A2B" strokeWidth={6} />
              <circle cx={265} cy={748} r={14} fill="#8A5A2B" />
            </g>
          </Layer>
          <Layer depth={0.8}>
            {/* Shiva's light: dim with grief, then flaring into fury. */}
            <DivineLight x={800} y={560} t={t} kind="silver" size={1.6} strength={lerp(0.55, 1.8, easeInOut(progress(t, at(0) + 2.5, at(1))))} pulse={pulse} />
            {/* The lock of hair: a sweeping arc of shadow from the light to the ground. */}
            {t >= at(1) && !strike && (
              <path d="M 820 560 Q 1060 520 1170 880" pathLength={1} stroke="#05060C" strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${throwArc} 1`} />
            )}
            {strike && rise < 1 && <Glow x={1170} y={880} r={300 * (1 - rise)} colour={g.accent} opacity={0.6} />}
          </Layer>
          {/* Virabhadra: a towering column of light and shadow. */}
          {strike && (
            <Layer depth={0.7}>
              <Glow x={1170} y={880 - rise * 400} r={360} colour={g.accent} opacity={0.35 * rise} />
              <path d={`M 1110 900 L 1130 ${900 - rise * 760} L 1210 ${900 - rise * 760} L 1230 900 Z`} fill="#0B0C18" opacity={0.85 * rise} />
              <path d={`M 1130 900 L 1150 ${900 - rise * 700} L 1190 ${900 - rise * 700} L 1210 900`} stroke={g.accent} strokeWidth={4} fill="none" opacity={rise} />
              <Particles kind="embers" t={t} count={30} colour={g.accent} area={{ x: 1000, y: 200, w: 340, h: 700 }} opacity={rise} speed={2} />
            </Layer>
          )}
        </g>
      )}

      {/* The sacrifice scattered: pillars topple in silhouette, embers rise. */}
      {scattered > 0 && (
        <g opacity={scattered}>
          <Layer depth={0.05}>
            <Sky top="#1B1F3B" bottom="#7A2A1A" t={t} />
          </Layer>
          <Layer depth={0.6}>
            <rect x={-400} y={700} width={2400} height={400} fill="#1A0806" />
            {[300, 560, 1040, 1300].map((x, i) => {
              const fall = easeInOut(progress(t, at(1) + 7 + i * 0.4, at(1) + 9 + i * 0.4));
              return <rect key={x} x={x - 30} y={360} width={60} height={340} fill="#0B0C18" transform={`rotate(${fall * (i % 2 ? 70 : -70)} ${x} 700)`} />;
            })}
            <Particles kind="embers" t={t} count={50} colour={g.accent} area={{ x: 0, y: 200, w: 1600, h: 600 }} speed={1.5} />
          </Layer>
        </g>
      )}

      {/* The vast land at night: the walk, the dissolving, the Peethas. */}
      {land > 0 && (
        <g opacity={land}>
          <Layer depth={0.05}>
            <Sky top={g.shadow} bottom="#202848" t={t} stars={50} starColour={g.highlight} />
          </Layer>
          <Layer depth={0.3}>
            <Ridge seed={21} baseY={600} height={70} fill="#161B36" />
            {/* Rivers, as faint silver lines. */}
            <path d="M -200 700 Q 400 640 700 720 T 1800 680" stroke={g.highlight} strokeWidth={3} fill="none" opacity={0.25} />
            <path d="M 200 900 Q 600 780 1000 820 T 1800 760" stroke={g.highlight} strokeWidth={2} fill="none" opacity={0.2} />
            {/* The Shakti Peethas bloom where the petals land. */}
            {peethas.map((p, i) => {
              const landAt = at(3) + 2 + i * 0.9;
              const open = easeOut(progress(t, landAt, landAt + 1.5));
              return <LightLotus key={i} x={p.x} y={p.y} size={0.5} open={open} colour="#FFE3A3" opacity={0.9} />;
            })}
            <g opacity={fadeIn(t, at(4), 1.5)} fill={g.highlight} fontSize={26} fontFamily="Georgia, serif" textAnchor="middle">
              <text x={peethas[9].x} y={peethas[9].y + 46}>Kamakhya</text>
              <text x={peethas[10].x} y={peethas[10].y + 46}>Kalighat</text>
            </g>
          </Layer>
          <Layer depth={0.2}>
            {/* Vishnu: a calm, soft blue light. */}
            <g opacity={vishnu}>
              <DivineLight x={1250} y={220} t={t} kind="blue" size={0.9} />
            </g>
          </Layer>
          <Layer depth={0.75}>
            {/* Shiva's light moves slowly across the land, carrying Sati's dimmed flame. */}
            <g transform={`translate(0 ${step})`} opacity={fadeOut(t, at(5) - 1, 1.5)}>
              <DivineLight x={shivaX} y={720} t={t} kind="silver" size={0.8} strength={0.8} />
              <DivineLight x={shivaX + 55} y={780} t={t} kind="warm" size={0.7} strength={0.8 * (1 - gone)} />
              {gone >= 1 && <Glow x={shivaX + 50} y={740} r={90} colour="#FFE3A3" opacity={0.3} />}
              {/* Petals of light leaving from the dissolving edge. */}
              {gone > 0 && gone < 1 && (
                <Particles kind="petals" t={t} count={16} colour="#FFE3A3" opacity={0.85} area={{ x: shivaX + 10, y: 700, w: 80, h: 220 }} seed={4} speed={0.8} />
              )}
            </g>
          </Layer>
        </g>
      )}

      {/* The cave in the snow, and Shiva's long silent meditation. */}
      {cave > 0 && (
        <g opacity={cave}>
          <Layer depth={0.05}>
            <Sky top={g.shadow} bottom={g.primary} t={t} stars={30} starColour={g.highlight} />
          </Layer>
          <Layer depth={0.4}>
            <path d="M 300 900 Q 320 380 800 340 Q 1280 380 1300 900 Z" fill="#05060C" />
            <path d="M 260 900 Q 280 330 800 290 Q 1320 330 1340 900 L 1400 900 Q 1380 260 800 230 Q 220 260 200 900 Z" fill={g.highlight} opacity={0.8} />
          </Layer>
          <Layer depth={0.7}>
            <Glow x={800} y={700} r={200} colour={g.highlight} opacity={0.12 + pulse * 0.05} />
            <DivineLight x={800} y={720} t={t} kind="silver" size={0.8} strength={0.9} pulse={pulse} />
          </Layer>
          <Layer depth={1}>
            <Particles kind="snow" t={t} count={50} colour={g.highlight} opacity={0.6} />
          </Layer>
        </g>
      )}
    </Stage>
  );
}
