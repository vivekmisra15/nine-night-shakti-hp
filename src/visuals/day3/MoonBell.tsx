// Beats 6–8: Chandraghanta.
//
// Beat 6: The moon-bell. (A bell rings just before sentence 1.)
//   Sentence 1   Parvati's flame swells into a golden glow, with a very faint
//                head-and-shoulders outline inside the light (never a body)
//   Sentence 2   ten small gold weapon icons fan out around the glow, a lion
//                icon appears below, and the bell-moon settles on her forehead
//   Sentence 3   "This was Chandraghanta" (freeze-frame)
//   Sentence 4   rings of light spread through the hall; where they pass, the
//                ganas' shadows turn into warm points of light
//   Sentence 5   the glow turns towards Shiva's silver light
//   The end      gold and silver lights side by side, the crescent between
// The camera cranes up as the form appears, then holds still.
//
// Beat 7 (a choice): gold and silver side by side. At the reveal, Shiva's
// silver light brightens into a radiant, softer white-gold column; Mena
// stands still "like a painting", then bows; the palace garlands brighten.
//
// Beat 8: The bell that protects.
//   Sentence 2   a single bell rings; one ring of light spreads
//   Sentence 3   a faint gentle glow and a faint fierce glow appear either
//                side and merge into one
//   Sentence 5   a dark smoke shape at the edge thins and drifts away as a
//                ring reaches it (it never touches anything)
//   Then         her symbols around the light become tappable hotspots;
//                later, Indra's light passes a small bell into the glow
//                ("Did you know?")

import { easeInOut, easeOut, lerp, progress } from '../../engine/anim';
import { DeviOutline, DivineLight, Outline, SmokeShape, SymbolIcon, type SymbolName } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Glow, Layer, mixCam, Particles, Ridge, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { cueAge, linesOf } from '../day1/common';
import { BellMoon, GanaCrowd, Ground, MenaAndNarada, MountainKingdom, Orb, Palace, ringRadius, SoundRings } from './kit';

const m = palettes.n3moonBell;
const SHIVA = { x: 1260, y: 640 };

// Chandraghanta, centred on (x, y): the golden glow, the faint outline, the
// bell-moon on her forehead, and (as `arms` rises) her ten weapons fanned
// round her, with the lion below.
const tenArms: SymbolName[] = ['trident', 'sword', 'bow', 'arrow', 'mace', 'thunderbolt', 'discus', 'bell', 'conch', 'abhaya'];

function Chandraghanta({ x, y, t, form, arms, lion, moon, pulse, size = 1 }: { x: number; y: number; t: number; form: number; arms: number; lion: number; moon: number; pulse: number; size?: number }) {
  return (
    <g>
      <Glow x={x} y={y - 60 * size} r={420 * size * (0.5 + 0.5 * form)} colour={m.primary} opacity={0.35 * form} />
      <DivineLight x={x} y={y + 90 * size} t={t} kind="warm" size={lerp(0.7, 1.25, form) * size} strength={lerp(1, 1.5, form)} pulse={pulse} />
      <DeviOutline x={x} y={y - 40 * size} size={1.6 * size} opacity={0.3 * form} />
      <BellMoon x={x} y={lerp(y - 360 * size, y - 135 * size, easeOut(moon))} size={15 * size} glow={0.8} opacity={moon} t={t} />
      {/* Ten arms with weapons: icons fanned in an arc above and around her. */}
      {tenArms.map((name, i) => {
        const angle = Math.PI * (1.05 + (0.9 * i) / 9);
        const r = 270 * size * easeOut(arms);
        return <SymbolIcon key={name} name={name} x={x + Math.cos(angle) * r} y={y - 40 * size + Math.sin(angle) * r * 0.85} size={0.85 * size} opacity={arms} />;
      })}
      <SymbolIcon name="lion" x={x} y={y + 210 * size} size={1.6 * size} opacity={lion} />
    </g>
  );
}

