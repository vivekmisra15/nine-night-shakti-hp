// Beats 5–7: the two seekers, King Suratha and the merchant Samadhi.
// People are fine gold outlines with no faces (the king in a kirita mukuta,
// the merchant bare-headed, the sage with a topknot); the Devi is her warm
// light on the lotus, with a faint head-and-shoulders line.
//
// Beat 5, Two seekers by the river:
//   Sentences 1–2 the king walks alone into a dark forest of fine-line trees
//   Sentence 3   the merchant sits under a tree
//   Sentences 4–6 the sage sits with them; as he speaks, tiny scenes from
//                earlier nights glow in the air (a column of gathered light, a
//                dark smoke shape, a fierce light) and fade
//   Sentences 7–8 a pale sandbank by a river, and a small earthen image with a
//                diya before it
//   Sentence 9   seasons pass: petals, incense smoke, water drops; the two
//                outlines kneel
//   Sentence 10  the Devi's warm light rises over the water on the lotus
//                (slow motion)
// Beat 6 holds the two kneeling outlines before her light; each choice lights
// a small lamp. Beat 7 shows what she gave (see WhatTheDeviGave below).

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, GOLD, Outline, SmokeShape } from '../figures';
import { cameraFor, type Cam, Diya, fadeIn, fadeOut, Flame, Glow, Layer, LightTrail, mixCam, Particles, Sky, Smoke, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { CrownIcon, cueAge, EarthenImage, LineTree, linesOf, LotusSeat, mixColour, Palace, Water } from './kit';
import { day9Palettes } from './palettes';

const r = day9Palettes.n9riverbank;

// The forest where the king and the merchant meet.
function Forest({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom="#1C2E3C" t={t} stars={40} starColour={r.highlight} />
      </Layer>
      <Layer depth={0.2}>
        {Array.from({ length: 12 }, (_, i) => (
          <LineTree key={i} x={i * 150 - 40} y={700} h={260 + (i % 3) * 40} opacity={0.18} seed={i + 30} colour={r.secondary} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        <path d="M -400 720 Q 800 690 2000 720 L 2000 1300 L -400 1300 Z" fill="#101C26" />
        {[-60, 180, 1180, 1420, 1650].map((x, i) => (
          <LineTree key={x} x={x} y={760} h={420} opacity={0.4} seed={i + 50} colour={r.secondary} />
        ))}
      </Layer>
    </>
  );
}

// The riverbank: slate water, the far bank, and the pale sandbank in front.
// `warm` (0 to 1) warms the sky towards the lotus night.
export function Riverbank({ t, warm = 0 }: { t: number; warm?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={mixColour(r.shadow, '#0E0A22', warm)} bottom={mixColour('#2A4050', '#3A2A5A', warm)} t={t} stars={50} starColour={r.highlight} />
      </Layer>
      <Layer depth={0.2}>
        <path d="M -400 600 Q 300 580 800 596 Q 1300 610 2000 590 L 2000 620 L -400 620 Z" fill="#0F1C26" />
        {Array.from({ length: 9 }, (_, i) => (
          <LineTree key={i} x={i * 210 - 60} y={600} h={110 + (i % 2) * 30} opacity={0.2} seed={i + 70} colour={r.secondary} />
        ))}
      </Layer>
      <Layer depth={0.35}>
        <Water y={612} t={t} colour="#1A3040" shimmer={r.highlight} />
      </Layer>
      <Layer depth={0.75}>
        {/* The pale sandbank. */}
        <path d="M -400 790 Q 400 740 800 748 Q 1300 756 2000 800 L 2000 1300 L -400 1300 Z" fill={r.secondary} opacity={0.32} />
        <path d="M -400 790 Q 400 740 800 748 Q 1300 756 2000 800" fill="none" stroke={r.highlight} strokeWidth={1.5} opacity={0.4} />
      </Layer>
    </>
  );
}

// The Devi on the lotus over the water: warm light, a faint outline.
function DeviOnLotus({ t, show, outline = 0.25, pulse = 0 }: { t: number; show: number; outline?: number; pulse?: number }) {
  if (show <= 0.01) return null;
  return (
    <g opacity={show}>
      <Glow x={800} y={560} r={320} colour="#F29F3D" opacity={0.25} />
      <LotusSeat x={800} y={650} size={0.85} open={1} t={t} />
      <DivineLight x={800} y={600} t={t} kind="warm" size={0.85} pulse={pulse} />
      <DeviOutline x={800} y={520} size={1.1} opacity={outline} />
      <ellipse cx={800} cy={668} rx={130} ry={9} fill="#F7B733" opacity={0.2} />
    </g>
  );
}

const forestShot: Cam = { x: 0, y: 0, zoom: 1.06, rot: 0 };

export function TwoSeekers({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? L[L.length - 1].end + 5 : t;

  // Drift through the forest, then a slow pan along the river.
  const toRiver = fadeIn(T, at(7) - 1, 2.5);
  let cam = mixCam(forestShot, cameraFor('drift', 0, T), 0.6);
  cam = mixCam(cam, cameraFor('pan', progress(T, at(7), at(10) + 6), T), toRiver);

  // The forest.
  const walk = easeInOut(progress(T, at(1), at(2) + 5));
  const merchant = fadeIn(T, at(3), 2);
  const sage = fadeIn(T, at(5) - 1, 2);
  // Tiny scenes from earlier nights glowing in the air as Medhas tells them.
  const s6 = at(6);
  const v1 = window2(T, s6 + 0.5, s6 + 5);
  const v2 = window2(T, s6 + 2.5, s6 + 7.5);
  const v3 = window2(T, s6 + 4.5, s6 + 10);

  // The river.
  const image = fadeIn(T, at(8), 2);
  const kneel = T >= at(9);
  const seasons = window2(T, at(9), at(10) + 1, 1.5);
  const rise = easeInOut(progress(T, at(10), at(10) + 5));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toRiver < 1 && (
        <g opacity={1 - toRiver}>
          <Forest t={T} />
          <Layer depth={0.5}>
            {/* The visions: a column of gathered light, a dark smoke shape, a fierce light. */}
            <g opacity={v1}>
              <rect x={490} y={140} width={20} height={240} fill="#FFF4D6" opacity={0.5} />
              <Glow x={500} y={260} r={130} colour="#F7B733" opacity={0.4} />
            </g>
            <SmokeShape x={800} y={260} t={T} size={0.8} seed={4} colour="#7A6A70" opacity={0.95 * v2} />
            <g opacity={v3}>
              <DivineLight x={1100} y={320} t={T} kind="dark" size={0.45} />
            </g>
          </Layer>
          <Layer depth={0.7}>
            {/* The king, walking alone into the forest. */}
            <Outline x={lerp(1500, 520, walk)} y={820} scale={0.72} head="crown" lean={walk < 1 ? -4 : 0} opacity={fadeIn(T, at(1), 2)} />
            {/* The merchant, under a tree. */}
            <LineTree x={760} y={830} h={380} opacity={0.5} seed={9} colour={r.secondary} />
            <Outline x={700} y={830} scale={0.62} pose="sit" opacity={merchant} />
            {/* The sage Medhas, telling them the stories. */}
            <Outline x={1000} y={830} scale={0.62} pose="sit" head="topknot" arms="bless" opacity={sage} />
          </Layer>
        </g>
      )}
      {toRiver > 0 && (
        <g opacity={toRiver}>
          <Riverbank t={T} />
          <Layer depth={0.5}>
            <DeviOnLotus t={T} show={rise} outline={0.25 * rise} pulse={pulse} />
          </Layer>
          <Layer depth={0.8}>
            <g opacity={image}>
              <EarthenImage x={800} y={820} t={T} scale={0.85} pulse={pulse} />
            </g>
            {/* The king and the merchant: standing, then kneeling in worship. */}
            <Outline x={560} y={850} scale={0.62} head="crown" pose={kneel ? 'kneel' : 'stand'} arms={kneel ? 'anjali' : 'rest'} />
            <Outline x={1040} y={850} scale={0.62} pose={kneel ? 'kneel' : 'stand'} arms={kneel ? 'anjali' : 'rest'} />
            {/* Three years pass: flowers, incense smoke, drops of water. */}
            <g opacity={seasons}>
              <Particles kind="petals" t={T} count={18} colour="#F4B6C2" opacity={0.7} area={{ x: 400, y: 300, w: 800, h: 500 }} />
              {[0, 3, 6, 9].map((d) => (
                <Smoke key={d} x={720} y={800} t={T} start={at(9) + d * 0.6} life={6} colour={r.highlight} opacity={0.35} />
              ))}
              <Particles kind="snow" t={T} count={12} colour="#BFD3E6" opacity={0.5} area={{ x: 850, y: 600, w: 120, h: 200 }} />
            </g>
          </Layer>
        </g>
      )}
    </Stage>
  );
}

// Beat 6: the two kneeling outlines before the Devi's light, held,
// breathing. One small lamp lights for each option chosen.
export function WhatWouldYouAsk({ beat, t, frozen, cues, pulse }: VisualProps) {
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <Riverbank t={t} />
      <Layer depth={0.5}>
        <DeviOnLotus t={t} show={1} outline={0.22} pulse={pulse} />
      </Layer>
      <Layer depth={0.8}>
        <EarthenImage x={800} y={820} t={t} scale={0.85} pulse={pulse} />
        <Outline x={560} y={850} scale={0.62} head="crown" pose="kneel" arms="anjali" />
        <Outline x={1040} y={850} scale={0.62} pose="kneel" arms="anjali" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Diya key={i} x={1250 + i * 70} y={880} t={t + i} scale={0.36} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
        ))}
      </Layer>
    </Stage>
  );
}

