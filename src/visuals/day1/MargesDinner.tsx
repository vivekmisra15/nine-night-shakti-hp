// Beats 10–11: Aunt Marge's dinner, and "Think it through" after it.
// Abstract only: no characters, no film imagery. The tension shows through
// objects: leaning candle flames, trembling cutlery, a rattling window.
//
// Beat 10, following the retelling sentence by sentence:
//   the week          a slow drift along the dinner table
//   "she turns on his parents"  a push-in on one candle as the insults build:
//                     the flames lean, the cutlery trembles, the window rattles
//   "his magic escapes him"  a soft pressure wave flattens the flames and lifts
//                     the tablecloth. No inflating figure is drawn.
//   "Harry drags his trunk"  the camera pulls back out through the window to
//                     the empty street: one sodium lamp, a trunk on the pavement

import { easeInOut, lerp, progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { type Cam, Candle, fadeIn, Glow, H, Layer, mixCam, Sky, Stage, W } from '../shared';
import type { VisualProps } from '../types';
import { latestCue, linesOf } from './common';

const m = palettes.hogwartsDinner;

// The dinner table and room, at a given level of tension (0 to 1) and
// outburst wave (0 to 1).
export function DinnerRoom({ t, tension, wave, candleGlow = 0 }: { t: number; tension: number; wave: number; candleGlow?: number }) {
  const jitter = (seed: number) => (tension > 0.4 ? Math.sin(t * 40 + seed) * tension * 2.5 : 0);
  const lean = tension * 18 * Math.sin(t * 1.3) + wave * 70;
  const flame = 1 - wave * 0.6;
  return (
    <>
      <Layer depth={0.1}>
        {/* Flowered wallpaper, olive-grey. */}
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill={m.secondary} />
        {Array.from({ length: 60 }, (_, i) => (
          <circle key={i} cx={(i % 12) * 160 - 100} cy={Math.floor(i / 12) * 160 - 80} r={10} fill={m.highlight} opacity={0.08} />
        ))}
        {/* The window, rattling, with the dark street outside. */}
        <g transform={`translate(${jitter(1)} ${jitter(2)})`}>
          <rect x={620} y={60} width={360} height={300} fill="#0F1A2E" />
          <rect x={620} y={60} width={360} height={300} fill="none" stroke="#3A3428" strokeWidth={18} />
          <path d="M 800 60 L 800 360 M 620 210 L 980 210" stroke="#3A3428" strokeWidth={10} />
        </g>
      </Layer>
      <Layer depth={0.3}>
        {/* The heavy overhead lamp, slightly too bright. */}
        <Glow x={800} y={20} r={500} colour={m.highlight} opacity={0.35} />
        <path d="M 760 0 L 840 0 L 880 60 L 720 60 Z" fill={m.primary} />
      </Layer>
      <Layer depth={0.7}>
        {/* The long table; the cloth lifts in the wave. */}
        <path d={`M -100 560 L 1700 560 L 1800 ${900 - wave * 60} Q 800 ${900 - wave * 160} -200 ${900 - wave * 60} Z`} fill="#E9E1CF" />
        <path d="M -100 560 L 1700 560" stroke={m.accent} strokeWidth={6} />
        {[220, 520, 1080, 1380].map((x, i) => (
          <g key={x} transform={`translate(${jitter(i + 3)} 0)`}>
            <ellipse cx={x} cy={640} rx={90} ry={26} fill="#FFFFFF" opacity={0.9} />
            <path d={`M ${x - 120} 620 L ${x - 120} 670 M ${x + 120} 620 L ${x + 120} 670`} stroke="#9A9488" strokeWidth={5} strokeLinecap="round" />
            {/* A glass of wine. */}
            <path d={`M ${x + 60} 560 L ${x + 80} 520 L ${x + 100} 560 Z`} fill={m.accent} opacity={0.8} />
          </g>
        ))}
        {[380, 800, 1220].map((x, i) => (
          <g key={x}>
            <Glow x={x} y={500} r={120} colour={m.highlight} opacity={0.25 + candleGlow * 0.3} />
            <Candle x={x} y={500} t={t + i} scale={1.1} lean={lean * (1 - i * 0.2)} lit={flame} outer={m.primary} />
          </g>
        ))}
      </Layer>
      {/* The shimmer in the air as the anger rises. */}
      {tension > 0.1 && (
        <Layer depth={0.9}>
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M -100 ${150 + i * 120 + Math.sin(t * 2 + i) * 10} Q 400 ${120 + i * 120} 800 ${150 + i * 120 + Math.sin(t * 3 + i) * 12} T 1700 ${150 + i * 120}`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={lerp(0.04, 0.12, tension)} />
          ))}
        </Layer>
      )}
    </>
  );
}

// The empty street at night, with a trunk on the pavement.
function Street({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#070C18" bottom="#0F1A2E" t={t} stars={12} />
      </Layer>
      <Layer depth={0.4}>
        {/* Rows of houses, all the same. */}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M ${i * 220 - 100} 620 L ${i * 220 - 100} 440 L ${i * 220 + 10} 360 L ${i * 220 + 120} 440 L ${i * 220 + 120} 620 Z`} fill="#141E30" />
        ))}
      </Layer>
      <Layer depth={0.7}>
        <rect x={-400} y={620} width={2400} height={400} fill="#1A2233" />
        <rect x={-400} y={700} width={2400} height={20} fill="#2A3245" />
        {/* The sodium street lamp. */}
        <rect x={1096} y={300} width={8} height={420} fill="#2A2A2A" />
        <Glow x={1100} y={310} r={260} colour="#E8A04A" opacity={0.5} />
        <Glow x={1100} y={700} r={220} colour="#E8A04A" opacity={0.25} />
        {/* The trunk, alone on the pavement. */}
        <rect x={980} y={640} width={120} height={64} rx={6} fill="#5A3A22" />
        <path d="M 980 660 L 1100 660 M 1010 640 L 1010 704 M 1070 640 L 1070 704" stroke="#C98A3E" strokeWidth={3} />
      </Layer>
    </>
  );
}

