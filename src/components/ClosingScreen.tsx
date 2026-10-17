// The night's closing: dawn rises, the night's theme (its word and idea) is
// shown large over it (the last thing children see), the flame becomes a spark, and the
// map appears with the night's diya lit. The music resolves with the falling
// flute phrase, a bell and a calm tanpura tail. Skipped in Reading mode.

import { useEffect, useState } from 'react';
import { playClosing } from '../audio';
import { closingCaptions } from '../audio/day1Score';
import { fadeIn, fadeOut } from '../visuals/shared';
import { Closing, CLOSING_SECONDS } from '../visuals/day1/Reflection';
import { Rich } from './Rich';

interface Props {
  theme: { word: string; idea: string };
  captions: boolean;
  onDone: () => void;
}

export function ClosingScreen({ theme, captions, onDone }: Props) {
  const [t, setT] = useState(0);

  useEffect(() => {
    playClosing();
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = (now - start) / 1000;
      setT(elapsed);
      if (elapsed >= CLOSING_SECONDS) onDone();
      else frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const caption = captions ? closingCaptions.findLast((c) => t >= c.at && t < c.at + 3)?.text : undefined;
  const idea = Math.min(fadeIn(t, 2.5, 1.5), fadeOut(t, 10.5, 1));

  return (
    <main className="closing-screen">
      <div className="closing-stage">
        <Closing t={t} />
        <div className="closing-idea" style={{ opacity: idea }}>
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
