// Beat 6: The battle. Her gold light against a deep smoke-violet shadow; no
// figure is ever wounded, and there is no blood: the battle is light pushing
// smoke back, and the end is a shadow breaking apart into dawn.
//   Sentence 0     waves of smoke with ember points roll towards her light
//   Sentence 1     sparks breathe out from her light and become a host of
//                  small lights
//   Sentence 2     the lion's gold outline runs through the smoke, which parts
//   Sentence 3     two large smoke shapes (the generals) dissolve
//   Sentences 4–5  a vast buffalo shadow rises; the ground line shakes
//   Sentence 6     a gold noose loops around it
//   Sentences 7–8  the shadow changes shape: lion, man with a sword, elephant,
//                  buffalo again, her light meeting each (slow motion, then a
//                  freeze-frame)
//   Sentences 9–11 a small gold cup brightens; her light ripples with laughter
//   Sentence 12    her light rises above the shadow; the trident flashes once
//   Sentences 13–14 the shadow breaks apart into drifting smoke, then into
//                  dawn light; the camera pulls back (freeze-frame)
//   Sentences 15–16 the last smoke flees; the gods' lights gather and
//                  brighten; sages and musicians raise their hands
//   Sentences 17–18 her light fades gently away. Final frame: an empty gold dawn.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline, SmokeShape } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, fadeOut, Glow, Haze, Layer, LightTrail, mixCam, Particles, rand, Ridge, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { GiftIcon, GodOrb, GODS, GoldDawn, RunningLion, ShadowBeast, type BeastShape } from './kit';

const b = palettes.n6battleShadow;
const d = palettes.n6lionDawn;

// The beast's shape during sentence 7: buffalo → lion → man → elephant → buffalo.
function beastShapes(t: number, start: number): Partial<Record<BeastShape, number>> {
  const order: BeastShape[] = ['buffalo', 'lion', 'man', 'elephant', 'buffalo'];
  const shapes: Partial<Record<BeastShape, number>> = {};
  const step = 2.6; // seconds per shape
  order.forEach((shape, i) => {
    const from = start + i * step;
    const on = i === 0 ? 1 : fadeIn(t, from, 1);
    const off = i === order.length - 1 ? 1 : fadeOut(t, from + step, 1);
    shapes[shape] = Math.max(shapes[shape] ?? 0, Math.min(on, off));
  });
  return shapes;
}

