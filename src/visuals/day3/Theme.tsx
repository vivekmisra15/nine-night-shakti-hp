// Beat 9: the theme, Readiness ("Strength can protect just by being
// ready"). Shown faintly behind the theme's words: a bell hanging perfectly
// still under the crescent, with one slow ring of light spreading from it
// and fading, again and again, like a warning that never has to strike.

import { GOLD, SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Glow, Layer, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { BellMoon, SoundRings } from './kit';

const r = palettes.reflective;
const RING_EVERY = 12; // seconds between rings

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  const cam = cameraFor('still', 0, t);
  const lastRing = Math.floor(t / RING_EVERY) * RING_EVERY + 1;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom={r.secondary} t={t} stars={70} starColour={r.highlight} />
      </Layer>
      <Layer depth={0.3}>
        <Ridge seed={3} baseY={900} height={110} fill="#1E2546" peak={{ x: 800, h: 200 }} />
      </Layer>
      <Layer depth={0.5}>
        <BellMoon x={800} y={200} size={44} glow={0.5 + pulse * 0.2} t={t} />
        {/* The thread, and the bell hanging perfectly still. */}
        <path d="M 800 250 L 800 400" stroke={GOLD} strokeWidth={1.5} opacity={0.6} />
        <Glow x={800} y={460} r={200} colour={r.accent} opacity={0.25 + pulse * 0.08} />
        <SymbolIcon name="bell" x={800} y={460} size={3} />
        {complete ? (
          <circle cx={800} cy={470} r={340} fill="none" stroke={r.highlight} strokeWidth={2} opacity={0.2} />
        ) : (
          <SoundRings x={800} y={470} t={t} start={lastRing} count={1} life={10} maxR={700} colour={r.highlight} opacity={0.45} />
        )}
        <Particles kind="dust" t={t} count={16} colour={r.highlight} opacity={0.25} area={{ x: 550, y: 200, w: 500, h: 450 }} />
      </Layer>
    </Stage>
  );
}
