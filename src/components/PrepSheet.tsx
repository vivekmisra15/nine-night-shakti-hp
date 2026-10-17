// The parent prep sheet, opened from the map: every Harry Potter scene in the
// nine nights in one table, made to print on a single landscape page.
// On a phone, each row stacks into a small card (see .prep in styles.css).

import { mapStops } from '../content/journey';
import { prepIntensityNote, prepIntro, prepNights, prepTitle } from '../content/prep';
import { Rich } from './Rich';

export function PrepSheet({ onBack }: { onBack: () => void }) {
  return (
    <main className="prep">
      <div className="row no-print">
        <button onClick={onBack}>‹ Back to the map</button>
        <button className="primary" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <h1>{prepTitle}</h1>
      {prepIntro.map((text, i) => (
        <p key={i}>
          <Rich text={text} />
        </p>
      ))}
      <p>
        <strong>Intensity:</strong> <Rich text={prepIntensityNote} />
      </p>
      <table>
        <thead>
          <tr>
            <th>Night</th>
            <th>Scene</th>
            <th>Book</th>
            <th>Film</th>
            <th>Intensity</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {prepNights.flatMap(({ night, scenes }) =>
            scenes.map((s, i) => (
              // The night's name goes on its first scene only, so each night reads as one group.
              <tr key={`${night}-${i}`} className={i === 0 ? 'first' : undefined}>
                <td data-label="Night">{i === 0 && `${night} · ${mapStops[night - 1].devi}`}</td>
                <td data-label="Scene">
                  <strong>{s.scene}</strong>
                </td>
                <td data-label="Book">
                  <Rich text={s.book} />
                </td>
                <td data-label="Film">
                  <Rich text={s.film} />
                </td>
                <td data-label="Intensity" className={s.intensity === 'Intense' ? 'intense' : undefined}>
                  {s.intensity}
                </td>
                <td data-label="Note">{s.note && <Rich text={s.note} />}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </main>
  );
}
