// Beat 8: The tenth day (steps 8.1–8.4). The riverbank at night, the sky
// slowly paling towards the dawn of Vijayadashami. Each vignette fades in on
// its sentence, while the camera pans slowly across.
//
//   8.1  a light pushing back a smoke shape (the Devi and Mahishasura); a bow
//        (Rama); a shami tree with a bow hidden in its branches (Arjuna)
//   8.2  a tall dark effigy outline dissolving into rising embers (no faces,
//        no fire around any person); a lit image-boat floating down the river,
//        with red sindoor dots blooming like petals
//   8.3  a tray of rice with a fingertip line tracing a first letter (no letter
//        is shown); a palace traced in tiny lights; an apta leaf; small
//        palanquins moving along a valley path
//   8.4  books, a pen, a veena-like instrument and a laptop before a diya

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight, SmokeShape, SymbolIcon } from '../figures';
import { cameraFor, fadeIn, Glow, Layer, Ridge, Sky, Stage } from '../shared';
import { narrationLength } from '../../engine/storyTiming';
import type { VisualProps } from '../types';
import { AptaLeaf, Effigy, ImageBoat, linesOf, mixColour, Palace, Palanquin, RiceTray, ShamiTree, Tools, Water } from './kit';
import { day9Palettes } from './palettes';

const v = day9Palettes.n9vijayaDawn;

// The river before dawn. `dawn` (0 to 1) pales the sky towards saffron.
function DawnRiver({ t, dawn }: { t: number; dawn: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={mixColour('#0E0A22', v.shadow, dawn)} bottom={mixColour('#241A4A', v.primary, dawn * 0.8)} t={t} stars={Math.round(60 * (1 - dawn))} starColour={v.highlight} />
        <Glow x={800} y={640} r={800} colour={v.highlight} opacity={0.3 * dawn} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={41} baseY={640} height={90} fill={mixColour('#1A1438', '#4A3A5A', dawn)} />
      </Layer>
      <Layer depth={0.4}>
        <Water y={640} t={t} colour={mixColour('#121A2C', '#3A4A66', dawn)} shimmer={v.highlight} />
      </Layer>
    </>
  );
}

// How far the sky has paled at time t in this step (each step carries on).
const dawnFor = (part: number, t: number, end: number) => lerp(0.15 + part * 0.2, 0.35 + part * 0.2, progress(t, 0, end));

export function TenthDayVictories({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = L[L.length - 1].end;
  const T = complete ? end + 5 : t;
  const cam = cameraFor('pan', progress(T, 0, end), T);
  const push = easeInOut(progress(T, at(2) + 0.5, at(2) + 6));
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <DawnRiver t={T} dawn={dawnFor(0, T, end)} />
      <Layer depth={0.6}>
        {/* The Devi's victory: light pushing a smoke shape back. */}
        <g opacity={fadeIn(T, at(2), 1.5)}>
          <DivineLight x={lerp(300, 360, push)} y={470} t={T} kind="warm" size={0.55} strength={1 + push * 0.3} pulse={pulse} />
          <SmokeShape x={lerp(470, 560, push)} y={400} t={T} size={0.75} seed={6} colour="#7A6A70" dissolve={push * 0.85} />
        </g>
        {/* Rama: a bow. Arjuna: the shami tree, with a bow hidden in it. */}
        <SymbolIcon name="bow" x={820} y={420} size={1.8} opacity={fadeIn(T, at(3), 1.5)} />
        <ShamiTree x={1230} y={470} size={2.2} opacity={fadeIn(T, at(3) + 3, 1.5)} />
      </Layer>
    </Stage>
  );
}

export function TenthDayNorthAndBengal({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = L[L.length - 1].end;
  const T = complete ? end + 5 : t;
  const cam = cameraFor('pan', progress(T, 0, end), T);
  const effigy = fadeIn(T, at(0), 1.5);
  const dissolve = complete ? 1 : progress(T, at(0) + 2, at(0) + 9);
  const boat = fadeIn(T, at(1), 2);
  const float = easeInOut(progress(T, at(3), end));
  const bx = lerp(980, 1260, float);
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <DawnRiver t={T} dawn={dawnFor(1, T, end)} />
      <Layer depth={0.6}>
        {/* North India: an effigy dissolving into embers. */}
        <g opacity={effigy}>
          <Effigy x={420} y={660} t={T} dissolve={dissolve} />
        </g>
      </Layer>
      <Layer depth={0.75}>
        {/* Bengal: the image-boat floating down the river, sindoor dots blooming. */}
        <ImageBoat x={bx} y={740} t={T} opacity={boat} />
        {Array.from({ length: 9 }, (_, i) => {
          const bloom = fadeIn(T, at(3) + 1 + i * 0.6, 2);
          const dx = Math.cos(i * 2.1) * (90 + i * 10);
          const dy = Math.sin(i * 2.1) * 16 + 24;
          return <circle key={i} cx={bx - 60 + dx} cy={740 + dy} r={3 + bloom * 5} fill={v.accent} opacity={0.8 * bloom} />;
        })}
      </Layer>
    </Stage>
  );
}

export function TenthDayRegions({ beat, t, frozen, complete, pulse, stepKind }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const end = narrationLength(beat);
  const T = complete ? end + 8 : t;
  const cam = cameraFor('pan', progress(T, 0, end), T);
  // "Did you know?" (step 8.4): the tools of Ayudha Puja, after the narration.
  const tools = stepKind === 'didYouKnow' || complete ? fadeIn(T, end, 2) : 0;
  const rest = 1 - tools * 0.85;
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <DawnRiver t={T} dawn={dawnFor(2, T, end)} />
      <Layer depth={0.3}>
        {/* Kullu: small palanquins moving along a valley path. */}
        <g opacity={fadeIn(T, at(5), 2) * rest}>
          <path d="M 1100 600 Q 1280 560 1400 580 T 1700 540" fill="none" stroke={v.highlight} strokeWidth={1.4} strokeDasharray="3 8" opacity={0.5} />
          {[0, 1, 2].map((i) => {
            const s = (progress(T, at(5), at(5) + 30) + i * 0.18) % 1;
            return <Palanquin key={i} x={lerp(1120, 1650, s)} y={lerp(596, 548, s) - Math.sin(s * 6) * 8} size={0.7} />;
          })}
        </g>
      </Layer>
      <Layer depth={0.6}>
        {/* Mysuru: the palace traced in tiny lights. */}
        <Palace x={780} y={600} scale={1.1} opacity={fadeIn(T, at(2), 1.5) * rest} lights={progress(T, at(2) + 1, at(2) + 6)} />
        {/* Maharashtra: an apta leaf, given as "gold". */}
        <AptaLeaf x={1080} y={720} size={1.6} opacity={fadeIn(T, at(4), 1.5) * rest} />
      </Layer>
      <Layer depth={0.85}>
        {/* The near bank, where the tray and the tools rest. */}
        <path d="M -400 760 Q 400 720 800 728 Q 1300 736 2000 770 L 2000 1300 L -400 1300 Z" fill="#2A2436" />
        <path d="M -400 760 Q 400 720 800 728 Q 1300 736 2000 770" fill="none" stroke={v.highlight} strokeWidth={1.2} opacity={0.3} />
        {/* Kerala: a first letter traced in rice (no letter is shown). */}
        <RiceTray x={330} y={800} trace={progress(T, at(1), at(1) + 5)} opacity={fadeIn(T, at(0), 1.5) * rest} />
        <Tools x={800} y={790} t={T} opacity={tools} pulse={pulse} />
      </Layer>
    </Stage>
  );
}
