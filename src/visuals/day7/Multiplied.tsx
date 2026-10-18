// Beat 5: The demon who multiplied. (Beat 6, the choice, uses its last frame.)
//   Sentence 0     smoke armies on the horizon
//   Sentences 1–2  seven lights rise, one after another: the Mothers, each in
//                  her own soft colour with a small gold icon of her mount
//                  (swan, bull, peacock, Garuda, boar, lion, elephant)
//   Sentence 3     the smoke on the horizon thins: the army begins to break
//   Sentences 4–6  one tall smoke shape steps forward. Ember sparks fall from
//                  it to the ground line, and each spark that lands rises as
//                  a copy (the drop that lands). No blood is ever shown.
//   Sentences 7–8  a thunderbolt flash and a discus arc, each followed by
//                  more copies
//   Sentences 9–10 the sky fills with copies; the seven lights look small
//                  against them (freeze-frame)

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape, SymbolIcon, type SymbolName } from '../figures';
import { cameraFor, fadeIn, Glow, Haze, Layer, mixCam, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, DarkLight, FaintStars, linesOf, MotherLight, N7Icon, type N7IconName, Spark } from './kit';
import { day7Palettes } from './palettes';

const m = day7Palettes.n7matrikas;
const s = day7Palettes.n7smokeBattle;

export const GROUND = 800; // the ground line the drops fall to
export const DEMON = { x: 1060, y: 540 }; // Raktabija, the tall smoke shape

// The seven Mothers, in the order the text names them.
export const mothers: { colour: string; mount: N7IconName | SymbolName; x: number; y: number }[] = [
  { colour: '#E8A88A', mount: 'swan', x: 130, y: 250 }, // Brahmani: rose-gold
  { colour: '#DCE6FF', mount: 'bull', x: 230, y: 320 }, // Maheshvari: silver
  { colour: '#4A6FD8', mount: 'peacock', x: 330, y: 250 }, // Kaumari: sapphire
  { colour: '#6F8FE8', mount: 'garuda', x: 430, y: 320 }, // Vaishnavi: blue
  { colour: '#C98A3E', mount: 'boar', x: 530, y: 250 }, // Varahi: earth amber
  { colour: '#F29F3D', mount: 'lion', x: 630, y: 320 }, // Narasimhi: saffron
  { colour: '#FFF0C8', mount: 'elephant', x: 730, y: 250 }, // Aindri: pale white-gold
];
const sharedIcons = new Set(['bull', 'lion']);

// The seven Mothers as lights, each with her mount. `appear(i)` is how far
// light i has risen (0 to 1).
export function MothersRow({ t, appear, size = 1 }: { t: number; appear: (i: number) => number; size?: number }) {
  return (
    <>
      {mothers.map((mo, i) => {
        const a = appear(i);
        if (a <= 0) return null;
        const y = lerp(GROUND - 60, mo.y, easeOut(a));
        const icon = { x: mo.x, y: y + 70 * size, size: 0.75 * size, colour: '#E8C66A', opacity: a };
        return (
          <g key={i}>
            <MotherLight x={mo.x} y={y} t={t} colour={mo.colour} size={0.75 * size} strength={a} />
            {sharedIcons.has(mo.mount) ? <SymbolIcon name={mo.mount as SymbolName} {...icon} /> : <N7Icon name={mo.mount as N7IconName} {...icon} />}
          </g>
        );
      })}
    </>
  );
}

