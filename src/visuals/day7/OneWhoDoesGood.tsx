// Beat 8: The one who does good.
//   Sentence 0     the Devi's light as Kalaratri: a dark-light indigo glow
//                  with an ember core, and a faint fine-line outline of head
//                  and shoulders with loose hair lines (no features)
//   Sentence 3     a faint line of lightning light curves round her like a
//                  garland
//   Sentence 4     three small points of light above the outline (her three
//                  eyes), and ember wisps for her fiery breath
//   Sentence 5     a small gold donkey icon
//   Sentences 6–7  four small gold icons: the curved sword, the hook, the
//                  raised open hand (glowing brightest, facing the viewer)
//                  and the lowered open hand. Freeze-frame on the open hand.
//   Symbols step   the eight symbols are tappable; the one being read brightens
//   Did you know?  a faint blue light (Vishnu) resting in a dark, calm sea of
//                  night, slowly waking: the dark night as a night of rest
// The open hand is the centre of the night: never drawn smaller than the rest.

import { easeInOut, progress, wobble } from '../../engine/anim';
import { DivineLight, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { DarkLight, FaintStars, InkNight, linesOf, N7Icon } from './kit';
import { day7Palettes } from './palettes';

const k = day7Palettes.n7kalaratri;

// Where each tappable symbol is in the picture.
export const hotspotPlaces: { id: string; x: number; y: number; r: number }[] = [
  { id: 'abhaya', x: 930, y: 640, r: 58 },
  { id: 'varada', x: 670, y: 670, r: 50 },
  { id: 'weapons', x: 560, y: 500, r: 50 },
  { id: 'weapons', x: 1040, y: 500, r: 50 },
  { id: 'colour', x: 800, y: 620, r: 38 },
  { id: 'eyes', x: 800, y: 318, r: 40 },
  { id: 'hair', x: 650, y: 560, r: 40 },
  { id: 'donkey', x: 800, y: 790, r: 52 },
  { id: 'garland', x: 1015, y: 300, r: 42 },
];

// The lightning garland: a zigzag line along an arc above and around her.
const garland = Array.from({ length: 25 }, (_, i) => {
  const a = Math.PI * (1.08 + (0.84 * i) / 24);
  const r = 300 + (i % 2 ? 7 : -7);
  return `${i ? 'L' : 'M'} ${(800 + Math.cos(a) * r).toFixed(1)} ${(560 + Math.sin(a) * r).toFixed(1)}`;
}).join(' ');

// The "Did you know?" picture: Vishnu's blue light asleep in a dark, calm sea
// under the night, brightening slowly as it wakes.
function SleepingSea({ t, frozen, label }: { t: number; frozen: boolean; label: string }) {
  const wake = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.25));
  return (
    <Stage cam={cameraFor('drift', 0, t)} frozen={frozen} label={label}>
      <InkNight t={t} stars={70} ground={false} />
      <Layer depth={0.5}>
        {/* The calm sea: dark water with long, slow ripples of starlight. */}
        <rect x={-400} y={620} width={2400} height={700} fill="#070A1A" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M -200 ${650 + i * 34} Q 400 ${644 + i * 34 + Math.sin(t * 0.4 + i) * 4} 800 ${650 + i * 34} T 1800 ${650 + i * 34}`} stroke={k.highlight} strokeWidth={1.2} fill="none" opacity={0.08 + 0.02 * i} />
        ))}
        <Glow x={800} y={690} r={300} colour="#6F8FE8" opacity={0.18 * wake} />
        <DivineLight x={800} y={700} t={t} kind="blue" size={0.9} strength={wake} />
      </Layer>
    </Stage>
  );
}

export function OneWhoDoesGood({ beat, t, frozen, complete, cues, onCue, pulse, stepKind }: VisualProps) {
  if (stepKind === 'didYouKnow') return <SleepingSea t={t} frozen={frozen} label={beat.title} />;
  const L = linesOf(beat);
  const at = (i: number) => L[i].start;
  const time = complete ? L[10].end + 2 : t;
  const cam = cameraFor('pushIn', progress(time, 0, L[10].end), time);

  const appear = fadeIn(time, at(0), 4);
  const outline = fadeIn(time, at(0) + 2, 4);
  const lightning = easeInOut(progress(time, at(3), at(3) + 4));
  const eyes = fadeIn(time, at(4), 2);
  const breath = fadeIn(time, at(4) + 4, 3);
  const donkey = fadeIn(time, at(5), 2);
  const weapons = fadeIn(time, at(6), 2);
  const hands = fadeIn(time, at(7), 2.5);
  const showHotspots = complete || time >= L[7].end;
  // The symbol being read brightens; the others rest a little dimmer.
  const open = Object.keys(cues).filter((c) => c.startsWith('hotspot:')).at(-1)?.slice(8);
  const lit = (id: string) => (open ? (open === id ? 1.4 : 0.65) : 1);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <InkNight t={time} stars={70} />
      <Layer depth={0.1}>
        <FaintStars t={time} count={20} seed={9} />
      </Layer>
      <Layer depth={0.8}>
        <g opacity={appear}>
          <DarkLight x={800} y={700} t={time} size={1.6} outline={0.75 * outline * Math.min(1, lit('hair') * 1.2)} pulse={pulse} />
          {open === 'colour' && <Glow x={800} y={560} r={360} colour="#3A3F9E" opacity={0.35} />}
        </g>
        {/* The garland bright as lightning. */}
        {lightning > 0 && (
          <path d={garland} pathLength={1} strokeDasharray={`${lightning} 1`} stroke={k.accent} strokeWidth={2} fill="none" opacity={(0.35 + 0.15 * wobble(time, 3)) * lit('garland')} />
        )}
        {/* Three points of light above her: the three eyes. */}
        <g opacity={eyes * Math.min(1, lit('eyes'))}>
          {[
            [782, 330],
            [818, 330],
            [800, 304],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <Glow x={x} y={y} r={18} colour={k.accent} opacity={0.8} />
              <circle cx={x} cy={y} r={3} fill={k.highlight} />
            </g>
          ))}
        </g>
        {/* Fiery breath: small ember wisps rising. */}
        {breath > 0 && <Particles kind="embers" t={time} count={10} colour="#F08A4B" opacity={0.6 * breath} area={{ x: 770, y: 380, w: 60, h: 140 }} />}
        {/* Her humble mount. */}
        <N7Icon name="donkey" x={800} y={790} size={1.4} colour="#E8B45A" opacity={donkey * Math.min(1, lit('donkey'))} glow={open === 'donkey' ? 1 : 0} />
        {/* Two weapons. */}
        <N7Icon name="curvedSword" x={560} y={500} size={1.4} colour="#E8B45A" opacity={weapons * Math.min(1, lit('weapons'))} glow={open === 'weapons' ? 1 : 0} />
        <N7Icon name="hook" x={1040} y={500} size={1.4} colour="#E8B45A" opacity={weapons * Math.min(1, lit('weapons'))} glow={open === 'weapons' ? 1 : 0} />
        {/* The giving hand, lowered. */}
        <g opacity={hands * Math.min(1, lit('varada'))}>
          {open === 'varada' && <Glow x={670} y={670} r={90} colour="#F2DA8F" opacity={0.5} />}
          <SymbolIcon name="varada" x={670} y={670} size={1.5} colour="#E8B45A" />
        </g>
        {/* The raised open hand, "do not fear": the brightest thing in the picture, facing you. */}
        <g opacity={hands}>
          <Glow x={930} y={630} r={130} colour="#F7D27A" opacity={(0.45 + 0.1 * Math.sin(time * 1.2)) * (open && open !== 'abhaya' ? 0.7 : 1)} />
          <SymbolIcon name="abhaya" x={930} y={640} size={1.9} colour="#FFE9A8" />
        </g>
      </Layer>

      {/* Tappable hotspots on the eight symbols. */}
      <Layer depth={0.8}>
        {showHotspots &&
          hotspotPlaces.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFF8E7"
              fillOpacity={0.06}
              stroke="#FFF8E7"
              strokeWidth={2.5}
              opacity={0.25 + 0.25 * (0.5 + 0.5 * Math.sin(time * Math.PI + i))}
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
