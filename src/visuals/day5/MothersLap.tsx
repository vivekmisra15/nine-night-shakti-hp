// Beat 6: On his mother's lap.
//   Sentence 0     on Kailasa, Shiva's silver light and the Devi's warm glow
//                  come out; within her glow a very faint head-and-shoulders outline
//   Sentence 1     the child-light settles in her lap
//   Sentence 3     it moves to Shiva's light; a small gold snake icon at his
//                  throat wiggles, and the silver light brightens (his laugh)
//   Sentence 4 on  back on her lap; small gold outline gifts arrive one by one,
//                  each with a moment of its giver's light: discus (blue,
//                  Vishnu), trident (silver), thunderbolt and elephant (pale
//                  violet, Indra), spear (ember, Agni)
//   Final frame    the child-light on the lap with the spear beside it (freeze-frame)
// Camera: still, then a slow orbit.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, type LightKind, SymbolIcon, type SymbolName } from '../figures';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Particles, Ridge, Sky, Stage, window2 } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { ChildLight, MiniIcon, p } from './kit';

const c = p.n5motherGold;
const SHIVA: [number, number] = [520, 560];
const DEVI: [number, number] = [1020, 560];
const LAP: [number, number] = [DEVI[0], DEVI[1] + 56];
const SHIVA_LAP: [number, number] = [SHIVA[0], SHIVA[1] + 60];

// Kailasa in warm evening light, shared with Beat 7 and the Reflection.
export function WarmKailasa({ t, dawn = 0 }: { t: number; dawn?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={c.shadow} bottom="#6B3F22" t={t} stars={30} starColour={c.highlight} />
        {dawn > 0 && (
          <g opacity={dawn}>
            <Sky top="#4A3550" bottom="#F2B66B" t={t} />
          </g>
        )}
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={3} baseY={600} height={140} fill="#3B2418" peak={{ x: 780, h: 240 }} snow="#F3DCC0" />
      </Layer>
      <Layer depth={0.4}>
        <Haze y={680} colour={c.primary} opacity={0.15} t={t} />
        <Ridge seed={8} baseY={780} height={90} fill="#24160E" />
      </Layer>
      <Layer depth={0.8}>
        <path d="M -200 860 Q 800 800 1800 860 L 1800 1200 L -200 1200 Z" fill="#1A0F09" />
      </Layer>
    </>
  );
}

// The gifts, in the order the text gives them, with each giver's light.
const gifts: { kind: 'symbol' | 'mini'; name: SymbolName | 'elephant'; light: LightKind; x: number; y: number; line: number; offset: number }[] = [
  { kind: 'symbol', name: 'discus', light: 'blue', x: 820, y: 770, line: 5, offset: 2 },
  { kind: 'symbol', name: 'trident', light: 'silver', x: 920, y: 800, line: 5, offset: 4 },
  { kind: 'symbol', name: 'thunderbolt', light: 'violet', x: 1120, y: 800, line: 5, offset: 6.5 },
  { kind: 'mini', name: 'elephant', light: 'violet', x: 1220, y: 770, line: 5, offset: 7.5 },
  { kind: 'symbol', name: 'vel', light: 'ember', x: 1110, y: 640, line: 6, offset: 1.5 },
];

