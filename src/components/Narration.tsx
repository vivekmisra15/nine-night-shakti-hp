// Narrated text, sentence by sentence. The current sentence is bright and
// the one or two before it are dimmed. When the pane fills, earlier
// sentences slide up and out, but only as a new sentence starts: the text
// never crawls. Tapping an earlier sentence jumps the story back to it.
// In Reading mode (complete) the whole text is shown, and only this pane scrolls.

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CaptionLine } from '../engine/storyTiming';
import { Rich } from './Rich';

interface Props {
  lines: CaptionLine[];
  t: number;
  complete: boolean;
  onSeek: (t: number) => void;
}

export function Narration({ lines, t, complete, onSeek }: Props) {
  const shown = complete ? lines : lines.filter((line) => line.start <= t);
  const current = complete ? -1 : shown.length - 1;

  // How far to slide the text up so the newest sentence stays in view.
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const onResize = () => setSize((n) => n + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useLayoutEffect(() => {
    if (complete || !box.current || !inner.current) return setShift(0);
    setShift(Math.max(0, inner.current.scrollHeight - box.current.clientHeight));
  }, [shown.length, complete, size]);

  return (
    <div className={`narration${complete ? ' narration-complete' : ''}`} ref={box} aria-live="polite">
      <div className="narration-inner" ref={inner} style={{ transform: `translateY(${-shift}px)` }}>
        {shown.map((line, i) => {
          const state = i === current ? 'current' : complete ? 'all' : i >= current - 2 ? 'recent' : 'past';
          return (
            <p key={i} className={`line line-${state}`}>
              {state === 'recent' || state === 'past' ? (
                <button className="line-seek" onClick={() => onSeek(line.start)} title="Go back to this sentence">
                  <Rich text={line.text} />
                </button>
              ) : (
                <Rich text={line.text} />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
