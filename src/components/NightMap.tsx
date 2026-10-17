// The nine-night map: a constellation of nine diyas along a winding dotted
// path. Completed nights glow, built nights can be opened, and unbuilt
// nights are faded and read "being written". On a phone the path runs top to
// bottom instead of left to right.

import { useEffect, useState } from 'react';
import { appTitle, mapStops, unbuiltText } from '../content/journey';
import type { Settings } from '../state/progress';
import { SayNameSvg } from './SayName';
import { Diya, Glow, Sky } from '../visuals/shared';

interface Props {
  completed: number[];
  onOpen: (night: number) => void;
  onPrep: () => void; // opens the parent prep sheet
  settings: Settings;
  onSettings: (s: Settings) => void;
}

// True on narrow screens, where the constellation runs top to bottom.
function useNarrow() {
  const query = '(max-width: 700px)';
  const [narrow, setNarrow] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return;
    const onChange = () => setNarrow(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, []);
  return narrow;
}

export function NightMap({ completed, onOpen, onPrep, settings, onSettings }: Props) {
  const narrow = useNarrow();
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      setT((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Where each stop sits: a gentle wave across (or down, on a phone).
  const width = narrow ? 420 : 1600;
  const height = narrow ? 1420 : 640;
  const points = mapStops.map((_, i) =>
    narrow ? { x: 210 + Math.sin(i * 0.95) * 95, y: 110 + i * 150 } : { x: 110 + i * 172, y: 330 + Math.sin(i * 0.95) * 140 },
  );
  // A smooth dotted path through the stops.
  const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `S ${(p.x + points[i - 1].x) / 2 + (narrow ? 40 : 0)} ${(p.y + points[i - 1].y) / 2 + (narrow ? 0 : 40)} ${p.x} ${p.y}`)).join(' ');
  const set = (patch: Partial<Settings>) => onSettings({ ...settings, ...patch });

  return (
    <main className="map">
      <header className="map-header">
        <h1>{appTitle}</h1>
        <div className="row">
          <button onClick={onPrep}>Parent prep sheet</button>
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
      </header>

      <svg className="constellation" viewBox={`0 0 ${width} ${height}`} role="group" aria-label="The nine nights">
        <Sky top="#070A18" bottom="#141A33" t={t} stars={narrow ? 60 : 90} starColour="#FFF4D6" />
        <path d={path} fill="none" stroke="#E8B45A" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" opacity={0.6} />
        {mapStops.map((stop, i) => {
          const { x, y } = points[i];
          const lit = completed.includes(stop.night);
          const open = () => stop.built && onOpen(stop.night);
          return (
            <g key={stop.night}>
              <g
                className={`map-stop${stop.built ? ' built' : ''}${lit ? ' lit' : ''}`}
                opacity={stop.built ? 1 : 0.5}
                role="button"
                tabIndex={stop.built ? 0 : -1}
                aria-disabled={!stop.built}
                aria-label={`Night ${stop.night}: ${stop.devi}, ${stop.meaning}${lit ? ', completed' : ''}${stop.built ? '' : `, ${unbuiltText}`}`}
                onClick={open}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
              >
                {/* A larger invisible circle, so the stop is easy to tap. */}
                <circle cx={x} cy={y} r={64} fill="transparent" />
                {stop.built && <Glow x={x} y={y - 10} r={lit ? 90 : 60} colour="#F29F3D" opacity={lit ? 0.5 : 0.25} />}
                {stop.built && !lit && <circle cx={x} cy={y - 6} r={34} fill="none" stroke="#E8B45A" strokeWidth={2} className="map-ring" />}
                <Diya x={x} y={y + 6} t={t + i} scale={0.6} lit={lit ? 1 : 0} />
                <text x={x} y={y + 48} textAnchor="middle" className="map-night">
                  Night {stop.night}
                </text>
                <text x={x} y={y + 76} textAnchor="middle" className="map-devi">
                  {stop.devi}
                </text>
                <text x={x} y={y + 100} textAnchor="middle" className="map-meaning">
                  {stop.built ? stop.devanagari : unbuiltText}
                </text>
              </g>
              {/* Beside "Night N": tap to hear the Devi's name. */}
              <SayNameSvg devi={stop.devi} devanagari={stop.devanagari} x={x + 60} y={y + 43} />
            </g>
          );
        })}
      </svg>
    </main>
  );
}
