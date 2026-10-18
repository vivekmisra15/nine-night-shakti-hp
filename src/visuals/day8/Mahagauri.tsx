// Beat 8: Mahagauri.
// The sea at night. A white bull in fine line-art rests on the shore; above
// it, the Devi as a calm warm light, with a light-touch outline of head and
// shoulders (arms are never drawn).
//   Sentence 0   a temple bell; the light settles above the bull
//   Sentence 1   her symbols appear around the light as small gold outline
//                icons: white cloth, trident (upper right), damaru (upper
//                left), abhaya hand (lower right), varada hand (lower left);
//                the bull is the resting bull itself. They become tappable.
//   The end      light, bull and icons, still. For "Did you know?", three
//                small kneeling girls with garlands, faint, around a diya.
// Camera: a slow crane up.

import { easeInOut, progress, wobble } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline, SymbolIcon, type SymbolName } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { ClothIcon, Coast } from './kit';

const g = palettes.n8gauriRadiance;
const LIGHT = { x: 800, y: 420 };

// The four hand symbols around her light.
const handIcons: { name: SymbolName; x: number; y: number }[] = [
  { name: 'damaru', x: 640, y: 300 },
  { name: 'trident', x: 960, y: 300 },
  { name: 'varada', x: 640, y: 500 },
  { name: 'abhaya', x: 960, y: 500 },
];

// Where each tappable symbol is in the picture.
export const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  cloth: { x: 800, y: 560, r: 50 },
  bull: { x: 800, y: 770, r: 90 },
  trident: { x: 960, y: 300, r: 55 },
  damaru: { x: 640, y: 300, r: 55 },
  abhaya: { x: 960, y: 500, r: 55 },
  varada: { x: 640, y: 500, r: 55 },
};

// The white bull resting on the shore: the shared bull icon, drawn large in
// pearl line, with a soft glow.
function WhiteBull({ opacity }: { opacity: number }) {
  return (
    <g opacity={opacity}>
      <Glow x={800} y={770} r={200} colour={g.primary} opacity={0.15} />
      <SymbolIcon name="bull" x={800} y={770} size={3.2} colour={g.primary} />
    </g>
  );
}

export function Mahagauri({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = L[L.length - 1].end;
  const time = complete ? end + 6 : t;
  const cam = cameraFor('crane', progress(time, 0, end + 2), time);

  const lightIn = fadeIn(time, 0.3, 3);
  const bull = fadeIn(time, at(0) + 1, 3);
  const outline = fadeIn(time, at(0) + 3, 3);
  const icons = (i: number) => fadeIn(time, at(1) + 0.6 * i, 1.5);
  const showHotspots = complete || time >= at(1) + 3;
  const girls = fadeIn(time, end, 3);
  const breathe = 1 + wobble(time, 0.6) * 0.006;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Coast t={time} moon={0.9} moonX={1300} />
      <Layer depth={0.5}>
        {/* A wide, pale beach across the foreground, where the bull rests. */}
        <path d="M -300 700 Q 400 670 800 680 Q 1200 670 1900 700 L 1900 1200 L -300 1200 Z" fill="#3A3A46" />
        <path d="M -300 700 Q 400 670 800 680 Q 1200 670 1900 700" stroke="#D9C9A8" strokeWidth={2} opacity={0.3} fill="none" />
      </Layer>
      <Layer depth={0.6}>
        <WhiteBull opacity={bull} />
        <g opacity={lightIn} transform={`translate(${LIGHT.x} ${LIGHT.y}) scale(${breathe}) translate(${-LIGHT.x} ${-LIGHT.y})`}>
          <Glow x={LIGHT.x} y={LIGHT.y - 30} r={360} colour={g.primary} opacity={0.22 + pulse * 0.06} />
          <DivineLight x={LIGHT.x} y={LIGHT.y + 40} t={time} kind="warm" size={1.1} pulse={pulse} />
          <DeviOutline x={LIGHT.x} y={LIGHT.y - 40} size={1.4} opacity={0.3 * outline} />
        </g>
        {handIcons.map((icon, i) => (
          <SymbolIcon key={icon.name} name={icon.name} x={icon.x} y={icon.y} size={1.3} colour={g.accent} opacity={icons(i)} />
        ))}
        <ClothIcon x={800} y={560} size={1.2} colour={g.accent} opacity={icons(4)} />
      </Layer>
      <Layer depth={0.85}>
        {/* Did you know: girls honoured as the Devi (Kanya Puja), faint. */}
        <g opacity={0.55 * girls}>
          <Glow x={250} y={820} r={110} colour="#F29F3D" opacity={0.3} />
          <Diya x={250} y={840} t={time} scale={0.6} />
          {[150, 250, 350].map((x, i) => (
            <g key={x}>
              <Outline x={x} y={i === 1 ? 790 : 860} scale={0.32} pose="kneel" arms="anjali" colour="#E8B45A" />
              {/* A small garland, as a dotted arc. */}
              <path d={`M ${x - 9} ${(i === 1 ? 790 : 860) - 70} Q ${x} ${(i === 1 ? 790 : 860) - 58} ${x + 9} ${(i === 1 ? 790 : 860) - 70}`} stroke="#F5A623" strokeWidth={2.5} strokeDasharray="1 4" strokeLinecap="round" fill="none" />
            </g>
          ))}
        </g>
        <Particles kind="dust" t={time} count={20} colour={g.highlight} opacity={0.3} area={{ x: 500, y: 200, w: 600, h: 500 }} />
      </Layer>

      {/* Tappable hotspots on the six symbols. */}
      <Layer depth={0.6}>
        {showHotspots &&
          Object.entries(hotspotPlaces).map(([id, p]) => (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFFDF5"
              fillOpacity={0.06}
              stroke="#FFFDF5"
              strokeWidth={3}
              opacity={(0.3 + 0.3 * (0.5 + 0.5 * Math.sin(time * Math.PI))) * easeInOut(Math.min(1, complete ? 1 : progress(time, at(1) + 3, at(1) + 4.5)))}
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
