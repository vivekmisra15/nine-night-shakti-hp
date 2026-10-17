// The bottom bar: every keyboard control as a button, so everything works on
// a phone. Less-used settings (reading pace, slow motion, Reading mode,
// captions, other volumes) are in the Settings panel.

import type { Clock } from '../engine/useClock';
import type { Settings } from '../state/progress';

export type Panel = 'script' | 'sources' | 'settings' | 'parent' | null;

interface Props {
  clock: Clock;
  timed: boolean; // whether this step has a timed sequence (progress bar, play, replay)
  duration: number;
  reading: boolean;
  settings: Settings;
  onSettings: (s: Settings) => void;
  stepNumber: number;
  stepCount: number;
  canGoBack: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpen: (panel: Panel) => void;
}

const time = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// Small drawn icons, so they look the same on every device.
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d={d} fill="currentColor" />
  </svg>
);
const icons = {
  prev: 'M15.5 5 8.5 12l7 7-1.4 1.4L5.7 12l8.4-8.4z',
  play: 'M8 5v14l11-7z',
  pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
  replay: 'M12 5V2L7.5 6.5 12 11V7.5a5.5 5.5 0 1 1-5.5 5.5H4a8 8 0 1 0 8-8z',
};

export function ControlBar(p: Props) {
  const { clock, settings } = p;
  const controls = p.timed && !p.reading;
  const set = (patch: Partial<Settings>) => p.onSettings({ ...settings, ...patch });

  return (
    <nav className="control-bar" aria-label="Controls">
      <div className="bar-group">
        <button className="round" onClick={p.onPrev} disabled={!p.canGoBack} aria-label="Previous step (left arrow)">
          <Icon d={icons.prev} />
        </button>
        <button className="round" onClick={clock.toggle} disabled={!controls} aria-label={clock.playing ? 'Pause (Space)' : 'Play (Space)'}>
          <Icon d={clock.playing ? icons.pause : icons.play} />
        </button>
        <button className="round" onClick={clock.replay} disabled={!controls} aria-label="Replay (R)">
          <Icon d={icons.replay} />
        </button>
      </div>

      <div className="bar-progress">
        {controls ? (
          <>
            <input
              type="range"
              min={0}
              max={p.duration}
              step={0.1}
              value={Math.min(clock.t, p.duration)}
              onChange={(e) => clock.seek(Number(e.target.value))}
              aria-label="Progress"
            />
            <span className="mono small">
              {time(clock.t)} / {time(p.duration)}
            </span>
          </>
        ) : (
          <span className="muted small untimed">Take your time</span>
        )}
        <span className="mono small step-count">
          Step {p.stepNumber} of {p.stepCount}
        </span>
      </div>

      <div className="bar-group">
        <div className="toggle bar-wide" role="group" aria-label="Length of the night">
          <button aria-pressed={settings.shortEvening} onClick={() => set({ shortEvening: true })}>
            Short evening
          </button>
          <button aria-pressed={!settings.shortEvening} onClick={() => set({ shortEvening: false })}>
            Full night
          </button>
        </div>
        <button className="bar-wide" aria-pressed={settings.music} onClick={() => set({ music: !settings.music })} aria-label="Music on or off (M)">
          ♪ Music
        </button>
        <input
          className="volume"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={settings.volumes.music}
          onChange={(e) => set({ volumes: { ...settings.volumes, music: Number(e.target.value) } })}
          aria-label="Music volume"
        />
        <button className="bar-wide" onClick={() => p.onOpen('script')} aria-label="Read the whole night as text (T)">
          Text
        </button>
        <button className="bar-wide" onClick={() => p.onOpen('sources')} aria-label="Context and sources (C)">
          Context
        </button>
        <button onClick={() => p.onOpen('settings')} aria-label="Settings">
          ⚙
        </button>
        <button className="primary next" onClick={p.onNext} aria-label={p.isLast ? 'Finish the night' : 'Next step (right arrow)'}>
          {p.isLast ? 'Finish' : 'Next'} ›
        </button>
      </div>
    </nav>
  );
}