export function TheBattle({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 10000 : t;

  const dawn = fadeIn(T, at(14), 6);
  let cam = cameraFor('lowAngle', progress(T, 0, at(14)), T);
  cam = mixCam(cam, cameraFor('pullBack', progress(T, at(14), at(17)), T), fadeIn(T, at(14), 3));

  // Her light: low on the right, rising above the shadow at sentence 12,
  // and fading away as she vanishes (sentence 18).
  const rise = easeInOut(progress(T, at(12), at(12) + 4));
  const settle = easeInOut(progress(T, at(15), at(16)));
  const deviX = lerp(lerp(1180, 820, rise), 800, settle);
  const deviY = lerp(lerp(640, 380, rise), 470, settle);
  const vanish = fadeOut(T, at(18), 4);
  // Her light flares each time she meets a new shape, and ripples with laughter.
  const meet = [0, 1, 2, 3, 4].reduce((m, i) => Math.max(m, window2(T, at(7) + i * 2.6, at(7) + i * 2.6 + 1.6, 0.5)), 0);
  const laugh = [9, 10].reduce((m, n) => Math.max(m, window2(T, at(n), at(n) + 3, 1)), 0);
  const strength = (1.1 + 0.5 * meet + 0.3 * window2(T, at(12), at(14), 1.5)) * vanish;

  // The shadow beast.
  const beastOn = fadeIn(T, at(4), 4);
  const beastScale = lerp(0.6, 1.05, easeInOut(progress(T, at(4), at(5) + 3)));
  const shapes = T < at(7) ? { buffalo: 1 } : beastShapes(T, at(7));
  const breakApart = easeInOut(progress(T, at(13), at(14) + 4));
  const shake = T > at(5) && T < at(6) + 1 ? Math.sin(T * 40) * 4 : 0;

  // The waves of smoke and the generals (sentences 0–3).
  const waves = fadeIn(T, 0.5, 2) * fadeOut(T, at(3) + 2, 3);
  const generals = easeInOut(progress(T, at(3), at(3) + 4));
  const lionRun = progress(T, at(2), at(3) + 1.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={b.secondary} bottom={b.primary} t={T} stars={30} starColour="#E8DDF0" />
      </Layer>
      {/* The dawn, rising as the shadow breaks apart. */}
      {dawn > 0 && <GoldDawn t={T} amount={dawn} />}

      <g transform={`translate(${shake} 0)`}>
        <Layer depth={0.2} opacity={1 - dawn}>
          <Ridge seed={61} baseY={640} height={150} fill="#251B33" />
        </Layer>

        <Layer depth={0.4}>
          {/* Sentences 15–16: the gods' lights gather and brighten in the dawn sky. */}
          {GODS.slice(0, 8).map((g, i) => {
            const on = fadeIn(T, at(15) + i * 0.4, 2.5) * fadeOut(T, at(18) + 1, 4);
            const a = Math.PI * (1.15 + (0.7 * i) / 7);
            return <GodOrb key={g.id} x={800 + Math.cos(a) * 560} y={520 + Math.sin(a) * 330} t={T} colour={g.colour} size={0.4} strength={on * (1 + 0.3 * fadeIn(T, at(16), 2))} />;
          })}

          {/* Mahishasura: a vast shadow, breaking into drifting smoke at the end. */}
          <ShadowBeast x={560} y={820} t={T} scale={beastScale} shapes={shapes} breakApart={breakApart} opacity={beastOn} />

          {/* Sentence 6: the gold noose loops around the shadow. */}
          <LightTrail
            d="M 560 470 C 900 470 900 760 560 760 C 220 760 220 470 560 470"
            amount={progress(T, at(6), at(6) + 3)}
            colour={b.accent}
            t={T}
            width={4}
            opacity={0.8 * fadeOut(T, at(8) + 1, 3)}
          />
        </Layer>

        <Layer depth={0.55}>
          {/* Sentence 0: waves of smoke rolling towards her light. */}
          {waves > 0 &&
            Array.from({ length: 10 }, (_, i) => {
              const row = i % 2;
              const x = lerp(60, 760, easeInOut(progress(T, 0.5 + i * 0.6, at(2) + i * 0.3))) - row * 120;
              // The lion's run parts the smoke: shapes near it lift away.
              const lionX = lerp(1150, -300, lionRun);
              const part = Math.max(0, 1 - Math.abs(x - lionX) / 220) * (lionRun > 0 && lionRun < 1 ? 1 : 0);
              return (
                <SmokeShape key={i} x={x} y={700 - row * 70 - part * 120 * (i % 2 ? 1 : -0.5)} t={T} size={0.55} seed={i + 1} opacity={0.8 * waves} colour="#0C0914" />
              );
            })}
          {/* Sentence 3: two generals, as larger smoke shapes, dissolve. */}
          {T > at(0) + 2 && (
            <>
              <SmokeShape x={480} y={560} t={T} size={1.1} seed={8} dissolve={generals} opacity={0.85 * fadeIn(T, at(0) + 2, 3)} colour="#0C0914" />
              <SmokeShape x={760} y={600} t={T} size={1} seed={9} dissolve={generals} opacity={0.85 * fadeIn(T, at(0) + 3, 3)} colour="#0C0914" />
            </>
          )}
          {/* Sentence 2: the lion runs through the smoke. */}
          <RunningLion x={lerp(1150, -300, lionRun)} y={780} t={T} scale={1.1} opacity={window2(T, at(2), at(3) + 1.5, 0.8)} colour="#F7D27A" />

          {/* Sentence 15: the last smoke flees off the frame. */}
          {[0, 1, 2].map((i) => {
            const flee = easeInOut(progress(T, at(15), at(15) + 5));
            return flee > 0 && flee < 1 ? <SmokeShape key={i} x={lerp(420 - i * 120, -400, flee)} y={700 + i * 40} t={T} size={0.5} seed={i + 12} opacity={0.6 * (1 - flee)} colour="#3A2E48" /> : null;
          })}
        </Layer>

        <Layer depth={0.65}>
          {/* Her light, with the cup (sentence 9) and the trident (sentence 12). */}
          <Glow x={deviX} y={deviY - 80} r={360 + 80 * meet} colour={b.accent} opacity={0.4 * vanish + pulse * 0.05} />
          {laugh > 0 &&
            [0, 1].map((k) => {
              const age = ((T - at(9)) * 0.6 + k * 0.5) % 1;
              return <circle key={k} cx={deviX} cy={deviY - 90} r={80 + age * 220} fill="none" stroke="#FFD27A" strokeWidth={2} opacity={0.5 * (1 - age) * laugh} />;
            })}
          <DivineLight x={deviX} y={deviY} t={T} kind="warm" size={1.5} strength={strength} pulse={pulse} />
          <GiftIcon name="cup" x={deviX + 150} y={deviY - 40} size={0.9} colour="#F7D27A" opacity={window2(T, at(9), at(11) + 3, 1.2)} />
          {/* The trident flashes once. */}
          {window2(T, at(12) + 1.5, at(12) + 4.5, 0.6) > 0 && (
            <>
              <Glow x={deviX} y={deviY - 230} r={160} colour="#FFF4D6" opacity={0.6 * window2(T, at(12) + 1.5, at(12) + 4.5, 0.6)} />
              <GiftIcon name="trident" x={deviX} y={deviY - 230} size={2} colour="#FFF4D6" opacity={window2(T, at(12) + 1.5, at(12) + 4.5, 0.6)} />
            </>
          )}
          {/* Sentence 1: her breaths become a host of small lights. */}
          {Array.from({ length: 22 }, (_, i) => {
            const p = easeInOut(progress(T, at(1) + i * 0.12, at(1) + 3 + i * 0.12));
            if (p <= 0) return null;
            // Scattered loosely in front of her, each drifting a little.
            const tx = 840 + rand(i, 71) * 300 + Math.sin(T * 0.7 + i) * 8;
            const ty = 660 + rand(i, 72) * 150 + Math.cos(T * 0.6 + i) * 6;
            const x = lerp(1180, tx, p);
            const y = lerp(560, ty, p) - Math.sin(p * Math.PI) * 60;
            const on = fadeOut(T, at(13), 4);
            return (
              <g key={i} opacity={on}>
                <Glow x={x} y={y} r={18} colour="#FFD27A" opacity={0.7} />
                <circle cx={x} cy={y} r={2.6} fill="#FFF4D6" />
              </g>
            );
          })}
        </Layer>

        <Layer depth={0.8}>
          <path d="M -400 860 Q 800 820 2000 860 L 2000 1300 L -400 1300 Z" fill="#120D1C" />
          <path d="M -400 860 Q 800 820 2000 860 L 2000 1300 L -400 1300 Z" fill="#6E5A78" opacity={dawn} />
          {/* Sentence 16: sages and musicians raise their hands. */}
          <g opacity={fadeIn(T, at(16), 3)}>
            {[180, 300, 1300, 1420].map((x, i) => (
              <Outline key={x} x={x} y={880} scale={0.42} arms={i % 2 ? 'raised' : 'welcome'} head={i < 2 ? 'topknot' : 'plain'} colour="#FFF4D6" opacity={0.85} />
            ))}
          </g>
        </Layer>
      </g>

      <Layer depth={0.9}>
        <Particles kind="embers" t={T} count={20} colour={b.highlight} opacity={0.5 * (1 - dawn)} />
        {dawn > 0 && <Haze y={700} colour={d.highlight} opacity={0.2 * dawn} t={T} />}
        {dawn > 0 && <Particles kind="dust" t={T} count={24} colour={d.highlight} opacity={0.5 * dawn} />}
      </Layer>
    </Stage>
  );
}
