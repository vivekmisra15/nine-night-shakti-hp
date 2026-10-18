// Shows a content string with its formatting: *italics* and **bold**,
// written the same way as in the docs.

import type { LeadText } from '../content/types';

export function Rich({ text }: { text: string }) {
  // Bold first (it may contain *italics*), then italics on their own.
  const parts = text.split(/(\*\*(?:[^*]|\*[^*]+\*)+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return (
            <strong key={i}>
              <Rich text={part.slice(2, -2)} />
            </strong>
          );
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </>
  );
}

// "**Lead:** text", as the docs write it.
export function Lead({ item }: { item: LeadText }) {
  return (
    <>
      <strong>{item.lead}:</strong> <Rich text={item.text} />
    </>
  );
}
