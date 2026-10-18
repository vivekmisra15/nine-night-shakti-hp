// Beat 7: Other tellings (two screens, 7a and 7b).
// Four small panels of light on a night sky, one per telling. No telling
// looks more "right" than another.
//   Kalika Purana     a falling ribbon of light (the heavenly Ganga) over a flame
//   Shiva Purana      a flame from which a second light separates
//   Popular telling   river water poured over a flame
//   Devi Mahatmya     a bright light rising out of a flame that deepens to indigo
// At "What the tellings share", the panels draw together into two equal
// lights, one deep indigo and one pearl, side by side and the same size.

import { easeInOut, lerp, progress } from '../../engine/anim';
import { DivineLight } from '../figures';
import { palettes } from '../palettes';
import { cameraFor, fadeIn, Flame, Glow, Layer, mixCam, Sky, Stage } from '../shared';
import type { VisualProps } from '../types';
import { linesOf } from '../day1/common';
import { PearlLight } from './kit';

const r = palettes.reflective;
const centres = [260, 620, 980, 1340];
const PY = 470; // the panels' centre height

// One panel's frame: a tall rounded arch of fine gold line.
function Frame({ x, opacity }: { x: number; opacity: number }) {
  return (
    <path
      d={`M ${x - 140} ${PY + 190} L ${x - 140} ${PY - 120} Q ${x - 140} ${PY - 200} ${x} ${PY - 210} Q ${x + 140} ${PY - 200} ${x + 140} ${PY - 120} L ${x + 140} ${PY + 190} Z`}
      fill="rgba(20,26,51,0.5)"
      stroke={r.accent}
      strokeWidth={1.5}
      opacity={opacity}
    />
  );
}

// A small flame at the foot of a panel (the same Devi in every telling).
const PanelFlame = ({ x, t, outer = '#F29F3D' }: { x: number; t: number; outer?: string }) => (
  <>
    <Glow x={x} y={PY + 90} r={110} colour={outer} opacity={0.3} />
    <Flame x={x} y={PY + 130} size={0.9} t={t} outer={outer} />
  </>
);

// The four tellings. `a` is how far each one has played (0 to 1).
function Panels({ t, a, show }: { t: number; a: number[]; show: number[] }) {
  const [x1, x2, x3, x4] = centres;
  return (
    <>
      {/* Kalika Purana: a ribbon of light falls over the flame. */}
      <g opacity={show[0]}>
        <Frame x={x1} opacity={0.8} />
        <path d={`M ${x1 - 30} ${PY - 180} C ${x1 + 30} ${PY - 100}, ${x1 - 30} ${PY - 20}, ${x1} ${lerp(PY - 150, PY + 80, a[0])}`} stroke="#DCE6FF" strokeWidth={6} fill="none" opacity={0.6 * a[0]} strokeLinecap="round" />
        <PanelFlame x={x1} t={t} />
      </g>
      {/* Shiva Purana: a second light separates from the flame. */}
      <g opacity={show[1]}>
        <Frame x={x2} opacity={0.8} />
        <PanelFlame x={x2} t={t + 1} />
        <g opacity={a[1]}>
          <Glow x={lerp(x2, x2 + 60, a[1])} y={lerp(PY + 90, PY - 60, a[1])} r={60} colour="#C9D3E6" opacity={0.6} />
          <circle cx={lerp(x2, x2 + 60, a[1])} cy={lerp(PY + 90, PY - 60, a[1])} r={10} fill="#F4F1EA" />
        </g>
      </g>
      {/* Popular telling: water poured over the flame, from a small pot. */}
      <g opacity={show[2]}>
        <Frame x={x3} opacity={0.8} />
        <path d={`M ${x3 - 50} ${PY - 120} Q ${x3 - 20} ${PY - 150} ${x3 + 10} ${PY - 120} L ${x3 - 10} ${PY - 90} Z`} fill="none" stroke={r.accent} strokeWidth={1.5} />
        <path d={`M ${x3 - 5} ${PY - 95} Q ${x3 + 5} ${PY - 20} ${x3} ${lerp(PY - 90, PY + 70, a[2])}`} stroke="#C9E0F2" strokeWidth={5} fill="none" opacity={0.7 * a[2]} strokeLinecap="round" />
        <PanelFlame x={x3} t={t + 2} />
      </g>
      {/* Devi Mahatmya: a bright light rises; the flame deepens to indigo. */}
      <g opacity={show[3]}>
        <Frame x={x4} opacity={0.8} />
        <g opacity={1 - a[3]}>
          <PanelFlame x={x4} t={t + 3} />
        </g>
        <g opacity={a[3]}>
          <PanelFlame x={x4} t={t + 3} outer="#5A5FD0" />
        </g>
        <g opacity={a[3]}>
          <Glow x={x4} y={lerp(PY + 90, PY - 80, a[3])} r={70} colour="#F4F1EA" opacity={0.6} />
          <circle cx={x4} cy={lerp(PY + 90, PY - 80, a[3])} r={10} fill="#FFFFFF" />
        </g>
      </g>
    </>
  );
}

function Night({ t }: { t: number }) {
  return (
    <Layer depth={0.05}>
      <Sky top={r.shadow} bottom={r.secondary} t={t} stars={90} starColour={r.highlight} />
    </Layer>
  );
}

// 7a: the Kalika Purana and the Shiva Purana.
export function OtherTellingsA({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const time = complete ? L[L.length - 1].end + 2 : t;
  const cam = cameraFor('pan', progress(time, 0, L[L.length - 1].end) * 0.5, time);
  const show = [fadeIn(time, at(1), 2), fadeIn(time, at(4), 2), 0.12, 0.12];
  const a = [easeInOut(progress(time, at(2), at(2) + 4)), easeInOut(progress(time, at(6), at(6) + 4)), 0, 0];
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Night t={time} />
      <Layer depth={0.4}>
        <Panels t={time} a={a} show={show} />
      </Layer>
    </Stage>
  );
}

// 7b: the popular telling and the Devi Mahatmya; then the panels draw
// together into two equal lights.
export function OtherTellingsB({ beat, t, frozen, complete }: VisualProps) {
  const L = linesOf(beat);
  const at = (n: number) => L[n].start;
  const time = complete ? L[L.length - 1].end + 2 : t;
  const together = easeInOut(progress(time, at(7), at(7) + 4));
  const cam = mixCam(cameraFor('pan', 0.5 + progress(time, 0, at(7)) * 0.5, time), cameraFor('still', 0, time), together);
  const show = [1, 1, fadeIn(time, at(0), 2), fadeIn(time, at(3), 2)];
  const a = [1, 1, easeInOut(progress(time, at(1), at(1) + 4)), easeInOut(progress(time, at(5), at(5) + 4))];
  return (
    <Stage cam={cam} frozen={frozen} label={beat.title}>
      <Night t={time} />
      <Layer depth={0.4}>
        <g opacity={1 - together}>
          <Panels t={time} a={a} show={show} />
        </g>
        {/* The two equal lights: deep indigo and pearl, the same size. */}
        <g opacity={together}>
          <DivineLight x={lerp(620, 680, together)} y={600} t={time} kind="dark" size={0.9} />
          <PearlLight x={lerp(980, 920, together)} y={600} t={time} size={0.9} />
        </g>
      </Layer>
    </Stage>
  );
}
