// Night 6: Katyayani, born of the gods' combined fury.
//
// All text is copied from docs/nights/night-6.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-6.md.

import type { Night } from './types';

export const day6: Night = {
  number: 6,
  devi: 'Katyayani',
  title: "Katyayani, born of the gods' combined fury",
  summary:
    "Night 6 takes about 25 minutes, or about 16 as a short evening. Its question: when something is unjust and nobody can fix it alone, what do we do with our anger? The night tells how the gods, beaten by the buffalo-demon Mahishasura, poured out their fury as light, and how that light became the Devi. Then come two Harry Potter scenes: Dumbledore's Army is formed, and three friends get past the trapdoor together.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: 'gentle. The battle with Mahishasura ends in his death. Tell it as the texts do, plainly and without gore. Read the parent note in Beat 6 before you begin.',
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: "the opening, the story (Beats 2–7; each choice shows its set-up and what happened, without the question), the theme, Dumbledore's Army with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out both choice questions, Through the trapdoor and its Think it through, and Side by side.",
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves these out: the second Harry Potter scene, its
  // Think it through, and Side by side. (Every choice's question is left out
  // on a short evening anyway; its set-up and what happened are shown as story.)
  shortEveningLeavesOut: ['n6-b11', 'n6-b12', 'n6-b13'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n6-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n6gatheredLight', // dimmed: the gods' lights are scattered, not yet joined
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif'] },
      },
      points: [
        {
          lead: 'Last night',
          text: "Skanda was born from Shiva's fiery spark, nursed by the six star-mothers and taken in by Parvati as her own. Skandamata held him on her lap, and still let him go to lead the gods' army. We asked how much to protect someone, and when to let them face danger.",
        },
        {
          lead: 'Tonight',
          text: 'the Devi is Katyayani. The gods have been beaten and thrown out of heaven, and their anger becomes something none of them could make alone. This is the story at the heart of Navaratri: the Devi against the buffalo-demon Mahishasura.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b2',
      sourceRows: [0],
      number: 2,
      type: 'story',
      title: 'Heaven lost',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n6exile',
        camera: 'aerial',
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'strings'] },
        freezeAfterLine: [5], // hold on the small dim lights wandering under an ash sky
      },
      intro:
        'This follows the Devi Mahatmya, chapters 2 and 3, which forms part of the Markandeya Purana. The name "Katyayani" comes from other texts, and Beat 7 says which.',
      paragraphs: [
        'Long ago the gods and the asuras, the demons, fought a war that lasted a full hundred years. The asuras were led by Mahishasura, the buffalo-demon. The gods lost. Mahishasura drove out Indra, king of the gods, and sat on his throne himself (DM 2.2–3). He took over the work of the sun, the moon, fire, wind and the other gods. The gods were thrown out of heaven, and wandered the earth like ordinary mortals (DM 2.6–7).',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b3',
      sourceRows: [1],
      number: 3,
      type: 'choice',
      title: 'What should the gods do?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n6exile',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 56, layers: ['drone'] },
      },
      setup:
        'the gods have fought for a hundred years and lost. Each one alone is powerful, and each one alone has already been beaten. Mahishasura now holds everything that was theirs.',
      ask: 'if you were one of the gods, what would you do now?',
      options: [
        {
          text: 'Fight again, harder',
          acknowledgement: 'Courage after defeat is real courage. But they fought for a hundred years. Would more of the same work?',
        },
        {
          text: 'Go to the greatest gods for help',
          acknowledgement: "That's exactly what they did first. Notice that asking for help isn't the same as giving up.",
        },
        {
          text: 'Join all our strength into one',
          acknowledgement: 'A strong instinct. Watch how it happens in the story: nobody plans it.',
        },
        {
          text: 'Wait, and look for a better moment',
          acknowledgement: 'Patience can be wise. But Mahishasura is using everything that was theirs. Does waiting cost anything?',
        },
      ],
      whatHappens:
        'the gods went to Brahma, the creator. With Brahma at their head, they went to Shiva and Vishnu and told them everything. Then they asked: please think how he can be ended (DM 2.4–8).',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b4',
      sourceRows: [2, 3],
      number: 4,
      type: 'story',
      title: 'Born of light',
      label: 'tradition',
      minutes: 2,
      direction: {
        intensity: 7,
        palette: 'n6gatheredLight',
        camera: 'pushIn', // then a crane up as the lights merge (sentence 3)
        music: { palette: 'indian', raga: 'durga', bpm: 72, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 2, seconds: 4 }, // the gods' lights flow together
        freezeAfterLine: [5], // her brilliance fills the three worlds
      },
      paragraphs: [
        'When Vishnu and Shiva heard what Mahishasura had done, they grew angry and their brows knotted. A great radiance poured out of the faces of Vishnu, Brahma and Shiva. Light streamed from the bodies of Indra and every other god as well, and all of it merged into one. It looked like a mountain of fire, filling every direction with flame. Then that light, gathered from all the gods, took the form of a woman. Her brilliance filled the three worlds (DM 2.9–13).',
        'Each part of her came from a different god\'s light. Her face came from Shiva, her hair from Yama and her arms from Vishnu. Her three eyes came from Agni, the fire god (DM 2.14–18). The gods were overjoyed.',
        'Then each of them gave her something (DM 2.20–31):',
        // The gifts, one paragraph per line of the list in the doc.
        'Shiva drew a trident out of his own trident and gave it to her. Vishnu did the same with his discus.',
        'Varuna, lord of the waters, gave a conch and a noose. Agni gave a spear. Vayu, the wind, gave a bow and arrows.',
        'Indra gave his thunderbolt, and the bell from his elephant, Airavata.',
        'Yama gave his staff. Brahma gave a rosary and a water pot. Kala, Time, gave a sword and shield.',
        'The Ocean gave jewels, garments that never grow old, and a lotus. Vishvakarma, the divine craftsman, gave an axe and armour.',
        'Himavat, the mountain king, gave a lion to ride. Kubera, god of wealth, gave a drinking cup filled with wine (ch. 2).',
        'The serpent Shesha gave a necklace of snakes, set with jewels.',
        "Notice that Shiva and Vishnu don't hand over their own weapons. They draw new ones out of them. Nobody is left empty-handed.",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b5',
      sourceRows: [4],
      number: 5,
      type: 'choice',
      title: '"What is this?"',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 6,
        palette: 'n6battleShadow',
        camera: 'still',
        music: { palette: 'indian', raga: 'marwa', bpm: 80, layers: ['drone', 'percussion'] },
      },
      setup:
        'the Devi laughed again and again, and gave a roar that filled the sky. The worlds shook, the seas churned and the mountains trembled. The gods shouted "Victory!" (DM 2.32–35). Down in his stolen kingdom, Mahishasura hears it.',
      ask: 'if you were Mahishasura, what would you do?',
      options: [
        {
          text: "Charge straight at it: I've beaten every god",
          acknowledgement: 'Confidence that has always worked before. Does pride ever ask whether this time is different?',
        },
        {
          text: 'Send my generals to deal with it',
          acknowledgement: "A commander's answer. He does send his generals, but not instead of going.",
        },
        {
          text: 'Find out what it is before I act',
          acknowledgement: 'Perhaps the wisest of the four. Notice how rarely the proud choose it.',
        },
        {
          text: 'Give heaven back and make peace',
          acknowledgement: 'The one choice that would have saved him. The text never shows him considering it.',
        },
      ],
      whatHappens:
        'Mahishasura shouted in anger, "Ah, what is this?" and rushed towards the sound with his whole army (DM 2.37). He saw her filling the three worlds with light. Her feet bent the earth, her crown touched the sky, and her arms reached in every direction (DM 2.38–39).',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b6',
      sourceRows: [5, 6, 7, 16],
      number: 6,
      type: 'story',
      title: 'The battle',
      label: 'tradition',
      minutes: 2,
      direction: {
        intensity: 9, // peak at sentences 12–14, easing to 4 at dawn
        palette: 'n6battleShadow', // crossing to n6lionDawn at sentence 14
        camera: 'lowAngle', // then a pull-back at sentence 14
        music: { palette: 'indian', raga: 'marwa', bpm: 96, layers: ['drone', 'motif', 'percussion', 'strings', 'climax'] },
        slowMo: { line: 7, seconds: 5 }, // the shape changes
        freezeAfterLine: [8, 14], // "Each time she met him"; the shadow broken into dawn
      },
      // The bell pulses at the start, and again just before "Then she leapt
      // onto him" (sentence 12).
      parentNoteAgainAtLine: 12,
      parentNote: [
        'The Devi Mahatmya describes a real battle, and it ends with Mahishasura\'s death. We tell it as the text does, plainly, without gory detail.',
        'The text treats this as a sacred victory that restores the order of the world. It is not about defeating people we are angry with. Say so if your child seems to take it that way.',
        'Many traditional readers see Mahishasura as pride or ignorance, the "buffalo" in each of us. That is an interpretation.',
        'If your child is uneasy about a goddess who kills, that is a good question, not a problem. The gods themselves, in the next chapter, praise her for being merciful in her heart even while she is harsh in battle (DM 4.21–22).',
      ],
      paragraphs: [
        "Mahishasura's generals came at her one after another, with chariots, elephants and horses. As she fought, the Devi breathed out, and her breaths became whole armies of helpers (DM 2.53). Her lion charged through the enemy ranks. Mahishasura's generals fell, among them Chikshura and Chamara (DM 3.2–20).",
        'Then Mahishasura himself came, in the form of a huge buffalo. The earth shook under his hooves, and his horns tore at mountains and clouds. The Devi caught him in her noose. He became a lion; then a man with a sword; then an elephant; then a buffalo again (DM 3.21–33). Each time she met him.',
        'She drank from the cup that never empties, and laughed. Roar for a moment, she told him, while I drink. Soon the gods will be the ones roaring, for joy (DM 3.34–37). Then she leapt onto him, pressed her foot on his neck, and struck with her trident. Half of him struggled out of the buffalo\'s mouth in his own shape. She ended his life with her sword (DM 3.38–41).',
        'His army fled. The gods rejoiced, the sages praised her, the heavenly musicians sang and the celestial dancers danced (DM 3.42–43). In the next chapter the gods ask for one thing: whenever we think of you in trouble, come and end our troubles. She agrees, and vanishes (DM 4.35–39).',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b7',
      sourceRows: [9, 10, 11, 12, 13, 14, 15],
      number: 7,
      type: 'story',
      title: 'Katyayani',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n6lionDawn',
        camera: 'drift',
        music: { palette: 'indian', raga: 'durga', bpm: 64, layers: ['drone', 'motif'] },
      },
      paragraphs: [
        'The Devi Mahatmya mostly calls her Ambika or Chandika. Where does the name "Katyayani" come from?',
        '**Tradition (Vamana Purana):** the gods\' fiery energies gathered at the hermitage of the sage Katyayana, who gave them form. So she is Katyayani, "daughter of Katyayana". *(Around chs. 18–21; numbering varies by edition.)*',
        '**Tradition (Kalika Purana):** here Katyayana is simply the first person to worship her.',
        '**Tradition (Devi Mahatmya ch. 11):** after a later victory, the gods praise the Devi as Katyayani by name (DM 11.2).',
        '**Tradition (Bhagavata Purana 10.22.1–6):** the young cowherd girls of Vraja worship Katyayani for a whole winter month. They bathe in the Yamuna at dawn, make her image from earth on the riverbank, and pray that Krishna will be their husband.',
        '**Navaratri practice:** on the sixth night she is worshipped as Katyayani. She is often identified with Mahishasuramardini, "she who slays Mahishasura".',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'lion',
          symbol: 'Lion',
          meaning: "Himavat's gift in the story. Courage and power that is mastered, not wild.",
          label: 'interpretation',
        },
        {
          id: 'sword',
          symbol: 'Sword (in one hand)',
          meaning: "Cutting through what is false. The gods' gift of Kala, Time.",
          label: 'interpretation',
        },
        {
          id: 'lotus',
          symbol: 'Lotus (in another hand)',
          meaning: 'Purity and calm, even in the middle of battle.',
          label: 'interpretation',
        },
        {
          id: 'abhaya',
          symbol: 'Raised open palm (*abhaya*)',
          meaning: '"Do not fear." The hand of protection.',
          label: 'interpretation',
        },
        {
          id: 'varada',
          symbol: 'Lowered open palm (*varada*)',
          meaning: 'Giving: the hand that grants what is asked.',
          label: 'interpretation',
        },
        {
          id: 'eye',
          symbol: 'Third eye',
          meaning: 'Clear sight. In yogic interpretation, Night 6 is linked with the Ajna, or brow, chakra.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition)',
        text: 'in Devi Mahatmya 11.25, the gods pray to Katyayani to protect them through her gentle face, adorned with three eyes. The word is *saumya*, mild or gentle. The same Devi who fought Mahishasura is praised for her gentle face.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b8',
      number: 8,
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
        word: 'Courage',
        idea: 'When something is wrong, stand up to it, and stand together.',
        description:
          'Mahisha had driven the gods out of heaven, and each of them, alone, had lost. Their shared anger at the injustice blazed out as light and gathered into one form: the Devi. The Devi Mahatmya says she is eternal and simply appears when she is needed. Each god then gave her his own weapon, trusting her with what he couldn’t win alone. In a popular telling (not in the Devi Mahatmya), Mahisha had asked that only a woman could kill him, because he thought no woman could. In this story, courage isn’t the absence of fear. It’s refusing to accept a wrong, and it’s strongest when it’s shared. Often it comes from exactly where the arrogant weren’t looking.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b9',
      sourceRows: [17, 18, 19, 20, 21, 22],
      number: 9,
      type: 'sceneIntro',
      title: "Dumbledore's Army",
      label: 'hogwarts',
      minutes: 2,
      direction: {
        intensity: 5,
        palette: 'n6hogsHead',
        camera: 'pushIn', // still at first, then a slow push-in at the Hog's Head (sentence 4)
        music: { palette: 'hogwarts', bpm: 66, layers: ['drone', 'motif'] },
        freezeAfterLine: [5], // the names running down the parchment
      },
      reference:
        'Harry. *Order of the Phoenix*, chapter 15, "The Hogwarts High Inquisitor"; chapter 16, "In the Hog\'s Head"; chapter 17, "Educational Decree Number Twenty-Four"; chapter 18, "Dumbledore\'s Army". Film: *Order of the Phoenix* (2007).',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film moves Harry's protest that real danger is nothing like school into the Hog's Head meeting. Neville, not Dobby, finds the Room of Requirement. The film doesn't show Ginny suggesting the name as the book does; the name appears on the list of members that Umbridge seizes. The choice to join is the same in both.",
      retelling: [
        "It's Harry's fifth year. Voldemort is back, but the Ministry insists he isn't, the newspapers call Harry a liar, and the new Defence teacher, Professor Umbridge, teaches from a book with no spells at all. Hermione has had enough: if nobody will teach them to defend themselves, they should teach themselves, and Harry should be the teacher. Harry protests that he was lucky and always had help. At the Hog's Head, a grubby pub, he expects a handful of people, and about two dozen students turn up from three different houses. Zacharias Smith wants proof, others list what Harry has done, and they all sign Hermione's parchment, promising to keep it secret. When a new rule bans every group Umbridge hasn't approved, Dobby tells Harry about a hidden room that appears when you really need it. There Ginny points out that \"D.A.\" could stand for Dumbledore's Army, the thing the Minister fears most, and they begin with the Disarming Charm.",
      ],
      connection: {
        intro: 'the theme: standing up to a wrong, together.',
        similar:
          'people who are each powerless alone join together against an injustice. The students are angry at being left defenceless and at the Ministry\'s denial. That anger becomes something disciplined: practice. Each of them adds their name, as each god added a gift.',
        different: [
          "The gods give their power to one figure, who fights for them. The DA members each grow their own power; Harry teaches, but doesn't fight for them.",
          "The Devi's battle ends in a death. The DA's purpose is defence.",
          'The DA meets in secret, against a school ban. We come back to that in "Go deeper".',
          'The Devi is worshipped as divine power itself. Harry is a fifteen-year-old who keeps saying he was lucky.',
        ],
        whyItHelps:
          'it turns a cosmic story into a question a pre-teen knows: what happens when people who are angry about the same thing decide to do something together?',
        strength: {
          rating: 'strong',
          text: 'The decision to pool strength against injustice matches closely. How the power is shared is very different.',
        },
        themeLink:
          'Hermione refuses to accept that they should be left unable to defend themselves, and the students act on it together, signing their names to a group the school soon bans. None of them could have changed things alone.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b10',
      sourceRows: [17, 18],
      number: 10,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 1,
        palette: 'n6hogsHead',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        {
          step: 'Notice',
          question: "what did the students need that school wasn't giving them? Who was saying Voldemort hadn't returned?",
        },
        {
          step: 'Feel',
          question: "how might it feel to be called a liar in the newspapers when you know you're telling the truth?",
        },
        { step: 'Wonder', question: "why didn't Harry want to teach at first?" },
        {
          step: 'Stretch',
          question:
            'the gods handed their power to one figure. The students each learned to fight for themselves. When trouble comes, which is better, and why?',
        },
        { step: 'Turn it around', question: "tell the Hog's Head meeting from Zacharias Smith's side. He came, but he doubted." },
        { step: 'Connect', question: "the gods' anger became light. What did the students' anger become?" },
      ],
      followUps: [
        {
          ifTheySay: 'Harry did everything',
          tryAsking: 'Who had the idea? Who found the room? Who suggested the name? What would the DA be without them?',
        },
        {
          ifTheySay: 'Anger is bad',
          tryAsking: "The gods' anger made the Devi. Is it the anger that matters, or what you do with it?",
        },
        {
          ifTheySay: 'The Devi and the DA are the same',
          tryAsking: 'Who did the fighting in each story? The gods watched; the students had to learn for themselves.',
        },
        {
          ifTheySay: 'Umbridge deserved anything they did',
          tryAsking: 'What did they actually do with their anger: attack Umbridge, or learn to defend themselves? Why might that matter?',
        },
      ],
      stance: {
        left: 'Anger is the best fuel for doing something',
        right: 'Anger should cool down before you act',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: "the Hog's Head pitch",
        minutes: 3,
        text: 'The parent plays Zacharias Smith, arms folded: why should I trust you? The child plays Harry and has 60 seconds to persuade him, without boasting. Then swap roles. Afterwards, ask: what actually persuaded you? Was it the claims, or something else?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b11',
      sourceRows: [23, 24, 25],
      number: 11,
      type: 'sceneIntro',
      title: 'Through the trapdoor',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n6trapdoor', // crossing to greatHall at the feast (sentence 6)
        camera: 'crane', // down through the trapdoor, then a pan
        music: { palette: 'hogwarts', bpm: 72, layers: ['drone', 'motif', 'strings'] },
        slowMo: { line: 3, seconds: 3 }, // the chess move
        freezeAfterLine: [3], // one light steps forward and goes dim
      },
      reference:
        'Harry, Ron and Hermione. *Philosopher\'s Stone*, chapter 16, "Through the Trapdoor", with the end-of-year feast in chapter 17, "The Man with Two Faces". Film: *Philosopher\'s Stone* (2001), the final obstacles.',
      findScene: {
        lead: 'Find the scenes',
        text: 'there are no links. Find them yourselves in your own copies of the books or films, using the references above.',
      },
      filmNote:
        "the film leaves out the troll and Snape's potion riddle. In the film, Hermione beats the Devil's Snare by relaxing and using a light spell. Her line about books, cleverness, friendship and bravery comes after the chess game, and she stays behind with Ron. Each friend still wins one obstacle, so the choice is the same.",
      retelling: [
        "It's the end of Harry's first year, and Harry, Ron and Hermione are sure someone will try to steal the Philosopher's Stone tonight while Dumbledore is away. Below a trapdoor, a plant wraps itself around them, and Hermione beats the Devil's Snare with fire. In a room of flying keys, Harry, the Seeker, catches the one that fits the door. On a giant chessboard Ron, the best player, sees that one of them must be taken for Harry to win, and he chooses himself. Hermione solves a riddle of potion bottles, but there is only enough for one person to go on, and she tells Harry that friendship and bravery matter more than books and cleverness. She goes back for Ron, and Harry goes on alone. At the end-of-year feast, Dumbledore gives points to all three, then ten more to Neville for standing up to his friends, and those ten win the House Cup.",
      ],
      connection: {
        intro: "the theme's second half, standing together, where each gives what they have.",
        similar:
          "three different gifts, cleverness, flying and chess, are each needed exactly once. None of them could have got through alone. Like the gods, each gives the one thing they're best at. Ron gives the most: himself.",
        different: [
          'The gods give their gifts to one figure. The friends take turns, and keep their own skills.',
          'There is no anger here. The friends act from worry and urgency.',
          "In the end Harry goes on alone. The final victory over Quirrell comes from his mother's protection and Dumbledore's return, not from the team.",
          'Three eleven-year-olds are acting on a guess, and breaking rules to do it. The gods act with full knowledge of what Mahishasura has done.',
        ],
        whyItHelps:
          'it makes "each gives what they have" concrete. A pre-teen can see that the team needs three different people, not three Harrys.',
        // The doc's whole line is "Strength: strong for standing together, …".
        strength: { rating: 'strong', text: 'for standing together, each giving what they have; nothing here matches the anger.' },
        themeLink:
          "the three friends refuse to let the Stone be stolen, and get through only together; Ron choosing to be taken is the bravest step. Neville's ten points reward a different courage: standing up to a wrong among his own friends.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b12',
      sourceRows: [23, 24],
      number: 12,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'n6trapdoor',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'which obstacle did each friend get past, and why was it that person?' },
        { step: 'Feel', question: 'what do you think Ron felt as he chose to be taken?' },
        {
          step: 'Wonder',
          question: "Hermione's cleverness had just saved them. Why do you think she said friendship and bravery matter more?",
        },
        { step: 'Stretch', question: 'in the end Harry went on alone. Was it really a team effort?' },
        {
          step: 'Turn it around',
          question: "tell that night from Neville's side. He tried to stop them, and he was frozen for it. Was his gift part of the team too?",
        },
        {
          step: 'Connect',
          question:
            "the gods gave weapons they handed over. The friends gave skills they kept. What's the difference between those two kinds of giving?",
        },
      ],
      followUps: [
        {
          ifTheySay: 'Harry is the hero',
          tryAsking: 'Which obstacle did Harry actually solve? Could he have solved the other two?',
        },
        {
          ifTheySay: 'Ron was silly to get himself knocked out',
          tryAsking: 'What would have happened if nobody had been willing?',
        },
        {
          ifTheySay: "Neville's points weren't fair",
          tryAsking: 'Is standing up to your friends harder than facing an enemy? Why might Dumbledore think so?',
        },
        {
          ifTheySay: 'The gods and the trio did the same thing',
          tryAsking: 'Did the gods keep their weapons? Did Ron keep his chess?',
        },
      ],
      stance: {
        left: 'It only worked because each did their own part',
        right: 'In the end, it came down to one person',
      },
      activity: {
        title: "Ron's move",
        minutes: 2,
        text: 'Freeze at the moment Ron says one of them must be taken. The parent plays Ron, arguing for the sacrifice, for 45 seconds. The child plays Harry, arguing against it, for 45 seconds. Then ask: was there a third option either of you missed?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b13',
      sourceRows: [8],
      number: 13,
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
        'The gods gave their power away to one figure. The DA students kept and grew their own. Which kind of joining together is stronger, and when?',
        "In the Devi's story and in the DA, anger started it. What turned the anger into something useful?",
        'Ron gave up his place in the game. The gods gave up their weapons. What does it cost to give your best thing to a shared purpose?',
        'A demon king later mocks the Devi for fighting with borrowed strength. Zacharias doubted Harry was anything special. When a group wins, whose victory is it?',
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'the Devi is worshipped today, and her victory over Mahishasura is a sacred story about restoring the order of the world. The DA and the three friends are fictional students. We compare the decision to join together, not the people, and not the fighting.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b14',
      number: 14,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 62, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The whole-class detention.',
          setup:
            'Two classmates keep messing about, and the teacher keeps giving the whole class detention. Everyone is angry. Nobody alone can change it.',
          perspectives: [
            '"Write a polite letter, and get everyone to sign it."',
            '"A few of us should talk to the teacher together, calmly."',
            '"Tell our parents and let them raise it with the school."',
            '"Talk to the two classmates first. They\'re part of this too."',
            '"Accept it. Teachers decide, and complaining will make it worse."',
          ],
          ask: "which of these turns the class's anger into something useful? Which might make things worse?",
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n6-b15',
      sourceRows: [7, 8],
      number: 15,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective', // the sky begins to lighten at the theme; dawn comes in the closing
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        "The gods lost for a hundred years. Why do you think they hadn't joined together sooner?",
        "Harry didn't want to teach at first. What do you think changed his mind?",
      ],
      goDeeper: [
        'The DA kept meeting after Umbridge banned student groups. Was breaking that rule justified? What makes breaking a rule right, or wrong?',
        'A demon king says the Devi fights with borrowed strength; she says all of it was hers. Can something be given to you and still be truly yours?',
        'The gods praise the Devi for compassion in her heart and harshness in battle. Can someone be fierce and kind at the same moment?',
        'Shared anger made the Devi, and shared anger can make a pile-on. What is the difference?',
      ],
      together: 'what is one thing our family could do together that none of us could do alone?',
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: 'the battles grow darker, and the Devi takes her most fearsome form: Kalaratri, the dark night.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'The heart of the night is a pair of questions, not a moral: what can people do together, and what should anger be used for? Don\'t settle for "teamwork is good".',
      "The battle ends in Mahishasura's death. Tell it plainly and without gore, and say that it is a sacred victory, not a model for hurting people.",
      "Don't let the child map the Devi onto Harry, Hermione or the DA. The gods' light became a Devi whom the tradition says was always the power behind them.",
      "The DA rule-breaking question is in \"Go deeper\" on purpose. Let your child argue both sides, and don't hand them a verdict.",
    ],
    sources: [
      {
        claim: 'Hundred-year war; Mahishasura takes Indra\'s place; gods wander the earth',
        source: 'Devi Mahatmya 2.2–7 (Markandeya Purana)',
        label: 'Tradition',
        confidence: 'High',
      },
      { claim: 'Gods go to Brahma, then to Shiva and Vishnu', source: 'DM 2.4–8', label: 'Tradition', confidence: 'High' },
      {
        claim: 'Anger becomes light; light becomes a woman; body parts from each god',
        source: 'DM 2.9–18',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim:
          'The gifts: trident, discus, conch, spear, bow, thunderbolt and bell, staff, noose, rosary and water pot, sword and shield, jewels, lotus, axe, lion, cup, serpent necklace',
        source: 'DM 2.20–31',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Her laugh and roar; "Ah, what is this?"; Mahishasura charges',
        source: 'DM 2.32–39',
        label: 'Tradition',
        confidence: 'High',
      },
      { claim: 'Her breaths become armies of attendants', source: 'DM 2.53', label: 'Tradition', confidence: 'High' },
      {
        claim: 'Generals fall; shape changes; noose, trident, sword; gods rejoice',
        source: 'DM 3.2–43',
        label: 'Tradition',
        confidence: 'High (verse numbers vary slightly between editions)',
      },
      {
        claim: 'Compassion in the heart and harshness in battle; the boon to come when called',
        source: 'DM 4.21–22; 4.35–39',
        label: 'Tradition',
        confidence: 'High',
      },
      { claim: '"All these powers are my own"', source: 'DM 10.3–5', label: 'Tradition', confidence: 'High' },
      {
        claim: 'The gods name her Katyayani; her gentle three-eyed face',
        source: 'DM 11.2; 11.25',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Katyayani formed at the sage Katyayana's hermitage",
        source: 'Vamana Purana (around chs. 18–21; numbering varies by edition)',
        label: 'Tradition',
        confidence: 'Medium',
      },
      {
        claim: 'Katyayana as her first worshipper',
        source: 'Kalika Purana',
        label: 'Tradition',
        confidence: 'Medium (via secondary sources)',
      },
      {
        claim: "The cowherd girls' Katyayani vow",
        source: 'Bhagavata Purana 10.22.1–6',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Katyayani identified with Mahishasuramardini on the sixth night',
        source: 'Navaratri practice',
        label: 'Tradition (devotional)',
        confidence: 'High',
      },
      {
        claim: 'Four arms, sword, lotus, abhaya and varada, lion',
        source: 'Devotional iconography',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Meanings of the symbols; Ajna chakra link',
        source: 'Devotional and yogic readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Mahishasura as pride or ignorance',
        source: 'Devotional readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: "Hermione's idea; Harry protests he was lucky and had help",
        source: '*Order of the Phoenix* ch. 15',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Hog's Head meeting; Zacharias Smith; the signed parchment",
        source: '*Order of the Phoenix* ch. 16',
        label: 'Hogwarts',
        confidence: 'High',
      },
      { claim: 'Ban on student groups', source: '*Order of the Phoenix* ch. 17', label: 'Hogwarts', confidence: 'High' },
      {
        claim: "Room of Requirement via Dobby; Harry voted leader; Cho's and Ginny's names; Disarming Charm",
        source: '*Order of the Phoenix* ch. 18',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Film: speech moved to the Hog's Head; Neville finds the room",
        source: '*Order of the Phoenix* film (2007)',
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: 'Film: how the name is chosen',
        source: '*Order of the Phoenix* film (2007)',
        label: 'Hogwarts',
        confidence: 'To check',
      },
      {
        claim: "The obstacles; Ron's sacrifice; Hermione's riddle and her words to Harry",
        source: "*Philosopher's Stone* ch. 16",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Feast points, including Neville's ten",
        source: "*Philosopher's Stone* ch. 17; 2001 film",
        label: 'Hogwarts',
        confidence: 'High',
      },
      {
        claim: "Film omits the troll and the potion riddle; light spell for the Devil's Snare",
        source: "*Philosopher's Stone* film (2001)",
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
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (read straight on), the second scene (from "Now a second scene" to its activity) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 10 minutes)' },
      {
        kind: 'read',
        text: 'Last night we met Skandamata, who held her son on her lap and still let him go to lead the gods\' army. We asked how much to protect someone, and when to let them face danger.',
      },
      {
        kind: 'read',
        text: 'Tonight is the sixth night. The Devi is Katyayani, and her story is the one at the very heart of Navaratri.',
      },
      { kind: 'parent', text: 'Pause: about 30 seconds' },
      {
        kind: 'read',
        text: 'Long ago, the gods and the demons fought a war. It lasted a hundred years. The demons were led by Mahishasura, the buffalo-demon, and the gods lost.',
      },
      {
        kind: 'read',
        text: 'Mahishasura threw Indra, king of the gods, off his throne and sat on it himself. He took over the work of the sun, the moon, the fire and the wind. The gods were driven out of heaven. They wandered the earth like ordinary people, with nothing left.',
      },
      { kind: 'read', text: 'Every one of them was powerful. And every one of them had already been beaten.' },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were one of the gods, what would you do now? Fight again harder, go to the greatest gods for help, join all your strength into one, or wait for a better moment?" Listen to the reasons.',
      },
      {
        kind: 'read',
        text: 'Here is what the gods did. They went to Brahma, the creator. Then, with Brahma leading them, they went to Shiva and Vishnu and told them everything. Please, they said, think how he can be stopped.',
      },
      {
        kind: 'read',
        text: "When Vishnu and Shiva heard, they grew angry. Their brows knotted. And out of their faces, and out of Brahma's, poured a great light.",
      },
      {
        kind: 'read',
        text: 'Then light streamed out of Indra, and out of every other god as well. All of it flowed together into one. It looked like a mountain of fire, blazing in every direction. And that light, gathered from all the gods, became a woman. Her brilliance filled the three worlds.',
      },
      {
        kind: 'read',
        text: "Each part of her came from a different god's light. Her face came from Shiva, her arms from Vishnu, her three eyes from Agni, the fire god.",
      },
      {
        kind: 'read',
        text: 'Then every god gave her a gift. Shiva drew a trident out of his own trident and gave it to her. Vishnu did the same with his discus. Indra gave his thunderbolt, and the bell from his great elephant. Varuna gave a conch, Agni a spear, the wind a bow and arrows. Time itself gave a sword and shield. The Ocean gave jewels and a lotus. And the mountain king, Himavat, gave her a lion to ride.',
      },
      { kind: 'parent', text: 'Pause: ask, "If you had been one of the gods, what would you have wanted to give?"' },
      {
        kind: 'read',
        text: 'The Devi laughed, again and again, and she roared. The sky filled with the sound. The worlds shook, the seas churned, the mountains trembled. And the gods shouted: victory!',
      },
      { kind: 'read', text: 'Far away, in his stolen kingdom, Mahishasura heard it.' },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were Mahishasura, what would you do? Charge straight at it, send your generals, find out what it is first, or give heaven back and make peace?"',
      },
      {
        kind: 'read',
        text: 'He shouted in anger, "What is this?" and rushed towards the sound with his whole army. And he saw her: filling the three worlds with light, her feet bending the earth, her crown touching the sky.',
      },
      {
        kind: 'parent',
        text: "For the parent: the next part is a battle, and it ends with Mahishasura's death. Read it calmly. If your child asks why a goddess kills, say that the old texts see it as setting the world right, not as revenge. The gods praise her for being merciful in her heart even while she fights. It is never a model for hurting people we're angry with.",
      },
      {
        kind: 'read',
        text: 'His generals came at her one after another, with chariots and elephants and horses. As she fought, every breath she let out became an army of helpers. Her lion charged through the enemy ranks, and the generals fell.',
      },
      {
        kind: 'read',
        text: 'Then Mahishasura himself came, as a huge buffalo. The ground shook under his hooves. His horns tore at mountains and clouds. She caught him in her noose. He became a lion. Then a man with a sword. Then an elephant. Then a buffalo again. Each time, she met him.',
      },
      {
        kind: 'read',
        text: 'She drank from the cup that never empties, and she laughed. Roar for a moment, she told him, while I drink. Soon the gods will be the ones roaring, for joy.',
      },
      {
        kind: 'read',
        text: 'Then she leapt onto him, pressed her foot on his neck, and struck with her trident. Half of him struggled out of the buffalo in his own shape. And with her sword, she ended his life.',
      },
      {
        kind: 'read',
        text: 'His army fled. The gods rejoiced, the sages praised her, and the heavens filled with music. The gods asked her for just one thing: whenever we call on you in trouble, please come. And she said yes.',
      },
      { kind: 'parent', text: 'Pause: give a moment of quiet. Ask: "How are you feeling about that?" Then go on.' },
      {
        kind: 'read',
        text: 'Some old texts say the gods\' light gathered at the hermitage of a sage called Katyayana, and he gave it form. So she is called Katyayani, the daughter of Katyayana. Later in the same story, the gods praise her by that name, and pray to her gentle face with its three eyes.',
      },
      {
        kind: 'read',
        text: 'In pictures she rides a lion. She holds a sword and a lotus. One open hand is raised, which means "do not fear". The other is lowered, which means "I give". Fierce and gentle at once.',
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "Which part of the story will you remember?"' },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 10 minutes)' },
      { kind: 'read', text: "Tonight's word is courage. When something is wrong, stand up to it, and stand together." },
      {
        kind: 'read',
        text: 'Mahisha had driven the gods out of heaven, and each of them, alone, had lost. Their shared anger at the injustice blazed out as light and gathered into one form: the Devi. The Devi Mahatmya says she is eternal and simply appears when she is needed. Each god then gave her his own weapon, trusting her with what he couldn’t win alone. In a popular telling (not in the Devi Mahatmya), Mahisha had asked that only a woman could kill him, because he thought no woman could. In this story, courage isn’t the absence of fear. It’s refusing to accept a wrong, and it’s strongest when it’s shared. Often it comes from exactly where the arrogant weren’t looking.',
      },
      {
        kind: 'read',
        text: "Now, Hogwarts. This is from *Order of the Phoenix*, chapters fifteen to eighteen. It's in the film too.",
      },
      {
        kind: 'read',
        text: "It's Harry's fifth year. Voldemort is back, but the Ministry insists he isn't, the newspapers call Harry a liar, and the new Defence teacher, Professor Umbridge, teaches from a book with no spells at all. Hermione has had enough: if nobody will teach them to defend themselves, they should teach themselves, and Harry should be the teacher. Harry protests that he was lucky and always had help. At the Hog's Head, a grubby pub, he expects a handful of people, and about two dozen students turn up from three different houses. Zacharias Smith wants proof, others list what Harry has done, and they all sign Hermione's parchment, promising to keep it secret. When a new rule bans every group Umbridge hasn't approved, Dobby tells Harry about a hidden room that appears when you really need it. There Ginny points out that \"D.A.\" could stand for Dumbledore's Army, the thing the Minister fears most, and they begin with the Disarming Charm.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          "Notice: what did the students need that school wasn't giving them?",
          "Feel: how might it feel to be called a liar in the newspapers when you know you're telling the truth?",
          "Wonder: why didn't Harry want to teach at first?",
          'Stretch: the gods gave their power to one figure; the students each learned for themselves. When trouble comes, which is better?',
          "Connect: the gods' anger became light. What did the students' anger become?",
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Harry did everything", try: "Who had the idea? Who suggested the name?" If they say "Anger is bad", try: "The gods\' anger made the Devi. Is it the anger, or what you do with it?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Anger is the best fuel for doing something" or "Anger should cool down before you act". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. You play Zacharias Smith, arms folded: why should I trust you? Your child plays Harry and has 60 seconds to persuade you, without boasting. Then swap. Ask: "What actually persuaded you?"',
      },
      {
        kind: 'read',
        text: "One thing to hold on to. The gods gave their power to the Devi, and she fought. The students didn't hand their power to Harry. Each of them had to learn to do it themselves.",
      },
      {
        kind: 'read',
        text: "Now a second scene, from *Philosopher's Stone*, chapter sixteen, \"Through the Trapdoor\". It's at the end of the first film, though the film leaves out the potion riddle.",
      },
      {
        kind: 'read',
        text: "It's the end of Harry's first year, and Harry, Ron and Hermione are sure someone will try to steal the Philosopher's Stone tonight while Dumbledore is away. Below a trapdoor, a plant wraps itself around them, and Hermione beats the Devil's Snare with fire. In a room of flying keys, Harry, the Seeker, catches the one that fits the door. On a giant chessboard Ron, the best player, sees that one of them must be taken for Harry to win, and he chooses himself. Hermione solves a riddle of potion bottles, but there is only enough for one person to go on, and she tells Harry that friendship and bravery matter more than books and cleverness. She goes back for Ron, and Harry goes on alone. At the end-of-year feast, Dumbledore gives points to all three, then ten more to Neville for standing up to his friends, and those ten win the House Cup.",
      },
      {
        kind: 'read',
        text: "Remember the gods' gifts? Cleverness, flying and chess, each needed exactly once. Nobody could have got through alone.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: which obstacle did each friend get past, and why that person?',
          'Feel: what do you think Ron felt as he chose to be taken?',
          'Stretch: in the end Harry went on alone. Was it really a team effort?',
          'Turn it around: Neville tried to stop them that night. Was his gift part of the team too?',
          "Connect: the gods handed over their weapons. The friends kept their skills. What's the difference?",
        ],
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "It only worked because each did their own part" or "In the end, it came down to one person".',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 2 minutes. Freeze at Ron\'s decision. You play Ron, arguing for the sacrifice, for 45 seconds. Your child plays Harry, arguing against it. Ask: "Was there a third option either of us missed?"',
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 5 minutes)' },
      { kind: 'read', text: "Let's put the stories next to each other. There's no single right answer to any of these." },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'The gods gave their power away to one figure. The DA students grew their own. Which kind of joining together is stronger?',
          "Anger started both the Devi's story and the DA. What turned it into something useful?",
          'Ron gave up his place. The gods gave up their weapons. What does it cost to give your best thing to a shared purpose?',
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: "Imagine two people in your class keep messing about, and the teacher keeps giving the whole class detention. Everyone's angry. Nobody alone can change it.",
      },
      {
        kind: 'read',
        text: 'Some people would write a polite letter and get everyone to sign it. Some would go to the teacher in a small group, calmly. Some would tell their parents. Some would talk to the two classmates first. And some would say: accept it, because complaining will only make it worse.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "Which of these turns the class\'s anger into something useful? Which might make things worse?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Why do you think the gods hadn\'t joined together sooner?" and "The DA kept meeting after student groups were banned. Was breaking that rule justified?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "What is one thing our family could do together that none of us could do alone?"',
      },
      { kind: 'read', text: "Tonight's word is courage. When something is wrong, stand up to it, and stand together." },
      {
        kind: 'read',
        text: "Tomorrow the battles grow darker. The Devi takes her most fearsome form, Kalaratri, the dark night. And we'll look closely at her hands.",
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight.",
      },
    ],
    timing:
      'about 10 minutes for Part 1, 10 for Part 2 and 5 for Part 3, so about 25 minutes in all. A short evening takes about 16: no choice questions, one scene, two ladder questions, and no side by side.',
  },

  // The closing (Closing in src/visuals/day6/Reflection.tsx draws it).
  closing: {
    seconds: 13,
    raga: 'bhupali', // the series' home raga: the night ends in devotion
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
