// Beat 1: Before we begin, with the night's opening invocation (7 seconds).
//   0–1.5 s   black, then a soft temple bell
//   1.5–4 s   Parvati's warm flame (carried over from Nights 1 and 2) burns
//             steadily on a stone ledge below the mountain
//   3.5–7 s   a thin bell-moon crescent fades in high above; the title appears
// Then a slow push-in while "Last night" is read. On the second screen,
// "Tonight's form", the crescent brightens and one slow ring of light spreads
// from it.

import { mapStops } from '../../content/journey';
import { progress } from '../../engine/anim';
import { beatDuration, OPENING_SECONDS } from '../../engine/storyTiming';
import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, H, Layer, Particles, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { KailasaBackdrop } from '../day1/common';
import { BellMoon, SoundRings } from './kit';

const k = palettes.kailasa;
const night3 = mapStops[2];

export function Opening({ beat, t, duration, frozen, complete, pulse }: VisualProps) {
  // The second screen ("Tonight's form") starts once the first one's time is up.
  const formStart = beatDuration(beat);
  const black = complete ? 0 : 1 - fadeIn(t, 0.2, 1.6);
  const flame = complete ? 1 : fadeIn(t, 1.5, 1.5);
  const moon = complete ? 1 : fadeIn(t, 3.5, 3);
  const brighten = complete ? 1 : fadeIn(t, formStart + 0.5, 3);
  const cam = cameraFor('pushIn', complete ? 1 : progress(t, OPENING_SECONDS, Number.isFinite(duration) ? duration : formStart), t);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <KailasaBackdrop t={t} />
      <Layer depth={0.08}>
        {/* The bell-moon, high above; it brightens for "Tonight's form". */}
        <BellMoon x={1060} y={170} size={34 + 6 * brighten} glow={0.3 + 0.6 * brighten} opacity={moon} t={t} />
        {!complete && <SoundRings x={1060} y={170} t={t} start={formStart + 1.5} count={1} life={9} maxR={900} opacity={0.45} />}
      </Layer>
      <Layer depth={1}>
        {/* The stone ledge, and Parvati's flame burning steadily on it. */}
        <path d="M 560 800 Q 800 778 1040 800 L 1060 910 L 540 910 Z" fill="#141A33" />
        <Glow x={800} y={760} r={220} colour={k.accent} opacity={0.25 * flame} />
        <g opacity={flame}>
          <DivineLight x={800} y={790} t={t} kind="warm" size={0.7} pulse={pulse} />
        </g>
        <Particles kind="dust" t={t} count={16} colour={k.highlight} opacity={0.15 * flame} area={{ x: 600, y: 420, w: 400, h: 380 }} />
      </Layer>
      {/* The title. */}
      <g opacity={complete ? 1 : fadeIn(t, 5.5, 1.5)} textAnchor="middle" fill={k.highlight}>
        <text x={W / 2} y={84} fontSize={60} fontFamily="Georgia, serif">
          {night3.devi}
        </text>
        <text x={W / 2} y={128} fontSize={28} fontFamily="Georgia, serif" opacity={0.8}>
          Night {night3.night}: {night3.meaning}
        </text>
      </g>
      <rect width={W} height={H} fill="#000" opacity={black} />
    </Stage>
  );
}