// The night over the hall in the moon-bell's colours.
function NightHall({ t, ganaFriendly, ganaOn = 1, palace = 0.7 }: { t: number; ganaFriendly: number; ganaOn?: number; palace?: number }) {
  return (
    <>
      <MountainKingdom t={t} dusk={1} stars={1} />
      {/* A deep moon-bell blue over the violet dusk. */}
      <Layer depth={0.05}>
        <rect x={-400} y={-400} width={2400} height={1000} fill={m.shadow} opacity={0.45} />
      </Layer>
      <Layer depth={0.45}>
        <Palace x={420} y={650} opacity={palace} />
      </Layer>
      <Layer depth={0.6}>
        <Ground dusk={1} />
        <GanaCrowd t={t} rush={1} friendly={ganaFriendly} opacity={ganaOn * 0.75} />
      </Layer>
    </>
  );
}

export function MoonBell({ beat, t, frozen, complete, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? 1e4 : t;
  const form = easeInOut(progress(T, at(1), at(1) + 4));
  const arms = progress(T, at(2), at(2) + 3);
  const lion = fadeIn(T, at(2) + 1, 2);
  const moon = progress(T, at(2) + 2, at(2) + 5);
  const rings = at(4);
  const friendly = progress(ringRadius(T, rings, 7, 900), 300, 800);
  const turn = easeInOut(progress(T, at(5), at(5) + 4));
  const devi = { x: lerp(800, 860, turn), y: 620 };

  const cam = mixCam(cameraFor('crane', progress(T, at(1), at(3)), T), cameraFor('still', 0, T), easeInOut(progress(T, at(3), at(4))));

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      {/* The palace fades back as her light fills the hall. */}
      <NightHall t={t} ganaFriendly={friendly} palace={0.7 - 0.4 * form} />
      <Layer depth={0.75}>
        <MenaAndNarada faint={1} colour="#FFE3A3" opacity={0.8} />
        <DivineLight x={SHIVA.x} y={SHIVA.y} t={t} kind="silver" size={0.95} pulse={pulse} />
        {!complete && <SoundRings x={devi.x} y={devi.y - 135} t={t} start={rings} count={3} interval={1.6} life={7} maxR={900} colour={m.highlight} />}
        <Chandraghanta x={devi.x} y={devi.y} t={t} form={form} arms={arms} lion={lion} moon={moon} pulse={pulse} size={0.85} />
        {/* At the end, the crescent hangs between gold and silver. */}
        <BellMoon x={1060} y={330} size={26} glow={0.6} opacity={fadeIn(T, at(5) + 2, 3)} t={t} />
      </Layer>
      <Layer depth={0.95}>
        <Particles kind="dust" t={t} count={24} colour={m.highlight} opacity={0.35 * form} area={{ x: 500, y: 250, w: 700, h: 550 }} />
      </Layer>
    </Stage>
  );
}

