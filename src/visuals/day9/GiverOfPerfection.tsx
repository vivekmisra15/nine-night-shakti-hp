// Beat 2: The giver of perfection, and Beat 3: Eight gifts (a choice).
//
// Beat 2, following the narration sentence by sentence:
//   Sentence 0   the lotus opens fully on the water and her warm light settles
//                on it, with a faint head-and-shoulders line in the glow (no
//                features); a faint lion outline lies beside it (her other seat)
//   Sentence 1   four small gold icons fade in: discus, conch, mace, lotus
//   Sentences 2–3 small figures gather in the dark, all turned towards her:
//                sages and musicians (gold outlines), gods as small coloured
//                lights, asuras as soft smoke with ember points (freeze-frame)
//   Sentences 4–7 eight tiny points of light leave the lotus one by one and
//                drift out towards the gathering; on sentence 7 one shrinks to
//                a speck and another swells large
//   Afterwards   the symbols become tappable hotspots (step 2.2)
// The camera cranes up from the water to a wide view.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline, SmokeShape, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Layer, Particles, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, latestCue, linesOf, LotusSeat, Spark, VioletNight } from './kit';

// Her four symbols, around the light.
const icons = [
  { name: 'discus' as const, x: 620, y: 450 },
  { name: 'conch' as const, x: 980, y: 450 },
  { name: 'mace' as const, x: 560, y: 600 },
  { name: 'lotus' as const, x: 1040, y: 600 },
];

// Where each tappable symbol is in the picture (ids match day9.ts).
const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  lotusSeat: { x: 800, y: 715, r: 70 },
  discus: { x: 620, y: 450, r: 50 },
  conch: { x: 980, y: 450, r: 50 },
  mace: { x: 560, y: 600, r: 50 },
  lotus: { x: 1040, y: 600, r: 50 },
  worshippers: { x: 300, y: 600, r: 90 },
  crown: { x: 800, y: 470, r: 40 },
};

// When each spark leaves the lotus: [sentence, seconds after it starts].
const sparkLeaves: [number, number][] = [[4, 0.3], [4, 2.3], [4, 4.3], [5, 0.3], [5, 2.3], [5, 4.3], [6, 0.3], [6, 2.3]];

// Where the eight sparks come to rest: an arc above the gathering.
export const sparkPlaces = Array.from({ length: 8 }, (_, i) => {
  const a = Math.PI * (1.12 + (0.76 * i) / 7);
  return { x: 800 + Math.cos(a) * 520, y: 560 + Math.sin(a) * 300 };
});

// The gathering: sages, musicians, gods and asuras, all turned towards her.
function Gathering({ t, show }: { t: number; show: (i: number) => number }) {
  const people = [
    { x: 110, head: 'topknot' as const, arms: 'anjali' as const },
    { x: 200, head: 'plain' as const, arms: 'heart' as const },
    { x: 290, head: 'topknot' as const, arms: 'anjali' as const },
    { x: 380, head: 'plain' as const, arms: 'anjali' as const },
    { x: 1200, head: 'topknot' as const, arms: 'anjali' as const },
    { x: 1290, head: 'plain' as const, arms: 'heart' as const },
  ];
  return (
    <>
      {/* The gods, as small lights in their own colours. */}
      {(['violet', 'gold', 'blue', 'violet'] as const).map((kind, i) => (
        <g key={i} opacity={show(i)}>
          <DivineLight x={[280, 500, 1100, 1320][i]} y={[260, 190, 190, 260][i]} t={t + i} kind={kind} size={0.22} />
        </g>
      ))}
      {people.map((p, i) => (
        <Outline key={i} x={p.x} y={648} scale={0.3} pose={i % 3 === 1 ? 'sit' : 'stand'} head={p.head} arms={p.arms} lean={p.x < 800 ? 6 : -6} opacity={0.75 * show(i + 1)} />
      ))}
      {/* Asuras too: soft smoke with ember points. */}
      {[1400, 1520].map((x, i) => (
        <SmokeShape key={x} x={x} y={612} t={t} size={0.5} seed={i + 2} colour="#6A5A6A" opacity={0.95 * show(i + 4)} />
      ))}
    </>
  );
}

