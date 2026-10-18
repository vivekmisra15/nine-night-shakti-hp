// Beat 2: The order to seize her. (Beat 3, the choice, uses its last frame.)
//   Sentence 0    a dusk sky: three smoke shapes crowd in and the small
//                 god-lights (Shiva silver, Vishnu blue, Brahma gold, Indra
//                 violet) drift away off the frame
//   Sentence 1    two small smoke shapes see a warm glow on a far peak
//   Sentences 2–4 a small wisp of smoke (the messenger) goes to the peak and back
//   Sentence 5    a larger smoke shape (Dhumralochana) moves on the peak; a
//                 ring of sound spreads from the glow and the smoke dissolves
//   Sentence 6    a mass of smoke shapes with ember points gathers
//   Sentence 7    cut to a low angle on the golden peak: the Devi's warm flame,
//                 seated, with a small gold lion icon beside it
//   Sentence 8    the smoke army closes in from both sides
//   Sentence 9    the flame darkens from gold to deep indigo with an ember
//                 core, and the sky darkens with it (freeze-frame)
// No figure is drawn: the Devi is light, the demons are smoke.

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { DivineLight, SmokeShape, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, DarkLight, FaintStars, linesOf, SoundRing } from './kit';
import { day7Palettes } from './palettes';

const g = day7Palettes.n7goldenPeak;
const n = day7Palettes.n7darkNight;
const s = day7Palettes.n7smokeBattle;

// The gods driven out: four small lights (their own colours).
const gods = [
  { x: 420, y: 250, kind: 'silver' as const },
  { x: 660, y: 200, kind: 'blue' as const },
  { x: 940, y: 220, kind: 'gold' as const },
  { x: 1180, y: 260, kind: 'violet' as const },
];

// The wide view: the three worlds at dusk, with the Devi's glow on a far peak.
function WideShot({ beat, t, pulse }: { beat: VisualProps['beat']; t: number; pulse: number }) {
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const crowd = easeInOut(progress(t, 0.5, 7));
  const driven = easeInOut(progress(t, 3, 11));
  const seen = fadeIn(t, at(1), 3);
  // The messenger: to the peak and back.
  const go = easeInOut(progress(t, at(2), at(3)));
  const back = easeInOut(progress(t, at(3) + 2, at(5) - 1));
  const msg = go - back;
  // Dhumralochana: moves on the peak, then the sound, then ash.
  const advance = easeInOut(progress(t, at(5), at(5) + 6));
  const soundAt = at(5) + 6.5;
  const ring = progress(t, soundAt, soundAt + 3);
  const ash = easeInOut(progress(t, soundAt + 0.4, soundAt + 3));
  const army = fadeIn(t, at(6), 5);

  return (
    <>
      <Layer depth={0.05}>
        <Sky top={g.shadow} bottom={g.secondary} t={t} />
        {/* The last dusk-gold light along the horizon. */}
        <Haze y={560} colour={g.primary} opacity={0.35} t={t} />
        <FaintStars t={t} count={30} seed={2} colour={g.highlight} />
      </Layer>
      <Layer depth={0.12}>
        {/* The far Himalayan peak where the Devi is, catching the gold. */}
        <Ridge seed={4} baseY={620} height={80} fill="#232850" peak={{ x: 1180, h: 160 }} />
        <Glow x={1180} y={330} r={160 + 60 * seen} colour={g.accent} opacity={0.25 + 0.3 * seen + pulse * 0.05} />
        <circle cx={1180} cy={338} r={5} fill={g.highlight} opacity={0.6 + 0.4 * seen} />
        <SoundRing x={1180} y={338} p={ring} colour={g.highlight} reach={700} />
      </Layer>
      <Layer depth={0.2}>
        {/* The gods' lights, driven off the frame. */}
        {gods.map((god, i) => (
          <DivineLight key={god.kind} x={god.x + (i < 2 ? -1 : 1) * driven * 700} y={god.y - driven * 260} t={t} kind={god.kind} size={0.32} strength={1 - driven * 0.8} />
        ))}
        {/* Three smoke shapes crowd into the worlds. */}
        {[0, 1, 2].map((i) => (
          <SmokeShape key={i} x={lerp([-200, 800, 1800][i], [360, 700, 960][i], crowd)} y={lerp(-100, 250 + (i % 2) * 50, crowd)} t={t} size={1.3} seed={i + 2} opacity={0.6 * (1 - 0.6 * army)} colour={s.primary} ember={s.accent} />
        ))}
      </Layer>
      <Layer depth={0.45}>
        <Ridge seed={9} baseY={760} height={90} fill="#161A3A" />
        {/* Dhumralochana, sent to drag her back, dissolving into ash at her sound. */}
        {t > at(5) && <SmokeShape x={lerp(260, 960, advance)} y={lerp(640, 470, advance)} t={t} size={0.8} seed={7} dissolve={ash} colour={s.primary} ember={s.accent} />}
        {ash > 0 && ash < 1 && <Particles kind="dust" t={t} count={18} colour={s.secondary} opacity={0.5 * (1 - ash)} area={{ x: 860, y: 380, w: 200, h: 200 }} />}
        {/* The messenger, a small wisp. */}
        {msg > 0.01 && <SmokeShape x={lerp(360, 1080, msg)} y={lerp(690, 420, msg)} t={t} size={0.3} seed={5} opacity={0.7} colour={s.secondary} ember={s.accent} />}
      </Layer>
      <Layer depth={0.75}>
        <path d="M -400 840 Q 400 780 800 800 Q 1200 820 2000 790 L 2000 1300 L -400 1300 Z" fill="#0A0C1E" />
        {/* Chanda and Munda, two small smoke shapes turned towards the glow. */}
        <g opacity={fadeIn(t, at(1) - 1, 2)}>
          <SmokeShape x={280} y={720} t={t} size={0.55} seed={11} colour={s.primary} ember={s.accent} />
          <SmokeShape x={410} y={745} t={t} size={0.5} seed={13} colour={s.primary} ember={s.accent} />
        </g>
        {/* The army gathering behind them. */}
        {Array.from({ length: 10 }, (_, i) => (
          <SmokeShape key={i} x={-60 + i * 70} y={800 - (i % 3) * 40} t={t} size={0.5 + (i % 3) * 0.1} seed={20 + i} opacity={0.75 * fadeIn(t, at(6) + i * 0.4, 2)} colour={s.primary} ember={s.accent} />
        ))}
      </Layer>
    </>
  );
}

