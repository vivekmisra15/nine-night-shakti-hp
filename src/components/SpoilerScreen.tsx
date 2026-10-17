// Shown once, before the series starts: the spoiler notice and how we
// compare. The Continue tap also counts as the user gesture that lets the
// music start (browsers block sound until the user does something).

import { howWeCompare, hpDisclaimer, spoilerNotice } from '../content/journey';
import { Rich } from './Rich';

export function SpoilerScreen({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  return (
    <main className="notice">
      <section className="card">
        <h2>{spoilerNotice.title}</h2>
        <p>
          <Rich text={spoilerNotice.text} />
        </p>
      </section>
      <section className="card">
        <h2>{howWeCompare.title}</h2>
        <p>
          <Rich text={howWeCompare.text} />
        </p>
        <p className="muted small">
          <Rich text={hpDisclaimer} />
        </p>
      </section>
      <div className="row">
        <button onClick={onBack}>Back to the map</button>
        <button className="primary" onClick={onContinue} autoFocus>
          Continue
        </button>
      </div>
    </main>
  );
}
