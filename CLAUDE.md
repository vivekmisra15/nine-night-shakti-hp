# Nine Nights - The Story of Shakti

An interactive web app that takes a parent and a pre-teen through the nine nights of Navaratri. Each night tells one Navadurga story from traditional sources, then compares a decision in it with a decision in a Harry Potter scene, honestly and with the differences shown. No backend, no accounts, no database.

## Who I'm working with

Supriya owns this project. She is learning to build applications.

- **Keep code simple, readable and easy to edit.** Prefer plain React state and small files over clever abstractions. Add no infrastructure or libraries unless they clearly earn their place, and ask first.
- **Content before code.** Lesson content is agreed in `docs/` first. Never invent or rewrite lesson text in code; copy it from the docs. If something in the docs looks wrong, flag it rather than silently changing it.
- **One night at a time.** Build Night 1 only. Later nights follow the same structure once Supriya approves.
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
- **Harry Potter text is always paraphrased.** No direct quotations beyond a few words. Never invent quotes, chapters or scene details.
- **Spoilers:** the audience has read all seven books and seen all eight films. Show the spoiler notice (Night 1, Beat 1) once, before the series starts.
- **Sensitive content:** show "For the parent" notes exactly where the night file places them, for example before Sati's death in Night 1, Beat 5.

## Tech

- React + TypeScript + Vite. Node 20 or later. (This Mac had no Node installed. Install the LTS release from nodejs.org first, then run `npm install`.)
- Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run typecheck` (`tsc --noEmit`).
- Set `base: './'` in `vite.config.ts` so the built `dist/` folder works when hosted from any path.
- Styles: one `src/styles.css` with CSS variables for colours. No CSS framework.
- No backend, analytics, or network calls apart from YouTube links the user clicks.

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
  components/          map, opening, night player, control bar, video card, captions, settings
    beats/             one view per beat type
  state/progress.ts    progress, notes and stance names, saved in this browser only
  styles.css
README.md
```

## How a night works

A night is a list of **beats**. Beat types:

| Type | What it does |
| --- | --- |
| `story` | An animated illustration with narration. Optional slow-motion window, freeze-frames, and tappable hotspots (e.g. a symbol in the Devi's hand). |
| `choice` | The learner predicts or decides at a turning point, sees their reasoning acknowledged, then sees what actually happened. May include an activity with a timer. |
| `idea` | The simple idea, the deeper insight, and the story moments that support it. |
| `sceneIntro` | The book, chapter and film, a short spoken-style retelling, and a **Watch the scene** link. |
| `think` | "Think it through", shown after each Harry Potter scene (see below). |
| `comparison` | Questions comparing the two traditions, revealed one at a time, plus a "what doesn't compare" box. |
| `today` | A present-day dilemma with several perspectives, not verdicts. |
| `reflection` | Questions for the child, "go deeper" questions, one together question, a private note box, and the takeaway. |

The order of a night: opening → story beats (with choices) → ideas → scene 1 → think → scene 2 → think → comparison → today → reflection. Each night's exact beats are in its night file; Night 9 adds a look-back beat that closes the series.

**Think it through**, after each scene:

- A ladder of six questions: Notice, Feel, Wonder, Stretch, Turn it around, Connect.
- Parent follow-ups in the form "If they say…, try asking…".
- A **stance line**: a draggable line between two positions, where each family member places a marker with their name.
- A short family activity with a visible countdown timer.

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

The same actions need on-screen buttons so everything works on a phone. **Reading mode** turns animation off and shows every beat complete. It switches on automatically when the device asks for reduced motion. There are independent volume sliders for music, ambience and effects, plus mute and captions. Make the layout work from phone width (about 360 px) to desktop.

## Visuals

Follow `docs/ANIMATION_AND_MUSIC.md`. In short:

- The app uses original, hand-built SVG or canvas, animated from the clock's time value. Every scene has layered parallax, a slow camera move, atmosphere (petals, embers, candlelight, haze), entrances and freeze-frames.
- Navaratri figures are respectful and stylised, never caricatured.
- Harry Potter scenes are abstract and atmospheric only. There are no recognisable characters, actors, crests, logos, film typography, stills or cover art.
- The nine-night map shows nine diyas that light up as nights are completed. Unbuilt nights read "being written".

## Music and sound

The score is fully generative Web Audio, organised in layers (drone, motif, percussion, strings, climax, resolution) that follow each beat's intensity.

- **Traditional scenes:** tanpura drone with bansuri- and santoor-like voices, in ragas chosen for the mood. Suggested: Bhupali for serene devotion, Yaman for a tender evening, Bageshri for longing, Marwa for tension and twilight. Comment each choice in the code.
- **Hogwarts scenes:** a separate original palette (celesta-like bells, harp, soft strings, low woodwind). Never imitate any film theme.
- Pause, slow motion, freeze and replay all affect the music. Add bells and ambience (wind, fire crackle, rain and so on) where the direction asks for them.
- Use a master limiter, and check levels for clipping.

## Video links

Each `sceneIntro` has `video: { url, type }`. Use `type: "search"` (a YouTube search URL) until Supriya supplies an exact clip; then use `type: "exact"`. Never guess clip URLs. When she gives one, verify it with YouTube oEmbed. Run locally, an exact clip plays in an embedded player; where embeds are blocked, open YouTube in a new tab.

## Privacy

Progress, notes and stance-line names are stored only in `localStorage`, wrapped in try/catch so the app still works if storage is unavailable. Nothing is sent anywhere.

## Before handing anything over

1. Run `npm run typecheck` and `npm run build` with no errors.
2. Click through every beat of the night at desktop and phone sizes.
3. Check every keyboard control, Reading mode, reduced motion, captions, the volume sliders, audio levels (no clipping) and every link.
4. Fix what you find, then tell Supriya briefly what you checked and anything you couldn't check.
5. Keep `README.md` current: how to run the app, where things live, how to edit text, how to change a video link, and how to add the next night.

## Start here (first session)

1. Read `docs/NINE_NIGHTS_CONTENT.md`, `docs/nights/night-1.md` and `docs/ANIMATION_AND_MUSIC.md`.
2. Write `docs/direction/night-1.md`: the scene-by-scene animation brief and music brief for Night 1's 16 beats, following the format in `docs/ANIMATION_AND_MUSIC.md`. Stop and ask Supriya to approve it.
3. Scaffold the project (Vite + React + TS), write `src/content/types.ts`, then `journey.ts` and `day1.ts` from `docs/nights/night-1.md`.
4. Build the clock, the beat views, the controls and Reading mode, so the whole night works end to end with placeholder visuals.
5. Add the Night 1 illustrations and the generative score.
6. Test as described above, write the README, and hand over.
