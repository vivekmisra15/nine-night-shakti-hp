# Nine Nights - The Story of Shakti

An interactive web app for a parent and a pre-teen, one night of Navaratri at a time. Each night tells a Navadurga story from traditional sources, then compares a decision in it with a decision in a Harry Potter scene, showing the differences honestly. It has no backend, no accounts and no network calls.

**Status (17 October 2026):** Night 1 is complete and handed over for review: the opening splash, the constellation map, and Night 1 in 35 steps, with its pictures, music and closing. Nights 2–9 read "being written" on the map.

## Running it

You need Node.js 20 or later (this Mac has 24). In this folder:

| Command | What it does |
| --- | --- |
| `npm install` | Installs the packages (first time only). |
| `npm run dev` | Starts the app at http://localhost:5173 and reloads as you edit. |
| `npm run typecheck` | Checks the code for type errors. |
| `npm run build` | Builds the finished app into `dist/`, which works from any folder or web host. |
| `npm run preview` | Serves the built `dist/` folder to check it. |

## Where things live

| Path | What it is |
| --- | --- |
| `docs/` | The source of truth for all text: the plan, each night's lesson and script, and the animation and music direction. |
| `src/content/` | Lesson text copied from `docs/` (`day1.ts`), series text (`journey.ts`), and the shapes it follows (`types.ts`). |
| `src/engine/` | The clock (play, pause, slow motion, replay, freeze-frames), story caption timing, and animation helpers. |
| `src/visuals/` | Illustrations: `shared.tsx` is the drawing kit (sky, mountains, flames, particles, mandalas), `figures.tsx` draws the outline people, the divine lights and the symbol icons, `day1/` has one file per Night 1 picture, `palettes.ts` has the colours, and `index.ts` says which picture goes with which beat. |
| `src/audio/` | The generative music: `ragas.ts` (scales and phrases, with why each raga was chosen), `voices.ts` (the synthesised instruments), `score.ts` (the adaptive layers), `engine.ts` (volumes and the master limiter) and `day1Score.ts` (Night 1's musical moments and sound captions). |
| `src/components/` | The splash, the map, the spoiler screen, the night player (header, bottom bar, the text for each step in `StepText.tsx`, the sentence-by-sentence `Narration.tsx`), the closing and the panels. |
| `src/state/progress.ts` | What the app remembers (progress, notes, stance names, settings), saved only in this browser. |
| `src/styles.css` | All styling. Colours are variables at the top. |

## Editing text

1. Change the wording in `docs/nights/night-N.md` first.
2. Copy the same change into `src/content/dayN.ts`. Text is in plain strings: `*word*` makes italics and `**word**` makes bold.
3. Save. If `npm run dev` is running, the page updates by itself.

Never put lesson text in the components.

## Harry Potter scenes (no video links)

The app has no YouTube or other video links, to avoid copyright problems. Each scene shows a "Find the scene" note with the book, chapter and film, and the family finds it in their own copy. The splash and "How we compare" also say that the books and films were not written with Navaratri in mind, and that the links are our own interpretation (wording in `docs/NINE_NIGHTS_CONTENT.md`).

## How the night is shown

- **Steps:** each beat is split into short steps, one screen each (25, on the full night and the short path). The list and where each screen's words come from are in `docs/direction/night-1.md`; the code that splits beats into steps is `src/engine/steps.ts`.
- **Narration** appears sentence by sentence (`src/components/Narration.tsx`). The **reading pace** (Settings) can be Slower (the default, for reading aloud), Relaxed, or Tap to continue.
- **Theme:** each night has a theme (a word, a one-line idea and a description), agreed in `docs/NINE_NIGHTS_CONTENT.md`. The story ends on it, the night ends on it again, and the closing shows it.
- **Short path / Full night:** the switch in the bottom bar applies the night file's short path.
- **For the parent:** the bell in the header pulses where the night file places a parent note. Tap it to read the note; the story never stops by itself.

## Controls

Space plays or pauses (and continues from a freeze-frame), ← → move between steps, R replays, S toggles slow motion, T shows the read-aloud script, C shows context and sources, and M turns music on or off. Every control also has an on-screen button. Reading mode (in Settings) turns animation off and shows every beat complete; it switches on by itself when the device asks for reduced motion.

## Changing the music

The splash and map play a calm, generative piece in Raga Bhupali that starts softly on the first tap (browsers allow sound only after one). Each night's scenes follow their own ragas, chosen and explained in `src/audio/ragas.ts`.

- **A moment in a beat** (a bell at a sentence, a change of instrument): edit that beat in `src/audio/day1Score.ts`. `line: 3` means "when sentence 3 starts", counting from 0.
- **A beat's raga, tempo or layers:** edit its `direction.music` in `src/content/day1.ts`.
- **Overall loudness:** use the volume sliders in Settings. The master chain in `engine.ts` keeps the output below −1 dBFS.

## Adding the next night

1. Confirm the night's theme with Supriya (all nine are in `docs/NINE_NIGHTS_CONTENT.md`) and copy it into `docs/nights/night-N.md`.
2. Write `docs/direction/night-N.md` and get it approved.
3. Create `src/content/dayN.ts` following `day1.ts`, copying the text from `docs/nights/night-N.md`.
4. Add it to the `nights` list in `src/App.tsx`, and set `built: true` for that night in `src/content/journey.ts`.
5. Add the night's illustrations in `src/visuals/dayN/` and register them in `src/visuals/index.ts`.
6. Write its score plan in `src/audio/dayNScore.ts` and add it next to the night in `src/App.tsx`.
