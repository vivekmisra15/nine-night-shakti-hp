// The shapes every night's content follows.
//
// Lesson text lives in the content files (day1.ts, journey.ts), never in
// components. Text is copied from docs/nights/night-N.md. Inside a string,
// *single stars* mean italics and **double stars** mean bold, as in the docs.

// ---------------------------------------------------------------------------
// Labels: every beat shows one, so the child can always tell a traditional
// account from a modern reading or a Harry Potter scene.
// ---------------------------------------------------------------------------

export type Label =
  | 'tradition'
  | 'interpretation'
  | 'contemporary'
  | 'comparison'
  | 'hogwarts' // a book or film scene
  | 'hypothetical';

// ---------------------------------------------------------------------------
// Direction values, from docs/direction/night-N.md. The visuals and the
// adaptive score read these.
// ---------------------------------------------------------------------------

// A colour palette named in the direction brief (e.g. 'kailasa'), or 'split'
// for two palettes side by side (Night 1, Beat 14). The colours live in
// src/visuals/palettes.ts and each night's src/visuals/dayN/palettes.ts.
export type PaletteKey = string;

export type CameraMove =
  | 'still'
  | 'pushIn'
  | 'pullBack'
  | 'aerial'
  | 'lowAngle'
  | 'orbit'
  | 'pan'
  | 'crane'
  | 'drift';

export type Raga = 'bhupali' | 'bageshri' | 'marwa' | 'yaman' | 'malkauns' | 'durga' | 'bhairav';

// The score is built in layers; each beat says which are active.
export type MusicLayer = 'drone' | 'motif' | 'percussion' | 'strings' | 'climax' | 'resolution';

export interface Music {
  // The two traditions always sound distinct. 'both' alternates them in
  // separate registers without blending (Night 1, Beat 14).
  palette: 'indian' | 'hogwarts' | 'both';
  raga?: Raga; // Indian palette only
  bpm: number;
  layers: MusicLayer[];
}

