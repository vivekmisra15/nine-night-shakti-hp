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

// Colour palettes named in the direction brief. Hex values live in the visuals.
export type PaletteKey =
  | 'kailasa'
  | 'dakshaCourt'
  | 'grief'
  | 'himalayanDawn'
  | 'reflective'
  | 'hogwartsDinner'
  | 'greatHall'
  | 'split'; // two palettes side by side (Night 1, Beat 14)

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

export type Raga = 'bhupali' | 'bageshri' | 'marwa' | 'yaman';

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
  heading: string; // e.g. "What Navaratri is."
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
  whatHappens: string;
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
  reference: string; // book, chapter and film
  findScene: LeadText; // there are no video links; families find the scene themselves
  filmNote?: string;
  retelling: string[];
  connection: {
    intro?: string; // an optional lead-in line
    similar: string;
    different: string[];
    whyItHelps: string;
    strength: { rating: 'strong' | 'partial' | 'speculative'; text: string };
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

export interface ThinkBeat extends BeatBase {
  type: 'think';
  shortPathSkipsActivity?: boolean; // the short path leaves out this activity
  ladder: LadderStep[];
  followUps: FollowUp[];
  stance: { left: string; right: string; note?: string };
  activity: Activity;
}

export interface ComparisonBeat extends BeatBase {
  type: 'comparison';
  intro: string;
  questions: string[]; // revealed one at a time
  doesntCompare: string; // always shown
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
  tomorrow: string; // a glimpse of the next night, shown with the theme at the end
}

export type Beat =
  | OpeningBeat
  | StoryBeat
  | ChoiceBeat
  | IdeaBeat
  | SceneIntroBeat
  | ThinkBeat
  | ComparisonBeat
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
}