// Where the copies of Raktabija appear, in four waves: a few after the first
// drops, more after the thunderbolt, more after the discus, then the rest.
const waves = [
  { count: 4, line: 6, from: 1.5, every: 3.2 },
  { count: 10, line: 7, from: 1.8, every: 0.6 },
  { count: 18, line: 8, from: 1.6, every: 0.32 },
  { count: 30, line: 9, from: 0.5, every: 0.3 },
];
export const copies = waves.flatMap((w, wave) =>
  Array.from({ length: w.count }, (_, k) => {
    const i = wave * 40 + k;
    const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    const r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
    // Early copies gather round the demon; later ones fill the whole sky,
    // leaving room for the Mothers in the upper left.
    const wide = wave >= 2;
    const x = wide ? 40 + r1 * 1540 : 760 + r1 * 760;
    const y = wide && x < 860 ? 430 + r2 * 330 : 180 + r2 * 590;
    return { x, y, size: 0.3 + r2 * 0.25, seed: 100 + i, line: w.line, offset: w.from + k * w.every };
  }),
);

// The copies, and the sparks that make them. `spawnAt(c)` is when each copy
// rises; `gone(c)` (0 to 1) is for Beat 7, where they are drawn away.
export function Copies({ t, spawnAt, gone = () => 0, sparks = true }: { t: number; spawnAt: (c: (typeof copies)[number]) => number; gone?: (c: (typeof copies)[number], i: number) => number; sparks?: boolean }) {
  return (
    <>
      {copies.map((c, i) => {
        const at = spawnAt(c);
        const fall = progress(t, at - 1, at); // the spark falls for a second
        const grow = easeOut(progress(t, at, at + 2.2));
        const g = gone(c, i);
        return (
          <g key={i}>
            {sparks && fall > 0 && fall < 1 && <Spark x={lerp(DEMON.x, c.x, fall)} y={lerp(DEMON.y + 40, GROUND, fall * fall)} />}
            {grow > 0 && g < 0.99 && <SmokeShape x={c.x} y={lerp(GROUND, c.y, grow)} t={t} size={c.size * grow} seed={c.seed} dissolve={g} opacity={0.8} colour={s.primary} ember={s.accent} />}
          </g>
        );
      })}
    </>
  );
}

// The tall smoke shape: one smoke drawn stretched upwards.
export function Raktabija({ t, strength = 1, dissolve = 0 }: { t: number; strength?: number; dissolve?: number }) {
  if (strength <= 0.01) return null;
  return (
    <g opacity={strength} transform={`translate(${DEMON.x} ${DEMON.y}) scale(1 1.6) translate(${-DEMON.x} ${-DEMON.y})`}>
      <SmokeShape x={DEMON.x} y={DEMON.y} t={t} size={1.25} seed={9} dissolve={dissolve} colour="#5A4E44" ember={s.accent} />
    </g>
  );
}

// The night sky over the battlefield, turning from the Mothers' indigo to smoke.
export function BattleSky({ t, smoke }: { t: number; smoke: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={m.shadow} bottom={m.primary} t={t} />
        <FaintStars t={t} count={36} seed={8} colour={m.highlight} />
        <g opacity={smoke}>
          <Sky top={s.shadow} bottom="#2A221C" t={t} />
        </g>
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={17} baseY={700} height={70} fill="#11121F" />
        <Haze y={680} colour={s.secondary} opacity={0.2 + 0.2 * smoke} t={t} />
      </Layer>
    </>
  );
}

// The ground line, and the Devi and Kali small at the lower left.
export function Ground({ t, devi = 1, pulse = 0 }: { t: number; devi?: number; pulse?: number }) {
  return (
    <>
      <path d={`M -400 ${GROUND} L 2000 ${GROUND} L 2000 1300 L -400 1300 Z`} fill="#07070C" />
      <path d={`M -400 ${GROUND} L 2000 ${GROUND}`} stroke={s.highlight} strokeWidth={2} opacity={0.3} />
      <DivineLight x={240} y={GROUND - 20} t={t} kind="warm" size={0.45} strength={devi} pulse={pulse} />
      <DarkLight x={380} y={GROUND - 20} t={t} size={0.5} strength={devi} pulse={pulse} />
    </>
  );
}

