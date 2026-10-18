# Nine Nights - The Story of Shakti

An interactive web app that takes a parent and a pre-teen through the nine nights of Navaratri. Each night tells one Navadurga story from traditional sources, then compares a decision in it with a decision in a Harry Potter scene, honestly and with the differences shown. No backend, no accounts, no database.

## Who I'm working with

Supriya owns this project. She is learning to build applications.

- **Keep code simple, readable and easy to edit.** Prefer plain React state and small files over clever abstractions. Add no infrastructure or libraries unless they clearly earn their place, and ask first.
- **Content before code.** Lesson content is agreed in `docs/` first. Never invent or rewrite lesson text in code; copy it from the docs. If something in the docs looks wrong, flag it rather than silently changing it.
- **Nights 2–9 are built together** (Supriya's decision, 18 October 2026), each following Night 1's structure. Their docs (night files and direction briefs) are reviewed once, all together, before any of them is built.
- **Review loop.** Hand over a working prototype with a short note of what was checked. Supriya sends itemised feedback, and you revise.
- Explain choices briefly and plainly. Keep code comments useful for a learner. For example, comment why each raga was chosen.

## Source documents (read these first)

| File | What it is |
| --- | --- |
| `docs/NINE_NIGHTS_CONTENT.md` | The approved nine-night plan: each night's Devi, idea, scenes, strength, cautions, recurring themes and sources. |
| `docs/nights/night-N.md` | Night N in full: the lesson, beat by beat, then the read-aloud script (shown with the T key). Read only the night you are building. |
| `docs/ANIMATION_AND_MUSIC.md` | The animation, music and sound direction for all nights, with guardrails. |
| `docs/direction/night-N.md` | The scene-by-scene animation and music brief for night N. Write it before building that night's visuals. |

## Content rules (apply everywhere, including UI text)

- **Every beat shows a visible label:** `tradition`, `interpretation`, `contemporary`, `comparison`, `hogwarts` (a book or film scene) or `hypothetical`. This lets the child always tell a source's narrative from a modern reading.
- **Hindu deities are sacred figures in a living religion; Harry Potter characters are fictional.** Never present a character as a Devi's equivalent. Never imply that J.K. Rowling or the filmmakers intended any parallel.
- **Disclaimer:** the full disclaimer and statement of intent is `docs/DISCLAIMER.md`, shown in the app on a Disclaimer page (`src/content/disclaimer.ts`). The splash shows its one-sentence version with a link to that page; the map links to it too; the README gives its short version. "How we compare" keeps its own sentence: the Harry Potter books and films were not written with Navaratri or the Devi in mind, and the links are our own interpretation (wording in `docs/NINE_NIGHTS_CONTENT.md`).
- **Harry Potter text is always paraphrased.** No direct quotations beyond a few words. Never invent quotes, chapters or scene details.
- **Spoilers:** the audience has read all seven books and seen all eight films. Show the spoiler notice (Night 1, Beat 1) once, before the series starts.
- **Gentle alternatives:** where a night offers a gentler second Harry Potter scene in place of an intense one (Nights 2, 3 and 7), the parent chooses which scene to use at the start of that night.
- **Sensitive content:** "For the parent" notes never stop the story. At the point the night file names (for example Night 1, Beat 5, before Sati's death), a bell in the header pulses and chimes softly, and again just before the sensitive sentence. The parent taps it to read the note at any time.

## Tech

- React + TypeScript + Vite. Node 20 or later. (This Mac had no Node installed. Install the LTS release from nodejs.org first, then run `npm install`.)
- Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run typecheck` (`tsc --noEmit`).
- Set `base: './'` in `vite.config.ts` so the built `dist/` folder works when hosted from any path.
- Styles: one `src/styles.css` with CSS variables for colours. No CSS framework.
- No backend, analytics, or network calls.

## Folder structure

```
docs/                  content and direction (source of truth for text)
src/
  content/             all lesson text: edit here, not in components
    types.ts           the shapes every night's content follows
    day1.ts            Night 1 (one file per night)
    journey.ts         app title, nine map stops, opening text, spoiler notice
  engine/
    useClock.ts        play, pause, slow motion, replay, freeze-frames
    anim.ts            easing and interpolation helpers
  audio/               generative Web Audio music engine and per-night score
  visuals/
    shared.tsx         sky, stars, light rays, diya flames, particles, petals, mandalas, transitions
    day1/              Night 1 illustrations, each drawn from a time value
    index.ts           registry mapping beat ids to illustrations
  components/          map, opening, night player, control bar, scene card, captions, settings
    beats/             one view per beat type
  state/progress.ts    progress, notes and stance names, saved in this browser only
  styles.css
README.md
```

## How a night works

A night is a list of **beats**. Beat types:

| Type | What it does |
| --- | --- |
| `opening` | The night's opening: the spoiler notice and "how we compare" (Night 1 only, shown once), the night's introduction, and its opening animation. |
| `story` | An animated illustration with narration. Optional slow-motion window, freeze-frames, and tappable hotspots (e.g. a symbol in the Devi's hand). |
| `choice` | The learner predicts or decides at a turning point, sees their reasoning acknowledged, then sees what actually happened. May include an activity with a timer. |
| `idea` | The night's one core idea, its **theme**: one word, a one-line idea children can remember, and a longer description (all nine are in `docs/NINE_NIGHTS_CONTENT.md`). It is the whole Ideas section: one step. |
| `sceneIntro` | Two steps: the spoken-style retelling (about 6–8 sentences), narrated sentence by sentence over the scene's animation, with the book, chapter and film and a **Find the scene** note (no link) underneath; then the connection (similar, different, why it helps, strength) on one full-width screen. |
| `think` | "Think it through", shown after each Harry Potter scene (see below). |
| `comparison` | Questions comparing the two traditions, revealed one at a time, plus a "what doesn't compare" box. |
| `today` | A present-day dilemma with several perspectives, not verdicts. |
| `reflection` | Questions for the child, "go deeper" questions, one together question, a private note box, and the takeaway. |
| `lookBack` | Night 9 only: a look back over all nine nights, before Reflect, closing the series. |

The order of a night: opening → story beats (with choices) → the theme (the Ideas section) → scene 1 → think → scene 2 → think → comparison → reflect (today and reflection together, at most three steps, ending on the theme again). Each night's exact beats are in its night file; Night 9 adds a look-back beat that closes the series.

**Think it through**, after each scene, on one full-width screen (one step):

- A ladder of six questions: Notice, Feel, Wonder, Stretch, Turn it around, Connect.
- Parent follow-ups in the form "If they say…, try asking…".
- A **stance line**: a draggable line between two positions, where each family member places a marker with their name.
- A short family activity with a visible countdown timer.

**Steps and screens.** Each beat is shown as one or more **steps**, one screen each, with no page scrolling: a 16:9 picture on the left and the text on the right (on a phone, the picture above the text). No step shows more than about 100 words; longer content becomes more steps, and text never shrinks below 18 px. The step list for each night is in `docs/direction/night-N.md`. A traditional story is followed by one large "What the story is about" screen, the Ideas section, showing the night's theme (the word, then the one-line idea; "Go further" opens the description), before the Harry Potter scenes. The night ends on the theme again, and the closing shows it over the dawn.

**Narration display.** Narrated text (stories and Harry Potter retellings) appears sentence by sentence: the current sentence bright, the one or two before it dimmed. Earlier sentences slide up only when a new sentence starts, never as a continuous scroll. Tapping a dimmed sentence, or dragging the progress bar, moves text and animation together. A **Reading pace** setting offers Relaxed, Slower (the default, for reading aloud) and Tap to continue.

**Short evening / Full night.** A switch gives a short evening of about 15 minutes, as the night file describes: the story without its choices, the theme, the first Harry Potter scene with its Think it through, and Reflect.

Each beat's content also carries the direction values from `docs/direction/night-N.md` (for example `intensity` from 1 to 10, `palette`, `camera` and `music`), which the visuals and the adaptive score read.

## Controls

| Key | Action |
| --- | --- |
| Space | play or pause (continues from a freeze-frame) |
| ← → | previous or next beat |
| R | replay the current sequence |
| S | slow motion on or off |
| T | read the whole night as text (the read-aloud script) |
| C | context and sources panel |
| M | music on or off |

The same actions need on-screen buttons so everything works on a phone. The header has the way back to the map, the night's name, the parent-note bell and a section strip (Enter · Story · Choices · Ideas · Harry Potter · Compare · Reflect). The bottom bar has back, play/pause, replay, a progress bar with the time, the step count, the Short evening / Full night switch, music and volume, Text, Context, a settings menu and Next. Don't put letter badges on the section strip: they would clash with the keys above. **Reading mode** turns animation off and shows every beat complete. It switches on automatically when the device asks for reduced motion. There are independent volume sliders for music, ambience and effects, plus mute and captions. Make the layout work from phone width (about 360 px) to desktop.

**Hearing the Devi's name.** A small speaker button beside each Devi's name (map and night header) says the name, using the device's own offline Hindi voice reading the Devanagari spelling from `docs/NINE_NIGHTS_CONTENT.md`. Use only voices that run on the device; if there is none, hide the button. No other text is spoken.

**Parent prep sheet.** A printable page, opened from the map, lists every Harry Potter scene of the nine nights (book, chapter, film, intensity), copied from `docs/PARENT_PREP.md`.

## Visuals

Follow `docs/ANIMATION_AND_MUSIC.md` (due to be rewritten). Where it asks for more than the points below or `docs/direction/night-N.md`, those win. In short:

- The app uses original, hand-built SVG or canvas, animated from the clock's time value. Every scene has layered parallax, a slow camera move, atmosphere (petals, embers, candlelight, haze), entrances and freeze-frames.
- Keep the look **iconographic and simple**: night skies, mountain lines, soft glowing light, fine gold line-art.
- **The Devi and the gods are formless:** Shiva, Shakti in all her forms, Vishnu and the like appear as light (a flame, a glow, a column or trail of light), never as drawn bodies. Their symbols (trident, lotus, crescent moon and so on) may appear as small gold outline icons. For the Devi only, a very light-touch silhouette is acceptable within her light: a faint fine-line outline such as a face or head and shoulders, never a full body or detailed features (Supriya, 18 October 2026).
- **Demons and battles:** demons are dark smoke or shadow, never monstrous detail; a battle is light pushing back darkness; a death is a shadow dissolving or a flame going out. No body, wound or blood is ever drawn.
- **Other people** (Daksha, family members, sages, crowds) are fine gold outlines with simple faces or none. Never caricatured, never filled "costume" figures.
- Harry Potter scenes are abstract and atmospheric only, shown with letterbox bars so they read as a film or book scene. There are no recognisable characters, actors, crests, logos, film typography, stills or cover art.
- The app opens on a one-screen splash over a night sky (wording in "The opening splash", `docs/NINE_NIGHTS_CONTENT.md`): the app's name small at the top, the large question "What is power for?", the four splash questions fading in one at a time, a short introduction and a note on the two kinds of story, then "Begin the journey" with the music switch. Begin starts the music softly (browsers allow sound only after a tap) and goes to the map. The one-sentence disclaimer and its link to the Disclaimer page are at the bottom.
- The nine-night map is a constellation: nine diyas along a winding dotted path (top to bottom on a phone), lighting up as nights are completed. Unbuilt nights are faded and read "being written".

## Music and sound

The score is fully generative Web Audio, organised in layers (drone, motif, percussion, strings, climax, resolution) that follow each beat's intensity.

- **Traditional scenes:** tanpura drone with bansuri- and santoor-like voices, in ragas chosen for the mood. Suggested: Bhupali for serene devotion, Yaman for a tender evening, Bageshri for longing, Marwa for tension and twilight. Comment each choice in the code.
- **Hogwarts scenes:** a separate original palette (celesta-like bells, harp, soft strings, low woodwind). Never imitate any film theme.
- Pause, slow motion, freeze and replay all affect the music. Add bells and ambience (wind, fire crackle, rain and so on) where the direction asks for them.
- Use a master limiter, and check levels for clipping.

## Finding the scenes (no video links)

The app has no YouTube or other video links, searches or embedded players, to avoid copyright problems. Each `sceneIntro` shows a **Find the scene** note: it gives the book, chapter and film from the night file and asks the family to find the scene themselves in their own copy of the book or film.

## Privacy

Progress, notes and stance-line names are stored only in `localStorage`, wrapped in try/catch so the app still works if storage is unavailable. Nothing is sent anywhere.

## Before handing anything over

1. Run `npm run typecheck` and `npm run build` with no errors.
2. Click through every beat of the night at desktop and phone sizes.
3. Check every keyboard control, Reading mode, reduced motion, captions, the volume sliders, audio levels (no clipping) and every link in the sources panel.
4. Fix what you find, then tell Supriya briefly what you checked and anything you couldn't check.
5. Keep `README.md` current: how to run the app, where things live, how to edit text, and how to add the next night.

## Start here (first session)

1. Read `docs/NINE_NIGHTS_CONTENT.md`, `docs/nights/night-1.md` and `docs/ANIMATION_AND_MUSIC.md`.
2. Write `docs/direction/night-1.md`: the scene-by-scene animation brief and music brief for Night 1's 16 beats, following the format in `docs/ANIMATION_AND_MUSIC.md`. Stop and ask Supriya to approve it.
3. Scaffold the project (Vite + React + TS), write `src/content/types.ts`, then `journey.ts` and `day1.ts` from `docs/nights/night-1.md`.
4. Build the clock, the beat views, the controls and Reading mode, so the whole night works end to end with placeholder visuals.
5. Add the Night 1 illustrations and the generative score.
6. Test as described above, write the README, and hand over.
