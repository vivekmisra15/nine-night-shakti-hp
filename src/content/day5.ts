// Night 5: Skandamata, mother of Skanda.
//
// All text is copied from docs/nights/night-5.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-5.md.
//
// Three story beats are split into two screens each, as the direction brief
// asks (3.1 / 3.2, 4.1 / 4.2, 8.1 / 8.2–8.4). The parts share the beat's
// number and have ids ending in a and b (e.g. 'n5-b3a', 'n5-b3b').

import type { Night } from './types';

export const day5: Night = {
  number: 5,
  devi: 'Skandamata',
  title: 'Skandamata, mother of Skanda',
  summary:
    "Night 5 takes about 25 minutes, or about 16 as a short evening. Its question: when do you hold a child close, and when do you let them go? The night tells how Skanda was born, raised by many hands and sent to lead the gods. Then come two Harry Potter scenes: the argument at Grimmauld Place over what Harry should be told, and Narcissa Malfoy's lie in the Forbidden Forest.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: "gentle. The story ends in a battle and a demon's death, told plainly and without detail. The second Harry Potter scene has some peril: it comes just after Harry's apparent death, in the Battle of Hogwarts. Read the parent note in Beat 12 before you begin.",
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: 'the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, the argument at Grimmauld Place with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the two choice questions, Narcissa\'s lie and its Think it through, and Side by side.',
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves these out: the "Other tellings" and Tamil
  // screens marked (full night) in the brief, Narcissa's lie, its Think it
  // through, and Side by side. (Every choice's question is left out on a
  // short evening anyway; its set-up and what happened are shown as story.)
  shortEveningLeavesOut: ['n5-b3b', 'n5-b4b', 'n5-b12', 'n5-b13', 'n5-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n5-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa',
        camera: 'drift',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      points: [
        {
          lead: 'Last night',
          text: 'we went back before everything, to Kushmanda, and the theme of creation. In devotional tradition her smile lit the first light and the cosmic egg. We talked about small warmths that start very big things.',
        },
        {
          lead: "Tonight's form",
          text: 'Tonight the Devi is Skandamata, "mother of Skanda". Shiva and Parvati are married now, and tonight their son is born. In pictures she sits on a lotus or a lion with her baby on her lap. Yet the same child will soon lead the gods\' army. So tonight is about two things a parent does: holding on, and letting go.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b2',
      sourceRows: [0],
      number: 2,
      type: 'story',
      title: 'A demon with a clever boon',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n5tarakaShadow',
        camera: 'pullBack', // then lowAngle as the smoke spreads
        music: { palette: 'indian', raga: 'marwa', bpm: 66, layers: ['drone', 'motif', 'percussion'] },
        freezeAfterLine: [6], // "He was hardly likely to have a son."
      },
      intro:
        'This is a combined telling, and each beat names its source. Most of it follows the Shiva Purana, Rudra Samhita (Parvati Khanda ch. 15, and Kumara Khanda ch. 2–10). The Valmiki Ramayana (Bala Kanda, sarga 37) and the Mahabharata (Vana Parva) tell the birth differently, and Tamil tradition adds its own story of the spear. Where a version differs, the beat says so.',
      paragraphs: [
        'A demon named Taraka spent years in fierce austerity, and Brahma, the creator, offered him boons. Taraka asked for two. First, that nobody in all creation would be his equal in strength. Second, that he could be killed only by a son of Shiva, leading an army against him (Shiva Purana, Rudra Samhita, Parvati Khanda ch. 15, vv. 40–41). It was a clever request. Shiva was an ascetic, lost in meditation and grieving Sati. He was hardly likely to have a son. Taraka made himself king of the three worlds. He took Indra\'s elephant and the other gods\' treasures, threw the gods out of their places, and put demons in them. The gods fled to Brahma for help. This is one reason they so badly wanted Shiva and Parvati to marry, as they did on Night 3.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b3a',
      sourceRows: [1, 2],
      number: 3,
      type: 'story',
      title: 'A spark too hot to hold',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n5emberRiver',
        camera: 'crane', // from the peak down to the river
        music: { palette: 'indian', raga: 'bhupali', bpm: 62, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 2, seconds: 2.5 }, // the spark falls
      },
      // The bell pulses at the start, and again just before the spark falls (sentence 2).
      parentNoteAgainAtLine: 2,
      parentNote: [
        'The Shiva Purana describes how the child was conceived in frank, adult terms. Here we call it "a spark of Shiva\'s fiery energy". That is simplified, but it is not false.',
        'In the same chapter Parvati is furious that the gods interrupted her, and she curses them (Kumara Khanda ch. 2, vv. 12–21). We leave this out for time. If your child reads the text later, they will find it.',
      ],
      paragraphs: [
        'After the wedding, Shiva and Parvati lived on Mount Kailasa. The gods grew impatient for the promised son, and came to disturb them. A spark of Shiva\'s fiery energy fell to the ground, and it was far too powerful for anyone to hold. Agni, the god of fire, took the form of a dove and swallowed it, and it burned him from within. In the Shiva Purana it passes from one bearer to the next, and none can keep it. Six wives of the great sages carry it, then Himavat, the mountain, who throws it into the river Ganga. The Ganga carries it on her waves and lays it in a forest of tall reeds. There a radiant boy appears, on the sixth day of the bright half of the month Margashirsha (Kumara Khanda ch. 2, vv. 37–68). The text says the three worlds rejoiced, and Parvati felt a mother\'s joy before she had even seen him.',
      ],
    },
    {
      id: 'n5-b3b',
      sourceRows: [8, 9],
      number: 3,
      type: 'story',
      title: 'A spark too hot to hold',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 3,
        palette: 'n5emberRiver',
        camera: 'drift',
        music: { palette: 'indian', raga: 'bhupali', bpm: 62, layers: ['drone', 'motif'] },
      },
      paragraphs: [
        '**Other tellings (tradition):** in the Valmiki Ramayana (Bala Kanda 37) the sage Vishvamitra tells this story to the young Rama, and Agni and the Ganga carry the child. In the Mahabharata (Vana Parva) Agni and Svaha are his parents, and he is born in a golden lake on a white mountain.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b4a',
      sourceRows: [3, 8],
      number: 4,
      type: 'story',
      title: 'Six mothers by the river',
      label: 'tradition',
      minutes: 0.75,
      direction: {
        intensity: 3,
        palette: 'n5krittikaStars',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [2], // the six faces
      },
      paragraphs: [
        'Six women, the Krittikas, came to bathe in the river and found the shining boy. Each one wanted to hold him, and they began to quarrel over who would. To settle it, the boy grew six faces, so that he could drink milk from all six at once. They took him home and raised him. They never let him out of their sight, and he was dearer to them than their own lives (Shiva Purana, Kumara Khanda ch. 3, vv. 29–36). In the Ramayana (Bala Kanda 37) the Krittikas are the six stars of the Pleiades, and the gods themselves ask them to nurse him. From them he gets the name Kartikeya, "son of the Krittikas". His six faces give him another name, Shanmukha.',
      ],
    },
    {
      id: 'n5-b4b',
      sourceRows: [10],
      number: 4,
      type: 'story',
      title: 'Six mothers by the river',
      label: 'tradition',
      minutes: 0.25,
      direction: {
        intensity: 3,
        palette: 'n5krittikaStars',
        camera: 'drift',
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'motif'] },
      },
      paragraphs: [
        '**Tamil tradition:** in the Kanda Puranam, the Tamil telling of the Skanda Purana, the sparks become six babies on six lotuses in a lake called Saravana. The Krittikas raise them, and when Parvati embraces all six together they become one child with six faces.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b5',
      sourceRows: [4],
      number: 5,
      type: 'choice',
      title: 'The messengers at the door',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n5krittikaStars',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 58, layers: ['drone'] },
      },
      setup:
        "on Kailasa, Parvati asks Shiva to find her son. The witnesses of the world tell him the boy is with the Krittikas. Shiva sends his attendants, a vast host led by Nandin, and they surround the Krittikas' home. The Krittikas are terrified and ask the boy where they can go. Nandin later compares them to a dry tree trying to hold on to fire (Shiva Purana, Kumara Khanda ch. 4, vv. 36–54).",
      ask: 'If you were Kartikeya, what would you do?',
      options: [
        {
          text: 'Go to Kailasa: Shiva and Parvati are my parents',
          acknowledgement: 'You honour where you came from. The family that made you is calling.',
        },
        {
          text: 'Stay: the Krittikas raised me',
          acknowledgement: 'You honour who looked after you. Love that feeds you every day counts for a great deal.',
        },
        {
          text: 'Go, and take the Krittikas with me',
          acknowledgement: 'You refuse to choose between them. That is a generous answer, and not always possible.',
        },
        {
          text: 'Ask both families to talk first',
          acknowledgement: "A wise child's answer. But there is an army at the door. Is there time?",
        },
      ],
      whatHappens:
        'first he tells the Krittikas not to be afraid. Then he tells Nandin that the Krittikas nursed him with their own milk, and that he is their foster son and part of them. He adds that he has never been separated from Parvati, whom he calls his mother (ch. 4, vv. 63–65). Then he takes his leave and goes. When he reaches Kailasa, the Krittikas are with him (ch. 5, vv. 10–11). In this story he keeps both families.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b6',
      sourceRows: [5],
      number: 6,
      type: 'story',
      title: "On his mother's lap",
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n5motherGold',
        camera: 'orbit', // still at first, then a slow orbit
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone', 'motif', 'strings', 'resolution'] },
        freezeAfterLine: [8], // "Notice that the day he arrives on his mother's lap is also the day he is armed."
      },
      paragraphs: [
        'Shiva and Parvati came out, full of joy, to meet him. Parvati embraced her son, nursed him, and set him on her lap. Shiva kissed his head and was too moved to speak. The little boy played in his father\'s lap and tugged at the snake around his neck, and Shiva laughed (Shiva Purana, Kumara Khanda ch. 5, vv. 25–37). Then the gods crowned him. Each gave him a gift: Vishnu his discus, Shiva his trident, Indra a thunderbolt and an elephant. Agni, the fire who had carried him first, gave him a spear "with affection". Parvati gave him strength, good fortune and long life, and the Krittikas brought their own gifts (ch. 5, vv. 40–52). Notice that the day he arrives on his mother\'s lap is also the day he is armed.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b7',
      sourceRows: [6, 7],
      number: 7,
      type: 'choice',
      title: 'Should he lead the army?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 7, // at the strike; 3 by the end
        palette: 'n5battleDawn',
        camera: 'still',
        music: { palette: 'indian', raga: 'marwa', bpm: 60, layers: ['drone'] },
      },
      setup:
        'remember Taraka\'s boon. Only a son of Shiva, leading an army, can kill him. So the gods want Kumara, "the youth", to march at their head (Shiva Purana, Kumara Khanda ch. 7). He has only just come home. The Shiva Purana does not tell us what Parvati said or felt. That is why this choice is ours to imagine.',
      ask: 'If you were Parvati, what would you do?',
      options: [
        {
          text: "Keep him home: he's a child",
          acknowledgement: 'You protect him first. Any parent would feel this, even for a god.',
        },
        {
          text: 'Let him go: this is what he was born for',
          acknowledgement: 'You trust his purpose. Letting go can be its own kind of love.',
        },
        {
          text: 'Go with him',
          acknowledgement: "You won't send him alone. Some protection means standing next to someone, not in front of them.",
        },
        {
          text: 'Let him go, and give him everything he needs',
          acknowledgement: "You arm him with your blessing. That's very close to what the tradition remembers.",
        },
      ],
      whatHappens:
        'he goes. On the battlefield Taraka sneers that the gods are hiding behind a child, and tells the boy to run home (ch. 9, vv. 33–34). Brahma tells Kumara that he is neither a boy nor a youth, but lord of all, and born for this (ch. 9, vv. 4–5). Kumara bows to Shiva and Parvati, takes up his spear, and strikes. Taraka falls, and the worlds are free of him (ch. 10, vv. 28–40). Then Shiva and Parvati come to their son, and each takes him on their lap again (ch. 10, vv. 42–43).',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b8a',
      sourceRows: [14, 15],
      number: 8,
      type: 'story',
      title: 'Mother of Skanda',
      label: 'tradition',
      minutes: 0.4,
      direction: {
        intensity: 2,
        palette: 'n5motherGold',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      paragraphs: [
        'On the fifth night the Devi is worshipped as Skandamata, the mother with her child on her lap. A devotional verse recited for her describes her seated on a lion, holding lotuses in both hands. Devotees often say that when you worship her you worship her son too, because he is always with her (popular devotional tradition).',
      ],
    },
    {
      id: 'n5-b8b',
      sourceRows: [11, 12, 16, 9],
      number: 8,
      type: 'story',
      title: 'Mother of Skanda',
      label: 'tradition',
      minutes: 0.6,
      direction: {
        intensity: 2,
        palette: 'n5motherGold',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      paragraphs: [
        '**Tamil tradition:** in Tamil, Skanda is called Murugan. In the Kanda Puranam he fights the demon Surapadman with a *vel*, a spear given to him by his mother Parvati herself. The festival of Thaipusam honours that vel. Skanda Sashti, a six-day festival in the Tamil month of Aippasi (October to November), ends by re-enacting his victory. So in this tradition the mother who holds him is also the one who arms him.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'child',
          symbol: 'The child on her lap',
          meaning: 'Skanda as a baby, often with six faces. Protection and closeness: she holds the one who will protect the world.',
          label: 'interpretation',
        },
        {
          id: 'lotuses',
          symbol: 'Two lotuses',
          meaning: 'Purity and calm; they grow clean out of muddy water.',
          label: 'interpretation',
        },
        {
          id: 'abhaya',
          symbol: 'A raised open hand (abhaya)',
          meaning: '"Do not fear." Her protection is offered to everyone, not only her son.',
          label: 'interpretation',
        },
        {
          id: 'lion',
          symbol: 'The lion',
          meaning: 'Courage and strength under control. Her gentleness rides on power.',
          label: 'interpretation',
        },
        {
          id: 'seat',
          symbol: 'The lotus seat',
          meaning: 'She is also called Padmasani, "seated on a lotus". Stillness at the centre.',
          label: 'interpretation',
        },
        {
          id: 'fifthNight',
          symbol: 'The fifth night',
          meaning: 'In yogic interpretation, Night 5 is linked with the Vishuddha, or throat, chakra: clear and truthful speech.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition)',
        text: "in the Mahabharata's version (Vana Parva, the story of Skanda's birth; section numbers vary by edition), six sages' wives are thrown out by their husbands because of rumours about the child. They go to Skanda and ask him to accept them as his mothers. He agrees. Once again, a child gains mothers rather than losing them.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b9',
      number: 9,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Nurture',
        idea: 'True care helps someone grow strong enough to go their own way.',
        description:
          'Skanda’s story is full of carers: a fire god, a river, six star-mothers, and Parvati. Each carries him for a while; none of them keeps him. Parvati gathers him close, and then, when the gods need him, she sends him out. In Tamil tradition she arms him with the vel, a spear holding her own power. She’s pictured with the child on her lap, facing outward towards the world. Nurture here means both holding close and getting ready to let go. Good care prepares someone to need you less.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b10',
      sourceRows: [17],
      number: 10,
      type: 'sceneIntro',
      title: 'The argument at Grimmauld Place',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n5grimmauldKitchen',
        camera: 'pan', // slowly along the table
        music: { palette: 'hogwarts', bpm: 64, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [4], // "Mrs Weasley says he has the Weasleys."
      },
      reference:
        'Harry. *Order of the Phoenix*, chapter 5, "The Order of the Phoenix". Film: *Order of the Phoenix* (2007), the dinner scene at Grimmauld Place.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film keeps the heart of the argument in a much shorter form, split in two. Harry and his friends overhear Molly and Sirius through Extendable Ears: Molly says he isn't James; Sirius says he isn't her son; she says he's as good as. At dinner Harry asks about a weapon, Molly says he's just a boy, and he says he wants to join the Order. The scene then cuts to his trip to the Ministry for the hearing. Lupin's argument, Mr Weasley's support and Ginny being sent to bed are not in the film.",
      retelling: [
        "It's the summer Harry turns fifteen, weeks after watching Voldemort return. At Grimmauld Place, the Order's secret headquarters, Sirius says after dinner that Harry deserves answers. Mrs Weasley says no: Harry is too young, and he isn't James, though Sirius sometimes talks as if he had his best friend back. Sirius says Harry isn't her son, and Mrs Weasley answers that he's as good as: who else has he got? Sirius says Harry has him. Lupin steps in: Molly isn't the only one who cares about Harry, and it's better he hears the general picture from them than a twisted version from someone else. Mr Weasley agrees, and Mrs Weasley gives way, though she sends a protesting Ginny to bed. Harry learns that the Ministry denies Voldemort is back and the Order is recruiting. Then Sirius lets slip that Voldemort may be after a weapon, and Mrs Weasley sends everyone to bed.",
      ],
      connection: {
        similar:
          'this is exactly tonight\'s dilemma. How much do you protect a young person, and when do you let them face the danger that is coming for them anyway? And, as with the Krittikas and Parvati, there are several people who love Harry and think they have a say. Like Taraka\'s boon, the prophecy means Harry\'s war will come to him whatever the adults decide.',
        different: [
          "Mrs Weasley is not Harry's mother, and Sirius is not his father. Kartikeya's carers pass him lovingly from one to the next. Harry's carers argue across a table.",
          'Kumara is a god, and Brahma calls him lord of all. Harry is a frightened, angry fifteen-year-old, and his danger is real.',
          'The Shiva Purana shows no adult arguing about whether to send Kumara. The adults at Grimmauld Place genuinely disagree, and none of them is plainly right.',
          'Mrs Weasley has her own children at the table. Part of her argument is about them.',
        ],
        whyItHelps:
          'it turns a sacred story about a divine child into a question every family meets: who decides what a young person is ready for?',
        strength: { rating: 'strong', text: 'The dilemma matches closely; the people and the stakes do not.' },
        themeLink:
          "Lupin argues that Harry is better off hearing the general picture from people who care about him than a twisted version from someone else. That treats care as getting Harry ready for what is coming, while Mrs Weasley's care tries to keep it from him a little longer; the scene lets us ask which kind helps him grow strong enough to face it.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b11',
      sourceRows: [17, 18, 19],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 3,
        palette: 'n5grimmauldKitchen',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'who argued for telling Harry, and who argued against? What reason did each give?' },
        { step: 'Feel', question: "how might it feel to be talked about across the table as if you weren't there? How might Mrs Weasley have felt?" },
        { step: 'Wonder', question: 'Mrs Weasley said Sirius sometimes treated Harry as if he were James. Why might that worry her?' },
        {
          step: 'Stretch',
          question:
            'at the end of that year, Dumbledore admits he kept too much from Harry because he cared about him too much (*Order of the Phoenix*, ch. 37, "The Lost Prophecy"). Does that mean Mrs Weasley was wrong?',
        },
        { step: 'Turn it around', question: "argue Mrs Weasley's side as if you were her. Ron and Ginny are at the table too." },
        {
          step: 'Connect',
          question:
            'the Krittikas held Kartikeya close; the gods sent him to lead an army. Where would you put each adult at the Grimmauld Place table between those two?',
        },
      ],
      followUps: [
        {
          ifTheySay: 'Mrs Weasley is just overprotective',
          tryAsking: "What does she know about the last war that Harry doesn't? What has she got to lose?",
        },
        {
          ifTheySay: 'Harry has a right to know',
          tryAsking: 'Does a right to know mean a right to know everything? Who decides how much?',
        },
        {
          ifTheySay: 'Sirius is the best one because he treats Harry like an adult',
          tryAsking: 'Is he thinking only about Harry, or also about James, and about himself, stuck in that house?',
        },
        {
          ifTheySay: "It's like Parvati letting Kartikeya go",
          tryAsking:
            'Kartikeya was born for his battle. Dumbledore later tells Harry that the prophecy matters only because Voldemort believed it, and that Harry chooses to fight (*Half-Blood Prince*, ch. 23). Is being born for something different from choosing it?',
        },
      ],
      stance: {
        left: "Young people should be told the truth, even when it's frightening",
        right: 'Adults should decide how much a young person carries',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'what would you tell Harry?',
        minutes: 3,
        text: 'You are the adults at the table. Each person has 60 seconds to say one thing they would tell Harry, and one thing they would hold back, and why. Then compare. Did you hold back the same thing? Who were you protecting by holding it back: Harry, or someone else?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b12',
      sourceRows: [20, 21, 22, 23],
      number: 12,
      type: 'sceneIntro',
      title: "Narcissa's lie",
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 6,
        palette: 'n5forestNight',
        camera: 'lowAngle',
        music: { palette: 'hogwarts', bpm: 56, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 3, seconds: 2 }, // the heartbeat
        freezeAfterLine: [5], // "Narcissa stands up and tells everyone that Harry Potter is dead."
      },
      // The bell pulses at the start, and again before Voldemort's curse is mentioned (sentence 1).
      parentNoteAgainAtLine: 1,
      parentNote: [
        'This scene is set in the Battle of Hogwarts. Just before it, Harry has walked into the Forbidden Forest to let Voldemort kill him, and has been struck down (*Deathly Hallows*, ch. 34, "The Forest Again"). Fred, Lupin and Tonks have already died in the battle.',
        'Your child knows Harry survives. Still, say plainly that this is a story, and that the moment is sad and frightening for the characters.',
        "In the book, Voldemort then uses a torture curse to throw Harry's body in the air. Harry feels no pain. You don't need to mention it unless your child does.",
        "Harry's apparent death and return is part of a novel. We don't compare it to anything sacred tonight.",
      ],
      reference:
        'Harry. *Deathly Hallows*, chapter 36, "The Flaw in the Plan" (the opening pages). Film: *Deathly Hallows: Part 2* (2011), in the forest.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        'the film keeps the moment almost unchanged. The ending differs. In the film, Draco crosses to his parents and the Malfoys simply walk away from the battle. In the book they are still at Hogwarts afterwards, sitting together in the Great Hall among the survivors, unsure whether they belong there.',
      retelling: [
        "Harry lies on the forest floor with his eyes closed, among Voldemort's followers. Voldemort's curse has struck him, and he has come back, but nobody must know. Voldemort orders Narcissa Malfoy to check whether the boy is dead. She kneels, lays her hand on his chest, and feels his heart beating. Then, so quietly that nobody else can hear, she asks whether Draco is alive and in the castle, and Harry breathes yes. Narcissa stands up and tells everyone that Harry Potter is dead. In the book, Harry understands why: the only way she could get into Hogwarts to find her son was as part of a winning army, and she no longer cared whether Voldemort won.",
      ],
      connection: {
        similar:
          "a mother's protection outweighs every other loyalty. Narcissa risks her life in front of Voldemort, for her son.",
        different: [
          "Narcissa protects only her own child, at the cost of her side's cause. She saves Harry almost by accident. Skandamata's protection serves the good of the whole world.",
          'Skandamata sends her son out to face danger. Narcissa is trying to get her son out of it.',
          "Kumara is the world's protector. Draco is a frightened boy who has been on the wrong side.",
          "Narcissa chooses in an instant, under threat. Nothing in Skandamata's story is about fear.",
          "**Optional: Lily.** In *Philosopher's Stone*, chapter 17, \"The Man with Two Faces\", Dumbledore tells Harry that his mother's love left a protection on him. That is why Quirrell could not bear to touch him. The film keeps a shorter version. Lily and Narcissa both protect their sons; ask what else is different about them.",
        ],
        whyItHelps: 'it asks the hardest question tonight: is love for your own child always good?',
        strength: { rating: 'partial', text: "The pull of a mother's love matches strongly. Its purpose and its effect on others do not." },
        themeLink:
          "Narcissa's care is all holding close: everything she risks is to reach Draco and get him back, not to send him out. Set beside Parvati, who holds her son and then lets him go, it shows the half of nurture that holding on alone leaves out.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b13',
      sourceRows: [21, 24],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 3,
        palette: 'n5forestNight',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 56, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Narcissa ask Harry, and what did she do with his answer?' },
        { step: 'Feel', question: "Narcissa is kneeling among Voldemort's followers, with Voldemort watching. What might she be feeling?" },
        { step: 'Wonder', question: "why do you think she trusted Harry's whispered answer?" },
        {
          step: 'Stretch',
          question: "Narcissa's lie helped bring Voldemort down, but she did it to reach her son. Does the reason matter if the result is good?",
        },
        {
          step: 'Turn it around',
          question: "tell the moment from Draco's side. He is in the castle, and he doesn't know what his mother has just done.",
        },
        {
          step: 'Connect',
          question: "Skandamata's son protects the world. Narcissa's son is one boy on the wrong side. Is a mother's love the same thing in both?",
        },
      ],
      followUps: [
        { ifTheySay: "She's a hero", tryAsking: 'Would she have lied if Draco had been safe at home?' },
        {
          ifTheySay: 'She only cared about Draco',
          tryAsking: 'Is caring only about your own child wrong? Where does it start to become wrong?',
        },
        {
          ifTheySay: "It's just like Skandamata",
          tryAsking: "Whose good did Skandamata's protection serve? Whose good did Narcissa's serve?",
        },
        {
          ifTheySay: 'Mothers always protect their children',
          tryAsking:
            'Mrs Crouch persuaded her husband to smuggle their son out of Azkaban (*Goblet of Fire*, ch. 35, "Veritaserum"). Was that love good?',
        },
      ],
      stance: {
        left: 'Narcissa did a good thing',
        right: 'Narcissa did a selfish thing that happened to help',
      },
      activity: {
        title: 'the two reasons',
        minutes: 2,
        text: 'Freeze the moment Narcissa stands up. Each person has 30 seconds to give the reason Narcissa tells herself. Then 30 seconds each for the reason Harry might give, lying on the ground. Are they the same reason?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b14',
      sourceRows: [7],
      number: 14,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n5krittikaStars',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'The Krittikas, Parvati, Mrs Weasley, Sirius and Narcissa all protect a young person. What is each one protecting him from?',
        'Kumara went to war as a child, and Brahma said he was ready. Harry chose to walk into the forest at seventeen. Does being ready depend on age?',
        "The Krittikas raised Kartikeya, then let him go to Kailasa. Mrs Weasley wasn't there for Harry's first eleven years. Does raising someone give you a say in what they do?",
        "Skandamata's protection served the whole world; Narcissa's served her own son. Can protecting one person ever harm others?",
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'Skandamata is a Devi, worshipped today as mother of the whole world, and Skanda is worshipped too. Molly, Sirius and Narcissa are fictional people with fictional children. We compare the dilemma of protecting and letting go, not the people.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b15',
      number: 15,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The news at home.',
          setup:
            "Your parents are thinking about moving to another city for a job. Nothing is decided yet. They've told you, but asked you not to tell your younger sister. She overheard something and asks you straight out.",
          perspectives: [
            '"Tell her the truth. She\'ll guess anyway, and guessing is worse."',
            '"It\'s not my decision. Tell Mum and Dad she\'s asking."',
            '"Tell her a little: \'grown-ups are talking about lots of things, nothing\'s decided\'."',
            '"Keep the promise. She\'d only worry about something that might not happen."',
            '"Ask her what she heard first, then decide."',
          ],
          ask: 'who gets to decide what a younger child is ready to know? Does it change when the child asks?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n5-b16',
      sourceRows: [18, 24],
      number: 16,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n5motherGold', // the lotus lake before dawn; dawn arrives with the theme
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'The Krittikas loved Kartikeya more than their own lives, and still let him leave their home for Kailasa, going along with him. How do you think they felt?',
        'If you were Parvati on the night before the battle, what would you say?',
      ],
      goDeeper: [
        'Kumara was born to defeat Taraka. Is it fair to be born with your job already decided?',
        'Dumbledore admits he kept too much from Harry because he cared about him. Can caring make you protect someone too much?',
        'Mrs Crouch got her son out of Azkaban, and he later helped bring Voldemort back. Is love for your own child always good?',
        "Kartikeya called himself the Krittikas' son and Parvati's son at once. Can you belong fully to more than one family?",
      ],
      together:
        "what is one thing you feel ready to do on your own that we haven't talked about yet? And, for the parent: what is one thing you find hard to let go of?",
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: "the gods' fury at a buffalo-demon blazes out as light, and the lights join into one Devi.",
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      "The heart of the night is a dilemma, not a moral: when do you hold a young person close, and when do you let them go?",
      "The Shiva Purana does not record Parvati's feelings about sending Kumara to war. Beat 7's choice is our hypothetical; don't present an answer as the text's.",
      "Narcissa is not Skandamata, and her love is not the same. The useful question is whether love for your own is always good.",
      "Optional, for you only: in *Order of the Phoenix*, chapter 9, \"The Woes of Mrs Weasley\", a boggart shows Mrs Weasley her family, and Harry, dead. It is not in the film. It explains a lot about her side of the Grimmauld Place argument. Share it only if your child is comfortable with it.",
    ],
    sources: [
      // 0
      { claim: "Taraka's two boons, including death only by a son of Shiva leading an army", source: "Shiva Purana, Rudra Samhita, Parvati Khanda ch. 15, vv. 40–41", label: "Tradition", confidence: "High" },
      // 1
      { claim: "The spark; Agni as a dove; the sages' wives, Himavat, the Ganga and the reed forest; the birth date", source: "Shiva Purana, Rudra Samhita, Kumara Khanda ch. 2", label: "Tradition", confidence: "High" },
      // 2
      { claim: "Parvati's anger and curses (mentioned in the parent note only)", source: "Kumara Khanda ch. 2, vv. 12–21", label: "Tradition", confidence: "High" },
      // 3
      { claim: "The Krittikas find him, quarrel, and he grows six faces", source: "Kumara Khanda ch. 3, vv. 29–36; Valmiki Ramayana, Bala Kanda 37", label: "Tradition", confidence: "High" },
      // 4
      { claim: "Shiva's host at the Krittikas' house; Kartikeya's reply to Nandin", source: "Kumara Khanda ch. 4", label: "Tradition", confidence: "High (the translation's verse numbering is irregular)" },
      // 5
      { claim: "Parvati's embrace and lap; the crowning and gifts, including Agni's spear", source: "Kumara Khanda ch. 5", label: "Tradition", confidence: "High" },
      // 6
      { claim: "Kumara leads the gods; Taraka's taunt; Brahma's words; Taraka's death; the parents' laps", source: "Kumara Khanda ch. 7, 9, 10", label: "Tradition", confidence: "High" },
      // 7
      { claim: "Parvati's feelings about sending him", source: "Not stated in the Shiva Purana", label: "Hypothetical", confidence: "Labelled as such" },
      // 8
      { claim: "Krittikas as the Pleiades; the gods ask them to nurse him", source: "Valmiki Ramayana, Bala Kanda 37", label: "Tradition", confidence: "Medium to high" },
      // 9
      { claim: "Agni and Svaha version; the six wives ask to be his mothers", source: "Mahabharata, Vana Parva (Ganguli sections 224–229; numbering varies)", label: "Tradition", confidence: "Medium" },
      // 10
      { claim: "Six babies joined by Parvati's embrace", source: "Kanda Puranam (Tamil)", label: "Tradition (regional)", confidence: "Medium (from a secondary summary)" },
      // 11
      { claim: "Parvati gives Murugan the vel; Thaipusam honours it", source: "Kanda Puranam; Tamil tradition", label: "Tradition (regional)", confidence: "High" },
      // 12
      { claim: "Skanda Sashti in Aippasi, re-enacting the victory", source: "Tamil tradition", label: "Tradition (regional)", confidence: "Medium" },
      // 13
      { claim: "The name Gangeya", source: "Later texts and popular usage", label: "Tradition", confidence: "Medium *(to check)*" },
      // 14
      { claim: "Iconography: child on lap, two lotuses, lion, abhaya hand, lotus seat", source: "Devotional verse and iconography", label: "Tradition", confidence: "High" },
      // 15
      { claim: "\"Worship her and you worship her son\"", source: "Popular devotional tradition", label: "Tradition (popular)", confidence: "Labelled as such" },
      // 16
      { claim: "Meanings of the symbols; Vishuddha chakra link", source: "Devotional and yogic readings", label: "Interpretation", confidence: "Medium" },
      // 17
      { claim: "The Grimmauld Place argument", source: "*Order of the Phoenix* ch. 5; 2007 film", label: "Hogwarts", confidence: "High (book); film lines checked against a transcript" },
      // 18
      { claim: "Dumbledore admits keeping too much from Harry", source: "*Order of the Phoenix* ch. 37", label: "Hogwarts", confidence: "High" },
      // 19
      { claim: "Prophecy matters because Voldemort believed it; Harry chooses", source: "*Half-Blood Prince* ch. 23", label: "Hogwarts", confidence: "High" },
      // 20
      { claim: "Harry walks into the forest", source: "*Deathly Hallows* ch. 34", label: "Hogwarts", confidence: "High" },
      // 21
      { claim: "Narcissa's lie and her reason", source: "*Deathly Hallows* ch. 36; *Deathly Hallows: Part 2* film", label: "Hogwarts", confidence: "High" },
      // 22
      { claim: "The Malfoys walk away (film) or stay in the Great Hall (book)", source: "*Deathly Hallows* ch. 36; film; reviews", label: "Hogwarts", confidence: "Medium to high" },
      // 23
      { claim: "Lily's protection", source: "*Philosopher's Stone* ch. 17; film", label: "Hogwarts", confidence: "High (book); medium (film wording)" },
      // 24
      { claim: "Mrs Crouch and her son", source: "*Goblet of Fire* ch. 35", label: "Hogwarts", confidence: "High" },
      // 25
      { claim: "Molly's boggart", source: "*Order of the Phoenix* ch. 9 (not in the film)", label: "Hogwarts", confidence: "High" },
    ],
    footnote: 'All Harry Potter lines are paraphrased; there are no direct quotations.',
  },

  // -------------------------------------------------------------------------
  // The read-aloud script (T key)
  // -------------------------------------------------------------------------
  readAloud: {
    intro:
      "Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (but still read what happens after each), the second scene (from the parent note before \"Now a second scene\" to its activity) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.",
    blocks: [
      {"kind": "heading", "text": "Part 1: Opening and the story (about 10 minutes)"},
      {"kind": "read", "text": "Last night we went right back to the beginning, to Kushmanda, whose smile lit the first light, and we talked about creation. We talked about small warmths that start very big things."},
      {"kind": "read", "text": "Tonight is the fifth night. Shiva and Parvati are married now, and tonight their son is born. The Devi tonight is Skandamata, which means \"mother of Skanda\". In pictures she holds her baby on her lap. But this baby is going to lead an army. So tonight is about two things that people who love a child do: holding on, and letting go."},
      {"kind": "parent", "text": "Pause: about 1 minute. Optional: \"When did someone in our family last have to let someone go and do something on their own?\""},
      {"kind": "read", "text": "The story starts with a demon called Taraka. He spent years in fierce, hard prayer, and at last Brahma, the creator, offered him a gift. Taraka asked for two. First, that nobody in all creation would be as strong as him. Second, that he could only be killed by a son of Shiva, leading an army."},
      {"kind": "read", "text": "It was a clever wish. Shiva was a wandering ascetic, deep in meditation, still grieving Sati. Who would expect him to have a son? So Taraka made himself king of the three worlds. He took Indra's great elephant, threw the gods out of their homes, and put demons in their places. The gods ran to Brahma for help. That's one reason they wanted Shiva and Parvati to marry so badly."},
      {"kind": "parent", "text": "For the parent: the old text describes the next part in adult terms. We call it \"a spark of Shiva's fiery energy\". If your child asks, that is simplified, not false."},
      {"kind": "read", "text": "After the wedding, Shiva and Parvati lived on Mount Kailasa. The gods grew impatient and came to disturb them. A spark of Shiva's fiery energy fell to the ground, and it was far too powerful for anyone to hold."},
      {"kind": "read", "text": "Agni, the god of fire, turned into a dove and swallowed it, and it burned him from inside. It passed from one bearer to the next, and none of them could keep it. In the end the mountain threw it into the river Ganga. The river carried it on her waves and laid it gently in a forest of tall reeds. And there, among the reeds, a shining baby boy appeared. Far away on Kailasa, the story says, Parvati felt a mother's joy before she had ever seen him."},
      {"kind": "read", "text": "Six women, the Krittikas, came down to the river to bathe. They found the shining baby, and every one of them wanted to hold him. They began to argue about whose turn it was. So the baby grew six faces, and fed from all six of them at once. Problem solved."},
      {"kind": "read", "text": "They took him home. They never let him out of their sight. The story says he was dearer to them than their own lives. Some tellings say the Krittikas are the six stars we call the Pleiades. That's why he is called Kartikeya, \"son of the Krittikas\"."},
      {"kind": "read", "text": "Back on Kailasa, Parvati asked Shiva to find her son. Shiva sent his attendants, a huge, wild host, led by the bull Nandin. They surrounded the Krittikas' house. The Krittikas were terrified. They turned to the little boy and asked: where can we go?"},
      {"kind": "parent", "text": "PAUSE: Choice. Ask: \"If you were Kartikeya, what would you do? Go to Kailasa, stay with the Krittikas, go and take them with you, or ask both families to talk first?\" Listen to the reasons."},
      {"kind": "read", "text": "First he told the Krittikas not to be afraid. Then he told Nandin that the Krittikas had fed him and raised him. He was their foster son, he said, part of them. And he had never been apart from Parvati, whom he called his mother. Then he said goodbye and went, and the Krittikas came with him. He kept both families."},
      {"kind": "read", "text": "When he reached Kailasa, Shiva and Parvati came out full of joy. Parvati hugged him, fed him, and sat him on her lap. Shiva kissed his head and was too happy to speak. The little boy climbed into his father's lap and tugged at the snake around his neck, and Shiva laughed."},
      {"kind": "read", "text": "Then the gods crowned him, and each one gave him a gift. Vishnu gave his discus, Shiva his trident, Indra a thunderbolt. Agni, the fire who had carried him first, gave him a spear. Parvati gave him strength, good fortune and long life. Notice that: the same day he arrives on his mother's lap is the day he is given his weapons."},
      {"kind": "read", "text": "Remember Taraka's wish? Only a son of Shiva, leading an army, could defeat him. So the gods wanted this boy, who had only just come home, to march at the front of their army. The old text doesn't tell us what Parvati said. So we get to imagine it."},
      {"kind": "parent", "text": "PAUSE: Choice. Ask: \"If you were Parvati, what would you do? Keep him home, let him go, go with him, or let him go and give him everything he needs?\""},
      {"kind": "read", "text": "He went. On the battlefield Taraka laughed. The gods are hiding behind a child, he said. Run home, little boy. But Brahma told Kumara he was neither a boy nor a youth: he was lord of all, and born for exactly this. Kumara bowed to his father and mother, took up his spear, and struck. Taraka fell, and the worlds were free."},
      {"kind": "read", "text": "And then? Shiva and Parvati came to their son, and each of them took him on their lap again."},
      {"kind": "read", "text": "In the Tamil tradition, where he is called Murugan, his mother Parvati gives him his spear herself, the *vel*, before his great battle with another demon. Millions of people honour that spear at the festival of Thaipusam."},
      {"kind": "read", "text": "Tonight's form shows her with her child on her lap. She holds lotuses, and one hand is raised to say \"do not fear\". She rides a lion. She holds the boy close, and she sent him out."},
      {"kind": "parent", "text": "Pause: about 1 minute. Optional: \"Which part of the story will you remember?\""},
      {"kind": "heading", "text": "Part 2: The theme and two Hogwarts scenes (about 10 minutes)"},
      {"kind": "read", "text": "Tonight's word is nurture. True care helps someone grow strong enough to go their own way."},
      {"kind": "read", "text": "Skanda’s story is full of carers: a fire god, a river, six star-mothers, and Parvati. Each carries him for a while; none of them keeps him. Parvati gathers him close, and then, when the gods need him, she sends him out. In Tamil tradition she arms him with the vel, a spear holding her own power. She’s pictured with the child on her lap, facing outward towards the world. Nurture here means both holding close and getting ready to let go. Good care prepares someone to need you less."},
      {"kind": "read", "text": "Now, Hogwarts. This is from *Order of the Phoenix*, chapter five, \"The Order of the Phoenix\". It's in the film too, but much shorter."},
      {"kind": "read", "text": "It's the summer Harry turns fifteen, weeks after watching Voldemort return. At Grimmauld Place, the Order's secret headquarters, Sirius says after dinner that Harry deserves answers."},
      {"kind": "read", "text": "Mrs Weasley says no: Harry is too young, and he isn't James, though Sirius sometimes talks as if he had his best friend back. Sirius says Harry isn't her son, and Mrs Weasley answers that he's as good as: who else has he got? Sirius says Harry has him."},
      {"kind": "read", "text": "Lupin steps in: Molly isn't the only one who cares about Harry, and it's better he hears the general picture from them than a twisted version from someone else. Mr Weasley agrees, and Mrs Weasley gives way, though she sends a protesting Ginny to bed. Harry learns that the Ministry denies Voldemort is back and the Order is recruiting. Then Sirius lets slip that Voldemort may be after a weapon, and Mrs Weasley sends everyone to bed."},
      {"kind": "parent", "text": "PAUSE: Think it through. Choose two or three:"},
      {"kind": "parentList", "items": ["Notice: who argued for telling Harry, who argued against, and why?", "Feel: how would it feel to be argued about across the table?", "Wonder: why might it worry Mrs Weasley that Sirius treats Harry like James?", "Stretch: at the end of that year Dumbledore admits he kept too much from Harry because he cared about him. Does that mean Mrs Weasley was wrong?", "Connect: the Krittikas held Kartikeya close; the gods sent him out. Where would you put each adult at that table?"]},
      {"kind": "parent", "text": "If they say \"Mrs Weasley is just overprotective\", try: \"What does she know about the last war that Harry doesn't? What has she got to lose?\" If they say \"It's like Parvati letting Kartikeya go\", try: \"Kartikeya was born for his battle. Dumbledore later tells Harry he chooses his. Is that different?\""},
      {"kind": "parent", "text": "STANCE LINE: \"Young people should be told the truth, even when it's frightening\" or \"Adults should decide how much a young person carries\". Each of you picks a spot and explains it in one sentence."},
      {"kind": "parent", "text": "ACTIVITY: 3 minutes. You are the adults at the table. Each of you has 60 seconds: one thing you'd tell Harry, one thing you'd hold back, and why. Then ask: who were you protecting by holding it back?"},
      {"kind": "read", "text": "One thing to hold on to: Mrs Weasley isn't Harry's mother, and Kumara isn't a frightened fifteen-year-old. What matches is the question. How much do you protect someone, when the danger is coming for them anyway?"},
      {"kind": "parent", "text": "For the parent: the next scene comes just after Harry walks into the forest to let Voldemort kill him, in the Battle of Hogwarts. Fred, Lupin and Tonks have already died. Your child knows Harry survives, but say plainly that it's a sad, frightening moment for the characters. Go gently."},
      {"kind": "read", "text": "Now a second scene, from *Deathly Hallows*, chapter thirty-six, \"The Flaw in the Plan\". It's in *Part 2* of the film."},
      {"kind": "read", "text": "Harry lies on the forest floor with his eyes closed, among Voldemort's followers. Voldemort's curse has struck him, and he has come back, but nobody must know. Voldemort orders Narcissa Malfoy to check whether the boy is dead."},
      {"kind": "read", "text": "She kneels, lays her hand on his chest, and feels his heart beating. Then, so quietly that nobody else can hear, she asks whether Draco is alive and in the castle, and Harry breathes yes."},
      {"kind": "read", "text": "Narcissa stands up and tells everyone that Harry Potter is dead."},
      {"kind": "read", "text": "In the book, Harry understands why: the only way she could get into Hogwarts to find her son was as part of a winning army, and she no longer cared whether Voldemort won."},
      {"kind": "parent", "text": "PAUSE: Think it through. Choose two or three:"},
      {"kind": "parentList", "items": ["Notice: what did Narcissa ask, and what did she do with the answer?", "Feel: what might she be feeling, kneeling there with Voldemort watching?", "Stretch: her lie helped defeat Voldemort, but she did it to reach her son. Does the reason matter if the result is good?", "Turn it around: tell it from Draco's side. He doesn't know what his mother just did.", "Connect: Skandamata's son protects the world. Narcissa's son was on the wrong side. Is it the same love?"]},
      {"kind": "parent", "text": "If they say \"She's a hero\", try: \"Would she have lied if Draco had been safe at home?\" If they say \"It's just like Skandamata\", try: \"Whose good did each one's protection serve?\""},
      {"kind": "parent", "text": "STANCE LINE: \"Narcissa did a good thing\" or \"Narcissa did a selfish thing that happened to help\"."},
      {"kind": "parent", "text": "ACTIVITY: 2 minutes. Freeze the moment she stands up. 30 seconds each: the reason Narcissa tells herself. Then 30 seconds each: the reason Harry might give. Are they the same?"},
      {"kind": "parent", "text": "Optional: if your child brings up Lily, Harry's mother's love protected him too (*Philosopher's Stone*, chapter 17). Ask what's different about Lily's protection and Narcissa's."},
      {"kind": "heading", "text": "Part 3: Side by side, today, and closing (about 5 minutes)"},
      {"kind": "read", "text": "Let's put the stories next to each other. There's no single right answer to any of these."},
      {"kind": "parent", "text": "PAUSE: ask one or two, one at a time:"},
      {"kind": "parentList", "items": ["The Krittikas, Parvati, Mrs Weasley, Sirius and Narcissa all protect a young person. What is each one protecting him from?", "Kumara went to war as a child, and Brahma said he was ready. Harry walked into the forest at seventeen. Does being ready depend on age?", "Skandamata's protection served the whole world; Narcissa's served her son. Can protecting one person ever harm others?", "What's one difference between these stories we should never forget?"]},
      {"kind": "read", "text": "Remember: Skandamata is a Devi, worshipped as mother of the whole world. Mrs Weasley, Sirius and Narcissa are characters in a book. We're comparing the question, not the people."},
      {"kind": "read", "text": "Now, closer to home."},
      {"kind": "read", "text": "Imagine your parents are thinking about moving to another city for a job. Nothing is decided. They've told you, but asked you not to tell your younger sister. She's overheard something, and she asks you straight out."},
      {"kind": "read", "text": "Some people would say tell her the truth, because guessing is worse. Some would say it isn't your decision, so tell your parents she's asking. Some would tell her a little: grown-ups are talking, nothing's decided. And some would keep the promise, because she'd only worry about something that might never happen."},
      {"kind": "parent", "text": "PAUSE: ask, \"Who gets to decide what a younger child is ready to know? Does it change when the child asks?\""},
      {"kind": "read", "text": "Last questions."},
      {"kind": "parent", "text": "PAUSE: ask one question for your child, and one \"go deeper\" question if there's energy. Suggested: \"The Krittikas loved Kartikeya more than their own lives, and still let him leave their home for Kailasa, going along with him. How do you think they felt?\" and \"Is love for your own child always good?\""},
      {"kind": "parent", "text": "TOGETHER: \"What's one thing you feel ready to do on your own that we haven't talked about yet?\" Then answer it yourself: \"What's one thing I find hard to let go of?\""},
      {"kind": "read", "text": "Tonight's word is nurture. True care helps someone grow strong enough to go their own way."},
      {"kind": "read", "text": "Tomorrow, the gods are furious at a buffalo-demon who has stolen heaven. Their anger blazes out as light, and all the lights join together into one Devi."},
      {"kind": "parent", "text": "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight."},
    ],
    timing:
      "about 10 minutes for Part 1, 10 for Part 2 and 5 for Part 3, so about 25 minutes in all. A short evening takes about 16: no choice questions, one scene, two ladder questions, and no side by side.",
  },

  // The closing (Reflection.tsx draws it; Score.closing() plays it).
  closing: {
    seconds: 13,
    raga: 'yaman', // Yaman: the night ends warm (direction brief)
    captions: [
      { at: 0, text: 'a falling flute phrase' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the tanpura fades to silence' },
    ],
  },
};