export function Multiplied({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const time = complete ? L[10].end + 2 : t;

  const cam = mixCam(cameraFor('pan', progress(time, 0, at(6)), time), cameraFor('pullBack', progress(time, at(6), L[10].end), time), fadeIn(time, at(6), 4));
  const appear = (i: number) => progress(time, at(1) + 1 + i * 3, at(1) + 4 + i * 3);
  const horizon = 1 - 0.7 * fadeIn(time, at(3), 4);
  const demon = fadeIn(time, at(4), 3);
  const smoke = fadeIn(time, at(9), 6);
  // The thunderbolt (from Aindri, the last light) and the discus (from Vaishnavi).
  const bolt = progress(time, at(7) + 0.4, at(7) + 1.4);
  const disc = progress(time, at(8) + 0.2, at(8) + 1.6);
  const aindri = mothers[6];
  const vaish = mothers[3];

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <BattleSky t={time} smoke={smoke} />
      <Layer depth={0.3}>
        {/* The demon armies on the horizon, thinning as they break. */}
        {Array.from({ length: 9 }, (_, i) => (
          <SmokeShape key={i} x={820 + i * 100} y={670 - (i % 2) * 30} t={time} size={0.45} seed={80 + i} opacity={0.6 * horizon} colour={s.primary} ember={s.accent} />
        ))}
      </Layer>
      <Layer depth={0.5}>
        <Ground t={time} pulse={pulse} />
        <MothersRow t={time} appear={appear} />
        <Raktabija t={time} strength={demon} />
        <Copies t={time} spawnAt={(c) => at(c.line) + c.offset} />
        {/* Aindri's thunderbolt: a flash of light from her to the demon. */}
        {bolt > 0 && bolt < 1 && (
          <g opacity={1 - bolt}>
            <path d={`M ${aindri.x} ${aindri.y} L ${lerp(aindri.x, DEMON.x, 0.4)} ${aindri.y + 60} L ${lerp(aindri.x, DEMON.x, 0.6)} ${aindri.y + 120} L ${DEMON.x} ${DEMON.y - 60}`} stroke="#FFF0C8" strokeWidth={5} fill="none" />
            <Glow x={DEMON.x} y={DEMON.y - 60} r={160} colour="#FFF0C8" opacity={0.6} />
            <SymbolIcon name="thunderbolt" x={lerp(aindri.x, DEMON.x, 0.5)} y={aindri.y + 90} size={1} colour="#FFF0C8" />
          </g>
        )}
        {/* Vaishnavi's discus, arcing across. */}
        {disc > 0 && disc < 1 && (
          <g transform={`rotate(${disc * 720} ${lerp(vaish.x, DEMON.x, easeInOut(disc))} ${lerp(vaish.y, DEMON.y, easeInOut(disc)) - Math.sin(disc * Math.PI) * 180})`}>
            <SymbolIcon name="discus" x={lerp(vaish.x, DEMON.x, easeInOut(disc))} y={lerp(vaish.y, DEMON.y, easeInOut(disc)) - Math.sin(disc * Math.PI) * 180} size={0.9} colour="#93AEF5" />
          </g>
        )}
      </Layer>
    </Stage>
  );
}

// Beat 6: Every blow makes more (a choice).
// The sky full of copies, frozen and breathing, with a low uneasy haze. Each
// option chosen gives a small pulse to the seven lights. At the reveal ("the
// last two together") the Devi's flame and Kali's dark light glow brighter
// side by side.
export function BlowsChoice({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const together = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 3));
  const breathe = 1 + 0.015 * Math.sin(t * 0.7);
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.02 * breathe, rot: 0 }} frozen={frozen} label={beat.title}>
      <BattleSky t={t} smoke={1} />
      <Layer depth={0.5}>
        <Ground t={t} devi={1 + together * 0.8} pulse={pulse} />
        <Glow x={310} y={GROUND - 60} r={260} colour="#F7D27A" opacity={0.3 * together} />
        <MothersRow t={t} appear={() => 1} />
        <Raktabija t={t} />
        <Copies t={t} spawnAt={() => -100} sparks={false} />
      </Layer>
    </Stage>
  );
}
