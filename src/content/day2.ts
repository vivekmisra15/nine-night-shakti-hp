// Night 2: Brahmacharini, the one who practises.
//
// All text is copied from docs/nights/night-2.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-2.md.
//
// Night 2 has a gentle alternative Harry Potter scene: Beat 13 (Occlumency,
// which leads to Sirius's death) can be swapped for Beat 13 (gentle
// alternative), the Summoning Charm. Its id is 'n2-b13g', and the parent
// chooses on the night's first screen.

import type { Night } from './types';

export const day2: Night = {
  number: 2,
  devi: 'Brahmacharini',
  title: 'Brahmacharini, the one who practises',
  summary:
    'Night 2 takes about 25 minutes, or about 16 as a short evening. Its question: when one way fails, what is worth practising for, again and again? The night tells how Parvati won Shiva not with charm but with tapas, and how her resolve was tested. Then come two Harry Potter scenes: the Patronus lessons that end at the lake, and, as a contrast, the Occlumency lessons that fall apart.',
  atAGlance: [
    {
      lead: 'Intensity',
      text: "some peril. The story is gentle, though Kama is burned to ash. Read the parent note in Beat 6 (about fasting) before you begin. The second Harry Potter scene is *intense*, because it leads to Sirius's death: read the parent note in Beat 13 first. A gentle alternative follows it.",
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: 'the opening, the story (Beats 2–9; each choice shows its set-up and what happened, without the question), the theme, the Patronus lessons with their Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out both choice questions, Occlumency (or its gentle alternative) and its Think it through, and Side by side.',
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves out the second Harry Potter scene (or its gentle
  // alternative), its Think it through, and Side by side. (Every choice's
  // question is left out on a short evening anyway; its set-up and what
  // happened are shown as story.)
  shortEveningLeavesOut: ['n2-b13', 'n2-b13g', 'n2-b14', 'n2-b15'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n2-b1',
      sourceRows: [12, 14],
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'kailasa',
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif'] },
      },
      // The night file gives no heading for the opening, so there is none.
      points: [
        {
          lead: 'Last night',
          text: 'Sati stood by Shiva in her father\'s house, even though it cost her everything. She was born again as Parvati, daughter of the mountain, in a family that honours the one she loves. But Shiva, deep in meditation, did not notice her at all.',
        },
        {
          lead: "Tonight's form",
          text: 'Brahmacharini, the second of the Navadurga in the Devi Kavacham. *Brahmacharini* is usually explained as "she who practises brahmacharya": a life of discipline, study and self-control, walked towards the highest truth (interpretation of the name). She is Parvati in the years of her tapas, the long, hard practice that finally reached Shiva.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b2',
      sourceRows: [0],
      number: 2,
      type: 'story',
      title: 'The yogi who would not wake',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'kailasa',
        camera: 'aerial',
        music: { palette: 'indian', raga: 'bhupali', bpm: 62, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [7], // Parvati's answer, before Shiva gives way
      },
      intro:
        "This follows the Shiva Purana, Rudra Samhita, Parvati Khanda (chapters 11–28, in J. L. Shastri's English translation). Kalidasa tells the same story in his poem *Kumarasambhava*, cantos 3 and 5. That is a classical poem, not scripture, and the beats say so where it is used.",
      paragraphs: [
        'After Sati was gone, Shiva went to a high ridge of the Himalaya and sat in meditation, with his attendants keeping guard (ch. 11). Himavat, king of the mountains, came to honour him. He brought his young daughter Parvati and asked that she be allowed to serve Shiva. Shiva refused at first. An ascetic, he said, should keep away from such company, because it pulls the mind back into the world (ch. 12). Parvati answered him herself. Your very power to meditate comes from nature, she said, and nature is what I am. If you are truly beyond nature, why fear having me near? Shiva answered her with an argument of his own, but he allowed her to serve him every day (ch. 13). So she came each day with flowers and water, and he went on meditating, as if she were not there.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b3',
      sourceRows: [1, 2, 3, 11],
      number: 3,
      type: 'story',
      title: "Kama's arrow",
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 6, // 7 at the flash
        palette: 'n2vasanta', // the false spring, turning to grief (ash) after the flash
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'marwa', bpm: 72, layers: ['drone', 'motif', 'percussion', 'strings'] },
        slowMo: { line: 5, seconds: 4 }, // the arrow in flight
        freezeAfterLine: [9], // hold on the ash and petals
      },
      paragraphs: [
        "The gods had their own reason to want Shiva married. A demon named Taraka had won a boon that only a son of Shiva could defeat him. (His story belongs to Night 5.) So Indra, king of the gods, called on Kama, the god of love, to turn Shiva's mind towards Parvati (ch. 17). Kama came with his wife Rati and with Spring. Flowers bloomed out of season and birds sang. As Parvati drew near with her flowers, Kama loosed his arrow. For a moment Shiva's meditation was disturbed and he gazed at her. Then he caught himself, ashamed of the lapse (ch. 18), and looked around for its cause (ch. 19). He saw Kama, bow in hand. Fire blazed from the third eye in Shiva's forehead, and Kama was burned to ash before the gods could cry for mercy (ch. 19).",
        'Rati collapsed in grief. The gods begged Shiva to restore her husband. Shiva promised that Kama would live again, without a body for now, and later be born as Pradyumna, son of Krishna (ch. 19). Then Shiva vanished. Parvati, terrified by the blast, went home with her friends (ch. 21).',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b4',
      sourceRows: [4],
      number: 4,
      type: 'choice',
      title: 'What should Parvati do now?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'grief',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 58, layers: ['drone', 'motif'] },
      },
      setup:
        "Parvati is heartbroken. She served Shiva for a long time, and the gods' plan used her beauty to reach him. It failed completely, and he has gone. The text says she even cursed her own beauty, because it had been useless (ch. 21).",
      ask: 'If you were Parvati, what would you do now?',
      options: [
        {
          text: 'Give up: he has made his choice',
          acknowledgement: 'Respecting someone\'s "no" matters. It\'s also how she might protect herself from more hurt.',
        },
        {
          text: 'Try again, but harder: more flowers, more beauty',
          acknowledgement: 'Persistence is a strength. Notice, though, that this is the same approach that just failed.',
        },
        {
          text: 'Change the approach: become someone who can reach him',
          acknowledgement: "You're asking what *Shiva* values, not what usually works. That's a big shift.",
        },
        {
          text: 'Ask someone wise for advice',
          acknowledgement: 'Knowing when you need a guide is its own kind of wisdom.',
        },
      ],
      whatHappens:
        'some of the last two. The sage Narada came to her. Shiva left, he said, because he is a yogi whom charm cannot move. Reach him through tapas instead. He taught her the five-syllable mantra, *namah shivaya*, to repeat as she practised (ch. 21). Parvati decided to do it.',
      shortEveningFrom: 'The sage Narada came to her.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b5',
      sourceRows: [5, 6],
      number: 5,
      type: 'story',
      title: '"Oh, don\'t"',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n2himavatHome',
        camera: 'still', // then a gentle push-in as Parvati holds firm
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'motif', 'strings'] },
      },
      paragraphs: [
        'Parvati asked her parents\' permission to go to the forest for tapas. Her mother, Mena, was distressed. Practise at home, she said: all the gods and holy places are here. Your body is delicate, and this penance is severe. No woman has ever gone into the forest for a wish like this. Parvati did not give way, and at last Mena relented. The Shiva Purana says that because her mother forbade her, she came to be called Uma (ch. 22, vv. 18–27). In Kalidasa\'s poem the name comes from Mena\'s cry, "*u ma*": "oh, don\'t!" (*Kumarasambhava* canto 1, verse 26). That is a well-loved popular explanation of the name, not a scholar\'s one.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b6',
      sourceRows: [7, 15],
      number: 6,
      type: 'story',
      title: 'Aparna, the one without leaves',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n2tapasSeasons',
        camera: 'orbit',
        music: { palette: 'indian', raga: 'malkauns', bpm: 54, layers: ['drone', 'motif'] },
        freezeAfterLine: [11], // the years passing, the flame unchanged
      },
      // The bell pulses at the start, and again before "In the first year she
      // lived on fruit" (sentence 1), just before the fasting begins.
      parentNoteAgainAtLine: 1,
      parentNote: [
        "Parvati's fasting is part of a sacred story about a Devi. The texts present it as extraordinary, not as something anyone should copy.",
        'Say plainly that growing bodies need regular food, and that skipping meals is not a way to show strength or love. Many adults fast during Navaratri; children are usually not expected to, and anyone fasting should do it with care.',
        'If your child has ever worried about food, eating or their body, keep this beat short and go straight on to Beat 7.',
      ],
      paragraphs: [
        'Parvati went to a mountain peak and began. In the first year she lived on fruit. In the second, on leaves. Then she gave up even leaves, and the gods called her Aparna, "the one without leaves" (ch. 22, vv. 47–49). She stood on one leg, repeating the mantra Narada had given her. In summer she sat in the middle of blazing fires. In the rains she sat on bare rock, soaked through. In winter she stood in cold water, day and night. Each day she watered the trees she had planted with her friends. Around her hermitage, animals that were natural enemies stopped fighting: lions and cows, cats and mice. Trees fruited and flowers opened, and the forest grew peaceful (ch. 22, vv. 40–45, 67–71). The text says she practised for three thousand years.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b7',
      sourceRows: [8, 9],
      number: 7,
      type: 'story',
      title: 'Two tests',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n2hermitage',
        camera: 'pan', // then a low angle on the ascetic
        music: { palette: 'indian', raga: 'marwa', bpm: 66, layers: ['drone', 'motif', 'percussion', 'strings'] },
        freezeAfterLine: [18], // the jewel and the piece of glass
      },
      paragraphs: [
        'Her tapas grew so strong that the gods felt its heat, and they went to Shiva. Shiva decided to test her resolve. First he sent the seven great sages (ch. 25). They told her that Narada misleads people. They described Shiva as homeless and ill-featured, with ghosts for company, a husband who had once left Sati. Go home, they said, and marry Vishnu instead; we will arrange it. Parvati laughed. She was born of a mountain, she said, and steadiness was in her nature. Even if the sun rose in the west, she would not change her mind. The sages blessed her and went back to Shiva.',
        'Then Shiva came himself, in disguise: an old ascetic with matted hair, carrying an umbrella and a staff (ch. 26). Parvati welcomed him as an honoured guest. When her friend Vijaya explained what Parvati was practising for, he laughed (ch. 26). Then he set out to talk her out of it (ch. 27). Shiva smears himself with ash from the cremation ground, he said. He wears snakes and animal skins, and nobody knows his family. Remember what happened to Sati. Remember that he burned Kama and walked away from you. Why trade a jewel for a piece of glass?',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b8',
      sourceRows: [10],
      number: 8,
      type: 'choice',
      title: 'How should Parvati answer the stranger?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 6, // at the reveal
        palette: 'n2hermitage', // to kailasa at the reveal
        camera: 'still',
        // Near silence while the family decides; Bhupali returns at the reveal.
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone'] },
      },
      setup:
        'a respected holy man, a guest she has honoured, tells her that everything she has suffered for is a mistake. Some of what he says is even true: Shiva did leave her.',
      ask: 'If you were Parvati, how would you answer?',
      options: [
        {
          text: "Argue back: he doesn't know Shiva",
          acknowledgement: "You trust what you've learned for yourself over what you've heard.",
        },
        {
          text: "Listen: maybe he's right",
          acknowledgement: 'Being willing to doubt yourself takes courage. Doubt can be a gift as well as a trap.',
        },
        {
          text: 'Walk away without a word',
          acknowledgement: "Some arguments aren't worth having. Silence can be its own answer.",
        },
        {
          text: 'Ask him why he cares so much',
          acknowledgement: 'Sharp. Why would a stranger work so hard to change your mind?',
        },
      ],
      whatHappens:
        "she argued, and then she walked away. You don't know Shiva, she told him (ch. 28). He is beyond every form, and takes a form only by his own will. His ash is worn even by the gods. She said that the person who listens to scorn of Shiva does wrong, not only the one who speaks it. She told Vijaya to stop the stranger talking, and turned to leave. As she turned, the ascetic took his own form. It was Shiva. He told her he had been testing her, and asked her to forgive the game. He said her tapas had won him completely, that he would never leave her again, and that she was his for ever. He asked her to come with him to his mountain. All the weariness of her tapas fell away (ch. 28, vv. 36–50).",
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b9',
      sourceRows: [12, 13, 14, 11],
      number: 9,
      type: 'story',
      title: 'The one who practises',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n2brahmacharini',
        camera: 'crane',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
        freezeAfterLine: [3], // the full picture, before the hotspots
      },
      paragraphs: [
        'On this second night, Parvati is worshipped as Brahmacharini, the Devi in the years of her tapas. She walks barefoot, dressed in white. In her right hand she holds a rosary, and in her left a water pot. She is shown on foot: in most pictures she has no animal to ride.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'rosary',
          symbol: 'Rosary (japa mala, right hand)',
          meaning: 'Repetition: one bead, one mantra, again and again. Practice made visible.',
          label: 'interpretation',
        },
        {
          id: 'waterPot',
          symbol: 'Water pot (kamandalu, left hand)',
          meaning: "The ascetic's simple life: carry only what you need.",
          label: 'interpretation',
        },
        {
          id: 'whiteCloth',
          symbol: 'White clothes',
          meaning: 'Simplicity and purity of purpose.',
          label: 'interpretation',
        },
        {
          id: 'bareFeet',
          symbol: 'Bare feet, and no mount',
          meaning: 'She walks her own path, step by step. Most Navadurga forms ride a lion, a bull or a tiger.',
          label: 'interpretation',
        },
        {
          id: 'calmFace',
          symbol: 'Calm face',
          meaning:
            'Tapas is often called "heat", yet she is shown cool and peaceful. The fire is inside. In yogic interpretation, Night 2 is linked with the Svadhisthana chakra.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition and interpretation)',
        text: "in Shastri's translation, Shiva's disguise is called a *brahmacharin*, a student ascetic (ch. 27). In Kalidasa's *Kumarasambhava* (canto 5) he also comes as a young brahmacharin. So the one who tested Parvati came dressed as the very thing she had become. And in both tellings, Shiva says her tapas had made him hers. (*Kumarasambhava* is a classical poem, not scripture.)",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b10',
      number: 10,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Resolve',
        idea: 'What you practise, day after day, changes who you are.',
        description:
          'Her name means “one who practises”. Parvati first tried the quick way, with Kama’s arrow and her own beauty, and it went up in flames. Only then did she choose the slow path of tapas, season after season. Her final test isn’t about how much she can endure. Shiva, in disguise, mocks her choice to see whether she still knows why she’s doing it. In this story, resolve is less about toughness than about a reason that survives being laughed at. The practice wins Shiva, but first it changes her.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b11',
      sourceRows: [16, 17, 18, 19],
      number: 11,
      type: 'sceneIntro',
      title: 'The Patronus lessons',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 5, // 6 at the lake
        palette: 'n2lessonRoom', // to n2nightLake at the lake
        camera: 'still', // then aerial over the lake
        music: { palette: 'hogwarts', bpm: 66, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 7, seconds: 3 }, // the silver stag crossing the lake
        freezeAfterLine: [7],
      },
      reference:
        'Harry. *Prisoner of Azkaban*, chapter 12, "The Patronus"; chapter 13, "Gryffindor versus Ravenclaw"; chapter 20, "The Dementor\'s Kiss"; chapter 21, "Hermione\'s Secret". Film: *Prisoner of Azkaban* (2004).',
      findScene: {
        lead: 'Find the scenes',
        text: 'there are no links. Find them yourselves in your own copies of the books or films, using the references above.',
      },
      filmNote:
        'the film squeezes weeks of lessons into one scene. Harry faints, tries a memory of flying, then succeeds with a memory of his parents. In the book, the lessons run through the term, his successful memory is a different one, and the progress is much slower. The book shows the effort better. The lake and the Time-Turner are close in both.',
      retelling: [
        "Dementors make Harry collapse, so Professor Lupin agrees to teach him the Patronus Charm, a very advanced piece of magic. Harry must hold a really happy memory while a boggart turns into a dementor. The first time, he hears his mother screaming and passes out; the second time, he hears his father too, and faints again. The third time, he chooses a stronger memory, and something silvery holds the dementor back for a moment. The lessons go on, week after week. Near the end of the year, a hundred dementors close in at the lake, Harry's Patronus is too weak, and someone across the water drives them away: Harry thinks it was his father. Later, Hermione's Time-Turner takes them back, and Harry waits on the far shore, but nobody comes, and he understands that the person he saw was himself. He casts a full Patronus, a silver stag, because he has already seen himself do it.",
      ],
      connection: {
        similar:
          'repeated failure, practice that continues anyway, and success that comes from effort built over time. Like Parvati, Harry needs a guide who shows him the right method. Both reach the moment when nobody else is coming, and they have to do it themselves.',
        different: [
          "Harry wants a protective skill. Parvati's tapas is a spiritual discipline aimed at union with Shiva.",
          "Harry has a kind, patient teacher and permission. Parvati went against her mother's wishes.",
          'Harry practises for months; Parvati for "three thousand years". The scale is not the same.',
          "The Time-Turner adds a magical twist: part of Harry's confidence comes from having seen the result. Parvati had no such proof.",
          'Magic in Harry Potter is a learned and inherited skill. Tapas is understood as a sacred practice, not a technique.',
        ],
        whyItHelps:
          "most pre-teens know what it's like to fail at something three times in a row. This shows practice from the inside.",
        strength: { rating: 'strong', text: 'The pattern of failure, persistence and earned success matches closely.' },
        themeLink:
          'Harry keeps practising after each failure, and by the lake the practice has changed him: he stops waiting for someone else to save him and does it himself.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b12',
      sourceRows: [16, 18],
      number: 12,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'n2nightLake',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: "what changed between Harry's first, second and third tries?" },
        { step: 'Feel', question: "what might it feel like to hear your parents' voices every time you fail?" },
        { step: 'Wonder', question: 'why might part of Harry find it hard to stop hearing them?' },
        {
          step: 'Stretch',
          question: "Harry succeeded at the lake partly because he'd already seen it happen. Does that make his success less his own?",
        },
        {
          step: 'Turn it around',
          question: "tell the lessons from Lupin's side. What is it like to watch someone you care about faint, again and again, and keep going?",
        },
        {
          step: 'Connect',
          question: "Parvati and Harry both wait for someone, Shiva or Harry's father. What changes when they stop waiting?",
        },
      ],
      followUps: [
        { ifTheySay: 'He just kept trying until it worked', tryAsking: 'Did he try the same thing each time? What did he change?' },
        {
          ifTheySay: 'It was only because of the Time-Turner',
          tryAsking: "He'd practised for months first. Could he have done it at the lake without that?",
        },
        {
          ifTheySay: 'Parvati and Harry both worked hard',
          tryAsking: "Was Harry's work the same kind of thing as Parvati's tapas? What's the difference?",
        },
        { ifTheySay: 'Lupin did all the work', tryAsking: 'Can a teacher do the practice for you? What can a teacher do?' },
      ],
      stance: {
        left: 'Harry succeeded because he practised',
        right: 'Harry succeeded because he believed he could',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'the third attempt',
        minutes: 3,
        text: 'The child plays Lupin and the parent plays Harry, who has just fainted for the second time and wants to stop. Lupin has 60 seconds to persuade Harry to try once more, without just saying "don\'t give up". Then swap. Which arguments actually worked? Would any of them have worked on Parvati?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b13',
      sourceRows: [20, 21, 22],
      number: 13,
      type: 'sceneIntro',
      title: 'Occlumency',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 6,
        palette: 'n2closedDoor',
        camera: 'pushIn',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone', 'motif'] },
        freezeAfterLine: [6], // the door opens on darkness; a candle goes out
      },
      // The bell pulses at the start, and again before Harry's vision of
      // Voldemort torturing Sirius (sentence 4).
      parentNoteAgainAtLine: 4,
      parentNote: [
        'This scene leads to Sirius\'s death in the Department of Mysteries. It is intense, and it can upset a child who loved Sirius.',
        "**Handle with care: the blame is not Harry's alone.** Voldemort set a deliberate trap. Snape taught with open contempt. Dumbledore kept his distance and kept the prophecy secret, and later says that this was his mistake. In the book, Kreacher lied that Sirius was not at home. Bellatrix cast the spell.",
        "Say it plainly: Sirius did not die because Harry didn't practise. The comparison is about practice and what makes it hard, not about whose fault a death was.",
        '**Gentle alternative:** if your child would rather not go there, use Hermione drilling Harry in the Summoning Charm before the first task (*Goblet of Fire*, chapter 20, "The First Task"). Harry thinks he has no strengths except flying, so he must learn to summon his broom. They practise through lunch and after dinner, and at about two in the morning it finally works. The next day his broom flies to him in the arena. The practice is in the book only; the film shows just the summons during the task. It is written out in full below, as Beat 13 (gentle alternative).',
      ],
      reference:
        'Harry. *Order of the Phoenix*, chapter 24, "Occlumency"; chapter 26, "Seen and Unforeseen"; chapter 28, "Snape\'s Worst Memory"; chapters 31–32, "O.W.L.s" and "Out of the Fire"; chapter 35, "Beyond the Veil"; chapter 37, "The Lost Prophecy". Film: *Order of the Phoenix* (2007).',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film shows two lessons. Snape calls Harry weak and undisciplined, but the film doesn't show Harry skipping practice. The lessons end when Harry's shield charm turns Snape's spell back and Harry sees Snape's memory; in the book, he looks into Snape's Pensieve while Snape is out. The film also leaves out Kreacher's lie. So Harry's neglect of practice is mainly a book point; retell it from the book.",
      retelling: [
        "In his fifth year, Harry keeps dreaming of a corridor ending in a closed door, and sometimes feels what Voldemort feels. Dumbledore arranges Occlumency lessons, to shut his mind against intrusion, but won't say why, and Snape teaches him with a sneer. Harry is meant to clear his mind every night, and he hardly does: he resents Snape, doesn't see the point, and partly wants to see where the corridor leads. The lessons stop when Harry looks into Snape's Pensieve and sees Snape being bullied by Harry's father. In an exam, Harry sees a vision of Voldemort torturing Sirius behind that door. Hermione wonders if it's a trick, and when Harry checks through Umbridge's fire, Kreacher lies that Sirius is out. Harry and his friends rush to the Ministry; it is a trap, and in the fight Sirius is killed. Afterwards Dumbledore tells Harry everything, and says much of the fault is his own.",
      ],
      connection: {
        intro: 'this is a contrast.',
        similar:
          'a discipline that must be practised alone, every day, with no one watching. Both Harry and Parvati face a "test": Parvati a disguised stranger, Harry a false vision. Both tests use something they love.',
        different: [
          'Parvati chose her practice and knew exactly why she did it. Harry was given his practice and not told why.',
          "Parvati's guide, Narada, was kind. Harry's teacher was hostile.",
          'Harry was fifteen, grieving and angry. Parvati is a Devi.',
          'The test of Parvati came from Shiva, who loved her. The test Harry faced was a trap set by his enemy.',
          "Most important: Parvati's story ends in union. Harry's ends in a loss that many people, not Harry alone, helped to cause.",
        ],
        whyItHelps:
          "it shows the other side of practice. Discipline is hard when you don't trust the teacher, don't know the reason, or secretly want what you're supposed to shut out.",
        strength: { rating: 'strong', text: 'The question of daily practice matches closely; the outcomes are opposite.' },
        themeLink:
          "the hook is the reverse. Parvati's resolve rests on a reason that survives being laughed at; Harry is never given a reason he believes in, Snape's sneering wears away what little he has, and the practice never takes hold.",
      },
    },

    // -----------------------------------------------------------------------
    // The gentle alternative: used instead of Beat 13, never as well as it.
    {
      id: 'n2-b13g',
      gentleFor: 'n2-b13',
      sourceRows: [23],
      number: 13,
      type: 'sceneIntro',
      title: 'The Summoning Charm',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n2midnightPractice',
        camera: 'still', // then a pull-back to the sky
        music: { palette: 'hogwarts', bpm: 72, layers: ['drone', 'motif', 'percussion'] },
        freezeAfterLine: [7],
      },
      reference:
        'Harry. *Goblet of Fire*, chapter 20, "The First Task". The practice is in the book only; the film shows just the summons during the task.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      retelling: [
        "It's Harry's fourth year, and he has found out that the first task of the Triwizard Tournament means getting past a dragon. Professor Moody advises him to play to his strengths and to use a simple spell to get what he needs. Harry's one real strength is flying, so he must learn to summon his broom, his Firebolt, from the castle. He asks Hermione for help, and they skip lunch to practise the Summoning Charm in an empty classroom, making objects fly across the room to him. It is slow, and at first the spell keeps going wrong. They go back to it after dinner and keep going late into the night, until at about two in the morning Harry can summon things properly. The next day, facing the dragon in the arena, he raises his wand and calls his Firebolt. It speeds to him across the grounds, and he flies past the dragon and takes the golden egg.",
      ],
      connection: {
        similar:
          "practice that goes on long after it is comfortable, with a guide who keeps going with you, until something that didn't work finally does. Like Parvati after Kama's arrow, Harry stops trying to be what he isn't and builds on what he is.",
        different: [
          'Harry practises for one long day and night; Parvati for "three thousand years".',
          "Harry's guide is a friend his own age. Parvati's guide was a great sage, and she practised alone.",
          "Harry wants to get through a contest. Parvati's tapas is a sacred discipline aimed at union with Shiva.",
        ],
        whyItHelps: 'it shows practice from the inside, failing and keeping going, without a frightening ending.',
        strength: { rating: 'partial', text: 'The pattern of practice until it works matches; the scale and the purpose are far apart.' },
        themeLink:
          "a smaller hook: Harry keeps trying a spell that won't work, late into the night, until the practice makes him someone who can do it. One night of practice is not the years of tapas, and we don't pretend it is.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b14',
      sourceRows: [20, 21],
      number: 14,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'n2closedDoor', // the lamplit classroom with the gentle alternative
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what reasons did Harry have for not practising? List as many as you can.' },
        { step: 'Feel', question: "how might Harry have felt, walking into Snape's office each week?" },
        { step: 'Wonder', question: "why do you think Dumbledore didn't explain the reason for the lessons?" },
        {
          step: 'Stretch',
          question: 'many people made mistakes that led to the Ministry. Is it possible to share the blame without anyone being "the" cause?',
        },
        { step: 'Turn it around', question: "tell it from Snape's side. He was asked to teach the son of the boy who bullied him." },
        {
          step: 'Connect',
          question: "Parvati knew why she practised; Harry didn't. How much does knowing *why* matter when practice is hard?",
        },
      ],
      followUps: [
        { ifTheySay: "It's Harry's fault Sirius died", tryAsking: 'Who else made choices that led there? Who actually set the trap?' },
        {
          ifTheySay: "Snape was a terrible teacher, so it's his fault",
          tryAsking: "Is a bad teacher a reason not to practise? Or a reason it's harder?",
        },
        {
          ifTheySay: 'Harry should have just done what he was told',
          tryAsking: "Would you, if nobody told you why and you didn't trust the person?",
        },
        {
          ifTheySay: 'Parvati would never have given up',
          tryAsking: 'Parvati chose her goal. Does it make a difference when someone else chooses it for you?',
        },
      ],
      stance: {
        left: 'Harry was responsible for practising, whatever Snape was like',
        right: "You can't expect someone to practise for a teacher who despises them",
      },
      activity: {
        title: 'freeze at the doorway',
        minutes: 3,
        text: 'Freeze the moment before Harry leaves for the Ministry. Each person has 60 seconds to argue one side: "go now" or "stop and check another way". Then swap. Afterwards, ask: what would Harry have needed to know, or to have practised, to make a different choice?',
      },
      // With the Summoning Charm: the doc's alternative ladder, the stance
      // line from Beat 13 (gentle alternative), and the alternative activity.
      // The doc gives no alternative follow-ups, so only the one that does not
      // mention Sirius's death is kept.
      gentle: {
        ladder: [
          { step: 'Notice', question: 'why did Harry need the Summoning Charm, and which strength was he relying on?' },
          { step: 'Feel', question: "what might it feel like to keep trying a spell late into the night while it still doesn't work?" },
          { step: 'Wonder', question: 'why do you think Hermione kept going with him, through lunch and after dinner?' },
          {
            step: 'Stretch',
            question: "Harry built his plan on the one strength he was sure of. Is that clever, or a way of avoiding what he's bad at?",
          },
          { step: 'Turn it around', question: "tell the evening from Hermione's side." },
          {
            step: 'Connect',
            question:
              'Parvati and Harry both kept practising long after it was comfortable. What kept each of them going, and how are their reasons different?',
          },
        ],
        followUps: [
          {
            ifTheySay: 'Parvati would never have given up',
            tryAsking: 'Parvati chose her goal. Does it make a difference when someone else chooses it for you?',
          },
        ],
        stance: {
          left: "Hermione's drilling made the difference",
          right: "Harry's own effort made the difference",
        },
        activity: {
          title: 'one more try',
          minutes: 3,
          text: 'Freeze late at night, just before the spell finally works. Each person has 60 seconds to argue one side: "stop and sleep" or "one more try". Then swap. Afterwards, ask: how do you know when one more try is worth it?',
        },
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b15',
      number: 15,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'Parvati, Harry at the lake and Harry in fifth year all practised something hard. What made the practice possible, or impossible, for each one?',
        'Parvati changed her approach after failure. Harry changed his memory. Is changing the approach giving up, or getting smarter?',
        'Parvati was tested by someone who loved her; Harry by someone who wanted to destroy him. Can a test ever be fair?',
        "Mena worried about her daughter's tapas. Did anyone in Harry's story worry about him in the same way? What did they do?",
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'Brahmacharini is a Devi, worshipped today, and her tapas is sacred practice. Harry is a fictional boy learning spells. We compare the struggle to keep practising, not the people.',
      gentle: {
        questions: [
          'Parvati, Harry at the lake and Harry practising the Summoning Charm all practised something hard. What made the practice possible for each one?',
          'Parvati changed her approach after failure. Harry changed his memory. Is changing the approach giving up, or getting smarter?',
          "Parvati was tested by someone who loved her. Harry's test was a contest he never chose to enter. Does it matter who sets the test?",
          "Mena worried about her daughter's tapas. Hermione stayed up with Harry until two in the morning. What does it look like when someone cares about your practice?",
          'Name one difference between these stories so big that we should never forget it.',
        ],
        doesntCompare:
          "Harry's night of practice is spell-work for a contest, and Parvati's tapas is sacred. We compare keeping going when something doesn't work yet, not the people.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b16',
      number: 16,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'Third time unlucky.',
          setup: "You've tried out for the school team twice and not made it. Trials are next month.",
          perspectives: [
            '"Try again, the same way. Third time lucky."',
            '"Ask the coach what you need to work on, and change how you practise."',
            '"Try a different sport. Maybe this one isn\'t for you."',
            '"Stop for now. It hurts each time, and that matters too."',
          ],
          ask: 'how do you tell the difference between giving up and choosing a better path?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n2-b17',
      number: 17,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa', // dawn beginning over the ridge
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        "Charm didn't work on Shiva. Why do you think tapas did?",
        "What is one thing you'd be willing to fail at many times?",
      ],
      goDeeper: [
        'Shiva tested Parvati, then asked her to forgive him for it. Is it ever right to test someone you love?',
        'Mena tried to stop Parvati out of love. Was she wrong?',
        'Harry wanted to see where the corridor led. Can you practise shutting out something you secretly want? (Occlumency scene only.)',
        "Many people's choices led to the Ministry. How should we think about blame when it's shared? (Occlumency scene only.)",
      ],
      together: 'what is one thing each of us would like to practise this year, and how could we help each other keep going?',
      privateNote: "one thing I'm going to keep practising is…",
      tomorrow: "the wedding: a procession so wild that Parvati's mother faints.",
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'The heart of the night is a question, not a moral: what is worth failing at many times, and when should you change the way you try?',
      'Keep the fasting in Beat 6 clearly sacred and extraordinary, and say that children need food.',
      'In the Occlumency scene, say aloud that Sirius\'s death has many causes, and that Voldemort set the trap. Don\'t let "Harry didn\'t practise" become the lesson. Use the Summoning Charm alternative if needed.',
      'The story isn\'t only about "never give up". Parvati changes her approach, her mother\'s worry is loving, and Shiva apologises for his test. Point these out.',
    ],
    sources: [
      {
        claim: 'Shiva meditates in the Himalaya; Parvati asks to serve; her nature argument; daily service',
        source: 'Shiva Purana, Rudra Samhita, Parvati Khanda ch. 11–13 (Shastri translation)',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Taraka's boon; Indra sends Kama to turn Shiva's mind to Parvati",
        source: 'Parvati Khanda ch. 17 (boon told in earlier chapters)',
        label: 'Tradition',
        confidence: 'High (ch. 17); medium (exact chapter of the boon)',
      },
      {
        claim: 'Spring; Shiva briefly stirred, then regains control',
        source: 'Parvati Khanda ch. 18',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Kama burned by the third eye; Rati's grief; return as Pradyumna",
        source: 'Parvati Khanda ch. 19',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Parvati's grief; Narada's advice; the five-syllable mantra",
        source: 'Parvati Khanda ch. 21',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Mena's objection; the name Uma",
        source: 'Parvati Khanda ch. 22, vv. 18–27',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: '"U ma", "oh, don\'t", as the origin of Uma',
        source: 'Kalidasa, *Kumarasambhava* canto 1, verse 26',
        label: 'Tradition (classical poem); popular etymology',
        confidence: 'High',
      },
      {
        claim: 'Fruit, leaves, no leaves (Aparna); seasons; trees; animals at peace; 3,000 years',
        source: 'Parvati Khanda ch. 22',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'The seven sages\' test; "born of a mountain"; sun rising in the west',
        source: 'Parvati Khanda ch. 25',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Shiva disguised as an old ascetic; mocking speech',
        source:
          'Parvati Khanda ch. 26–27. Ch. 26 also has Parvati entering a fire that turns cool; it is left out here as unnecessary and sensitive',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Parvati's reply; listening to scorn is wrong too; she turns to leave; Shiva reveals himself and asks forgiveness for the test",
        source: 'Parvati Khanda ch. 28',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Kama's burning; the brahmacharin's test",
        source: 'Kalidasa, *Kumarasambhava* cantos 3 and 5',
        label: 'Tradition (classical poem, not scripture)',
        confidence: 'High',
      },
      {
        claim: 'Brahmacharini as the second Navadurga',
        source: 'Devi Kavacham',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'White clothes, rosary in the right hand, water pot in the left, barefoot',
        source: 'Devotional iconography',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Meanings of the symbols; Svadhisthana link; meaning of the name',
        source: 'Devotional and yogic readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Navaratri fasting customs',
        source: 'General practice; varies by family and region',
        label: 'Tradition (popular)',
        confidence: 'Medium',
      },
      {
        claim: 'Patronus lessons: three attempts, the memories, "very advanced magic"',
        source: '*Prisoner of Azkaban* ch. 12',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'The Ravenclaw match',
        source: '*Prisoner of Azkaban* ch. 13',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'The lake; the Time-Turner; Harry realises it was himself',
        source: '*Prisoner of Azkaban* ch. 20–21; 2004 film',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Film compresses the lessons into one; memory of his parents',
        source: '2004 film transcript',
        label: 'Hogwarts',
        confidence: 'Medium (from transcript)',
      },
      {
        claim: "Occlumency lessons; nightly practice; Harry's resentment and his pull towards the corridor",
        source: '*Order of the Phoenix* ch. 24, 26, 28',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "The vision; Hermione's warning; Kreacher's lie; Sirius's death; Dumbledore takes much of the blame",
        source: '*Order of the Phoenix* ch. 31–32, 35, 37',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Film: two lessons, no scene of skipped practice, memory seen during a lesson, no Kreacher lie',
        source: '2007 film transcript',
        label: 'Hogwarts',
        confidence: 'Medium (from transcript)',
      },
      {
        claim: 'Summoning Charm practice until about 2 a.m.',
        source: '*Goblet of Fire* ch. 20, "The First Task"; film omits the practice',
        label: 'Hogwarts',
        confidence: 'High (book); medium (film)',
      },
    ],
    footnote: 'All Harry Potter lines are paraphrased; there are no direct quotations.',
  },

  // -------------------------------------------------------------------------
  // The read-aloud script (T key)
  // -------------------------------------------------------------------------
  readAloud: {
    intro:
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (but still read what happens after each), the second scene (from the parent note before "Now a second scene" to its activity, including the gentle alternative) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 12 minutes)' },
      {
        kind: 'parent',
        text: 'Before you start: read the parent notes in Beat 6, about fasting, and Beat 13, about Sirius\'s death. Decide now whether to use the Occlumency scene or the gentle Summoning Charm alternative.',
      },
      {
        kind: 'read',
        text: "Last night, Sati stood up for Shiva in her father's house, and it cost her everything. She was born again as Parvati, the daughter of the mountain. But Shiva was sitting in deep meditation, and he didn't notice her at all.",
      },
      {
        kind: 'read',
        text: 'Tonight the Devi is Brahmacharini, "the one who practises". This is the story of how Parvati reached Shiva. Not with beauty, and not with magic, but with years of practice.',
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "What\'s something you\'ve practised for a long time?"' },
      {
        kind: 'read',
        text: 'After Sati was gone, Shiva went high into the Himalaya and sat in meditation. Himavat, the mountain king, came to honour him, and brought his daughter Parvati. Let her serve you, he said.',
      },
      {
        kind: 'read',
        text: 'Shiva said no. An ascetic should keep away from company like that, he said; it pulls the mind back into the world.',
      },
      {
        kind: 'read',
        text: "Parvati answered him herself. Your power to meditate comes from nature, she said, and nature is what I am. If you're really beyond nature, why are you afraid of having me near?",
      },
      {
        kind: 'read',
        text: "Shiva argued back, but he let her serve him every day. She brought flowers and water, day after day. And he went on meditating as if she wasn't there.",
      },
      {
        kind: 'read',
        text: "Now, the gods had their own reasons for wanting Shiva married. A demon called Taraka could only be defeated by a son of Shiva. So Indra, king of the gods, called Kama, the god of love, and asked him to turn Shiva's mind towards Parvati.",
      },
      {
        kind: 'read',
        text: "Kama came with his wife Rati, and with Spring. Flowers bloomed out of season. Birds sang. As Parvati came near with her flowers, Kama let fly his arrow. For a moment, Shiva's meditation broke, and he looked at her.",
      },
      {
        kind: 'read',
        text: "Then he caught himself. He looked around for whatever had disturbed him, and he saw Kama, bow in hand. Fire blazed from the third eye in Shiva's forehead, and Kama was burned to ash.",
      },
      {
        kind: 'read',
        text: 'Rati fell to the ground, weeping. The gods begged for mercy, and Shiva promised that Kama would live again one day. Then Shiva vanished. Parvati, terrified by the blast, ran home.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "Parvati is heartbroken. The plan to win Shiva with beauty has failed, and he\'s gone. What would you do now? Give up, try harder, change your whole approach, or ask someone wise?" Listen to the reasons.',
      },
      {
        kind: 'read',
        text: "What happened was the last two. The wise sage Narada came to her. Shiva is a yogi, he said. Charm won't move him. Reach him through tapas: through long, hard spiritual practice. And he taught her a mantra to repeat, *namah shivaya*.",
      },
      {
        kind: 'read',
        text: 'Parvati asked her parents if she could go to the forest to do it. Her mother, Mena, was frightened for her. Practise here at home, she said. Your body is delicate. Nobody does this. One poet tells it that Mena cried out "*u ma*", "oh, don\'t!", and that\'s how Parvati got her other name, Uma. But Parvati wouldn\'t change her mind, and at last her mother let her go.',
      },
      {
        kind: 'parent',
        text: 'For the parent: before the next part, say in your own words that this is a sacred story about a Devi, not something anyone should copy, and that growing bodies need regular food. If food or body worries are a sensitive subject for your child, keep the next paragraph short.',
      },
      {
        kind: 'read',
        text: 'So Parvati went up a mountain and began. In the first year she ate only fruit. In the second, only leaves. Then she gave up even leaves, and the gods called her Aparna, "the one without leaves". She stood on one leg, repeating her mantra. In summer she sat among blazing fires. In the monsoon she sat on bare rock in the pouring rain. In winter she stood in icy water. And every day she watered the trees she\'d planted.',
      },
      {
        kind: 'read',
        text: 'Something strange happened around her. Animals that were natural enemies stopped fighting. Lions and cows, cats and mice. The whole forest grew peaceful. The story says she practised for three thousand years.',
      },
      {
        kind: 'read',
        text: 'Her tapas grew so strong that the gods felt its heat. Shiva decided to test her.',
      },
      {
        kind: 'read',
        text: "First he sent seven great sages. Narada has fooled you, they told her. Shiva is homeless and strange, and he once left Sati. Marry Vishnu instead; we'll arrange it. Parvati laughed. I was born of a mountain, she said. Even if the sun rose in the west, I wouldn't change my mind.",
      },
      {
        kind: 'read',
        text: 'Then Shiva came himself, in disguise, as an old holy man with matted hair, an umbrella and a staff. Parvati welcomed him as an honoured guest. When he heard what she was practising for, he laughed. Shiva smears himself with ash from funeral fires, he said. He wears snakes. Nobody knows his family. Remember what happened to Sati. Remember he burned Kama and walked away from you. Why trade a jewel for a piece of glass?',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were Parvati, how would you answer? Argue back, listen, walk away, or ask him why he cares so much?"',
      },
      {
        kind: 'read',
        text: "Parvati argued, and then she walked away. You don't know Shiva, she told him. He is beyond every shape, and takes a shape only when he chooses. And whoever listens to scorn like yours does wrong, not just the one who speaks it. She told her friend to stop him talking, and she turned to go.",
      },
      {
        kind: 'read',
        text: 'As she turned, the old man changed. It was Shiva. I was testing you, he said, and asked her to forgive him for it. Your tapas has won me completely. I will never leave you again. Come with me to my mountain. And all the tiredness of those years fell away from her.',
      },
      {
        kind: 'read',
        text: 'On this second night, we call her Brahmacharini, the one who practises. She walks barefoot, dressed in white. In one hand she holds a string of prayer beads, for repeating her mantra again and again. In the other she holds a water pot, because she carries only what she needs. Most of the Devi\'s forms ride a lion or a bull. She walks.',
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "Which part of the story will you remember?"' },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 9 minutes)' },
      {
        kind: 'read',
        text: "Tonight's word is resolve. What you practise, day after day, changes who you are.",
      },
      {
        kind: 'read',
        text: 'Her name means “one who practises”. Parvati first tried the quick way, with Kama’s arrow and her own beauty, and it went up in flames. Only then did she choose the slow path of tapas, season after season. Her final test isn’t about how much she can endure. Shiva, in disguise, mocks her choice to see whether she still knows why she’s doing it. In this story, resolve is less about toughness than about a reason that survives being laughed at. The practice wins Shiva, but first it changes her.',
      },
      {
        kind: 'read',
        text: 'Now, Hogwarts. This is from *Prisoner of Azkaban*, chapter twelve, "The Patronus", and the end of the book, chapters twenty and twenty-one. It\'s in the film too, though the film squeezes the lessons into one scene.',
      },
      {
        kind: 'read',
        text: 'Dementors make Harry collapse, so Professor Lupin agrees to teach him the Patronus Charm, a very advanced piece of magic. Harry must hold a really happy memory while a boggart turns into a dementor. The first time, he hears his mother screaming and passes out; the second time, he hears his father too, and faints again. The third time, he chooses a stronger memory, and something silvery holds the dementor back for a moment. The lessons go on, week after week.',
      },
      {
        kind: 'read',
        text: "Near the end of the year, a hundred dementors close in at the lake, Harry's Patronus is too weak, and someone across the water drives them away: Harry thinks it was his father. Later, Hermione's Time-Turner takes them back, and Harry waits on the far shore, but nobody comes, and he understands that the person he saw was himself. He casts a full Patronus, a silver stag, because he has already seen himself do it.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three (on a short evening, two):' },
      {
        kind: 'parentList',
        items: [
          "Notice: what changed between Harry's first, second and third tries?",
          "Feel: what might it feel like to hear your parents' voices every time you fail?",
          'Stretch: Harry had already seen himself succeed. Does that make it less his own?',
          "Turn it around: tell the lessons from Lupin's side.",
          'Connect: Parvati and Harry both wait for someone. What changes when they stop waiting?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "He just kept trying", try: "Did he try the same thing each time?" If they say "Lupin did all the work", try: "Can a teacher do the practice for you?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Harry succeeded because he practised" or "Harry succeeded because he believed he could". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. Your child plays Lupin; you play Harry, who has just fainted twice and wants to stop. Lupin has 60 seconds to persuade Harry to try again, without just saying "don\'t give up". Then swap.',
      },
      {
        kind: 'read',
        text: "One thing to hold on to: Harry is learning a spell, and Parvati's tapas is a sacred practice. What's similar is failing, and keeping going, and changing what you try.",
      },
      {
        kind: 'parent',
        text: 'For the parent: the next scene leads to Sirius\'s death. If you\'d rather keep tonight gentle, skip to the Summoning Charm scene below, marked "Gentle alternative". If you use the Occlumency scene, say plainly afterwards that Sirius did not die because Harry didn\'t practise: Voldemort set a trap, and many people\'s choices led there.',
      },
      {
        kind: 'read',
        text: "Now a second scene, and it's a contrast. It's from *Order of the Phoenix*, chapters twenty-four to thirty-seven. The film shows less of it.",
      },
      {
        kind: 'read',
        text: "In his fifth year, Harry keeps dreaming of a corridor ending in a closed door, and sometimes feels what Voldemort feels. Dumbledore arranges Occlumency lessons, to shut his mind against intrusion, but won't say why, and Snape teaches him with a sneer. Harry is meant to clear his mind every night, and he hardly does: he resents Snape, doesn't see the point, and partly wants to see where the corridor leads. The lessons stop when Harry looks into Snape's Pensieve and sees Snape being bullied by Harry's father.",
      },
      {
        kind: 'read',
        text: "In an exam, Harry sees a vision of Voldemort torturing Sirius behind that door. Hermione wonders if it's a trick, and when Harry checks through Umbridge's fire, Kreacher lies that Sirius is out. Harry and his friends rush to the Ministry; it is a trap, and in the fight Sirius is killed. Afterwards Dumbledore tells Harry everything, and says much of the fault is his own.",
      },
      {
        kind: 'parent',
        text: 'Pause: give a moment of quiet. Ask: "How are you feeling about that?" Then say plainly: "Sirius didn\'t die because Harry didn\'t practise. Voldemort set the trap, and a lot of people made mistakes."',
      },
      {
        kind: 'read',
        text: "Parvati knew exactly why she practised, and she chose it. Harry was given his practice, wasn't told why, and had a teacher who despised him. Both of them were tested. Parvati's test came from someone who loved her. Harry's came from his enemy.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what reasons did Harry have for not practising?',
          "Wonder: why didn't Dumbledore explain?",
          'Stretch: lots of people made mistakes. Can blame be shared without anyone being "the" cause?',
          'Turn it around: Snape had to teach the son of the boy who bullied him. Tell it from his side.',
          'Connect: how much does knowing *why* matter when practice is hard?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "It\'s Harry\'s fault Sirius died", try: "Who else made choices that led there? Who set the trap?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Harry was responsible for practising, whatever Snape was like" or "You can\'t expect someone to practise for a teacher who despises them".',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. Freeze the moment before Harry leaves for the Ministry. One of you argues "go now", the other "stop and check another way", 60 seconds each. Then swap.',
      },
      {
        kind: 'parent',
        text: 'Gentle alternative, instead of the Occlumency scene. From *Goblet of Fire*, chapter twenty, "The First Task". The practice is in the book only:',
      },
      {
        kind: 'parent',
        text: "It's Harry's fourth year, and he has found out that the first task of the Triwizard Tournament means getting past a dragon. Professor Moody advises him to play to his strengths and to use a simple spell to get what he needs. Harry's one real strength is flying, so he must learn to summon his broom, his Firebolt, from the castle. He asks Hermione for help, and they skip lunch to practise the Summoning Charm in an empty classroom, making objects fly across the room to him. It is slow, and at first the spell keeps going wrong. They go back to it after dinner and keep going late into the night, until at about two in the morning Harry can summon things properly. The next day, facing the dragon in the arena, he raises his wand and calls his Firebolt. It speeds to him across the grounds, and he flies past the dragon and takes the golden egg.",
      },
      {
        kind: 'parent',
        text: 'Think it through. Choose two or three: "Why did Harry need the Summoning Charm, and which strength was he relying on?" "Why do you think Hermione kept going with him?" "Harry built his plan on the one strength he was sure of. Is that clever, or a way of avoiding what he\'s bad at?" "Parvati and Harry both kept practising long after it was comfortable. What kept each of them going?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Hermione\'s drilling made the difference" or "Harry\'s own effort made the difference".',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. Freeze late at night, just before the spell finally works. One of you argues "stop and sleep", the other "one more try", 60 seconds each. Then swap. Ask: "How do you know when one more try is worth it?"',
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 4 minutes)' },
      {
        kind: 'read',
        text: "Let's put the stories next to each other. There's no single right answer to any of these.",
      },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'What made practice possible, or impossible, for Parvati and for Harry?',
          'Parvati changed her approach after failing. Is changing the approach giving up, or getting smarter?',
          "Parvati was tested by someone who loved her; Harry by his enemy. Can a test ever be fair? (With the gentle alternative: Harry's test was a contest he never chose. Does it matter who sets the test?)",
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine you've tried out for the school team twice and not made it. Trials are next month.",
      },
      {
        kind: 'read',
        text: 'Some people would say try again, the same way: third time lucky. Some would ask the coach what to work on, and change how they practise. Some would try a different sport. And some would stop for now, because it hurts every time, and that matters too.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "How do you tell the difference between giving up and choosing a better path?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Charm didn\'t work on Shiva. Why do you think tapas did?" and "Shiva tested Parvati, then asked her to forgive him. Is it ever right to test someone you love?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "What\'s one thing each of us would like to practise this year, and how could we help each other keep going?"',
      },
      {
        kind: 'read',
        text: "Tonight's word is resolve. What you practise, day after day, changes who you are.",
      },
      {
        kind: 'read',
        text: "Tomorrow is the wedding. Shiva arrives with a procession so wild that Parvati's mother faints.",
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you're going to keep practising.",
      },
    ],
    timing:
      'about 12 minutes for Part 1, 9 for Part 2 and 4 for Part 3, so about 25 minutes in all. A short evening takes about 16: no choice questions, one scene with two ladder questions, and no side by side.',
  },

  // The closing (Closing in src/visuals/day2/Closing.tsx draws it;
  // Score.closing() plays it).
  closing: {
    seconds: 13,
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
