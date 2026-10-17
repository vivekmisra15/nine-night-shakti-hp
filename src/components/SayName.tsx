// A small speaker button that says a Devi's name (see src/audio/sayName.ts).
// It is hidden when the device has no offline Hindi voice.

import { sayName, useHindiVoice } from '../audio/sayName';

// A speaker with two sound waves, drawn in a 24 × 24 box.
const speakerPath = 'M4 9h4l5-4v14l-5-4H4z M16 9a4 4 0 0 1 0 6 M18.5 6.5a7.5 7.5 0 0 1 0 11';

interface Props {
  devi: string; // the name in English letters, for the button's label
  devanagari?: string; // what the voice reads
}

// For HTML, e.g. the night header.
export function SayName({ devi, devanagari }: Props) {
  const voice = useHindiVoice();
  if (!voice || !devanagari) return null;
  return (
    <button className="say-name" onClick={() => sayName(devanagari, voice)} aria-label={`Hear the name ${devi}`} title={`Hear the name ${devi}`}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d={speakerPath} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// For inside an SVG picture, e.g. the map. (x, y) is the button's centre.
export function SayNameSvg({ devi, devanagari, x, y }: Props & { x: number; y: number }) {
  const voice = useHindiVoice();
  if (!voice || !devanagari) return null;
  const say = () => sayName(devanagari, voice);
  return (
    <g
      className="say-name-svg"
      role="button"
      tabIndex={0}
      aria-label={`Hear the name ${devi}`}
      onClick={(e) => {
        e.stopPropagation(); // don't also open the night
        say();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          say();
        }
      }}
    >
      <title>{`Hear the name ${devi}`}</title>
      {/* A larger invisible circle, so it is easy to tap. */}
      <circle cx={x} cy={y} r={22} fill="transparent" />
      <circle cx={x} cy={y} r={15} fill="#141A33" stroke="#E8B45A" strokeWidth={1.5} />
      <path d={speakerPath} transform={`translate(${x - 9} ${y - 9}) scale(0.75)`} fill="none" stroke="#FFF4D6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