// Beat 7: Should Shiva change?
export function ShouldShivaChange({ beat, t, frozen, complete, cues, pulse }: VisualProps) {
  const reveal = cueAge(cues, 'reveal', t, complete);
  const radiant = reveal < 0 ? 0 : easeInOut(progress(reveal, 0, 4));
  const bow = reveal < 0 ? 0 : easeInOut(progress(reveal, 5, 8));
  const cam = { x: 0, y: 0, zoom: 1.04 + 0.006 * Math.sin(t / 3), rot: 0 };
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <NightHall t={t} ganaFriendly={1} />
      <Layer depth={0.45}>
        {/* The garlands brighten for the wedding. */}
        <Glow x={420} y={480} r={420} colour="#F4A93B" opacity={0.25 * radiant} />
      </Layer>
      <Layer depth={0.75}>
        {/* Mena stands still "like a painting", then bows. */}
        <Outline x={330} y={840} scale={0.72} head="veiled" arms={bow > 0.5 ? 'anjali' : 'rest'} headTilt={-18 * bow} lean={-6 * bow} colour="#FFE3A3" />
        <Outline x={460} y={840} scale={0.7} head="topknot" colour="#E8D9B0" />
        {/* Gold and silver side by side. */}
        <Chandraghanta x={860} y={620} t={t} form={1 - 0.3 * radiant} arms={1 - 0.6 * radiant} lion={1} moon={1} pulse={pulse} size={0.6} />
        {/* Shiva's silver light, which brightens into a radiant white-gold column. */}
        <g opacity={radiant}>
          {/* A soft column of light: glows stacked up the sky. */}
          {[620, 520, 420, 320, 220].map((cy, i) => (
            <Glow key={cy} x={SHIVA.x} y={cy} r={150 - i * 12} colour="#FFF6DC" opacity={0.3 - i * 0.04} />
          ))}
          <Glow x={SHIVA.x} y={500} r={340} colour="#FFF6DC" opacity={0.4} />
          <Orb x={SHIVA.x} y={SHIVA.y} t={t} r={40} glow="#F4E3A8" core="#FFFFFF" />
        </g>
        <g opacity={1 - radiant * 0.9}>
          <DivineLight x={SHIVA.x} y={SHIVA.y} t={t} kind="silver" size={0.95} pulse={pulse} />
        </g>
        {/* A small lamp for each option chosen. */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={990 + i * 60} cy={870} r={6} fill="#FFF6DC" opacity={cueAge(cues, `pick:${i}`, t, false) >= 0 ? 0.9 : 0.15} />
        ))}
      </Layer>
      <Layer depth={0.95}>
        <Particles kind="petals" t={t} count={18} colour="#F4A93B" opacity={0.7 * radiant} seed={5} />
      </Layer>
    </Stage>
  );
}

// Beat 8: where each symbol sits round the light, and its tappable circle.
const CX = 800;
const CY = 600;
export const hotspotPlaces: Record<string, { x: number; y: number; r: number }> = {
  bellMoon: { x: CX, y: CY - 120, r: 40 },
  weapons: { x: 570, y: 450, r: 90 },
  bell: { x: 1030, y: 450, r: 55 },
  lotus: { x: 1035, y: 700, r: 90 },
  abhaya: { x: 565, y: 700, r: 55 },
  lion: { x: CX, y: 830, r: 60 },
  manipura: { x: CX, y: CY + 70, r: 34 },
};

