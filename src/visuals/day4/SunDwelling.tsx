// Beat 4: The one who lives in the sun.
//   Sentence 0   the sun rises in the centre of the new sky with a slow
//                corona; the warm point of light sits at its heart
//   Sentence 1   the heat shimmers outward and the corona deepens; the point
//                stays calm (she alone can bear it)
//   Sentence 2   ten long rays reach out to the ten directions and light the
//                ridge below
//   Sentence 3   eight finer rays open from her glow like a wheel (her arms
//                as light, never a body), each tipped with a small gold
//                symbol; a gold outline lion settles beneath (freeze)
//   Sentence 4   the light softens; lotuses and devotees' lamps appear on
//                the land below
//   Symbols step the icons pulse gently as tappable hotspots
// Camera: low angle, then a slow crane up as the rays open; still for the
// symbols.

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, SymbolIcon } from '../figures';
import { cameraFor, Diya, fadeIn, Glow, Layer, Lotus, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { EightRays, mixColour, rayTip, sc, SunDisc } from './kit';

const SUN = { x: 800, y: 400 };
const RAY = 300; // the length of the eight rays, to the icons

// Where each tappable symbol is. The arrow shares the bow's hotspot, and the
// mace the discus's (the night file lists them together).
export const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  arms: { x: SUN.x, y: SUN.y, r: 60 },
  kamandalu: { ...rayTip(0, SUN.x, SUN.y, RAY), r: 48 },
  bow: { ...rayTip(1, SUN.x, SUN.y, RAY), r: 48 },
  lotus: { ...rayTip(3, SUN.x, SUN.y, RAY), r: 48 },
  kalasha: { ...rayTip(4, SUN.x, SUN.y, RAY), r: 48 },
  discus: { ...rayTip(5, SUN.x, SUN.y, RAY), r: 48 },
  rosary: { ...rayTip(7, SUN.x, SUN.y, RAY), r: 48 },
  lion: { x: 800, y: 790, r: 62 },
  sun: { x: SUN.x, y: SUN.y - 205, r: 42 },
};

// The ten directions: the eight of the compass, and up and down.
const tenDirections = [0, 45, 90, 135, 180, 225, 270, 315, 260, 100];

export function SunScene({ t, rise, heat, ten, arms, lion, soft, outline = 0, pulse = 0 }: { t: number; rise: number; heat: number; ten: number; arms: number; lion: number; soft: number; outline?: number; pulse?: number }) {
  const sunY = lerp(720, SUN.y, rise);
  return (
    <>
      <Layer depth={0.03}>
        {/* A deep warm sky, glowing more as the sun climbs. */}
        <Sky top={mixColour('#140A10', '#2A1608', rise)} bottom={mixColour('#2A1608', '#8A4A1A', rise)} t={t} stars={30} starColour={sc.highlight} />
      </Layer>
      <Layer depth={0.1}>
        {/* The ten long rays, to the ten directions. */}
        {ten > 0 &&
          tenDirections.map((deg, i) => {
            const a = ((deg - 90) * Math.PI) / 180;
            const long = 1200 * ten;
            return (
              <line key={i} x1={SUN.x} y1={sunY} x2={SUN.x + Math.cos(a) * long} y2={sunY + Math.sin(a) * long} stroke={sc.accent} strokeWidth={4} opacity={0.35 * (1 - soft * 0.5)} strokeLinecap="round" />
            );
          })}
        <SunDisc x={SUN.x} y={sunY} r={150} t={t} corona={0.4 + 0.6 * heat} shimmer={heat * (1 - soft * 0.6)} pulse={pulse} />
        <DeviOutline x={SUN.x} y={sunY + 52} size={1.5} opacity={0.22 * outline} colour="#FFFBEF" />
      </Layer>
      <Layer depth={0.3}>
        {/* The ridge below, lit by the rays. */}
        <Ridge seed={41} baseY={780} height={120} fill={mixColour('#1E1008', '#7A4A20', ten * 0.8)} />
      </Layer>
      <Layer depth={0.5}>
        <Ridge seed={45} baseY={900} height={80} fill={mixColour('#120A06', '#4A2A12', ten * 0.7)} />
        {/* Devotees' lamps and lotuses on the land, as the light softens. */}
        <g opacity={soft}>
          {[260, 420, 1180, 1340].map((x, i) => (
            <Diya key={x} x={x} y={850 + (i % 2) * 18} t={t + i} scale={0.42} pulse={pulse} />
          ))}
          {[330, 1260].map((x) => (
            <Lotus key={x} x={x} y={872} scale={0.6} colour="#F2C58A" centre={sc.accent} />
          ))}
        </g>
      </Layer>
      <Layer depth={0.1}>
        {/* Her eight arms, as fine rays of light, each tipped with a symbol. */}
        <EightRays x={SUN.x} y={sunY} len={RAY} inner={160} open={arms} t={t} iconSize={1.35} iconColour="#FFE9B8" rayColour={sc.highlight} />
        {/* The lion, a gold outline, settling beneath her. */}
        <g opacity={lion} transform={`translate(0 ${(1 - lion) * -30})`}>
          <Glow x={800} y={790} r={120} colour={sc.secondary} opacity={0.3} />
          <SymbolIcon name="lion" x={800} y={790} size={2.2} colour="#E8B45A" />
        </g>
        <Particles kind="dust" t={t} count={26} colour={sc.highlight} opacity={0.35 * rise} area={{ x: 300, y: 100, w: 1000, h: 650 }} />
      </Layer>
    </>
  );
}

export function SunDwelling({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;

  const rise = easeOut(progress(t, 0.5, at(1)));
  const heat = easeInOut(progress(t, at(1), at(2)));
  const ten = easeInOut(progress(t, at(2), at(2) + 4));
  const arms = easeInOut(progress(t, at(3), at(3) + 5));
  const lion = fadeIn(t, at(3) + 3, 2.5);
  const soft = fadeIn(t, at(4), 3);
  const outline = fadeIn(t, at(3), 3) * (1 - soft * 0.5);
  const showHotspots = complete || t >= at(5);

  // Low angle, then a slow crane up as the rays open; still for the symbols.
  let cam = cameraFor('lowAngle', progress(t, 0, at(3)), t);
  cam = mixCam(cam, cameraFor('crane', progress(t, at(3), at(4)), t), fadeIn(t, at(3), 2));
  cam = mixCam(cam, cameraFor('still', 0, t), fadeIn(t, at(4), 3));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <SunScene t={t} rise={rise} heat={heat} ten={ten} arms={arms} lion={lion} soft={soft} outline={outline} pulse={pulse} />
      {/* Tappable hotspots on the symbols (the same depth as the rays). */}
      <Layer depth={0.1}>
        {showHotspots &&
          Object.entries(hotspotPlaces).map(([id, p], i) => (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFFBEF"
              fillOpacity={0.08}
              stroke="#FFFBEF"
              strokeWidth={3}
              opacity={0.3 + 0.3 * (0.5 + 0.5 * Math.sin(t * Math.PI + i * 0.4))}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={`Learn about the ${id}`}
              onClick={() => onCue(`hotspot:${id}`)}
            />
          ))}
      </Layer>
    </Stage>
  );
}
