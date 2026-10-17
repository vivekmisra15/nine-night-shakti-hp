// Beat 15: Today.
// Three present-day vignettes, each with a slow sideways drift, about 20
// seconds each, one after another: a home window at night with festival
// string lights and a diya on the sill; a phone glowing on a desk; a road at
// dawn leading to a new school. No people, just the ordinary warmth of home.

import { progress } from '../../engine/anim';
import { palettes } from '../palettes';
import { Diya, Glow, H, Layer, Particles, Sky, Stage, W, window2 } from '../shared';
import type { VisualProps } from '../types';

const r = palettes.reflective;
const EACH = 20;

function HomeWindow({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#241C2E" />
        <rect x={420} y={120} width={760} height={520} fill="#0E1430" />
        <Sky top="#0E1430" bottom="#1E2A5A" t={t} stars={20} />
        <rect x={420} y={120} width={760} height={520} fill="none" stroke="#3A2A20" strokeWidth={30} />
      </Layer>
      <Layer depth={0.5}>
        {/* Festival string lights across the window, twinkling gently. */}
        {Array.from({ length: 22 }, (_, i) => {
          const x = 430 + i * 35;
          const y = 150 + Math.sin(i / 3.5) * 30 + 30;
          return <circle key={i} cx={x} cy={y} r={6} fill={i % 3 ? r.accent : '#F2B5A7'} opacity={0.6 + 0.4 * Math.sin(t * 2 + i)} />;
        })}
        <rect x={380} y={640} width={840} height={30} fill="#3A2A20" />
        <Diya x={800} y={640} t={t} scale={0.9} />
      </Layer>
    </>
  );
}

function PhoneOnDesk({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.1}>
        <rect x={-400} y={-400} width={W + 800} height={H + 800} fill="#10131F" />
      </Layer>
      <Layer depth={0.6}>
        <rect x={-400} y={560} width={2400} height={500} fill="#2A2018" />
        <Glow x={800} y={560} r={300} colour="#9FB8F0" opacity={0.25 + 0.05 * Math.sin(t * 3)} />
        <rect x={720} y={520} width={160} height={80} rx={12} fill="#0B0C18" transform="skewX(-30) translate(320 0)" />
        <rect x={732} y={528} width={136} height={64} rx={8} fill="#9FB8F0" opacity={0.7} transform="skewX(-30) translate(320 0)" />
      </Layer>
    </>
  );
}

function RoadAtDawn({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top="#5A4E7A" bottom="#F2B5A7" t={t} />
      </Layer>
      <Layer depth={0.3}>
        <rect x={1060} y={380} width={260} height={200} fill="#5A4E7A" />
        <path d="M 1040 380 L 1190 300 L 1340 380 Z" fill="#5A4E7A" />
      </Layer>
      <Layer depth={0.7}>
        <rect x={-400} y={580} width={2400} height={500} fill="#6E7A5A" />
        <path d="M 300 900 L 1150 580 L 1210 580 L 1300 900 Z" fill="#B9A58A" />
        <Particles kind="dust" t={t} count={14} colour="#FFF8E7" opacity={0.4} />
      </Layer>
    </>
  );
}

export function Today({ beat, t, frozen, complete }: VisualProps) {
  const time = complete ? 0 : t % (EACH * 3);
  const shift = (start: number) => ({ x: 60 - 120 * progress(time, start, start + EACH), y: 0, zoom: 1.06, rot: 0 });
  const which = Math.floor(time / EACH);
  const scenes = [HomeWindow, PhoneOnDesk, RoadAtDawn];
  const Scene = scenes[which];
  const fade = complete ? 1 : window2(time, which * EACH, which * EACH + EACH, 1.5);
  return (
    <Stage cam={shift(which * EACH)} frozen={frozen} label={beat.title}>
      <rect width={W} height={H} fill="#000" />
      <g opacity={fade}>
        <Scene t={t} />
      </g>
    </Stage>
  );
}
