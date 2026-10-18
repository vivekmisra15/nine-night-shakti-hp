// Beat 4: Born of light. The night's signature: many small lights becoming one.
//   Sentence 0     Shiva's silver light and Vishnu's blue light flare
//   Sentence 1     light pours from them and from Brahma's rose-gold light
//   Sentence 2     every god's coloured light streams inward from all sides
//                  (slow motion)
//   Sentence 3     they merge into a towering blaze, a mountain of fire; the
//                  camera cranes up
//   Sentences 4–5  the blaze softens into warm gold; a faint head-and-shoulders
//                  outline shows within it, then her light floods the frame
//                  (freeze-frame)
//   Sentences 6–8  threads of colour (silver, violet, blue, ember) settle into
//                  her light: her face, hair, arms and eyes
//   Sentence 9     all the gods' lights brighten with joy
//   Sentences 11–24  each gift flies from its god's light as a small gold
//                  outline icon and takes its place in a ring around her
//   Sentences 25–27  a larger trident and discus show by Shiva and Vishnu:
//                  the gifts were drawn out of them, and theirs stay
// Final frame: her light ringed by the gifts.

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Flame, Glow, Layer, LightTrail, mixCam, Particles, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { god, GODS, GiftIcon, type GiftName, GodOrb, NightRidge } from './kit';

const g = palettes.n6gatheredLight;
export const CENTRE = { x: 800, y: 430 }; // the heart of her light

// The gifts in the order the text gives them, each with its giver and the
// sentence it arrives on (a second gift from the same god follows 2 s later).
export const GIFTS: { name: GiftName; from: string; line: number; later?: boolean }[] = [
  { name: 'trident', from: 'shiva', line: 11 },
  { name: 'discus', from: 'vishnu', line: 12 },
  { name: 'conch', from: 'varuna', line: 13 },
  { name: 'noose', from: 'varuna', line: 13, later: true },
  { name: 'spear', from: 'agni', line: 14 },
  { name: 'bow', from: 'vayu', line: 15 },
  { name: 'thunderbolt', from: 'indra', line: 16 },
  { name: 'bell', from: 'indra', line: 16, later: true },
  { name: 'staff', from: 'yama', line: 17 },
  { name: 'rosary', from: 'brahma', line: 18 },
  { name: 'waterPot', from: 'brahma', line: 18, later: true },
  { name: 'sword', from: 'kala', line: 19 },
  { name: 'shield', from: 'kala', line: 19, later: true },
  { name: 'lotus', from: 'ocean', line: 20 },
  { name: 'axe', from: 'vishvakarma', line: 21 },
  { name: 'lion', from: 'himavat', line: 22 },
  { name: 'cup', from: 'kubera', line: 23 },
  { name: 'serpent', from: 'shesha', line: 24 },
];

// The gift's place in the ring around her light (starting at the top).
export const ringPlace = (i: number) => {
  const a = -Math.PI / 2 + (i / GIFTS.length) * Math.PI * 2;
  return { x: CENTRE.x + Math.cos(a) * 340, y: CENTRE.y - 20 + Math.sin(a) * 255 };
};

// The ring of gifts, `arrived(i)` 0–1 for how far each has flown in. Used
// again by the battle and by the theme picture.
export function GiftRing({ t, arrived, from = (i: number) => god(GIFTS[i].from), size = 0.85, opacity = 1 }: { t: number; arrived: (i: number) => number; from?: (i: number) => { x: number; y: number }; size?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {GIFTS.map((gift, i) => {
        const a = arrived(i);
        if (a <= 0) return null;
        const start = from(i);
        const end = ringPlace(i);
        const f = easeOut(a);
        // An arc: the gift rises a little as it flies.
        const x = lerp(start.x, end.x, f);
        const y = lerp(start.y, end.y, f) - Math.sin(f * Math.PI) * 80;
        const float = Math.sin(t * 0.8 + i) * 4 * f;
        return (
          <g key={gift.name}>
            <Glow x={x} y={y + float} r={a < 1 ? 60 : 44} colour={g.accent} opacity={a < 1 ? 0.5 : 0.22} />
            <GiftIcon name={gift.name} x={x} y={y + float} size={size} colour="#F7D27A" opacity={Math.min(1, a * 3)} />
          </g>
        );
      })}
    </g>
  );
}