// The low angle on the golden peak: the Devi's flame, seated, with the lion.
// `army` (0 to 1) brings the smoke in from both sides; `dark` (0 to 1) turns
// her flame from gold to deep indigo with an ember core.
export function PeakShot({ t, army, dark, pulse }: { t: number; army: number; dark: number; pulse: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={g.shadow} bottom={g.secondary} t={t} />
        <FaintStars t={t} count={24} seed={3} colour={g.highlight} />
        <g opacity={dark}>
          <Sky top={n.shadow} bottom={n.primary} t={t} stars={40} starColour={n.highlight} />
        </g>
      </Layer>
      <Layer depth={0.3}>
        <Ridge seed={6} baseY={760} height={70} fill="#141836" />
      </Layer>
      <Layer depth={0.55}>
        {/* The golden peak, lit from the summit. */}
        <path d="M 260 1000 L 700 600 Q 800 540 900 600 L 1340 1000 Z" fill="#3A2E3A" />
        <path d="M 260 1000 L 700 600 Q 800 540 900 600 L 1340 1000 Z" fill={g.primary} opacity={lerp(0.45, 0.18, dark)} />
        {/* Shadowed rock faces on the right of the peak. */}
        <path d="M 800 572 L 880 700 L 860 820 L 1000 1000 L 1340 1000 L 900 600 Q 850 572 800 572 Z" fill="#141836" opacity={0.45} />
        <path d="M 700 600 Q 800 540 900 600" stroke={g.highlight} strokeWidth={3} fill="none" opacity={lerp(0.7, 0.25, dark)} />
        <Glow x={800} y={520} r={360} colour={g.accent} opacity={0.3 * (1 - dark)} />
        {/* The Devi, smiling: a calm warm flame, darkening with her anger. */}
        <DivineLight x={800} y={580} t={t} kind="warm" size={0.9} strength={1 - dark} pulse={pulse} />
        <DarkLight x={800} y={580} t={t} size={0.9} strength={dark} pulse={pulse} />
        <SymbolIcon name="lion" x={905} y={600} size={1.2} colour={g.highlight} opacity={lerp(0.9, 0.5, dark)} />
      </Layer>
      <Layer depth={0.85}>
        {/* The army with swords drawn, closing in from both sides. */}
        {Array.from({ length: 12 }, (_, i) => {
          const side = i % 2 ? 1 : -1;
          const row = Math.floor(i / 2);
          const x = 800 + side * lerp(900 + row * 60, 380 + row * 70, army);
          return <SmokeShape key={i} x={x} y={760 + (row % 3) * 34 + wobble(t, 0.3, i) * 6} t={t} size={0.6 + (row % 2) * 0.15} seed={30 + i} opacity={0.85} colour={s.primary} ember={s.accent} />;
        })}
      </Layer>
    </>
  );
}

export function OrderToSeize({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const time = complete ? L[9].end + 2 : t;
  const toPeak = fadeIn(time, at(7) - 1, 2.5);
  const cam = mixCam(cameraFor('aerial', progress(time, 0, at(7)), time), cameraFor('lowAngle', progress(time, at(7), L[9].end), time), toPeak);
  const army = easeInOut(progress(time, at(8), at(9) + 1));
  const dark = easeInOut(progress(time, at(9), at(9) + 4));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toPeak < 1 && <WideShot beat={beat} t={time} pulse={pulse} />}
      {toPeak > 0 && (
        <g opacity={toPeak}>
          <PeakShot t={time} army={army} dark={dark} pulse={pulse} />
        </g>
      )}
    </Stage>
  );
}

// Beat 3: What will she do with her anger? (a choice)
// The frozen last frame of Beat 2, breathing gently. Each option chosen
// gives one soft ember pulse in the Devi's dark light. At the reveal ("the
// anger takes a form of its own") the dark glow deepens and widens.
export function AngerChoice({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const picks = Object.keys(cues).filter((k) => k.startsWith('pick:'));
  const lastPick = picks.length ? t - cues[picks[picks.length - 1]] : 99;
  const pickPulse = lastPick < 2 ? 1 - lastPick / 2 : 0;
  const deepen = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 4));
  const breathe = 1 + 0.02 * Math.sin(t * 0.8);
  return (
    <Stage cam={{ x: 0, y: -30, zoom: 1.08 * breathe, rot: 0 }} frozen={frozen} label={beat.title}>
      <PeakShot t={t} army={1} dark={1} pulse={pulse + pickPulse * 0.6} />
      <Layer depth={0.55}>
        <Glow x={800} y={480} r={260 + 200 * deepen} colour="#3A3F9E" opacity={0.25 * deepen + 0.2 * pickPulse} />
      </Layer>
    </Stage>
  );
}
