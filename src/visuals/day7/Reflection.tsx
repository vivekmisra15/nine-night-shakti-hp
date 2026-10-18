// Beat 16: Reflection, and the night's closing.
// The talk step: a faint night sky with a small steady flame. The theme
// step: the open hand glows in, behind the theme's words (it brightens when
// the theme is shown, the 'takeaway' cue).
//
// The closing (13 seconds, after Finish): the darkest sky of the series
// lightens to a pale pearl before dawn (a hint of tomorrow's Mahagauri, never
// a full sunrise); the theme's words are shown over it by the closing
// screen; the open hand fades into a single spark that rises out of the
// frame; then the picture fades and the map lights diya 7.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, H, Layer, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, InkNight } from './kit';

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, complete);
  const hand = takeaway < 0 ? 0 : fadeIn(takeaway, 0, 3);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <InkNight t={t} stars={60} />
      <Layer depth={0.4} opacity={hand}>
        <Glow x={800} y={400} r={260} colour="#E8B45A" opacity={0.14} />
        <SymbolIcon name="abhaya" x={800} y={400} size={3.2} colour="#F2DA8F" opacity={0.35} />
      </Layer>
      <Layer depth={0.6}>
        <DivineLight x={800} y={800} t={t} kind="warm" size={0.45} pulse={pulse} />
      </Layer>
    </Stage>
  );
}

// The closing animation, played by itself after Finish (13 seconds; see
// closing in day7.ts). Registered as 'n7-closing'.
export function Closing({ t }: { t: number }) {
  const light = easeInOut(progress(t, 0.5, 7));
  const hand = 1 - fadeIn(t, 5, 2.5);
  const spark = progress(t, 6.5, 11);
  const out = fadeIn(t, 11.5, 1.5);
  const sx = 800 + Math.sin(spark * 6) * 18;
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 7 closing">
      <InkNight t={t} stars={Math.round(60 * (1 - light))} light={light} />
      <Layer depth={0.4}>
        <Glow x={800} y={440} r={260} colour="#F7D27A" opacity={0.25 * Math.max(hand, 1 - spark)} />
        <SymbolIcon name="abhaya" x={800} y={440} size={3.2} colour="#F7D27A" opacity={0.6 * hand} />
        {spark > 0 && spark < 1 && (
          <g>
            <Glow x={sx} y={lerp(440, -40, spark)} r={30} colour="#FFFDF7" opacity={0.9} />
            <circle cx={sx} cy={lerp(440, -40, spark)} r={4} fill="#FFFDF7" />
          </g>
        )}
      </Layer>
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
