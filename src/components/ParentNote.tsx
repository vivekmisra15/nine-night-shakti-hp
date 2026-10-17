// The "For the parent" notes, opened from the bell in the header. They never
// stop the story; the bell pulses where the night file places each note.

import type { Night } from '../content/types';
import { Overlay } from './Overlay';
import { Rich } from './Rich';

export function ParentNote({ night, onClose }: { night: Night; onClose: () => void }) {
  const withNotes = night.beats.filter((b) => b.parentNote);
  return (
    <Overlay title="For the parent" onClose={onClose}>
      {withNotes.map((beat) => (
        <section key={beat.id} className="card parent-note">
          <h3>
            Beat {beat.number}: <Rich text={beat.title} />
          </h3>
          <ul>
            {beat.parentNote!.map((note, i) => (
              <li key={i}>
                <Rich text={note} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Overlay>
  );
}
