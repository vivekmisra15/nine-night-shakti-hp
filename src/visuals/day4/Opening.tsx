// Beat 1: Before we begin, with the night's opening invocation (7 seconds).
//   0–1.5 s   from black: a quiet night sky over a low ridge (reflective)
//   1–5.5 s   a small gold bell glows and fades: last night, Chandraghanta
//   5.5–7 s   the title fades in
//   then      the sky darkens step by step and the stars go out one by one,
//             until only one faint warm point of light is left at the centre:
//             tonight the story steps back before anything at all
// The camera pulls back slowly the whole time.

import { mapStops } from '../../content/journey';
import { progress } from '../../engine/anim';
import { SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, H, Layer, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';
import { DarkSky, LowRidges, mixColour, pd, Stars, WarmPoint } from './kit';

const r = palettes.reflective;
const night4 = mapStops[3];

export function Opening({ beat, t, duration, frozen, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', progress(t, 0, duration), t);
  const black = 1 - fadeIn(t, 0.2, 1.6);
  // Last night's bell, glowing briefly, then gone.
  const bell = window2(t, 1, 5.5, 1.4);
  // The dark arrives step by step: the sky, then the stars, then the land.
  const dark = progress(t, 8, 20);
  const starsLeft = 1 - progress(t, 9, 22);
  const point = fadeIn(t, 20, 3);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        {/* The reflective night sky, deepening into the primordial dark. */}
        <DarkSky t={t} />
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={mixColour(r.secondary, pd.shadow, dark)} opacity={1 - dark * 0.6} />
        <Stars t={t} count={80} reveal={starsLeft} opacity={0.9} colour={r.highlight} />
      </Layer>
      <Layer depth={0.3} opacity={1 - dark * 0.85}>
        <LowRidges fill="#0B0F22" far="#1A2140" />
      </Layer>
      <Layer depth={0.4}>
        {/* Last night's form, remembered as a small gold bell. */}
        <g opacity={bell}>
          <Glow x={800} y={380} r={160} colour="#F5A623" opacity={0.35} />
          <SymbolIcon name="bell" x={800} y={380} size={1.6} colour="#E8B45A" />
        </g>
        {/* What is left in the dark: one faint warm point at the centre. */}
        <WarmPoint x={800} y={450} t={t} size={0.8} opacity={point * 0.85} pulse={pulse} />
      </Layer>
      {/* The title. */}
      <g opacity={fadeIn(t, 5.5, 1.5)} textAnchor="middle" fill={pd.highlight}>
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night4.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night4.night}: {night4.meaning}
        </text>
      </g>
      <rect width={W} height={H} fill="#000" opacity={black} />
    </Stage>
  );
}
