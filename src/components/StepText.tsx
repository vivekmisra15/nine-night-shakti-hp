// The text side of a step: what each kind of step shows. Every word comes
// from the night's content file (src/content/dayN.ts), never from here.

import { useState } from 'react';
import type { Beat, IdeaBeat } from '../content/types';
import { captionLines, narrationOf } from '../engine/storyTiming';
import { openingGroups, type Step } from '../engine/steps';
import { useSaved } from '../state/progress';
import { LabelTag } from './LabelTag';
import { Narration } from './Narration';
import { Lead, Rich } from './Rich';
import { StanceLine } from './StanceLine';
import { Timer } from './Timer';

type Theme = IdeaBeat['theme'];

interface Props {
  beat: Beat;
  step: Step;
  theme?: Theme; // the night's theme, shown again at the end
  t: number; // the step clock, for narration
  complete: boolean; // Reading mode
  shortEvening: boolean;
  gentle: boolean; // the family chose the gentle alternative Harry Potter scene
  // Shown on the night's first screen when it offers a gentle alternative.
  sceneChoice?: { intense: string; gentle: string; onChange: (gentle: boolean) => void };
  cues: Record<string, number>;
  onCue: (name: string) => void;
  onSeek: (t: number) => void;
}

// The night's theme: the word large, then the one-line idea. At the end of
// the story, "Go further" opens the longer description; at the end of the
// night, the theme is shown again with a glimpse of tomorrow.
function ThemeScreen({ theme, complete, ending = false, tomorrow }: { theme: Theme; complete: boolean; ending?: boolean; tomorrow?: string }) {
  const [open, setOpen] = useState(complete);
  return (
    <div className="text-led">
      <p className="eyebrow">{ending ? 'Tonight’s theme' : 'What the story is about'}</p>
      <p className="theme-word">{theme.word}</p>
      <p className="primary-idea">
        <Rich text={theme.idea} />
      </p>
      {!ending &&
        (open || complete ? (
          <p className="unfold theme-description">
            <Rich text={theme.description} />
          </p>
        ) : (
          <button className="primary" onClick={() => setOpen(true)}>
            Go further
          </button>
        ))}
      {ending && tomorrow && (
        <>
          <p className="muted">
            <strong>Tomorrow:</strong> <Rich text={tomorrow} />
          </p>
          <p className="muted small">Press Finish to close the night.</p>
        </>
      )}
    </div>
  );
}

// On a short evening a choice's outcome is shown as story, from the sentence
// the night file names if the outcome leans on the options.
function shortOutcome(beat: Extract<Beat, { type: 'choice' }>) {
  const text = beat.whatHappens ?? '';
  const from = beat.shortEveningFrom ? text.indexOf(beat.shortEveningFrom) : -1;
  return from >= 0 ? text.slice(from) : text;
}

function Choice({ beat, step, complete, shortEvening, cues, onCue }: { beat: Extract<Beat, { type: 'choice' }>; step: Step; complete: boolean; shortEvening: boolean; cues: Record<string, number>; onCue: (n: string) => void }) {
  const picked = Object.keys(cues).filter((k) => k.startsWith('pick:')).at(-1);
  const pickedIndex = picked ? Number(picked.slice(5)) : null;
  if (step.kind === 'choiceReveal') {
    if (shortEvening) {
      return (
        <p className="reveal">
          <strong>What happens:</strong> <Rich text={shortOutcome(beat)} />
        </p>
      );
    }
    if (!complete && !('reveal' in cues)) {
      return (
        <>
          <p className="muted">When you have talked it through:</p>
          <button className="primary" onClick={() => onCue('reveal')}>
            See what happened
          </button>
        </>
      );
    }
    return (
      <p className="reveal">
        <strong>What happens:</strong> <Rich text={beat.whatHappens ?? ''} />
      </p>
    );
  }
  return (
    <>
      <h3>
        <Rich text={beat.ask} />
      </h3>
      <div className="choices">
        {beat.options.map((option, i) => (
          <button key={i} className="choice" aria-pressed={pickedIndex === i} onClick={() => onCue(`pick:${i}`)}>
            <Rich text={option.text} />
          </button>
        ))}
      </div>
      {complete ? (
        <ul className="small">
          {beat.options.map((option, i) => (
            <li key={i}>
              <Rich text={option.acknowledgement} />
            </li>
          ))}
        </ul>
      ) : (
        pickedIndex !== null && (
          <p className="acknowledgement" aria-live="polite">
            <Rich text={beat.options[pickedIndex].acknowledgement} />
          </p>
        )
      )}
    </>
  );
}

