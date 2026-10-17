// Small helpers for drawing from a time value.
// Every illustration is a function of t (seconds), so pausing, replaying and
// slow motion all work just by changing t.

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Mix from a to b; amount 0 gives a, 1 gives b.
export const lerp = (a: number, b: number, amount: number) => a + (b - a) * amount;

// How far t is through the window from start to end, from 0 to 1.
export const progress = (t: number, start: number, end: number) =>
  end <= start ? (t >= end ? 1 : 0) : clamp((t - start) / (end - start));

// Gentle start and end, used for camera moves and entrances.
export const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

// Fast start, gentle end, used for things settling into place.
export const easeOut = (x: number) => 1 - (1 - x) ** 3;

// A smooth wobble between -1 and 1, used for flames and breathing.
export const wobble = (t: number, speed = 1, seed = 0) =>
  Math.sin(t * speed + seed) * 0.6 + Math.sin(t * speed * 2.3 + seed * 1.7) * 0.4;
