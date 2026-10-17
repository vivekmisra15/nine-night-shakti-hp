// Plays one night, step by step: a 16:9 picture on the left and the step's
// text on the right (on a phone, the picture above), with the header, the
// bottom bar, the keyboard controls and the panels. Nothing scrolls except
// the panels, and the text pane in Reading mode.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { musicLevel, playEffect, sendCue, useScore } from '../audio';
import { type BeatScore, captionAt } from '../audio/score';
import type { MapStop } from '../content/journey';
import type { Beat, Night } from '../content/types';
import { buildSteps, isNarrated, type Section, type Step } from '../engine/steps';
import { beatDuration, lineTimes, narrationLength, setReadingPace, storyMoments } from '../engine/storyTiming';
import { useClock } from '../engine/useClock';
import type { Settings } from '../state/progress';
import { illustrationFor } from '../visuals';
import { ControlBar, type Panel } from './ControlBar';
import { LabelTag } from './LabelTag';
import { ParentNote } from './ParentNote';
import { PlayerHeader } from './PlayerHeader';
import { Rich } from './Rich';
import { ScriptPanel } from './ScriptPanel';
import { SettingsPanel } from './SettingsPanel';
import { SourcesPanel } from './SourcesPanel';
import { StepText } from './StepText';

interface Props {
  night: Night;
  score: Record<string, BeatScore>; // the night's score plan (e.g. day1Score)
  stop: MapStop; // the night's name on the map (with its Devanagari)
  startStepId?: string;
  settings: Settings;
  onSettings: (settings: Settings) => void;
  reading: boolean; // Reading mode, already worked out from settings and the device
  deviceReducedMotion: boolean;
  onStepChange: (stepId: string) => void;
  onFinish: () => void;
  onExit: () => void;
}

// Keys typed into a text box or slider must not trigger the controls.
const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

// Where a step's picture starts when it isn't timed: after a story's
// narration, or after a scene's animation, the picture shows its last frame.
function pictureFloor(step: Step, beat: Beat) {
  if (step.kind === 'symbols' || step.kind === 'didYouKnow') return narrationLength(beat);
  if (beat.type === 'sceneIntro') return narrationLength(beat); // the connection: the scene's last frame
  if (step.kind === 'opening' && step.part > 0) return beatDuration(beat);
  return 0;
}

// Find a step by id; if it no longer exists (the short evening left it out),
// the first step of the same beat or a later one.
function findStep(steps: Step[], night: Night, id: string | undefined) {
  const exact = steps.findIndex((s) => s.id === id);
  if (exact >= 0) return exact;
  const beatIndex = night.beats.findIndex((b) => id?.startsWith(`${b.id}:`));
  const later = steps.findIndex((s) => s.beatIndex >= beatIndex);
  return Math.max(0, later);
}

