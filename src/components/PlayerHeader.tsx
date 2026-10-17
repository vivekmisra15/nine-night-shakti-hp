// The top of the night player: back to the map, the night's name, the
// parent-note bell, and the section strip for jumping around the night.

import type { MapStop } from '../content/journey';
import { type Section, sections } from '../engine/steps';

interface Props {
  stop: MapStop;
  current: Section;
  available: Section[];
  onSection: (section: Section) => void;
  onExit: () => void;
  hasParentNotes: boolean;
  bellPulse: number; // changes each time the bell should pulse
  onBell: () => void;
}

export function PlayerHeader({ stop, current, available, onSection, onExit, hasParentNotes, bellPulse, onBell }: Props) {
  return (
    <header className="player-header">
      <button className="link-button" onClick={onExit} aria-label="Back to the nine-night map">
        ‹ <span className="back-label">Nine nights</span>
      </button>
      <div className="night-name">
        <span className="eyebrow">Night {stop.night}</span>
        {stop.devanagari && (
          <span className="devanagari" lang="hi">
            {stop.devanagari}
          </span>
        )}
        <span className="night-devi">{stop.devi}</span>
      </div>
      {hasParentNotes && (
        // The key restarts the pulse animation each time it should flash.
        <button key={bellPulse} className={`bell${bellPulse ? ' bell-pulse' : ''}`} onClick={onBell} aria-label="For the parent: read the note">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span className="bell-label">For the parent</span>
        </button>
      )}
      <nav className="section-strip" aria-label="Sections of the night">
        {sections
          .filter((s) => available.includes(s))
          .map((s) => (
            <button key={s} className={s === current ? 'section current' : 'section'} aria-current={s === current ? 'step' : undefined} onClick={() => onSection(s)}>
              {s}
            </button>
          ))}
      </nav>
    </header>
  );
}
