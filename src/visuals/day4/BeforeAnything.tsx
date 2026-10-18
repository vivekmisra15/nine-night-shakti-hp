// Beat 2: Before anything at all.
//   Sentence 0   total dark, with the faintest grain of indigo haze
//   Sentence 1   the haze stills; no stars
//   Sentence 2   "Then the Devi smiled": the warm point brightens and blooms
//                into a glow (the smile is the glow blooming, never a drawn
//                mouth); for a moment a very faint outline of head and
//                shoulders shows within it, then softens back into light
//   Sentence 3   rays of light spread outward through the dark, and the glow
//                gathers into the golden cosmic egg (slow motion; freeze)
//   Sentence 4   the egg's light opens: gold motes drift out and become
//                stars, then a faint ridge line and small points of life
//   Sentence 5   the egg-glow rests among the new stars; a nine-petal
//                mandala turns once, faintly
// Camera: still, then a slow push in on the glow, then a pull back to reveal
// the new sky.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Mandala, mixCam, Particles, rand, Ridge, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { CosmicEgg, DarkSky, pd, RadialRays, sc, Stars, WarmPoint } from './kit';

// The dark universe, from nothing to a new sky, as a function of the moments
// below. Shared with Beat 3's backdrop.
export function Beginning({ t, bloom, rays, egg, unfold, settle, outline = 0, pulse = 0 }: { t: number; bloom: number; rays: number; egg: number; unfold: number; settle: number; outline?: number; pulse?: number }) {
  const cx = 800;
  const cy = 430;
  return (
    <>
      <Layer depth={0.03}>
        <DarkSky t={t} warmth={0.35 * rays + 0.25 * unfold} grain={1 - 0.5 * bloom - 0.5 * unfold} />
        {/* Stars born from the egg's light, one by one. */}
        <Stars t={t} count={110} reveal={unfold} opacity={0.95} />
      </Layer>
      <Layer depth={0.12}>
        <RadialRays x={cx} y={cy} t={t} spread={rays} opacity={0.09 * (1 - 0.6 * unfold)} />
        {/* The nine-petal mandala, turning once as the night settles. */}
        <Mandala x={cx} y={cy} r={300} turns={settle * 0.25 + t / 300} colour={pd.highlight} opacity={0.07 * settle} petals={9} />
      </Layer>
      <Layer depth={0.25} opacity={unfold}>
        {/* A faint ridge line, and small points of life along it. */}
        <Ridge seed={31} baseY={860} height={90} fill="#120E1C" />
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={80 + i * 95 + rand(i, 3) * 40} cy={800 + rand(i, 4) * 60} r={2.2} fill={sc.secondary} opacity={(0.4 + 0.4 * Math.sin(t * 1.3 + i)) * progress(unfold, i / 20, i / 20 + 0.3)} />
        ))}
      </Layer>
      <Layer depth={0.3}>
        {/* The warm point: before the smile it is barely there. */}
        <WarmPoint x={cx} y={cy} t={t} size={0.5 + 1.6 * bloom} opacity={(0.25 + 0.75 * bloom) * (1 - egg * 0.7)} pulse={pulse} />
        <Glow x={cx} y={cy} r={260 * bloom} colour={pd.accent} opacity={0.35 * bloom * (1 - egg * 0.4)} />
        {/* The Devi's light-touch outline, for a moment only. */}
        <DeviOutline x={cx} y={cy + 40} size={1.6} opacity={0.28 * outline} colour={pd.highlight} />
        {/* The cosmic egg, gathered from the glow; it opens as the universe unfolds. */}
        <CosmicEgg x={cx} y={cy} size={lerp(0.6, 1, egg)} bright={egg} open={unfold * 0.6} t={t} />
        {/* Gold motes drifting out of the egg. */}
        {unfold > 0 && unfold < 1 && (
          <Particles kind="dust" t={t} count={40} colour={pd.highlight} opacity={0.8 * Math.sin(unfold * Math.PI)} area={{ x: cx - 500, y: cy - 400, w: 1000, h: 700 }} speed={3} />
        )}
      </Layer>
    </>
  );
}

export function BeforeAnything({ beat, t, frozen, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;

  const bloom = easeInOut(progress(t, at(2), at(2) + 3));
  const outline = window2(t, at(2) + 1.2, at(2) + 5, 1.2);
  const rays = easeInOut(progress(t, at(3), at(3) + 6));
  const egg = easeInOut(progress(t, at(3) + 2, at(3) + 7));
  const unfold = easeInOut(progress(t, at(4), at(5)));
  const settle = fadeIn(t, at(5), 3);

  // Still for sentences 0–1, a slow push in on the glow, then a pull back.
  let cam = cameraFor('still', 0, t);
  cam = mixCam(cam, cameraFor('pushIn', progress(t, at(2), at(4)), t), fadeIn(t, at(2), 2));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.0, rot: 0 }, easeInOut(progress(t, at(4), at(5) + 2)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Beginning t={t} bloom={bloom} rays={rays} egg={egg} unfold={unfold} settle={settle} outline={outline} pulse={pulse} />
    </Stage>
  );
}
