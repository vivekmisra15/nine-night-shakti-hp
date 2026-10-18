// Beat 4: From the darkened brow. (The "For the parent" bell rings first.)
//   Sentence 0    a second, deeper glow rises out of the Devi's darkened
//                 flame: Kali, a dark-light indigo form with an ember core
//   Sentence 1    a very faint fine-line outline of head and shoulders with
//                 loose flowing hair lines shows within her light (no features)
//   Sentence 2    small gold sword and noose icons settle beside her (no
//                 skulls are drawn)
//   Sentences 3–4 smoke shapes are drawn into her darkness and vanish
//   Sentence 5    two larger smoke shapes rush in
//   Sentence 6    they dissolve into ash-grey drift (slow motion). No heads,
//                 no bodies, nothing else is shown.
//   Sentences 7–8 Kali's glow bows towards the Devi's flame, which brightens
//                 back to warm gold as she names her Chamunda

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { DarkLight, linesOf, N7Icon, SoundRing } from './kit';
import { day7Palettes } from './palettes';

const s = day7Palettes.n7smokeBattle;

// Where the small smoke shapes start, before they are drawn into Kali.
const army = Array.from({ length: 9 }, (_, i) => ({
  x: 1080 + (i % 3) * 150 + (i % 2) * 40,
  y: 420 + Math.floor(i / 3) * 140,
  delay: i * 1.4,
}));

export function DarkenedBrow({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const time = complete ? L[8].end + 2 : t;

  const cam = mixCam(cameraFor('lowAngle', progress(time, 0, at(5)), time), cameraFor('pullBack', progress(time, at(5), L[8].end), time), fadeIn(time, at(5), 3));

  // Kali springs from the Devi's brow, then stands to the right.
  const rise = easeInOut(progress(time, at(0), at(0) + 6));
  const bow = easeInOut(progress(time, at(7), at(7) + 3));
  const kx = lerp(520, 900, rise) - 70 * bow;
  const ky = lerp(560, 660, rise) + 20 * bow;
  const outline = fadeIn(time, at(1), 3) * (1 - 0.5 * fadeIn(time, at(3), 2));
  const icons = fadeIn(time, at(2), 2);
  // The Devi's own flame: dark with anger, warming again as she speaks gently.
  const warm = easeInOut(progress(time, at(7), at(7) + 4));
  // The generals.
  const rush = easeInOut(progress(time, at(5), at(5) + 3));
  const ash = easeInOut(progress(time, at(6) + 0.5, at(6) + 4));
  const naming = progress(time, L[8].end - 4, L[8].end - 1); // on "Chamunda"

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={s.shadow} bottom="#2A221C" t={time} stars={12} starColour={s.highlight} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={14} baseY={640} height={90} fill="#1A1512" />
        <Haze y={600} colour={s.secondary} opacity={0.25} t={time} />
      </Layer>
      <Layer depth={0.45}>
        {/* The demon army, drawn one by one into Kali's darkness. */}
        {army.map((a, i) => {
          const pull = easeInOut(progress(time, at(3) + a.delay, at(3) + a.delay + 3));
          return (
            <SmokeShape key={i} x={lerp(a.x, kx, pull)} y={lerp(a.y, ky - 120, pull)} t={time} size={lerp(0.55, 0.15, pull)} seed={40 + i} dissolve={pull * 0.995} colour={s.primary} ember={s.accent} />
          );
        })}
      </Layer>
      <Layer depth={0.6}>
        <path d="M -400 800 Q 800 760 2000 800 L 2000 1300 L -400 1300 Z" fill="#0B0907" />
        {/* The Devi: her flame, darkened with anger, then warm again. */}
        <DarkLight x={520} y={640} t={time} size={0.75} strength={1 - warm} pulse={pulse} />
        <DivineLight x={520} y={640} t={time} kind="warm" size={0.75} strength={warm * 1.1} pulse={pulse} />
        {/* Kali: the deeper glow that sprang from her brow. */}
        <DarkLight x={kx} y={ky} t={time} size={lerp(0.4, 1.15, rise)} strength={rise > 0.02 ? 1 : 0} outline={outline} pulse={pulse} />
        <SymbolIcon name="sword" x={kx - 190} y={ky - 200} size={1.3} opacity={icons} colour="#E8B45A" />
        <N7Icon name="noose" x={kx + 190} y={ky - 200} size={1.2} opacity={icons} colour="#E8B45A" />
        {/* Chanda and Munda rush in, and dissolve into ash. */}
        {time > at(5) && (
          <>
            <SmokeShape x={lerp(1750, 1180, rush)} y={500} t={time} size={1.1} seed={61} dissolve={ash} colour={s.primary} ember={s.accent} />
            <SmokeShape x={lerp(1800, 1260, rush)} y={690} t={time} size={1.05} seed={67} dissolve={ash} colour={s.primary} ember={s.accent} />
          </>
        )}
        {ash > 0 && <Particles kind="dust" t={time} count={30} colour={s.secondary} opacity={0.5 * (1 - fadeIn(time, at(7), 4))} area={{ x: 1000, y: 380, w: 420, h: 420 }} speed={2} />}
        {/* "You will be known as Chamunda": a soft gold ring from the Devi. */}
        <SoundRing x={520} y={600} p={naming} colour="#F7D27A" reach={600} />
        <Glow x={520} y={600} r={240} colour="#F29F3D" opacity={0.15 * warm} />
      </Layer>
      <Layer depth={0.9}>
        <Particles kind="embers" t={time} count={20} colour={s.highlight} opacity={0.35} />
      </Layer>
    </Stage>
  );
}
