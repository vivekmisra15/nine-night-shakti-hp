// Beats 14–16 and the closing: the night's quiet ending, over the mountain
// at night with the bell-moon.
//
// Beat 14 (Side by side) and Beat 15 (Today): full-width text over a faint
// night sky with the bell-moon; it brightens a little with each question.
// Beat 16 (Reflection): the crescent rests above a single diya on its stone
// ledge, while the camera slowly pulls back.
//
// The closing (about 13 seconds, after Finish): the bell-moon rests above the
// mountain at night; the theme's word and idea are shown over it (by the
// closing screen); one soft bell, and its rings spread once and fade; then
// the picture fades and the map appears with diya 3 lit.

import { progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { latestCue } from '../day1/common';
import { MoonNight, SoundRings } from './kit';

const k = palettes.kailasa;

// The stone ledge with its single diya, as on Night 1.
function Ledge({ t, lit = 1, pulse = 0 }: { t: number; lit?: number; pulse?: number }) {
  return (
    <Layer depth={1}>
      <path d="M 560 800 Q 800 778 1040 800 L 1060 910 L 540 910 Z" fill="#141A33" />
      <Glow x={800} y={790} r={170} colour={k.accent} opacity={0.25 * lit} />
      <Diya x={800} y={790} t={t} scale={1.1} lit={lit} pulse={pulse} />
    </Layer>
  );
}

export function SideBySide({ beat, t, frozen, complete, cues }: VisualProps) {
  const asked = latestCue(cues, 'question:', complete, 4) + 1;
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <MoonNight t={t} moonGlow={0.3 + (0.5 * asked) / 4} />
    </Stage>
  );
}

export function Today({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <MoonNight t={t} moonGlow={0.4} moonX={1180} moonY={180} />
      <Layer depth={0.9}>
        <Particles kind="fireflies" t={t} count={14} colour={k.highlight} opacity={0.4} area={{ x: 200, y: 500, w: 1200, h: 300 }} />
      </Layer>
    </Stage>
  );
}

export function Reflection({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <MoonNight t={t} moonGlow={0.5 + pulse * 0.2} moonY={160} />
      <Ledge t={t} pulse={pulse} />
    </Stage>
  );
}

// The closing animation, played by itself after Finish (13 seconds; see
// closing in day3.ts). Registered as 'n3-closing'. The bell sounds at about
// 4.2 seconds, so its rings start then.
export function Closing({ t }: { t: number }) {
  const out = fadeIn(t, 11.5, 1.5);
  const ember = 1 - 0.6 * fadeIn(t, 8, 3);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 3 closing">
      <MoonNight t={t} moonGlow={0.4 + 0.5 * fadeIn(t, 4, 1) * (1 - fadeIn(t, 8, 3))} moonY={160} />
      <Layer depth={0.05}>
        <SoundRings x={800} y={160} t={t} start={4.2} count={2} interval={1.6} life={6} maxR={900} opacity={0.5} />
      </Layer>
      <Ledge t={t} lit={ember} />
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
