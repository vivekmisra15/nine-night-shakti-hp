// Beat 3: Kama's arrow.
//   Sentence 0     the ridge, Shiva's silver light in meditation
//   Sentence 1     Taraka: a far-off dark smoke shape on the horizon, fading by sentence 2
//   Sentence 2     Indra's light calls Kama's rose light (and Rati's paler light)
//   Sentence 3     Kama and Rati arrive, with Spring
//   Sentence 4     blossom bursts on bare branches; birds as tiny gold strokes
//   Sentence 5     Parvati's flame approaches; a single fine arrow of light
//                  leaves Kama's light (slow motion)
//   Sentence 6     Shiva's light flickers towards her
//   Sentences 7–8  then hardens, and finds Kama
//   Sentence 9     a bright point opens in the silver light, a flash, and
//                  Kama's rose light scatters into drifting ash and falling
//                  petals. No burning figure. (Freeze-frame.) The spring
//                  colours drain to ash grey.
//   Sentence 10    Rati's light sinks low
//   Sentence 11    the gods' light bows
//   Sentence 12    a faint rose ember is kept alive: the promise
//   Sentence 13    Shiva's light vanishes
//   Sentence 14    Parvati's flame hurries down the slope
// Camera: a slow push-in, then a hard cut to still at the flash.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, fadeOut, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { HighRidge, ledgeY, SHIVA_SEAT } from './common';
import { ArrowOfLight, AshAndPetals, BeadRing, OutlineTree, ThirdEyeFlash } from './kit';

const v = palettes.n2vasanta;
const g = palettes.grief;

// Trees along the slope: bare at first, then in blossom.
const trees = [
  { x: 140, s: 0.9 },
  { x: 330, s: 0.75 },
  { x: 560, s: 0.8 },
  { x: 1380, s: 0.85 },
  { x: 1560, s: 0.7 },
];

// Small birds, as two-stroke gold marks, drifting across the sky.
function Birds({ t, opacity }: { t: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity} fill="none" stroke="#E8B45A" strokeWidth={2} strokeLinecap="round">
      {Array.from({ length: 7 }, (_, i) => {
        const x = ((i * 230 + t * (30 + i * 4)) % 1900) - 150;
        const y = 180 + (i % 3) * 60 + Math.sin(t + i) * 12;
        const flap = 6 + Math.sin(t * 6 + i) * 4;
        return <path key={i} d={`M ${x - 10} ${y - flap} Q ${x - 4} ${y} ${x} ${y} Q ${x + 4} ${y} ${x + 10} ${y - flap}`} />;
      })}
    </g>
  );
}

