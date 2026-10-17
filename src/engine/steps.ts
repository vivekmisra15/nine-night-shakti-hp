// Splits a night's beats into steps: one screen each, with no scrolling.
// The rules follow the step list in docs/direction/night-1.md. Each beat type
// always splits the same way, so later nights get steps without extra work.

import type { Beat, Night } from '../content/types';

export type StepKind =
  | 'opening' // a part of the night's introduction
  | 'narration' // a story told sentence by sentence
  | 'symbols' // a story's tappable symbols
  | 'didYouKnow'
  | 'choiceSetup' // the situation before a choice
  | 'choiceAsk'
  | 'activity'
  | 'choiceReveal'
  | 'theme' // "What the story is about": the night's theme
  | 'retelling' // a Harry Potter scene, told sentence by sentence, with where to find it
  | 'connection' // what is similar, what is different, why it helps, and its strength
  | 'think' // "Think it through": the ladder, follow-ups, stance line and activity, on one screen
  | 'comparison'
  | 'today'
  | 'talk' // the together question, questions for the child, go deeper and the private note
  | 'themeEnd'; // the theme again, to end the night

export type Section = 'Enter' | 'Story' | 'Choices' | 'Ideas' | 'Harry Potter' | 'Compare' | 'Reflect';

export interface Step {
  id: string; // e.g. 'n1-b10:retelling', saved to resume where you left off
  beatIndex: number;
  kind: StepKind;
  part: number; // which piece, for kinds that come in several (ideas, situations...)
  section: Section;
  textLed: boolean; // full-width text over a faint backdrop, instead of picture + text
}

export const sections: Section[] = ['Enter', 'Story', 'Choices', 'Ideas', 'Harry Potter', 'Compare', 'Reflect'];

// The opening's points, grouped so that no screen has much more than 100 words.
function openingGroups(beat: Beat) {
  if (beat.type !== 'opening') return [];
  const words = (s: string) => s.split(/\s+/).length;
  const groups: number[][] = [];
  let current: number[] = [];
  let count = 0;
  beat.points.forEach((point, i) => {
    const n = words(point.text);
    if (current.length > 0 && count + n > 100) {
      groups.push(current);
      current = [];
      count = 0;
    }
    current.push(i);
    count += n;
  });
  if (current.length) groups.push(current);
  return groups;
}
export { openingGroups };

// (The short path changes what some steps show, not which steps there are.)
export function buildSteps(night: Night): Step[] {
  const steps: Step[] = [];
  night.beats.forEach((beat, beatIndex) => {
    const add = (kind: StepKind, section: Section, part = 0, textLed = false) =>
      steps.push({ id: `${beat.id}:${kind}${part ? `-${part}` : ''}`, beatIndex, kind, part, section, textLed });

    switch (beat.type) {
      case 'opening':
        openingGroups(beat).forEach((_, i) => add('opening', 'Enter', i));
        break;
      case 'story':
        add('narration', 'Story');
        if (beat.hotspots) add('symbols', 'Story');
        if (beat.didYouKnow) add('didYouKnow', 'Story');
        break;
      case 'choice':
        if (beat.setup) add('choiceSetup', 'Choices');
        add('choiceAsk', 'Choices');
        if (beat.activity) add('activity', 'Choices');
        add('choiceReveal', 'Choices');
        break;
      case 'idea':
        // The night's one core idea, its theme, is the whole Ideas section.
        add('theme', 'Ideas', 0, true);
        break;
      case 'sceneIntro':
        // Two steps per scene, to keep the Harry Potter part short.
        add('retelling', 'Harry Potter');
        add('connection', 'Harry Potter', 0, true);
        break;
      case 'think':
        // One step: everything for the discussion on one full-width screen.
        // (The short path leaves out the activity on that screen.)
        add('think', 'Harry Potter', 0, true);
        break;
      case 'comparison':
        add('comparison', 'Compare');
        break;
      case 'today':
        // Today and Reflection together make one Reflect section of at most
        // three steps. Full width: too many words for the side pane.
        beat.situations.forEach((_, i) => add('today', 'Reflect', i, true));
        break;
      case 'reflection':
        add('talk', 'Reflect', 0, true);
        add('themeEnd', 'Reflect', 0, true); // the night ends on its theme
        break;
    }
  });
  return steps;
}

// Is this step's text narrated (timed sentence by sentence)?
export const isNarrated = (step: Step) => step.kind === 'narration' || step.kind === 'retelling';
