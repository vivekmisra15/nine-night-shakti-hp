// The opening splash, on one screen over a night sky: the app's name small
// at the top, one large question, the four splash questions fading in one at
// a time, a short introduction and a note on the two kinds of story, then
// "Begin the journey" with the music switch. The one-sentence disclaimer and
// its link sit at the bottom.
//
// Browsers allow sound only after a tap, so the music starts (softly) when
// the family taps Begin, and plays on under the map.

import { useEffect, useState } from 'react';
import { unlock } from '../audio';
import { disclaimerSentence } from '../content/disclaimer';
import { appTitle, beginLabel, splashHeadline, splashIntro, splashNote, splashQuestions } from '../content/journey';
import type { Settings } from '../state/progress';
import { Glow, Particles, Sky } from '../visuals/shared';
import { Rich } from './Rich';

const FIRST = 0.8; // seconds before the first question appears
const EACH = 1.1; // seconds between questions

interface Props {
  settings: Settings;
  onSettings: (s: Settings) => void;
  reading: boolean; // no animation: everything is shown at once
  onBegin: () => void; // go on to the map
  onDisclaimer: () => void; // open the full disclaimer page
}

export function SplashScreen({ settings, onSettings, reading, onBegin, onDisclaimer }: Props) {
  const [t, setT] = useState(0);

  // A simple clock: it drifts the sky, and fades the questions in.
  useEffect(() => {
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      setT((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const begin = () => {
    unlock(); // the tap that lets the music play
    onBegin();
  };
  const set = (patch: Partial<Settings>) => onSettings({ ...settings, ...patch });
  // How visible each question is (0 to 1); the text below follows the last one.
  const fade = (i: number) => (reading ? 1 : Math.min(1, Math.max(0, (t - FIRST - i * EACH) / 0.9)));
  const rest = fade(splashQuestions.length);

  return (
    <main className="splash">
      <svg className="splash-sky" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Sky top="#070A18" bottom="#1E2A5A" t={t} stars={110} starColour="#FFF4D6" />
        <Glow x={800} y={520} r={420} colour="#F29F3D" opacity={0.12} />
        <Particles kind="dust" t={t} count={26} colour="#FFE3A3" opacity={0.35} />
      </svg>

      <div className="splash-content">
        <p className="splash-eyebrow">{appTitle}</p>
        <h1 className="splash-headline">{splashHeadline}</h1>

        <ul className="splash-questions">
          {splashQuestions.map((q, i) => (
            <li key={i} style={{ opacity: fade(i) }}>
              <Rich text={q} />
            </li>
          ))}
        </ul>

        <div className="splash-about" style={{ opacity: rest }}>
          <p className="splash-intro">
            <Rich text={splashIntro} />
          </p>
          <p className="splash-note">
            <Rich text={splashNote} />
          </p>
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
        </div>
      </div>

      <div className="splash-footer">
        {/* One sentence, and a link to the full disclaimer page. */}
        <p className="splash-disclaimer">
          <Rich text={disclaimerSentence} />{' '}
          <button className="link-button inline" onClick={onDisclaimer}>
            Read the full disclaimer
          </button>
        </p>
      </div>
    </main>
  );
}
