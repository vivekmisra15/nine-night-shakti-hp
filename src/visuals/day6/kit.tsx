// Drawing pieces made for Night 6 (docs/direction/night-6.md, "New drawing
// pieces"). They live here, not in the shared kit, so other nights are never
// affected:
//
//   GodOrb          a god as a soft orb of light in his own colour
//   GiftIcon        the shared symbol icons, plus the gifts the shared kit
//                   doesn't have (noose, spear, staff, axe, cup, shield,
//                   serpent necklace, third eye)
//   ShadowBeast     Mahishasura as a vast blurred shadow that changes shape
//                   (buffalo, lion, man with a sword, elephant) and can break
//                   apart into drifting smoke
//   RunningLion     the Devi's lion as running gold line-art
//   Throne, Hermitage  small gold outlines
//   Backdrops       the night ridge, the ash plain, the gold dawn

import { useId } from 'react';
import { wobble } from '../../engine/anim';
import { SmokeShape, SymbolIcon, type SymbolName } from '../figures';
import { palettes } from '../palettes';
import { Glow, H, Haze, Layer, Particles, Ridge, Sky, W } from '../shared';

export const GOLD = '#E8B45A';
const FILL = 'rgba(8, 10, 26, 0.55)';
const line = (colour: string, width = 2) => ({
  stroke: colour,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

// ---------------------------------------------------------------------------
// The gods, as light
// ---------------------------------------------------------------------------

// Each god's colour, from the direction brief. The gods are formless: a god
// is only ever a soft orb of light (never a figure).
export interface God {
  id: string;
  colour: string;
  x: number; // where his light sits in Beat 4
  y: number;
  size: number;
}

export const GODS: God[] = [
  { id: 'shiva', colour: '#DCE6FF', x: 320, y: 560, size: 0.7 }, // cool silver
  { id: 'vishnu', colour: '#93AEF5', x: 1280, y: 560, size: 0.7 }, // soft blue
  { id: 'brahma', colour: '#F2B58A', x: 800, y: 720, size: 0.62 }, // soft rose-gold
  { id: 'indra', colour: '#F4F7FF', x: 260, y: 760, size: 0.5 }, // pale lightning white
  { id: 'agni', colour: '#F08A4B', x: 1340, y: 760, size: 0.5 }, // ember orange
  { id: 'yama', colour: '#8A6AD8', x: 130, y: 400, size: 0.45 }, // deep violet
  { id: 'varuna', colour: '#6FD6D0', x: 1470, y: 400, size: 0.45 }, // aqua
  { id: 'vayu', colour: '#B8F0D0', x: 300, y: 200, size: 0.42 }, // pale mint
  // The other gods are small white-gold points.
  { id: 'kala', colour: '#FFF0C8', x: 1300, y: 200, size: 0.32 },
  { id: 'ocean', colour: '#FFF0C8', x: 90, y: 660, size: 0.3 },
  { id: 'vishvakarma', colour: '#FFF0C8', x: 1510, y: 660, size: 0.3 },
  { id: 'himavat', colour: '#FFF0C8', x: 520, y: 840, size: 0.3 },
  { id: 'kubera', colour: '#FFF0C8', x: 1080, y: 840, size: 0.3 },
  { id: 'shesha', colour: '#FFF0C8', x: 800, y: 870, size: 0.28 },
];
export const god = (id: string) => GODS.find((g) => g.id === id) ?? GODS[0];

// A god's light: a glow, a bright core and a slowly widening ring.
// `strength` 0 (out) to about 2 (flaring); 1 is calm.
export function GodOrb({ x, y, t, colour, size = 1, strength = 1 }: { x: number; y: number; t: number; colour: string; size?: number; strength?: number }) {
  const id = useId();
  if (strength <= 0.01) return null;
  const s = size * (1 + wobble(t, 0.8, x) * 0.04);
  const ring = (t * 0.25 + x * 0.001) % 1;
  return (
    <g opacity={Math.min(1, strength)}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="0.35" stopColor={colour} stopOpacity={0.75} />
          <stop offset="1" stopColor={colour} stopOpacity={0} />
        </radialGradient>
      </defs>
      <Glow x={x} y={y} r={150 * s * strength} colour={colour} opacity={0.3} />
      <circle cx={x} cy={y} r={44 * s} fill={`url(#${id})`} />
      <circle cx={x} cy={y} r={(28 + ring * 80) * size} fill="none" stroke={colour} strokeWidth={1.5} opacity={0.45 * (1 - ring)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// The gifts, as small gold outline icons
// ---------------------------------------------------------------------------

export type GiftName = SymbolName | 'noose' | 'spear' | 'staff' | 'axe' | 'cup' | 'shield' | 'serpent' | 'eye';

// The serpent necklace: a sinuous ring of scales with a small hooded head.
const serpentPath =
  Array.from({ length: 41 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    const r = 24 + Math.sin(a * 8) * 3;
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r + 2).toFixed(1)}`;
  }).join(' ') + ' M 0 -22 Q -8 -36 0 -40 Q 8 -36 0 -22';

const extraShapes: Record<Exclude<GiftName, SymbolName>, string> = {
  noose: 'M 18 -16 A 18 18 0 1 0 17.9 -15.9 Z M 4 2 Q 14 18 2 30 Q -6 36 0 40',
  spear: 'M 0 38 L 0 -16 M 0 -16 L -8 -16 L 0 -40 L 8 -16 Z M -6 30 L 6 30',
  staff: 'M 0 38 L 0 -20 M -7 -20 L 7 -20 L 5 -36 Q 0 -42 -5 -36 Z M -5 10 L 5 10',
  axe: 'M -16 36 L 12 -34 M 4 -12 Q 30 -8 36 -32 Q 24 -48 6 -36 Q 14 -24 4 -12 Z',
  cup: 'M -20 -18 L 20 -18 Q 18 8 0 12 Q -18 8 -20 -18 Z M 0 12 L 0 24 M -13 27 L 13 27 M -14 -10 L 14 -10',
  shield: 'M 26 0 A 26 26 0 1 0 -26 0 A 26 26 0 1 0 26 0 Z M 7 0 A 7 7 0 1 0 -7 0 A 7 7 0 1 0 7 0 M -16 -16 L -11 -11 M 16 -16 L 11 -11 M -16 16 L -11 11 M 16 16 L 11 11',
  serpent: serpentPath,
  eye: 'M 0 -24 Q 15 0 0 24 Q -15 0 0 -24 Z M 5 0 A 5 5 0 1 0 -5 0 A 5 5 0 1 0 5 0',
};

export function GiftIcon({ name, x, y, size = 1, colour = GOLD, opacity = 1 }: { name: GiftName; x: number; y: number; size?: number; colour?: string; opacity?: number }) {
  if (opacity <= 0.01) return null;
  if (name in extraShapes) {
    return (
      <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
        <path d={extraShapes[name as keyof typeof extraShapes]} fill={FILL} {...line(colour)} />
      </g>
    );
  }
  return <SymbolIcon name={name as SymbolName} x={x} y={y} size={size} colour={colour} opacity={opacity} />;
}

// ---------------------------------------------------------------------------
// Mahishasura: a vast shadow, never a drawn monster
// ---------------------------------------------------------------------------

// Silhouettes, standing on y = 0, about 600 wide. They are filled dark and
// heavily blurred, so they read as shadow, not as a creature.
export type BeastShape = 'buffalo' | 'lion' | 'man' | 'elephant';
const beastPaths: Record<BeastShape, string> = {
  buffalo:
    'M -300 0 L -282 -70 Q -300 -170 -220 -225 Q -120 -275 40 -252 Q 140 -300 205 -252 Q 262 -230 292 -170 L 332 -120 Q 352 -88 320 -70 L 282 -80 Q 262 -40 252 0 L 202 0 L 190 -62 L 60 -72 L 42 0 L -8 0 L -20 -72 L -160 -82 L -180 0 L -230 0 L -240 -82 Z M 222 -250 Q 250 -340 336 -330 Q 280 -306 262 -244 Z M 186 -250 Q 140 -330 70 -320 Q 128 -300 150 -244 Z',
  lion:
    'M -270 0 L -248 -96 Q -256 -158 -186 -174 L 60 -184 Q 96 -268 182 -268 Q 268 -258 278 -184 Q 288 -122 236 -104 L 224 0 L 174 0 L 162 -84 L 42 -94 L 30 0 L -20 0 L -40 -94 L -150 -94 L -172 0 L -214 0 Z M 182 -200 m -96 0 a 96 96 0 1 0 192 0 a 96 96 0 1 0 -192 0 M -250 -130 Q -330 -150 -324 -236 L -304 -232 Q -306 -166 -240 -150 Z',
  man:
    'M -80 0 L -66 -250 Q -100 -296 -64 -330 L -30 -344 Q -44 -402 0 -414 Q 44 -402 30 -344 L 64 -330 Q 104 -308 92 -252 L 84 0 Z M 70 -318 L 160 -430 L 176 -418 L 92 -296 Z M 164 -420 L 290 -600 L 302 -592 L 180 -410 Z',
  elephant:
    'M -290 0 L -278 -126 Q -290 -268 -124 -288 Q 60 -306 164 -266 Q 266 -288 306 -204 Q 326 -140 306 -60 Q 306 -6 340 20 Q 304 44 280 0 L 272 -100 L 232 -92 L 222 0 L 172 0 L 162 -82 L -100 -92 L -112 0 L -162 0 L -174 -92 L -224 -92 L -236 0 Z M 186 -200 m -70 0 a 70 90 0 1 0 140 0 a 70 90 0 1 0 -140 0',
};

// `shapes` gives how visible each silhouette is (0 to 1), so one can melt into
// the next. `breakApart` (0 to 1) scatters it into drifting smoke that fades.
export function ShadowBeast({ x, y, t, scale = 1, shapes, breakApart = 0, opacity = 1, colour = '#07050C' }: {
  x: number;
  y: number;
  t: number;
  scale?: number;
  shapes: Partial<Record<BeastShape, number>>;
  breakApart?: number;
  opacity?: number;
  colour?: string;
}) {
  const id = useId();
  if (opacity <= 0.01 || breakApart >= 0.99) return null;
  const solid = 1 - Math.min(1, breakApart * 1.6);
  return (
    <g opacity={opacity}>
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={14} />
        </filter>
      </defs>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <g filter={`url(#${id})`} opacity={solid}>
          {(Object.keys(beastPaths) as BeastShape[]).map((k) =>
            (shapes[k] ?? 0) > 0.01 ? <path key={k} d={beastPaths[k]} fill={colour} opacity={0.92 * (shapes[k] ?? 0)} /> : null,
          )}
        </g>
      </g>
      {/* Smoke always curls around the shadow's edges, and takes over as it breaks apart. */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = i * 0.7;
        const drift = breakApart * (220 + i * 30);
        return (
          <SmokeShape
            key={i}
            x={x + (Math.cos(a * 2.3) * 250 + Math.cos(a) * drift) * scale}
            y={y - (120 + Math.sin(a * 1.7) * 100) * scale - breakApart * (80 + i * 20)}
            t={t}
            size={(0.9 + (i % 3) * 0.3) * scale}
            seed={i + 2}
            dissolve={Math.min(0.98, breakApart)}
            opacity={0.75}
            colour="#0C0914"
            ember={i % 3 === 0 ? '#E2552B' : '#0C0914'}
          />
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The lion, running: gold line-art
// ---------------------------------------------------------------------------

export function RunningLion({ x, y, t, scale = 1, opacity = 1, colour = GOLD }: { x: number; y: number; t: number; scale?: number; opacity?: number; colour?: string }) {
  if (opacity <= 0.01) return null;
  const stride = Math.sin(t * 9);
  // The legs swing in pairs: front and back move opposite ways.
  const leg = (hx: number, phase: number) => {
    const s = stride * phase;
    return `M ${hx} -60 Q ${hx + s * 18} -30 ${hx + s * 34} 0`;
  };
  const mane = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 ? 34 : 48;
    return `${i ? 'L' : 'M'} ${-118 + Math.cos(a) * r} ${-104 + Math.sin(a) * r}`;
  }).join(' ') + ' Z';
  return (
    // Facing left (the direction it charges in Beat 6).
    <g transform={`translate(${x} ${y + Math.abs(stride) * -6 * scale}) scale(${scale})`} opacity={opacity} fill="none">
      <path d={mane} fill={FILL} {...line(colour, 1.6)} />
      <path d="M -134 -108 A 18 18 0 1 0 -100 -108 A 18 18 0 1 0 -134 -108" {...line(colour, 1.6)} />
      {/* The long body and back, the belly and the tail with its tuft. */}
      <path d="M -90 -116 Q -10 -120 80 -96 Q 112 -86 110 -62 M -86 -66 Q 0 -54 96 -62" fill={FILL} {...line(colour)} />
      <path d="M 108 -90 Q 160 -110 170 -150 M 170 -150 Q 182 -160 176 -170" {...line(colour, 1.6)} />
      <path d={leg(-70, 1)} {...line(colour)} />
      <path d={leg(-48, -1)} {...line(colour)} />
      <path d={leg(70, -1)} {...line(colour)} />
      <path d={leg(92, 1)} {...line(colour)} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Small gold outlines
// ---------------------------------------------------------------------------

// Indra's throne in the clouds: a stepped seat with a high arched back.
export function Throne({ x, y, scale = 1, opacity = 1, colour = GOLD }: { x: number; y: number; scale?: number; opacity?: number; colour?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none">
      <path d="M -90 0 L 90 0 L 80 -20 L -80 -20 Z M -60 -20 L -60 -70 L 60 -70 L 60 -20" fill={FILL} {...line(colour)} />
      <path d="M -60 -70 L -60 -150 Q 0 -200 60 -150 L 60 -70" fill={FILL} {...line(colour)} />
      <path d="M -40 -150 Q 0 -178 40 -150 M 0 -176 L 0 -192" {...line(colour, 1.3)} />
      <circle cx={0} cy={-198} r={5} {...line(colour, 1.3)} />
    </g>
  );
}

// The sage Katyayana's hermitage: a small thatched hut.
export function Hermitage({ x, y, scale = 1, opacity = 1, colour = GOLD }: { x: number; y: number; scale?: number; opacity?: number; colour?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none">
      <path d="M -90 0 L -90 -80 L 90 -80 L 90 0 Z M -20 0 L -20 -50 Q 0 -64 20 -50 L 20 0" fill={FILL} {...line(colour)} />
      <path d="M -120 -76 Q 0 -190 120 -76 Z" fill={FILL} {...line(colour)} />
      <path d="M -80 -100 Q 0 -150 80 -100 M -50 -128 Q 0 -160 50 -128" {...line(colour, 1.1)} opacity={0.7} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Backdrops
// ---------------------------------------------------------------------------

const g = palettes.n6gatheredLight;
const e = palettes.n6exile;
const d = palettes.n6lionDawn;

// A deep night sky with stars over two low ridges (Beats 1, 8, 14, 15).
export function NightRidge({ t, dim = 1 }: { t: number; dim?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={g.shadow} bottom={g.secondary} t={t} stars={80} starColour={g.highlight} />
      </Layer>
      <Layer depth={0.2} opacity={dim}>
        <Ridge seed={21} baseY={700} height={120} fill="#22264A" />
      </Layer>
      <Layer depth={0.45} opacity={dim}>
        <Haze y={720} colour={g.accent} opacity={0.05} t={t} />
        <Ridge seed={24} baseY={830} height={90} fill="#11142E" />
      </Layer>
    </>
  );
}

// The gods' exile: an ash sky over a grey plain, with soft drifting ash.
export function AshPlain({ t }: { t: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={e.shadow} bottom={e.secondary} t={t} stars={20} starColour={e.highlight} />
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={31} baseY={560} height={130} fill="#3A3D5C" />
      </Layer>
      <Layer depth={0.3}>
        <Haze y={600} colour={e.primary} opacity={0.18} t={t} />
        <Ridge seed={33} baseY={660} height={70} fill="#2C2E44" />
      </Layer>
      <Layer depth={0.6}>
        <path d="M -400 700 Q 800 650 2000 700 L 2000 1300 L -400 1300 Z" fill="#45465A" />
        <path d="M -400 800 Q 800 760 2000 810 L 2000 1300 L -400 1300 Z" fill="#383949" />
      </Layer>
      <Layer depth={0.85}>
        <Particles kind="snow" t={t * 0.4} count={30} colour={e.primary} opacity={0.35} seed={6} />
      </Layer>
    </>
  );
}

// The clear gold dawn: lavender sky warming to gold, low hills, a river.
export function GoldDawn({ t, amount = 1, river = false }: { t: number; amount?: number; river?: boolean }) {
  return (
    <g opacity={amount}>
      <Layer depth={0.05}>
        <Sky top="#8A6E9A" bottom={d.primary} t={t} />
        <Glow x={800} y={660} r={760} colour={d.accent} opacity={0.35} />
        <Glow x={800} y={660} r={420} colour={d.highlight} opacity={0.5} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={41} baseY={650} height={110} fill="#B58AA0" />
      </Layer>
      <Layer depth={0.4}>
        <Haze y={680} colour={d.highlight} opacity={0.3} t={t} />
        <Ridge seed={44} baseY={760} height={70} fill="#8E6E8A" />
      </Layer>
      {river && (
        <Layer depth={0.6}>
          <path d="M -400 820 Q 400 780 800 800 Q 1200 820 2000 790 L 2000 900 Q 1200 880 800 870 Q 400 860 -400 890 Z" fill="#E9D8E4" opacity={0.6} />
        </Layer>
      )}
    </g>
  );
}

// Cover everything (used for fades to black).
export const Black = ({ opacity }: { opacity: number }) => (opacity > 0.001 ? <rect x={-10} y={-10} width={W + 20} height={H + 20} fill="#000" opacity={opacity} /> : null);
