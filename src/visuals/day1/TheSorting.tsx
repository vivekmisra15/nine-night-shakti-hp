// Beats 12–13: The Sorting, and "Think it through" after it.
// Abstract only: no hat, no crests, no characters. The choice is told with
// two paths of light (warm gold and cool silver-blue, not house colours).
//
// Beat 12, following the retelling sentence by sentence:
//   0–13 s   a brisk glide under floating candles, then down to a single
//            empty stool in a pool of light, where the picture waits
//   "the Hat speaks"  two paths of light draw in from the stool
//   "not Slytherin" … "Gryffindor"  the gold path brightens and the candles
//            lean towards it; the other dims to 20% but stays
//   "A year later"  dissolve to a quiet room at dawn, and a slow push to the
//            tall window; dust in the light

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, Candle, fadeIn, Glow, H, Layer, LightTrail, mixCam, Particles, rand, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from './common';

const gh = palettes.greatHall;

function Hall({ t, choose, lean, equal = false }: { t: number; choose: number; lean: number; equal?: boolean }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={gh.shadow} bottom={gh.primary} t={t} stars={90} starColour={gh.accent} />
      </Layer>
      <Layer depth={0.35}>
        {/* Floating candles, bobbing gently. */}
        {Array.from({ length: 34 }, (_, i) => {
          const x = rand(i, 30) * 1800 - 100;
          const y = 120 + rand(i, 31) * 320 + Math.sin(t * ((2 * Math.PI) / 3) + i) * 4;
          return <Candle key={i} x={x} y={y} t={t + i} scale={0.4 + rand(i, 32) * 0.3} lean={lean} outer={gh.secondary} />;
        })}
      </Layer>
      <Layer depth={0.6}>
        {/* Long tables as lines of candlelight. */}
        {[560, 640, 720].map((y, i) => (
          <path key={y} d={`M -200 ${y} L 1800 ${y + 40 * (i - 1)}`} stroke={gh.secondary} strokeWidth={4} opacity={0.4} />
        ))}
      </Layer>
      <Layer depth={0.85}>
        <Glow x={800} y={760} r={220} colour={gh.highlight} opacity={0.4} />
        {/* The single empty stool. */}
        <rect x={760} y={720} width={80} height={14} rx={4} fill="#5A3A22" />
        <path d="M 772 734 L 764 820 M 828 734 L 836 820" stroke="#5A3A22" strokeWidth={8} />
        {/* The two paths of light: one brightens, the other dims but stays. */}
        <LightTrail d="M 800 760 Q 600 700 300 460" amount={Math.min(1, choose * 3.3)} colour="#E8B45A" t={t} width={7} opacity={equal ? 0.8 : lerp(0.6, 1, choose)} />
        <LightTrail d="M 800 760 Q 1000 700 1300 460" amount={Math.min(1, choose * 3.3)} colour="#B9C8E8" t={t} width={7} opacity={equal ? 0.8 : lerp(0.6, 0.2, choose)} />
      </Layer>
    </>
  );
}

function DawnRoom({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#2A3048" />
        {/* The tall window at dawn. */}
        <rect x={640} y={80} width={320} height={560} rx={160} fill="#C9D8F0" />
        <path d="M 800 80 L 800 640 M 640 360 L 960 360" stroke="#2A3048" strokeWidth={10} />
        <Glow x={800} y={360} r={420} colour="#DCE6FF" opacity={0.3} />
      </Layer>
      <Layer depth={0.6}>
        <Particles kind="dust" t={t} count={30} colour="#FFF0C8" opacity={0.5} area={{ x: 600, y: 200, w: 400, h: 600 }} />
        <rect x={300} y={740} width={1000} height={30} fill="#3A2A20" />
        {/* One candle burning low. */}
        <Candle x={520} y={700} t={t} scale={0.6} outer={gh.secondary} />
      </Layer>
    </>
  );
}

export function TheSorting({ beat, t, duration, frozen }: VisualProps) {
  // Each moment follows its sentence in the retelling; the camera moves are
  // brisk, then the picture waits for the words.
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const hatSpeaks = at(4); // "Now the Hat speaks inside Harry's head"
  const begs = at(6); // "Harry silently begs: not Slytherin"
  const gryffindor = at(7); // "the Hat calls out Gryffindor"
  const yearLater = at(8); // "A year later Harry is troubled"

  // The two paths draw in as the Hat speaks, then the gold one wins.
  const choose = 0.3 * easeInOut(progress(t, hatSpeaks, hatSpeaks + 3)) + 0.7 * easeInOut(progress(t, begs, gryffindor + 1));
  const toDawn = fadeIn(t, yearLater, 3);
  const glide: Cam = { x: lerp(-200, 200, progress(t, 0, 8)), y: -60, zoom: 1.1, rot: 0 };
  const descend: Cam = { x: 0, y: -260, zoom: 1.3, rot: 0 };
  let cam = mixCam(glide, descend, easeInOut(progress(t, 7, 13)));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.05, rot: 0 }, easeInOut(progress(t, hatSpeaks - 1, hatSpeaks + 3)));
  cam = mixCam(cam, { x: 0, y: 60, zoom: lerp(1, 1.25, progress(t, yearLater, duration)), rot: 0 }, toDawn);

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toDawn < 1 && <Hall t={t} choose={choose} lean={-choose * 10} />}
      {toDawn > 0 && (
        <g opacity={toDawn}>
          <DawnRoom t={t} />
        </g>
      )}
    </Stage>
  );
}


// Beat 13: the two paths of light, frozen and blurred behind the questions.
// They glow equally, so the stance line stays neutral.
export function PathsFrozen({ beat, t, frozen }: VisualProps) {
  return (
    <Stage cam={{ x: 0, y: 0, zoom: 1.05, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(2px) saturate(0.7)' }}>
        <Hall t={t} choose={1} lean={0} equal />
      </g>
    </Stage>
  );
}
