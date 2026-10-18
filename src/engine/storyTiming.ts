// Turns narration (a story's paragraphs, or a Harry Potter retelling) into
// timed lines, one sentence at a time. There is no voice-over: the text is
// the narration, so each sentence stays up long enough to read comfortably,
// or to read aloud.
//
// The reading pace is one setting shared by everything that uses these
// times (the text, the pictures and the music), so they always stay together.

import type { Beat } from '../content/types';

export type ReadingPace = 'relaxed' | 'slower' | 'tap';

// Seconds per word, and a pause for each sentence, for each pace.
// Relaxed is about 130 words a minute; Slower gives each sentence about 40%
// longer, for a parent reading aloud. "Tap" uses the slower timing, and the
// player also waits at the end of every sentence.
const paces: Record<ReadingPace, { perWord: number; perLine: number }> = {
  relaxed: { perWord: 0.38, perLine: 1.2 },
  slower: { perWord: 0.53, perLine: 1.7 },
  tap: { perWord: 0.53, perLine: 1.7 },
};

let pace: ReadingPace = 'slower';
export const setReadingPace = (next: ReadingPace) => {
  pace = next;
};
export const getReadingPace = () => pace;

export const OPENING_SECONDS = 7; // the night's opening invocation

export interface CaptionLine {
  text: string;
  start: number;
  end: number;
}

// Split after . ! or ? when the next sentence starts with a capital letter or
// a bracket, so "ch. 5" and "4.7.58" stay whole.
// Splits a paragraph into sentences. A full stop after a short abbreviation
// used in references ("Ch. Up. 3.19", "vv. 5–8", "e.g. ") or after an initial
// ("R. C. Hazra") doesn't end a sentence.
const abbreviation = /(?:^|[\s(])(?:Ch|ch|Up|vv|v|cf|e\.g|i\.e|Dr|Mr|Mrs|Ms|St|[A-Z])\.$/;
const splitSentences = (paragraph: string) =>
  paragraph.split(/(?<=[.!?…])\s+(?=[A-Z("“'*])/).reduce<string[]>((sentences, piece) => {
    const last = sentences.at(-1);
    if (last !== undefined && abbreviation.test(last)) sentences[sentences.length - 1] = `${last} ${piece}`;
    else sentences.push(piece);
    return sentences;
  }, []);

export function captionLines(paragraphs: string[]): CaptionLine[] {
  const { perWord, perLine } = paces[pace];
  const lines: CaptionLine[] = [];
  let time = 1; // a moment of picture before the first line
  for (const paragraph of paragraphs) {
    for (const text of splitSentences(paragraph)) {
      const words = text.split(/\s+/).length;
      const length = perLine + words * perWord;
      lines.push({ text, start: time, end: time + length });
      time += length;
    }
  }
  return lines;
}

// The narrated text of a beat, if it has any.
export function narrationOf(beat: Beat): string[] {
  if (beat.type === 'story') return beat.paragraphs;
  if (beat.type === 'sceneIntro') return beat.retelling;
  return [];
}

// How long a beat's narration lasts, with a short hold at the end.
export function narrationLength(beat: Beat) {
  const lines = captionLines(narrationOf(beat));
  return (lines.at(-1)?.end ?? 0) + 1.5;
}

// When sentence `n` of a beat's narration (a story, or a Harry Potter
// retelling) starts and ends, in seconds. Illustrations and the score use
// these so that, for example, the lamp flame rises exactly as its sentence
// appears.
export function lineTimes(beat: Beat, n: number) {
  const lines = captionLines(narrationOf(beat));
  if (lines.length === 0) return { start: 0, end: 0 };
  const line = lines[Math.min(n, lines.length - 1)];
  return { start: line.start, end: line.end };
}

// The beat's freeze-frames and slow-motion window, converted to seconds.
// With the "tap" pace, the clock also waits at the end of every sentence.
export function storyMoments(beat: Beat) {
  // Each pause is just before a sentence ends, so the next sentence appears
  // only when the story continues.
  const freezeAt = (beat.direction.freezeAfterLine ?? []).map((n) => lineTimes(beat, n).end - 0.05);
  if (pace === 'tap') for (const line of captionLines(narrationOf(beat))) freezeAt.push(line.end - 0.05);
  const slow = beat.direction.slowMo;
  const start = slow ? lineTimes(beat, slow.line).start : 0;
  return { freezeAt: [...new Set(freezeAt)].sort((a, b) => a - b), slowMo: slow ? { from: start, to: start + slow.seconds } : undefined };
}

// How long the clock runs for a whole beat's animation (the illustrations
// are drawn against this).
export function beatDuration(beat: Beat): number {
  if (beat.type === 'story') return narrationLength(beat);
  if (beat.type === 'opening') return OPENING_SECONDS + 30; // the invocation, then a slow push-in
  if (beat.type === 'sceneIntro') return narrationLength(beat); // the scene follows its retelling
  return Infinity;
}
