// Beat 7: Katyayani. Where the name comes from, at dawn by a quiet river.
//   Sentences 0–1  the gold dawn after the battle; a slow drift
//   Sentences 2–4  a small hermitage outline with the seated sage Katyayana
//                  (a topknot); her light comes down and settles there
//   Sentence 5     the sage joins his palms: her first worshipper
//   Sentence 6     the gods' lights shine faintly in the sky, praising her
//   Sentences 7–8  small veiled outlines at the river's edge with diyas: the
//                  cowherd girls of Vraja
//   Sentences 9–10 her six symbols appear around her light as gold icons,
//                  with the faint outline within it; they become the
//                  tappable hotspots (lion, sword, lotus, raised palm,
//                  lowered palm, third eye)

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, Diya, fadeIn, Glow, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { GiftIcon, type GiftName, GodOrb, GODS, GoldDawn, Hermitage } from './kit';

const d = palettes.n6lionDawn;
const C = { x: 800, y: 500 }; // where her light settles

// Where each symbol sits around her light; the ids match the content's hotspots.
export const symbolPlaces: { id: string; icon: GiftName; x: number; y: number; r: number }[] = [
  { id: 'lion', icon: 'lion', x: 800, y: 740, r: 60 },
  { id: 'sword', icon: 'sword', x: 590, y: 380, r: 55 },
  { id: 'lotus', icon: 'lotus', x: 1010, y: 380, r: 55 },
  { id: 'abhaya', icon: 'abhaya', x: 600, y: 580, r: 55 },
  { id: 'varada', icon: 'varada', x: 1000, y: 580, r: 55 },
  { id: 'eye', icon: 'eye', x: 800, y: 250, r: 50 },
];

export function Katyayani({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const T = complete ? 10000 : t;
  const cam = cameraFor('drift', 0, T);

  const hermitage = fadeIn(T, at(2) - 1, 3);
  const descend = easeInOut(progress(T, at(2), at(2) + 8));
  const worship = T >= at(5) + 1;
  const gods = fadeIn(T, at(6), 3) * (1 - 0.5 * fadeIn(T, at(9), 3));
  const girls = fadeIn(T, at(7), 3);
  const symbols = fadeIn(T, at(9), 3);
  const showHotspots = complete || T >= at(9) + 1;
  const quiet = 1 - 0.45 * symbols; // the scene steps back when the symbols come

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <GoldDawn t={T} river />

      <Layer depth={0.15} opacity={gods}>
        {/* Sentence 6: the gods praise her by name. */}
        {GODS.slice(0, 8).map((g, i) => {
          const a = Math.PI * (1.12 + (0.76 * i) / 7);
          return <GodOrb key={g.id} x={800 + Math.cos(a) * 680} y={460 + Math.sin(a) * 340} t={T} colour={g.colour} size={0.3} />;
        })}
      </Layer>

      <Layer depth={0.65}>
        <g opacity={hermitage * quiet}>
          {/* The sage Katyayana's hermitage, and the sage seated before it. */}
          <Hermitage x={260} y={800} scale={0.9} colour="#7A5A3A" />
          <Outline x={430} y={830} scale={0.42} pose="sit" head="topknot" arms={worship ? 'anjali' : 'rest'} colour="#6E4E3A" />
        </g>
        <g opacity={girls * quiet}>
          {/* Sentences 7–8: the cowherd girls at the river's edge, with diyas. */}
          {[1180, 1290, 1400].map((x, i) => (
            <g key={x}>
              <Outline x={x} y={850} scale={0.36} pose="kneel" head="veiled" arms="anjali" colour="#7A4E6A" />
              <Diya x={x + 40} y={858} t={T + i} scale={0.32} pulse={pulse} />
            </g>
          ))}
        </g>
      </Layer>

      <Layer depth={0.5}>
        {/* Her light comes down to the hermitage and settles. */}
        <Glow x={C.x} y={lerp(120, C.y, descend) - 60} r={330} colour={d.highlight} opacity={0.5 + pulse * 0.05} />
        <DivineLight x={C.x} y={lerp(160, C.y + 80, descend)} t={T} kind="warm" size={1.4} pulse={pulse} />
        <DeviOutline x={C.x} y={C.y + 10} size={1.5} opacity={0.34 * symbols} colour="#FFF8E7" />
        {symbolPlaces.map((p) => (
          <GiftIcon key={p.id} name={p.icon} x={p.x} y={p.y} size={1.4} colour="#9A6A1E" opacity={symbols} />
        ))}
        <Particles kind="dust" t={T} count={22} colour={d.highlight} opacity={0.5} area={{ x: 450, y: 200, w: 700, h: 600 }} />
      </Layer>

      {/* The tappable symbols. */}
      <Layer depth={0.5}>
        {showHotspots &&
          symbolPlaces.map((p) => (
            <circle
              key={p.id}
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
              aria-label={`Learn about the ${p.id}`}
              onClick={() => onCue(`hotspot:${p.id}`)}
            />
          ))}
      </Layer>
    </Stage>
  );
}