export function StepText({ beat, step, theme, t, complete, shortEvening, gentle, sceneChoice, cues, onCue, onSeek }: Props) {
  const [rung, setRung] = useState(1);
  const [question, setQuestion] = useState(1);
  const [note, setNote] = useSaved(`note:${beat.id}`, '');

  switch (step.kind) {
    case 'opening': {
      if (beat.type !== 'opening') return null;
      const group = openingGroups(beat)[step.part];
      return (
        <>
          {step.part === 0 && beat.heading && <h3>{beat.heading}</h3>}
          {group.map((i) => (
            <p key={i}>
              <Lead item={beat.points[i]} />
            </p>
          ))}
          {step.part === 0 && sceneChoice && (
            // The parent chooses tonight's second Harry Potter scene.
            <fieldset className="scene-choice">
              <legend>For the parent: tonight's second Harry Potter scene</legend>
              <label className="option">
                <input type="radio" name="scene" checked={!gentle} onChange={() => sceneChoice.onChange(false)} />
                <Rich text={sceneChoice.intense} /> (intense)
              </label>
              <label className="option">
                <input type="radio" name="scene" checked={gentle} onChange={() => sceneChoice.onChange(true)} />
                <Rich text={sceneChoice.gentle} /> (gentle alternative)
              </label>
            </fieldset>
          )}
        </>
      );
    }

    case 'narration':
    case 'retelling':
      return (
        <>
          {beat.type === 'story' && beat.intro && (
            <p className="muted small">
              <Rich text={beat.intro} />
            </p>
          )}
          <Narration lines={captionLines(narrationOf(beat))} t={t} complete={complete} onSeek={onSeek} />
          {/* A Harry Potter scene: where to find it, in a small line underneath. */}
          {beat.type === 'sceneIntro' && (
            <div className="scene-ref small">
              <p>
                <strong>Reference:</strong> <Rich text={beat.reference} />
              </p>
              <p>
                <Lead item={beat.findScene} />
              </p>
              {beat.filmNote && (
                <details>
                  <summary>Film note</summary>
                  <p>
                    <Rich text={beat.filmNote} />
                  </p>
                </details>
              )}
            </div>
          )}
        </>
      );

    case 'symbols': {
      if (beat.type !== 'story') return null;
      const open = Object.keys(cues).filter((k) => k.startsWith('hotspot:')).at(-1)?.slice(8);
      const hotspot = beat.hotspots?.find((h) => h.id === open);
      return (
        <>
          {beat.hotspots && (
            <>
              <p className="muted small">{beat.hotspotsLabel}</p>
              <div className="row wrap">
                {beat.hotspots.map((h) => (
                  <button key={h.id} aria-pressed={open === h.id} onClick={() => onCue(`hotspot:${h.id}`)}>
                    {h.symbol}
                  </button>
                ))}
              </div>
              {hotspot && (
                <p aria-live="polite">
                  <LabelTag label={hotspot.label} /> <Rich text={hotspot.meaning} />
                </p>
              )}
            </>
          )}
        </>
      );
    }

    case 'didYouKnow':
      return beat.type === 'story' && beat.didYouKnow ? (
        <p className="did-you-know">
          <Lead item={beat.didYouKnow} />
        </p>
      ) : null;

    case 'choiceSetup':
      return beat.type === 'choice' && beat.setup ? (
        <p>
          <strong>Set-up:</strong> <Rich text={beat.setup} />
        </p>
      ) : null;

    case 'choiceAsk':
    case 'choiceReveal':
      return beat.type === 'choice' ? <Choice beat={beat} step={step} complete={complete} shortEvening={shortEvening} cues={cues} onCue={onCue} /> : null;

    case 'activity':
      return beat.type === 'choice' && beat.activity ? <Timer activity={beat.activity} /> : null;

    case 'theme':
      return beat.type === 'idea' ? <ThemeScreen key={step.id} theme={beat.theme} complete={complete} /> : null;

    case 'connection': {
      // One full-width screen: what is similar, what is different, why it helps.
      if (beat.type !== 'sceneIntro') return null;
      const c = beat.connection;
      return (
        <div className="text-led connection">
          <p className="eyebrow">The connection</p>
          {c.intro && (
            <p className="muted">
              <Rich text={c.intro} />
            </p>
          )}
          <p>
            <strong>What is similar:</strong> <Rich text={c.similar} />
          </p>
          <div>
            <p>
              <strong>What is different:</strong>
            </p>
            <ul>
              {c.different.map((d, i) => (
                <li key={i}>
                  <Rich text={d} />
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Why the comparison helps:</strong> <Rich text={c.whyItHelps} />
          </p>
          <p>
            <span className="strength">Strength: {c.strength.rating}.</span> <Rich text={c.strength.text} />
          </p>
          <p>
            <strong>Link to the theme:</strong> <Rich text={c.themeLink} />
          </p>
        </div>
      );
    }

    case 'think': {
      // "Think it through" on one screen: the ladder and parent follow-ups on
      // the left; the stance line and the activity on the right.
      if (beat.type !== 'think') return null;
      // With the gentle alternative scene, its own questions replace those that only fit the intense one.
      const g = gentle ? beat.gentle : undefined;
      const ladder = g?.ladder ?? beat.ladder;
      const followUps = g?.followUps ?? beat.followUps;
      const stance = g?.stance ?? beat.stance;
      const shown = complete ? ladder : ladder.slice(0, rung);
      return (
        <div className="think-grid">
          <div>
            <p className="eyebrow">Think it through</p>
            {shortEvening && <p className="muted small">Short evening: choose two of these questions.</p>}
            <ol className="ladder">
              {shown.map((r) => (
                <li key={r.step}>
                  <strong>{r.step}:</strong> <Rich text={r.question} />
                </li>
              ))}
            </ol>
            {!complete && rung < ladder.length && (
              <button
                onClick={() => {
                  setRung(rung + 1);
                  onCue(`rung:${rung}`);
                }}
              >
                Next question: {ladder[rung].step}
              </button>
            )}
            {followUps.length > 0 && (
            <details className="parent-drawer" open={complete}>
              <summary>For the parent: if they say…, try asking…</summary>
              <ul>
                {followUps.map((f, i) => (
                  <li key={i}>
                    “<Rich text={f.ifTheySay} />” → “<Rich text={f.tryAsking} />”
                  </li>
                ))}
              </ul>
            </details>
            )}
          </div>
          <div>
            <StanceLine id={g?.stance ? `${beat.id}-gentle` : beat.id} left={stance.left} right={stance.right} note={stance.note} />
            <Timer activity={g?.activity ?? beat.activity} />
          </div>
        </div>
      );
    }

    case 'comparison': {
      if (beat.type !== 'comparison') return null;
      const questions = (gentle && beat.gentle?.questions) || beat.questions;
      const doesntCompare = (gentle && beat.gentle?.doesntCompare) || beat.doesntCompare;
      const shown = complete ? questions : questions.slice(0, question);
      return (
        <>
          <p className="muted small">
            <Rich text={beat.intro} />
          </p>
          <ol>
            {shown.map((q, i) => (
              <li key={i}>
                <Rich text={q} />
              </li>
            ))}
          </ol>
          {!complete && question < questions.length && (
            <button
              onClick={() => {
                setQuestion(question + 1);
                onCue(`question:${question}`);
              }}
            >
              Next question
            </button>
          )}
          <p className="doesnt-compare">
            <strong>What doesn't compare:</strong> <Rich text={doesntCompare} />
          </p>
        </>
      );
    }

    case 'lookBackDiyas': {
      // Night 9: each night's line appears in turn, as its diya lights in the picture.
      if (beat.type !== 'lookBack') return null;
      return (
        <div className="text-led">
          <p className="eyebrow">Nine nights, looking back</p>
          <p className="muted small">
            <Rich text={beat.diyasIntro} />
          </p>
          <ol className="look-back">
            {beat.nights.map((n) => (
              <li key={n.night}>
                <strong>
                  {n.night} · {n.devi} · {n.word}.
                </strong>{' '}
                <Rich text={n.idea} />
              </li>
            ))}
          </ol>
        </div>
      );
    }

    case 'lookBackThreads':
      if (beat.type !== 'lookBack') return null;
      return (
        <div className="text-led">
          <p className="eyebrow">Threads that kept coming back</p>
          <p className="muted small">
            <Rich text={beat.threadsIntro} />
          </p>
          <ul className="questions">
            {beat.threads.map((thread, i) => (
              <li key={i}>
                <Lead item={thread} />
              </li>
            ))}
          </ul>
          <p>
            <strong>Honesty check:</strong> <Rich text={beat.honesty} />
          </p>
        </div>
      );

    case 'lookBackActivity':
      return beat.type === 'lookBack' ? <Timer activity={beat.activity} /> : null;

    case 'today': {
      if (beat.type !== 'today') return null;
      const s = beat.situations[step.part];
      return (
        <>
          {step.part === 0 && (
            <p className="muted small">
              <Rich text={beat.intro} />
            </p>
          )}
          <h3>
            <Rich text={s.title} />
          </h3>
          <p>
            <Rich text={s.setup} />
          </p>
          <ul className="perspectives">
            {s.perspectives.map((p, i) => (
              <li key={i}>
                <Rich text={p} />
              </li>
            ))}
          </ul>
          <p>
            <strong>Ask:</strong> <Rich text={s.ask} />
          </p>
        </>
      );
    }

    case 'talk':
      if (beat.type !== 'reflection') return null;
      return (
        <div className="text-led">
          <p className="eyebrow">Together</p>
          <p className="idea-big">
            <Rich text={beat.together.charAt(0).toUpperCase() + beat.together.slice(1)} />
          </p>
          <p className="muted small">
            <Rich text={beat.intro} />
          </p>
          <p>
            <strong>For the child</strong>
          </p>
          <ul className="questions">
            {beat.forChild.map((q, i) => (
              <li key={i}>
                <Rich text={q} />
              </li>
            ))}
          </ul>
          <details className="parent-drawer" open={complete}>
            <summary>Go deeper</summary>
            <ul>
              {beat.goDeeper.map((q, i) => (
                <li key={i}>
                  <Rich text={q} />
                </li>
              ))}
            </ul>
          </details>
          <label htmlFor="private-note" className="small">
            <strong>Private note (saved only on this device):</strong> <Rich text={beat.privateNote} />
          </label>
          <textarea id="private-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      );

    case 'themeEnd':
      if (beat.type !== 'reflection' || !theme) return null;
      return <ThemeScreen theme={theme} complete={complete} ending tomorrow={beat.tomorrow} />;
  }
}
