// Night 4: Kushmanda, the warm cosmic egg.
//
// All text is copied from docs/nights/night-4.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-4.md.

import type { Night } from './types';

export const day4: Night = {
  number: 4,
  devi: 'Kushmanda',
  title: 'Kushmanda, the warm cosmic egg',
  summary:
    "Night 4 takes about 24 minutes, or about 16 as a short evening. Its question: what can a small warmth begin? Tonight the story leads. It goes back before everything, to the moment the Devi smiled into the darkness and the universe began. Then come two short Harry Potter scenes: Hagrid's cake at midnight and Mrs Weasley's Christmas jumper.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: 'gentle. There is no death, battle or peril tonight.',
    },
    {
      lead: 'An honest warning',
      text: "tonight's link to Harry Potter is **speculative**. Kushmanda's story is about creating a universe, and nothing in Harry Potter creates a world. The two scenes match a feeling, not a decision. Say this to your child; it is part of comparing honestly.",
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: "the opening, the story (Beats 2–6; each choice shows its set-up and what happened, without the question), the theme, Hagrid's cake at midnight with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the two choice questions, the Christmas jumper and its Think it through, and Side by side.",
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves out the Christmas jumper, its Think it through,
  // and Side by side. (Every choice's question is left out on a short evening
  // anyway; its set-up and what happened are shown as story.)
  shortEveningLeavesOut: ['n4-b10', 'n4-b11', 'n4-b12'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n4-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 2,
      direction: {
        intensity: 2,
        palette: 'reflective', // fades to n4primordialDark as "Tonight's form" begins
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      // The bell pulses once at the start of this beat; the story does not stop.
      parentNote: [
        "Tonight's Harry Potter scenes are kept short on purpose. The link is a feeling of warmth arriving in the dark, not a matching decision, and the lesson says so.",
      ],
      points: [
        {
          lead: 'Last night',
          text: "Shiva arrived for his wedding with a wild, frightening procession of ghosts and spirits, and Parvati's mother Mena fainted. Parvati took the fierce, protective form of Chandraghanta, then persuaded Shiva to appear in a gentle form.",
        },
        {
          lead: "Tonight's form",
          text: 'tonight the story steps right back, before Sati, before the mountain, before anything at all. Kushmanda is the Devi as the one who began the universe with a smile, and who lives at the heart of the sun.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b2',
      sourceRows: [0],
      number: 2,
      type: 'story',
      title: 'Before anything at all',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n4primordialDark', // warms to n4sunCore from the smile
        camera: 'pushIn', // still for sentences 0–1, push in on the glow, pull back on sentence 4
        // Bhupali from the smile; the score opens in Malkauns (drone only) for
        // sentences 0–1 (see day4Score.ts).
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'strings', 'resolution'] },
        slowMo: { line: 3, seconds: 4 }, // the light first spreads
        freezeAfterLine: [3], // hold on the egg
      },
      intro:
        "Kushmanda's own story comes from **devotional tradition**, not from a Purana. The main source is the Gita Press booklet *Nava Durga* and the devotional practice that follows it. The Devi Kavacham, the hymn that lists the nine forms, gives only her name and her place as the fourth. Where older texts tell of a cosmic egg or a golden seed, the beat names them, and they are background, not her story.",
      paragraphs: [
        'Before there was a universe, there was nothing to see and no one to see it. Darkness lay everywhere. Then the Devi smiled. From that smile, light spread through the darkness, and the cosmic egg, the *brahmanda*, appeared. From the egg the whole universe unfolded: worlds, stars and every living being. In devotional tradition, this smiling Devi is Kushmanda, the fourth of the nine forms. (Gita Press, *Nava Durga*.)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b3',
      sourceRows: [7, 8, 9, 12],
      number: 3,
      type: 'choice',
      title: 'What comes first?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n4primordialDark',
        camera: 'still',
        // Malkauns under the cards; a Bhupali fragment at the reveal.
        music: { palette: 'indian', raga: 'malkauns', bpm: 52, layers: ['drone'] },
      },
      setup: 'imagine complete darkness, with nothing in it at all. A world is about to begin.',
      ask: 'If you were beginning a world, what would come first?',
      options: [
        {
          text: 'Light, so there is something to see',
          acknowledgement: 'A strong instinct. Light comes very early in tonight\'s story too.',
        },
        {
          text: 'A sound or a word',
          acknowledgement: 'Many traditions begin with a sound. In Hindu thought, the syllable Om is often called the first sound.',
        },
        {
          text: 'A seed or an egg: something small that grows',
          acknowledgement: 'Then the rest can unfold by itself. Two old Hindu texts begin exactly like this.',
        },
        {
          text: 'Someone to share it with',
          acknowledgement: "A world nobody can enjoy is a strange kind of world. That's a thoughtful answer about *why* to begin.",
        },
      ],
      whatHappens:
        "in Kushmanda's story, a smile comes first, and light and the egg come from the smile. Older Hindu texts begin in other ways. One Rig Veda hymn says darkness was hidden in darkness, and that desire arose as the first seed of mind (RV 10.129.3–4). Another begins with a golden embryo, Hiranyagarbha (RV 10.121.1). The Chandogya Upanishad tells of an egg that split into a silver half and a gold half, the earth and the sky (3.19). The tradition doesn't insist on one beginning.",
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b4',
      sourceRows: [2, 3, 4],
      number: 4,
      type: 'story',
      title: 'The one who lives in the sun',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n4sunCore',
        camera: 'lowAngle', // then a slow crane up as the rays open
        music: { palette: 'indian', raga: 'bhupali', bpm: 66, layers: ['drone', 'motif', 'strings', 'percussion', 'resolution'] },
        freezeAfterLine: [3], // the sun with eight tipped rays and the lion
      },
      paragraphs: [
        'Devotional tradition says Kushmanda lives at the very centre of the sun. She is called *Suryamandala-antarvasini*, "she who dwells within the sun\'s sphere", and she alone can bear its heat. The sun\'s light, and the light that fills the ten directions, is said to come from her. She has eight arms, so she is also called Ashtabhuja, the eight-armed one, and she rides a lion. Devotees pray to her for health, strength and long life. (Gita Press, *Nava Durga*; devotional practice.)',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation unless marked',
      hotspots: [
        {
          id: 'arms',
          symbol: 'Eight arms',
          meaning: 'Power that reaches in every direction at once. (The number is tradition; the reading is interpretation.)',
          label: 'interpretation',
        },
        {
          id: 'kamandalu',
          symbol: 'Water pot (kamandalu)',
          meaning: 'Life, and the simple life of someone who practises discipline.',
          label: 'interpretation',
        },
        {
          id: 'kalasha',
          symbol: 'Pot of nectar (amrita kalasha)',
          meaning: 'Health and long life, which devotees ask of her.',
          label: 'interpretation',
        },
        {
          id: 'bow',
          symbol: 'Bow and arrow',
          meaning: 'Aim and focus: energy sent exactly where it is needed.',
          label: 'interpretation',
        },
        {
          id: 'lotus',
          symbol: 'Lotus',
          meaning: 'It grows clean out of mud: purity in the middle of the world.',
          label: 'interpretation',
        },
        {
          id: 'discus',
          symbol: 'Discus and mace',
          meaning: 'Order and strength, the power to protect what has been made.',
          label: 'interpretation',
        },
        {
          id: 'rosary',
          symbol: 'Rosary (japa mala)',
          meaning: 'Devotional tradition says it holds the eight siddhis (powers) and nine nidhis (treasures).',
          label: 'interpretation',
        },
        {
          id: 'lion',
          symbol: 'The lion',
          meaning: "Courage, and strength under the Devi's control.",
          label: 'interpretation',
        },
        {
          id: 'sun',
          symbol: 'The sun behind her',
          meaning: 'She is the light within the light. In yogic interpretation, Night 4 is linked with the Anahata, or heart, chakra.',
          label: 'interpretation',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b5',
      sourceRows: [5, 10, 7],
      number: 5,
      type: 'choice',
      title: 'How much does it take?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n4primordialDark',
        camera: 'still',
        // Drone and a soft santoor figure, in Bhupali.
        music: { palette: 'indian', raga: 'bhupali', bpm: 56, layers: ['drone', 'motif'] },
      },
      setup: 'the whole universe is in darkness. Something has to light it.',
      ask: 'How much power do you think it takes to begin a universe?',
      options: [
        {
          text: 'All the power there is',
          acknowledgement: "It's a universe, after all. One old hymn agrees the Devi holds all of it.",
        },
        {
          text: 'A single spark',
          acknowledgement: 'Small, but enough to catch. Big fires do start that way.',
        },
        {
          text: 'Something gentle, like a smile',
          acknowledgement: "That's tonight's story exactly. Gentle isn't the same as weak.",
        },
        {
          text: 'Nobody can know',
          acknowledgement: 'An honest answer, and one of the oldest. A Rig Veda poet said much the same.',
        },
      ],
      whatHappens:
        'in a way, the first three answers are all true. One popular explanation of her name is *ku*, a little, plus *ushma*, warmth, plus *anda*, egg: a little warmth that hatched the cosmic egg. This is a devotional reading of the word, not grammar from an old text. Yet in the Devi Mahatmya, Brahma praises the Devi as the one who creates the universe, holds it up and at the end draws it back into herself (ch. 1, verses 72–73 in the hindupad.com numbering; editions number it differently). A smile, and all the power there is, in one Devi.',
      shortEveningFrom:
        'One popular explanation of her name is *ku*, a little, plus *ushma*, warmth, plus *anda*, egg: a little warmth that hatched the cosmic egg.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b6',
      sourceRows: [6, 8, 9, 13],
      number: 6,
      type: 'story',
      title: 'The gourd and the golden egg',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n4goldenEgg',
        camera: 'drift', // then crane up, then a slow push in on the column of light
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      paragraphs: [
        "*Kushmanda* is also the Sanskrit word for a pumpkin or gourd, and the ash gourd is a favourite offering to her on this night. Some people explain her name this way too (popular devotional tradition). Behind her story stand much older pictures of beginning. The Rig Veda praises Hiranyagarbha, the golden embryo, which arose at the start of everything (RV 10.121). The Chandogya Upanishad says the sun was born from the cosmic egg, and teaches that the sun is Brahman, the ultimate reality (Ch. Up. 3.19). Kushmanda's story joins these old ideas, the egg and the sun, into one smiling Devi.",
      ],
      didYouKnow: {
        lead: 'Did you know? (popular and local tradition)',
        text: '*petha*, the translucent sweet that Agra is famous for, is made from ash gourd. And in Varanasi, the Durga Kund temple is locally identified with Kushmanda; the present temple dates from the eighteenth century.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b7',
      sourceRows: [11],
      number: 7,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Creation',
        idea: 'What you make carries something of why you made it.',
        description:
          'In her story the universe isn’t built by force or labour. It begins with a smile in the dark, and a small warm egg of light. Old Indian philosophy asks why anyone would create at all, and one answer is lila, play: creation out of delight, not need. And Kushmanda doesn’t leave what she made. She lives at the core of the sun, keeping it warm. Our reading is that why you make something shows up in what it becomes, and that making something starts a relationship with it rather than finishing a task.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b8',
      sourceRows: [14, 15, 16, 17],
      number: 8,
      type: 'sceneIntro',
      title: "Hagrid's cake at midnight",
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n4stormHut',
        camera: 'aerial', // over the sea, then push in through the window; pull back at the fire
        music: { palette: 'hogwarts', bpm: 64, layers: ['drone', 'motif'] },
        slowMo: { line: 3, seconds: 3 }, // the door opens
        freezeAfterLine: [6], // the light holds; nothing moves
      },
      reference:
        'Harry. *Philosopher\'s Stone*, chapter 3, "The Letters from No One" (the countdown), and chapter 4, "The Keeper of the Keys". Film: *Philosopher\'s Stone* (2001), the hut on the rock.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        'in the book the cake is a sticky chocolate cake with "Happy Birthday Harry" in green icing, and Hagrid admits he may have sat on it. In the film it is pink with the words misspelled, and Hagrid adds that he baked it himself. The film also shows Harry drawing a cake in the dust of the floor before midnight *(to check)*. None of this changes the moment we discuss.',
      retelling: [
        "Letters from Hogwarts keep arriving for Harry, hundreds of them, and Uncle Vernon drags the family to a damp hut on a rock out at sea, in the middle of a storm. Harry lies on the floor, counting down the minutes to his eleventh birthday on Dudley's watch. He wonders whether the Dursleys will even remember; last year they gave him a coat-hanger and a pair of Uncle Vernon's old socks. At midnight there's a tremendous bang, and the door is smashed in. A giant of a man squeezes into the hut and pulls out a slightly squashed box for Harry. Inside is a birthday cake with Harry's name on it. Harry means to say thank you, but the words get lost, and he asks who the man is instead. Hagrid gets a fire going, cooks sausages, and tells Harry he's a wizard.",
      ],
      connection: {
        similar:
          'in a dark, cold place, a small, warm thing arrives at midnight, and a whole new world begins for Harry. It is the first birthday anyone has truly marked for him.',
        different: [
          'Kushmanda creates a universe from nothing. Hagrid creates nothing; the wizarding world already existed, and he brings news of it.',
          "The cake isn't what changes Harry's life; the letter is. The cake is a kindness on the side.",
          'Hagrid had been sent to deliver a letter. As far as the book tells us, the cake was his own idea, but it is not a hard decision or a dilemma.',
          "Kushmanda's story is sacred and cosmic. Harry's is one boy's birthday in a novel.",
        ],
        whyItHelps:
          'a cosmic egg is hard to picture. A squashed cake in a storm, and a boy who doesn\'t know how to say thank you, is easy. It lets a child feel what "a little warmth" might mean.',
        strength: { rating: 'speculative', text: 'The feeling matches; the story, the scale and the decision do not.' },
        themeLink:
          "Hagrid was sent only to deliver a letter; the cake was his own idea, brought so that someone would mark Harry's birthday. Squashed, and possibly sat on, it still carries that reason, which is why Harry can't find the words to thank him, and that night begins a friendship that lasts the whole series.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b9',
      sourceRows: [14, 15],
      number: 9,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 1,
        palette: 'n4stormHut',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Harry expect from his birthday, and why?' },
        { step: 'Feel', question: 'why do you think Harry couldn\'t get the words "thank you" out?' },
        { step: 'Wonder', question: 'Hagrid had a big job to do that night. Why do you think he bothered with a cake?' },
        { step: 'Stretch', question: "the letter changed Harry's life; the cake didn't. So did the cake matter at all?" },
        { step: 'Turn it around', question: "tell that midnight from Dudley's side, watching a giant give his cousin a birthday cake." },
        {
          step: 'Connect',
          question:
            "tonight's story says a smile began a universe. Is that like a cake beginning Harry's new life, or is it a completely different kind of thing?",
        },
      ],
      followUps: [
        { ifTheySay: "It's just a cake", tryAsking: 'Would Harry have remembered that night differently without it?' },
        {
          ifTheySay: 'Hagrid is like Kushmanda',
          tryAsking: "What does Kushmanda do that Hagrid can't? What does Hagrid do that's just ordinary kindness?",
        },
        {
          ifTheySay: "Harry was rude, he didn't say thank you",
          tryAsking: 'Have you ever been too surprised, or too moved, to say the right thing?',
        },
        {
          ifTheySay: 'The Dursleys are just mean',
          tryAsking: 'What do you think a coat-hanger as a present tells Harry about how they see him?',
        },
      ],
      stance: {
        left: 'The cake mattered as much as the letter',
        right: 'The letter changed everything; the cake was a nice extra',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'the night without the cake',
        minutes: 2,
        text: 'Imagine Hagrid arrived with only the letter. Each person has 45 seconds to describe how Harry might remember that night now. Then decide together: what exactly did the cake add, if anything?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b10',
      sourceRows: [18, 19, 20],
      number: 10,
      type: 'sceneIntro',
      title: 'The Christmas jumper',
      label: 'hogwarts',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n4christmasMorning',
        camera: 'drift', // across the room, then a slow push in on the jumper
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [3], // the jumper unfolded
      },
      reference:
        'Harry. *Philosopher\'s Stone*, chapter 12, "The Mirror of Erised", with chapter 6, "The Journey from Platform Nine and Three-Quarters", where he first meets Mrs Weasley. Film: *Philosopher\'s Stone* (2001), Christmas morning.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film keeps the jumpers but not the explanation. Ron says his mum made his, and that Harry seems to have one too. Ron telling his mum that Harry expected no presents, and the fudge, are in the book only.",
      retelling: [
        "It's Harry's first Christmas at Hogwarts, and he expects nothing at all. But on Christmas morning there's a pile of presents at the foot of his bed. The Dursleys have sent a fifty-pence coin, and there's a lumpy parcel from Mrs Weasley, Ron's mother, whom Harry has met once, for a few moments, at King's Cross. Inside is a thick, hand-knitted jumper in emerald green, and a big box of homemade fudge. Ron groans: he had told his mum that Harry wasn't expecting any presents. She knits one for each of her children every year, he explains, and his is always maroon. Later, one of the twins notices that Harry's jumper is better than theirs. Perhaps, he jokes, she makes more of an effort for people who aren't family.",
      ],
      connection: {
        similar:
          'a small, warm gift reaches someone who expected nothing, and it starts something that lasts. Harry gets a Weasley jumper for years afterwards, and the Weasleys become something like a family to him.',
        different: [
          "Kushmanda's warmth begins everything that exists. Mrs Weasley's reaches one boy.",
          'Mrs Weasley *decided* to do this, for someone she barely knew. That is a real choice, but a gentle one; it costs her wool, time and money, not much more.',
          'Nothing is created from nothing. Mrs Weasley is doing what she already does for her own children, and widens the circle by one.',
        ],
        whyItHelps:
          'it asks what makes a small kindness grow into something big: the size of the gift, or that it kept coming?',
        strength: { rating: 'speculative', text: 'Like the cake, it matches a feeling. It has slightly more of a decision in it.' },
        themeLink:
          'Mrs Weasley knits the jumper by hand because Ron told her Harry expected no presents, and it carries that reason: Harry is given what her own children get each year. And she doesn\'t make just one. A jumper arrives for Harry year after year, more like the start of a relationship than a task finished.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b11',
      sourceRows: [18],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 1,
        palette: 'n4christmasMorning',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'why did Mrs Weasley send Harry a present at all? Who told her he needed one?' },
        { step: 'Feel', question: 'Ron groaned when he saw it. What might Ron have been feeling?' },
        { step: 'Wonder', question: 'why might a jumper mean more to Harry than something expensive would?' },
        {
          step: 'Stretch',
          question:
            'the twins joked that she made more effort for Harry than for her own children. Is it fair to give more to someone who has less?',
        },
        { step: 'Turn it around', question: "tell it from Mrs Weasley's side, knitting by the fire for a boy she's met once." },
        {
          step: 'Connect',
          question:
            'Kushmanda gives light to the sun, which lights everything else. Who passed the warmth along in this story? (Ron told his mum; his mum knitted; Harry wore it.)',
        },
      ],
      followUps: [
        {
          ifTheySay: "It's only a jumper",
          tryAsking: 'Why do you think Harry kept getting one, year after year? What does a present that keeps coming say?',
        },
        {
          ifTheySay: 'Mrs Weasley is like the Devi',
          tryAsking: 'Mrs Weasley is a kind person in a story. What is the difference between kindness and creating a world?',
        },
        {
          ifTheySay: "It's not fair on Ron",
          tryAsking: 'Did Ron lose anything because Harry got a jumper? Is fairness always about equal amounts?',
        },
        {
          ifTheySay: "Harry should have expected nothing, so anything's good",
          tryAsking: 'Is it sad, or brave, to expect nothing?',
        },
      ],
      stance: {
        left: 'A gift from someone who barely knows you means more',
        right: 'A gift means most from the people closest to you',
      },
      activity: {
        title: 'should she knit it?',
        minutes: 2,
        text: "It's November, and Mrs Weasley has just read Ron's letter. The child argues for 30 seconds that she *shouldn't* knit for Harry: money is tight, he isn't hers, he might be embarrassed. The parent argues for 30 seconds that she should. Then swap. Which argument was harder to make?",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b12',
      number: 12,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 2,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        "Kushmanda's light came from a smile; Hagrid's came with a squashed cake. Does it matter how small the first warmth is?",
        'In tonight\'s story, light comes into total darkness. Harry\'s birthday and his Christmas both start in a kind of darkness. What was dark for him?',
        'The sun can only shine because Kushmanda lights it. Who are the people who "light" the people who look after you?',
        "Mrs Weasley *chose* to send the jumper. The story doesn't present Kushmanda's smile as a choice between options. Is a kindness worth more when it's a choice?",
        "Name one difference between Kushmanda's story and these scenes so big that we should never forget it.",
      ],
      doesntCompare:
        "Kushmanda is a Devi, worshipped today, and her story is about the beginning of everything that exists. Hagrid and Mrs Weasley are fictional people being kind. We are comparing the *feeling* of warmth arriving in the dark, and even that link is ours, not the author's. Tonight's comparison is speculative, and that's all right to say.",
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b13',
      number: 13,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The new person at lunch.',
          setup:
            "A new student has joined your class. For a week they've eaten lunch alone. Your friends haven't noticed, or haven't said anything.",
          perspectives: [
            '"Ask them to sit with us. It costs nothing."',
            '"It does cost something. My friends might not want them there, and then it\'s awkward."',
            '"Wait. Some people like being alone at first, and pity can feel worse than nothing."',
            '"Ask once, kindly, and let them decide."',
            '"Only do it if I mean to keep doing it. A one-off isn\'t really kindness."',
          ],
          ask: 'Hagrid brought one cake; Mrs Weasley sent a jumper every year. Is a small kindness you only do once still worth doing?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n4-b14',
      number: 14,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 2,
      direction: {
        intensity: 2,
        palette: 'reflective', // himalayanDawn arrives in the closing
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'Kushmanda began the universe with a smile. Why do you think the story chose a smile, and not a shout or a battle?',
        'Who has been a bit like a sun for you?',
      ],
      goDeeper: [
        'Hindu tradition tells several different stories of how the universe began, side by side. Why might a tradition keep more than one?',
        'The Rig Veda poet asked whether even the watcher in the highest heaven knows how it all began. Is it brave or worrying for a sacred text to admit not knowing?',
        'If someone is always the warm one for others, who looks after them? What do they owe themselves?',
        'Small beginnings can grow into harm too. Can you be responsible for something you only started?',
      ],
      together: 'what is one small, warm thing our family does that we would want to keep going for years?',
      privateNote: 'one small beginning I want to remember is…',
      tomorrow: 'the Devi holds a child on her lap: Skandamata, the mother of Skanda.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      "The story leads tonight. Give it time, and don't rush to the Harry Potter scenes, which are deliberately short.",
      "Say plainly that tonight's comparison is speculative. Showing a child how to admit a weak link is part of the lesson.",
      "Kushmanda's creation story is devotional tradition, not a Puranic narrative. The older texts quoted (Rig Veda, Chandogya Upanishad) are background, not her story.",
      "Harry's forgotten birthdays may touch a nerve for a child who has ever felt overlooked. If it does, let the conversation go there, and keep it warm.",
    ],
    sources: [
      {
        claim: "Kushmanda's smile, the darkness, the cosmic egg",
        source: 'Gita Press, *Nava Durga*; devotional tradition (summarised on Wikipedia, "Kushmanda")',
        label: 'Tradition (devotional, not Puranic)',
        confidence: 'High that this is the devotional account',
      },
      {
        claim: 'The Devi Kavacham gives only her name, fourth of nine',
        source: 'Devi Kavacham',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'She dwells in the sun (*Suryamandala-antarvasini*); eight arms; items held; lion',
        source: 'Gita Press, *Nava Durga*; devotional iconography',
        label: 'Tradition',
        confidence: 'High (some images show a tiger or other items)',
      },
      {
        claim: 'Rosary holding the siddhis and nidhis; prayers for health and long life',
        source: 'Gita Press, *Nava Durga*',
        label: 'Tradition (devotional)',
        confidence: 'Medium',
      },
      {
        claim: 'Meanings of the symbols; heart (Anahata) chakra link',
        source: 'Devotional and yogic readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Name as *ku* + *ushma* + *anda*',
        source: 'Popular devotional etymology',
        label: 'Interpretation',
        confidence: 'Medium; not grammar from a classical text',
      },
      {
        claim: '*Kushmanda* means gourd; ash gourd offered to her',
        source: 'Sanskrit usage; popular devotional practice',
        label: 'Tradition (popular)',
        confidence: 'High (word); medium (offering practice varies)',
      },
      {
        claim: 'Darkness hidden in darkness; desire as the first seed; "who really knows?"',
        source: 'Rig Veda 10.129.3–4, 6–7',
        label: 'Tradition',
        confidence: 'High; translations vary',
      },
      {
        claim: 'Hiranyagarbha, the golden embryo',
        source: 'Rig Veda 10.121',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Egg splitting into silver earth and golden sky; the sun as Brahman',
        source: 'Chandogya Upanishad 3.19',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'The Devi creates, sustains and withdraws the universe',
        source: "Devi Mahatmya ch. 1, Brahma's hymn (vv. 72–73 at hindupad.com; numbering varies)",
        label: 'Tradition',
        confidence: 'High (content); medium (verse numbers)',
      },
      {
        claim: 'Creation as play (*lila*)',
        source: 'Brahma Sutra 2.1.33',
        label: 'Interpretation (philosophical)',
        confidence: 'High',
      },
      {
        claim: 'Om as the first sound',
        source: 'Widely held Hindu teaching',
        label: 'Interpretation',
        confidence: 'Medium (stated generally)',
      },
      {
        claim: 'Petha made from ash gourd; Durga Kund identified with Kushmanda',
        source: 'Popular and local tradition; temple guides',
        label: 'Tradition (local)',
        confidence: 'Medium',
      },
      {
        claim: 'Countdown in the hut; coat-hanger and socks',
        source: "*Philosopher's Stone* ch. 3",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Hagrid's arrival and the cake",
        source: "*Philosopher's Stone* ch. 4; 2001 film",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Film: pink cake, misspelled, "baked it myself"',
        source: '2001 film, transcript',
        label: 'Hogwarts',
        confidence: 'High (line); medium (cake design)',
      },
      {
        claim: 'Film: Harry draws a cake in the dust',
        source: '2001 film',
        label: 'Hogwarts',
        confidence: 'Low *(to check)*',
      },
      {
        claim: "Jumper, fudge, fifty pence, Ron told his mum; the twins' joke",
        source: "*Philosopher's Stone* ch. 12",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Mrs Weasley first meets Harry at King\'s Cross',
        source: "*Philosopher's Stone* ch. 6",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Film: Ron's mum made jumpers for both",
        source: '2001 film, transcript',
        label: 'Hogwarts',
        confidence: 'High',
      },
    ],
    footnote: 'All Harry Potter lines are paraphrased; there are no direct quotations.',
  },

  // -------------------------------------------------------------------------
  // The read-aloud script (T key)
  // -------------------------------------------------------------------------
  readAloud: {
    intro:
      'Read it straight through, or use it alongside the app. It runs about 24 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (each marked **[Full night only]**; still read what follows), the second scene (from "The second scene" to its stance line) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 9 minutes)' },
      {
        kind: 'read',
        text: "Last night, Shiva arrived for his wedding with a wild, frightening procession. Parvati's mother fainted, and Parvati became Chandraghanta, fierce and protective, until Shiva agreed to appear gently.",
      },
      {
        kind: 'read',
        text: 'Tonight we go back much further. Before Sati, before the mountain, before anything at all. Tonight the Devi is Kushmanda, the one who began the universe.',
      },
      {
        kind: 'read',
        text: "I'll tell you now: tonight's Harry Potter scenes are only loosely linked to her story. Nobody in Harry Potter creates a universe. So the story gets most of the time tonight, and we'll say honestly where the link is weak.",
      },
      { kind: 'parent', text: 'Pause: about 30 seconds' },
      {
        kind: 'read',
        text: 'Imagine nothing at all. No earth, no sky, no stars. No one to look, and nothing to see. Only darkness, everywhere.',
      },
      { kind: 'read', text: 'Then the Devi smiled.' },
      {
        kind: 'read',
        text: 'From that smile, light spread through the darkness. And a great egg appeared, the cosmic egg, which in Sanskrit is called the *brahmanda*. From that egg the whole universe unfolded: worlds and stars and every living thing.',
      },
      {
        kind: 'read',
        text: 'This is how devotional tradition tells it, the way families pray and sing about her. It isn\'t from one of the long old Puranas. But it is how millions of people know her.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Full night only. Ask: "If you were beginning a world, what would come first? Light, a sound, a seed or egg, or someone to share it with?" Listen to the reasons.',
      },
      {
        kind: 'read',
        text: 'In her story, a smile comes first, and the light comes from the smile. Other old Hindu texts begin differently. One hymn in the Rig Veda says that in the beginning darkness was hidden in darkness, and desire arose like the first seed of mind. Another begins with a golden embryo. And the Chandogya Upanishad tells of an egg that split in two: a silver half that became the earth, and a gold half that became the sky. The tradition keeps all of these side by side.',
      },
      { kind: 'parent', text: 'Pause: briefly' },
      {
        kind: 'read',
        text: "Where does Kushmanda live? Devotees say she lives at the very centre of the sun. Only she can bear its heat. The sun's light, they say, is really her light.",
      },
      {
        kind: 'read',
        text: 'In pictures she has eight arms. She holds a water pot and a pot of nectar, a bow and an arrow, a lotus, a discus, a mace and a string of prayer beads. She rides a lion. People pray to her for health, strength and a long life.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Full night only. Ask: "How much power do you think it takes to begin a universe? All the power there is, a single spark, something gentle like a smile, or can nobody know?"',
      },
      {
        kind: 'read',
        text: "Here is a lovely thing about her name. One popular explanation splits it into three parts: *ku*, a little; *ushma*, warmth; and *anda*, egg. A little warmth that hatched the egg of the universe. That's a devotional reading of the word, not a rule of grammar, but people love it.",
      },
      {
        kind: 'read',
        text: 'And yet another old text, the Devi Mahatmya, praises the Devi as the one who creates the whole universe. She holds it up, and at the end she draws it back into herself. So she is both: a little warmth, and all the power there is.',
      },
      {
        kind: 'read',
        text: "*Kushmanda* is also the word for a gourd, a kind of pumpkin. Many people offer her an ash gourd on this night. Agra's famous sweet, *petha*, is made from ash gourd too.",
      },
      {
        kind: 'parent',
        text: 'Pause: about 1 minute. Optional: "Which picture of the beginning do you like best: the smile, the egg, or the seed?"',
      },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 9 minutes)' },
      { kind: 'read', text: "Tonight's word is creation. What you make carries something of why you made it." },
      {
        kind: 'read',
        text: 'In her story the universe isn’t built by force or labour. It begins with a smile in the dark, and a small warm egg of light. Old Indian philosophy asks why anyone would create at all, and one answer is lila, play: creation out of delight, not need. And Kushmanda doesn’t leave what she made. She lives at the core of the sun, keeping it warm. Our reading is that why you make something shows up in what it becomes, and that making something starts a relationship with it rather than finishing a task.',
      },
      {
        kind: 'read',
        text: "Now, Hogwarts. Two short scenes, both from *Philosopher's Stone*. Remember, the link is only a feeling, not a matching choice.",
      },
      { kind: 'read', text: "The first is from chapters three and four, and it's in the film." },
      {
        kind: 'read',
        text: "Letters from Hogwarts keep arriving for Harry, hundreds of them, and Uncle Vernon drags the family to a damp hut on a rock out at sea, in the middle of a storm. Harry lies on the floor, counting down the minutes to his eleventh birthday on Dudley's watch. He wonders whether the Dursleys will even remember; last year they gave him a coat-hanger and a pair of Uncle Vernon's old socks. At midnight there's a tremendous bang, and the door is smashed in. A giant of a man squeezes into the hut and pulls out a slightly squashed box for Harry. Inside is a birthday cake with Harry's name on it. Harry means to say thank you, but the words get lost, and he asks who the man is instead. Hagrid gets a fire going, cooks sausages, and tells Harry he's a wizard.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Harry expect from his birthday, and why?',
          'Feel: why couldn\'t Harry get the words "thank you" out?',
          'Wonder: Hagrid had a big job that night. Why bother with a cake?',
          "Stretch: the letter changed Harry's life, not the cake. So did the cake matter?",
          "Connect: is a cake beginning Harry's new life anything like a smile beginning a universe?",
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Hagrid is like Kushmanda", try: "What does Kushmanda do that Hagrid can\'t?" If they say "It\'s just a cake", try: "Would Harry remember that night differently without it?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "The cake mattered as much as the letter" or "The letter changed everything; the cake was a nice extra". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 2 minutes. Imagine Hagrid brought only the letter. Each of you has 45 seconds to describe how Harry might remember that night. Then decide: what did the cake add, if anything?',
      },
      {
        kind: 'read',
        text: "Hagrid didn't create a world. The wizarding world was already there, and he brought the news. What's similar is only this: something small and warm arrived in the dark, and a new life began.",
      },
      { kind: 'read', text: "The second scene is from chapter twelve, Christmas morning, and it's in the film too." },
      {
        kind: 'read',
        text: "It's Harry's first Christmas at Hogwarts, and he expects nothing at all. But on Christmas morning there's a pile of presents at the foot of his bed. The Dursleys have sent a fifty-pence coin, and there's a lumpy parcel from Mrs Weasley, Ron's mother, whom Harry has met once, for a few moments, at King's Cross. Inside is a thick, hand-knitted jumper in emerald green, and a big box of homemade fudge. Ron groans: he had told his mum that Harry wasn't expecting any presents. She knits one for each of her children every year, he explains, and his is always maroon. Later, one of the twins notices that Harry's jumper is better than theirs. Perhaps, he jokes, she makes more of an effort for people who aren't family.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: why did Mrs Weasley send a present at all? Who told her?',
          'Wonder: why might a jumper mean more to Harry than something expensive?',
          'Stretch: is it fair to give more to someone who has less?',
          'Connect: Kushmanda lights the sun, which lights everything else. Who passed the warmth along in this story?',
        ],
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "A gift from someone who barely knows you means more" or "A gift means most from the people closest to you".',
      },
      {
        kind: 'parent',
        text: "ACTIVITY: 2 minutes. It's November and Mrs Weasley has just read Ron's letter. Your child argues for 30 seconds that she shouldn't knit for Harry; you argue that she should. Then swap. Which side was harder?",
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 6 minutes)' },
      { kind: 'read', text: "Let's put the stories next to each other. There's no single right answer to any of these." },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'Does it matter how small the first warmth is?',
          "Harry's birthday and his Christmas both started in a kind of darkness. What was dark for him?",
          "Mrs Weasley chose to send the jumper. Is a kindness worth more when it's a choice?",
          "What's one difference between Kushmanda's story and these scenes that we should never forget?",
        ],
      },
      {
        kind: 'read',
        text: "Kushmanda's story is about the beginning of everything that exists, and she is worshipped today. Hagrid and Mrs Weasley are people in a story being kind. The link tonight is ours, and it's a loose one. That's fine to say.",
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine a new student has joined your class. For a week they've eaten lunch alone. Your friends haven't said anything.",
      },
      {
        kind: 'read',
        text: 'Some people would say ask them over, because it costs nothing. Some would say it does cost something, because your friends might not want them there. Some would wait, because some people like being alone at first, and pity can feel worse than nothing. Some would ask once, kindly, and let them decide. And some would say only do it if you mean to keep doing it.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "Hagrid brought one cake; Mrs Weasley sent a jumper every year. Is a small kindness you only do once still worth doing?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Why do you think the story chose a smile, and not a shout or a battle?" and "If someone is always the warm one for others, who looks after them?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "What is one small, warm thing our family does that we\'d want to keep going for years?"',
      },
      { kind: 'read', text: "Tonight's word is creation. What you make carries something of why you made it." },
      { kind: 'read', text: 'Tomorrow, the Devi holds a child on her lap. She is Skandamata, the mother of Skanda.' },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one small beginning you want to remember.",
      },
    ],
    timing:
      'about 9 minutes for Part 1, 9 for Part 2 and 6 for Part 3, so about 24 minutes in all. A short evening takes about 16: no choice questions, one scene, two ladder questions, and no side by side.',
  },

  // The closing (Closing in src/visuals/day4/Reflection.tsx draws it: the sun
  // rises with the warm point at its core, which drifts up as a spark).
  closing: {
    seconds: 13,
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
