// Beats 3–5: Shiva's procession arrives, Parvati is caught between, and
// Mena's anger. All three share one scene: the palace terrace at dusk, with
// the valley path where the procession comes in from the right.
//
// Beat 3: Shiva as he is.
//   Sentences 0–1  the sky dims to smoky violet; the ganas rush in like wind
//                  as flickering shapes of shadow and ember light, drums
//                  glinting (Shiva's friends, never drawn as demons)
//   Sentences 2–3  Shiva arrives as a cool silver light, with small gold
//                  icons of his bull and crescent moon beside it (no skull,
//                  hide or body is drawn)
//   Sentence 4     Narada points (freeze-frame: "That is Shiva")
//   Sentences 5–6  Mena sinks to the ground; her maids gather round
//
// Beat 4 (a choice): that last frame, breathing gently, with Parvati's warm
// flame between her fallen mother and Shiva's silver light.
//
// Beat 5: Mena's anger. (The parent bell rings at the start, and again just
// before sentence 3.)
//   Sentences 0–3  Mena rises, arms raised; a cold gust of grey smoke swirls
//                  from her towards Parvati's flame. The strike is never
//                  drawn: at sentence 3 the gust peaks and the sages step
//                  between, arms sweeping.
//   Sentences 4–6  through it all, Parvati's flame stays perfectly still and
//                  upright (slow motion on sentence 4); the camera pushes in
//   Sentence 7     the gods and sages gather round Mena: small lights and
//                  outlines, and Himavat, the king
//   The end        Mena seated, the smoke thinning

import type { ReactNode } from 'react';
import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline, SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, fadeOut, Layer, mixCam, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, linesOf } from '../day1/common';
import { GanaCrowd, Ground, MenaAndNarada, MountainKingdom, Orb, Palace, SmokeGust } from './kit';

const p = palettes.n3procession;
const SHIVA = { x: 1260, y: 640 };
const PARVATI = { x: 800, y: 790 };

// Shiva as he is: a cool silver light, with his bull and crescent moon as
// small gold outline icons.
function ShivaLight({ t, on, strength = 1, pulse = 0 }: { t: number; on: number; strength?: number; pulse?: number }) {
  if (on <= 0.01) return null;
  return (
    <g opacity={on}>
      <DivineLight x={SHIVA.x} y={SHIVA.y} t={t} kind="silver" size={0.95} strength={strength} pulse={pulse} />
      <SymbolIcon name="moon" x={SHIVA.x} y={SHIVA.y - 120} size={0.8} />
      <SymbolIcon name="bull" x={SHIVA.x + 4} y={SHIVA.y + 120} size={1.3} />
    </g>
  );
}

// The shared scene. Each beat says how far along things are.
function Scene({ t, arrive, rush, shiva, ganaDim = 0, children }: { t: number; arrive: number; rush: number; shiva: number; ganaDim?: number; children?: ReactNode }) {
  return (
    <>
      <MountainKingdom t={t} dusk={1} stars={0.6} />
      <Layer depth={0.45}>
        <Palace x={420} y={650} opacity={0.75} />
      </Layer>
      <Layer depth={0.6}>
        <Ground dusk={1} />
        {/* The ganas rush in along the valley from the right. */}
        <g transform={`translate(${(1 - arrive) * 1000} 0)`}>
          <GanaCrowd t={t} rush={rush} opacity={arrive * (1 - ganaDim * 0.55)} />
        </g>
        <ShivaLight t={t} on={shiva} />
      </Layer>
      {children}
      <Layer depth={0.9}>
        <Particles kind="dust" t={t} count={18} colour={p.secondary} opacity={0.3} speed={2} />
      </Layer>
    </>
  );
}

