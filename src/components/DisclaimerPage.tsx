// The full disclaimer and statement of intent, opened from the splash
// screen (and the map). Its text is in src/content/disclaimer.ts, copied
// from docs/DISCLAIMER.md.

import { disclaimerSections, disclaimerTitle } from '../content/disclaimer';
import { Rich } from './Rich';

export function DisclaimerPage({ onBack, backLabel }: { onBack: () => void; backLabel: string }) {
  return (
    <main className="prep disclaimer">
      <div className="row">
        <button onClick={onBack} autoFocus>
          ‹ {backLabel}
        </button>
      </div>
      <h1>{disclaimerTitle}</h1>
      {disclaimerSections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, i) =>
            block.kind === 'p' ? (
              <p key={i}>
                <Rich text={block.text} />
              </p>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Rich text={item} />
                  </li>
                ))}
              </ul>
            ),
          )}
        </section>
      ))}
    </main>
  );
}