export function NightPlayer(props: Props) {
  const { night, settings, onSettings, reading, onStepChange, onFinish } = props;

  // The reading pace is shared by the text, the pictures and the music.
  setReadingPace(settings.readingPace);

  const steps = useMemo(() => buildSteps(night, settings.shortEvening), [night, settings.shortEvening]);
  const [stepId, setStepId] = useState(props.startStepId ?? steps[0].id);
  const index = findStep(steps, night, stepId);
  const step = steps[index];
  const beat = night.beats[step.beatIndex];

  const [panel, setPanel] = useState<Panel>(null);
  // What the learner has done in this beat (chosen, revealed...), with the
  // picture time of each. Pictures, music and captions react to these.
  const [cues, setCues] = useState<Record<string, number>>({});
  // Where the picture's time starts for an untimed step (it carries on from
  // the step before, so cues and animations stay in order).
  const [pictureBase, setPictureBase] = useState(0);
  const [bellPulse, setBellPulse] = useState(0);

  // The clock for this step.
  const narrated = isNarrated(step);
  const openingIntro = step.kind === 'opening' && step.part === 0;
  const duration = narrated ? narrationLength(beat) : openingIntro ? beatDuration(beat) : Infinity;
  const moments = narrated ? storyMoments(beat) : { freezeAt: [], slowMo: undefined };
  const clock = useClock({
    duration,
    freezeAt: moments.freezeAt,
    slowMo: moments.slowMo,
    slowMotion: settings.slowMotion,
    autoPlay: !reading,
    resetKey: `${step.id}:${settings.readingPace}`,
  });

  // Reading mode shows every step complete.
  const { finish } = clock;
  useEffect(() => {
    if (reading) finish();
  }, [reading, finish, step.id]);

  // The picture's time: the clock itself for narrated and timed steps (a
  // Harry Potter scene plays at its own pace, then holds its last frame while
  // the retelling finishes); otherwise carrying on from where the picture was.
  const pictureT = narrated || openingIntro ? clock.t : Math.max(pictureFloor(step, beat), pictureBase) + clock.t;

  const goTo = useCallback(
    (nextIndex: number) => {
      const next = steps[Math.max(0, Math.min(steps.length - 1, nextIndex))];
      const sameBeat = next.beatIndex === step.beatIndex;
      setPictureBase(sameBeat ? pictureT : 0);
      if (!sameBeat) setCues({});
      setStepId(next.id);
      onStepChange(next.id);
    },
    [steps, step.beatIndex, pictureT, onStepChange],
  );

  const isLast = index === steps.length - 1;
  const next = useCallback(() => (isLast ? onFinish() : goTo(index + 1)), [isLast, onFinish, goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const onCue = useCallback(
    (name: string) => {
      // Re-adding moves the cue to the end, so the latest is always last.
      setCues((all) => {
        const nextCues = { ...all };
        delete nextCues[name];
        nextCues[name] = pictureT;
        return nextCues;
      });
      sendCue(name);
    },
    [pictureT],
  );

  // The theme at the end brings a little golden dust and a bell. (Only when the
  // step changes, so onCue is read through a ref.)
  const onCueRef = useRef(onCue);
  onCueRef.current = onCue;
  useEffect(() => {
    if (step.kind === 'themeEnd') onCueRef.current('takeaway');
  }, [step.id, step.kind]);

  // The parent bell pulses (with a soft chime) at the start of a beat that
  // has a parent note, and again at the sentence the night file names.
  const firstStepOfBeat = steps.findIndex((s) => s.beatIndex === step.beatIndex) === index;
  useEffect(() => {
    if (beat.parentNote && firstStepOfBeat) {
      setBellPulse((n) => n + 1);
      playEffect('hotspot');
    }
  }, [step.id, beat.parentNote, firstStepOfBeat]);
  const lastT = useRef(0);
  useEffect(() => {
    const line = beat.parentNoteAgainAtLine;
    if (line !== undefined && narrated) {
      const at = lineTimes(beat, line).start;
      if (lastT.current < at && clock.t >= at) {
        setBellPulse((n) => n + 1);
        playEffect('hotspot');
      }
    }
    lastT.current = clock.t;
  }, [clock.t, beat, narrated]);

  // Keyboard controls.
  const set = useCallback((patch: Partial<Settings>) => onSettings({ ...settings, ...patch }), [onSettings, settings]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      const toggle = (p: Panel) => setPanel((open) => (open === p ? null : p));
      if (key === 't') return toggle('script');
      if (key === 'c') return toggle('sources');
      if (panel) return;
      const timed = Number.isFinite(duration) && !reading;
      if (key === ' ') {
        e.preventDefault(); // stop the page scrolling or a focused button being pressed
        if (timed) clock.toggle();
      } else if (key === 'arrowright') next();
      else if (key === 'arrowleft') prev();
      else if (key === 'r' && timed) clock.replay();
      else if (key === 's' && !reading) set({ slowMotion: !settings.slowMotion });
      else if (key === 'm') set({ music: !settings.music });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panel, duration, reading, clock, next, prev, set, settings.slowMotion, settings.music]);

  // The music follows the picture's time.
  const plan = props.score[beat.id];
  useScore({ beat, plan, t: pictureT, playing: clock.playing || !Number.isFinite(duration), slow: settings.slowMotion || clock.rate < 1, settings });

  // The night's theme, shown again at the end.
  const ideaBeat = night.beats.find((b) => b.type === 'idea');
  const theme = ideaBeat?.type === 'idea' ? ideaBeat.theme : undefined;
  const Illustration = illustrationFor(beat.id);
  const caption = settings.captions && !reading ? captionAt(beat, plan, pictureT, cues) : undefined;
  const pulse = reading ? 0 : musicLevel();
  const sectionsHere = [...new Set(steps.map((s) => s.section))] as Section[];
  // (A Harry Potter scene shows its own reference instead, so no source line.)
  const sources = beat.type === 'sceneIntro' ? [] : (beat.sourceRows ?? []).map((i) => night.forTheParent.sources[i]?.source).filter(Boolean);
  const letterbox = beat.label === 'hogwarts';

  const picture = (
    <Illustration
      beat={beat}
      t={pictureT}
      duration={beatDuration(beat)}
      frozen={clock.frozen}
      complete={reading}
      cues={cues}
      onCue={onCue}
      pulse={pulse}
    />
  );

  const text = (
    <StepText beat={beat} step={step} theme={theme} t={clock.t} complete={reading} shortEvening={settings.shortEvening} cues={cues} onCue={onCue} onSeek={clock.seek} />
  );

  return (
    <div className="player">
      <PlayerHeader
        stop={props.stop}
        current={step.section}
        available={sectionsHere}
        onSection={(s) => goTo(steps.findIndex((x) => x.section === s))}
        onExit={props.onExit}
        hasParentNotes={night.beats.some((b) => b.parentNote)}
        bellPulse={bellPulse}
        onBell={() => setPanel('parent')}
      />

      {step.textLed ? (
        <main className="player-main text-led-layout">
          {/* The picture stays as a faint backdrop behind text-led steps. */}
          <div className="backdrop" aria-hidden="true">
            {picture}
          </div>
          <section className="text-pane wide">
            {/* Theme screens are readings, so they are labelled interpretation. */}
            <LabelTag label={step.kind === 'themeEnd' ? 'interpretation' : beat.label} />
            {text}
          </section>
        </main>
      ) : (
        <main className="player-main">
          <div className="stage-wrap">
            <div className={`stage${letterbox ? ' letterbox' : ''}`}>
              {picture}
              {caption && <p className="caption">[{caption}]</p>}
              {clock.frozen && (
                <p className="stage-hint">{settings.readingPace === 'tap' ? 'Space or Next to continue' : 'Freeze-frame: Space to continue'}</p>
              )}
              {(settings.slowMotion || clock.rate < 1) && !reading && <p className="stage-badge">Slow motion · 0.35×</p>}
            </div>
          </div>
          <section className="text-pane">
            <LabelTag label={beat.label} />
            <h2 className="step-title">
              <Rich text={beat.title} />
            </h2>
            {text}
            {sources.length > 0 && (
              <p className="source-line">
                <span className="eyebrow">Source</span> <Rich text={sources.join(' · ')} />
              </p>
            )}
          </section>
        </main>
      )}

      <ControlBar
        clock={clock}
        timed={Number.isFinite(duration)}
        duration={duration}
        reading={reading}
        settings={settings}
        onSettings={onSettings}
        stepNumber={index + 1}
        stepCount={steps.length}
        canGoBack={index > 0}
        isLast={isLast}
        onPrev={prev}
        onNext={() => {
          // With "tap to continue", Next first moves the story on a sentence.
          if (settings.readingPace === 'tap' && narrated && clock.frozen) clock.play();
          else next();
        }}
        onOpen={(p) => setPanel((open) => (open === p ? null : p))}
      />

      {panel === 'script' && <ScriptPanel night={night} onClose={() => setPanel(null)} />}
      {panel === 'sources' && <SourcesPanel night={night} onClose={() => setPanel(null)} />}
      {panel === 'parent' && <ParentNote night={night} onClose={() => setPanel(null)} />}
      {panel === 'settings' && (
        <SettingsPanel
          settings={settings}
          onChange={onSettings}
          deviceReducedMotion={props.deviceReducedMotion}
          onClose={() => setPanel(null)}
          onOpen={(p) => setPanel(p)}
        />
      )}
    </div>
  );
}