export function MargesDinner({ beat, t, frozen }: VisualProps) {
  // Each moment follows its sentence in the retelling.
  const L = linesOf(beat);
  const at = (n: number) => L[Math.min(n, L.length - 1)].start;
  const insults = at(5); // "she turns on his parents"
  const outburst = at(9); // "his magic escapes him"
  const street = at(10); // "Harry drags his trunk out of the house"

  const tension = easeInOut(progress(t, insults, outburst));
  const wave = easeInOut(progress(t, outburst + 1, outburst + 4.5)) * (1 - 0.6 * progress(t, outburst + 5, outburst + 9));
  const toStreet = fadeIn(t, street - 1, 4);

  // Drift along the table, push in on the centre candle, then pull back out.
  const drift: Cam = { x: lerp(260, -260, progress(t, 0, insults)), y: 0, zoom: 1.08, rot: 0 };
  const push: Cam = { x: 0, y: 40, zoom: lerp(1.08, 1.5, tension), rot: 0 };
  let cam = mixCam(drift, push, easeInOut(progress(t, insults - 1, insults + 2)));
  cam = mixCam(cam, { x: 0, y: 0, zoom: 1.02, rot: 0 }, easeInOut(progress(t, street - 2, street + 6)));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {toStreet < 1 && <DinnerRoom t={t} tension={tension} wave={wave} />}
      {toStreet > 0 && (
        <g opacity={toStreet}>
          <Street t={t} />
        </g>
      )}
    </Stage>
  );
}


// Beat 11: the table frozen at the moment of the insult, softly blurred
// behind the questions. The candle brightens a little as each rung opens.
export function DinnerFrozen({ beat, frozen, complete, cues }: VisualProps) {
  const rungs = latestCue(cues, 'rung:', complete, 6) + 1;
  return (
    <Stage cam={{ x: 0, y: 40, zoom: 1.3, rot: 0 }} frozen={frozen} label={beat.title}>
      <g style={{ filter: 'blur(3px) saturate(0.6)' }}>
        {/* A fixed time: the flame is stopped mid-lean. */}
        <DinnerRoom t={27.3} tension={0.85} wave={0} candleGlow={rungs / 6} />
      </g>
    </Stage>
  );
}