export interface Direction {
  intensity: number; // 1 = still and meditative, 10 = epic and climactic
  palette: PaletteKey;
  camera: CameraMove;
  music: Music;
  // Story beats only. Times are tied to the narration's sentences (counting
  // from 0), so they stay in step if the text changes.
  freezeAfterLine?: number[]; // the clock pauses when this sentence ends; Space continues
  slowMo?: { line: number; seconds: number }; // the first few seconds of this sentence play slowly
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

// A line that starts with a bold lead, e.g. "**Tradition:** Nava means nine..."
export interface LeadText {
  lead: string;
  text: string;
}

export interface Activity {
  title?: string;
  minutes: number; // drives the visible countdown timer
  text: string;
}

// ---------------------------------------------------------------------------
// Beats. A night is a list of these, in order.
// ---------------------------------------------------------------------------

interface BeatBase {
  id: string; // e.g. 'n1-b5'; the visuals registry uses this
  number: number; // the beat number in the night file
  title: string;
  label: Label;
  minutes: number;
  direction: Direction;
  // "For the parent" notes. They never stop the story: the bell in the header
  // pulses at the start of this beat, and again when sentence
  // `parentNoteAgainAtLine` starts (e.g. just before Sati's death).
  parentNote?: string[];
  parentNoteAgainAtLine?: number;
  // Which rows of the night's sources table (forTheParent.sources, counting
  // from 0) back this beat. They are shown as a short source line.
  sourceRows?: number[];
}

export interface OpeningBeat extends BeatBase {
  type: 'opening';
  heading?: string; // e.g. "What Navaratri is." (only if the night file gives one)
  points: LeadText[];
}

export interface Hotspot {
  id: string; // the illustration uses this to place the tappable area
  symbol: string;
  meaning: string;
  label: Label;
}

export interface StoryBeat extends BeatBase {
  type: 'story';
  intro?: string; // a short note shown above the story, e.g. which texts it follows
  paragraphs: string[];
  hotspotsLabel?: string;
  hotspots?: Hotspot[];
  didYouKnow?: LeadText;
}

export interface ChoiceOption {
  text: string;
  acknowledgement: string; // shown after the learner picks this option
}

export interface ChoiceBeat extends BeatBase {
  type: 'choice';
  setup?: string;
  ask: string;
  options: ChoiceOption[];
  // What happened. Left out when the next story beat is the answer (e.g.
  // Night 9, Beat 6), so there is no reveal step.
  whatHappens?: string;
  // On a short evening the question is skipped and the set-up and what
  // happened are shown as story. If whatHappens leans on the options (e.g.
  // "some of the last two"), it starts at this sentence instead.
  shortEveningFrom?: string;
  activity?: Activity;
}

export interface IdeaBeat extends BeatBase {
  type: 'idea';
  // The night's one core idea, its theme. It is the whole Ideas section, and is
  // shown again at the end of the night and in the closing. All nine are in
  // docs/NINE_NIGHTS_CONTENT.md.
  theme: {
    word: string; // e.g. "Rootedness"
    idea: string; // the one line children should remember
    description: string; // a longer reading (about 100 words)
  };
}

export interface SceneIntroBeat extends BeatBase {
  type: 'sceneIntro';
  // A gentle alternative names the intense scene it can replace (e.g.
  // 'n2-b13'). The parent chooses one of the two at the start of the night.
  gentleFor?: string;
  reference: string; // book, chapter and film
  findScene: LeadText; // there are no video links; families find the scene themselves
  filmNote?: string;
  retelling: string[];
  connection: {
    intro?: string; // an optional lead-in line
    similar: string;
    different: string[];
    whyItHelps: string;
    strength: { rating: 'strong' | 'partial to strong' | 'partial' | 'speculative'; text: string };
    themeLink: string; // "Link to the theme": the narrative hook to the night's theme
  };
}

export interface LadderStep {
  step: 'Notice' | 'Feel' | 'Wonder' | 'Stretch' | 'Turn it around' | 'Connect';
  question: string;
}

export interface FollowUp {
  ifTheySay: string;
  tryAsking: string;
}

export interface Stance {
  left: string;
  right: string;
  note?: string;
}

export interface ThinkBeat extends BeatBase {
  type: 'think';
  ladder: LadderStep[];
  followUps: FollowUp[];
  stance: Stance;
  activity: Activity;
  // When the family chose the gentle alternative scene, these replace the
  // parts that only fit the intense scene. Anything left out stays the same.
  gentle?: { ladder?: LadderStep[]; followUps?: FollowUp[]; stance?: Stance; activity?: Activity };
}

export interface ComparisonBeat extends BeatBase {
  type: 'comparison';
  intro: string;
  questions: string[]; // revealed one at a time
  doesntCompare: string; // always shown
  // With the gentle alternative scene: the full question list and box to use
  // instead (the docs' "With the gentle alternative" lines swapped in).
  gentle?: { questions?: string[]; doesntCompare?: string };
}

// Night 9 only: a look back over the nine nights, closing the series.
export interface LookBackBeat extends BeatBase {
  type: 'lookBack';
  diyasIntro: string; // "Light the diyas…"
  nights: { night: number; devi: string; word: string; idea: string }[];
  threadsIntro: string; // "Pick two:"
  threads: LeadText[];
  honesty: string; // the honesty check
  activity: Activity;
}

export interface TodaySituation {
  title: string;
  setup: string;
  perspectives: string[]; // none is marked as the right answer
  ask: string;
}

export interface TodayBeat extends BeatBase {
  type: 'today';
  intro: string;
  situations: TodaySituation[];
}

export interface ReflectionBeat extends BeatBase {
  type: 'reflection';
  intro: string;
  forChild: string[];
  goDeeper: string[];
  together: string;
  privateNote: string; // the prompt for the note box (saved only on this device)
  tomorrow: string; // a glimpse of the next night (Night 9: the end of the series), shown with the theme at the end
}

export type Beat =
  | OpeningBeat
  | StoryBeat
  | ChoiceBeat
  | IdeaBeat
  | SceneIntroBeat
  | ThinkBeat
  | ComparisonBeat
  | LookBackBeat
  | TodayBeat
  | ReflectionBeat;

// ---------------------------------------------------------------------------
// The read-aloud script (shown with the T key)
// ---------------------------------------------------------------------------

export type ScriptBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'read'; text: string } // read aloud
  | { kind: 'parent'; text: string } // [bracketed] lines for the parent, not read aloud
  | { kind: 'parentList'; items: string[] }; // a bracketed list of questions

// ---------------------------------------------------------------------------
// A whole night
// ---------------------------------------------------------------------------

export interface SourceRow {
  claim: string;
  source: string;
  label: string;
  confidence: string;
}

export interface Night {
  number: number;
  devi: string;
  title: string; // e.g. "Shailaputri, daughter of the mountain"
  summary: string;
  atAGlance: LeadText[];
  // What the short evening (about 15 minutes) leaves out: whole beats by id,
  // or single steps by step id (e.g. 'n1-b4:choiceAsk'). See src/engine/steps.ts.
  shortEveningLeavesOut: string[];
  beats: Beat[];
  forTheParent: {
    remember: string[];
    sources: SourceRow[];
    footnote: string;
  };
  readAloud: {
    intro: string;
    blocks: ScriptBlock[];
    timing: string;
  };
  // The closing after Finish: how long it lasts, and its sound captions. Its
  // picture is the illustration registered as 'nN-closing'.
  // `raga` sets the closing phrase (default Bhupali, Night 1's signature answer).
  closing: { seconds: number; captions: { at: number; text: string }[]; raga?: Raga };
}
