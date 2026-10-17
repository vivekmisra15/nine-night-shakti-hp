# Nine Nights - The Story of Shakti: animation and music direction

This is the audiovisual direction for all nine nights. Apply it together with the project rules in `CLAUDE.md`. Where the two conflict, the guardrails below win.

## Guardrails (from the project brief)

- **Everything is original and generated in code.** Illustrations are hand-built SVG or canvas, animated from a time value. Music and sound are generated live with the Web Audio API: no recordings, samples, stock assets or AI-generated media files.
- **Navaratri imagery:** respectful, stylised forms (light, silhouettes, landscapes, symbols), never caricature. Devi figures should be dignified and serene, with calm faces and graceful hands showing mudras. Faces need only simple features (closed or gently open eyes); no exaggerated cartoon expressions.
- **Sati's death (Night 1, Beat 5):** shown only as a single lamp flame rising and going out. No body, and no fire around a figure.
- **Harry Potter scenes:** original abstract or atmospheric illustrations only, such as a long candlelit table, a rattling window, floating candles, a starry ceiling, or two paths of light. Never draw recognisable characters, actors, the Hogwarts crest, house crests, logos, the films' typography, film stills or book-cover art. "Character animation" in these scenes means silhouettes, light and objects, not portraits.
- **Music:** never imitate or quote John Williams' "Hedwig's Theme" or any other film music. Traditional scenes use the Indian palette (tanpura, bansuri, santoor and so on, in ragas). Hogwarts scenes use a separate original palette (celesta-like bells, harp, soft strings, low woodwind), so the two traditions sound clearly distinct.
- **Accessibility:** a reduced-motion setting (and the device's reduced-motion preference) switches on Reading mode: no animation, every beat shown complete. Captions are always available. Audio never autoplays before a user gesture.
- **Levels:** run all audio through a master compressor or limiter, and check that it never clips.

## Deliverable per night

Before coding each night's visuals and score, write `docs/direction/night-N.md` with the scene-by-scene animation brief and the music brief described below. Get approval, then build. Store the key values per beat in that night's content file (for example `intensity`, `palette`, `camera` and `music`) so the engine can read them.

---

## Animation direction

Create a cohesive cinematic animation language across all nine nights:

* **Overall style:** Premium 2.5D cinematic animation with painterly, hand-painted backgrounds and layered parallax depth. Avoid flat cartoon styling, a generic stock-animation look, photorealism, and overly dark horror aesthetics.
* **Visual atmosphere:** Luminous, festive, mystical and reverent. Combine sacred Indian devotional imagery with an enchanted, magical-school visual language, without copying any existing film production design.
* **Colour treatment:** Deep jewel tones, glowing golds, saffron, marigold orange, temple red, royal blue, emerald green, moonlit silver and luminous white-gold. Each episode should have a distinct colour identity while retaining one unified visual system.
* **Lighting:** Use expressive volumetric lighting: diya flames, moonlight, divine golden rays, magical particles, candlelit interiors, glowing portals, and soft rim light on characters. Darkness should feel mysterious and dramatic, never grim or frightening.
* **Character animation:** Fluid, expressive, theatrical movement with elegant silhouettes. Faces should convey emotion clearly through subtle eye movement, posture and gesture. Magical actions should feel weightless and graceful rather than mechanical.
* **Camera language:** Specify camera movement for every scene: slow devotional push-ins, sweeping aerial reveals, low-angle heroic shots, intimate close-ups, orbiting shots during magical transformations, and wide celestial compositions for climaxes.
* **Motion design:** Use ornate mandalas, rangoli patterns, rotating yantras, floating marigold petals, rising diyas, incense smoke, glowing constellations and sacred geometry as transitions and visual motifs.
* **VFX:** Golden dust, shimmering light trails, blooming lotuses, fire embers, protective light shields, dissolving shadows, sparkling magical particles, drifting petals and radiant energy waves. VFX should enhance devotion and wonder, not overwhelm the characters or story.
* **Texture and detail:** Rich fabric textures, embroidered borders, metallic jewellery highlights, carved temple details, aged parchment, stone, wood, water reflections and soft atmospheric haze.
* **Transitions:** Create reusable transitions based on turning pages, opening doors, blooming flowers, rotating mandalas, falling petals, candle flames igniting and constellations forming.

## Scene-by-scene animation brief

For every scene in the script, produce:

1. Scene number and script reference
2. Environment description: location, time of day, weather, and foreground, midground and background layers
3. Colour palette: primary, secondary, accent, shadow and highlight colours
4. Lighting setup: key light, rim light, ambient glow, practical light sources and mood
5. Camera direction: shot size, angle, lens feel, movement, duration and pacing
6. Character animation notes: body language, facial expression, movement timing and emotional intensity
7. VFX notes: exact effects, placement, motion direction, opacity, glow intensity and timing
8. Transition into the next scene
9. Animation intensity score from 1 to 10, where 1 is still and meditative and 10 is epic and climactic

## Music direction

Compose a detailed brief for original devotional instrumental music only. There must be no lyrics, vocals, spoken chants or copyrighted melodies.

* **Instrument palette:** Tanpura drone, bansuri, sitar, santoor, veena, sarangi, harmonium, tabla, mridangam, ghatam, kanjira, temple bells, conch, chimes, singing bowls, harp, celesta, soft strings, ambient pads and cinematic low percussion. (All synthesised in Web Audio; see the guardrails.)
* **Musical identity:** Sacred, warm, majestic and emotionally cinematic. It should feel like a living devotional score that rises and falls with the animation.
* **Per-episode theme:** Give each night a unique instrumental motif, root note, scale or mode suggestion, tempo range and signature instrument.
* **Scene-level scoring:** For every scene, specify:
   * Instruments entering or exiting
   * Tempo in BPM
   * Dynamic level, from pianissimo to fortissimo
   * Rhythmic density
   * Emotional register: meditative, hopeful, tense, heroic, sorrowful, triumphant, serene or transcendent
   * Musical cue points aligned to visual events
* **Cadence rule:** Music must follow the story's intensity curve. Quiet scenes use sustained drones, sparse bells and gentle flute. Emotional turns introduce strings and melodic instruments. Conflict or transformation adds tabla, mridangam, low percussion and rising strings. Revelations and blessings resolve into warm, spacious devotional textures.
* **Build-and-release structure:** Each episode should have a clear musical arc: invocation, development, intensification, climax and peaceful resolution.
* **Sound design:** Add non-musical ambience where appropriate: temple bells, conch, fire crackle, wind, water, footsteps, page turns, magical shimmer, distant birds and soft room tone. These should support immersion without competing with the score.
* **Adaptive audio system:** Design the music in layers (ambient drone, melodic motif, rhythmic percussion, emotional strings, climax layer and resolution layer), so the app can smoothly intensify or soften the score according to scene intensity.

## App-level audiovisual requirements

* **Episode opening:** A 5–8 second signature animation and musical invocation for each night.
* **Episode closing:** A peaceful visual and musical resolution, with fading light, a final bell or flute phrase, and a calm ambient tail.
* **Music-reactive visuals:** Subtle visual responses to the music (glowing particles, mandala rotation, diya flicker and light pulses) that don't distract from the story.
* **Audio controls:** Independent volume controls for music, ambience and sound effects; mute; captions; and reduced-motion mode.
* **Consistency:** All nine episodes must share the same animation grammar, lighting logic, transition system, instrument family and musical motif language, while each night remains visually and sonically distinct.
