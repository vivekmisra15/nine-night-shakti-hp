# Nine Nights - The Story of Shakti

An interactive web app for a parent and a pre-teen, one night of Navaratri at a time. Each night tells a Navadurga story from traditional sources, then compares a decision in it with a decision in a Harry Potter scene, showing the differences honestly. It has no backend, no accounts and no network calls.

## Disclaimer

*Nine Nights* is independent, free and non-commercial, and is not affiliated with J.K. Rowling, Warner Bros. or the Harry Potter publishers. It reproduces no text, images, audio or video from the books or films: scenes are retold in our own words, the pictures are original abstract artwork, and families find the scenes in their own copies. The interpretations are our own. See the [full disclaimer](docs/DISCLAIMER.md), which the app also shows on its Disclaimer page.

## Licence

This project is dedicated to the public domain under [CC0 1.0](LICENSE): anyone may copy, change, share and build on the code, the lesson text and the pictures, for any purpose, without asking or giving credit. This covers only our own work. It grants no rights in Harry Potter names, titles or other material owned by others (see the disclaimer above).

**Status (18 October 2026):** all nine nights are built and handed over for review: the opening splash, the constellation map, the parent prep sheet, and Nights 1–9, each with its pictures, music, short evening and closing. Nights 2, 3 and 7 offer a gentle alternative Harry Potter scene, and Night 9 closes the series with a look back over all nine nights.

## Running it

You need Node.js 20 or later (this Mac has 24). In this folder:

| Command | What it does |
| --- | --- |
| `npm install` | Installs the packages (first time only). |
| `npm run dev` | Starts the app at http://localhost:5173 and reloads as you edit. |
| `npm run typecheck` | Checks the code for type errors. |
| `npm run build` | Builds the finished app into `dist/`, which works from any folder or web host. |
| `npm run preview` | Serves the built `dist/` folder to check it. |

## Publishing (GitHub Pages)

The app is published at https://vivekmisra15.github.io/nine-night-shakti-hp/. Every push to `main` rebuilds and republishes it automatically, using the steps in `.github/workflows/deploy.yml` (each step is explained in that file). Each run, and any error, shows in the repo's **Actions** tab on GitHub. A failed build publishes nothing, so the site keeps its last good version.

## Where things live

| Path | What it is |
| --- | --- |
| `docs/` | The source of truth for all text: the plan, each night's lesson and script, and the animation and music direction. |
| `src/content/` | Lesson text copied from `docs/` (`day1.ts`), series text (`journey.ts`), the parent prep sheet (`prep.ts`, from `docs/PARENT_PREP.md`), and the shapes it follows (`types.ts`). |
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

- **Steps:** each beat is split into short steps, one screen each (25 on the full night, 17 on a short evening). The list and where each screen's words come from are in `docs/direction/night-1.md`; the code that splits beats into steps is `src/engine/steps.ts`.
- **Narration** appears sentence by sentence (`src/components/Narration.tsx`). The **reading pace** (Settings) can be Slower (the default, for reading aloud), Relaxed, or Tap to continue.
- **Theme:** each night has a theme (a word, a one-line idea and a description), agreed in `docs/NINE_NIGHTS_CONTENT.md`. The story ends on it, the night ends on it again, and the closing shows it.
- **Short evening / Full night:** the switch in the bottom bar (and in Settings) gives a short evening of about 15 minutes: the story (each choice shows its set-up and what happened, without the question), the theme, the first Harry Potter scene with its Think it through, and Reflect. Anything else it leaves out is listed in `shortEveningLeavesOut` near the top of each `src/content/dayN.ts` (whole beats like `'n1-b12'`, or single steps like `'n3-b4:choiceReveal'`).
- **Hearing the Devi's name:** the speaker button beside each name (map and night header) says it with the device's own offline Hindi voice, reading the Devanagari spelling in `src/content/journey.ts`. Online voices are never used, so nothing is sent anywhere; if the device has no offline Hindi voice, the button is hidden. The code is `src/audio/sayName.ts`.
- **Parent prep sheet:** "Parent prep sheet" on the map opens every Harry Potter scene of the nine nights in one table, with a Print button (it fits one landscape A4 page). Edit `docs/PARENT_PREP.md` first, then `src/content/prep.ts`.
- **Gentle alternatives:** Nights 2, 3 and 7 offer a gentler second Harry Potter scene. The parent picks one on the night's first screen; Think it through and Side by side switch to match.
- **For the parent:** the bell in the header pulses where the night file places a parent note. Tap it to read the note; the story never stops by itself.

## Controls

Space plays or pauses (and continues from a freeze-frame), ← → move between steps, R replays, S toggles slow motion, T shows the read-aloud script, C shows context and sources, and M turns music on or off. Every control also has an on-screen button. Reading mode (in Settings) turns animation off and shows every beat complete; it switches on by itself when the device asks for reduced motion.

## Changing the music

The splash and map play a calm, generative piece in Raga Bhupali that starts softly on the first tap (browsers allow sound only after one). Each night's scenes follow their own ragas, chosen and explained in `src/audio/ragas.ts`.

- **A moment in a beat** (a bell at a sentence, a change of instrument): edit that beat in `src/audio/day1Score.ts`. `line: 3` means "when sentence 3 starts", counting from 0.
- **A beat's raga, tempo or layers:** edit its `direction.music` in `src/content/day1.ts`.
- **Overall loudness:** use the volume sliders in Settings. The master chain in `engine.ts` keeps the output below −1 dBFS.

## Adding or changing a night

All nine nights follow the same pattern, and each night lives in its own files, which the app finds automatically (nothing else needs editing):

| File | What it holds |
| --- | --- |
| `docs/nights/night-N.md` | The lesson and read-aloud script: the source of all text. Change text here first. |
| `docs/direction/night-N.md` | The step list, pictures, palettes, ragas and music for each beat. |
| `src/content/dayN.ts` | The night's text, copied from the doc, with each beat's direction values. Once this file exists, the night shows as built on the map (`src/content/nights.ts` finds it). |
| `src/visuals/dayN/` | One file per picture, the night's palettes (`palettes.ts`, keys prefixed `nN`) and `index.ts`, which says which picture goes with which beat (including `nN-closing`). |
| `src/audio/dayNScore.ts` | The night's musical moments and sound captions. |

Each night's theme is agreed in `docs/NINE_NIGHTS_CONTENT.md` and is never changed without Supriya.