export function BellThatProtects({ beat, t, duration, frozen, complete, onCue, pulse }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const T = complete ? 1e4 : t;
  const end = Number.isFinite(duration) ? duration : L[L.length - 1].end + 1.5;
  const ring = at(2);
  const swing = T > ring && T < ring + 4 ? Math.sin((T - ring) * 9) * 18 * (1 - (T - ring) / 4) : 0;
  // A gentle glow and a fierce glow, either side, merging into one.
  const sides = fadeIn(T, at(3), 2) * (1 - fadeIn(T, at(3) + 4, 2));
  const merge = easeInOut(progress(T, at(3) + 2, at(3) + 6));
  // The smoke at the edge thins as the ring from sentence 5 reaches it.
  const smokeRing = at(5);
  const thin = progress(ringRadius(T, smokeRing, 7, 900), 480, 760);
  const smokeOn = fadeIn(T, at(4), 2);
  const showHotspots = complete || t >= end;
  // "Did you know?": Indra's light brings a small bell into the glow.
  const gift = complete ? 1 : progress(t, end + 20, end + 28);
  const indra = gift > 0 && gift < 1;
  const bellTravel = easeInOut(progress(gift, 0.45, 1));

  const cam = cameraFor('drift', 0, T);
  const icon = (name: SymbolName, x: number, y: number, size = 0.95) => <SymbolIcon key={`${name}${x}`} name={name} x={x} y={y} size={size} />;

  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Layer depth={0.05}>
        <Sky top="#0B0F22" bottom={m.shadow} t={t} stars={90} starColour={m.highlight} />
      </Layer>
      <Layer depth={0.2}>
        <Ridge seed={5} baseY={760} height={120} fill="#1E2546" peak={{ x: 800, h: 120 }} />
        <Ridge seed={12} baseY={900} height={80} fill="#10142A" />
      </Layer>
      <Layer depth={0.6}>
        {/* The gentle and the fierce glow, then one light. */}
        <g opacity={sides}>
          <Glow x={lerp(380, CX, merge)} y={CY} r={220} colour="#F29F3D" opacity={0.45} />
          <Glow x={lerp(1220, CX, merge)} y={CY} r={220} colour="#5A5FD0" opacity={0.45} />
        </g>
        {/* The smoke at the edge, thinning and drifting away. */}
        <SmokeShape x={1420 + thin * 120} y={680 - thin * 60} t={t} size={0.9} seed={2} dissolve={thin} opacity={0.75 * smokeOn} />
        {!complete && (
          <>
            <SoundRings x={1030} y={450} t={t} start={ring} count={1} life={7} maxR={900} colour={m.highlight} />
            <SoundRings x={CX} y={CY - 120} t={t} start={smokeRing} count={2} interval={1.5} life={7} maxR={900} colour={m.highlight} />
          </>
        )}
      </Layer>
      <Layer depth={0.75}>
        {/* Chandraghanta, calm: the glow, the outline and the bell-moon. */}
        <Glow x={CX} y={CY} r={380} colour={m.primary} opacity={0.3 + pulse * 0.06} />
        <DivineLight x={CX} y={CY + 130} t={t} kind="warm" size={1.1} strength={1.3} pulse={pulse} />
        <DeviOutline x={CX} y={CY - 10} size={1.5} opacity={0.3} />
        <BellMoon x={CX} y={CY - 120} size={14} glow={0.8} t={t} />
        {/* Navel: the Manipura, a small inner fire. */}
        <Glow x={CX} y={CY + 70} r={30} colour="#FFF6DC" opacity={0.5} />
        {/* Her symbols, as small gold outline icons. */}
        {icon('trident', 520, 420)}
        {icon('sword', 590, 390)}
        {icon('bow', 640, 470)}
        {icon('mace', 535, 500)}
        <g transform={`rotate(${swing} 1030 418)`}>{icon('bell', 1030, 450, 1.2)}</g>
        {icon('lotus', 985, 700)}
        {icon('rosary', 1060, 690, 0.8)}
        {icon('waterPot', 1080, 740, 0.8)}
        {icon('abhaya', 565, 700, 1.2)}
        {icon('lion', CX, 830, 1.5)}
      </Layer>
      {/* "Did you know?": Indra's white-gold light hands a small bell into the glow. */}
      {indra && (
        <Layer depth={0.8}>
          <Orb x={lerp(1500, 1180, easeOut(Math.min(1, gift * 2)))} y={lerp(120, 300, easeOut(Math.min(1, gift * 2)))} t={t} r={22} glow="#F4E3A8" core="#FFFBEA" opacity={1 - progress(gift, 0.8, 1)} />
          <SymbolIcon name="bell" x={lerp(1180, CX + 40, bellTravel)} y={lerp(330, CY, bellTravel)} size={0.6} opacity={1 - progress(gift, 0.9, 1)} />
        </Layer>
      )}
      <Layer depth={0.75}>
        {showHotspots &&
          Object.entries(hotspotPlaces).map(([id, p]) => (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FFF6DC"
              fillOpacity={0.06}
              stroke="#FFF6DC"
              strokeWidth={3}
              opacity={0.3 + 0.3 * (0.5 + 0.5 * Math.sin(t * Math.PI))}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={`Learn about the ${id}`}
              onClick={() => onCue(`hotspot:${id}`)}
            />
          ))}
      </Layer>
      <Layer depth={0.95}>
        <Particles kind="dust" t={t} count={20} colour={m.highlight} opacity={0.3} area={{ x: 450, y: 250, w: 700, h: 600 }} />
      </Layer>
    </Stage>
  );
}
