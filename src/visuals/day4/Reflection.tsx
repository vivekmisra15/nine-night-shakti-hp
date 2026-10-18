// Beat 14: Reflection, and the night's closing.
// The low ridge before dawn, with the warm point of light resting on a stone
// ledge (mirroring Beat 1), while the camera very slowly pulls back. When the
// theme appears again (step 14.2), golden dust rises once.
//
// The closing (13 seconds, after Finish): the sun rises behind the ridge
// with the warm point at its core (0–6 s); the theme's word and idea are
// shown over it by the closing screen; the point drifts up out of the frame
// as a spark (8.5–11.5 s), and becomes diya 4 on the map; then fade out.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, H, Layer, Particles, Ridge, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { cueAge } from '../day1/common';
import { DarkSky, mixColour, Stars, SunDisc, WarmPoint } from './kit';

const r = palettes.reflective;
const dawnP = palettes.himalayanDawn;

// The ridge and the stone ledge with the warm point resting on it.
function Ledge({ t, point = 1, pulse = 0 }: { t: number; point?: number; pulse?: number }) {
  return (
    <>
      <Layer depth={0.3}>
        <Ridge seed={61} baseY={700} height={120} fill="#141A33" />
      </Layer>
      <Layer depth={0.6}>
        <Ridge seed={65} baseY={830} height={70} fill="#0E1228" />
      </Layer>
      <Layer depth={1}>
        <path d="M 560 800 Q 800 780 1040 800 L 1060 900 L 540 900 Z" fill="#0B0F22" />
        <path d="M 560 800 Q 800 780 1040 800" stroke="#2A3150" strokeWidth={3} fill="none" />
        <WarmPoint x={800} y={768} t={t} size={0.9} opacity={point} pulse={pulse} />
      </Layer>
    </>
  );
}

export function Reflection({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const cam = cameraFor('pullBack', complete ? 1 : progress(t, 0, 60), t);
  const takeaway = cueAge(cues, 'takeaway', t, false);
  const dust = takeaway >= 0 && takeaway < 8 ? 1 - takeaway / 8 : 0;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        {/* Before dawn: the night sky, just lightening at the horizon. */}
        <Sky top={r.shadow} bottom="#2A2848" t={t} stars={60} starColour={r.highlight} />
      </Layer>
      <Ledge t={t} pulse={pulse} />
      {dust > 0 && (
        <Layer depth={0.9}>
          <Particles kind="dust" t={takeaway} count={40} colour={r.highlight} opacity={0.7 * dust} area={{ x: 500, y: 200, w: 600, h: 600 }} speed={3} />
        </Layer>
      )}
    </Stage>
  );
}

// The closing, played by itself after Finish. Registered as 'n4-closing'.
export function Closing({ t }: VisualProps) {
  const dawn = easeInOut(progress(t, 0, 6));
  const sunUp = easeInOut(progress(t, 0.5, 7));
  // The point leaves the ledge for the sun's core, then rises as a spark.
  const toSun = easeInOut(progress(t, 1, 4.5));
  const spark = progress(t, 8.5, 11.5);
  const out = fadeIn(t, 11.5, 1.5);
  const sunY = lerp(760, 470, sunUp);
  const px = 800;
  const py = lerp(768, sunY, toSun);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.04, rot: 0 }} frozen={false} label="Night 4 closing">
      <Layer depth={0.05}>
        <DarkSky t={t} />
        {/* The dawn: the night gives way to rose and gold. */}
        <g opacity={dawn}>
          <Sky top={dawnP.shadow} bottom={dawnP.primary} t={t} />
        </g>
        <Stars t={t} count={60} opacity={1 - dawn} />
      </Layer>
      <Layer depth={0.2}>
        <SunDisc x={800} y={sunY} r={120} t={t} corona={sunUp} point={0} />
        <Glow x={800} y={sunY} r={500} colour={dawnP.accent} opacity={0.2 * sunUp} />
      </Layer>
      <Layer depth={0.3}>
        <Ridge seed={61} baseY={700} height={120} fill={mixColour('#141A33', '#5A4E7A', dawn)} />
      </Layer>
      <Layer depth={0.6}>
        <Ridge seed={65} baseY={830} height={70} fill={mixColour('#0E1228', '#3E3458', dawn)} />
      </Layer>
      <Layer depth={1}>
        <path d="M 560 800 Q 800 780 1040 800 L 1060 900 L 540 900 Z" fill={mixColour('#0B0F22', '#2A2440', dawn)} />
      </Layer>
      {/* The warm point: to the sun's core, then up as a single spark. */}
      <Layer depth={0.2}>
        {spark === 0 && <WarmPoint x={px} y={py} t={t} size={0.9} />}
        {spark > 0 && spark < 1 && (
          <g>
            <Glow x={800 + Math.sin(spark * 6) * 20} y={lerp(sunY, -40, spark)} r={30} colour="#FFF4D6" opacity={0.9} />
            <circle cx={800 + Math.sin(spark * 6) * 20} cy={lerp(sunY, -40, spark)} r={4} fill="#FFF4D6" />
          </g>
        )}
      </Layer>
      <rect width={W} height={H} fill="#000" opacity={out} />
    </Stage>
  );
}
