// The visible label on every beat, so the child can always tell a source's
// narrative from a modern reading or a Harry Potter scene.

import type { Label } from '../content/types';

// What each label means, shown when the tag is hovered or focused.
const meanings: Record<Label, string> = {
  tradition: 'The account in a named text or regional tradition',
  interpretation: 'A traditional devotional or philosophical reading',
  contemporary: 'A modern reading',
  comparison: 'Comparing the two stories',
  hogwarts: 'A Harry Potter book or film scene',
  hypothetical: 'What might happen: you decide',
};

export function LabelTag({ label }: { label: Label }) {
  return (
    <span className={`label label-${label}`} title={meanings[label]}>
      {label}
    </span>
  );
}
