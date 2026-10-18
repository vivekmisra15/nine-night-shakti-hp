// Beat 5: "Oh, don't".
//   Sentence 0     Himavat's lamplit home: Parvati's flame before two
//                  outlines, Himavat (crowned) and Mena (veiled)
//   Sentences 1–4  Mena reaches towards her daughter, arms raised, pleading
//   Sentence 5     the flame holds steady; Mena's arms lower to bless
//                  (a gentle push-in)
//   Sentences 6–8  the name *Uma*, drawn in fine gold light, then fading
// The two beads already lit stay low in the frame.

import { easeInOut, progress } from '../../engine/anim';
import { DivineLight, Outline } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, fadeOut, Glow, Layer, mixCam, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { BeadRing, NameGlyph } from './kit';

const p = palettes.n2himavatHome;

export function OhDont({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const cam = mixCam(cameraFor('still', 0, t), cameraFor('pushIn', progress(t, at(5), at(6) + 4), t), fadeIn(t, at(5), 2));
  const plead = fadeIn(t, at(1), 2) * (1 - fadeIn(t, at(5) + 2, 2));
  const bless = t > at(5) + 2.5;
  const glyph = easeInOut(progress(t, at(6) + 1, at(7) + 2)) * fadeOut(t, L[8].end - 1, 2);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        {/* The night sky, seen through an arched window. */}
        <Sky top="#0E1430" bottom="#1E2A5A" t={t} stars={30} />
      </Layer>
      <Layer depth={0.1}>
        {/* The wall around the window, so the sky shows only through the arch. */}
        <path d={`M -400 -400 L 2000 -400 L 2000 1300 L -400 1300 Z M 640 520 L 960 520 L 960 260 Q 800 130 640 260 Z`} fill={p.secondary} fillRule="evenodd" />
        <path d="M 640 520 L 640 260 Q 800 130 960 260 L 960 520" fill="none" stroke={p.primary} strokeWidth={10} opacity={0.6} />
        <path d="M 700 520 L 760 420 L 800 450 L 860 380 L 920 520 Z" fill="#2B3A6E" />
        {/* Carved sandstone pillars. */}
        {[220, 1380].map((x) => (
          <g key={x}>
            <rect x={x - 40} y={-100} width={80} height={900} fill={p.primary} opacity={0.35} />
            <rect x={x - 54} y={120} width={108} height={14} fill={p.primary} opacity={0.5} />
          </g>
        ))}
      </Layer>
      <Layer depth={0.4}>
        <rect x={-400} y={720} width={2400} height={400} fill="#2A1A2E" />
        {/* The lamps of the house, warm and low. */}
        <Glow x={420} y={700} r={200} colour={p.accent} opacity={0.35} />
        <Diya x={420} y={720} t={t} scale={0.7} pulse={pulse} />
        <Glow x={1220} y={700} r={200} colour={p.accent} opacity={0.35} />
        <Diya x={1220} y={720} t={t + 2} scale={0.7} pulse={pulse} />
      </Layer>
      <Layer depth={0.7}>
        {/* Himavat, and Mena reaching towards her daughter, then blessing her. */}
        <Outline x={520} y={830} scale={0.82} head="crown" arms="rest" colour="#E8B45A" />
        <Outline x={700} y={830} scale={0.78} head="veiled" arms={bless ? 'bless' : plead > 0.3 ? 'welcome' : 'heart'} lean={8 * plead} colour="#F2B5A7" />
        {/* Parvati: the flame, holding steady. */}
        <DivineLight x={1000} y={810} t={t} kind="warm" size={0.7} strength={1 + 0.15 * fadeIn(t, at(5), 2)} pulse={pulse} />
        <Particles kind="dust" t={t} count={14} colour={p.highlight} opacity={0.25} area={{ x: 300, y: 300, w: 1000, h: 500 }} />
      </Layer>
      <Layer depth={0.75}>
        <NameGlyph text="Uma" x={800} y={420} p={glyph} size={110} />
      </Layer>
      <Layer depth={0.9}>
        <BeadRing lit={2} t={t} y={866} rx={120} ry={20} opacity={0.7} />
      </Layer>
    </Stage>
  );
}
