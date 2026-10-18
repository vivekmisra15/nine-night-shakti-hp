// Drawing pieces made for Night 3 (docs/direction/night-3.md, "New drawing
// pieces"). They follow the same rules as the shared kit: everything is drawn
// from the time value t, so pause, replay and slow motion just work.

import { useId } from 'react';
import { clamp, easeOut, lerp, wobble } from '../../engine/anim';
import { GOLD, Outline } from '../figures';
import { palettes } from '../palettes';
import { Glow, Haze, Layer, Particles, rand, Ridge, Sky } from '../shared';

const k = palettes.kailasa;

// ---------------------------------------------------------------------------
// The bell-moon: the night's signature. A thin crescent with its horns turned
// down, so it also reads as a bell, with a small loop above and a clapper
// below. `glow` 0 to 1 brightens it.
// ---------------------------------------------------------------------------

// The crescent is the space between two circles: the outer one (radius 1)
// and a smaller one set a little lower (radius 0.9, centre 0.3 down). They
// cross at (±0.884, 0.467), which become the bell's lower rim.
const crescent = 'M -0.884 0.467 A 1 1 0 1 1 0.884 0.467 A 0.9 0.9 0 1 0 -0.884 0.467 Z';

export function BellMoon({ x, y, size = 40, glow = 0.6, opacity = 1, t = 0 }: { x: number; y: number; size?: number; glow?: number; opacity?: number; t?: number }) {
  const id = useId();
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={size * (3 + glow * 2)} colour="#FFF6DC" opacity={0.18 + 0.25 * glow} />
      <defs>
        {/* Moon-silver at the top fading into bell-gold at the rim. */}
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDE4F2" />
          <stop offset="1" stopColor="#E8B84A" />
        </linearGradient>
      </defs>
      <g transform={`translate(${x} ${y}) scale(${size})`}>
        <path d={crescent} fill={`url(#${id})`} opacity={0.75 + 0.25 * glow} />
        {/* The loop it hangs from, and the clapper, as fine gold lines. */}
        <circle cx={0} cy={-1.12} r={0.1} fill="none" stroke={GOLD} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        <circle cx={0} cy={0.62 + wobble(t, 0.6) * 0.02} r={0.09} fill="#FFF6DC" opacity={0.8} />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------------------
// Sound rings: slow concentric rings of light spreading from a point. They
// calm or dissolve what they reach and never strike anything.
// ---------------------------------------------------------------------------

export function SoundRings({ x, y, t, start, count = 3, interval = 1.4, life = 6, maxR = 700, colour = '#FFF6DC', width = 3, opacity = 0.6 }: {
  x: number;
  y: number;
  t: number;
  start: number;
  count?: number;
  interval?: number;
  life?: number;
  maxR?: number;
  colour?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <g fill="none" stroke={colour}>
      {Array.from({ length: count }, (_, i) => {
        const age = t - (start + i * interval);
        if (age < 0 || age > life) return null;
        const p = age / life;
        return <circle key={i} cx={x} cy={y} r={20 + maxR * easeOut(p)} strokeWidth={width * (1 - p * 0.6)} opacity={opacity * (1 - p)} />;
      })}
    </g>
  );
}

// How far a ring started at `start` has spread at time t (its radius), so a
// picture can change something exactly when a ring reaches it.
export const ringRadius = (t: number, start: number, life = 6, maxR = 700) => (t < start ? 0 : 20 + maxR * easeOut(clamp((t - start) / life)));

// ---------------------------------------------------------------------------
// An orb of light in a colour of its own: a god passing in the sky, or an
// abstract light in a Hogwarts scene. Soft glow, bright core, one slow ring.
// ---------------------------------------------------------------------------

export function Orb({ x, y, t, r = 30, glow, core, opacity = 1 }: { x: number; y: number; t: number; r?: number; glow: string; core: string; opacity?: number }) {
  if (opacity <= 0.01) return null;
  const ring = (t * 0.3 + x * 0.002) % 1;
  return (
    <g opacity={opacity}>
      <Glow x={x} y={y} r={r * 4.5} colour={glow} opacity={0.35} />
      <Glow x={x} y={y} r={r * 1.6} colour={core} opacity={0.9} />
      <circle cx={x} cy={y} r={r * 0.45} fill={core} />
      <circle cx={x} cy={y} r={r * (1 + ring * 2)} fill="none" stroke={glow} strokeWidth={1.5} opacity={0.5 * (1 - ring)} />
    </g>
  );
}

// The four gods who pass before Shiva (Beat 2), each its own colour.
export const godColours = {
  indra: { glow: '#F4E3A8', core: '#FFFBEA' }, // bright white-gold
  moon: { glow: '#C9D3E6', core: '#F4F6FA' }, // pale silver
  sun: { glow: '#F4A93B', core: '#FFE8B0' }, // warm gold
  brihaspati: { glow: '#E8B060', core: '#FFF1D2' }, // soft amber
};

// ---------------------------------------------------------------------------
// The gana crowd: Shiva's wild attendants as flickering shapes of shadow and
// ember light, rushing like wind. They are friends, not demons, so there are
// no faces, claws or monstrous detail. `friendly` (0 to 1) turns each shape
// into a warm point of light (Beat 6).
// ---------------------------------------------------------------------------

export function GanaCrowd({ t, rush = 0, friendly = 0, opacity = 1, count = 18 }: { t: number; rush?: number; friendly?: number; opacity?: number; count?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        // Each shape's place along the valley, carried along by the rush.
        const baseX = 640 + rand(i, 31) * 960 - rush * 260 * (0.6 + rand(i, 32));
        const baseY = 690 + rand(i, 33) * 140;
        const sway = wobble(t, 1.4 + rand(i, 34), i) * 14;
        const s = 1 + rand(i, 35) * 0.8;
        const flicker = 0.6 + 0.4 * Math.sin(t * (3 + rand(i, 36) * 3) + i);
        const x = baseX + sway;
        const y = baseY + wobble(t, 0.9, i + 3) * 6;
        // A shape leaning into the wind: a tall soft flame of shadow.
        const lean = 18 * s;
        const shape = `M ${x - 26 * s} ${y} Q ${x - 30 * s} ${y - 60 * s} ${x - lean * 0.3} ${y - 110 * s} Q ${x + lean} ${y - 70 * s} ${x + 24 * s} ${y} Z`;
        return (
          <g key={i}>
            <g opacity={1 - friendly}>
              <path d={shape} fill="#241C38" opacity={0.85} />
              <path d={shape} fill="none" stroke="#C9D3E6" strokeWidth={1.4} opacity={0.5 * flicker} />
              {/* One or a few ember points, scattered: never a pair of eyes. */}
              {Array.from({ length: 1 + (i % 3) }, (_, j) => (
                <circle key={j} cx={x + (rand(i * 7 + j, 37) - 0.5) * 30 * s} cy={y - (30 + rand(i * 7 + j, 38) * 60) * s} r={3 * s} fill="#E07A3C" opacity={flicker * 0.9} />
              ))}
              {/* Some carry a drum or a horn, glinting gold. */}
              {i % 4 === 0 && <ellipse cx={x + 22 * s} cy={y - 48 * s} rx={10 * s} ry={13 * s} fill="none" stroke={GOLD} strokeWidth={1.4} opacity={0.5 + 0.4 * flicker} />}
              {i % 5 === 2 && <path d={`M ${x + 6 * s} ${y - 80 * s} Q ${x + 34 * s} ${y - 96 * s} ${x + 44 * s} ${y - 120 * s}`} fill="none" stroke={GOLD} strokeWidth={1.4} opacity={0.5 + 0.4 * flicker} />}
            </g>
            {/* Seen for what they are: warm, friendly points of light. */}
            {friendly > 0 && (
              <g opacity={friendly}>
                <Glow x={x} y={y - 50 * s} r={34 * s} colour="#F29F3D" opacity={0.5} />
                <circle cx={x} cy={y - 50 * s} r={3.5 * s} fill="#FFF1D2" opacity={0.6 + 0.4 * flicker} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

// ---------------------------------------------------------------------------
// A smoke gust: a cold swirl of grey smoke for anger, from one point towards
// another. `amount` 0 to 1 is its strength; it thins and drifts as it falls.
// ---------------------------------------------------------------------------

export function SmokeGust({ from, to, t, amount }: { from: { x: number; y: number }; to: { x: number; y: number }; t: number; amount: number }) {
  if (amount <= 0.01) return null;
  return (
    <g opacity={amount}>
      {Array.from({ length: 7 }, (_, i) => {
        const reach = 0.55 + 0.45 * amount;
        const ex = lerp(from.x, to.x, reach) + wobble(t, 0.7, i) * 20;
        const ey = lerp(from.y, to.y, reach) + (i - 3) * 16;
        const mx = lerp(from.x, ex, 0.5);
        const my = Math.min(from.y, ey) - 60 - i * 12 + wobble(t, 0.9, i + 4) * 18;
        return (
          <path
            key={i}
            d={`M ${from.x} ${from.y - 80 + i * 8} Q ${mx} ${my} ${ex} ${ey - 60}`}
            fill="none"
            stroke="#8C8A93"
            strokeWidth={10 + (i % 3) * 8}
            strokeLinecap="round"
            opacity={0.22 + 0.08 * (i % 2)}
          />
        );
      })}
      <Particles kind="dust" t={t} count={22} colour="#B8B6C0" opacity={0.35} area={{ x: Math.min(from.x, to.x), y: to.y - 260, w: Math.abs(to.x - from.x), h: 240 }} speed={2} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Himavat's palace on the mountain, as fine gold line-art, hung with
// marigold garlands. `glow` brightens the garlands (Beat 7, the wedding).
// ---------------------------------------------------------------------------

export function Palace({ x = 420, y = 640, glow = 0, opacity = 1 }: { x?: number; y?: number; glow?: number; opacity?: number }) {
  const stroke = { stroke: GOLD, strokeWidth: 2, fill: 'none', vectorEffect: 'non-scaling-stroke' as const };
  // A garland: a swag of small marigold dots between two points.
  const garland = (x1: number, x2: number, gy: number, sag: number) =>
    Array.from({ length: 13 }, (_, i) => {
      const p = i / 12;
      const gx = lerp(x1, x2, p);
      const yy = gy + Math.sin(p * Math.PI) * sag;
      return <circle key={i} cx={gx} cy={yy} r={4.5} fill={i % 3 === 1 ? '#C8432B' : '#F4A93B'} opacity={0.75 + glow * 0.25} />;
    });
  return (
    <g opacity={opacity} transform={`translate(${x - 420} ${y - 640})`}>
      {/* The walls and the gateway. */}
      <path d="M 150 640 L 150 430 L 690 430 L 690 640" {...stroke} />
      <path d="M 360 640 L 360 520 Q 420 450 480 520 L 480 640" {...stroke} />
      {/* Three domes with finials, the middle one tallest. */}
      <path d="M 180 430 Q 250 330 320 430 M 330 430 Q 420 290 510 430 M 520 430 Q 590 330 660 430" {...stroke} />
      <path d="M 250 362 L 250 340 M 420 312 L 420 280 M 590 362 L 590 340" {...stroke} />
      {/* Pillars along the front, and a terrace line. */}
      {[190, 240, 290, 550, 600, 650].map((px) => (
        <path key={px} d={`M ${px} 640 L ${px} 470`} {...stroke} strokeWidth={1.2} opacity={0.7} />
      ))}
      <path d="M 150 470 L 690 470" {...stroke} strokeWidth={1.2} opacity={0.7} />
      {/* Marigold garlands across the front and over the gate. */}
      {garland(150, 360, 440, 26)}
      {garland(480, 690, 440, 26)}
      {garland(330, 510, 520, 34)}
      {glow > 0 && <Glow x={420} y={480} r={360} colour="#F4A93B" opacity={0.25 * glow} />}
    </g>
  );
}

// ---------------------------------------------------------------------------
// The mountain kingdom: sky, ridges and the valley path. `dusk` 0 is the
// marigold wedding day, 1 is the smoky violet of the procession, and `night`
// adds the moon-bell's deep blue.
// ---------------------------------------------------------------------------

export function MountainKingdom({ t, dusk = 0, stars = 0 }: { t: number; dusk?: number; stars?: number }) {
  const sky = (a: string, b: string) => <Sky top={a} bottom={b} t={t} />;
  return (
    <>
      <Layer depth={0.05}>
        {sky('#E07A3C', '#FFF1D2')}
        <g opacity={dusk}>{sky('#0F0D18', '#3B3157')}</g>
        {stars > 0 && <Sky top="rgba(0,0,0,0)" bottom="rgba(0,0,0,0)" t={t} stars={Math.round(60 * stars)} starColour="#C9D3E6" />}
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={4} baseY={540} height={150} fill="#D9897A" peak={{ x: 1100, h: 240 }} snow="#FFF1D2" />
        <g opacity={dusk}>
          <Ridge seed={4} baseY={540} height={150} fill="#2A2340" peak={{ x: 1100, h: 240 }} snow="#8C8A93" />
        </g>
      </Layer>
      <Layer depth={0.3}>
        <Haze y={560} colour={dusk > 0.5 ? '#8C8A93' : '#FFF1D2'} opacity={0.2} t={t} />
        <Ridge seed={9} baseY={680} height={110} fill="#9A5A4E" />
        <g opacity={dusk}>
          <Ridge seed={9} baseY={680} height={110} fill="#1C1730" />
        </g>
      </Layer>
    </>
  );
}

// The ground in front of the palace, with the valley path the procession
// comes along, from the right.
export function Ground({ dusk = 0 }: { dusk?: number }) {
  return (
    <>
      <path d="M -300 780 Q 500 720 1000 740 Q 1400 750 1900 720 L 1900 1200 L -300 1200 Z" fill="#6B3A30" />
      <g opacity={dusk}>
        <path d="M -300 780 Q 500 720 1000 740 Q 1400 750 1900 720 L 1900 1200 L -300 1200 Z" fill="#141022" />
      </g>
      <path d="M 1900 760 Q 1300 790 900 800 Q 700 806 560 830" fill="none" stroke={GOLD} strokeWidth={2} strokeDasharray="2 10" opacity={0.35} />
    </>
  );
}

// Mena and Narada on the terrace in front of the palace. Mena's `faint`
// (0 to 1) takes her from standing to sitting on the ground; her maids
// gather round as `maids` rises.
export function MenaAndNarada({ faint = 0, maids = 0, naradaArms = 'rest', naradaTilt = 0, menaArms = 'heart', menaLean = 0, colour = '#FFE3A3', opacity = 1 }: {
  faint?: number;
  maids?: number;
  naradaArms?: 'rest' | 'sweep' | 'raised';
  naradaTilt?: number;
  menaArms?: 'heart' | 'raised' | 'rest' | 'anjali';
  menaLean?: number;
  colour?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {/* Mena, standing, then (as she faints) on the ground. */}
      <Outline x={330} y={840} scale={0.72} head="veiled" arms={menaArms} colour={colour} opacity={1 - faint} lean={menaLean} />
      <Outline x={330} y={850} scale={0.66} pose="sit" head="veiled" arms="rest" headTilt={-14} colour={colour} opacity={faint} />
      {/* Narada, the sage, with his topknot. */}
      <Outline x={460} y={840} scale={0.7} head="topknot" arms={naradaArms} headTilt={naradaTilt} colour="#E8D9B0" />
      {/* Her maids gather round. */}
      {maids > 0 &&
        [180, 230].map((mx, i) => (
          <Outline key={mx} x={lerp(mx - 120, mx, maids)} y={850} scale={0.5} pose="kneel" head="veiled" arms="heart" colour="#D9897A" opacity={maids * 0.85} lean={8 + i * 4} />
        ))}
    </g>
  );
}

// A soft night over the mountain, for the text-led beats (Side by side,
// Today) and the closing: the Kailasa sky, the ridges and the bell-moon.
export function MoonNight({ t, moon = 1, moonGlow = 0.5, moonX = 800, moonY = 160 }: { t: number; moon?: number; moonGlow?: number; moonX?: number; moonY?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={k.shadow} bottom={k.secondary} t={t} stars={70} starColour={k.highlight} />
        <BellMoon x={moonX} y={moonY} size={46} glow={moonGlow} opacity={moon} t={t} />
      </Layer>
      <Layer depth={0.15}>
        <Ridge seed={3} baseY={600} height={150} fill="#2B3A6E" peak={{ x: 800, h: 220 }} snow={k.primary} />
      </Layer>
      <Layer depth={0.35}>
        <Haze y={650} colour={k.primary} opacity={0.1} t={t} />
        <Ridge seed={7} baseY={740} height={110} fill="#1A2550" />
      </Layer>
      <Layer depth={0.6}>
        <Ridge seed={11} baseY={880} height={80} fill="#0E1430" />
      </Layer>
    </>
  );
}

