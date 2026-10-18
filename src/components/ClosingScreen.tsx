// The night's closing: its picture (registered as 'nN-closing', e.g. dawn over
// the mountain), with the night's theme (its word and idea) shown large over
// it, the last thing children see. Then the map appears with the night's diya
// lit. The music resolves with the falling flute phrase, a bell and a calm
// tanpura tail. Skipped in Reading mode.

import { useEffect, useState } from 'react';
import { playClosing } from '../audio';
import type { Night } from '../content/types';
import { illustrationFor } from '../visuals';
import { fadeIn, fadeOut } from '../visuals/shared';
import { Rich } from './Rich';

interface Props {
  night: Night;
  captions: boolean;
  onDone: () => void;
}

export function ClosingScreen({ night, captions, onDone }: Props) {
  const { seconds, captions: closingCaptions } = night.closing;
  const idea = night.beats.find((b) => b.type === 'idea');
  const theme = idea?.type === 'idea' ? idea.theme : { word: '', idea: '' };
  const Closing = illustrationFor(`n${night.number}-closing`);
  const [t, setT] = useState(0);

  useEffect(() => {
    playClosing();
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = (now - start) / 1000;
      setT(elapsed);
      if (elapsed >= seconds) onDone();
      else frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [onDone, seconds]);

  const caption = captions ? closingCaptions.findLast((c) => t >= c.at && t < c.at + 3)?.text : undefined;
  const ideaOpacity = Math.min(fadeIn(t, 2.5, 1.5), fadeOut(t, seconds - 2.5, 1));

  return (
    <main className="closing-screen">
      <div className="closing-stage">
        <Closing beat={night.beats[night.beats.length - 1]} t={t} duration={seconds} frozen={false} complete={false} cues={{}} onCue={() => {}} pulse={0} />
        <div className="closing-idea" style={{ opacity: ideaOpacity }}>
          <p className="closing-word">{theme.word}</p>
          <p>
            <Rich text={theme.idea} />
          </p>
        </div>
        {caption && <p className="caption">[{caption}]</p>}
      </div>
      <button className="link-button closing-skip" onClick={onDone}>
        Skip
      </button>
    </main>
  );
}