export function KamasArrow({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const flashAt = at(9) + 1.5;

  // Push in slowly until the flash, then hold still.
  const cam = t < flashAt ? cameraFor('pushIn', progress(t, 0, flashAt), t) : { x: 0, y: 0, zoom: 1.02, rot: 0 };

  const taraka = fadeIn(t, at(1), 2) * fadeOut(t, at(2) + 1, 2);
  const indra = fadeIn(t, at(2), 2) * fadeOut(t, at(11) + 4, 3);
  const kamaIn = fadeIn(t, at(2) + 3, 2.5);
  const spring = fadeIn(t, at(4), 3) * fadeOut(t, flashAt, 2);
  const toAsh = fadeIn(t, flashAt, 3);

  // Parvati approaches with her flowers, then hurries home at the end.
  const approach = easeInOut(progress(t, at(5), at(5) + 4));
  const home = easeInOut(progress(t, at(14), at(14) + 5));
  const px = lerp(lerp(260, 860, approach), 120, home);

  // The arrow (sentence 5, in slow motion), from Kama towards Shiva.
  const kama = { x: 470, y: ledgeY(470) - 70 };
  const arrow = progress(t, at(5) + 1.2, at(5) + 4.2);
  // Shiva's light: flickers towards her, hardens, flashes, later vanishes.
  const flicker = fadeIn(t, at(6), 1.5) * (1 - fadeIn(t, at(7), 1.5));
  const harden = fadeIn(t, at(7), 2);
  const vanish = fadeIn(t, at(13), 2.5);
  const shivaX = SHIVA_SEAT.x - 50 * flicker;
  const flash = progress(t, flashAt - 0.8, flashAt + 3.5);

  // Kama's light scatters at the flash; a faint ember is kept alive later.
  const kamaGone = t >= flashAt;
  const ember = fadeIn(t, at(12), 2.5);
  const rati = { x: 400, y: ledgeY(400) - 50 };
  const ratiSink = fadeIn(t, at(10), 3);
  const bow = fadeIn(t, at(11), 2) * fadeOut(t, at(11) + 5, 2);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {/* The ridge; the false spring warms the sky, then the ash greys it. */}
      <HighRidge t={t} snow={false} />
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={v.primary} opacity={0.22 * spring} style={{ mixBlendMode: 'soft-light' }} />
      <Layer depth={0.2}>
        {/* Taraka, far away: a dark smoke shape on the horizon. */}
        <SmokeShape x={230} y={460} t={t} size={1.1} seed={4} opacity={taraka} colour="#2A2420" />
        {/* Indra, king of the gods. */}
        <g opacity={indra}>
          <DivineLight x={420} y={220 + 30 * bow} t={t} kind="violet" size={0.45} />
        </g>
        <Birds t={t} opacity={spring} />
      </Layer>
      <Layer depth={0.6}>
        {trees.map((tr, i) => (
          <OutlineTree key={i} x={tr.x} y={ledgeY(tr.x) + 6} size={tr.s} grow={1} bloom={spring} colour="#B8862B" flower={v.primary} />
        ))}
      </Layer>
      <Layer depth={0.65}>
        {/* Rati, a paler light beside Kama; she sinks low in grief. */}
        <g opacity={kamaIn * (1 - 0.4 * ratiSink)}>
          <Glow x={rati.x} y={rati.y + 50 * ratiSink} r={90} colour="#F2A48A" opacity={0.4} />
          <DivineLight x={rati.x} y={rati.y + 50 * ratiSink} t={t} kind="rose" size={0.32} strength={0.8} />
        </g>
        {/* Kama, the god of love: a soft rose light. */}
        {!kamaGone && (
          <g opacity={kamaIn}>
            <DivineLight x={kama.x} y={kama.y} t={t} kind="rose" size={0.45} pulse={pulse} />
          </g>
        )}
        {/* The promise: a faint rose ember kept alive where Kama was. */}
        {ember > 0 && <Glow x={kama.x} y={kama.y + 30} r={40} colour={v.accent} opacity={0.5 * ember * (0.8 + 0.2 * Math.sin(t * 2))} />}
        {/* Shiva: silver light, hardening, then gone. */}
        <g opacity={1 - vanish}>
          <DivineLight x={shivaX} y={SHIVA_SEAT.y - 60} t={t} kind="silver" size={0.75} strength={1 + 0.4 * harden - 0.3 * flicker * Math.abs(Math.sin(t * 5))} pulse={pulse} />
        </g>
        {/* Parvati, coming with her flowers; then hurrying home. */}
        <DivineLight x={px} y={ledgeY(px) - 6} t={t} kind="warm" size={0.5} strength={t > flashAt ? 0.7 : 1} pulse={pulse} />
        <ArrowOfLight x1={kama.x + 30} y1={kama.y - 10} x2={shivaX - 20} y2={SHIVA_SEAT.y - 70} p={arrow} />
      </Layer>
      {/* After the flash: ash, turning to petals, and the colour drained to grey. */}
      <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={g.primary} opacity={0.35 * toAsh} style={{ mixBlendMode: 'color' }} />
      <Layer depth={0.8}>
        <AshAndPetals t={t} start={flashAt + 0.4} turn={progress(t, flashAt + 3, flashAt + 12)} />
        {spring > 0.05 && <Particles kind="petals" t={t} count={12} colour={v.primary} opacity={0.5 * spring} seed={5} />}
      </Layer>
      <ThirdEyeFlash x={shivaX} y={SHIVA_SEAT.y - 110} p={flash} />
      <Layer depth={0.9}>
        <BeadRing lit={1} t={t} />
      </Layer>
    </Stage>
  );
}
