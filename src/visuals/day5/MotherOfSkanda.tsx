// Beat 8: Mother of Skanda (two screens).
// The Devi's warm glow, with its faint head-and-shoulders outline, seated on
// a lotus; the child-light on her lap, facing outward. Around her, small
// gold outline icons: two lotuses, a raised open hand, the lion, the throat
// circle (the lotus seat and the child are drawn themselves).
//
// 8.1  the icons appear one by one through the narration; slow push-in.
// 8.2  (Tamil tradition) a slim gold vel passes from her glow to the
//      child-light and rests beside him.
// 8.3  the six symbols become tappable hotspots (ids match day5.ts).

import { easeInOut, lerp, progress } from '../../engine/anim';
import { SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Layer, LightRays, Particles, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { DeviOnLotus, MiniIcon, p } from './kit';

const c = p.n5motherGold;
const DEVI: [number, number] = [800, 470];
const S = 1.2; // the Devi's size
const CHILD: [number, number] = [DEVI[0], DEVI[1] + 50 * S];

// Where each tappable symbol is.
const hotspotPlaces: { id: string; x: number; y: number; r: number }[] = [
  { id: 'child', x: CHILD[0], y: CHILD[1], r: 50 },
  { id: 'lotuses', x: 590, y: 360, r: 50 },
  { id: 'lotuses', x: 1010, y: 360, r: 50 },
  { id: 'abhaya', x: 1130, y: 560, r: 55 },
  { id: 'lion', x: 470, y: 720, r: 65 },
  { id: 'seat', x: 800, y: 590, r: 55 },
  { id: 'fifthNight', x: 800, y: 210, r: 45 },
];

// The whole picture, with each icon's visibility (0 to 1) and the vel's journey.
function Portrait({ t, show, vel, hotspots, onCue, pulse }: { t: number; show: (i: number) => number; vel: number; hotspots: boolean; onCue: (n: string) => void; pulse: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom="#5A3418" t={t} stars={40} starColour={c.highlight} />
        <LightRays x={800} y={300} t={t} colour={c.highlight} opacity={0.035} />
      </Layer>
      <Layer depth={0.5}>
        <DeviOnLotus x={DEVI[0]} y={DEVI[1]} t={t} size={S} pulse={pulse} outline={0.3} />
        {/* Her symbols, as small gold outline icons. */}
        <SymbolIcon name="lotus" x={590} y={360} size={1.2} colour={c.accent} opacity={show(1)} />
        <SymbolIcon name="lotus" x={1010} y={360} size={1.2} colour={c.accent} opacity={show(1)} />
        <SymbolIcon name="lion" x={470} y={720} size={1.9} colour={c.accent} opacity={show(2)} />
        <SymbolIcon name="abhaya" x={1130} y={560} size={1.4} colour={c.accent} opacity={show(3)} />
        <MiniIcon name="throat" x={800} y={210} size={1.2} colour={c.accent} opacity={show(4)} />
        {/* The vel: from her glow to the child's side. */}
        {vel > 0 && <SymbolIcon name="vel" x={lerp(DEVI[0], CHILD[0] + 80, vel)} y={lerp(DEVI[1] - 70, CHILD[1] - 10, vel)} size={1.2} colour="#FFE3A3" opacity={Math.min(1, vel * 3)} />}
        <Particles kind="petals" t={t} count={14} colour={c.secondary} opacity={0.5} />
        <Particles kind="dust" t={t} count={20} colour={c.highlight} opacity={0.35} area={{ x: 500, y: 200, w: 600, h: 500 }} />
      </Layer>
      {hotspots && (
        <Layer depth={0.5}>
          {hotspotPlaces.map((h, i) => (
            <circle
              key={i}
              cx={h.x}
              cy={h.y}
              r={h.r}
              fill="#FFF5DC"
              fillOpacity={0.08}
              stroke="#FFF5DC"
              strokeWidth={3}
              opacity={0.3 + 0.3 * (0.5 + 0.5 * Math.sin(t * Math.PI))}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={`Learn about ${h.id}`}
              onClick={() => onCue(`hotspot:${h.id}`)}
            />
          ))}
        </Layer>
      )}
    </>
  );
}

// 8.1: the icons appear one by one.
export function MotherOfSkanda({ beat, t: time, duration, frozen, complete, onCue, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  // Lotuses with sentence 1 ("holding lotuses"), the lion with it too, then the hand and the throat circle.
  const starts = [0, at(1) + 2, at(1) + 4, at(2) + 2, at(2) + 6];
  return (
    <Stage cam={cameraFor('pushIn', progress(t, 0, duration) * 0.6, t)} frozen={frozen} label={beat.title}>
      <Portrait t={t} show={(i) => fadeIn(t, starts[i], 2)} vel={0} hotspots={false} onCue={onCue} pulse={pulse} />
    </Stage>
  );
}

// 8.2–8.4: the vel, then the hotspots.
export function TheVel({ beat, t: time, duration, frozen, complete, onCue, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const vel = easeInOut(progress(t, L[1].start + 1, L[2].start + 3));
  return (
    <Stage cam={cameraFor('pushIn', 0.6 + 0.4 * progress(t, 0, duration), t)} frozen={frozen} label={beat.title}>
      <Portrait t={t} show={() => 1} vel={vel} hotspots={complete || t >= duration - 0.05} onCue={onCue} pulse={pulse} />
    </Stage>
  );
}
