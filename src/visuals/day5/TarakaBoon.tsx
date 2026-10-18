// Beat 2: A demon with a clever boon.
//   Sentence 0     a dark smoke shape seated in austerity on a rock, its
//                  ember points glowing (Taraka is smoke, never a body)
//   Sentence 1     Brahma appears above as a soft gold-white light
//   Sentences 2–3  two small gold boon-glyphs drift down into the smoke
//   Sentence 6     freeze-frame: "He was hardly likely to have a son."
//   Sentence 7 on  the smoke spreads across the three tiers of the sky; the
//                  small outline gods (no faces) are pushed out of their places
//   Sentence 8     Indra's elephant, a gold outline icon, is drawn into the smoke
//   Sentences 9–10 the gods' outlines gather before Brahma's light (final frame)
// Camera: a pull-back, then a low angle as the smoke spreads.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline, SmokeShape } from '../figures';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { MiniIcon, p } from './kit';

const c = p.n5tarakaShadow;

// The three worlds, as three faint tiers of sky.
const tiers = [300, 520, 740];
// The gods' places on the top tier, and where they are pushed to.
const gods = [
  { x: 380, out: -140 },
  { x: 560, out: 120 },
  { x: 1040, out: 1480 },
  { x: 1220, out: 1760 },
];

export function TarakaBoon({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const cam = mixCam(cameraFor('pullBack', progress(t, 0, at(7)), t), cameraFor('lowAngle', progress(t, at(7), duration), t), fadeIn(t, at(7) - 1, 3));

  const brahma = fadeIn(t, at(1), 2.5);
  // The two boons: each glides from Brahma's light down into the smoke.
  const boon = (n: number) => easeInOut(progress(t, at(n) + 0.5, at(n) + 5));
  // Taraka's rule spreads.
  const spread = easeInOut(progress(t, at(7), at(8) + 4));
  const pushed = easeInOut(progress(t, at(8), at(8) + 5));
  const elephant = easeInOut(progress(t, at(8) + 2, at(8) + 8));
  const gather = easeInOut(progress(t, at(9), at(9) + 5));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom={c.secondary} t={t} stars={50} starColour="#C9A45C" />
        {/* The three worlds: faint arcs of sky. */}
        {tiers.map((y, i) => (
          <path key={y} d={`M -300 ${y} Q 800 ${y - 60} 1900 ${y}`} stroke={c.highlight} strokeWidth={1.2} fill="none" opacity={0.18 - i * 0.03} />
        ))}
      </Layer>
      <Layer depth={0.2}>
        {/* Brahma: a soft gold-white light above. */}
        <g opacity={brahma}>
          <DivineLight x={800} y={170} t={t} kind="gold" size={0.8} strength={1 + 0.2 * gather} pulse={pulse} />
        </g>
      </Layer>
      <Layer depth={0.35}>
        <Ridge seed={21} baseY={820} height={120} fill="#1C1724" />
        <Haze y={700} colour={c.primary} opacity={0.25} t={t} />
        {/* Smoke spreading over the three tiers. */}
        {spread > 0 &&
          [
            [300, 300], [1300, 290], [200, 520], [1400, 520], [600, 540], [1050, 530], [450, 300], [1150, 300],
          ].map(([x, y], i) => (
            <SmokeShape key={i} x={x} y={y} t={t} seed={i + 3} size={lerp(0.2, 0.9 + (i % 3) * 0.15, spread)} opacity={0.9 * Math.min(1, spread * 1.5) * (1 - 0.3 * gather)} colour="#55505F" ember={c.accent} />
          ))}
        {/* The gods: small outlines on the top tier, pushed out, then gathered before Brahma. */}
        {gods.map((g, i) => {
          const x = lerp(lerp(g.x, g.out, pushed), 680 + i * 80, gather);
          const y = lerp(tiers[0] + 40, 360, gather);
          return <Outline key={i} x={x} y={y} scale={0.3} colour="#E9DDBA" arms={gather > 0.5 ? 'anjali' : 'rest'} lean={pushed * (1 - gather) * (g.out < 800 ? -12 : 12)} opacity={0.85 * (0.55 + 0.45 * fadeIn(t, at(7), 2))} />;
        })}
        {/* Indra's elephant, drawn into the smoke. */}
        <MiniIcon name="elephant" x={lerp(1240, 860, elephant)} y={lerp(260, 640, elephant)} size={1.3} colour={c.highlight} opacity={fadeIn(t, at(8), 1.5) * (1 - 0.6 * elephant)} />
      </Layer>
      <Layer depth={0.6}>
        {/* The rock of austerity, and Taraka seated on it, as smoke. */}
        <path d="M 640 780 Q 800 720 960 780 L 1000 900 L 600 900 Z" fill="#14101A" />
        <Glow x={800} y={660} r={200} colour={c.accent} opacity={0.12 + 0.1 * spread} />
        <SmokeShape x={800} y={680} t={t} seed={2} size={lerp(1.3, 1.7, spread)} colour="#6A6276" ember={c.accent} opacity={1} />
        {/* A ring of faint embers: his years of fierce austerity. */}
        <Particles kind="embers" t={t} count={14} colour={c.accent} opacity={0.5} area={{ x: 640, y: 480, w: 320, h: 260 }} speed={0.4} />
        {/* The two boons: small gold glyphs passing into the smoke. */}
        {[2, 3].map((n) => {
          const u = boon(n);
          if (u <= 0 || u >= 1) return null;
          const x = lerp(800, 800 + (n === 2 ? -30 : 30), u) + Math.sin(u * 6) * 40;
          const y = lerp(220, 660, u);
          return (
            <g key={n} opacity={Math.min(1, (1 - u) * 4)}>
              <Glow x={x} y={y} r={60} colour={c.highlight} opacity={0.8} />
              <path d={`M ${x} ${y - 22} L ${x + 15} ${y} L ${x} ${y + 22} L ${x - 15} ${y} Z`} fill="none" stroke="#FFE7A8" strokeWidth={2.5} />
            </g>
          );
        })}
      </Layer>
    </Stage>
  );
}
