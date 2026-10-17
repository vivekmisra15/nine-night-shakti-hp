// Settings: reading pace, slow motion, Reading mode, captions, mute and the
// three volume sliders. They are saved in this browser only.

import type { Settings } from '../state/progress';
import { Overlay } from './Overlay';

interface Props {
  settings: Settings;
  onChange: (settings: Settings) => void;
  deviceReducedMotion: boolean;
  onClose: () => void;
  onOpen: (panel: 'script' | 'sources') => void; // the Text and Context panels (on a phone they live here)
}

const paces = [
  { value: 'slower', label: 'Slower: each sentence stays longer, for reading aloud (recommended)' },
  { value: 'relaxed', label: 'Relaxed: a comfortable pace for reading silently' },
  { value: 'tap', label: 'Tap to continue: each sentence waits for you (Space or Next)' },
] as const;

export function SettingsPanel({ settings, onChange, deviceReducedMotion, onClose, onOpen }: Props) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });
  const setVolume = (key: keyof Settings['volumes'], value: number) => set({ volumes: { ...settings.volumes, [key]: value } });
  const readingValue = settings.readingMode === null ? 'auto' : settings.readingMode ? 'on' : 'off';

  return (
    <Overlay title="Settings" onClose={onClose}>
      <div className="row">
        <button onClick={() => onOpen('script')}>Read the whole night (T)</button>
        <button onClick={() => onOpen('sources')}>Context and sources (C)</button>
      </div>

      <fieldset>
        <legend>Length of the night</legend>
        <label className="option">
          <input type="radio" name="length" checked={settings.shortEvening} onChange={() => set({ shortEvening: true })} />
          Short evening
        </label>
        <label className="option">
          <input type="radio" name="length" checked={!settings.shortEvening} onChange={() => set({ shortEvening: false })} />
          Full night
        </label>
      </fieldset>

      <fieldset>
        <legend>Reading pace</legend>
        {paces.map((p) => (
          <label key={p.value} className="option">
            <input type="radio" name="pace" checked={settings.readingPace === p.value} onChange={() => set({ readingPace: p.value })} />
            {p.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Animation</legend>
        <label className="option">
          <input type="checkbox" checked={settings.slowMotion} onChange={(e) => set({ slowMotion: e.target.checked })} />
          Slow motion (S)
        </label>
        <p className="small muted">Reading mode turns animation off and shows every step complete.</p>
        {(['auto', 'on', 'off'] as const).map((value) => (
          <label key={value} className="option">
            <input type="radio" name="reading" checked={readingValue === value} onChange={() => set({ readingMode: value === 'auto' ? null : value === 'on' })} />
            {value === 'auto'
              ? `Reading mode: automatic (this device's reduced motion is ${deviceReducedMotion ? 'on' : 'off'})`
              : value === 'on'
                ? 'Reading mode: on'
                : 'Reading mode: off'}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Sound</legend>
        <label className="option">
          <input type="checkbox" checked={settings.captions} onChange={(e) => set({ captions: e.target.checked })} />
          Captions (describe the music and sounds on the picture)
        </label>
        <label className="option">
          <input type="checkbox" checked={settings.music} onChange={(e) => set({ music: e.target.checked })} />
          Music
        </label>
        <label className="option">
          <input type="checkbox" checked={settings.muted} onChange={(e) => set({ muted: e.target.checked })} />
          Mute all sound
        </label>
        {(['music', 'ambience', 'effects'] as const).map((key) => (
          <label key={key} className="slider">
            <span>{key[0].toUpperCase() + key.slice(1)} volume</span>
            <input type="range" min={0} max={1} step={0.05} value={settings.volumes[key]} onChange={(e) => setVolume(key, Number(e.target.value))} />
            <span className="muted">{Math.round(settings.volumes[key] * 100)}%</span>
          </label>
        ))}
      </fieldset>
    </Overlay>
  );
}
