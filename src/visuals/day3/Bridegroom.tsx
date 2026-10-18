// Beat 2: Waiting for the bridegroom.
//   Sentences 0–2  Himavat's palace as fine gold line-art on the mountain,
//                  hung with marigold garlands; Mena (a veiled outline) and
//                  the sage Narada (a topknot outline) wait on the terrace
//   Sentences 3–7  the gods pass across the sky as trails of light, each its
//                  own colour: Indra white-gold, the moon pale silver, the sun
//                  warm gold, Brihaspati soft amber. Each pauses over the
//                  palace, and Narada gives a small shake of the head.
//   The end        the last trail fades and the valley path is empty
// The camera pans slowly along the procession's way.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { cameraFor, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { godColours, Ground, MenaAndNarada, MountainKingdom, Orb, Palace } from './kit';

const w = palettes.n3weddingDay;

// Where a passing god is, `age` seconds after it appears: it glides in from
// the right, pauses above the palace, then glides away to the left.
const ENTER = 1.6;
const PAUSE = 1.4;
const LEAVE = 1.8;
function godPlace(age: number) {
  if (age < ENTER) {
    const p = easeInOut(age / ENTER);
    return { x: lerp(1800, 760, p), y: lerp(170, 230, p), on: Math.min(1, age / 0.5) };
  }
  if (age < ENTER + PAUSE) return { x: 760, y: 230, on: 1 };
  const p = easeInOut(Math.min(1, (age - ENTER - PAUSE) / LEAVE));
  return { x: lerp(760, -200, p), y: lerp(230, 190, p), on: 1 - p };
}

function PassingGod({ t, start, colour, size }: { t: number; start: number; colour: { glow: string; core: string }; size: number }) {
  const age = t - start;
  if (age < 0 || age > ENTER + PAUSE + LEAVE) return null;
  const here = godPlace(age);
  return (
    <g>
      {/* A short tail of light behind it. */}
      {[0.45, 0.3, 0.15].map((back, i) => {
        const p = godPlace(Math.max(0, age - back));
        return <circle key={i} cx={p.x} cy={p.y} r={size * (0.5 - i * 0.1)} fill={colour.glow} opacity={0.18 * here.on * (1 - i * 0.2)} />;
      })}
      <Orb x={here.x} y={here.y} t={t} r={size} glow={colour.glow} core={colour.core} opacity={here.on} />
    </g>
  );
}

export function Bridegroom({ beat, t, duration, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const cam = cameraFor('pan', complete ? 1 : progress(t, 0, duration), t);

  // When each god appears (counting from the sentence that names it).
  const gods = [
    { start: at(4), colour: godColours.indra, size: 30 },
    { start: at(6), colour: godColours.moon, size: 24 },
    { start: at(6) + 2.6, colour: godColours.sun, size: 32 },
    { start: at(6) + 5.2, colour: godColours.brihaspati, size: 24 },
  ];
  // Narada shakes his head during each god's pause.
  const pausing = gods.find((g) => t - g.start > ENTER && t - g.start < ENTER + PAUSE);
  const shake = pausing ? Math.sin((t - pausing.start - ENTER) * 14) * 9 : 0;
  const people = complete ? 1 : progress(t, 0, 2.5);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <MountainKingdom t={t} dusk={0} />
      <Layer depth={0.2}>{!complete && gods.map((g, i) => <PassingGod key={i} t={t} start={g.start} colour={g.colour} size={g.size} />)}</Layer>
      <Layer depth={0.45}>
        <Palace x={420} y={650} />
      </Layer>
      <Layer depth={0.7}>
        <Ground />
        <MenaAndNarada naradaTilt={shake} opacity={people} />
      </Layer>
      <Layer depth={0.95}>
        {/* Marigold petals drifting on the festival air. */}
        <Particles kind="petals" t={t} count={22} colour={w.primary} opacity={0.75} seed={3} />
      </Layer>
    </Stage>
  );
}
