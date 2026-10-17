// The opening splash. The title is always there, over a night sky.
//
// 1. First: the title, "Begin the journey" and the music switch. Browsers
//    allow sound only after a tap, so the music starts (softly) on Begin.
// 2. After Begin: the title moves up, and four questions fade in beneath it,
//    one at a time, over the music. Then "Continue" goes on to the map.
//    "Skip" is always there.
// The Harry Potter disclaimer is shown small at the bottom throughout.

import { useEffect, useState } from 'react';
import { unlock } from '../audio';
import { appTitle, beginLabel, hpDisclaimer, splashQuestions } from '../content/journey';
import type { Settings } from '../state/progress';
import { Glow, Particles, Sky } from '../visuals/shared';
import { Rich } from './Rich';

const FIRST = 1.2; // seconds before the first question
const EACH = 3.6; // seconds between questions
const DONE = FIRST + (splashQuestions.length - 1) * EACH + 1.5; // when Continue appears

interface Props {
  settings: Settings;
  onSettings: (s: Settings) => void;
  reading: boolean; // no animation: the questions are shown all at once
  onBegin: () => void; // go on to the map
}

export function SplashScreen({ settings, onSettings, reading, onBegin }: Props) {
  const [begun, setBegun] = useState(false);
  const [t, setT] = useState(0);

  // A simple clock: it drifts the sky, and times the questions after Begin.
  useEffect(() => {
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      setT((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [begun]);

  const begin = () => {
    unlock(); // the tap that lets the music play
    setBegun(true);
  };
  const set = (patch: Partial<Settings>) => onSettings({ ...settings, ...patch });
  const shown = !begun ? 0 : reading ? splashQuestions.length : splashQuestions.filter((_, i) => t >= FIRST + i * EACH).length;
  const finished = begun && (reading || t >= DONE);

  return (
    <main className={`splash${begun ? ' splash-begun' : ''}`}>
      <svg className="splash-sky" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Sky top="#070A18" bottom="#1E2A5A" t={t} stars={110} starColour="#FFF4D6" />
        <Glow x={800} y={520} r={420} colour="#F29F3D" opacity={0.12} />
        <Particles kind="dust" t={t} count={26} colour="#FFE3A3" opacity={0.35} />
      </svg>

      <div className="splash-content">
        <h1 className="splash-heading">{appTitle}</h1>

        {!begun ? (
          <>
            <div className="row center">
              <button className="primary big" onClick={begin} autoFocus>
                {beginLabel}
              </button>
              <button aria-pressed={settings.music} onClick={() => set({ music: !settings.music })}>
                ♪ Music {settings.music ? 'on' : 'off'}
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
            </div>
            {settings.music && <p className="muted small">The music begins softly when you start.</p>}
          </>
        ) : (
          <>
            <ul className="splash-questions" aria-live="polite">
              {splashQuestions.slice(0, shown).map((q, i) => (
                <li key={i} className={i === shown - 1 && !finished ? 'q-current' : 'q-past'}>
                  <Rich text={q} />
                </li>
              ))}
            </ul>
            {/* Always in the layout (just hidden), so nothing jumps when it appears. */}
            <button className="primary big" onClick={onBegin} style={{ visibility: finished ? 'visible' : 'hidden' }}>
              Continue
            </button>
          </>
        )}
      </div>

      <div className="splash-footer">
        <p className="splash-disclaimer">
          <Rich text={hpDisclaimer} />
        </p>
        <button className="link-button small" onClick={onBegin} style={{ visibility: begun && !finished ? 'visible' : 'hidden' }}>
          Skip
        </button>
      </div>
    </main>
  );
}
