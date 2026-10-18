// Beat 4: Half of Shiva, in two tellings (steps 4.1 and 4.2).
// Shiva and Shakti are formless: Shiva a cool silver light, the Devi a warm
// light, and Ardhanarishvara one tall oval of light, half silver and half
// warm saffron, joined by a soft seam. No body is drawn.
//
// Step 4.1 (devotional tradition):
//   Sentence 0   Shiva's silver light bows before a great warm light
//   Sentence 1   the warm light flows into the silver, and the two move together
//   Sentence 2   one oval of light stands on the lotus (freeze-frame: one being)
//
// Step 4.2 (Shiva Purana):
//   Sentence 0–1 Brahma, a soft gold light, in a bare, still world
//   Sentence 2   he meditates, and the one oval appears before him
//   Sentence 3   a thread of warm light leaves the oval for a small outline
//                palace (Daksha's house)
//   Sentences 4–5 the warm light returns and merges back
//   Sentences 6–8 a moment's cross-fade to Night 1's single flame on Kailasa,
//                then back

import { easeInOut, lerp, progress } from '../../engine/anim';
import { KailasaBackdrop } from '../day1/common';
import { DivineLight } from '../figures';
import { cameraFor, Diya, fadeIn, fadeOut, Glow, Layer, LightTrail, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { JoinedLight, linesOf, LotusSeat, Palace } from './kit';
import { day9Palettes } from './palettes';

const a = day9Palettes.n9ardhanari;

// The night sky over a bare land, shared by both steps.
function ArdhanariSky({ t, bare = 0 }: { t: number; bare?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={a.shadow} bottom="#2A2E5A" t={t} stars={60} starColour={a.highlight} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={31} baseY={700} height={110} fill="#1E2244" />
      </Layer>
      <Layer depth={0.45}>
        <Ridge seed={33} baseY={820} height={70} fill={bare > 0 ? '#2A2630' : '#161A38'} />
      </Layer>
    </>
  );
}

export function HalfOfShivaDevotional({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? L[L.length - 1].end + 5 : t;

  const cam = cameraFor('pushIn', progress(T, at(3), at(3) + 20) * 0.5, T);
  const bow = easeInOut(progress(T, at(0) + 1, at(0) + 4));
  const flow = easeInOut(progress(T, at(1), at(1) + 5));
  const joined = fadeIn(T, at(1) + 3.5, 2.5);
  const apart = 1 - joined;

  const silver = { x: lerp(600, 800, flow), y: lerp(560 + bow * 22, 540, flow) };
  const warm = { x: lerp(1010, 800, flow), y: lerp(500, 540, flow) };

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <ArdhanariSky t={T} />
      <Layer depth={0.7}>
        <LotusSeat x={800} y={770} size={1.15} open={1} t={T} colour="#F4B6C2" />
        {/* The warm light flowing into the silver, as a thread of light. */}
        <LightTrail d={`M 1010 500 Q 900 420 ${silver.x} ${silver.y}`} amount={progress(T, at(1), at(1) + 3) * apart} colour={a.secondary} width={4} t={T} opacity={0.6} />
        <g opacity={apart}>
          <DivineLight x={silver.x} y={silver.y} t={T} kind="silver" size={0.6} strength={1 - bow * 0.25} pulse={pulse} />
          <DivineLight x={warm.x} y={warm.y + 60} t={T} kind="warm" size={lerp(1.5, 0.7, flow)} pulse={pulse} />
        </g>
        {/* One being: half silver, half warm. */}
        <JoinedLight x={800} y={560} t={T} size={1} opacity={joined} pulse={pulse} />
        <Particles kind="dust" t={T} count={22} colour={a.highlight} opacity={0.35 * joined} area={{ x: 600, y: 320, w: 400, h: 460 }} />
      </Layer>
    </Stage>
  );
}

// The path of the warm thread from the oval to Daksha's house.
const toPalace = 'M 860 520 Q 1080 380 1290 560';

export function HalfOfShivaPurana({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = L[L.length - 1].end;
  const T = complete ? end + 5 : t;

  const cam = cameraFor('orbit', progress(T, 0, end), T);
  const bare = fadeIn(T, at(1), 2);
  const meditate = T > at(2) ? 1 + 0.25 * Math.sin((T - at(2)) * 1.2) ** 2 : 1;
  const oval = fadeIn(T, at(2) + 2, 3);
  const thread = progress(T, at(3), at(3) + 4);
  // The small warm light: out to the palace, back, then merging.
  const out = easeInOut(progress(T, at(3) + 1, at(3) + 5));
  const back = easeInOut(progress(T, at(5), at(5) + 3));
  const along = out * (1 - back);
  const traveller = T > at(3) + 1 ? fadeOut(T, at(5) + 2.6, 0.8) : 0;
  // The point along the curve (a quadratic Bezier).
  const q = (p0: number, p1: number, p2: number, s: number) => (1 - s) ** 2 * p0 + 2 * (1 - s) * s * p1 + s * s * p2;
  const tx = q(860, 1080, 1290, along);
  const ty = q(520, 380, 560, along);
  // Night 1's flame on Kailasa, for a moment.
  const memory = Math.min(fadeIn(T, at(6), 2), fadeOut(T, at(8) + 3, 2));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <ArdhanariSky t={T} bare={bare} />
      <Layer depth={0.55}>
        <Palace x={1290} y={640} scale={0.75} opacity={0.4 + 0.5 * fadeIn(T, at(3) + 3, 2)} lights={0} />
        <Glow x={1290} y={590} r={120} colour={a.secondary} opacity={0.3 * fadeIn(T, at(3) + 4, 2) * (1 - back)} />
      </Layer>
      <Layer depth={0.7}>
        {/* Brahma, the creator: a soft gold light, meditating. */}
        <DivineLight x={330} y={560} t={T} kind="gold" size={0.42} strength={meditate} pulse={pulse} />
        <LotusSeat x={800} y={720} size={0.9} open={oval} t={T} opacity={oval} />
        <JoinedLight x={800} y={530} t={T} size={0.8} opacity={oval} pulse={pulse} />
        <LightTrail d={toPalace} amount={thread * (1 - back)} colour={a.secondary} width={3} t={T} opacity={0.55} />
        {traveller > 0 && (
          <g opacity={traveller}>
            <Glow x={tx} y={ty} r={50} colour={a.secondary} opacity={0.7} />
            <circle cx={tx} cy={ty} r={6} fill={a.highlight} />
          </g>
        )}
      </Layer>
      {/* "That is where our first night began": Night 1's flame on Kailasa. */}
      {memory > 0 && (
        <g opacity={memory}>
          <KailasaBackdrop t={T} snow={false} />
          <Layer depth={1}>
            <path d="M 560 790 Q 800 770 1040 790 L 1060 900 L 540 900 Z" fill="#141A33" />
            <Glow x={800} y={800} r={160} colour="#F29F3D" opacity={0.25} />
            <Diya x={800} y={780} t={T} scale={1.1} pulse={pulse} />
          </Layer>
        </g>
      )}
    </Stage>
  );
}