export function GiverOfPerfection({ beat, t, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = L[L.length - 1].end;
  const T = complete ? end + 10 : t;

  const cam = cameraFor('crane', progress(T, 0, end), T);
  const open = easeInOut(progress(T, at(0), at(0) + 5));
  const light = fadeIn(T, at(0) + 2, 3);
  const outline = 0.22 * fadeIn(T, at(0) + 5, 3);
  const iconShow = (i: number) => fadeIn(T, at(1) + i * 0.8, 1.5);
  const gather = (i: number) => fadeIn(T, at(2) + i * 0.9, 2);

  // The eight sparks leave one by one through sentences 4 to 6 (the score
  // plays a santoor shimmer at the same moments: see day9Score.ts).
  const leaves = (i: number) => at(sparkLeaves[i][0]) + sparkLeaves[i][1];
  const shrink = easeInOut(progress(T, at(7) + 1, at(7) + 4));
  const showHotspots = complete || t >= end;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <VioletNight t={T} />
      <Layer depth={0.35}>
        <Gathering t={T} show={gather} />
      </Layer>
      <Layer depth={0.7}>
        {/* The lion, her other seat, faint beside the lotus. */}
        <SymbolIcon name="lion" x={1090} y={740} size={1.3} opacity={0.22 * open} />
        <LotusSeat x={800} y={720} size={1.2} open={open} t={T} glow={1 + pulse * 0.3} />
        <g opacity={light}>
          <DivineLight x={800} y={640} t={T} kind="warm" size={1.05} pulse={pulse} />
        </g>
        <DeviOutline x={800} y={560} size={1.4} opacity={outline} />
        {icons.map((ic, i) => (
          <SymbolIcon key={ic.name} name={ic.name} x={ic.x} y={ic.y} size={1.2} opacity={iconShow(i)} />
        ))}
        {/* The eight siddhis, leaving the lotus as points of light. */}
        {sparkPlaces.map((p, i) => {
          const go = easeInOut(progress(T, leaves(i), leaves(i) + 3));
          if (go <= 0) return null;
          const r = i === 2 ? lerp(7, 2, shrink) : i === 5 ? lerp(7, 18, shrink) : 7;
          return <Spark key={i} x={lerp(800, p.x, go)} y={lerp(640, p.y, go) - Math.sin(go * Math.PI) * 60} t={T} r={r} seed={i} />;
        })}
        <Particles kind="dust" t={T} count={20} colour="#FFF6E8" opacity={0.3 * light} area={{ x: 560, y: 380, w: 480, h: 320 }} />
      </Layer>

      {/* Tappable hotspots on the symbols (step 2.2). */}
      <Layer depth={0.7}>
        {showHotspots &&
          Object.entries(hotspotPlaces).map(([id, p]) => (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFF6E8"
              fillOpacity={0.06}
              stroke="#FFF6E8"
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

// Beat 3: Eight gifts. The eight sparks hover in front of the viewer,
// breathing, over the lotus. Each choice sends a soft ring out from one
// spark; at "what happens" the sparks dim a little (the warnings).
export function EightGifts({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const dim = reveal < 0 ? 1 : lerp(1, 0.55, progress(reveal, 0, 3));
  const picked = latestCue(cues, 'pick:', false);
  const pickAge = picked >= 0 ? cueAge(cues, `pick:${picked}`, t, false) : -1;
  return (
    <Stage cam={cameraFor('still', 0, t)} frozen={frozen} label={beat.title}>
      <VioletNight t={t} />
      <Layer depth={0.5}>
        <LotusSeat x={800} y={780} size={1} open={1} t={t} opacity={0.6} />
        <DivineLight x={800} y={720} t={t} kind="warm" size={0.7} strength={0.7} pulse={pulse} />
      </Layer>
      <Layer depth={0.9}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = Math.PI * (1.1 + (0.8 * i) / 7);
          const x = 800 + Math.cos(a) * 560;
          const y = 600 + Math.sin(a) * 330 + Math.sin(t * 0.7 + i) * 8;
          return <Spark key={i} x={x} y={y} t={t} r={9 + Math.sin(t * 0.9 + i) * 1.5} opacity={dim} seed={i} />;
        })}
        {pickAge >= 0 && pickAge < 4 && (
          <circle cx={800} cy={420} r={40 + pickAge * 160} fill="none" stroke="#FFF6E8" strokeWidth={3} opacity={0.4 * (1 - pickAge / 4)} />
        )}
      </Layer>
    </Stage>
  );
}
