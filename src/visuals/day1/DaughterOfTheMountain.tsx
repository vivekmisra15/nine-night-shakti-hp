// Beat 8: Daughter of the mountain.
//   Sentence 0   Himalayan dawn; Himavat and Mena kneel in prayer before
//                their carved stone palace
//   Sentence 1   the signature flame relights on the highest peak; the
//                camera orbits as it blooms into a lotus of light
//   Sentences 2–3 the lotus descends and settles as Shailaputri: the flame,
//                calm and breathing slowly, with a faint outline of head and
//                shoulders within it (never a body); her five symbols
//                (bull, trident, lotus, crescent moon, mountain) appear around
//                her as small gold outline icons
//   Sentence 4   the full picture (freeze-frame); the symbols become
//                tappable hotspots, pulsing gently
//   Sentence 5   far away, Shiva's silver light rests on a distant peak

import { easeInOut, lerp, progress, wobble } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline, SymbolIcon, type SymbolName } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Flame, Glow, Haze, Layer, LightLotus, LightRays, Lotus, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from './common';

const h = palettes.himalayanDawn;

// Where each symbol icon sits, around her flame. The mountain is the high
// peak itself, so it has no icon of its own.
const iconPlaces: Record<Extract<SymbolName, 'moon' | 'trident' | 'lotus' | 'bull'>, { x: number; y: number }> = {
  moon: { x: 800, y: 420 },
  trident: { x: 620, y: 560 },
  lotus: { x: 980, y: 560 },
  bull: { x: 800, y: 790 },
};

// Where each tappable symbol is in the picture.
export const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  bull: { x: 800, y: 790, r: 60 },
  trident: { x: 620, y: 560, r: 55 },
  lotus: { x: 980, y: 560, r: 55 },
  moon: { x: 800, y: 420, r: 50 },
  mountain: { x: 800, y: 190, r: 70 },
};

export function DaughterOfTheMountain({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  let cam = cameraFor('pushIn', progress(t, 0, at(1)) * 0.5, t);
  cam = mixCam(cam, cameraFor('orbit', progress(t, at(1), at(2)), t), fadeIn(t, at(1), 2));
  cam = mixCam(cam, cameraFor('lowAngle', progress(t, at(2), at(4)), t), fadeIn(t, at(2), 2));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.04, rot: 0 }, fadeIn(t, at(4), 2));

  const relight = fadeIn(t, at(1) + 1, 1.5);
  const bloom = easeInOut(progress(t, at(1) + 2.5, at(1) + 6));
  const descend = easeInOut(progress(t, at(2), at(3)));
  const devi = fadeIn(t, at(2) + 2, 3);
  const breathe = 1 + wobble(t, 0.6) * 0.006;
  const showHotspots = complete || t >= at(4);
  const farShiva = fadeIn(t, at(5), 2);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top={h.shadow} bottom={h.primary} t={t} />
        <LightRays x={800} y={200} t={t} colour="#FFF8E7" opacity={0.12 + 0.05 * relight} />
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={3} baseY={560} height={150} fill="#B9A3C8" peak={{ x: 800, h: 300 }} snow={h.secondary} />
        {/* Far away, Shiva in meditation: a small silver light on a distant peak. */}
        <g opacity={farShiva}>
          <DivineLight x={1360} y={400} t={t} kind="silver" size={0.25} />
        </g>
      </Layer>
      <Layer depth={0.2}>
        {/* The flame relit on the peak, blooming into a lotus of light, then descending. */}
        <Flame x={800} y={lerp(210, 520, descend)} size={0.9} t={t} height={relight * (1 - bloom)} core="#FFFFFF" outer="#F7B733" pulse={pulse} />
        <LightLotus x={800} y={lerp(210, 560, descend)} size={1.6} open={bloom * (1 - devi * 0.85)} colour="#FFF8E7" />
      </Layer>
      <Layer depth={0.35}>
        <Haze y={640} colour={h.secondary} opacity={0.3} t={t} />
        <Ridge seed={7} baseY={720} height={110} fill="#8A7AA0" />
        {/* Himavat and Mena's carved stone palace. */}
        <path d="M 120 700 L 120 560 L 200 500 L 280 560 L 280 700 Z M 300 700 L 300 600 L 360 560 L 420 600 L 420 700 Z" fill="#C9B9A8" />
      </Layer>
      <Layer depth={0.75}>
        <path d="M -200 860 Q 800 790 1800 860 L 1800 1100 L -200 1100 Z" fill="#9FB89A" />
        {/* The still pond with lotuses, reflecting the light. */}
        <ellipse cx={1250} cy={880} rx={240} ry={30} fill="#C9D8F0" opacity={0.7} />
        {[1120, 1220, 1340].map((x) => (
          <Lotus key={x} x={x} y={880} scale={0.6} />
        ))}
        {/* Himavat and Mena, kneeling outlines with palms joined. */}
        <g opacity={1 - devi * 0.4}>
          <Outline x={330} y={860} scale={0.7} pose="kneel" head="crown" arms="anjali" colour="#6E5A8A" />
          <Outline x={440} y={860} scale={0.66} pose="kneel" head="veiled" arms="anjali" colour="#8A5A7A" />
        </g>
      </Layer>
      <Layer depth={0.8} opacity={devi}>
        <Glow x={800} y={600} r={360} colour="#FFF8E7" opacity={0.35 + pulse * 0.08} />
        {/* Shailaputri: the flame, settled and calm, with her five symbols
            around her as small gold outline icons. */}
        <g transform={`translate(800 600) scale(${breathe}) translate(-800 -600)`}>
          <DivineLight x={800} y={640} t={t} kind="warm" size={1.3} pulse={pulse} />
          {/* Her light-touch silhouette, faint within the light once she has settled. */}
          <DeviOutline x={800} y={560} size={1.5} opacity={0.32 * fadeIn(t, at(3), 3)} />
          {(Object.keys(iconPlaces) as (keyof typeof iconPlaces)[]).map((name) => (
            <SymbolIcon key={name} name={name} x={iconPlaces[name].x} y={iconPlaces[name].y} size={1.55} colour="#A8741F" />
          ))}
        </g>
        <Particles kind="petals" t={t} count={20} colour={h.primary} opacity={0.7} />
        <Particles kind="dust" t={t} count={24} colour="#FFF8E7" opacity={0.4} area={{ x: 500, y: 300, w: 600, h: 500 }} />
      </Layer>

      {/* Tappable hotspots on the five symbols. */}
      <Layer depth={0.8}>
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
