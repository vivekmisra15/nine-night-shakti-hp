// The read-aloud script (T key): the whole night as text. Lines for the
// parent are shown in brackets and are not read aloud.

import type { Night } from '../content/types';
import { Overlay } from './Overlay';
import { Rich } from './Rich';

export function ScriptPanel({ night, onClose }: { night: Night; onClose: () => void }) {
  const { readAloud } = night;
  return (
    <Overlay title="Read-aloud script" onClose={onClose}>
      <p className="muted">
        <Rich text={readAloud.intro} />
      </p>
      {readAloud.blocks.map((block, i) => {
        switch (block.kind) {
          case 'heading':
            return <h3 key={i}>{block.text}</h3>;
          case 'read':
            return (
              <p key={i}>
                <Rich text={block.text} />
              </p>
            );
          case 'parent':
            return (
              <p key={i} className="script-parent">
                [<Rich text={block.text} />]
              </p>
            );
          case 'parentList':
            return (
              <ul key={i} className="script-parent">
                {block.items.map((item, j) => (
                  <li key={j}>
                    [<Rich text={item} />]
                  </li>
                ))}
              </ul>
            );
        }
      })}
      <p className="muted">
        <strong>Timing:</strong> <Rich text={readAloud.timing} />
      </p>
    </Overlay>
  );
}
