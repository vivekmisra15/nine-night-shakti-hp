// Beat 10: the theme, Resolve ("What you practise, day after day, changes
// who you are"). Shown faintly behind the theme's words.
// One small flame, and around it a ring of beads lighting one by one, very
// slowly: practice, day after day.

import { palettes } from '../palettes';
import { cameraFor, Glow, Layer, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { DivineLight } from '../figures';
import { BEADS, BeadRing, Stars } from './kit';

const r = palettes.reflective;

export function Theme({ beat, t, frozen, complete, pulse }: VisualProps) {
  // One bead every 4 seconds, then the ring stays complete.
  const lit = complete ? BEADS : Math.min(BEADS, Math.max(0, (t - 2) / 4));
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={r.shadow} bottom={r.secondary} t={t} />
        <Stars t={t} count={60} colour={r.highlight} />
      </Layer>
      <Layer depth={0.5}>
        <Glow x={800} y={470} r={300} colour={r.accent} opacity={0.18 + pulse * 0.08} />
        {/* The ring, seen almost face on, around the flame. */}
        <BeadRing lit={lit} t={t} x={800} y={460} rx={210} ry={150} />
        <DivineLight x={800} y={500} t={t * 0.5} kind="warm" size={0.6} pulse={pulse} />
        <Particles kind="dust" t={t} count={16} colour={r.highlight} opacity={0.3} area={{ x: 550, y: 250, w: 500, h: 400 }} />
      </Layer>
    </Stage>
  );
}
