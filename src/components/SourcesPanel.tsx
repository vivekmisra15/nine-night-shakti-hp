// Context and sources (C key): the night at a glance, the notes for the
// parent, and the sources table with confidence levels.

import type { Night } from '../content/types';
import { Overlay } from './Overlay';
import { Lead, Rich } from './Rich';

export function SourcesPanel({ night, onClose }: { night: Night; onClose: () => void }) {
  const { forTheParent } = night;
  return (
    <Overlay title="Context and sources" onClose={onClose}>
      <p>
        <Rich text={night.summary} />
      </p>
      <h3>At a glance</h3>
      <ul>
        {night.atAGlance.map((item) => (
          <li key={item.lead}>
            <Lead item={item} />
          </li>
        ))}
      </ul>

      <h3>For the parent: what to remember</h3>
      <ul>
        {forTheParent.remember.map((item, i) => (
          <li key={i}>
            <Rich text={item} />
          </li>
        ))}
      </ul>

      <h3>Sources and confidence</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Source</th>
              <th>Label</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {forTheParent.sources.map((row, i) => (
              <tr key={i}>
                <td>
                  <Rich text={row.claim} />
                </td>
                <td>
                  <Rich text={row.source} />
                </td>
                <td>{row.label}</td>
                <td>{row.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">
        <Rich text={forTheParent.footnote} />
      </p>
    </Overlay>
  );
}
