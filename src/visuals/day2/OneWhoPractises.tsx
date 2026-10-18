// Beat 9: The one who practises.
//   Sentence 0   Brahmacharini as a tall white-gold light, with a light-touch
//                head-and-shoulders outline within it
//   Sentence 1   bare footprints of light appear on the ground ("barefoot");
//                a soft white cloth of light around her ("dressed in white")
//   Sentence 2   the bead ring rises, the last bead lights, and the ring
//                becomes the rosary at her right; a water pot at her left
//   Sentence 3   no mount: the path stretches ahead towards Kailasa
//   The end      her light and the five hotspot icons (rosary, water pot,
//                white cloth, bare feet, calm face as a crescent of light),
//                tappable (freeze-frame after sentence 3)
// Camera: crane up, then still.
// "Her right hand" is the Devi's own right, so the rosary is on the viewer's left.

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { DeviOutline, DivineLight, SymbolIcon } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Haze, Layer, LightRays, LightTrail, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { BeadRing, Icon2 } from './kit';

const b = palettes.n2brahmacharini;
const DEVI = { x: 800, y: 600 };

// Where each tappable symbol is in the picture (ids match day2.ts).
export const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  rosary: { x: 610, y: 520, r: 55 },
  waterPot: { x: 990, y: 520, r: 55 },
  whiteCloth: { x: 690, y: 700, r: 50 },
  bareFeet: { x: 910, y: 790, r: 50 },
  calmFace: { x: 800, y: 330, r: 50 },
};

export function OneWhoPractises({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = mixCam(cameraFor('crane', progress(t, 0, at(3)), t), { x: 0, y: 0, zoom: 1.04, rot: 0 }, fadeIn(t, at(3), 3));

  const devi = fadeIn(t, 0.5, 3);
  const feet = (i: number) => fadeIn(t, at(1) + i * 0.6, 1);
  const cloth = fadeIn(t, at(1) + 2, 2);
  // The ring rises from low in the frame, completes, and becomes the rosary.
  const rise = easeInOut(progress(t, at(2), at(2) + 4));
  const toRosary = easeInOut(progress(t, at(2) + 4, at(2) + 6));
  const pot = fadeIn(t, at(2) + 4, 1.5);
  const path = easeInOut(progress(t, at(3), at(3) + 5));
  const showHotspots = complete || t >= L[3].end;
  const icons = complete ? 1 : fadeIn(t, L[3].end - 1, 2);
  const breathe = 1 + wobble(t, 0.5) * 0.008;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={b.shadow} bottom="#E9C9A0" t={t} stars={20} starColour={b.highlight} />
        <LightRays x={800} y={300} t={t} colour={b.highlight} opacity={0.08} />
      </Layer>
      <Layer depth={0.15}>
        {/* Kailasa far ahead, where her path leads. */}
        <Ridge seed={3} baseY={560} height={110} fill="#8E7FA6" peak={{ x: 1250, h: 200 }} snow={b.primary} />
      </Layer>
      <Layer depth={0.35}>
        <Haze y={640} colour={b.primary} opacity={0.25} t={t} />
        <path d="M -400 1100 L -400 720 Q 800 660 2000 720 L 2000 1100 Z" fill="#4A3F5E" />
        {/* The bare path, stretching ahead: no mount, she walks. */}
        <LightTrail d="M 820 820 Q 980 760 1100 700 Q 1200 650 1250 600" amount={path} colour={b.secondary} t={t} width={3} opacity={0.5} />
      </Layer>
      <Layer depth={0.7}>
        {/* Bare footprints of light, step by step. */}
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={0.75 * feet(i)}>
            <Icon2 name="footprint" x={770 + (i % 2) * 60} y={860 - i * 45} size={1.3 - i * 0.15} colour={b.highlight} />
          </g>
        ))}
        <g opacity={devi} transform={`translate(${DEVI.x} ${DEVI.y}) scale(${breathe}) translate(${-DEVI.x} ${-DEVI.y})`}>
          <Glow x={DEVI.x} y={DEVI.y - 80} r={380} colour={b.primary} opacity={0.35 + pulse * 0.08} />
          {/* A soft white light around her: "dressed in white". */}
          <Glow x={DEVI.x} y={DEVI.y + 40} r={230} colour="#FFFFFF" opacity={0.22 * cloth} />
          <DivineLight x={DEVI.x} y={DEVI.y + 60} t={t * 0.5} kind="warm" size={1.25} pulse={pulse} />
          <Glow x={DEVI.x} y={DEVI.y - 40} r={120} colour="#FFFFFF" opacity={0.35} />
          <DeviOutline x={DEVI.x} y={DEVI.y - 50} size={1.2} opacity={0.26 * fadeIn(t, 2, 3)} />
        </g>
        {/* The ring of beads: it rises and becomes the rosary at her right. */}
        {toRosary < 1 && (
          <g opacity={1 - toRosary}>
            <BeadRing lit={8 + fadeIn(t, at(2) + 2, 1.5)} t={t} x={lerp(800, 610, rise)} y={lerp(805, 520, rise)} rx={lerp(140, 40, rise)} ry={lerp(30, 34, rise)} />
          </g>
        )}
        <g opacity={toRosary}>
          <Glow x={610} y={520} r={70} colour="#FFE3A3" opacity={0.35} />
          <SymbolIcon name="rosary" x={610} y={520} size={1.4} />
        </g>
        <g opacity={pot}>
          <SymbolIcon name="waterPot" x={990} y={520} size={1.4} />
        </g>
        {/* The other symbols, shown when the hotspots open. */}
        <Icon2 name="cloth" x={690} y={700} size={1.1} opacity={icons} colour={b.highlight} />
        <Icon2 name="footprint" x={910} y={790} size={1.1} opacity={icons} />
        <Icon2 name="face" x={800} y={330} size={1} opacity={icons} colour="#FFF4D6" />
        <Particles kind="dust" t={t} count={24} colour={b.highlight} opacity={0.4} area={{ x: 500, y: 250, w: 600, h: 550 }} />
      </Layer>
      {/* Tappable hotspots on the five symbols. */}
      <Layer depth={0.7}>
        {showHotspots &&
          Object.entries(hotspotPlaces).map(([id, p]) => (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFF8E7"
              fillOpacity={0.08}
              stroke="#FFF8E7"
              strokeWidth={3}
              opacity={0.3 + 0.3 * (0.5 + 0.5 * Math.sin(t * Math.PI))}
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
