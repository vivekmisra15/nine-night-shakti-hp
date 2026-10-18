// Night 9: Siddhidatri, giver of perfection. The last night of the series.
//
// All text is copied from docs/nights/night-9.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-9.md.

import type { Night } from './types';

export const day9: Night = {
  number: 9,
  devi: 'Siddhidatri',
  title: 'Siddhidatri, giver of perfection',
  summary:
    "Night 9 takes about 25 minutes, or about 16 as a short evening. Its question: what is the right way to hold power, and is the best way sometimes to put it down? The night tells of Siddhidatri, who gives perfection away, of Shiva who becomes half Devi, and of two seekers who ask the Devi for very different gifts. Then come two Harry Potter scenes: Harry laying down the Elder Wand, and the Mirror that gives the Stone only to someone who doesn't want to use it. The night closes the series with a look back across all nine nights, and ends with Vijayadashami.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: "gentle. The Elder Wand scene comes straight after the Battle of Hogwarts and Harry's walk into the forest. Read the parent note in Beat 10 before you begin.",
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: 'the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, the Elder Wand with its Think it through (choose two of the six ladder questions; keep the activity), the look-back (light the diyas and pick one thread; no activity), and Reflect. It leaves out the choice questions, the Mirror and the Stone and its Think it through, and Side by side.',
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
    {
      lead: 'Bring',
      text: "nine diyas or candles (or the app's nine-diya map) for Beat 15.",
    },
  ],

  // The short evening leaves out the Mirror and the Stone, its Think it
  // through, and Side by side. (Every choice's question, and the look-back
  // activity, are left out on a short evening anyway.)
  shortEveningLeavesOut: ['n9-b12', 'n9-b13', 'n9-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n9-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'n9siddhiLotus',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 56, layers: ['drone', 'motif'] },
      },
      points: [
        {
          lead: 'Last night (recap)',
          text: "Night 8 was about renewal after long effort. Parvati came out of her tapas shining as Mahagauri, and we followed Kreacher's change and Ron finding his way back to his friends.",
        },
        {
          lead: "Tonight's form (tradition)",
          text: 'tonight is the ninth night, Mahanavami. The Devi is worshipped as Siddhidatri: *siddhi*, perfection or accomplishment, and *datri*, the one who gives. Tomorrow is Vijayadashami, the day of victory, which ends the festival.',
        },
        {
          lead: 'Contemporary',
          text: 'if you have used the modern frame of the nine nights as nine steps of growth, tonight is the last step. Many people read it as completion: not having everything, but knowing what to do with what you have.',
        },
        {
          lead: 'The traditional story',
          text: 'Siddhidatri has no long story of her own in the Puranas. What is told about her comes mainly from devotional tradition, and this beat says so.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b2',
      sourceRows: [0, 1, 2, 7],
      number: 2,
      type: 'story',
      title: 'The giver of perfection',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n9siddhiLotus',
        camera: 'crane',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [3], // the gathering around her
      },
      paragraphs: [
        "In Navaratri worship, Siddhidatri sits on a full-blown lotus, or in some images rides a lion. She has four arms and holds a discus, a conch, a mace and a lotus. Around her, in many pictures, are gods, sages, celestial musicians, siddhas, and even asuras, the gods' old enemies. All of them come to her, because she gives *siddhis*.",
        'A siddhi is a perfection, a power that comes from deep spiritual practice. The Bhagavata Purana (11.15.3–5) says there are eighteen, eight of them chief. Popular lists of the eight vary a little. They include becoming as small as an atom, becoming vast, becoming weightless, reaching anything anywhere, having any wish fulfilled, and mastery over nature.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation unless marked:',
      hotspots: [
        {
          id: 'lotusSeat',
          symbol: 'Lotus seat',
          meaning:
            'Purity and full flowering: the journey of nine nights has bloomed. (Tradition: the lotus seat; interpretation: its meaning.)',
          label: 'interpretation',
        },
        {
          id: 'discus',
          symbol: 'Discus (chakra)',
          meaning: 'Order and time turning; often read as the mind made steady.',
          label: 'interpretation',
        },
        {
          id: 'conch',
          symbol: 'Conch (shankha)',
          meaning: 'The first sound; a call that announces victory and drives away fear.',
          label: 'interpretation',
        },
        {
          id: 'mace',
          symbol: 'Mace (gada)',
          meaning: 'Strength, and the power to hold firm.',
          label: 'interpretation',
        },
        {
          id: 'lotus',
          symbol: 'Lotus in her hand',
          meaning: 'Some traditions say the eight siddhis rest within it: power held gently, like a flower.',
          label: 'interpretation',
        },
        {
          id: 'worshippers',
          symbol: 'Worshippers of every kind',
          meaning:
            'Gods and asuras alike come to her. Her gifts are not only for the "right" side, which raises the question of what people do with them.',
          label: 'interpretation',
        },
        {
          // The yogic interpretation, shown as the last of the symbols (step 2.2).
          id: 'crown',
          symbol: 'Interpretation (yogic)',
          meaning:
            'some devotional writers link the ninth night with the Sahasrara, the crown chakra, so the journey that began at the root on Night 1 ends at the crown. This is a modern devotional mapping, not a text, and accounts vary.',
          label: 'interpretation',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b3',
      sourceRows: [3, 4, 5],
      number: 3,
      type: 'choice',
      title: 'Eight gifts',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n9siddhiLotus',
        camera: 'still',
        music: { palette: 'indian', raga: 'bhupali', bpm: 56, layers: ['drone', 'motif'] },
      },
      setup:
        'imagine Siddhidatri offers you the eight siddhis. You could make yourself tiny or vast, weightless, reach anything, have any wish come true.',
      ask: 'what would you do with them?',
      options: [
        {
          text: 'Take them all and use them',
          acknowledgement: "Honest. Most people would. The question is what you'd use them for.",
        },
        {
          text: 'Take one, and choose it carefully',
          acknowledgement: "Choosing one means knowing what you really need. That's harder than it sounds.",
        },
        {
          text: 'Take them, but promise never to use them',
          acknowledgement: 'Holding power without using it is a real choice. Later tonight, Harry does something like it.',
        },
        {
          text: 'Say no, thank you',
          acknowledgement: 'Turning down a gift from a Devi takes nerve. Some old teachers would agree with you.',
        },
      ],
      whatHappens:
        "the traditions don't agree, and that's interesting. In devotional tradition, Shiva himself worshipped the Devi and received the siddhis (Beat 4). In the Bhagavata Purana, Krishna tells his friend Uddhava that wise devotees call these powers obstacles and a waste of time for anyone seeking the highest goal (BP 11.15.33). The Yoga Sutras of Patanjali say much the same: the powers are achievements to the outward-facing mind, and obstacles to the deepest meditation (Yoga Sutra 3.37; some editions number it 3.38). So the giver of powers is worshipped in a tradition that also warns about wanting them.",
    },

    // -----------------------------------------------------------------------
    // Beat 4 is two screens (steps 4.1 and 4.2): two tellings.
    {
      id: 'n9-b4a',
      sourceRows: [5],
      number: 4,
      type: 'story',
      title: 'Half of Shiva',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 4,
        palette: 'n9ardhanari',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [2], // one being
      },
      intro: 'Devotional tradition (popular, not Puranic)',
      paragraphs: [
        'Shiva worshipped the supreme Devi and, through her grace, received the siddhis. By her grace too, half of his body became hers. He became Ardhanarishvara, "the lord who is half woman": one half Shiva, one half Shakti, in a single form. Many modern accounts say only that she is "believed to" have given him the siddhis. No Purana tells this story about Siddhidatri by name.',
      ],
    },
    {
      id: 'n9-b4b',
      sourceRows: [6],
      number: 4,
      type: 'story',
      title: 'Half of Shiva',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 4,
        palette: 'n9ardhanari',
        camera: 'orbit',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif', 'strings'] },
      },
      intro: 'Shiva Purana (Shatarudra Samhita, ch. 3)',
      paragraphs: [
        "an older story tells of Ardhanarishvara without naming Siddhidatri. Brahma, the creator, found that his creation would not grow. He did tapas, meditating on Shiva joined with Shakti, and Shiva appeared to him as Ardhanarishvara, half male and half female. Brahma asked the Devi for the power to bring the female half of creation into being, and asked her to be born as the daughter of his son, Daksha. She granted it. Then she merged back into Shiva's body.",
        "So that is where our first night began. The Devi born as Daksha's daughter is Sati. Nine nights ago we met her in her father's house.",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b5',
      sourceRows: [8, 9],
      number: 5,
      type: 'story',
      title: 'Two seekers by the river',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n9riverbank',
        camera: 'drift',
        music: { palette: 'indian', raga: 'bageshri', bpm: 58, layers: ['drone', 'motif', 'percussion'] },
        slowMo: { line: 10, seconds: 4 }, // the Devi appears over the water
      },
      intro: 'The Devi Mahatmya has been in the background since Night 3, so tonight we finish it.',
      paragraphs: [
        'The whole Devi Mahatmya is a story told to two people. The first was King Suratha, who lost his kingdom to enemies; even his own ministers turned against him. He rode into the forest alone. There he met Samadhi, a merchant whose wife and sons had taken his wealth and thrown him out. The strange thing, they agreed, was that they both still worried about the people who had wronged them. They asked the sage Medhas why. In answer, Medhas told them the stories of the Devi, the battles we heard on earlier nights, which tradition links with Katyayani, Kalaratri and her other forms (Devi Mahatmya ch. 1–12).',
        'When he finished, the king and the merchant went to a sandbank by a river. They made an image of the Devi out of earth. For three years they worshipped her with flowers, incense, fire and water, eating little and keeping their minds steady (DM 13.9–12). At last the Devi appeared and said: ask me for anything.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b6',
      sourceRows: [9],
      number: 6,
      type: 'choice',
      title: 'What would you ask for?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n9riverbank',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 56, layers: ['drone'] },
      },
      setup:
        "you are Suratha, or Samadhi. You have lost everything that mattered to you, through other people's greed and betrayal. The Devi offers you one gift.",
      ask: 'what would you ask for?',
      options: [
        {
          text: 'My kingdom (or my wealth) back',
          acknowledgement:
            "It was taken unfairly. Asking for what's rightfully yours isn't greedy. That's close to Suratha's answer.",
        },
        {
          text: 'Make the people who betrayed me pay',
          acknowledgement: 'Justice and revenge can feel the same from the inside. Would you be able to tell them apart?',
        },
        {
          text: 'To stop caring about what I lost',
          acknowledgement: "Freedom from the hurt itself. That's close to Samadhi's answer.",
        },
        {
          text: 'Something for someone else',
          acknowledgement: 'Generous. Notice that the Devi asked what *you* wanted.',
        },
        {
          text: 'Nothing: seeing her is enough',
          acknowledgement: 'Some devotional traditions honour exactly this answer.',
        },
      ],
      // No "what happens": Beat 7 is the answer.
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b7',
      sourceRows: [9],
      number: 7,
      type: 'story',
      title: 'What the Devi gave',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 6, // the night's peak, never above mf
        palette: 'n9riverbank', // warming to n9siddhiLotus
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'bhupali', bpm: 62, layers: ['drone', 'motif', 'strings', 'resolution'] },
        freezeAfterLine: [9], // hold before the "Notice" line
      },
      paragraphs: [
        'Suratha asked for his own kingdom in this life, with his enemies\' power broken, and a kingdom he could never lose in lives to come (DM 13.17). Samadhi had lost just as much. But he did not ask for his wealth. He asked for the knowledge that would free him from the feeling of "mine" and "I" (DM 13.18).',
        'The Devi gave both of them what they asked. Within a few days Suratha would win back his kingdom and keep it. After this life he would be born as Savarni, a Manu, one of the great ancestors of humankind. Samadhi would receive the knowledge he asked for, which leads to freedom (DM 13.20–25). Then she vanished. And that is how the Devi Mahatmya ends.',
        '**Notice:** the Devi did not judge either wish. One asked for power and one asked to be free of wanting, and both were answered.',
      ],
    },

    // -----------------------------------------------------------------------
    // Beat 8 is four screens (steps 8.1–8.4).
    {
      id: 'n9-b8a',
      sourceRows: [10],
      number: 8,
      type: 'story',
      title: 'The tenth day',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 4,
        palette: 'n9vijayaDawn',
        camera: 'pan',
        music: { palette: 'indian', raga: 'bhairav', bpm: 60, layers: ['drone', 'motif', 'percussion'] },
      },
      paragraphs: [
        'Tomorrow is Vijayadashami: *vijaya*, victory, and *dashami*, the tenth day, in the bright half of the month of Ashvin. It celebrates victory, and different stories are remembered in different places.',
        "**Tradition:** the Devi's victory over Mahishasura (Devi Mahatmya ch. 2–3, Night 6). **Popular tradition** also places Rama's victory over Ravana on this day, and the day Arjuna took back the weapons the Pandavas had hidden in a shami tree during their exile.",
      ],
    },
    {
      id: 'n9-b8b',
      sourceRows: [11, 12],
      number: 8,
      type: 'story',
      title: 'The tenth day',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 4,
        palette: 'n9vijayaDawn',
        camera: 'pan',
        music: { palette: 'indian', raga: 'bhairav', bpm: 60, layers: ['drone', 'motif', 'percussion'] },
      },
      paragraphs: [
        '**North India (regional):** the Ramlila plays end, and huge effigies of Ravana and his brother and son, Kumbhakarna and Meghnad, are burned.',
        "**Bengal (regional):** Bijoya Dashami ends Durga Puja. Popular Bengali tradition says Durga visits her parents' home with her children each autumn and now returns to Shiva. Her images are carried to the river and immersed, married women smear each other with sindoor, and people exchange Bijoya greetings. (Compare Night 1: a daughter's visit home, this time with a welcome.)",
      ],
    },
    {
      id: 'n9-b8c',
      sourceRows: [11, 13, 14],
      number: 8,
      type: 'story',
      title: 'The tenth day',
      label: 'tradition',
      minutes: 0.5,
      direction: {
        intensity: 4,
        palette: 'n9vijayaDawn',
        camera: 'pan',
        music: { palette: 'indian', raga: 'bhairav', bpm: 60, layers: ['drone', 'motif', 'percussion'] },
      },
      paragraphs: [
        '**Kerala (regional):** Vidyarambham. Small children write their first letters, often in rice or sand, to begin learning on this day.',
        '**Karnataka (regional):** Mysuru Dasara, with a great procession and the palace lit up. Families keep displays of dolls (gombe) through the festival.',
        '**Maharashtra (regional):** people exchange apta leaves as "gold".',
        "**Himachal Pradesh (regional):** Kullu Dussehra begins, with processions of deities from the valley's villages.",
      ],
      didYouKnow: {
        lead: 'Did you know? (regional tradition)',
        text: 'in much of South India, Ayudha Puja falls tonight, on the ninth day, not tomorrow. People honour the tools of their work: books, pens, musical instruments, machines, vehicles, and now laptops and phones. In many homes, books rest before the Devi overnight and nobody studies until they are taken up again on Vijayadashami.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b9',
      number: 9,
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
        word: 'Wholeness',
        idea: 'You are whole when you know you are part of the whole.',
        description:
          'Siddhidatri is the giver of siddhis, perfected powers, and many images show gods and sages bowing to her. In a devotional account, even Shiva received his powers through her and became Ardhanarishvara, half Shiva and half Shakti: one whole. Yet the tradition keeps saying powers are not the goal. The Yoga Sutras warn they can become obstacles, and the Devi Mahatmya calls the Goddess “the cause of liberation”. The deepest gift of the ninth night is a discovery, not a power. In the Devi Gita, the Goddess teaches that the self in every being is one with the infinite, and that knowing this sets you free. An old image for it is a wave discovering it was always the ocean. After eight nights of rootedness, resolve, readiness, creation, nurture, courage, fearlessness and renewal, the journey ends there: not with becoming stronger, but with no longer feeling separate.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b10',
      sourceRows: [15, 16, 17, 18, 19],
      number: 10,
      type: 'sceneIntro',
      title: 'The Elder Wand',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n9kingsCross', // changing to greatHall
        camera: 'drift',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 4, seconds: 3 }, // the mending
        freezeAfterLine: [4],
      },
      // The bell pulses at the start of the beat, and again before the first
      // sentence of the retelling (Harry lets Voldemort's curse hit him).
      parentNoteAgainAtLine: 0,
      parentNote: [
        'This scene comes right after the Battle of Hogwarts. Fred, Lupin and Tonks have died, and Harry has just walked into the forest expecting to die.',
        "The retelling doesn't dwell on any of this. If your child wants to talk about the deaths, give that space first. The rest of the night can wait.",
        'Harry\'s "death and return" is our comparison point only. It is not hidden Hindu theology, and the author did not intend a parallel with the Devi.',
      ],
      reference:
        'Harry. *Deathly Hallows*, chapter 35, "King\'s Cross", and the end of chapter 36, "The Flaw in the Plan". Film: *Deathly Hallows Part 2* (2011), the closing scenes before the epilogue.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "in the book, Harry uses the Elder Wand once, to mend his own broken wand, and decides to put it back in Dumbledore's tomb. In the film, standing on a bridge at Hogwarts with Ron and Hermione, he snaps the Elder Wand in two and throws the pieces away. The film does not show him mending his old wand *(to check)*. The film's King's Cross scene is much shorter, and Dumbledore's words about power come from the book *(to check that the film leaves them out)*. Keeping a power asleep and destroying it are two different ways of giving it up, and the difference is worth discussing.",
      retelling: [
        "Harry lets Voldemort's curse hit him, and wakes in a bright, misty place like King's Cross, where Dumbledore is waiting. Dumbledore confesses that as a young man he hungered for power, and it led him into terrible mistakes; later he refused to be Minister for Magic, knowing he couldn't be trusted with power. Perhaps, he says, those best suited to power never went looking for it, like Harry. Harry goes back, the battle ends, and the Elder Wand, the most powerful wand ever made, is his: he won it almost by accident, by disarming Draco Malfoy. In the headmaster's office, he mends his own broken wand with one touch of it. Then he decides to put the Elder Wand back in Dumbledore's tomb, so that if he dies undefeated, its power will end with him. Ron thinks he's mad. Harry says it's more trouble than it's worth.",
      ],
      connection: {
        similar:
          "Harry is offered the greatest power in his world, and chooses to use it only once, to repair something small and his own. The traditions behind Siddhidatri also warn that powers can distract from what matters (BP 11.15.33). Dumbledore's confession sounds a little like Samadhi's wish: freedom from wanting.",
        different: [
          'Siddhidatri is the *source* of power and gives it away. Harry holds a power for a moment and lays it down.',
          "The Elder Wand has a bloody history: in the story, people killed to own it. Siddhidatri's gifts are not won by defeating anyone.",
          "The siddhis are understood in Hindu tradition as fruits of spiritual practice. Harry's wand is a magical object won in a war.",
          'The Devi gave Suratha the power he wanted, without blame. Dumbledore suggests that wanting power is itself a warning sign. The two stories disagree here.',
          'In the book Harry keeps the power asleep; in the film he destroys it.',
        ],
        whyItHelps:
          'it turns "the right relationship with power" into a choice a pre-teen can picture: what would you do if you were handed the strongest thing in the world?',
        strength: { rating: 'strong', text: 'The decision matches closely. The source of the power and its history do not.' },
        themeLink:
          "Harry could stand above everyone as master of the most powerful wand ever made, and he chooses not to. He mends his own ordinary wand and goes back to being one among his friends. That is not the theme's discovery that the self is one with the infinite, but it points the same way: he chooses belonging over standing apart.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b11',
      sourceRows: [15, 16, 18],
      number: 11,
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
        { step: 'Notice', question: 'what did Harry use the Elder Wand for, the one time he used it?' },
        { step: 'Feel', question: 'Ron was disappointed. How do you think Harry felt, holding it?' },
        { step: 'Wonder', question: 'why do you think Dumbledore told Harry about his own hunger for power, right then?' },
        {
          step: 'Stretch',
          question: "in the book Harry keeps the wand's power asleep in a tomb; in the film he breaks it. Which is wiser, and why?",
        },
        {
          step: 'Turn it around',
          question: "tell it from Ron's side. Is there a good argument for keeping the most powerful wand in the world?",
        },
        {
          step: 'Connect',
          question:
            'Suratha asked for power and got it; Samadhi asked to be free of wanting. Which one is Harry more like here, and is he like either?',
        },
      ],
      followUps: [
        {
          ifTheySay: "He should have kept it, he's the good guy",
          tryAsking: 'Would it stay safe with him forever? Who comes after Harry?',
        },
        {
          ifTheySay: 'Breaking it is better, then nobody can have it',
          tryAsking: 'Is destroying a power always better than leaving it unused? What about Siddhidatri, who keeps giving it?',
        },
        {
          ifTheySay: "Harry didn't want power",
          tryAsking: "He wanted to be an Auror and lead in the battle. What kind of power didn't he want?",
        },
        {
          ifTheySay: 'So wanting power is bad',
          tryAsking: 'Then why did the Devi give Suratha his kingdom without telling him off?',
        },
      ],
      stance: {
        left: 'The safest power is power nobody holds',
        right: 'Power should be held by good people, not given up',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'the wand on the desk',
        minutes: 3,
        text: "Freeze the moment the Elder Wand lies on the headmaster's desk. One person has 60 seconds to argue for the book's choice (put it back in the tomb), the other for the film's (break it). Then 60 seconds together: invent a third choice Harry didn't take, and decide whether it's better or worse than his.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b12',
      sourceRows: [20, 21],
      number: 12,
      type: 'sceneIntro',
      title: 'The Mirror and the Stone',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n9mirrorChamber',
        camera: 'pushIn',
        music: { palette: 'hogwarts', bpm: 58, layers: ['drone', 'motif'] },
        slowMo: { line: 5, seconds: 3 }, // the Stone drops into Harry's pocket
        freezeAfterLine: [5],
      },
      reference:
        'Harry. *Philosopher\'s Stone*, chapter 12, "The Mirror of Erised", and chapter 17, "The Man with Two Faces". Film: *Philosopher\'s Stone* (2001), the Mirror scene at Christmas, the final chamber, and the hospital wing. The film keeps Dumbledore\'s explanation of the Mirror\'s rule.',
      findScene: {
        lead: 'Find the scenes',
        text: 'there are no links. Find them yourselves in your own copies of the books or films, using the references above.',
      },
      retelling: [
        "At Christmas in his first year, Harry finds an old mirror, sees his parents behind him, and goes back night after night. Dumbledore tells him the Mirror shows your heart's deepest wish, and that he shouldn't look for it again: people have wasted their lives in front of it. Later, beyond the trapdoor, Harry finds the same Mirror, with Professor Quirrell in front of it. Quirrell has learned from Voldemort that there is no good or evil, only power, and people too weak to seek it. He sees himself handing the Stone to his master but can't get it out, so he makes Harry look. Harry's reflection pockets the Stone and winks, and something heavy drops into Harry's real pocket. Dumbledore later explains that only someone who wanted to *find* the Stone, but not *use* it, could take it. The Stone is then destroyed, with its maker Nicolas Flamel's agreement, though without it he and his wife will one day die.",
      ],
      connection: {
        similar:
          'the Mirror gives its treasure only to someone who isn\'t trying to gain from it. Samadhi asked not for his wealth but for freedom from wanting. And the Bhagavata warns that powers are a distraction for anyone who seeks them for themselves.',
        different: [
          "Harry didn't *choose* not to want the Stone. He was eleven and trying to stop a thief. Samadhi's wish came from long reflection and three years of worship.",
          'The Mirror is a trap designed by a person. Siddhidatri gives freely, to gods and asuras alike.',
          'In the Devi Mahatmya, Suratha *wants* power and receives it. In the Mirror\'s rule, wanting to use the Stone shuts you out. The stories disagree.',
          "Quirrell's belief, that there is only power, is the opposite of both stories. Notice that neither story agrees with him.",
        ],
        whyItHelps:
          "it asks whether the people who should hold power are the ones who don't want it, and whether that's fair to people who do.",
        strength: { rating: 'partial to strong', text: 'The idea matches well; Harry\'s "choice" is more innocence than decision.' },
        themeLink:
          'what Harry sees in the Mirror is not power or gold but his family around him: his deepest wish is not to be alone. The theme ends with "no longer feeling separate"; Harry\'s longing is a small, human version of that wish, though nothing in the scene suggests the oneness the theme describes.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b13',
      sourceRows: [20, 21],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2,
      direction: {
        intensity: 1,
        palette: 'n9mirrorChamber',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Quirrell see in the Mirror, and what did Harry see?' },
        { step: 'Feel', question: 'at Christmas Harry saw his family. How might it feel to be told to stop looking?' },
        {
          step: 'Wonder',
          question: "Dumbledore says the Mirror shows your heart's desire. Why could Harry see himself *finding* the Stone, but not using it?",
        },
        {
          step: 'Stretch',
          question: 'Nicolas Flamel agreed to destroy the Stone, knowing he would die without it. Is that giving up power, or something else?',
        },
        {
          step: 'Turn it around',
          question: 'tell it from Quirrell\'s side. Is there anything true in "only power, and those too weak to seek it"?',
        },
        {
          step: 'Connect',
          question: 'Siddhidatri gives to everyone who comes to her. The Mirror gives only to those who don\'t want to use it. Which seems fairer?',
        },
      ],
      followUps: [
        { ifTheySay: 'Harry was just pure', tryAsking: 'Or was he just eleven? Would the Mirror still work for him at seventeen?' },
        {
          ifTheySay: "People who want power shouldn't get it",
          tryAsking: 'What about someone who wants to be class captain to make things fairer?',
        },
        {
          ifTheySay: "Quirrell is evil, so he's wrong",
          tryAsking: 'Can a bad person say something partly true? Which part?',
        },
        {
          ifTheySay: "It's the same as Samadhi",
          tryAsking: 'Samadhi chose to let go after losing everything. Did Harry let go of anything?',
        },
      ],
      stance: {
        left: "The people who should hold power are the ones who don't want it",
        right: 'Wanting to lead is fine, if you know why you want it',
      },
      activity: {
        title: 'the Mirror test',
        minutes: 2,
        text: "Each person has 30 seconds to name something they'd love to have, and 30 seconds to say honestly whether they'd want to *find* it or to *use* it. Then swap. Could either of you get it out of the Mirror?",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b14',
      sourceRows: [3, 9, 14],
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
        'Siddhidatri gives power away; Harry gives the Elder Wand up. Is giving away the same as giving up?',
        'The Devi gave Suratha the kingdom he wanted. The Mirror shuts out anyone who wants to use the Stone. Is wanting power wrong, or does it depend on why?',
        "Book Harry keeps the wand's power asleep; film Harry breaks it. The Bhagavata calls the siddhis a distraction, yet Siddhidatri is still worshipped as their giver. What do you do with a power that is dangerous but also good?",
        'Harry used the Elder Wand to mend his own old wand. Tonight, many families honour their own tools in Ayudha Puja. Why might the ordinary tool matter more than the powerful one?',
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'Siddhidatri is worshipped as the giver of power itself, and her story is sacred. Harry is a fictional boy who won a wand almost by accident. We compare the choice about power, not the people.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b15',
      number: 15,
      type: 'lookBack',
      title: 'Nine nights, looking back',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 4,
        palette: 'n9siddhiLotus',
        camera: 'crane',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'strings'] },
      },
      diyasIntro:
        "Light one diya for each night as you name it and its theme, or light them on the app's map. Read each line; don't re-teach it.",
      nights: [
        { night: 1, devi: 'Shailaputri', word: 'Rootedness', idea: 'What you are rooted in can survive what you lose.' },
        { night: 2, devi: 'Brahmacharini', word: 'Resolve', idea: 'What you practise, day after day, changes who you are.' },
        { night: 3, devi: 'Chandraghanta', word: 'Readiness', idea: 'Strength can protect just by being ready.' },
        { night: 4, devi: 'Kushmanda', word: 'Creation', idea: 'What you make carries something of why you made it.' },
        { night: 5, devi: 'Skandamata', word: 'Nurture', idea: 'True care helps someone grow strong enough to go their own way.' },
        { night: 6, devi: 'Katyayani', word: 'Courage', idea: 'When something is wrong, stand up to it, and stand together.' },
        { night: 7, devi: 'Kalaratri', word: 'Fearlessness', idea: 'Face the dark without becoming part of it.' },
        { night: 8, devi: 'Mahagauri', word: 'Renewal', idea: 'After a hard time, you can begin again, clearer than before.' },
        { night: 9, devi: 'Siddhidatri', word: 'Wholeness', idea: 'You are whole when you know you are part of the whole.' },
      ],
      threadsIntro: 'Pick two:',
      threads: [
        {
          lead: 'Choice versus what you were given (Nights 1 and 9)',
          text: 'Sati didn\'t want to be "Daksha\'s daughter". Harry chose his house, and later chose to put down the Elder Wand. Are you who your family made you, or who you choose to be?',
        },
        {
          lead: 'The cost of protection (Nights 3, 5 and 7)',
          text: 'what does protecting someone cost the protector, and the protected?',
        },
        {
          lead: 'Fierce and gentle together (Nights 3, 7 and 8)',
          text: 'which night showed this best to you?',
        },
        {
          lead: 'Anger and justice (Nights 1 and 6)',
          text: 'when does anger become useful, and when does it destroy?',
        },
        {
          lead: 'The right use of power (Nights 6 and 9)',
          text: 'who should hold power, and how?',
        },
        {
          lead: 'Renewal and second chances (Nights 1 and 8)',
          text: 'Daksha was restored; Kreacher changed; Ron came back. Voldemort was offered the chance and refused it.',
        },
      ],
      honesty:
        "we said on Night 4 that its comparison was speculative, and on Night 1 that Sati's act has no Harry Potter parallel. Were there other nights where the comparison felt forced to you?",
      activity: {
        title: 'defend a night',
        minutes: 3,
        text: 'Each person picks the night whose comparison they think was *strongest* and the one they think was *weakest*. Take 60 seconds each to defend your picks. Then 60 seconds together: is there one night where you both changed your minds about something?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b16',
      number: 16,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The admin button.',
          setup:
            "You're an admin of your class group chat. One person keeps posting things that upset others. You could remove them with one tap.",
          perspectives: [
            '"Remove them. That\'s what admins are for."',
            '"Message them privately first. Everyone deserves a warning."',
            '"Ask the group. It\'s not my chat alone."',
            '"Hand admin to someone else. I don\'t want to be the one who decides."',
            '"Leave it. If I remove them, I become the bad guy."',
          ],
          ask: 'does having the button make it your job to use it?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n9-b17',
      number: 17,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'reflective', // the sky begins to pale at the theme (17.2)
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'If Siddhidatri offered you one gift, what would you ask for now, after nine nights?',
        'Was Harry right to give up the Elder Wand?',
      ],
      goDeeper: [
        'Suratha asked for power and Samadhi asked to be free of wanting. Both were answered. Is one wish better than the other?',
        'Dumbledore said people who seek power are often unsuited to it. But someone has to lead. How should a person who *wants* to lead check themselves?',
        "The Elder Wand was won through violence; Siddhidatri's gifts aren't won from anyone. Does where a power comes from change how you should hold it?",
        'Across nine nights, we kept finding that the Devi stories and Harry Potter *disagree*. Which disagreement taught you the most?',
      ],
      together: 'what is one thing we want to carry from these nine nights into the rest of the year?',
      privateNote: 'one thing I want to remember from these nine nights is…',
      // The end of the series, in place of "Tomorrow".
      tomorrow: 'tomorrow is Vijayadashami, the day of victory, and the end of the nine nights.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'The heart of the night is a question, not a moral: what is power for, and when is putting it down the right choice?',
      'Be clear that the Siddhidatri story itself is devotional tradition, not Puranic. The Shiva Purana and Devi Mahatmya stories around it are textual, and the beats label which is which.',
      'Don\'t let "good people don\'t want power" become the lesson. The Devi gives Suratha his kingdom without blame. The stories disagree, and that is the point.',
      'Leave time for the look-back. It matters more than finishing every question tonight.',
    ],
    sources: [
      {
        claim: "Siddhidatri's name, ninth-night worship, four arms with discus, conch, mace and lotus, lotus or lion seat, worshipped by gods and asuras",
        source: 'Devotional iconography; Wikipedia "Siddhidhatri"',
        label: 'Tradition',
        confidence: 'High',
      },
      { claim: 'Eighteen siddhis, eight chief', source: 'Bhagavata Purana 11.15.3–5', label: 'Tradition', confidence: 'High' },
      {
        claim: 'Popular list of eight (anima, mahima, garima, laghima, prapti, prakamya, ishitva, vashitva)',
        source: "Common devotional lists; the Bhagavata's eighth differs",
        label: 'Tradition',
        confidence: 'High that lists vary',
      },
      { claim: 'Siddhis as obstacles for the devotee', source: 'Bhagavata Purana 11.15.33', label: 'Tradition', confidence: 'High' },
      {
        claim: 'Powers as obstacles to samadhi',
        source: 'Yoga Sutra 3.37 (3.38 in some numberings)',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Shiva received the siddhis from the Devi and became Ardhanarishvara',
        source: 'Popular devotional accounts; sometimes attributed to the Devi Purana *(to check)*',
        label: 'Tradition (devotional, not Puranic)',
        confidence: 'Medium; hedged even in modern sources',
      },
      {
        claim: "Brahma's tapas; Shiva as Ardhanarishvara; the Devi born as Daksha's daughter, then merging back into Shiva",
        source: 'Shiva Purana, Shatarudra Samhita ch. 3 (section naming differs between editions)',
        label: 'Tradition',
        confidence: 'Medium to high',
      },
      {
        claim: 'Sahasrara (crown chakra) link',
        source: 'Modern devotional writing',
        label: 'Interpretation',
        confidence: 'Low; one source, labelled as such',
      },
      {
        claim: 'Suratha and Samadhi lose everything; Medhas tells them the Devi stories',
        source: 'Devi Mahatmya ch. 1',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Three years' worship of an earthen image by a river; the two wishes; the boons; Suratha as Savarni Manu",
        source: 'Devi Mahatmya 13.9–25',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Vijayadashami: name; the Devi's and Rama's victories; Arjuna and the shami tree",
        source: 'Wikipedia "Vijayadashami"; Devi Mahatmya ch. 2–3; the date link for Rama and Arjuna is popular tradition',
        label: 'Tradition (popular)',
        confidence: 'High',
      },
      {
        claim: 'Ravana effigies, Bijoya Dashami and immersion, Mysuru Dasara, apta leaves, Kullu Dussehra',
        source: 'Regional practice',
        label: 'Tradition (regional)',
        confidence: 'High',
      },
      {
        claim: "Durga's visit to her parents' home in Bengali tradition",
        source: 'Popular Bengali tradition',
        label: 'Tradition (regional)',
        confidence: 'Medium to high',
      },
      { claim: 'Vidyarambham on Vijayadashami', source: 'Kerala practice', label: 'Tradition (regional)', confidence: 'High' },
      {
        claim: 'Ayudha Puja on the ninth day (Mahanavami), not the tenth',
        source: 'Wikipedia "Ayudha Puja"; regional practice',
        label: 'Tradition (regional)',
        confidence: 'High; this corrects the plan',
      },
      {
        claim: "Dumbledore's confession; refusing the Ministry; power best held by those who didn't seek it",
        source: '*Deathly Hallows* ch. 35',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Harry mends his wand, plans to return the Elder Wand to the tomb; Stone left in the forest; Ron's reaction",
        source: '*Deathly Hallows* ch. 36',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Harry became the wand's master by disarming Draco",
        source: '*Deathly Hallows* ch. 36',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Film: Harry snaps the Elder Wand on a bridge and throws it away',
        source: '*Deathly Hallows Part 2* (2011)',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Film does not show Harry mending his own wand; film's King's Cross omits the power line",
        source: '*Deathly Hallows Part 2*',
        label: 'Hogwarts',
        confidence: 'Medium *(to check)*',
      },
      {
        claim: "The Mirror of Erised at Christmas; Dumbledore's warning",
        source: "*Philosopher's Stone* ch. 12; 2001 film",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Quirrell's \"only power\" belief; the Stone in Harry's pocket; the Mirror's rule; the Stone destroyed and the Flamels",
        source: "*Philosopher's Stone* ch. 17; the film keeps the rule (spoken in the hospital wing)",
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
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two **[PAUSE: Choice]** questions (still read what happened after each), the second scene (from "Now a second scene" to its activity), the side-by-side questions at the start of Part 3, and the look-back activity. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 10 minutes)' },
      { kind: 'parent', text: "Before you start: have nine diyas or candles ready for the end, or use the app's map." },
      {
        kind: 'read',
        text: 'Tonight is the ninth night, the last one. Last night was about renewal: Parvati shone again as Mahagauri after her long tapas, and we watched Kreacher change and Ron find his way back.',
      },
      {
        kind: 'read',
        text: 'Tonight the Devi is Siddhidatri. *Siddhi* means perfection, or a power that comes from deep practice. *Datri* means the one who gives. So she is the giver of perfection. And tomorrow is Vijayadashami, the day of victory.',
      },
      { kind: 'parent', text: 'Pause: about 30 seconds' },
      {
        kind: 'read',
        text: "There isn't a long old story about Siddhidatri herself. What we know of her comes mostly from devotion: from how people picture her and pray to her. So tonight we'll hear what devotees say about her, and then two older stories that fit her well.",
      },
      {
        kind: 'read',
        text: "In pictures she sits on a lotus in full bloom. She has four arms, and holds a discus, a conch, a mace and a lotus. All around her are gods and sages, heavenly musicians, and even asuras, the gods' old enemies. They have all come for the same thing. She gives siddhis.",
      },
      {
        kind: 'read',
        text: 'The old books say there are eighteen of these perfections, and eight that matter most. Becoming as small as an atom. Becoming vast. Becoming light as air. Reaching anything, anywhere. Having any wish come true.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If she offered you all eight, what would you do? Take them all, take just one, take them and never use them, or say no thank you?"',
      },
      {
        kind: 'read',
        text: "Here's the interesting part. In one old text, the Bhagavata Purana, Krishna tells his friend that wise people call these powers obstacles, a waste of time for anyone seeking what really matters. The Yoga Sutras say something similar. So the giver of powers is worshipped in a tradition that also warns about wanting them.",
      },
      {
        kind: 'read',
        text: 'Devotees say that even Shiva worshipped the Devi and received the siddhis from her. And through her grace, half of his body became hers. He became Ardhanarishvara, the lord who is half woman: half Shiva, half Shakti, one being.',
      },
      {
        kind: 'read',
        text: 'The Shiva Purana tells a story about that form too. Long ago, Brahma the creator found his creation would not grow. He meditated on Shiva joined with Shakti, and Shiva appeared to him, half man and half woman. Brahma asked the Devi to help creation grow, and to be born as the daughter of his son, Daksha. She agreed, and then she went back into Shiva.',
      },
      { kind: 'read', text: "Daksha's daughter. Do you remember who she was?" },
      { kind: 'parent', text: "Pause: let your child answer. It's Sati, from Night 1." },
      { kind: 'read', text: "Yes. That's where our nine nights began." },
      {
        kind: 'read',
        text: 'Now the second story. It comes from the very end of the Devi Mahatmya, the text behind so many of our nights.',
      },
      {
        kind: 'read',
        text: 'The Devi Mahatmya is really one long story told to two people. One was a king called Suratha. Enemies took his kingdom, and even his own ministers turned against him, so he rode alone into the forest. There he met a merchant called Samadhi, whose wife and sons had taken all his money and thrown him out. The strange thing, the two men agreed, was that they still worried about the very people who had wronged them. They asked a wise sage, Medhas, why.',
      },
      {
        kind: 'read',
        text: 'To answer, Medhas told them all the stories of the Devi: of the Devi and the buffalo-demon, and of the darkest battles. The stories we heard on earlier nights.',
      },
      {
        kind: 'read',
        text: 'When he finished, the king and the merchant went down to a sandbank by a river. They shaped an image of the Devi out of earth. For three years they worshipped her there, with flowers, incense, fire and water, eating very little and keeping their minds steady. At last the Devi appeared. Ask me for anything, she said.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "You\'ve lost everything through other people\'s greed. What would you ask for? Your kingdom back, revenge, to stop caring about what you lost, something for someone else, or nothing at all?" Listen to the reasons.',
      },
      {
        kind: 'read',
        text: "The king asked for his kingdom back in this life, with his enemies' power broken, and a kingdom he could never lose in lives to come.",
      },
      {
        kind: 'read',
        text: 'The merchant had lost just as much. But he didn\'t ask for his money. He asked for the kind of knowledge that would free him from the feeling of "mine" and "I".',
      },
      {
        kind: 'read',
        text: 'And the Devi gave both of them exactly what they asked. The king got his kingdom back within days, and in a future life he would become one of the great ancestors of humankind. The merchant received his knowledge, and with it, freedom. Then she vanished. And that is how the Devi Mahatmya ends.',
      },
      {
        kind: 'read',
        text: "Notice something. The Devi didn't scold either of them. One asked for power, one asked to be free of wanting, and she answered both.",
      },
      { kind: 'parent', text: 'Pause: about 30 seconds' },
      {
        kind: 'read',
        text: "Tomorrow is Vijayadashami. *Vijaya* means victory, and *dashami* means the tenth day. Different places remember different victories. The Devi's victory over Mahishasura. And in popular tradition, Rama's victory over Ravana, so across North India huge Ravana effigies are burned. In Bengal, people say Durga has been visiting her parents' home with her children, and now she goes back to Shiva. Her images are carried to the river. Think of Night 1: a daughter coming home, and this time, welcomed.",
      },
      {
        kind: 'read',
        text: "In Kerala, tiny children write their very first letters tomorrow. And tonight, in many South Indian homes, it's Ayudha Puja. People honour the tools of their work: books, pens, instruments, machines, even phones. Often the books rest before the Devi overnight, and nobody studies until tomorrow.",
      },
      {
        kind: 'parent',
        text: 'Pause: about 1 minute. Optional: "What tool of yours would you put in front of the Devi tonight?"',
      },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 9 minutes)' },
      { kind: 'read', text: "Tonight's word is wholeness. You are whole when you know you are part of the whole." },
      {
        kind: 'read',
        text: 'Siddhidatri is the giver of siddhis, perfected powers, and many images show gods and sages bowing to her. In a devotional account, even Shiva received his powers through her and became Ardhanarishvara, half Shiva and half Shakti: one whole. Yet the tradition keeps saying powers are not the goal. The Yoga Sutras warn they can become obstacles, and the Devi Mahatmya calls the Goddess “the cause of liberation”. The deepest gift of the ninth night is a discovery, not a power. In the Devi Gita, the Goddess teaches that the self in every being is one with the infinite, and that knowing this sets you free. An old image for it is a wave discovering it was always the ocean. After eight nights of rootedness, resolve, readiness, creation, nurture, courage, fearlessness and renewal, the journey ends there: not with becoming stronger, but with no longer feeling separate.',
      },
      {
        kind: 'parent',
        text: "For the parent (the app's bell pulses here): the next scene comes straight after the Battle of Hogwarts, when Fred, Lupin and Tonks have died and Harry has walked into the forest expecting to die. The retelling doesn't dwell on it. If your child wants to talk about those deaths, let them first.",
      },
      {
        kind: 'read',
        text: 'Now, Hogwarts. This is from *Deathly Hallows*, chapter thirty-five, "King\'s Cross", and the very end of chapter thirty-six. The film tells it differently, and we\'ll come to that.',
      },
      {
        kind: 'read',
        text: "Harry lets Voldemort's curse hit him, and wakes in a bright, misty place like King's Cross, where Dumbledore is waiting. Dumbledore confesses that as a young man he hungered for power, and it led him into terrible mistakes; later he refused to be Minister for Magic, knowing he couldn't be trusted with power. Perhaps, he says, those best suited to power never went looking for it, like Harry. Harry goes back, the battle ends, and the Elder Wand, the most powerful wand ever made, is his: he won it almost by accident, by disarming Draco Malfoy. In the headmaster's office, he mends his own broken wand with one touch of it. Then he decides to put the Elder Wand back in Dumbledore's tomb, so that if he dies undefeated, its power will end with him. Ron thinks he's mad. Harry says it's more trouble than it's worth.",
      },
      {
        kind: 'read',
        text: "In the film it's different. Harry stands on a bridge with Ron and Hermione, snaps the Elder Wand in two, and throws the pieces away.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Harry use the Elder Wand for, the one time he used it?',
          'Wonder: why did Dumbledore tell Harry about his own hunger for power, right then?',
          'Stretch: book Harry keeps its power asleep; film Harry breaks it. Which is wiser?',
          "Turn it around: from Ron's side, is there a good argument for keeping it?",
          'Connect: the king asked for power, the merchant asked to be free of wanting. Is Harry like either?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "He should have kept it, he\'s the good guy", try: "Who comes after Harry?" If they say "So wanting power is bad", try: "Then why did the Devi give the king his kingdom?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "The safest power is power nobody holds" or "Power should be held by good people, not given up". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: "ACTIVITY: 3 minutes. Freeze the moment the Elder Wand lies on the desk. One of you argues for the book's choice, one for the film's, 60 seconds each. Then 60 seconds together: invent a third choice Harry didn't take.",
      },
      {
        kind: 'read',
        text: "One thing to hold on to. Siddhidatri is the source of power, and she gives it away. Harry held a power for a moment and put it down. The Elder Wand was fought and killed over; the Devi's gifts aren't won from anyone. What's similar is the choice. Almost everything else is different.",
      },
      {
        kind: 'read',
        text: "Now a second scene, from *Philosopher's Stone*, chapters twelve and seventeen. Both moments are in the film.",
      },
      {
        kind: 'read',
        text: "At Christmas in his first year, Harry finds an old mirror, sees his parents behind him, and goes back night after night. Dumbledore tells him the Mirror shows your heart's deepest wish, and that he shouldn't look for it again: people have wasted their lives in front of it. Later, beyond the trapdoor, Harry finds the same Mirror, with Professor Quirrell in front of it. Quirrell has learned from Voldemort that there is no good or evil, only power, and people too weak to seek it. He sees himself handing the Stone to his master but can't get it out, so he makes Harry look. Harry's reflection pockets the Stone and winks, and something heavy drops into Harry's real pocket. Dumbledore later explains that only someone who wanted to *find* the Stone, but not *use* it, could take it. The Stone is then destroyed, with its maker Nicolas Flamel's agreement, though without it he and his wife will one day die.",
      },
      {
        kind: 'read',
        text: "Remember the merchant, who didn't ask for his money back? Both stories wonder whether the person who doesn't grab for power is the one who should receive it. But they don't agree completely. The Devi gave the king exactly the power he wanted.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Quirrell see in the Mirror, and what did Harry see?',
          'Wonder: why could Harry see himself finding the Stone, but not using it?',
          "Stretch: Nicolas Flamel agreed to destroy the Stone, knowing he'd die without it. Is that giving up power, or something else?",
          'Turn it around: is there anything true in Quirrell\'s "only power" belief?',
          "Connect: Siddhidatri gives to everyone who comes. The Mirror gives only to those who don't want to use it. Which is fairer?",
        ],
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "The people who should hold power are the ones who don\'t want it" or "Wanting to lead is fine, if you know why you want it".',
      },
      {
        kind: 'parent',
        text: "ACTIVITY: 2 minutes. Each of you names something you'd love to have, then says honestly whether you'd want to find it or use it. Could either of you get it out of the Mirror?",
      },

      { kind: 'heading', text: 'Part 3: Side by side, looking back, today, and closing (about 6 minutes)' },
      { kind: 'read', text: "Let's put the stories next to each other. There's no single right answer to any of these." },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'Siddhidatri gives power away; Harry gives the Elder Wand up. Is giving away the same as giving up?',
          'The Devi gave the king his kingdom; the Mirror shuts out anyone who wants to use the Stone. Is wanting power wrong, or does it depend on why?',
          'Harry used the Elder Wand to mend his own old wand. Why might the ordinary tool matter more than the powerful one?',
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: "Now, before we finish, let's look back at all nine nights." },
      { kind: 'parent', text: 'Light one diya for each night as you read its theme. Go slowly.' },
      { kind: 'read', text: 'Night one, Shailaputri. Rootedness. What you are rooted in can survive what you lose.' },
      { kind: 'read', text: 'Night two, Brahmacharini. Resolve. What you practise, day after day, changes who you are.' },
      { kind: 'read', text: 'Night three, Chandraghanta. Readiness. Strength can protect just by being ready.' },
      { kind: 'read', text: 'Night four, Kushmanda. Creation. What you make carries something of why you made it.' },
      { kind: 'read', text: 'Night five, Skandamata. Nurture. True care helps someone grow strong enough to go their own way.' },
      { kind: 'read', text: 'Night six, Katyayani. Courage. When something is wrong, stand up to it, and stand together.' },
      { kind: 'read', text: 'Night seven, Kalaratri. Fearlessness. Face the dark without becoming part of it.' },
      { kind: 'read', text: 'Night eight, Mahagauri. Renewal. After a hard time, you can begin again, clearer than before.' },
      { kind: 'read', text: 'Night nine, Siddhidatri. Wholeness. You are whole when you know you are part of the whole.' },
      { kind: 'parent', text: 'Pause: let the nine flames burn for a moment in quiet.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one or two: "Which night stayed with you most?" "Which comparison was strongest, and which felt forced?" "Are you who your family made you, or who you choose to be?" On a full night, use the "defend a night" activity in Beat 15: 3 minutes.',
      },
      { kind: 'read', text: 'And now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine you're an admin of your class group chat. One person keeps posting things that upset everyone. You could remove them with one tap.",
      },
      {
        kind: 'read',
        text: "Some people would say remove them, because that's what admins are for. Some would message them privately first, because everyone deserves a warning. Some would ask the group. Some would hand admin to someone else, because they don't want to be the one who decides. And some would leave it, so they don't become the bad guy.",
      },
      { kind: 'parent', text: 'PAUSE: ask, "Does having the button make it your job to use it?"' },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "If Siddhidatri offered you one gift now, after nine nights, what would you ask for?" and "Suratha asked for power and Samadhi asked to be free of wanting. Is one wish better?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "What is one thing we want to carry from these nine nights into the rest of the year?"',
      },
      { kind: 'read', text: "Tonight's word is wholeness. You are whole when you know you are part of the whole." },
      { kind: 'read', text: 'And tomorrow is Vijayadashami, the day of victory, when the nine nights are complete.' },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from all nine nights.",
      },
    ],
    timing:
      'about 10 minutes for Part 1, 9 for Part 2 and 6 for Part 3 (including the look-back), so about 25 minutes in all. A short evening takes about 16: no choice questions, one scene with two ladder questions, no side by side, and in the look-back just the diyas and one thread.',
  },

  // The closing (LookBack.tsx draws it; Score.closing() plays it): the
  // saffron dawn of Vijayadashami rises behind the ring of nine diyas, which
  // lifts into the finished nine-diya map.
  closing: {
    seconds: 14,
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6.5, text: 'the drone fades to silence' },
    ],
  },
};
