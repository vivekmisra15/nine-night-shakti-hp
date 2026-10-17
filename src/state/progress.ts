// Everything the app remembers: progress, private notes, stance-line names
// and settings. It is saved only in this browser (localStorage) and never
// sent anywhere.
//
// Every read and write is wrapped in try/catch: in a private window, or with
// storage blocked, the app still works; it just forgets when you close it.

import { useEffect, useState } from 'react';
import type { ReadingPace } from '../engine/storyTiming';

const PREFIX = 'nine-nights:';

export function loadSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function saveValue<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage is unavailable or full: carry on without saving.
  }
}

// Like useState, but the value is also saved under `key`.
export function useSaved<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => loadSaved(key, fallback));
  useEffect(() => saveValue(key, value), [key, value]);
  return [value, setValue] as const;
}

// ---------------------------------------------------------------------------
// The shapes of what is saved
// ---------------------------------------------------------------------------

export interface Settings {
  // null means "follow the device": Reading mode turns on by itself when the
  // device asks for reduced motion.
  readingMode: boolean | null;
  captions: boolean;
  music: boolean;
  muted: boolean;
  volumes: { music: number; ambience: number; effects: number }; // 0 to 1
  readingPace: ReadingPace; // how long each sentence stays
  shortEvening: boolean; // the night file's short evening (about 15 minutes)
  slowMotion: boolean;
}

export const defaultSettings: Settings = {
  readingMode: null,
  captions: true,
  music: true,
  muted: false,
  volumes: { music: 0.8, ambience: 0.6, effects: 0.7 },
  readingPace: 'slower', // a parent is usually reading aloud
  shortEvening: false,
  slowMotion: false,
};

export interface Progress {
  seenSpoiler: boolean; // the spoiler notice is shown once, before the series
  completedNights: number[];
  lastStep: Record<number, string>; // night number → step id, to resume where you left off
}

export const defaultProgress: Progress = {
  seenSpoiler: false,
  completedNights: [],
  lastStep: {},
};

// One family member's marker on a stance line.
export interface StanceMarker {
  name: string;
  position: number; // 0 = the left statement, 1 = the right statement
}