// A gentle curve from a god's light into the centre.
const streamPath = (x: number, y: number, bend: number) => {
  const mx = (x + CENTRE.x) / 2 + (CENTRE.y - y) * 0.3 * bend;
  const my = (y + CENTRE.y) / 2 - (CENTRE.x - x) * 0.3 * bend;
  return `M ${x} ${y} Q ${mx} ${my} ${CENTRE.x} ${CENTRE.y + 60}`;
};

export function BornOfLight({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 10000 : t; // Reading mode: the finished picture

  // Camera: push in, crane up as the lights merge, then settle wide for the gifts.
  let cam = cameraFor('pushIn', progress(T, 0, at(3)), T);
  cam = mixCam(cam, cameraFor('crane', progress(T, at(3), at(6)), T), fadeIn(T, at(3), 2));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.02, rot: 0 }, fadeIn(T, at(10), 4));

  const flare = fadeIn(T, at(0), 2) * (1 - 0.6 * fadeIn(T, at(3), 3)); // Shiva and Vishnu
  const pour = progress(T, at(1), at(1) + 6);
  const blaze = fadeIn(T, at(3) - 1, 3) * (1 - fadeIn(T, at(4), 4));
  const devi = fadeIn(T, at(4), 3);
  const outline = window2(T, at(4) + 2, at(6) + 2, 2.5);
  const flood = window2(T, at(5), at(5) + 9, 2.5);
  const joy = fadeIn(T, at(9), 2);
  // The gods dim after the merge, and brighten again with joy.
  const godStrength = lerp(lerp(0.75, 0.45, fadeIn(T, at(3), 3)), 1.1, joy);
  const drawnOut = fadeIn(T, at(25), 3);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <NightRidge t={T} dim={0.8} />

      <Layer depth={0.35}>
        {/* The gods: each a light in his own colour. */}
        {GODS.map((gd) => {
          const flaring = gd.id === 'shiva' || gd.id === 'vishnu';
          const s = godStrength + (flaring ? flare * 0.9 : 0) + (gd.id === 'brahma' ? 0.5 * Math.sin(Math.PI * pour) : 0);
          return <GodOrb key={gd.id} x={gd.x} y={gd.y} t={T} colour={gd.colour} size={gd.size} strength={s * fadeIn(T, 0, 1.5)} />;
        })}

        {/* Sentence 1: light pours from Shiva, Vishnu and Brahma. */}
        {['shiva', 'vishnu', 'brahma'].map((id, i) => {
          const gd = god(id);
          return <LightTrail key={id} d={streamPath(gd.x, gd.y, i === 1 ? -1 : 1)} amount={pour * (1 - fadeIn(T, at(2) + 6, 3))} colour={gd.colour} t={T + i} width={7} opacity={0.6} />;
        })}

        {/* Sentence 2: every god's light streams inward from all sides. */}
        {GODS.map((gd, i) => {
          const amount = progress(T, at(2) + i * 0.35, at(2) + i * 0.35 + 5) * (1 - fadeIn(T, at(3), 2.5));
          return <LightTrail key={gd.id} d={streamPath(gd.x, gd.y, i % 2 ? 1 : -1)} amount={amount} colour={gd.colour} t={T + i} width={4} opacity={0.65} />;
        })}

        {/* Sentences 6–8: threads of colour settle into her light. */}
        {[
          { id: 'shiva', line: 7, d: 0 },
          { id: 'yama', line: 7, d: 1.5 },
          { id: 'vishnu', line: 7, d: 3 },
          { id: 'agni', line: 8, d: 0 },
        ].map(({ id, line, d }) => {
          const gd = god(id);
          const amount = progress(T, at(line) + d, at(line) + d + 3) * (1 - fadeIn(T, at(line) + d + 4, 2));
          return <LightTrail key={id} d={streamPath(gd.x, gd.y, 0.5)} amount={amount} colour={gd.colour} t={T} width={3} opacity={0.8} />;
        })}
      </Layer>

      <Layer depth={0.5}>
        {/* Sentence 3: the mountain of fire. */}
        {blaze > 0 && (
          <g opacity={blaze}>
            <Glow x={CENTRE.x} y={CENTRE.y} r={520} colour="#F28A2E" opacity={0.55} />
            {/* The glowing outline of a mountain, filled with fire. */}
            <path d={`M ${CENTRE.x - 420} ${CENTRE.y + 320} Q ${CENTRE.x - 150} ${CENTRE.y - 40} ${CENTRE.x} ${CENTRE.y - 200 * blaze} Q ${CENTRE.x + 150} ${CENTRE.y - 40} ${CENTRE.x + 420} ${CENTRE.y + 320} Z`} fill="#F4A93A" opacity={0.28} />
            {/* Tongues of flame along a mountain's outline, tallest at the centre. */}
            {[-300, -200, -110, 0, 110, 210, 300].map((dx, i) => {
              const tall = 1 - Math.abs(dx) / 380;
              return (
                <Flame key={dx} x={CENTRE.x + dx} y={CENTRE.y + 300 - tall * 60} size={1.2 + tall * 3.6} t={T + i} height={easeInOut(blaze)} core={i === 3 ? '#FFF4D6' : '#FFE3B0'} outer={i % 2 ? '#F08A4B' : '#F4A93A'} pulse={pulse} />
              );
            })}
            <Particles kind="embers" t={T} count={40} colour="#FFD27A" opacity={0.8} area={{ x: 500, y: 100, w: 600, h: 600 }} />
          </g>
        )}
        {/* Sentences 4 onwards: the Devi, as warm saffron-gold light. */}
        {devi > 0 && (
          <g opacity={devi}>
            <Glow x={CENTRE.x} y={CENTRE.y} r={420} colour={g.primary} opacity={0.35 + pulse * 0.05} />
            <DivineLight x={CENTRE.x} y={CENTRE.y + 110} t={T} kind="warm" size={2.1} strength={1 + 0.25 * joy} pulse={pulse} />
            <DeviOutline x={CENTRE.x} y={CENTRE.y + 10} size={1.7} opacity={0.38 * outline} />
          </g>
        )}
      </Layer>

      <Layer depth={0.6}>
        {/* Sentences 11–24: the gifts arrive, one per sentence. */}
        <GiftRing t={T} arrived={(i) => progress(T, at(GIFTS[i].line) + 0.6 + (GIFTS[i].later ? 2.2 : 0), at(GIFTS[i].line) + 3.2 + (GIFTS[i].later ? 2.2 : 0))} />
        {/* Sentences 25–27: Shiva and Vishnu keep their own trident and discus. */}
        {drawnOut > 0 && (
          <>
            <GiftIcon name="trident" x={god('shiva').x} y={god('shiva').y - 120} size={1.6} colour="#DCE6FF" opacity={0.75 * drawnOut} />
            <GiftIcon name="discus" x={god('vishnu').x} y={god('vishnu').y - 120} size={1.5} colour="#93AEF5" opacity={0.75 * drawnOut} />
            {/* A small copy separates from each, like a flame lit from a flame. */}
            {[
              { from: { x: god('shiva').x, y: god('shiva').y - 120 }, to: ringPlace(0), name: 'trident' as const },
              { from: { x: god('vishnu').x, y: god('vishnu').y - 120 }, to: ringPlace(1), name: 'discus' as const },
            ].map(({ from, to, name }) => {
              const p = easeInOut(progress(T, at(26), at(26) + 4));
              const ghost = window2(T, at(26), at(26) + 5, 1);
              return <GiftIcon key={name} name={name} x={lerp(from.x, to.x, p)} y={lerp(from.y, to.y, p)} size={0.85} colour="#FFF4D6" opacity={0.8 * ghost} />;
            })}
          </>
        )}
      </Layer>

      {/* Sentence 5: her brilliance floods the frame. */}
      {flood > 0 && (
        <g style={{ mixBlendMode: 'screen' }}>
          <Glow x={CENTRE.x} y={CENTRE.y} r={1100} colour={g.highlight} opacity={0.75 * flood} />
        </g>
      )}
    </Stage>
  );
}
