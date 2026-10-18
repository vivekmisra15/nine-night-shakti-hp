// Night 3: Chandraghanta, the moon-bell.
//
// All text is copied from docs/nights/night-3.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-3.md.

import type { Night } from './types';

export const day3: Night = {
  number: 3,
  devi: 'Chandraghanta',
  title: 'Chandraghanta, the moon-bell',
  summary:
    "Night 3 takes about 25 minutes, or about 16 as a short evening. Its question: when should gentleness turn fierce, and how far should fierceness go? The night tells the story of Shiva's wedding procession, Mena's terror, and Parvati standing between her mother and the one she has chosen. Then it looks at two Harry Potter scenes: Neville standing up to his friends, and Molly Weasley's duel with Bellatrix.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: "gentle, with one intense scene. Mena's anger in Beat 5 needs a short parent note. Molly's duel in Beat 12 ends in a killing and carries a parent note, with a gentle alternative (Harry saving Dudley) if you'd rather use it. Read both parent notes before you begin.",
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: 'the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, Neville stands in the way with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the choice questions, Molly\'s duel (or its gentle alternative) and its Think it through, and Side by side.',
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves these out: whole beats by id, or single steps.
  // Beat 4's "What happens" screen is left out too (the doc says "leave out
  // this screen; the story carries on in Beat 5"). Every choice's question is
  // left out on a short evening anyway.
  shortEveningLeavesOut: ['n3-b4:choiceReveal', 'n3-b12', 'n3-b12g', 'n3-b13', 'n3-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n3-b1',
      sourceRows: [0],
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'durga', bpm: 60, layers: ['drone', 'motif'] },
      },
      points: [
        {
          lead: 'Last night',
          text: 'Parvati wanted to reach Shiva, who sat in meditation and noticed no one. She gave up charm for tapas, so severe that at last she ate not even leaves. When Shiva came in disguise and mocked himself to test her, she refused to listen, and he revealed who he was.',
        },
        {
          lead: "Tonight's form",
          text: "On the third night the Devi is worshipped as Chandraghanta. *Chandra* means moon and *ghanta* means bell. A half-moon shaped like a bell shines on her forehead. She is the third name in the Devi Kavacham's list of nine forms (verse 3). Her story tonight begins on the day of the wedding Parvati worked so hard for.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b2',
      sourceRows: [1],
      number: 2,
      type: 'story',
      title: 'Waiting for the bridegroom',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n3weddingDay',
        camera: 'pan',
        music: { palette: 'indian', raga: 'bhupali', bpm: 66, layers: ['drone', 'motif', 'percussion'] },
      },
      intro:
        "The wedding follows the Shiva Purana, Rudra Samhita, Parvati Khanda, chapters 43–45 (J. L. Shastri's translation). That text tells of Mena's terror but does not name Chandraghanta. The link between this wedding and Chandraghanta comes from popular devotional tellings, and Beat 6 says so. The bell itself comes from the Devi Mahatmya (Beat 8).",
      paragraphs: [
        "At last the day came. Shiva set out for the mountain kingdom with a vast procession, and Parvati's mother, Mena, longed to see the groom her daughter had chosen. She asked the sage Narada to point him out. The gods arrived first, each more splendid than the last. When Indra passed, glittering, Mena asked if this was Shiva. No, said Narada. She asked again at the moon, then the sun, then the wise Brihaspati. Each time the answer was no. (Shiva Purana, Rudra Samhita, Parvati Khanda ch. 43)",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b3',
      sourceRows: [1],
      number: 3,
      type: 'story',
      title: 'Shiva as he is',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 6,
        palette: 'n3procession',
        camera: 'lowAngle', // then pullBack as Mena faints
        music: { palette: 'indian', raga: 'marwa', bpm: 80, layers: ['drone', 'percussion', 'strings'] },
        freezeAfterLine: [4], // "That is Shiva," said Narada.
      },
      paragraphs: [
        'Then Shiva\'s own followers came: ghosts, spirits and his wild attendants, the ganas. Some had too many eyes or heads, some had none; some rushed past like howling wind, beating drums and blowing horns. The text says Shiva came "in his real form", partly to humble Mena\'s pride. Here he was: riding his bull, smeared with ash, a skull in one hand, the crescent moon in his matted hair, wearing an elephant hide and a tiger skin. "That is Shiva," said Narada. Mena trembled, cried out that she had been deceived, and fell to the ground in a faint. Her maids gathered round until she woke. (ch. 43)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b4',
      sourceRows: [1],
      number: 4,
      type: 'choice',
      title: 'What would you do, Parvati?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n3procession',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'motif'] },
      },
      setup:
        'Parvati chose Shiva through years of tapas. Now her mother lies fainted with terror, the guests are frightened, and the groom stands at the door looking exactly as he always has. Everyone she loves is on one side or the other.',
      ask: 'If you were Parvati, what would you do?',
      options: [
        {
          text: 'Defend Shiva to my mother, firmly',
          acknowledgement: "You stand by your choice. The Shiva Purana's Parvati does exactly this.",
        },
        {
          text: 'Comfort my mother first',
          acknowledgement: "Fear has to be calmed before anyone can listen. That's a kind of wisdom too.",
        },
        {
          text: 'Ask Shiva to appear more gently',
          acknowledgement: "You're asking someone you love to meet your family halfway. Popular tellings say she did.",
        },
        {
          text: 'Let the elders sort it out',
          acknowledgement: "Sometimes it isn't your fight. But this one is about you. Can you really step back?",
        },
      ],
      whatHappens: 'in different tellings, more than one of these. Read on.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b5',
      sourceRows: [2],
      number: 5,
      type: 'story',
      title: "Mena's anger",
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 6,
        palette: 'n3procession',
        camera: 'still', // then a slow push-in on Parvati's flame
        music: { palette: 'indian', raga: 'marwa', bpm: 72, layers: ['drone', 'strings'] },
        slowMo: { line: 4, seconds: 3 }, // "Through all of it Parvati stayed calm."
      },
      // The bell pulses at the start, and again just before Mena strikes
      // Parvati (sentence 3).
      parentNoteAgainAtLine: 3,
      parentNote: [
        "In the Shiva Purana, Mena's shock turns to fury. She blames Narada, the sages and Parvati, threatens her daughter's life, and strikes her (ch. 44). We tell this softly: she says terrible things and strikes Parvati, and the sages step between them.",
        "If your child asks, say plainly that frightened people can say things they regret, and that hitting a child is never right. The story doesn't approve of it either: everyone present tries to calm Mena, and in the next chapter she asks Shiva's pardon for her harsh words.",
      ],
      paragraphs: [
        "When Mena woke, she wept and raged. She blamed Narada and the sages for sending her daughter into tapas. She blamed Parvati for turning down the splendid gods. She said terrible things to her own child, and even struck her, until the sages stepped between them. Through all of it Parvati stayed calm. Her mother's judgement was clouded, she said; Shiva is the lord of all. She had already given herself to him in mind, word and body. One by one the gods, the sages, Himavat, Brahma and Vishnu tried to soothe Mena. At last she gave one condition. She would agree only if Shiva took a lovely form. (ch. 44)",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b6',
      sourceRows: [4, 5],
      number: 6,
      type: 'story',
      title: 'The moon-bell',
      label: 'tradition', // popular devotional tradition
      minutes: 1,
      direction: {
        intensity: 7,
        palette: 'n3moonBell',
        camera: 'crane', // then still
        music: { palette: 'indian', raga: 'durga', bpm: 76, layers: ['drone', 'motif', 'percussion', 'climax'] },
        freezeAfterLine: [3], // "This was Chandraghanta."
      },
      paragraphs: [
        "Here the popular Navaratri telling adds its own scene. It says that to protect her family's dignity, and Shiva's, Parvati took a new and fierce form. She rode a lion, with ten arms holding weapons, and a half-moon like a bell shone on her forehead. This was Chandraghanta. Her radiance calmed the terror in the hall, and the wild procession was seen for what it was: Shiva's own loyal attendants. Then, as Chandraghanta, she went to Shiva and asked him to appear gently. Tellings vary, and the Shiva Purana itself does not include this scene. It belongs to devotional tradition.",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b7',
      sourceRows: [3, 4],
      number: 7,
      type: 'choice',
      title: 'Should Shiva change?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n3moonBell',
        camera: 'still',
        music: { palette: 'indian', raga: 'bhupali', bpm: 68, layers: ['drone', 'motif', 'percussion'] },
      },
      ask: 'Mena says she will accept Shiva only if he changes how he looks. What should Shiva do?',
      options: [
        {
          text: 'Stay as he is: love me as I am',
          acknowledgement: "It's a real principle. Why should anyone change their appearance to be accepted?",
        },
        {
          text: 'Change, just for the wedding',
          acknowledgement: 'A gift to the bride\'s family on a day that matters to them. Generous, if he chooses it.',
        },
        {
          text: 'Change only because Parvati asks',
          acknowledgement: "Not for Mena's approval, but for the person he loves. Is that different?",
        },
        {
          text: 'Ask Mena why she is frightened',
          acknowledgement: 'Understanding first, then deciding. Few people in the story try this.',
        },
      ],
      whatHappens:
        'Shiva changed. In the Shiva Purana, Vishnu urges Narada to go to Shiva, Narada pleads with him, and Shiva joyfully takes a radiant, beautiful form (ch. 45). In popular tellings, it is Parvati as Chandraghanta who asks. Mena stood stunned, like a figure in a painting. She praised her daughter\'s tapas, asked Shiva to forgive her harsh words, and bowed to him. The wedding went ahead in joy. Which form was the "real" Shiva? The text called the frightening one his real form, though Narada later tells Mena it was only a form taken in play. Perhaps both were.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b8',
      sourceRows: [6, 7, 8, 5, 9, 10],
      number: 8,
      type: 'story',
      title: 'The bell that protects',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 5,
        palette: 'n3moonBell',
        camera: 'drift', // still, with a slow drift
        music: { palette: 'indian', raga: 'durga', bpm: 66, layers: ['drone', 'motif', 'resolution'] },
      },
      paragraphs: [
        "Why a bell? In the Devi Mahatmya, after the Devi defeats the buffalo-demon Mahishasura, the gods praise her and ask for protection. Protect us with your spear and your sword, they say, and with the sound of your bell and the twang of your bowstring (Devi Mahatmya ch. 4, verse 24). Two verses later they ask her to protect the world with *all* her forms: the gentle ones and the terrible ones alike (4.26). Chandraghanta's bell is a sound that warns before anything strikes. Devotees say evil flees at the sound, and that she is fierce to demons and gentle to those who come to her.",
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'bellMoon',
          symbol: 'Half-moon shaped like a bell (on her forehead)',
          meaning:
            "The moon is cool and calm; the bell is alert and alarming. Calm and readiness together. It also echoes Shiva's own crescent moon.",
          label: 'interpretation',
        },
        {
          id: 'bell',
          symbol: 'Bell (in one hand)',
          meaning:
            'The sound that wakes us up and drives away fear and evil. A bell is also rung at the start of worship in many homes and temples.',
          label: 'interpretation',
        },
        {
          id: 'weapons',
          symbol: 'Ten arms with weapons (trident, sword, bow and arrow, mace)',
          meaning: 'Readiness to protect from every side. In devotional readings, the weapons are for demons, never for devotees.',
          label: 'interpretation',
        },
        {
          id: 'lotus',
          symbol: 'Lotus, rosary and water pot',
          meaning:
            "Peace and practice kept in hand, even when she is ready to fight. The rosary and water pot recall Brahmacharini, last night's form.",
          label: 'interpretation',
        },
        {
          id: 'abhaya',
          symbol: 'Raised open palm (abhaya mudra)',
          meaning: '"Do not fear." Her fierceness is there for your protection.',
          label: 'interpretation',
        },
        {
          id: 'lion',
          symbol: 'Lion or tiger',
          meaning: 'Courage under control. Tellings differ on which animal she rides.',
          label: 'interpretation',
        },
        {
          id: 'manipura',
          symbol: 'Night 3 and the body',
          meaning:
            "In yogic interpretation (Gita Press's *Nava Durga*), the third night is linked with the Manipura chakra, at the navel, often associated with will and inner fire.",
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition)',
        text: "in Devi Mahatmya ch. 2, when the gods first give the Devi their powers, Indra gives her a thunderbolt and a bell taken from his elephant, Airavata (verse 22 in the HinduPad numbering). The bell in Chandraghanta's hand has a long history.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b9',
      number: 9,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'reflective',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Readiness',
        idea: 'Strength can protect just by being ready.',
        description:
          'Her emblem is a bell, and in the Devi Mahatmya the bell protects by its sound alone: the ringing that overwhelms demons reassures the gods. She is pictured with a calm face and weapons in every hand. She isn’t calm first and fierce later. She is both at once, fierce towards harm and serene towards the frightened. Calling her simply “a warrior” misses this. Her strength is often a signal that stops a fight before it has to happen. Readiness, held calmly, is itself a kind of protection.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b10',
      sourceRows: [11, 12],
      number: 10,
      type: 'sceneIntro',
      title: 'Neville stands in the way',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n3commonRoomNight', // then greatHall for the feast
        camera: 'still', // then a pan to the hall
        music: { palette: 'hogwarts', bpm: 64, layers: ['drone', 'motif'] },
        freezeAfterLine: [4], // he raises his fists: the activity's freeze point
      },
      reference:
        'Neville. *Philosopher\'s Stone*, chapter 16, "Through the Trapdoor", and chapter 17, "The Man with Two Faces". Film: *Philosopher\'s Stone* (2001), the common room at night, and the end-of-year feast.',
      findScene: {
        lead: 'Find the scenes',
        text: 'there are no links. Find them yourselves in your own copies of the books or films, using the references above.',
      },
      filmNote:
        "the film keeps Neville's stand, the Body-Bind and Dumbledore's ten points. The book gives more of the back story, such as the points Neville himself lost earlier. Check the film's version of that before mentioning it.",
      retelling: [
        "It's the end of Harry's first year. Harry, Ron and Hermione are sure Snape will try to steal the Philosopher's Stone tonight, and plan to slip out under the Invisibility Cloak. But Gryffindor has already lost lots of points because of them, and Neville lost points too, trying to warn them about Malfoy. In the empty common room, Neville steps out from behind an armchair and plants himself in front of the portrait hole. They'll get Gryffindor into even more trouble, he says; they told him to stand up to people, and he raises his fists. Hermione says she's really sorry and casts the full Body-Bind, and Neville topples over, stiff as a board. The three of them step over him and go, feeling awful. At the end-of-year feast, Dumbledore gives Neville ten points, because standing up to your friends takes as much bravery as standing up to your enemies, and those points win Gryffindor the House Cup.",
      ],
      connection: {
        similar:
          'someone stands in the way of people they care about, to protect the wider community, knowing it will cost them. Neville faces his own friends. Parvati faces her own mother.',
        different: [
          "Neville is frightened and loses in seconds. Chandraghanta's strength is divine and unshaken.",
          "Neville is wrong about the stakes: he's protecting house points, while the trio are trying to protect the Stone. Parvati is not mistaken.",
          'Neville tries to *stop* his friends. Parvati tries to *bring together* her mother and Shiva.',
          'Neville offers to fight. In the popular telling, Chandraghanta takes a fierce form and fights no one.',
        ],
        whyItHelps:
          "most pre-teens know this exact moment: your friends are about to do something, and you're the only one saying no.",
        strength: {
          rating: 'partial',
          text: 'The dilemma of standing against your own side matches well; the protective bell matches less well.',
        },
        themeLink:
          "Neville's stand is a warning before a fight: he blocks the portrait hole and raises his fists before anything happens. Here readiness alone doesn't stop anyone, which is worth talking about.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b11',
      sourceRows: [11, 12],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 2,
        palette: 'n3commonRoomNight',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what was Neville trying to protect? What did he already know it would cost him?' },
        { step: 'Feel', question: 'how do you think Neville felt, lying stiff on the floor while his friends stepped over him?' },
        { step: 'Wonder', question: "why didn't Harry, Ron and Hermione just tell Neville the truth?" },
        {
          step: 'Stretch',
          question: 'Neville was wrong about what was really going on. Dumbledore still rewarded him. What exactly was he rewarded for?',
        },
        { step: 'Turn it around', question: "tell the scene from Hermione's side. She cast the spell. Was she right to?" },
        {
          step: 'Connect',
          question:
            "Parvati stood between her mother and Shiva; Neville stood between his friends and the door. What's the hardest part of standing against people you love?",
        },
      ],
      followUps: [
        {
          ifTheySay: 'Neville was just being annoying',
          tryAsking: 'Would you have the nerve to block three older-seeming friends on your own?',
        },
        {
          ifTheySay: "He was wrong, so it doesn't count",
          tryAsking: 'Can you be brave and wrong at the same time? Does the bravery still count?',
        },
        { ifTheySay: 'Hermione had no choice', tryAsking: 'What else could she have done? Would any of it have worked in time?' },
        {
          ifTheySay: 'Parvati and Neville both stood up to people',
          tryAsking: 'Did Parvati want to stop her mother, or to bring her round? Is that the same thing?',
        },
      ],
      stance: {
        left: 'Neville was right to stand in the way',
        right: 'The trio were right to go anyway',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: "what if they'd told him?",
        minutes: 3,
        text: "Freeze the moment Neville raises his fists. The parent plays Harry and has 60 seconds to persuade Neville honestly, by telling him the truth. The child plays Neville and decides. Then swap. Afterwards, ask: would the truth have changed what Neville did? Why do you think they didn't try it?",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b12',
      sourceRows: [13],
      number: 12,
      type: 'sceneIntro',
      title: "Molly's duel",
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 7,
        palette: 'n3battleHall',
        camera: 'drift', // then still
        music: { palette: 'hogwarts', bpm: 84, layers: ['drone', 'percussion', 'strings'] },
        slowMo: { line: 1, seconds: 2 }, // the near miss
      },
      // The bell pulses at the start, and again just before Molly's curse
      // strikes Bellatrix (sentence 7).
      parentNoteAgainAtLine: 7,
      parentNote: [
        'This scene is set in the Battle of Hogwarts and ends with Mrs Weasley killing Bellatrix Lestrange. Earlier that night, her son Fred has died.',
        "The line Molly shouts at Bellatrix, in both the book and the film, includes a swear word. We don't repeat it.",
        'Tell it plainly and without detail. If your child is upset, say that the story is about a battle and a mother protecting her daughter, and that we are looking at the *choice*, not admiring the killing.',
        "If you'd rather keep tonight gentle, use the gentle alternative below (Harry saves Dudley) instead.",
      ],
      reference: 'Molly Weasley. *Deathly Hallows*, chapter 36, "The Flaw in the Plan". Film: *Deathly Hallows – Part 2* (2011), the final battle.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film keeps the near miss, Molly's swearing line and the duel. In the book, Molly's curse strikes Bellatrix in the chest and she falls. In the film, Molly freezes her and then she shatters. The book has Bellatrix mock Molly about Fred; the film doesn't dwell on it.",
      retelling: [
        "It's the very end of the Battle of Hogwarts. Bellatrix Lestrange, Voldemort's most devoted follower, is fighting Hermione, Ginny and Luna at once, and a Killing Curse misses Ginny by an inch. Mrs Weasley sees it: the woman who knits jumpers for boys she's met once, and fusses over everyone's dinner. She runs across the hall, throwing off her cloak, pushes the girls out of the way and shouts at everyone to stand back: this fight is hers. Bellatrix laughs and taunts her about her children, and about Fred, the son Molly lost earlier that night. Molly swears that Bellatrix will never touch their children again. The duel is fast and furious. Then Molly's curse strikes Bellatrix in the chest, and Bellatrix falls and does not get up.",
      ],
      connection: {
        similar:
          "gentleness and ferocity live in the same person. The fierceness rises only when someone she loves is in danger, as Chandraghanta's does.",
        different: [
          "Molly's fury is personal and hot, full of grief for Fred. Chandraghanta's calm never leaves her: the moon stays on her forehead.",
          "Molly's fierceness ends in a killing. In tonight's story, the fierce form fights no one: it calms a frightened hall. When the Devi does fight, in the Devi Mahatmya, it is to restore order, not for revenge.",
          'Molly is a mother defending her daughter in a war. Chandraghanta is a Devi protecting all her devotees.',
          'Molly tells everyone else to stand back. The bell warns everyone first.',
        ],
        whyItHelps:
          'it shows a child that "gentle" and "fierce" aren\'t two kinds of people. It also makes the key question vivid: does fierceness have a limit?',
        strength: {
          rating: 'partial to strong',
          text: '"Gentle and fierce in one person" matches closely. How far the fierceness goes does not match at all.',
        },
        themeLink:
          "Molly's strength was there all along behind her warmth, and it rises the moment Ginny is in danger. But it does not protect just by being ready: it ends in a fight, and that is where the scene and the theme part ways.",
      },
    },

    // -----------------------------------------------------------------------
    // The gentle alternative to Beat 12. The parent chooses one of the two on
    // the night's first screen.
    {
      id: 'n3-b12g',
      gentleFor: 'n3-b12',
      sourceRows: [14],
      number: 12,
      type: 'sceneIntro',
      title: 'Harry saves Dudley',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n3summerAlley',
        camera: 'still', // then a short push-in on the silver burst
        music: { palette: 'hogwarts', bpm: 72, layers: ['drone', 'strings'] },
        freezeAfterLine: [2], // the rule he knows
      },
      reference:
        'Harry. *Order of the Phoenix*, chapter 1, "Dudley Demented", and chapter 2, "A Peck of Owls". Film: *Order of the Phoenix* (2007), the opening.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      retelling: [
        "It's a hot summer evening, and Harry and Dudley are walking home through an alleyway, needling each other; Dudley has been mocking Harry for crying out in his sleep. Suddenly the air turns icy, the light goes out, and two dementors glide towards them. Underage wizards aren't allowed to use magic outside school, and Harry has been warned before. But one dementor is closing in on Dudley, the cousin who has bullied him all his life, and Harry casts his Patronus anyway. The silver stag drives both dementors away, and Harry half-carries Dudley home. Within minutes a letter arrives from the Ministry: he has been expelled. The expulsion is later put on hold, and he is cleared at a hearing.",
      ],
      connection: {
        similar:
          'a gentle person turns fierce to protect, and here it protects someone who has never been kind to him. The bell protects everyone who hears it, not only friends.',
        different: ['Harry acts in panic, not calm.', 'He is defending himself as well as Dudley.', 'He is a boy with a wand, not a Devi.'],
        whyItHelps: 'it shows protecting someone you don\'t like, which is a harder kind of readiness than protecting a friend.',
        // The doc gives the rating only, with no explanation.
        strength: { rating: 'partial', text: '' },
        themeLink:
          'Harry can cast a Patronus because he learned it long before he needed it, so he is ready when the dementors come. It protects by driving them away, not by harming them, and it protects someone who has never been kind to him.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b13',
      sourceRows: [13, 14],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 2,
        palette: 'n3battleHall',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what made Molly step in? What did she tell everyone else to do?' },
        { step: 'Feel', question: 'what do you think Molly was feeling, a few hours after losing Fred?' },
        { step: 'Wonder', question: 'why did she insist on fighting Bellatrix herself, instead of letting others help?' },
        { step: 'Stretch', question: 'Molly protected Ginny. Did she also take revenge? Can one act be both?' },
        { step: 'Turn it around', question: "tell the moment from Ginny's side. How might it feel to watch your mum do that, for you?" },
        {
          step: 'Connect',
          question:
            "Chandraghanta's bell warns before anything strikes, and in tonight's story she fights no one. Molly strikes. What's the difference between being fierce and being violent?",
        },
      ],
      followUps: [
        { ifTheySay: 'Bellatrix deserved it', tryAsking: "Maybe. Is 'she deserved it' the same as 'Molly had to do it'?" },
        { ifTheySay: "Molly's just like the Devi", tryAsking: "What's on Chandraghanta's forehead? Was Molly calm?" },
        { ifTheySay: 'Anger is bad', tryAsking: "Was Molly's anger wrong? What would you think of her if she'd felt nothing?" },
        { ifTheySay: "It's a war, so it's fine", tryAsking: "Does a war change what's right, or only what's possible?" },
      ],
      stance: {
        left: 'Fierceness should stop at protecting',
        right: 'Sometimes protecting means ending the danger for good',
        note: 'Each person places a named marker and explains it.',
      },
      activity: {
        title: 'the bell before the blow',
        minutes: 3,
        text: "Picture five steps: warn, stand in the way, push away, strike back, end the threat for good. Each person has 60 seconds to say where Chandraghanta's story stays, where Molly's goes, and where *they* think an ordinary person in everyday life should stop. Then compare your answers. Where did you disagree, and why?",
      },
      // With Harry saves Dudley: the doc's alternative ladder. The stance line
      // and activity stay the same. The doc gives no follow-ups for the
      // gentle scene, and Molly's would not fit, so none are shown.
      gentle: {
        ladder: [
          { step: 'Notice', question: 'what rule did Harry know he was breaking? Who was the dementor closing in on?' },
          { step: 'Feel', question: 'what do you think Harry felt when the air turned icy and the light went out?' },
          { step: 'Wonder', question: "Harry protected someone who'd never been kind to him. Why do you think he did?" },
          { step: 'Stretch', question: 'did Harry even stop to think? Does it matter, if it saved Dudley?' },
          { step: 'Turn it around', question: "tell the alleyway from Dudley's side." },
          {
            step: 'Connect',
            question: "Chandraghanta's bell protects everyone who hears it, not only friends. Can you protect someone you don't like?",
          },
        ],
        followUps: [],
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b14',
      number: 14,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'Parvati, Neville and Molly each stood in the way of something. What was each one protecting?',
        'Parvati stayed calm while her mother raged. Molly was not calm. Does calm matter if the result is the same?',
        'Mena judged Shiva by how he looked, and fainted. Who in Harry Potter is judged by appearance, and turns out to be someone else entirely?',
        "Shiva changed his form to be accepted. Neville didn't change his mind to be liked. When should you change for other people, and when shouldn't you?",
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        "Chandraghanta is a Devi, worshipped today, and her story is sacred. Neville and Molly are fictional characters. Molly's fierceness ends in a killing; tonight's Devi fights no one. We compare the dilemma, not the people.",
      gentle: {
        questions: [
          'Parvati, Neville and Harry each stood in the way of something. What was each one protecting?',
          'Parvati stayed calm while her mother raged. Harry acted in panic. Does calm matter if the result is the same?',
          'Mena judged Shiva by how he looked, and fainted. Who in Harry Potter is judged by appearance, and turns out to be someone else entirely?',
          "Shiva changed his form to be accepted. Neville didn't change his mind to be liked. When should you change for other people, and when shouldn't you?",
          'Name one difference between these stories so big that we should never forget it.',
        ],
        doesntCompare:
          "Chandraghanta is a Devi, worshipped today, and her story is sacred. Neville and Harry are fictional characters. Harry acts in panic, defending himself as well as Dudley; tonight's Devi stays calm and fights no one. We compare the dilemma, not the people.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b15',
      number: 15,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 62, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The fury that rises.',
          setup:
            'In the park, two older kids are pushing your little brother around and laughing. You feel a rush of anger so strong it surprises you.',
          perspectives: [
            '"Get straight in there and push them back. They started it."',
            '"Stand between them and your brother, calmly, and walk him away."',
            '"Shout for an adult. You\'re not big enough to win this."',
            '"Film it on your phone as proof." But does that help your brother right now?',
          ],
          ask: "your anger rose to protect someone. Is it allowed to hurt someone, then? Where's the line between fierce and violent?",
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n3-b16',
      number: 16,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa',
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'Parvati stayed calm while her mother shouted at her. How do you think she did it?',
        "What's something gentle about you that could turn fierce if it had to?",
      ],
      goDeeper: [
        'The Shiva Purana first calls Shiva\'s frightening form his "real form", then has Narada say it isn\'t. If he can also look beautiful, which one is real?',
        'Was it fair for Mena to ask Shiva to change how he looked? Was it kind of him to agree?',
        'Molly protected Ginny and also took revenge for Fred. Can you separate the two? Should you?',
        'Neville was brave and wrong. Can you think of a time someone was right but cowardly? Which is better?',
      ],
      together:
        'if one of us ever had to stand against our own friends or family to protect someone, how would we want the other to help?',
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: 'we go back before everything, before any wedding or any world, to the very first light.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'The heart of the night is a question, not a moral: when should gentleness turn fierce, and how far should it go?',
      'Say clearly that the link between Chandraghanta and the wedding is popular devotional tradition. The Shiva Purana tells the wedding without naming her.',
      'Don\'t let the child treat Molly as "like the Devi". The key difference is that tonight\'s fierce form fights no one, and its calm never leaves.',
      "Mena isn't a villain. She was frightened for her daughter, and she asked Shiva's pardon in the end.",
    ],
    sources: [
      {
        claim: 'The name and its place as the third form',
        source: 'Devi Kavacham, verse 3',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Mena guessing at the gods; Shiva's procession; Mena faints",
        source: 'Shiva Purana, Rudra Samhita, Parvati Khanda ch. 43 (Shastri, vv. 45–65)',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Mena's fury, threats and striking Parvati; Parvati's calm answer; everyone tries to persuade her; her condition",
        source: 'Shiva Purana, Rudra Samhita, Parvati Khanda ch. 44',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Narada pleads at Vishnu's urging; Shiva's beautiful form; Mena praises Parvati and asks Shiva's pardon",
        source: 'Shiva Purana, Rudra Samhita, Parvati Khanda ch. 45',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Parvati takes the Chandraghanta form at the wedding and asks Shiva to appear gently',
        source: 'Popular devotional tellings',
        label: 'Tradition (popular)',
        confidence: 'Medium; versions vary, and the Shiva Purana does not name her',
      },
      {
        claim: 'Golden, ten arms, half-moon shaped like a bell; lion or tiger',
        source: 'Gita Press, *Nava Durga*; devotional iconography',
        label: 'Tradition',
        confidence: 'High (ten arms, bell-moon); medium (mount and objects vary)',
      },
      {
        claim: 'Protect us with the sound of your bell',
        source: 'Devi Mahatmya 4.24',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Protect us with your gentle and your terrible forms',
        source: 'Devi Mahatmya 4.26',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Indra's bell from Airavata",
        source: 'Devi Mahatmya 2.22 (HinduPad numbering)',
        label: 'Tradition',
        confidence: 'High; verse numbers vary between editions',
      },
      {
        claim: 'Meanings of the symbols; fierce to demons, gentle to devotees',
        source: 'Devotional readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Manipura chakra',
        source: 'Gita Press, *Nava Durga*, as cited by Wikipedia',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Neville blocks the portrait hole; the Body-Bind',
        source: "*Philosopher's Stone* ch. 16; 2001 film",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Neville's ten points win the House Cup",
        source: "*Philosopher's Stone* ch. 17; 2001 film",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Molly's duel with Bellatrix",
        source: '*Deathly Hallows* ch. 36; *Deathly Hallows – Part 2* film',
        label: 'Hogwarts',
        confidence: 'High (book); medium (film details, from secondary sources)',
      },
      {
        claim: 'Harry saves Dudley; the expulsion letter',
        source: '*Order of the Phoenix* ch. 1–2; 2007 film',
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
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (still read what happened after each), the second scene (from the parent note before Molly\'s scene to the end of the gentle alternative) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 9 minutes)' },
      {
        kind: 'parent',
        text: "Before you start: decide whether you'll use Molly's duel in Part 2, which ends in a killing, or the gentler Dudley scene. Both are in the script.",
      },
      {
        kind: 'read',
        text: 'Last night, Parvati wanted to reach Shiva, who was lost in meditation and noticed no one. She gave up trying to charm him and began tapas instead, so fierce that in the end she ate not even leaves. When Shiva came in disguise and mocked himself to test her, she refused to listen. And he showed her who he really was.',
      },
      {
        kind: 'read',
        text: 'Tonight is the third night. The Devi is Chandraghanta. *Chandra* means moon, and *ghanta* means bell. On her forehead shines a half-moon shaped like a bell. Her story starts on a wedding day.',
      },
      { kind: 'parent', text: 'Pause: about 30 seconds' },
      {
        kind: 'read',
        text: "At last the day came. Shiva set out for the mountain kingdom with an enormous procession. Parvati's mother, Mena, couldn't wait to see the groom her daughter had worked so hard to win. She asked the sage Narada to point him out.",
      },
      {
        kind: 'read',
        text: 'The gods came first, each one more splendid than the last. When Indra rode past, glittering, Mena asked: is that Shiva? No, said Narada. She asked again when the moon god passed, then the sun, then the wise Brihaspati. No. No. No.',
      },
      {
        kind: 'read',
        text: "Then came Shiva's own followers. Ghosts and spirits and wild creatures. Some had too many eyes, some had none. Some rushed past like a howling wind, banging drums and blowing horns. And in the middle came Shiva himself, just as he always was. He rode a bull. He was smeared with ash, with a skull in one hand and the crescent moon in his tangled hair. He wore an elephant hide and a tiger skin.",
      },
      { kind: 'read', text: 'That, said Narada, is Shiva.' },
      {
        kind: 'read',
        text: "Mena trembled. She cried out that she'd been tricked. And she fainted, right there on the ground, and her maids rushed to help her.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were Parvati, what would you do? Defend Shiva to your mother, comfort your mother first, ask Shiva to look gentler, or let the elders sort it out?" Listen to the reasons.',
      },
      {
        kind: 'parent',
        text: 'For the parent: the next part has Mena shouting at Parvati and striking her. The text is harsher than this; we keep it soft. If your child asks, say that frightened people sometimes say things they regret, that hitting a child is never right, and that Mena later asks forgiveness for her harsh words.',
      },
      {
        kind: 'read',
        text: 'When Mena woke, she wept and raged. She blamed Narada. She blamed the sages. She blamed Parvati, for turning down the splendid gods. She said terrible things to her own daughter, and even struck her, until the sages stepped between them.',
      },
      {
        kind: 'read',
        text: "And Parvati stayed calm. Mother, she said, you can't see clearly right now. Shiva is the lord of everything. I have already given myself to him, in my mind, my words and my whole self.",
      },
      {
        kind: 'read',
        text: "One after another, the gods, the sages, Parvati's father Himavat, even Brahma and Vishnu, tried to calm Mena down. At last she said she'd agree on one condition. Shiva had to take a lovely form.",
      },
      {
        kind: 'read',
        text: "Now, the Shiva Purana, the old text this story comes from, doesn't mention Chandraghanta here. But the Navaratri tradition adds its own scene, and this is how it goes.",
      },
      {
        kind: 'read',
        text: "To protect her family's honour, and Shiva's, Parvati took on a new and fierce form. She rode a lion. She had ten arms, holding weapons. And on her forehead shone a half-moon, shaped like a bell. She was Chandraghanta. Her radiance calmed the terror in the hall, and the wild crowd was seen for what it really was: Shiva's own loyal friends. Then she went to Shiva and asked him to appear gently.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "Mena says she\'ll only accept Shiva if he changes how he looks. What should he do? Stay as he is, change just for the wedding, change only because Parvati asks, or ask Mena why she\'s frightened?"',
      },
      {
        kind: 'read',
        text: "Shiva changed. In the Shiva Purana, Narada goes and pleads with him, and Shiva happily takes on a radiant, beautiful form. In the Navaratri telling, it's Parvati who asks. Mena stood frozen, like a painting. Then she praised her daughter's tapas, asked Shiva to forgive her harsh words, and bowed to him. And the wedding went ahead in joy.",
      },
      {
        kind: 'read',
        text: "Here's something strange, though. The old text calls Shiva's frightening form his *real* form. So which one was the real Shiva? Maybe both.",
      },
      { kind: 'parent', text: 'Pause: give a moment. Ask: "What do you think?"' },
      {
        kind: 'read',
        text: 'Why a bell? In another old text, the Devi Mahatmya, the gods pray to the Devi after a great battle. Protect us with your spear and your sword, they say, and with the sound of your bell. Then they ask her to protect the world with all her forms, the gentle ones and the terrible ones alike.',
      },
      {
        kind: 'read',
        text: "A bell is a sound that warns before anything strikes. People say evil runs at the sound of Chandraghanta's bell, and that she is fierce to demons and gentle to anyone who comes to her. One of her hands is raised, palm open. It means: do not fear.",
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "Which part of the story will you remember?"' },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 11 minutes)' },
      { kind: 'read', text: "Tonight's word is readiness. Strength can protect just by being ready." },
      {
        kind: 'read',
        text: 'Her emblem is a bell, and in the Devi Mahatmya the bell protects by its sound alone: the ringing that overwhelms demons reassures the gods. She is pictured with a calm face and weapons in every hand. She isn’t calm first and fierce later. She is both at once, fierce towards harm and serene towards the frightened. Calling her simply “a warrior” misses this. Her strength is often a signal that stops a fight before it has to happen. Readiness, held calmly, is itself a kind of protection.',
      },
      {
        kind: 'read',
        text: "Now, Hogwarts. This is from *Philosopher's Stone*, chapters sixteen and seventeen. It's in the film too.",
      },
      {
        kind: 'read',
        text: "It's the end of Harry's first year. Harry, Ron and Hermione are sure Snape will try to steal the Philosopher's Stone tonight, and plan to slip out under the Invisibility Cloak. But Gryffindor has already lost lots of points because of them, and Neville lost points too, trying to warn them about Malfoy.",
      },
      {
        kind: 'read',
        text: "In the empty common room, Neville steps out from behind an armchair and plants himself in front of the portrait hole. They'll get Gryffindor into even more trouble, he says; they told him to stand up to people, and he raises his fists. Hermione says she's really sorry and casts the full Body-Bind, and Neville topples over, stiff as a board. The three of them step over him and go, feeling awful.",
      },
      {
        kind: 'read',
        text: 'At the end-of-year feast, Dumbledore gives Neville ten points, because standing up to your friends takes as much bravery as standing up to your enemies, and those points win Gryffindor the House Cup.',
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what was Neville trying to protect? What did he know it would cost him?',
          'Feel: how did Neville feel, lying stiff on the floor while his friends stepped over him?',
          "Wonder: why didn't they just tell Neville the truth?",
          'Stretch: Neville was wrong about what was going on. What exactly did Dumbledore reward him for?',
          "Connect: Parvati stood between her mother and Shiva; Neville stood between his friends and the door. What's hardest about standing against people you love?",
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "He was wrong, so it doesn\'t count", try: "Can you be brave and wrong at the same time?" If they say "Parvati and Neville both stood up to people", try: "Did Parvati want to stop her mother, or bring her round?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Neville was right to stand in the way" or "The trio were right to go anyway". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. Freeze the moment Neville raises his fists. You play Harry and have 60 seconds to persuade Neville by telling him the truth. Your child plays Neville and decides. Then swap. Ask: "Would the truth have changed what Neville did?"',
      },
      {
        kind: 'read',
        text: "What's similar is the dilemma: standing against your own side to protect something bigger. What's different matters too. Neville was scared, he lost in seconds, and he was wrong about what was really happening. Chandraghanta isn't scared, and she isn't wrong.",
      },
      {
        kind: 'parent',
        text: 'For the parent: the next scene ends with Mrs Weasley killing Bellatrix, just after Fred has died. Molly\'s famous line includes a swear word; it isn\'t read here. If you\'d rather keep tonight gentle, skip to the Dudley scene below, marked "Gentle alternative".',
      },
      {
        kind: 'read',
        text: 'Now a second scene, from *Deathly Hallows*, chapter thirty-six, "The Flaw in the Plan". It\'s in the second *Deathly Hallows* film too.',
      },
      {
        kind: 'read',
        text: "It's the very end of the Battle of Hogwarts. Bellatrix Lestrange, Voldemort's most devoted follower, is fighting Hermione, Ginny and Luna at once, and a Killing Curse misses Ginny by an inch.",
      },
      {
        kind: 'read',
        text: "Mrs Weasley sees it: the woman who knits jumpers for boys she's met once, and fusses over everyone's dinner. She runs across the hall, throwing off her cloak, pushes the girls out of the way and shouts at everyone to stand back: this fight is hers.",
      },
      {
        kind: 'read',
        text: "Bellatrix laughs and taunts her about her children, and about Fred, the son Molly lost earlier that night. Molly swears that Bellatrix will never touch their children again. The duel is fast and furious. Then Molly's curse strikes Bellatrix in the chest, and Bellatrix falls and does not get up.",
      },
      { kind: 'parent', text: 'Pause: give a moment of quiet. Ask: "How are you feeling about that?" Then go on.' },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what made Molly step in? What did she tell everyone else to do?',
          'Wonder: why did she insist on fighting Bellatrix herself?',
          'Stretch: Molly protected Ginny. Did she also take revenge? Can one act be both?',
          "Turn it around: tell it from Ginny's side.",
          "Connect: Chandraghanta's bell warns before anything strikes, and tonight she fights no one. Molly strikes. What's the difference between fierce and violent?",
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Molly\'s just like the Devi", try: "What\'s on Chandraghanta\'s forehead? Was Molly calm?" If they say "Bellatrix deserved it", try: "Is \'she deserved it\' the same as \'Molly had to\'?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Fierceness should stop at protecting" or "Sometimes protecting means ending the danger for good".',
      },
      {
        kind: 'parent',
        text: "ACTIVITY: 3 minutes. Picture five steps: warn, stand in the way, push away, strike back, end the threat for good. Each of you has 60 seconds to say where Chandraghanta's story stays, where Molly's goes, and where an ordinary person in everyday life should stop.",
      },
      {
        kind: 'read',
        text: "The gentleness and the fierceness live in the same person, in Molly and in the Devi. But Molly's fury was hot and full of grief, and it ended in a death. Chandraghanta's moon never leaves her forehead, and in tonight's story her fierce form hurts no one.",
      },
      {
        kind: 'parent',
        text: "Gentle alternative, instead of Molly's scene. From *Order of the Phoenix*, chapters one and two, and the start of the film:",
      },
      {
        kind: 'parent',
        text: "It's a hot summer evening, and Harry and Dudley are walking home through an alleyway, needling each other; Dudley has been mocking Harry for crying out in his sleep. Suddenly the air turns icy, the light goes out, and two dementors glide towards them. Underage wizards aren't allowed to use magic outside school, and Harry has been warned before. But one dementor is closing in on Dudley, the cousin who has bullied him all his life, and Harry casts his Patronus anyway. The silver stag drives both dementors away, and Harry half-carries Dudley home. Within minutes a letter arrives from the Ministry: he has been expelled. The expulsion is later put on hold, and he is cleared at a hearing.",
      },
      {
        kind: 'parent',
        text: 'Ask two or three from the alternative ladder: "Harry protected someone who\'d never been kind to him. Why do you think he did?", "Did he even stop to think? Does it matter, if it saved Dudley?" and "Can you protect someone you don\'t like?" Then use the stance line and activity above.',
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 5 minutes)' },
      {
        kind: 'read',
        text: "Let's put the stories next to each other. There's no single right answer to any of these.",
      },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'Parvati, Neville and Molly each stood in the way of something. What was each one protecting?',
          'With the gentle alternative, ask about Parvati, Neville and Harry instead, and note that Harry acted in panic, not calm.',
          "Parvati stayed calm; Molly didn't. Does calm matter if the result is the same?",
          'Mena judged Shiva by his looks. Who in Harry Potter gets judged by appearance and turns out to be someone else?',
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine you're in the park, and two older kids are pushing your little brother around and laughing. You feel a rush of anger so strong it surprises you.",
      },
      {
        kind: 'read',
        text: "Some people would get straight in there and push them back, because they started it. Some would stand between them and their brother, calmly, and walk him away. Some would shout for an adult, because they're not big enough to win this. And some would film it on their phone as proof, though that might not help their brother right now.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "Your anger rose to protect someone. Is it allowed to hurt someone, then? Where\'s the line between fierce and violent?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Parvati stayed calm while her mother shouted at her. How do you think she did it?" and "The old text first calls Shiva\'s frightening form his real form, then says it isn\'t. Which one is real?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "If one of us ever had to stand against our own friends or family to protect someone, how would we want the other to help?"',
      },
      {
        kind: 'read',
        text: "Tonight's word is readiness. Strength can protect just by being ready. The moon stays on Chandraghanta's forehead while the bell rings.",
      },
      {
        kind: 'read',
        text: 'Tomorrow we go back before everything. Before any wedding, before any world, to the very first light.',
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight.",
      },
    ],
    timing:
      'about 9 minutes for Part 1, 11 for Part 2 and 5 for Part 3, so about 25 minutes in all. A short evening takes about 16: no choice questions, one scene, two ladder questions, and no side by side.',
  },

  // The closing (Closing in src/visuals/day3/Reflection.tsx draws it; the
  // shared Score.closing() plays the falling phrase, one bell and the drone).
  closing: {
    seconds: 13,
    raga: 'durga', // Durga, the raga of the Devi taking form (direction brief)
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
