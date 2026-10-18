// Beat 2: The yogi who would not wake.
//   Sentence 0     the high ridge: Shiva's silver light still at the top, his
//                  attendants (wild-haired outlines) keeping guard
//   Sentences 1–2  Himavat (a crowned outline) climbs, Parvati's flame beside him
//   Sentences 3–4  Shiva refuses: his light dims and draws back
//   Sentences 5–7  Parvati answers: her flame steps forward and brightens
//                  (freeze-frame after sentence 7)
//   Sentence 8     Shiva's light steadies; her flame settles beside it
//   Sentence 9     small offerings (flowers, a water pot) appear and fade, day
//                  after day, while the silver light stays still; the first
//                  bead of the ring lights
// Camera: aerial up the ridge, then still.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, Outline, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Layer, mixCam, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { HighRidge, ledgeY, SHIVA_SEAT } from './common';
import { BeadRing, beadsLit, Icon2 } from './kit';

export function YogiWhoWouldNotWake({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const cam = mixCam(cameraFor('aerial', progress(t, 0, at(3)), t), { x: 0, y: 30, zoom: 1.06, rot: 0 }, fadeIn(t, at(3), 4));

  // Himavat climbs the ledge with Parvati beside him.
  const climb = easeInOut(progress(t, at(1), L[2].end));
  const hx = lerp(-80, 620, climb);
  // Parvati steps forward to answer, then settles beside Shiva.
  const forward = easeInOut(progress(t, at(5), at(6)));
  const settle = easeInOut(progress(t, at(8), at(8) + 4));
  const px = lerp(hx + 90, 880, forward) + 70 * settle;
  // Shiva's light: still, dimming as he refuses, steady again at the end.
  const refuse = fadeIn(t, at(3), 2) * (1 - fadeIn(t, at(8), 3));
  const shivaStrength = 1 - 0.45 * refuse;
  const parvatiStrength = 0.85 + 0.55 * fadeIn(t, at(5), 2) * (1 - fadeIn(t, at(8), 3) * 0.6);

  // The offerings, appearing and fading again and again: day after day.
  const days = t > at(9) ? (t - at(9)) / 3.2 : -1;
  const offering = days < 0 ? 0 : Math.sin(Math.PI * (days % 1)) * fadeIn(t, at(9), 1);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <HighRidge t={t} />
      <Layer depth={0.6}>
        {/* Shiva's attendants keep guard behind him. */}
        {[1290, 1380, 1470].map((x, i) => (
          <Outline key={x} x={x} y={ledgeY(x)} scale={0.42} head="wild" colour="#C9D3E6" opacity={0.5} lean={-4 + i * 2} />
        ))}
        {/* Himavat, king of the mountains. He waits a little back once Parvati speaks. */}
        <Outline x={hx} y={ledgeY(hx)} scale={0.62} head="crown" arms={climb >= 1 ? 'anjali' : 'rest'} colour="#E8B45A" opacity={1 - 0.4 * forward} />
      </Layer>
      <Layer depth={0.65}>
        {/* Shiva: still silver light at the top of the ridge, drawing back as he refuses. */}
        <DivineLight x={SHIVA_SEAT.x + 30 * refuse} y={SHIVA_SEAT.y - 60 - 10 * refuse} t={t} kind="silver" size={0.75} strength={shivaStrength} pulse={pulse} />
        {/* Parvati: the warm flame. */}
        <DivineLight x={px} y={ledgeY(px) - 6} t={t} kind="warm" size={0.55} strength={parvatiStrength} pulse={pulse} />
        {/* The offerings: flowers and a water pot, set down each day. */}
        <Icon2 name="flowers" x={1020} y={ledgeY(1020) - 26} size={1.1} opacity={offering} />
        <SymbolIcon name="waterPot" x={1070} y={ledgeY(1070) - 28} size={1} opacity={offering} />
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={beadsLit(t, 0, [at(9) + 2])} t={t} />
      </Layer>
    </Stage>
  );
}
