// A visible countdown for family activities. It runs on real time (not the
// animation clock), so slow motion and pausing the story don't affect it.

import { useEffect, useState } from 'react';
import { playEffect, setActivity } from '../audio';
import type { Activity } from '../content/types';
import { Rich } from './Rich';

export function Timer({ activity }: { activity: Activity }) {
  const total = activity.minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  // While the timer runs, the music ducks to the drone alone.
  useEffect(() => {
    setActivity(running);
    return () => setActivity(false);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // A soft wooden tick every 10 seconds, and at the end.
  useEffect(() => {
    if (running && left < total && left % 10 === 0) playEffect('tick');
    if (left === 0) playEffect('tick');
  }, [left, running, total]);

  const minutes = Math.floor(left / 60);
  const seconds = String(left % 60).padStart(2, '0');
  const done = left === 0;

  return (
    <section className="activity">
      <h3>
        Activity{activity.title ? <>: {activity.title}</> : null} ({activity.minutes} minutes)
      </h3>
      <p>
        <Rich text={activity.text} />
      </p>
      {/* The ring and its buttons side by side, to save height. */}
      <div className="row timer-row">
        <div className="timer">
          {/* The ring empties as time runs out. */}
          <svg viewBox="0 0 100 100" className="timer-ring" aria-hidden="true">
            <circle cx="50" cy="50" r="44" className="timer-track" />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="timer-fill"
              strokeDasharray={`${(left / total) * 276.5} 276.5`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="timer-text" role="timer" aria-live="off">
            {done ? 'Time!' : `${minutes}:${seconds}`}
          </span>
        </div>
        <div className="row">
          <button onClick={() => setRunning((r) => !r)} disabled={done}>
            {running ? 'Pause timer' : left === total ? 'Start timer' : 'Resume timer'}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setLeft(total);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
