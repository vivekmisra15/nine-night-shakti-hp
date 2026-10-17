// The stance line: a line between two statements. Each family member adds a
// marker with their name and drags it to where they stand. Markers are saved
// in this browser only.

import { useRef, useState } from 'react';
import { clamp } from '../engine/anim';
import { useSaved, type StanceMarker } from '../state/progress';

interface Props {
  id: string; // a separate set of markers for each stance line
  left: string;
  right: string;
  note?: string;
}

export function StanceLine({ id, left, right, note }: Props) {
  const [markers, setMarkers] = useSaved<StanceMarker[]>(`stance:${id}`, []);
  const [name, setName] = useState('');
  const lineRef = useRef<HTMLDivElement>(null);

  const move = (index: number, position: number) =>
    setMarkers((all) => all.map((m, i) => (i === index ? { ...m, position: clamp(position) } : m)));

  // Turn a pointer's x position into 0–1 along the line.
  const positionFromPointer = (clientX: number) => {
    const box = lineRef.current?.getBoundingClientRect();
    return box ? (clientX - box.left) / box.width : 0.5;
  };

  const add = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setMarkers((all) => [...all, { name: trimmed, position: 0.5 }]);
    setName('');
  };

  return (
    <section className="card">
      <h3>Stance line</h3>
      <div className="stance-ends">
        <span>“{left}”</span>
        <span>“{right}”</span>
      </div>
      <div className="stance-line" ref={lineRef}>
        {markers.map((m, i) => (
          <button
            key={i}
            className="stance-marker"
            style={{ left: `${m.position * 100}%` }}
            aria-label={`${m.name}'s marker. Use the left and right arrow keys to move it.`}
            onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) move(i, positionFromPointer(e.clientX));
            }}
            onKeyDown={(e) => {
              // Arrow keys move the marker instead of changing the beat.
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
                move(i, m.position + (e.key === 'ArrowLeft' ? -0.05 : 0.05));
              }
            }}
          >
            {m.name}
          </button>
        ))}
      </div>
      {note && <p className="muted">{note}</p>}
      <div className="row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Your name"
          aria-label="Name for a new marker"
          maxLength={20}
        />
        <button onClick={add}>Add marker</button>
        {markers.length > 0 && <button onClick={() => setMarkers([])}>Clear markers</button>}
      </div>
    </section>
  );
}