// Beat 7: What the Devi gave.
//   Sentence 0   a small gold crown and a palace outline glow above the king
//   Sentences 1–3 inside the merchant's outline, a small flame grows quietly
//   Sentence 4   two threads of her light reach both men at once
//   Sentences 5–6 the palace brightens; far off, a line of faint future
//                figures recedes into time
//   Sentence 7   the merchant's flame steadies and his outline lightens
//   Sentence 8   her light gathers into the lotus and vanishes: an afterglow
//   Sentence 9   only the earthen image and its diya remain (freeze-frame)
export function WhatTheDeviGave({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? L[L.length - 1].end + 5 : t;

  const cam = cameraFor('pullBack', progress(T, 0, at(9) + 4), T);
  const warm = fadeIn(T, at(4), 8);
  const crown = fadeIn(T, at(0) + 1, 2);
  const palaceBright = fadeIn(T, at(5), 2);
  const inner = easeInOut(progress(T, at(1), at(3) + 3));
  const steady = fadeIn(T, at(7), 2);
  const threads = progress(T, at(4), at(4) + 2.5);
  const future = fadeIn(T, at(6), 3);
  const vanish = fadeOut(T, at(8), 2.5);
  const afterglow = window2(T, at(8) + 1, at(9) + 4, 2);
  const people = fadeOut(T, at(9), 2.5);

  // The merchant's outline lightens as his flame steadies.
  const merchantColour = mixColour(GOLD, '#FFF6E8', steady);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Riverbank t={T} warm={warm} />
      <Layer depth={0.3}>
        {/* Far off: a line of future figures, Suratha's descendants as Savarni Manu. */}
        {Array.from({ length: 7 }, (_, i) => (
          <Outline key={i} x={440 - i * 52} y={604 - i * 3} scale={0.22 - i * 0.022} opacity={future * (0.6 - i * 0.07)} colour={r.highlight} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        <DeviOnLotus t={T} show={vanish} outline={0.22} pulse={pulse} />
        <Glow x={800} y={620} r={220} colour="#F4B6C2" opacity={0.35 * afterglow} />
        <LotusSeat x={800} y={650} size={0.85} open={0.3} t={T} opacity={0.7 * afterglow} />
        {/* Two threads of her light, reaching both men at once. */}
        <g opacity={vanish}>
          <LightTrail d="M 800 560 Q 680 600 560 700" amount={threads} colour="#F7B733" width={3} t={T} opacity={0.6} />
          <LightTrail d="M 800 560 Q 920 600 1040 700" amount={threads} colour="#F7B733" width={3} t={T} opacity={0.6} />
        </g>
      </Layer>
      <Layer depth={0.8}>
        <EarthenImage x={800} y={820} t={T} scale={0.85} pulse={pulse} />
        <g opacity={people}>
          {/* The king, his crown and his palace glowing above him. */}
          <Outline x={560} y={850} scale={0.62} head="crown" pose="kneel" arms="anjali" />
          <CrownIcon x={560} y={560} size={1.1} opacity={crown} />
          <Glow x={330} y={440} r={140} colour="#F7B733" opacity={0.25 * crown + 0.35 * palaceBright} />
          <Palace x={330} y={500} scale={0.6} opacity={0.5 * crown + 0.5 * palaceBright} lights={palaceBright} />
          {/* The merchant, with a small flame growing quietly inside him. */}
          <Outline x={1040} y={850} scale={0.62} pose="kneel" arms="anjali" colour={merchantColour} />
          <Flame x={1040} y={788} size={0.6} t={T} height={inner * (0.7 + 0.3 * steady)} core="#FFFFFF" outer="#F7B733" pulse={pulse} />
        </g>
      </Layer>
    </Stage>
  );
}
