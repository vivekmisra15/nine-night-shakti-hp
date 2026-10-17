// Helpers and backdrops shared by Night 1's illustrations.

import type { Beat } from '../../content/types';
import { captionLines, narrationOf } from '../../engine/storyTiming';
import { palettes } from '../palettes';
import { Haze, Layer, Particles, Ridge, Sky } from '../shared';

// The start and end time of each narration sentence (a story, or a Harry
// Potter retelling), so pictures can change exactly when the words do.
export function linesOf(beat: Beat) {
  return captionLines(narrationOf(beat));
}

// How many seconds ago the learner did something (a cue), or -1 if they
// haven't. In Reading mode everything counts as done long ago.
export function cueAge(cues: Record<string, number>, name: string, t: number, complete: boolean) {
  if (complete) return 1000;
  return name in cues ? t - cues[name] : -1;
}

// The highest-numbered cue with this prefix (e.g. 'rung:'), or -1.
export function latestCue(cues: Record<string, number>, prefix: string, complete: boolean, all = 99) {
  if (complete) return all;
  return Object.keys(cues)
    .filter((k) => k.startsWith(prefix))
    .reduce((max, k) => Math.max(max, Number(k.slice(prefix.length))), -1);
}

const k = palettes.kailasa;

// Kailasa at night: indigo sky, stars, three ridges of snow mountains with
// the high peak, and drifting snow. Used by Beats 1, 2, 4 and 16.
export function KailasaBackdrop({ t, snow = true, dawn = 0 }: { t: number; snow?: boolean; dawn?: number }) {
  return (
    <>
      <Layer depth={0.05}>
        <Sky top={k.shadow} bottom={k.secondary} t={t} stars={70} starColour={k.highlight} />
        {/* Dawn light rising behind the range (used in the closing). */}
        {dawn > 0 && <Sky top="#5A4E7A" bottom="#F2B5A7" t={t} />}
      </Layer>
      <Layer depth={0.15} opacity={dawn > 0 ? 1 - dawn * 0.3 : 1}>
        <Ridge seed={3} baseY={560} height={150} fill="#2B3A6E" peak={{ x: 800, h: 300 }} snow={k.primary} />
      </Layer>
      <Layer depth={0.3}>
        <Haze y={600} colour={k.primary} opacity={0.12} t={t} />
        <Ridge seed={7} baseY={700} height={120} fill="#1A2550" />
      </Layer>
      <Layer depth={0.6}>
        <Ridge seed={11} baseY={860} height={90} fill="#0E1430" />
      </Layer>
      {snow && (
        <Layer depth={0.9}>
          <Particles kind="snow" t={t} count={40} colour={k.primary} opacity={0.5} seed={1} />
        </Layer>
      )}
    </>
  );
}
