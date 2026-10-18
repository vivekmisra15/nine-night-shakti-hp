// Night 1: Shailaputri, daughter of the mountain.
//
// All text is copied from docs/nights/night-1.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-1.md.

import type { Night } from './types';

export const day1: Night = {
  number: 1,
  devi: 'Shailaputri',
  title: 'Shailaputri, daughter of the mountain',
  summary:
    "Night 1 takes about 23 minutes, or about 15 as a short evening. Its question: what do you do when your own family scorns someone you love? The night tells Sati's story and Shailaputri's new beginning, then two Harry Potter scenes: Aunt Marge's dinner and the Sorting.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: "gentle. Sati's death is told gently, as a sacred act and not an example. Read the parent note in Beat 5 before you begin.",
    },
    {
      lead: 'Short evening (about 15 minutes)',
      text: "the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, Aunt Marge's dinner with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the choice questions, the Sorting and its Think it through, and Side by side.",
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves these out: whole beats by id, or single steps
  // like 'n1-b4:choiceReveal'. (Every choice's question is left out on a short
  // evening anyway; its set-up and what happened are shown as story.)
  shortEveningLeavesOut: ['n1-b12', 'n1-b13', 'n1-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n1-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      // The spoiler notice and "How we compare" are in journey.ts (shown once).
      heading: 'What Navaratri is.',
      points: [
        {
          lead: 'Tradition',
          text: '*Nava* means nine and *ratri* means night. The main Navaratri falls in the autumn month of Ashvin (September or October). On each night the Devi is worshipped in one of nine forms, the Navadurga. The nine names come from the Devi Kavacham, a hymn recited with the Devi Mahatmya, which tells how the Devi defeated the buffalo-demon Mahishasura.',
        },
        {
          lead: 'Regional traditions',
          text: 'families keep it differently. Gujarat has garba and dandiya dancing, Bengal has Durga Puja, South India has Golu displays of dolls, and North India has Ramlila plays. Many homes begin on Night 1 by setting up a sacred pot (Ghatasthapana) and sowing grain that sprouts over the nine days. The festival ends with Vijayadashami, or Dussehra.',
        },
        {
          lead: 'Contemporary',
          text: 'many people today read the nine nights as a journey of inner growth, one quality per night. It is a helpful modern frame, not an ancient teaching, and we use it lightly.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b2',
      sourceRows: [0, 5],
      number: 2,
      type: 'story',
      title: 'The daughter who chose',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'kailasa', // opens in dakshaCourt, then Kailasa
        camera: 'aerial',
        music: { palette: 'indian', raga: 'bhupali', bpm: 68, layers: ['drone', 'motif', 'percussion'] },
      },
      intro:
        'This follows the Bhagavata Purana (book 4, chapters 2–7) and the Shiva Purana (Rudra Samhita). Where later texts add to it, the beat says so.',
      paragraphs: [
        'Daksha was one of the great lords of creation, proud of his rank and his rituals. Among his daughters was Sati, and Sati loved Shiva. Shiva was the ascetic of the mountains: smeared with ash, wearing snakes, followed by ghosts and wild spirits, and caring nothing for wealth or rank. Daksha gave Sati to Shiva in marriage only because Brahma asked him to, and he never accepted his son-in-law. (Some popular tellings say he forbade the marriage outright.) Sati and Shiva lived happily on Mount Kailasa.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b3',
      sourceRows: [0],
      number: 3,
      type: 'story',
      title: 'A sacrifice without Shiva',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'dakshaCourt', // then Kailasa at twilight
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bageshri', bpm: 58, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 4, seconds: 6 }, // Sati watches the trails of light
      },
      paragraphs: [
        "At a great gathering, everyone rose to greet Daksha except Brahma and Shiva. Daksha took it as an insult. In front of the assembly he abused Shiva and declared that Shiva should never again receive a share of the sacrificial offerings. Later, Daksha held a grand sacrifice and invited every god except Shiva. Sati saw the wives of the gods passing overhead in fine clothes on their way to her father's house. She longed to see her mother and sisters, and the home she grew up in.",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b4',
      sourceRows: [0],
      number: 4,
      type: 'choice',
      title: 'Should Sati go?',
      label: 'hypothetical',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'kailasa',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 56, layers: ['drone', 'motif'] },
      },
      setup:
        "Sati asks Shiva to go with her. Surely a daughter needs no invitation to her father's house? Shiva says you may visit family uninvited, but not a host who is angry with you. He warns that harsh words from a relative wound deeper than an enemy's arrows, and that she will not be honoured there. (BP 4.3)",
      ask: 'If you were Sati, what would you do?',
      options: [
        {
          text: "Go: it's my family, and I miss my mother and sisters",
          acknowledgement:
            "Family pulls hard, and an invitation isn't the only reason to turn up. That's Sati's own argument.",
        },
        {
          text: 'Stay: Shiva knows how my father treats him',
          acknowledgement: "You trust the warning of someone who has been hurt before. That's Shiva's argument.",
        },
        {
          text: 'Go, and try to make peace',
          acknowledgement: 'Hoping to mend things is generous. Notice that peace needs the other side to want it too.',
        },
        {
          text: 'Send a message first',
          acknowledgement: 'A careful middle path. What would the message say, and would Daksha read it kindly?',
        },
      ],
      whatHappens: 'Sati went.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b5',
      sourceRows: [1, 9],
      number: 5,
      type: 'story',
      title: "At her father's house",
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 7,
        palette: 'dakshaCourt', // desaturates towards grief after the flame goes out
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'marwa', bpm: 64, layers: ['drone', 'motif', 'strings', 'percussion'] },
        slowMo: { line: 8, seconds: 8 }, // the lamp flame rises and goes out
        freezeAfterLine: [8], // hold on the empty lamp
      },
      // The bell pulses at the start, and again as Sati sits down to meditate
      // (sentence 7), just before she leaves her body.
      parentNoteAgainAtLine: 7,
      parentNote: [
        'This is a sacred story about a Devi, and the texts treat her act as hers alone. It is not a model for how people respond to being hurt.',
        'Say plainly, even if it feels obvious, that if anyone ever hurts or humiliates you, the answer is to tell someone you trust and get help, never to harm yourself.',
        'The historical practice called "sati" shares her name but is a different thing. In the story Sati was not a widow, and Shiva was alive. The practice of widows dying on a husband\'s funeral pyre was banned in 1829 (the Bengal Sati Regulation), and again in independent India by the Commission of Sati (Prevention) Act, 1987. Hindu reformers such as Raja Ram Mohan Roy campaigned against it.',
        'If your child seems troubled by this part, pause the night. The rest can wait.',
      ],
      paragraphs: [
        'Her mother and sisters ran to welcome her with tears of joy. Her father did not speak to her at all. She looked around and saw that no share of the offering had been set aside for Shiva. Shiva\'s attendants wanted to attack Daksha, and Sati stopped them. Then she spoke in front of everyone. Shiva is a friend to every being, she said, and has no enemies; her father hunted for faults where Shiva would look for good. She said she was ashamed that her body had come from such a father, and that she would not keep it. She sat down facing north, closed her eyes, and went into deep meditation with her mind fixed on Shiva. Through the power of that meditation a fire rose from within, and she left her body. A great cry went up across the worlds, and everyone who watched blamed Daksha. (BP 4.4)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b6',
      sourceRows: [2, 4],
      number: 6,
      type: 'story',
      title: "Shiva's grief",
      label: 'tradition', // a combined telling: Bhagavata, then later texts
      minutes: 1.5,
      direction: {
        intensity: 9, // Virabhadra; falls to 3 by the meditation
        palette: 'grief',
        camera: 'lowAngle',
        music: { palette: 'indian', raga: 'marwa', bpm: 96, layers: ['drone', 'strings', 'percussion', 'climax'] },
        slowMo: { line: 1, seconds: 4 }, // the lock of hair thrown down
      },
      paragraphs: [
        "The sage Narada brought Shiva the news, and Shiva's grief became fury. He tore a lock of his hair and dashed it down, and from it rose Virabhadra, a terrible warrior, who destroyed Daksha's sacrifice (BP 4.5). In later texts, the Devi Bhagavata Purana and the Kalika Purana, Shiva lifts Sati's body and wanders the world, lost in grief. Vishnu gently separates the body piece by piece, and wherever a piece falls a Shakti Peetha arises. These sacred places are still visited today, for example Kamakhya in Assam and Kalighat in Kolkata. At last Shiva withdraws into deep, silent meditation in the mountains.",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b7',
      sourceRows: [2],
      number: 7,
      type: 'choice',
      title: 'What will Shiva do with his grief?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'grief',
        camera: 'still',
        music: { palette: 'indian', raga: 'marwa', bpm: 58, layers: ['drone', 'strings', 'resolution'] },
      },
      ask: "Shiva has lost Sati because of Daksha's contempt. What do you think he does?",
      options: [
        { text: 'Punish Daksha', acknowledgement: 'Anger at a terrible wrong. The story agrees: this comes first.' },
        { text: 'Forgive him', acknowledgement: 'Much harder. The story gets there too, later.' },
        { text: 'Go away and be alone', acknowledgement: 'Grief often wants silence. He does withdraw.' },
        { text: 'Hold on to Sati', acknowledgement: "Love that can't let go. Later texts tell exactly this." },
      ],
      whatHappens:
        'all four, in different texts. In the Bhagavata, the gods plead with Shiva and he relents. He restores the sacrifice and brings Daksha back to life with a goat\'s head in place of his own, and Daksha weeps and asks forgiveness (BP 4.7). Grief, like this story, can be more than one thing at once.',
      shortEveningFrom: 'In the Bhagavata, the gods plead with Shiva and he relents.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b8',
      sourceRows: [3, 6, 7, 8],
      number: 8,
      type: 'story',
      title: 'Daughter of the mountain',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 6,
        palette: 'himalayanDawn',
        camera: 'orbit',
        music: {
          palette: 'indian',
          raga: 'bhupali',
          bpm: 68,
          layers: ['drone', 'motif', 'percussion', 'strings', 'resolution'],
        },
        freezeAfterLine: [4], // the full portrait, before the hotspots
      },
      paragraphs: [
        'Himavat, king of the mountains, and his wife Mena prayed for a daughter, and Sati resolved to be born to them (Shiva Purana, Rudra Samhita, Parvati Khanda ch. 5). The Bhagavata also says she was reborn to Mena in the Himalayas and chose Shiva again (BP 4.7.58–59). She was Parvati, "she of the mountain". On this first night she is worshipped as Shailaputri: *shaila*, mountain, and *putri*, daughter. She is the same Devi with a new birth, in a family that honours the one she loves. Meanwhile Shiva sits in meditation, unaware of her, and tomorrow\'s story begins there.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'bull',
          symbol: 'Bull (Nandi)',
          meaning:
            "Steadiness, and strength under control; often linked with dharma. The bull is Shiva's companion, so she arrives already bound to him.",
          label: 'interpretation',
        },
        {
          id: 'trident',
          symbol: 'Trident (in her right hand)',
          meaning: 'Often read as the three qualities of nature (gunas), or as creation, preservation and dissolution.',
          label: 'interpretation',
        },
        {
          id: 'lotus',
          symbol: 'Lotus (in her left hand)',
          meaning: 'It grows clean out of mud: purity in the middle of the world.',
          label: 'interpretation',
        },
        {
          id: 'moon',
          symbol: 'Crescent moon',
          meaning: "Calm and coolness; also Shiva's own ornament.",
          label: 'interpretation',
        },
        {
          id: 'mountain',
          symbol: 'The mountain in her name',
          meaning:
            'Steadiness and roots. In yogic interpretation, Night 1 is linked with the Muladhara, or root, chakra.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition and interpretation)',
        text: 'in the Kena Upanishad (3.12–4.1), "Uma Haimavati", Uma of the Himalaya, appears to the god Indra and teaches the proud gods that their victory was not really their own. Tradition identifies her with Parvati. So this is a daughter of the mountain who corrects pride, on the night of a story about a proud father.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b9',
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
        word: 'Rootedness',
        idea: 'What you are rooted in can survive what you lose.',
        description:
          'The first form of the Devi is named for a relationship, not for something she did: she is the daughter of the mountain. The festival starts with where you stand before it asks what you’ll do. Sati loses her body, her family and her home. What survives is her devotion, which returns whole in Parvati, rooted in a new place. Devotees often link Shailaputri with the mountain’s steadiness. Our reading is that your roots are less about where you live or who you came from, and more about what you’re devoted to. That’s what carries you through change.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b10',
      sourceRows: [10],
      number: 10,
      type: 'sceneIntro',
      title: "Aunt Marge's dinner",
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'hogwartsDinner',
        camera: 'pushIn',
        music: { palette: 'hogwarts', bpm: 72, layers: ['drone', 'motif', 'strings'] },
      },
      reference:
        'Harry. *Prisoner of Azkaban*, chapter 2, "Aunt Marge\'s Big Mistake". Film: *Prisoner of Azkaban* (2004), opening scenes.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        'the film keeps the insults, the inflating, and Harry leaving on the Knight Bus. Compare how the film handles the deal over the Hogsmeade form with the book before quoting details.',
      retelling: [
        "It's the summer Harry turns thirteen, and Uncle Vernon's sister Marge comes to stay for a week. Harry strikes a deal with Uncle Vernon: he'll behave and never mention magic, and Vernon will sign the form that lets him visit the wizarding village of Hogsmeade. All week Marge sneers at Harry, and he says nothing. On the last night, after a long dinner, she turns on his parents. She calls his father a jobless good-for-nothing and repeats the Dursleys' lie that his parents died drunk in a car crash. Harry's anger rises past the point he can hold it, and his magic escapes him: Marge swells up like a balloon and floats to the ceiling. Harry drags his trunk out into the dark street, certain he'll be expelled. The form is never signed.",
      ],
      connection: {
        similar:
          "an elder insults absent loved ones at a family gathering, after contempt that has been building for a long time. Nobody defends Harry's parents; Vernon even feeds Marge the jibe, much as the guests at Daksha's sacrifice stayed silent out of fear of him. Aunt Petunia says nothing, though Marge is insulting her own sister, Lily.",
        different: [
          "Harry doesn't choose his response; his magic escapes him. The story treats Sati's act as deliberate and sacred.",
          "The scene is partly comic; Sati's story is a tragedy.",
          'Harry is a powerless child in that house. Sati is a Devi, speaking to her own father.',
          'Magic in Harry Potter is a learned and inherited skill. Shakti is understood as divine power itself.',
          'Most important: Harry leaving the house is not like Sati leaving her body, and we never treat it as if it were.',
        ],
        whyItHelps:
          "it brings Sati's dilemma down to a scale a pre-teen knows: a dinner table where someone you love is being mocked.",
        strength: { rating: 'partial', text: "The dilemma matches closely; the responses deliberately don't." },
        themeLink:
          "Harry walks out having lost the deal, the signed form and his place in the house, but not the thing he is rooted in: his loyalty to parents he never knew. What he would not let Marge take mattered more to him than everything he lost.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b11',
      sourceRows: [10],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'hogwartsDinner',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what deal had Harry made, and what was he trying to protect by keeping quiet all week?' },
        { step: 'Feel', question: 'what do you think Harry felt as Marge kept talking? Where did it change?' },
        { step: 'Wonder', question: 'why do you think Petunia said nothing, and Vernon joined in?' },
        { step: 'Stretch', question: "Harry didn't decide to inflate her. Is he still responsible for what happened?" },
        { step: 'Turn it around', question: "tell the dinner from Aunt Petunia's side. Marge was insulting her sister too." },
        {
          step: 'Connect',
          question: "how is Harry at that table like Sati at her father's sacrifice, and how is he completely different?",
        },
      ],
      followUps: [
        { ifTheySay: 'She deserved it', tryAsking: 'Did she deserve it, or did Harry want it? Are those the same thing?' },
        { ifTheySay: 'He should have ignored her', tryAsking: 'Would you ignore it if someone talked like that about me?' },
        {
          ifTheySay: "It wasn't his fault, it was accidental magic",
          tryAsking: "Do we have our own 'accidental magic', things that come out before we decide?",
        },
        {
          ifTheySay: 'Sati and Harry both just got angry',
          tryAsking:
            'Did Sati do anything before she spoke? (She stopped the attendants from attacking.) What does that tell you?',
        },
      ],
      stance: {
        left: 'Harry should have kept his temper: the deal mattered',
        right: 'Some insults have to be answered, whatever it costs',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'three seconds before',
        minutes: 3,
        text: "Freeze at the moment Marge calls Harry's father a good-for-nothing. Each person has 60 seconds to suggest one thing Harry could say or do that defends his parents *and* keeps his control. Then judge each other's ideas: which protects his parents best, and which protects Harry best? Are they the same?",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b12',
      sourceRows: [12, 13],
      number: 12,
      type: 'sceneIntro',
      title: 'The Sorting',
      label: 'hogwarts',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'greatHall',
        camera: 'aerial',
        music: { palette: 'hogwarts', bpm: 66, layers: ['drone', 'motif', 'strings'] },
      },
      reference:
        'Harry. *Philosopher\'s Stone*, chapter 7, "The Sorting Hat", with *Chamber of Secrets*, chapter 18, "Dobby\'s Reward". Films: *Philosopher\'s Stone* (2001), the Sorting; *Chamber of Secrets* (2002), Dumbledore\'s office at the end. The film keeps the "choices" idea, though its wording may differ from the book\'s.',
      findScene: {
        lead: 'Find the scenes',
        text: 'there are no links. Find them yourselves in your own copies of the books or films, using the references above.',
      },
      retelling: [
        "It's Harry's first night at Hogwarts, and the new students take turns putting on an old hat that decides their house. Hagrid has told Harry that every witch or wizard who went bad came from Slytherin, and in Diagon Alley he met Draco Malfoy, who was sure he'd be a Slytherin. The Hat sees courage, a good mind, talent and a hunger to prove himself, and says Slytherin could help him to greatness. Harry silently begs: not Slytherin. After a pause, the Hat calls out Gryffindor.",
        "A year later, Harry worries that he belongs in Slytherin after all: he can talk to snakes, as Salazar Slytherin could. Dumbledore reminds him that the Hat put him in Gryffindor because he *asked* not to go to Slytherin. Our choices, Dumbledore says, show who we really are, far more than our abilities.",
      ],
      connection: {
        similar:
          'in the Bhagavata, Sati can no longer bear being called "Dakshayani", Daksha\'s daughter (BP 4.4.23). She returns as the mountain\'s daughter, in a family that honours what she loves. Harry refuses to be defined by what he shares with Voldemort. Both stories separate what you were given from who you are.',
        different: [
          "Sati's rebirth is a divine act in a sacred story. Harry is an eleven-year-old picking a school house.",
          "Harry's choice rests on rumours from Hagrid and Malfoy. The series later complicates Slytherin through Snape, Regulus Black and Slughorn, and in the epilogue Harry tells his own son that the Hat takes your choice into account.",
          'Sati is the same Devi in a new body. Harry stays the same Harry whatever his house.',
        ],
        whyItHelps:
          'it turns a big idea, rebirth, into a question a pre-teen can answer: what part of me did I choose?',
        strength: { rating: 'partial', text: 'The theme of identity matches; the situations are far apart.' },
        themeLink:
          "the Hat offers Harry greatness in Slytherin, and he holds on to what he values instead. A year later, when he doubts who he is, Dumbledore points him back to that choice: his roots are in what he chose to stand for, not in what he shares with Voldemort.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b13',
      sourceRows: [12, 13],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'greatHall',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        {
          step: 'Notice',
          question: "what reasons did the Hat give for Slytherin? Where did Harry's opinion of Slytherin come from?",
        },
        { step: 'Feel', question: 'how might it feel to have the whole hall watching while a hat reads your mind?' },
        { step: 'Wonder', question: 'was Harry choosing Gryffindor, or running away from Slytherin? Does it matter?' },
        {
          step: 'Stretch',
          question:
            'Harry judged a whole house on what two people told him. Knowing about Snape, Regulus and Slughorn, was his choice still right?',
        },
        {
          step: 'Turn it around',
          question: 'imagine the Hat had put him in Slytherin anyway. What about Harry would have stayed the same?',
        },
        {
          step: 'Connect',
          question:
            'Sati didn\'t want to be known as "Daksha\'s daughter". Harry didn\'t want to be like Voldemort. What can we choose about who we are, and what can\'t we?',
        },
      ],
      followUps: [
        {
          ifTheySay: 'Choices matter more than abilities',
          tryAsking: "Can you think of a time an ability mattered more? (Hermione's cleverness saves them again and again.)",
        },
        { ifTheySay: 'He was just scared', tryAsking: 'Can a choice made out of fear still be a good one?' },
        { ifTheySay: 'Slytherins are the bad ones', tryAsking: 'Name a Slytherin who did something brave.' },
        {
          ifTheySay: 'Sati and Harry both escaped their families',
          tryAsking: "Did Sati stop loving her mother and sisters? Did Harry stop being Lily's son?",
        },
      ],
      stance: {
        left: 'Who you are is mostly what you choose',
        right: 'Who you are is mostly what you were given',
      },
      activity: {
        title: "the Hat's other speech",
        minutes: 2,
        text: 'The parent plays the Hat and has 30 seconds to argue for putting the child in the house they would least choose. The child has 30 seconds to answer the Hat. Then swap. Did any argument change your mind, even a little?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b14',
      sourceRows: [11],
      number: 14,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'split',
        camera: 'drift',
        music: { palette: 'both', bpm: 58, layers: ['drone', 'motif'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'Sati and Harry both sat through an elder insulting someone they loved. What was each one trying to protect?',
        "Harry lost control; the story presents Sati's act as chosen. Does it matter whether a response is chosen?",
        "Daksha's contempt and Marge's both built up over years. Why do you think nobody stopped them sooner?",
        "Shiva's grief turned into destruction, and then into restoring Daksha. After Harry's outburst, the Ministry quietly deflated Marge and changed her memory. Who repairs the damage in each story? Is anything lost when someone else does the repairing?",
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'Sati is a Devi, worshipped today, and her story is sacred. Harry is a fictional boy. We compare the dilemma, not the people.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b15',
      number: 15,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 62, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The joke at the family dinner.',
          setup:
            "At a big family gathering, an uncle makes fun of your older cousin's new partner, who comes from a different background. Everyone laughs, and your cousin goes quiet.",
          perspectives: [
            '"Say something now. Silence looks like agreement."',
            '"Talk to him privately later. People dig in when they\'re challenged in public."',
            '"Tell a parent and let an adult handle it."',
            '"Let it go this time. It\'s one evening, and family peace matters too."',
          ],
          ask: 'which of these would you be proud of tomorrow? Which would your cousin want?',
        },

      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n1-b16',
      number: 16,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'kailasa', // dawn arrives in the closing
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'Shiva warned Sati not to go. Why do you think she went anyway?',
        'If you started again somewhere new, what would you keep?',
      ],
      goDeeper: [
        'Daksha probably believed he was defending proper order. How can pride look like principle?',
        "Sati loved both her father's family and her husband, and they were against each other. Can you be loyal to two people who are against each other?",
        'Shiva destroyed the sacrifice, then restored Daksha. Which was harder? Can both have been right?',
        'Harry chose his house based on what other people told him. Is a choice fully yours if other people shaped it?',
      ],
      together: 'if someone in our family were mocked at a family gathering, what would we want each other to do?',
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: "the daughter of the mountain sets out to reach Shiva, who doesn't notice her at all.",
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'The heart of the night is a dilemma, not a moral: what do you do when family scorns someone you love?',
      "Tell Sati's death gently, and say aloud that it is not an example. Then go straight on to Shiva's grief, so that it reads as tragedy.",
      "Don't let the child equate Harry walking out with Sati leaving her body. The comparison is about the dilemma only.",
      "The story doesn't end in revenge: Daksha is restored and repents, and Sati begins again. Point this out.",
    ],
    sources: [
      {
        claim: "Daksha's feud and curse; Shiva's warning",
        source: 'Bhagavata Purana 4.2–4.3',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Sati's welcome, her speech, leaving her body by yogic fire",
        source: 'Bhagavata Purana 4.4',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Virabhadra; Daksha restored with a goat\'s head, and repenting',
        source: 'Bhagavata Purana 4.5–4.7',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Rebirth to Mena in the Himalayas',
        source: 'Bhagavata Purana 4.7.58–59; Shiva Purana, Rudra Samhita, Parvati Khanda ch. 5',
        label: 'Tradition',
        confidence: 'High (Bhagavata); medium (Shiva Purana chapter, from an index)',
      },
      {
        claim: "Shiva carrying Sati's body; Shakti Peethas",
        source: 'Devi Bhagavata Purana; Kalika Purana; regional tradition',
        label: 'Tradition (later texts)',
        confidence: 'Medium; versions vary',
      },
      {
        claim: 'Daksha forbidding the marriage',
        source: 'Popular tellings',
        label: 'Tradition (popular)',
        confidence: 'Labelled as such',
      },
      {
        claim: "Shailaputri's bull, trident, lotus and moon",
        source: 'Devotional iconography',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Meanings of the symbols; root chakra link',
        source: 'Devotional and yogic readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Uma Haimavati',
        source: 'Kena Upanishad 3.12–4.1',
        label: 'Tradition; the identification with Parvati is interpretation',
        confidence: 'High',
      },
      {
        claim: 'Ban on the practice of sati',
        source: 'Bengal Sati Regulation 1829; Commission of Sati (Prevention) Act 1987',
        label: 'Historical',
        confidence: 'High',
      },
      {
        claim: 'Aunt Marge scene',
        source: '*Prisoner of Azkaban* ch. 2; 2004 film',
        label: 'Hogwarts',
        confidence: 'High (book); film details to compare',
      },
      {
        claim: 'Marge deflated and her memory changed',
        source: '*Prisoner of Azkaban* ch. 3',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'The Sorting; Dumbledore on choices',
        source: "*Philosopher's Stone* ch. 7; *Chamber of Secrets* ch. 18; both films",
        label: 'Hogwarts',
        confidence: 'High (books); film wording may differ',
      },
      {
        claim: 'The Hat takes your choice into account',
        source: '*Deathly Hallows* epilogue',
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
      'Read it straight through, or use it alongside the app. It runs about 23 minutes with discussion, or about 15 as a short evening: on a short evening, skip the second scene (from "Now a second scene" to its activity) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 8 minutes)' },
      {
        kind: 'parent',
        text: "Before you start: these nights discuss the whole Harry Potter series, including its ending. Check that's fine for your child.",
      },
      {
        kind: 'read',
        text: 'Tonight is the first of nine nights. Navaratri means "nine nights", and on each one people worship the Devi, the great goddess, in a different form. Tonight she is Shailaputri, the daughter of the mountain.',
      },
      {
        kind: 'read',
        text: "We're going to tell her story the way the old texts tell it. Then we'll look at two moments from Harry Potter where someone faces a choice that's a bit like hers, and in many ways not like hers at all. Harry Potter is a story someone wrote; the Devi is worshipped by millions of people. So we're comparing choices, not saying anyone *is* anyone.",
      },
      { kind: 'parent', text: 'Pause: about 1 minute' },
      {
        kind: 'read',
        text: 'Long ago there was a great lord named Daksha, proud of his rank, his rituals and his rules. He had many daughters, and one of them, Sati, loved Shiva.',
      },
      {
        kind: 'read',
        text: 'Shiva was not the kind of son-in-law Daksha wanted. He lived on a mountain, smeared with ash, with snakes around his neck and wild spirits for company, and he cared nothing for wealth or rank. Daksha agreed to the marriage only because Brahma, the creator, asked him to. In his heart he never accepted Shiva.',
      },
      {
        kind: 'read',
        text: 'One day, at a great gathering, everyone stood up when Daksha walked in. Everyone except Brahma and Shiva. Daksha felt insulted. In front of everyone he spoke harshly about Shiva, and declared that Shiva should never again be given a share of the sacred offerings.',
      },
      {
        kind: 'read',
        text: "Some time later, Daksha held an enormous ceremony, a sacrifice, and invited every god there was, except Shiva. From her mountain home, Sati watched the wives of the gods flying past in their finest clothes on their way to her father's house. She missed her mother. She missed her sisters. She wanted to go home.",
      },
      {
        kind: 'read',
        text: "She asked Shiva to come with her. Surely, she said, a daughter doesn't need an invitation to her father's house. Shiva answered gently. You can visit family without an invitation, he said, but not someone who is angry with you. Hard words from family hurt more than an enemy's arrows. You won't be honoured there.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were Sati, what would you do? Go, stay, go and try to make peace, or send a message first?" Listen to the reasons.',
      },
      { kind: 'read', text: 'Sati went.' },
      {
        kind: 'read',
        text: "When she arrived, her mother and sisters ran to her with tears of joy. But her father didn't say a word to her. She looked around and saw that there was no share of the offering set aside for Shiva.",
      },
      {
        kind: 'read',
        text: "Shiva's attendants, who had come with her, wanted to attack Daksha. Sati stopped them. Then she stood in front of everyone and spoke. Shiva is a friend to every living being, she said, and has no enemies. You look for faults; he looks for good. She said she was ashamed that her body had come from such a father, and that she would not keep it.",
      },
      {
        kind: 'parent',
        text: 'For the parent: read the next part slowly and gently. Afterwards, say in your own words that this is a sacred story about a Devi, not something anyone should ever do, and that if anyone hurts or humiliates us, we tell someone we trust and get help. If your child asks about "sati" as a historical practice, explain that it is a different thing: it was banned in 1829 and again in 1987, and in the story Shiva was alive.',
      },
      {
        kind: 'read',
        text: 'Sati sat down, facing north. She closed her eyes and went into a meditation so deep that her whole mind rested on Shiva. Through the power of that meditation, a fire rose from within her, and she left her body. A great cry went up across all the worlds, and everyone who watched turned and looked at Daksha.',
      },
      { kind: 'parent', text: 'Pause: give a moment of quiet. Ask: "How are you feeling about that?" Then go on.' },
      {
        kind: 'read',
        text: "When Shiva heard, his grief became fury. He tore a lock of his hair and threw it down, and from it rose a terrible warrior, Virabhadra, who smashed Daksha's ceremony to pieces.",
      },
      {
        kind: 'read',
        text: "Later stories say Shiva lifted Sati's body in his arms and wandered the world, lost in grief. To bring him peace, Vishnu gently separated her body, piece by piece, and wherever a piece fell, a sacred place arose. People still travel to these places today.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "What do you think Shiva does with his grief? Punish Daksha, forgive him, go away alone, or hold on to Sati?"',
      },
      {
        kind: 'read',
        text: "The answer is all of them, in different tellings. In one of the oldest, the gods begged Shiva for mercy, and he relented. He restored the ceremony and brought Daksha back to life, though with a goat's head in place of his own. Daksha wept and asked Shiva to forgive him. Then Shiva went to the mountains and sat in silent meditation for a very long time.",
      },
      {
        kind: 'read',
        text: 'But that is not the end of Sati. In the Himalayas, the king of the mountains, Himavat, and his wife Mena prayed for a daughter, and Sati chose to be born again to them. She was Parvati, "she of the mountain", and tonight we call her Shailaputri, the daughter of the mountain. She is the same Devi, in a new family that honours the one she loves.',
      },
      {
        kind: 'read',
        text: "In pictures she rides a bull, which stands for steadiness. She holds a trident in one hand and a lotus in the other, and wears a crescent moon. A mountain doesn't move: tonight's form is about starting again from steady ground.",
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "Which part of the story will you remember?"' },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 10 minutes)' },
      {
        kind: 'read',
        text: "Tonight's word is rootedness. What you are rooted in can survive what you lose.",
      },
      {
        kind: 'read',
        text: 'The first form of the Devi is named for a relationship, not for something she did: she is the daughter of the mountain. The festival starts with where you stand before it asks what you’ll do. Sati loses her body, her family and her home. What survives is her devotion, which returns whole in Parvati, rooted in a new place. Devotees often link Shailaputri with the mountain’s steadiness. Our reading is that your roots are less about where you live or who you came from, and more about what you’re devoted to. That’s what carries you through change.',
      },
      {
        kind: 'read',
        text: 'Now, Hogwarts. This is from *Prisoner of Azkaban*, chapter two, "Aunt Marge\'s Big Mistake". It\'s near the start of the film too.',
      },
      {
        kind: 'read',
        text: "It's the summer Harry turns thirteen, and Uncle Vernon's sister Marge comes to stay for a week. Harry strikes a deal with Uncle Vernon: he'll behave and never mention magic, and Vernon will sign the form that lets him visit the wizarding village of Hogsmeade. All week Marge sneers at Harry, and he says nothing. On the last night, after a long dinner, she turns on his parents. She calls his father a jobless good-for-nothing and repeats the Dursleys' lie that his parents died drunk in a car crash. Harry's anger rises past the point he can hold it, and his magic escapes him: Marge swells up like a balloon and floats to the ceiling. Harry drags his trunk out into the dark street, certain he'll be expelled. The form is never signed.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what deal had Harry made, and what was he protecting by staying quiet?',
          'Feel: what was Harry feeling as Marge kept going? Where did it change?',
          "Wonder: why did Petunia say nothing, and why did Vernon join in? Marge was insulting Petunia's own sister.",
          "Stretch: Harry didn't decide to inflate her. Is he still responsible?",
          "Connect: how is Harry at that table like Sati at her father's ceremony, and how is he completely different?",
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "She deserved it", try: "Did she deserve it, or did Harry want it? Is that the same?" If they say "Sati and Harry both just got angry", try: "What did Sati do before she spoke?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Harry should have kept his temper: the deal mattered" or "Some insults have to be answered, whatever it costs". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. Freeze the moment Marge insults Harry\'s father. Each of you has 60 seconds to suggest one thing Harry could say or do that defends his parents and keeps his control. Then judge: which protects his parents best, and which protects Harry best?',
      },
      {
        kind: 'read',
        text: "One thing to hold on to: Harry walking out of the house is *not* like Sati leaving her body. What's similar is the dilemma of sitting at a table while someone you love is mocked. What happens next is completely different.",
      },
      {
        kind: 'read',
        text: "Now a second scene, from *Philosopher's Stone*, chapter seven, with a moment from the end of *Chamber of Secrets*. Both are in the films.",
      },
      {
        kind: 'read',
        text: "It's Harry's first night at Hogwarts, and the new students take turns putting on an old hat that decides their house. Hagrid has told Harry that every witch or wizard who went bad came from Slytherin, and in Diagon Alley he met Draco Malfoy, who was sure he'd be a Slytherin. The Hat sees courage, a good mind, talent and a hunger to prove himself, and says Slytherin could help him to greatness. Harry silently begs: not Slytherin. After a pause, the Hat calls out Gryffindor.",
      },
      {
        kind: 'read',
        text: "A year later, Harry worries that he belongs in Slytherin after all: he can talk to snakes, as Salazar Slytherin could. Dumbledore reminds him that the Hat put him in Gryffindor because he *asked* not to go to Slytherin. Our choices, Dumbledore says, show who we really are, far more than our abilities.",
      },
      {
        kind: 'read',
        text: 'Remember how Sati felt about being called "Daksha\'s daughter", and how she came back as the mountain\'s daughter? Both stories ask the same question: how much of who we are do we get to choose?',
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          "Notice: where did Harry's opinion of Slytherin come from?",
          'Wonder: was Harry choosing Gryffindor, or running away from Slytherin? Does it matter?',
          'Stretch: knowing about Snape, Regulus and Slughorn, was Harry fair to Slytherin?',
          'Turn it around: if the Hat had put him in Slytherin anyway, what about Harry would have stayed the same?',
          'Connect: what can we choose about who we are, and what can\'t we?',
        ],
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Who you are is mostly what you choose" or "Who you are is mostly what you were given".',
      },
      {
        kind: 'parent',
        text: "ACTIVITY: 2 minutes. You play the Hat and argue for 30 seconds that your child belongs in the house they'd least pick. They answer for 30 seconds. Then swap.",
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 5 minutes)' },
      {
        kind: 'read',
        text: "Let's put the two stories next to each other. There's no single right answer to any of these.",
      },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'Sati and Harry both sat through an elder insulting someone they loved. What was each trying to protect?',
          'Harry lost control; the story says Sati chose. Does it matter whether a response is chosen?',
          "After Harry's outburst, the Ministry quietly fixed Marge and changed her memory. After Shiva's fury, Shiva himself restored Daksha. Who repairs the damage in each story?",
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine a big family gathering. An uncle makes fun of your older cousin's new partner, who comes from a different background. Everyone laughs, and your cousin goes quiet.",
      },
      {
        kind: 'read',
        text: "Some people would say speak up now, because silence looks like agreement. Some would say talk to the uncle privately later, because people dig in when they're challenged in public. Some would tell a parent and let an adult handle it. And some would let it go this time, because family peace matters too.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "Which of these would you be proud of tomorrow? Which would your cousin want?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Shiva warned Sati not to go. Why do you think she went anyway?" and "Can you be loyal to two people who are against each other?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "If someone in our family were mocked at a family gathering, what would we want each other to do?"',
      },
      {
        kind: 'read',
        text: "Tonight's word is rootedness. What you are rooted in can survive what you lose.",
      },
      {
        kind: 'read',
        text: "And it ends with a beginning. The daughter of the mountain is born. Tomorrow she sets out to reach Shiva, who is sitting in meditation and doesn't notice her at all.",
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight.",
      },
    ],
    timing:
      'about 8 minutes for Part 1, 10 for Part 2 and 5 for Part 3, so about 23 minutes in all. A short evening takes about 15: one scene, two ladder questions, and no side by side.',
  },

  // The closing (Reflection.tsx draws it; Score.closing() plays it).
  closing: {
    seconds: 13,
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
