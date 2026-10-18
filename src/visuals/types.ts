import type { Beat } from '../content/types';
import type { StepKind } from '../engine/steps';

// What every illustration receives.
export interface VisualProps {
  beat: Beat;
  t: number; // seconds since the beat started
  duration: number; // Infinity for beats that loop gently
  frozen: boolean; // on a freeze-frame
  complete: boolean; // Reading mode: draw the finished picture, no animation
  // Things the learner has done in this beat, with the time each happened,
  // e.g. { 'pick:2': 14.2, reveal: 20.5 }. Pictures react to them.
  cues: Record<string, number>;
  onCue: (name: string) => void; // for tappable hotspots in the picture
  pulse: number; // the music's level, 0 to 1, for gentle music-reactive light
  stepKind?: StepKind; // which screen of the beat is showing (e.g. 'didYouKnow'), for pictures that change with it
  gentle?: boolean; // the family chose tonight's gentle alternative Harry Potter scene
}