export function ShivaAsHeIs({ beat, t, duration, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? 1e4 : t;
  const arrive = easeOut(progress(T, at(0), at(1) + 2));
  const rush = progress(T, at(0), at(3));
  const shiva = fadeIn(T, at(3) - 0.5, 2.5);
  const point = T >= at(4) && T < at(5) + 1;
  const faint = easeInOut(progress(T, at(5) + 1, at(5) + 3.5));
  const maids = easeOut(progress(T, at(6), at(6) + 3));

  const low = cameraFor('lowAngle', progress(T, 0, at(4)), T);
  const cam = mixCam(low, cameraFor('pullBack', progress(T, at(5), duration), T), easeInOut(progress(T, at(5), at(5) + 3)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Scene t={t} arrive={arrive} rush={rush} shiva={shiva}>
        <Layer depth={0.75}>
          <MenaAndNarada faint={faint} maids={maids} naradaArms={point ? 'sweep' : 'rest'} menaArms={faint > 0 ? 'rest' : 'heart'} />
        </Layer>
      </Scene>
    </Stage>
  );
}

// Beat 4: What would you do, Parvati?
export function WhatWouldYouDo({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const cam = { x: 0, y: 0, zoom: 1.04 + 0.006 * Math.sin(t / 3), rot: 0 };
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Scene t={t} arrive={1} rush={1} shiva={1} ganaDim={0.6}>
        <Layer depth={0.75}>
          <MenaAndNarada faint={1} maids={1} />
          {/* Parvati's flame, between her mother and Shiva. It grows a
              little steadier once the family reads on. */}
          <DivineLight x={PARVATI.x} y={PARVATI.y} t={t} kind="warm" size={0.7} strength={reveal >= 0 ? 1.1 : 1} pulse={pulse} />
          {/* One small lamp for each option, lit when it is chosen. */}
          {[0, 1, 2, 3].map((i) => (
            <Diya key={i} x={990 + i * 80} y={860} t={t + i} scale={0.38} lit={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 1 : 0} />
          ))}
        </Layer>
      </Scene>
    </Stage>
  );
}

// Beat 5: Mena's anger.
export function MenasAnger({ beat, t, duration, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? 1e4 : t;
  // Mena rises from where she fainted, and later sits again.
  const rise = easeInOut(progress(T, at(0), at(0) + 2.5));
  const sitAgain = easeInOut(progress(T, at(8), at(8) + 3));
  const faint = Math.max(1 - rise, sitAgain);
  const maids = fadeOut(T, at(0), 1.5);
  // The gust of anger builds to sentence 3, then thins and drifts.
  const gust = easeInOut(progress(T, at(0) + 1, at(3) + 1)) * (1 - 0.85 * easeInOut(progress(T, at(4), at(8))));
  // The sages step between them at sentence 3.
  const between = easeOut(progress(T, at(3), at(3) + 2));
  // The gods and sages gather round Mena (sentence 7).
  const gather = fadeIn(T, at(7), 2.5);

  const cam = mixCam(cameraFor('still', 0, T), { x: 60, y: -50, zoom: 1.14, rot: 0 }, easeInOut(progress(T, at(4), duration)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Scene t={t} arrive={1} rush={1} shiva={0.8} ganaDim={0.75}>
        <Layer depth={0.75}>
          <SmokeGust from={{ x: 360, y: 800 }} to={{ x: 760, y: 780 }} t={t} amount={gust} />
          <MenaAndNarada faint={faint} maids={maids} menaArms={rise > 0.5 && sitAgain < 0.5 ? 'raised' : 'rest'} menaLean={8 * rise * (1 - sitAgain)} />
          {/* The sages step between mother and daughter, arms sweeping. */}
          {[0, 1].map((i) => (
            <Outline key={i} x={lerp(520 + i * 40, 600 + i * 70, between)} y={850} scale={0.62} head="topknot" arms="sweep" colour="#E8D9B0" opacity={between * (1 - 0.4 * gather)} />
          ))}
          {/* The gods, the sages, Himavat, Brahma and Vishnu gather round Mena. */}
          <g opacity={gather}>
            <Outline x={190} y={846} scale={0.66} head="crown" arms="heart" colour="#FFE3A3" lean={6} />
            <Orb x={150} y={620} t={t} r={16} glow="#E8C66A" core="#FFFBEA" />
            <Orb x={250} y={590} t={t + 2} r={16} glow="#6F8FE8" core="#E3EBFF" />
            <Orb x={90} y={570} t={t + 4} r={11} glow="#A88AE0" core="#F5F0FF" />
          </g>
          {/* Parvati's flame: still, upright and steady through all of it. */}
          <DivineLight x={PARVATI.x} y={PARVATI.y} t={t} kind="warm" size={0.72} strength={1.05} pulse={pulse * 0.3} />
        </Layer>
      </Scene>
    </Stage>
  );
}