export function MothersLap({ beat, t: time, duration, frozen, complete, pulse }: VisualProps) {
  const t = complete ? duration : time;
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;

  const cam = mixCam(cameraFor('still', 0, t), cameraFor('orbit', progress(t, at(4), duration), t), fadeIn(t, at(4), 3));

  const outline = 0.24 * fadeIn(t, at(0) + 1, 3);
  // The child: arriving on her lap, to Shiva's lap, and back.
  const arrive = easeInOut(progress(t, at(1), at(1) + 4));
  const toShiva = easeInOut(progress(t, at(3), at(3) + 3));
  const backToLap = easeInOut(progress(t, at(4), at(4) + 3));
  let child: [number, number] = [lerp(-60, LAP[0], arrive), lerp(700, LAP[1], arrive) - Math.sin(arrive * Math.PI) * 120];
  if (t >= at(3)) child = [lerp(LAP[0], SHIVA_LAP[0], toShiva), lerp(LAP[1], SHIVA_LAP[1], toShiva) - Math.sin(toShiva * Math.PI) * 60];
  if (t >= at(4)) child = [lerp(SHIVA_LAP[0], LAP[0], backToLap), lerp(SHIVA_LAP[1], LAP[1], backToLap) - Math.sin(backToLap * Math.PI) * 60];

  // The snake at Shiva's throat wiggles as the boy tugs it; Shiva's light brightens: he laughs.
  const tug = window2(t, at(3) + 2.5, at(4), 0.8);
  const laugh = 1 + 0.5 * tug * (0.6 + 0.4 * Math.sin(t * 9));
  const blessing = fadeIn(t, at(7), 2.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <WarmKailasa t={t} />
      <Layer depth={0.6}>
        {/* Shiva: silver light, with the small gold snake at his throat. */}
        <DivineLight x={SHIVA[0]} y={SHIVA[1]} t={t} kind="silver" size={0.8} strength={laugh} pulse={pulse} />
        <MiniIcon name="snake" x={SHIVA[0]} y={SHIVA[1] - 110} size={1} colour={c.accent} rot={tug * 14 * Math.sin(t * 10)} />
        {/* The Devi: warm light, a faint outline within it, and her lap of gold. */}
        <Glow x={DEVI[0]} y={DEVI[1]} r={320} colour={c.primary} opacity={0.3 + pulse * 0.05} />
        <path d={`M ${LAP[0] - 90} ${LAP[1] - 6} Q ${LAP[0]} ${LAP[1] + 36} ${LAP[0] + 90} ${LAP[1] - 6}`} stroke="#FFE3A3" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
        <DivineLight x={DEVI[0]} y={DEVI[1]} t={t} kind="warm" size={1} pulse={pulse} />
        <DeviOutline x={DEVI[0]} y={DEVI[1] - 66} size={1.3} opacity={outline} />
      </Layer>
      <Layer depth={0.7}>
        {/* The gifts, one by one, each with a moment of its giver's light. */}
        {gifts.map((g, i) => {
          const start = at(g.line) + g.offset;
          const show = fadeIn(t, start, 1.2);
          const giver = window2(t, start - 0.8, start + 2.5, 0.8);
          const final = g.name === 'vel' ? 1 : 1 - 0.45 * fadeIn(t, at(8), 3);
          return (
            <g key={i}>
              {giver > 0 && (
                <g opacity={giver}>
                  <DivineLight x={g.x} y={g.y - 90} t={t} kind={g.light} size={0.22} />
                </g>
              )}
              {g.kind === 'symbol' ? (
                <SymbolIcon name={g.name as SymbolName} x={g.x} y={lerp(g.y - 60, g.y, show)} size={1.3} colour={c.accent} opacity={show * final} />
              ) : (
                <MiniIcon name="elephant" x={g.x} y={lerp(g.y - 60, g.y, show)} size={1.3} colour={c.accent} opacity={show * final} />
              )}
            </g>
          );
        })}
        {/* Parvati's own gift: strength, good fortune and long life, as a ring of gold. */}
        <circle cx={LAP[0]} cy={LAP[1]} r={52} fill="none" stroke="#FFE3A3" strokeWidth={2} opacity={0.5 * blessing} />
        <ChildLight x={child[0]} y={child[1]} t={t} size={0.85} faces={1} opacity={fadeIn(t, at(1) - 0.5, 1.5)} />
        <Particles kind="dust" t={t} count={18} colour={c.highlight} opacity={0.35} area={{ x: 700, y: 380, w: 600, h: 400 }} />
      </Layer>
    </Stage>
  );
}
