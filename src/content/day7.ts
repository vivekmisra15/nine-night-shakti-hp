// Night 7: Kalaratri, the dark night.
//
// All text is copied from docs/nights/night-7.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-7.md.

import type { Night } from './types';

export const day7: Night = {
  number: 7,
  devi: 'Kalaratri',
  title: 'Kalaratri, the dark night',
  summary:
    'Night 7 takes about 25 minutes, or about 16 as a short evening. Its question: can something terrifying be on your side? The night tells two battles from the Devi Mahatmya: Kali against the generals Chanda and Munda, and the demon Raktabija, who multiplies every time he is wounded. Then it meets Kalaratri, the darkest of the nine forms, whose raised hand says "do not fear". Two Harry Potter scenes follow: Lupin\'s boggart lesson, and Snape\'s memories in "The Prince\'s Tale".',
  atAGlance: [
    {
      lead: 'Intensity',
      text: "some peril; the second Hogwarts scene is intense. The battles include killing, told as the texts tell them, without gore. Read the parent notes in Beat 4 and Beat 12 before you begin. Beat 12 has a gentle alternative (the Grim is Sirius) if you'd rather use it.",
    },
    {
      lead: 'The one thing to protect',
      text: 'Kalaratri is never "the scary bad one". She is fierce and wholly good, and her open hand of protection is the centre of the night.',
    },
    {
      lead: 'Short evening (about 16 minutes)',
      text: "the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, the boggart in the wardrobe with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the choices' questions, The Prince's Tale (or its gentle alternative) and its Think it through, and Side by side.",
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves these out (every choice's question is left out
  // anyway). Beat 6's "what happens" is left out too: "the story carries on
  // in Beat 7".
  shortEveningLeavesOut: ['n7-b6:choiceReveal', 'n7-b12', 'n7-b12g', 'n7-b13', 'n7-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n7-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'n7darkNight',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'malkauns', bpm: 54, layers: ['drone', 'motif'] },
      },
      points: [
        {
          lead: 'Last night',
          text: "the gods' anger blazed out as light and joined into one Devi, Katyayani, who defeated the buffalo-demon Mahishasura. We met Dumbledore's Army, and three friends who could only pass the trapdoor together.",
        },
        {
          lead: "Tonight's form",
          text: 'Kalaratri. *Kala* means time, and also black; *ratri* means night. She is the darkest and fiercest of the nine forms, and she is also called Shubhankari, "the one who does good". Tonight asks how both can be true at once.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b2',
      sourceRows: [0, 1],
      number: 2,
      type: 'story',
      title: 'The order to seize her',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 5,
        palette: 'n7goldenPeak', // turns to n7darkNight as her face darkens
        camera: 'aerial', // then lowAngle on the peak
        music: { palette: 'indian', raga: 'marwa', bpm: 66, layers: ['drone', 'motif'] },
        freezeAfterLine: [9], // hold on the darkened flame
      },
      intro:
        'The battles follow the Devi Mahatmya (part of the Markandeya Purana), chapters 5–8. In these chapters the Devi is called Ambika ("Mother"), Chandika ("the fierce one") and, once, Katyayani. The Devi Mahatmya does not tell a separate story of "Kalaratri". Linking Kalaratri with Kali and the Raktabija battle is devotional and Navaratri tradition, and Beat 8 says so.',
      paragraphs: [
        "Two demon brothers, Shumbha and Nishumbha, had taken over the three worlds and driven out the gods. Their servants Chanda and Munda saw a radiant Devi in the Himalayas and told Shumbha about her. Shumbha sent a messenger: come and be my wife. She replied that she had made a vow long ago. She would marry only someone who defeated her in battle (Devi Mahatmya ch. 5). Shumbha sent a general, Dhumralochana, to drag her back by force, and she burned him to ash with a single sound (ch. 6). Then Shumbha gave Chanda and Munda a great army and an order: bring her here, by her hair if you must, or tie her up (ch. 6). They found her seated on her lion on a golden mountain peak, smiling. With swords drawn and bows bent, they moved in to seize her. The Devi's face grew dark as ink with anger (ch. 7, verses 3–5).",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b3',
      sourceRows: [2],
      number: 3,
      type: 'choice',
      title: 'What will she do with her anger?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n7darkNight',
        camera: 'still',
        music: { palette: 'indian', raga: 'marwa', bpm: 56, layers: ['drone', 'percussion'] },
      },
      setup: 'an army is coming to drag the Devi away by force. Her face has gone dark with anger.',
      ask: 'what do you think a protector should do with anger like that?',
      options: [
        {
          text: 'Stay calm and hide it',
          acknowledgement: 'Calm is powerful, and it keeps you in control. But is anger that is hidden really gone?',
        },
        {
          text: 'Let it all out, at everything',
          acknowledgement: 'Anger at an attack like this feels fair. The question is where it lands.',
        },
        {
          text: 'Give it a shape and aim it only at the attackers',
          acknowledgement: 'Anger with a purpose and a target. That is close to what the story does.',
        },
        {
          text: 'Walk away from the fight',
          acknowledgement: 'Leaving is sometimes wise. Notice that the gods have nowhere left to go.',
        },
      ],
      whatHappens: 'the anger takes a form of its own. Beat 4 tells it.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b4',
      sourceRows: [2, 3],
      number: 4,
      type: 'story',
      title: 'From the darkened brow',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 7,
        palette: 'n7smokeBattle',
        camera: 'lowAngle', // then pullBack
        music: { palette: 'indian', raga: 'marwa', bpm: 84, layers: ['drone', 'motif', 'percussion', 'strings'] },
        slowMo: { line: 6, seconds: 3 }, // the two generals dissolve into ash
      },
      // The bell pulses at the start, and again as Chanda and Munda attack
      // (sentence 5), just before Kali strikes them down.
      parentNoteAgainAtLine: 5,
      parentNote: [
        'The Devi Mahatmya describes Kali as truly terrifying: gaunt, wide-mouthed, roaring, wearing a garland of skulls. Tell it plainly but without lingering. The text is describing power, not cruelty.',
        'Tradition worships Kali as a mother. Her fierceness is aimed only at what attacks the world, never at the people who come to her. Say this plainly if your child seems frightened.',
        'Some families find the imagery too much for a younger child. You can say "a fierce, dark form of the Devi" and leave out the details.',
        'If your child is frightened, point ahead to Beat 8: the form we worship tonight raises her hand and says "do not fear".',
      ],
      paragraphs: [
        'From the furrowed brow of the Devi\'s forehead sprang Kali. She was dark and gaunt, with a wide mouth, sunken red eyes and a roar that filled every direction. She carried a sword and a noose, and wore a tiger skin and a garland of skulls (ch. 7, verses 5–8). She rushed into the army. The text describes her swallowing elephants with their riders and chariots with their horses, and catching the enemy\'s weapons in her mouth (ch. 7, verses 9–15). Chanda and Munda attacked her together. She struck both generals down and brought their heads to the Devi as an offering from the "sacrifice of battle". The Devi answered her gently. Because you have brought me Chanda and Munda, she said, you will be known in the world as Chamunda (ch. 7, verses 23–27).',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b5',
      sourceRows: [4, 5],
      number: 5,
      type: 'story',
      title: 'The demon who multiplied',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 8,
        palette: 'n7matrikas', // turns to n7smokeBattle as the copies fill the sky
        camera: 'pan', // then pullBack to a wide
        music: { palette: 'indian', raga: 'marwa', bpm: 92, layers: ['drone', 'motif', 'percussion', 'strings'] },
        freezeAfterLine: [10], // hold on the sky full of copies
      },
      paragraphs: [
        'Shumbha, furious, sent out every army he had (ch. 8, verses 2–7). Now the powers of the gods came out of their bodies and joined the Devi, each in the god\'s own form: Brahmani on a swan, Maheshvari on a bull, Kaumari on a peacock, Vaishnavi on Garuda, Varahi as a boar, Narasimhi as a lion and Aindri on an elephant. They are called the Matrikas, the Mothers (ch. 8, verses 12–21). The demon army began to break. Then a demon called Raktabija stepped forward. His name means "blood-seed". Every drop of his blood that fell to the ground rose up as a new demon, just as big and just as strong (ch. 8, verse 41). Aindri struck him with her thunderbolt, and a crowd of new Raktabijas sprang up. Vaishnavi struck him with her discus, and thousands more appeared. Every Mother struck him, and every blow made it worse. Soon the whole world was filled with copies of him, and the gods were afraid (ch. 8, verses 42–52).',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b6',
      sourceRows: [5],
      number: 6,
      type: 'choice',
      title: 'Every blow makes more',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n7smokeBattle',
        camera: 'still',
        music: { palette: 'indian', raga: 'marwa', bpm: 54, layers: ['drone', 'strings'] },
      },
      setup: 'you are one of the Mothers. Each time you strike Raktabija, the battlefield fills with more of him.',
      ask: 'what do you do?',
      options: [
        {
          text: 'Strike harder and faster',
          acknowledgement: 'It is what the Mothers have been doing. The story suggests that more of the same can make things worse.',
        },
        {
          text: 'Stop and pull back',
          acknowledgement: "Stopping a plan that isn't working takes courage. But Raktabija won't stop.",
        },
        {
          text: 'Try something completely different',
          acknowledgement: 'If the problem is the drops, maybe the answer is about the drops, not the demon.',
        },
        {
          text: 'Work with someone else in a new way',
          acknowledgement: 'Not just more help: different jobs for different people. Hold on to that.',
        },
      ],
      whatHappens: 'the last two together. See Beat 7.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b7',
      sourceRows: [6],
      number: 7,
      type: 'story',
      title: 'Before it touches the ground',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 9, // falls to 5 as the sky clears
        palette: 'n7smokeBattle', // clears to n7darkNight
        camera: 'still', // then crane up as the sky clears
        music: { palette: 'indian', raga: 'marwa', bpm: 96, layers: ['drone', 'motif', 'percussion', 'strings'] },
        slowMo: { line: 6, seconds: 4 }, // the drops caught before they land
      },
      paragraphs: [
        "Chandika saw the gods' despair and laughed. She turned to Kali. Chamunda, she said, open your mouth wide. When I strike him, catch every drop before it can touch the ground, and swallow the demons born from it. Then no more will be born, and he will fall (ch. 8, verses 53–56). So they worked together. Chandika struck, and Kali caught each drop before it could land. Raktabija's mace could not hurt Chandika. With no new demons rising, Raktabija weakened and fell. The gods rejoiced (ch. 8, verses 57–63). The battle against Shumbha and Nishumbha themselves is still to come (chapters 9–10).",
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b8',
      sourceRows: [7, 8, 9, 10, 11, 12, 13],
      number: 8,
      type: 'story',
      title: 'The one who does good',
      label: 'tradition',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n7kalaratri',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'malkauns', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
        freezeAfterLine: [7], // the open hand, before the hotspots
      },
      paragraphs: [
        'On the seventh night of Navaratri, the Devi is worshipped as Kalaratri. The Devi Kavacham lists her seventh among the nine forms. Her name is far older than the festival. In the very first chapter of the Devi Mahatmya, Brahma praises the Devi as *kalaratri*, *maharatri* and *moharatri*: the night of time, the great night, and the night of delusion (ch. 1, verse 75). In Navaratri worship she is dark as the night sky, with loose hair and three bright eyes, and flames come from her breath. She rides a donkey. Two of her four hands hold weapons. The other two make the gestures of *abhaya*, "do not fear", and *varada*, "I give". Devotees call her Shubhankari, "the one who does good", and say she makes those who worship her fearless. Many Navaratri tellings say Kalaratri is the form that destroyed Raktabija. That link is devotional tradition; the Devi Mahatmya itself names Kali and Chamunda.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn). The features are tradition; their meanings are interpretation',
      hotspots: [
        {
          id: 'abhaya',
          symbol: 'Raised open hand (abhaya mudra)',
          meaning:
            '"Do not fear." The most important thing in the picture. Her fierceness faces the danger; her open palm faces you.',
          label: 'interpretation',
        },
        {
          id: 'varada',
          symbol: 'Lowered open hand (varada mudra)',
          meaning: 'Giving and blessing. The fierce form is also a generous one.',
          label: 'interpretation',
        },
        {
          id: 'weapons',
          symbol: 'Weapons (a curved sword, and an iron hook or thunderbolt; descriptions vary)',
          meaning: 'Cutting through what harms: often read as ignorance, ego and fear.',
          label: 'interpretation',
        },
        {
          id: 'colour',
          symbol: 'Dark colour',
          meaning:
            "The night, and time (*kala*), which swallows everything and holds everything. Not a judgement on anyone's skin; tomorrow's night returns to this.",
          label: 'interpretation',
        },
        {
          id: 'eyes',
          symbol: 'Three eyes',
          meaning: 'She sees past, present and future; the third eye is often read as wisdom.',
          label: 'interpretation',
        },
        {
          id: 'hair',
          symbol: 'Loose hair and fiery breath',
          meaning: "Untamed power, not bound by anyone's rules.",
          label: 'interpretation',
        },
        {
          id: 'donkey',
          symbol: 'Donkey',
          meaning: 'A humble, patient animal that others look down on. The fiercest form rides the humblest mount.',
          label: 'interpretation',
        },
        {
          id: 'garland',
          symbol: 'Garland bright as lightning',
          meaning: 'Light flashing in the darkest night.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition)',
        text: 'in the Devi Mahatmya, the name Kalaratri first appears in a hymn about sleep, not battle. Brahma praises the Devi as the deep sleep that holds Vishnu, and asks her to release him so he can wake and fight two demons (ch. 1). So the "dark night" is first a night of rest, which wakes into protection.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b9',
      number: 9,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'n7darkNight',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Fearlessness',
        idea: 'Face the dark without becoming part of it.',
        description:
          'Kalaratri is the darkest form: unbound hair, three blazing eyes, fire on her breath. Yet she’s called Shubhankari, “the one who does good”, and her raised hand says “do not fear”. Her fierceness is aimed at what harms, not at the people she protects. In the Raktabija story, every blow made the demon multiply. Kali didn’t strike harder. She caught each drop before it reached the ground. Fearlessness, in this reading, isn’t fighting the dark louder. It’s facing it steadily, refusing to feed it, and not letting it change you.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b10',
      sourceRows: [14, 15, 16, 17, 18],
      number: 10,
      type: 'sceneIntro',
      title: 'The boggart in the wardrobe',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n7boggartRoom',
        camera: 'drift', // pushIn on sentence 3, still for the tea
        music: { palette: 'hogwarts', bpm: 72, layers: ['drone', 'motif', 'percussion'] },
        slowMo: { line: 3, seconds: 3 }, // the boggart turns to the full moon
      },
      reference:
        'Harry. *Prisoner of Azkaban*, chapter 7, "The Boggart in the Wardrobe", and chapter 8, "Flight of the Fat Lady". Film: *Prisoner of Azkaban* (2004), Lupin\'s first lesson and a later talk with Harry.',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "in the book, Lupin steps in before the boggart takes any shape for Harry. In the film, it briefly becomes a dementor in front of Harry, and then Lupin steps in. The film keeps the later talk, and the idea that Harry fears fear itself, almost unchanged. It moves the talk out of Lupin's office, and adds Lupin speaking about Harry's mother.",
      retelling: [
        'It\'s Harry\'s third year, and Professor Lupin takes the class to a rattling wardrobe. Inside is a boggart, which becomes whatever you fear most, and the real weapon against it, Lupin says, is laughter: you say "Riddikulus" and picture your fear as something funny. Neville\'s worst fear is Professor Snape, so Lupin helps him imagine Snape in his grandmother\'s clothes, and the room roars. When the boggart reaches Harry, Lupin steps in front of him before it can change, and for Lupin it becomes the full moon, which he banishes. Harry wonders if Lupin thought he couldn\'t cope. Later, over tea, Lupin says he expected Voldemort, and didn\'t want that in a crowded classroom; Harry says he thought of the dementors. Lupin, quietly impressed, says that means what Harry fears most is fear itself. Much later, Harry learns why Lupin\'s boggart was the moon: Lupin is a werewolf.',
      ],
      connection: {
        similar:
          'fear is faced, not avoided. A guardian steps between a young person and the thing he fears most. And Lupin himself is someone the wizarding world fears, who spends the year protecting Harry.',
        different: [
          'Riddikulus *shrinks* a fear by making it silly. Kalaratri is never made smaller or laughed at. Her fearsomeness is itself the protection, and she is revered in her full form.',
          'Lupin removes fear by turning it into a joke. Kalaratri removes fear by being fiercer than the danger, and on your side.',
          "Lupin is a person with a fear of his own. Kalaratri is a Devi; she is fear's ending, not its target.",
          "Lupin hides his darkness out of shame and fear of rejection. Kalaratri's darkness is open and worshipped.",
        ],
        whyItHelps:
          "a pre-teen knows what it's like to be afraid. This scene asks whether a fear should be laughed at or respected, which is exactly where the two stories part.",
        strength: { rating: 'strong', text: "The question of how to face fear matches closely; the methods deliberately don't." },
        themeLink:
          "Lupin carries something many people fear, being a werewolf, yet he spends the year teaching children to face what frightens them, and steps in front of Harry's fear himself. The dark is part of his life, but he doesn't let it make him into what people fear.",
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b11',
      sourceRows: [14, 15],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 2,
        palette: 'n7boggartRoom',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Lupin say was the real weapon against a boggart? What did he do when it reached Harry?' },
        { step: 'Feel', question: 'Harry was protected, and felt let down. Why might being protected feel like being doubted?' },
        { step: 'Wonder', question: "why might Harry's worst fear be fear itself, rather than Voldemort?" },
        { step: 'Stretch', question: 'Lupin spent his life being feared. Did that make him better or worse at helping others with their fears?' },
        { step: 'Turn it around', question: "tell the lesson from Neville's side. His worst fear walked the corridors every day." },
        {
          step: 'Connect',
          question: 'Riddikulus makes a fear small. Kalaratri stays huge and fierce, and says "do not fear". Which way of facing fear makes more sense to you, and when?',
        },
      ],
      followUps: [
        {
          ifTheySay: 'Laughing at fears is best',
          tryAsking: "Can you think of a fear that shouldn't be laughed at? What is it protecting you from?",
        },
        {
          ifTheySay: 'Lupin should have let Harry try',
          tryAsking: 'What might have happened in a crowded room? Was Lupin protecting Harry, or the class, or both?',
        },
        { ifTheySay: 'Kalaratri is scary', tryAsking: 'Scary to whom? Look at her raised hand. Who is it facing?' },
        {
          ifTheySay: "Lupin is like Kalaratri, a scary thing that's good",
          tryAsking: 'Lupin is a person who hides what he is, and is ashamed of it. Is Kalaratri ashamed of anything?',
        },
      ],
      stance: {
        left: 'Fears should be laughed at until they shrink',
        right: "Some fears deserve respect: they're protecting us",
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: 'laugh it small, or stand beside it?',
        minutes: 3,
        text: 'Together, list four everyday fears, such as spiders, the dark, a big test or deep water. For each, take 20 seconds to decide: is this a fear to make ridiculous, or a fear to respect and face with someone beside you? Did you ever disagree? Why?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b12',
      sourceRows: [19, 20, 21, 22, 23, 24],
      number: 12,
      type: 'sceneIntro',
      title: "The Prince's Tale",
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 7,
        palette: 'n7pensieve',
        camera: 'crane', // down into the basin, drift through the memories, pullBack at the end
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [4], // the silver light
      },
      // The bell pulses at the start, and again before the memory of Lily's
      // family dying (sentence 2).
      parentNoteAgainAtLine: 2,
      parentNote: [
        'This scene follows Snape\'s death. In the book, Voldemort has his snake attack Snape in the Shrieking Shack, and Harry watches him die (*Deathly Hallows* ch. 32, "The Elder Wand"). The film moves this to a boathouse. The retelling below mentions it in one sentence.',
        "The memories include Lily's death, and Dumbledore telling Snape that Harry must die. Tonight's scene stops there; Harry's walk into the forest belongs to other nights.",
        'The memories also include Snape calling Lily a cruel name for Muggle-born people. The retelling does not repeat the word.',
        'This beat is about a hard question, not a verdict. Snape protected Harry for years, and he was genuinely cruel to children. Let both stay true. Don\'t let it slide into "he was secretly good, so the cruelty didn\'t count", or into "he was cruel, so nothing he did counts".',
        'If your child isn\'t ready for this tonight, use the gentle alternative after this beat: the huge black dog Harry takes for the Grim, an omen of death, turns out to be his godfather Sirius (*Prisoner of Azkaban* ch. 17–19, "Cat, Rat and Dog", "Moony, Wormtail, Padfoot and Prongs" and "The Servant of Lord Voldemort"; PoA film).',
      ],
      reference:
        'Snape. *Deathly Hallows*, chapter 33, "The Prince\'s Tale", following chapter 32, "The Elder Wand". Film: *Deathly Hallows Part 2* (2011), the Pensieve sequence. Snape\'s cruelty: *Philosopher\'s Stone* ch. 8, "The Potions Master"; *Prisoner of Azkaban* ch. 7 and ch. 22, "Owl Post Again"; *Goblet of Fire* ch. 18, "The Weighing of the Wands".',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film's memory sequence is much shorter than the chapter. It adds a moment not in the book: Snape at Godric's Hollow, holding Lily's body. It leaves out most of the context for Snape's cruelty, so the film alone makes him easier to forgive. Use the book's fuller picture for tonight's discussion.",
      retelling: [
        "Snape is dying, and he gives Harry his memories to pour into the Pensieve. Harry sees Snape as a scruffy boy who befriends Lily, Harry's mother, until, humiliated, he calls her a cruel name for people born to Muggles, and she ends the friendship. Later, as a Death Eater, Snape passes Voldemort part of a prophecy, then begs Dumbledore to protect Lily's family, but they die anyway. Snape agrees to protect Lily's son, on one condition: no one must ever know. When Dumbledore tells him Harry must die at the right moment, Snape is appalled, and casts his Patronus, a silver doe: he has loved Lily all along. So the teacher who seemed to hate Harry had protected him for seven years. But Snape also picked on Harry from his first lesson, frightened Neville so much that Neville's boggart was Snape, mocked Hermione when a curse made her teeth grow, and let slip that Lupin was a werewolf. Years later, Harry names a son after him.",
      ],
      connection: {
        similar: 'a cold, frightening exterior hides years of protection, revealed only at the end.',
        different: [
          'Kalaratri is fearsome *and* wholly good; her fierceness *is* her kindness. Snape was genuinely cruel, to Neville, to Hermione, to Lupin and to Harry. Protecting one person does not cancel cruelty to others.',
          "Kalaratri's fierceness is aimed only at what harms. Snape's harshness landed on children.",
          'Kalaratri shows her kindness openly: the "do not fear" hand is on the front of every image. Snape hid his, and asked for it to stay hidden.',
          'Snape protected Harry out of love for Lily and guilt over his own part in her death. Kalaratri protects everyone who comes to her.',
          'Kalaratri is a Devi, worshipped today. Snape is a fictional, deeply flawed man, and we never present him as her equivalent.',
        ],
        whyItHelps:
          "it tests tonight's big idea against a hard case. If a terrifying face can hide protection, can it also hide cruelty? Kalaratri shows a fierceness with no cruelty in it. Snape shows how rare that is.",
        strength: { rating: 'strong', text: 'The hidden protection matches; the cruelty is the crucial difference.' },
        themeLink:
          "Snape faced the dark for years, spying among Death Eaters to keep Harry alive. But the theme also asks us not to let the dark change us, and his cruelty to children shows how much of it he carried. That is where he and tonight's idea part.",
      },
    },

    // -----------------------------------------------------------------------
    // The gentle alternative, shown instead of The Prince's Tale when the
    // parent chooses it on the night's first screen.
    {
      id: 'n7-b12g',
      gentleFor: 'n7-b12',
      sourceRows: [25],
      number: 12,
      type: 'sceneIntro',
      title: 'The Grim',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 4,
        palette: 'n7grimNight',
        camera: 'drift', // crane down into the tunnel, slow pushIn in the room
        music: { palette: 'hogwarts', bpm: 66, layers: ['drone', 'motif'] },
        slowMo: { line: 6, seconds: 3 }, // the third wand of light moves between
        freezeAfterLine: [7], // the wands lowered, warm light
      },
      reference:
        'Harry. *Prisoner of Azkaban*, chapters 17–19, "Cat, Rat and Dog", "Moony, Wormtail, Padfoot and Prongs" and "The Servant of Lord Voldemort". Film: *Prisoner of Azkaban* (2004).',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      retelling: [
        "All year, Harry has glimpsed a huge black dog, and he fears it is the Grim, an omen of death. One night the dog drags Ron through a tunnel under the Whomping Willow, and Harry and Hermione follow it to the Shrieking Shack. There the dog turns into a man: Sirius Black, the escaped prisoner Harry believes betrayed his parents to Voldemort. Harry is ready to fight him. Then Lupin arrives, and he and Sirius reveal the truth: the real traitor was Peter Pettigrew, who has been hiding for years as Ron's pet rat. Sirius is innocent, and he is Harry's godfather. When Sirius and Lupin move to kill Pettigrew, Harry stops them, saying his father wouldn't have wanted his best friends to become killers. Pettigrew is to be handed to the dementors instead.",
      ],
      connection: {
        similar:
          'something Harry takes for a sign of death turns out to be on his side. Kalaratri, the darkest and most frightening form, is wholly on the side of those who come to her.',
        different: [
          "Harry's fear came from a mistake: he misread what he saw. Kalaratri's fierceness is not a mistake. It is real, and it is itself the protection.",
          'Harry had to guess what the dog meant. Kalaratri shows what she means: her "do not fear" hand is in every picture.',
          'Kalaratri is a Devi, worshipped today. Sirius is a fictional man, and we never present him as her equivalent.',
        ],
        whyItHelps: "it asks tonight's question, can something terrifying be on your side, through a scene with no death in it.",
        strength: { rating: 'partial', text: 'A frightening shape that turns out to protect matches; the reason for the fear does not.' },
        themeLink:
          'in the Shrieking Shack Harry faces the man he thinks betrayed his parents, and then the one who really did. When he could let Pettigrew be killed, he refuses. It is a real hook for facing the dark without becoming part of it, though Harry is a boy making one hard choice, not a Devi.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b13',
      sourceRows: [20, 22],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 2,
        palette: 'n7pensieve',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Snape ask for when he agreed to protect Harry? Why do you think he wanted it kept secret?' },
        { step: 'Feel', question: 'how might Harry have felt coming out of the Pensieve, after years of hating Snape?' },
        { step: 'Wonder', question: 'why was Snape so harsh to Harry, if he was protecting him?' },
        { step: 'Stretch', question: "Snape's own mistake, passing on the prophecy, helped put Lily in danger. Does that change how we see his protection?" },
        { step: 'Turn it around', question: "tell the story of Snape from Neville's side. Does knowing about Lily change anything for Neville?" },
        { step: 'Connect', question: 'Kalaratri\'s "do not fear" hand is shown to everyone. Snape hid his protection. Does it matter whether kindness is visible?' },
      ],
      followUps: [
        { ifTheySay: 'Snape was good all along', tryAsking: 'Was he good to Neville? Can someone be brave and cruel at the same time?' },
        { ifTheySay: 'Snape was just horrible', tryAsking: 'Then why did Harry name his son after him? What did Harry know that we might forget?' },
        {
          ifTheySay: "Snape's like Kalaratri, scary but on your side",
          tryAsking: "Was Snape's fierceness aimed at what harms people, or at children? Where does Kalaratri's fierceness land?",
        },
        {
          ifTheySay: 'He was mean because of how James treated him',
          tryAsking: 'Does being bullied explain bullying others? Does it excuse it?',
        },
      ],
      stance: {
        left: 'What Snape did for Harry outweighs how he treated people',
        right: 'Nothing he did for Harry makes up for how he treated Neville and others',
        note: 'Each person places a named marker and explains it in one sentence.',
      },
      activity: {
        title: 'the two witnesses',
        minutes: 4,
        text: 'One person speaks for 60 seconds as Harry, after the Pensieve, about what Snape did for him. The other speaks for 60 seconds as Neville, about what Potions lessons were like. Then swap roles and do it again. Afterwards, ask: were both witnesses telling the truth?',
      },
      // With the gentle alternative (the Grim). The doc gives no follow-ups
      // for it, so the Snape ones are hidden rather than shown out of place.
      gentle: {
        ladder: [
          { step: 'Notice', question: 'what did Harry think the black dog meant?' },
          { step: 'Feel', question: 'how might it feel to find that the shape you dreaded was your godfather?' },
          { step: 'Wonder', question: 'why do you think Harry was so ready to believe it was an omen of death?' },
          { step: 'Stretch', question: 'Harry judged the dog by how it looked. When is that a sensible way to stay safe, and when does it go wrong?' },
          { step: 'Turn it around', question: 'imagine being feared because of how you look or what you are, as the dog was, and as Lupin was.' },
          {
            step: 'Connect',
            question: "Kalaratri looks terrifying and is wholly on your side. The Grim looked like death and was Harry's godfather. What is the same, and what is different?",
          },
        ],
        followUps: [],
        stance: {
          left: "If something looks frightening, keep away: it's safer",
          right: 'Find out what it really is before you decide',
        },
        activity: {
          title: 'second looks',
          minutes: 3,
          text: 'Each person has 60 seconds to describe something that frightened them at first and turned out to be harmless, or even on their side. Afterwards, ask: what changed, the thing itself or the way you saw it?',
        },
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b14',
      number: 14,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n7darkNight',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'Kalaratri looks terrifying and is wholly good. Lupin looks gentle and is feared for what he is. Snape looks cold, and was both cruel and protective. Which of them matches their outside?',
        'Riddikulus makes a fear small. Kalaratri is worshipped in her full fierceness. Why might a tradition choose *not* to make her smaller?',
        "Raktabija multiplied every time he was hit. Harry's worst fear was fear itself. Is fear one of those things that grows when you fight it head-on?",
        "Kalaratri's fierceness is aimed only at what harms. Does where fierceness lands matter more than how fierce it is?",
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'Kalaratri is a Devi, worshipped today, and her fierceness is understood as sacred and wholly good. Lupin and Snape are fictional, flawed people. We compare the question, what lies behind a frightening face, not the figures.',
      gentle: {
        questions: [
          "Kalaratri looks terrifying and is wholly good. Lupin looks gentle and is feared for what he is. The black dog looked like an omen of death and was Harry's godfather. Which of them matches their outside?",
          'Riddikulus makes a fear small. Kalaratri is worshipped in her full fierceness. Why might a tradition choose *not* to make her smaller?',
          "Raktabija multiplied every time he was hit. Harry's worst fear was fear itself. Is fear one of those things that grows when you fight it head-on?",
          "Kalaratri's fierceness is aimed only at what harms. Does where fierceness lands matter more than how fierce it is?",
          'Name one difference between these stories so big that we should never forget it.',
        ],
        doesntCompare:
          'Kalaratri is a Devi, worshipped today, and her fierceness is understood as sacred and wholly good. Lupin and Sirius are fictional people. We compare the question, what lies behind a frightening face, not the figures.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b15',
      number: 15,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n7darkNight',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 60, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The rumour that keeps multiplying.',
          setup:
            'Someone in your year says you copied your project. You deny it in the group chat, and three more people start repeating it. Every reply seems to make it spread further.',
          perspectives: [
            '"Deny it everywhere, loudly. Silence looks like guilt."',
            '"Stop replying. A rumour needs attention to survive."',
            '"Talk privately to the person who started it."',
            '"Show your teacher your drafts, and let the facts do the work."',
            '"Make a joke of it so nobody takes it seriously."',
          ],
          ask: 'which of these feed the rumour, and which catch it before it lands?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n7-b16',
      number: 16,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 2,
      direction: {
        intensity: 1,
        palette: 'n7darkNight', // the pearl before dawn arrives in the closing
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'Kalaratri is the darkest form, and she says "do not fear". What does that hand mean to you?',
        'Raktabija got stronger every time he was hit. What finally worked?',
      ],
      goDeeper: [
        'Does protecting someone cancel being cruel to others? Think of Snape, and of Neville.',
        'Should fears be laughed at, or respected? Is there a fear that deserves both?',
        "Is anger something you *are*, or something you *have*? What does Kali's story suggest?",
        "Lupin was feared for something he couldn't help. Snape was feared for how he behaved. Is one of those fairer than the other?",
      ],
      together: 'what is something that frightens one of us, and what would "do not fear" look like from the other?',
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: 'after the darkest night comes radiance: Mahagauri, shining white after long effort.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'Kalaratri is never "the scary bad one". Keep coming back to her raised hand: "do not fear".',
      "Tell the battles as the texts tell them, without gore. Kali's fierceness is aimed only at what attacks the world.",
      'Riddikulus shrinks fear; Kalaratri does not shrink. That difference is the real lesson of the first scene.',
      "Snape's protection does not cancel his cruelty, and his cruelty does not erase his protection. Let both stand, and let your child weigh them.",
    ],
    sources: [
      { claim: 'Shumbha and Nishumbha; Chanda and Munda report the Devi; her vow', source: 'Devi Mahatmya ch. 5', label: 'Tradition', confidence: 'High' },
      { claim: 'Dhumralochana burned by a sound; Chanda and Munda ordered to seize her', source: 'Devi Mahatmya ch. 6 (vv. 13, 22–24)', label: 'Tradition', confidence: 'High' },
      { claim: "Ambika's face darkens; Kali springs from her brow; her appearance", source: 'Devi Mahatmya ch. 7, vv. 5–8', label: 'Tradition', confidence: 'High' },
      { claim: 'Kali defeats the army and the generals; named Chamunda', source: 'Devi Mahatmya ch. 7, vv. 9–27', label: 'Tradition', confidence: 'High' },
      { claim: 'The Matrikas emerge', source: 'Devi Mahatmya ch. 8, vv. 12–21', label: 'Tradition', confidence: 'High' },
      { claim: "Raktabija's blood-drops become new demons", source: 'Devi Mahatmya ch. 8, vv. 41–52', label: 'Tradition', confidence: 'High' },
      { claim: 'Chandika tells Chamunda to catch the blood; Raktabija falls', source: 'Devi Mahatmya ch. 8, vv. 53–62', label: 'Tradition', confidence: 'High' },
      {
        claim: '"Kalaratri" in Brahma\'s hymn, praising the Devi as Vishnu\'s sleep',
        source: 'Devi Mahatmya ch. 1, v. 75 (numbering as on hindupad.com)',
        label: 'Tradition',
        confidence: 'High',
      },
      { claim: 'Kalaratri as the seventh of the nine forms', source: 'Devi Kavacham', label: 'Tradition', confidence: 'High' },
      {
        claim: "Kalaratri's iconography: dark, loose hair, three eyes, fiery breath, donkey, abhaya and varada",
        source: 'Navaratri devotional tradition',
        label: 'Tradition (devotional)',
        confidence: 'High',
      },
      { claim: 'Her two weapons (sword; hook or thunderbolt)', source: 'Devotional descriptions', label: 'Tradition (devotional)', confidence: 'Medium; descriptions vary' },
      { claim: 'The name Shubhankari, and making devotees fearless', source: 'Devotional tradition', label: 'Tradition (devotional)', confidence: 'High' },
      {
        claim: 'Kalaratri as the slayer of Raktabija',
        source: 'Popular Navaratri tellings',
        label: 'Tradition (popular)',
        confidence: 'Labelled as such; the text names Kali and Chamunda',
      },
      { claim: 'Meanings of the symbols; Raktabija as desire or habit', source: 'Devotional readings', label: 'Interpretation', confidence: 'Medium' },
      { claim: "The boggart lesson; Neville's boggart is Snape; Lupin's is the moon", source: '*Prisoner of Azkaban* ch. 7; 2004 film', label: 'Hogwarts', confidence: 'High' },
      { claim: "Lupin's talk: fearing fear itself", source: '*Prisoner of Azkaban* ch. 8; 2004 film', label: 'Hogwarts', confidence: 'High' },
      { claim: "Film: Harry's boggart becomes a dementor before Lupin steps in", source: '2004 film', label: 'Hogwarts', confidence: 'Medium-high (scene summaries)' },
      { claim: "Film: the talk moves out of Lupin's office and mentions Lily", source: '2004 film transcript', label: 'Hogwarts', confidence: 'Medium' },
      { claim: 'Lupin a werewolf', source: '*Prisoner of Azkaban* ch. 17–18', label: 'Hogwarts', confidence: 'High' },
      { claim: "Snape's death", source: '*Deathly Hallows* ch. 32 (Shrieking Shack); DH Part 2 film (boathouse)', label: 'Hogwarts', confidence: 'High' },
      { claim: "Snape's memories", source: '*Deathly Hallows* ch. 33; DH Part 2 film', label: 'Hogwarts', confidence: 'High' },
      { claim: "Film adds Snape holding Lily's body", source: 'DH Part 2 film', label: 'Hogwarts', confidence: 'High' },
      { claim: "Snape's cruelty", source: "*Philosopher's Stone* ch. 8; *Prisoner of Azkaban* ch. 7, 22; *Goblet of Fire* ch. 18", label: 'Hogwarts', confidence: 'High' },
      { claim: 'James bullies Snape', source: '*Order of the Phoenix* ch. 28', label: 'Hogwarts', confidence: 'High' },
      { claim: 'Albus Severus; Snape among the bravest', source: '*Deathly Hallows* epilogue', label: 'Hogwarts', confidence: 'High' },
      { claim: 'Gentle alternative: the Grim is Sirius', source: '*Prisoner of Azkaban* ch. 17–19; 2004 film', label: 'Hogwarts', confidence: 'High' },
    ],
    footnote: 'All Harry Potter lines are paraphrased; there are no direct quotations.',
  },

  // -------------------------------------------------------------------------
  // The read-aloud script (T key)
  // -------------------------------------------------------------------------
  readAloud: {
    intro:
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 16 as a short evening: on a short evening, skip the two choice questions (read on to what happens), the second scene (from the parent note before "Now a second scene" to the end of its activity, or the gentle alternative) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 11 minutes)' },
      {
        kind: 'parent',
        text: "Before you start: decide whether you'll use The Prince's Tale in Part 2, which follows Snape's death, or the gentler Grim scene. Both are in the script.",
      },
      {
        kind: 'read',
        text: "Last night, the gods' anger blazed out as light and became one Devi, Katyayani, who defeated the buffalo-demon. Tonight is the seventh night, and the darkest.",
      },
      {
        kind: 'read',
        text: 'Tonight the Devi is Kalaratri. *Kala* means time, and it also means black. *Ratri* means night. She is the fiercest of all nine forms. And people call her Shubhankari, "the one who does good". Tonight we find out how both can be true.',
      },
      { kind: 'parent', text: 'Pause: about 30 seconds. Optional: "What do you imagine when you hear \'the dark night\'?"' },
      {
        kind: 'read',
        text: 'Two demon brothers, Shumbha and Nishumbha, had taken over all three worlds and thrown the gods out. Their servants, Chanda and Munda, saw a shining Devi in the Himalayas and told Shumbha about her.',
      },
      {
        kind: 'read',
        text: "Shumbha sent a message: come and be my wife. The Devi answered calmly. Long ago, she said, I made a vow. I'll marry only someone who defeats me in battle.",
      },
      {
        kind: 'read',
        text: 'Shumbha sent a general to drag her back. She burned him to ash with a single sound. So Shumbha gave Chanda and Munda a huge army, and an order: bring her here, by her hair if you must.',
      },
      {
        kind: 'read',
        text: "They found her sitting on her lion on a golden mountain peak, smiling. They drew their swords and bent their bows, and moved in to seize her. And the Devi's face grew dark as ink with anger.",
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "What should a protector do with anger like that? Stay calm and hide it, let it all out, give it a shape and aim it only at the attackers, or walk away?" Listen to the reasons.',
      },
      {
        kind: 'parent',
        text: 'For the parent: the next part describes Kali as truly fierce. Read it steadily, without lingering. If your child seems frightened, say that Kali is worshipped as a mother, and her fierceness is only ever aimed at what attacks the world. You can leave out the details if you need to.',
      },
      {
        kind: 'read',
        text: "From the Devi's furrowed brow sprang Kali. She was dark and gaunt, with a wide mouth, red eyes and a roar that filled the sky. She carried a sword and a noose, and wore a tiger skin and a garland of skulls.",
      },
      {
        kind: 'read',
        text: "She rushed into the army. The old text says she swallowed elephants with their riders, and chariots with their horses, and caught the enemy's weapons in her mouth. Chanda and Munda attacked her together. She struck both of them down, and brought their heads to the Devi as an offering of victory.",
      },
      {
        kind: 'read',
        text: 'The Devi spoke to her gently. Because you have brought me Chanda and Munda, she said, you will be known as Chamunda.',
      },
      { kind: 'parent', text: 'Pause: ask, "How did the anger in this story behave? Was it wild, or aimed?"' },
      {
        kind: 'read',
        text: 'Shumbha was furious. He sent out every army he had. And now the powers of the gods came out of their bodies to join the Devi, each looking like the god it came from. One rode a swan, one a bull, one a peacock, one the eagle Garuda, one an elephant. One was a boar, and one a lion. They are called the Mothers.',
      },
      {
        kind: 'read',
        text: 'The demons began to break. Then a demon called Raktabija stepped forward. His name means "blood-seed". Every drop of his blood that touched the ground rose up as a new Raktabija, just as big and just as strong.',
      },
      {
        kind: 'read',
        text: 'One Mother struck him with a thunderbolt, and a crowd of new demons sprang up. Another struck him with a discus, and thousands more appeared. Every blow made it worse. Soon the whole world was full of him, and the gods were afraid.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "You\'re one of the Mothers. Every time you strike, there\'s more of him. What do you do? Strike harder, pull back, try something completely different, or work with someone else in a new way?"',
      },
      {
        kind: 'read',
        text: 'The Devi looked at the frightened gods, and laughed. She turned to Kali. Open your mouth wide, she said. When I strike him, catch every drop before it touches the ground.',
      },
      {
        kind: 'read',
        text: 'So they worked together. The Devi struck, and Kali caught every drop before it could land, and swallowed every new demon as it appeared. No more copies rose. Raktabija weakened, and fell. The gods rejoiced.',
      },
      {
        kind: 'read',
        text: 'On the seventh night of Navaratri, people worship the Devi as Kalaratri. Many Navaratri tellings say she is the one who stopped Raktabija. The old text itself names Kali and Chamunda, so that link comes from devotion.',
      },
      {
        kind: 'read',
        text: 'In pictures, Kalaratri is as dark as the night sky. Her hair is loose, she has three bright eyes, and flames come from her breath. She rides a donkey, a humble animal that others look down on. Two of her hands hold weapons. And the other two? One gives blessings. The other is raised, palm open, towards you. It means "do not fear".',
      },
      { kind: 'parent', text: 'Pause: ask, "Her fierceness faces the danger. Who does her open hand face?"' },
      {
        kind: 'read',
        text: 'Her name is even older than these battles. In the very first chapter of the same text, the god Brahma praises the Devi as "the night of time", while she holds Vishnu in deep sleep. So the dark night begins as a night of rest. Then it wakes, and protects.',
      },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 10 minutes)' },
      { kind: 'read', text: "Tonight's word is fearlessness. Face the dark without becoming part of it." },
      {
        kind: 'read',
        text: 'Kalaratri is the darkest form: unbound hair, three blazing eyes, fire on her breath. Yet she’s called Shubhankari, “the one who does good”, and her raised hand says “do not fear”. Her fierceness is aimed at what harms, not at the people she protects. In the Raktabija story, every blow made the demon multiply. Kali didn’t strike harder. She caught each drop before it reached the ground. Fearlessness, in this reading, isn’t fighting the dark louder. It’s facing it steadily, refusing to feed it, and not letting it change you.',
      },
      { kind: 'read', text: "Now, Hogwarts. This is from *Prisoner of Azkaban*, chapters seven and eight. It's in the film too." },
      {
        kind: 'parent',
        text: 'In the film, the boggart briefly becomes a dementor in front of Harry before Lupin steps in. In the book, Lupin steps in before it can change.',
      },
      {
        kind: 'read',
        text: 'It\'s Harry\'s third year, and Professor Lupin takes the class to a rattling wardrobe. Inside is a boggart, which becomes whatever you fear most, and the real weapon against it, Lupin says, is laughter: you say "Riddikulus" and picture your fear as something funny. Neville\'s worst fear is Professor Snape, so Lupin helps him imagine Snape in his grandmother\'s clothes, and the room roars. When the boggart reaches Harry, Lupin steps in front of him before it can change, and for Lupin it becomes the full moon, which he banishes. Harry wonders if Lupin thought he couldn\'t cope. Later, over tea, Lupin says he expected Voldemort, and didn\'t want that in a crowded classroom; Harry says he thought of the dementors. Lupin, quietly impressed, says that means what Harry fears most is fear itself. Much later, Harry learns why Lupin\'s boggart was the moon: Lupin is a werewolf.',
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Lupin say was the real weapon against a boggart?',
          'Feel: Harry was protected, and felt let down. Why might being protected feel like being doubted?',
          "Wonder: why might Harry's worst fear be fear itself?",
          'Stretch: Lupin spent his life being feared. Did that make him better at helping others with fear?',
          'Connect: Riddikulus makes a fear small. Kalaratri stays huge and says "do not fear". Which makes more sense to you, and when?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Kalaratri is scary", try: "Scary to whom? Who is her raised hand facing?" If they say "Lupin is like Kalaratri", try: "Lupin hides what he is and is ashamed of it. Is Kalaratri ashamed of anything?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Fears should be laughed at until they shrink" or "Some fears deserve respect: they\'re protecting us". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. List four everyday fears together. For each, take 20 seconds to decide: laugh it small, or respect it and face it with someone beside you?',
      },
      {
        kind: 'read',
        text: "Here's the big difference to hold on to. Riddikulus makes a fear smaller by making it silly. Nobody ever makes Kalaratri smaller, or laughs at her. Her fierceness *is* the protection, and she's worshipped exactly as she is.",
      },
      {
        kind: 'parent',
        text: 'For the parent: the next scene follows Snape\'s death, and touches on Lily\'s death and on Dumbledore\'s plan that Harry must die. Read it calmly. If your child isn\'t ready for it tonight, skip to the scene below marked "Gentle alternative". Either way, don\'t hand your child a verdict on Snape.',
      },
      {
        kind: 'read',
        text: 'Now a second scene, from *Deathly Hallows*, chapter thirty-three, "The Prince\'s Tale". It\'s in the second *Deathly Hallows* film.',
      },
      {
        kind: 'read',
        text: "Snape is dying, and he gives Harry his memories to pour into the Pensieve. Harry sees Snape as a scruffy boy who befriends Lily, Harry's mother, until, humiliated, he calls her a cruel name for people born to Muggles, and she ends the friendship. Later, as a Death Eater, Snape passes Voldemort part of a prophecy, then begs Dumbledore to protect Lily's family, but they die anyway. Snape agrees to protect Lily's son, on one condition: no one must ever know. When Dumbledore tells him Harry must die at the right moment, Snape is appalled, and casts his Patronus, a silver doe: he has loved Lily all along. So the teacher who seemed to hate Harry had protected him for seven years. But Snape also picked on Harry from his first lesson, frightened Neville so much that Neville's boggart was Snape, mocked Hermione when a curse made her teeth grow, and let slip that Lupin was a werewolf. Years later, Harry names a son after him.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Snape ask for when he agreed to protect Harry?',
          'Wonder: why was Snape so harsh to Harry, if he was protecting him?',
          "Stretch: Snape's own mistake helped put Lily in danger. Does that change how we see his protection?",
          "Turn it around: tell the story from Neville's side. Does knowing about Lily change anything for Neville?",
          'Connect: Kalaratri shows her "do not fear" hand to everyone. Snape hid his protection. Does it matter whether kindness is visible?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Snape was good all along", try: "Was he good to Neville?" If they say "Snape was just horrible", try: "Then why did Harry name his son after him?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "What Snape did for Harry outweighs how he treated people" or "Nothing he did for Harry makes up for how he treated Neville and others".',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 4 minutes. One of you speaks for 60 seconds as Harry after the Pensieve; the other speaks for 60 seconds as Neville, about Potions lessons. Then swap. Ask: "Were both of them telling the truth?"',
      },
      {
        kind: 'read',
        text: "Here's the difference that matters most tonight. Kalaratri is fierce *and* wholly good. Her fierceness only ever faces what harms. Snape protected Harry, and he was also truly cruel to children. One doesn't cancel the other.",
      },
      {
        kind: 'parent',
        text: 'Gentle alternative, instead of The Prince\'s Tale. Read: "Here\'s a different scene, from *Prisoner of Azkaban*, chapters seventeen to nineteen. It\'s in the film too. All year, Harry has glimpsed a huge black dog, and he fears it is the Grim, an omen of death. One night the dog drags Ron through a tunnel under the Whomping Willow, and Harry and Hermione follow it to the Shrieking Shack. There the dog turns into a man: Sirius Black, the escaped prisoner Harry believes betrayed his parents to Voldemort. Harry is ready to fight him. Then Lupin arrives, and he and Sirius reveal the truth: the real traitor was Peter Pettigrew, who has been hiding for years as Ron\'s pet rat. Sirius is innocent, and he is Harry\'s godfather. When Sirius and Lupin move to kill Pettigrew, Harry stops them, saying his father wouldn\'t have wanted his best friends to become killers. Pettigrew is to be handed to the dementors instead." Then choose two or three: "What did Harry think the black dog meant?", "Harry judged the dog by how it looked. When is that sensible, and when does it go wrong?", "Kalaratri looks terrifying and is wholly on your side. The Grim looked like death and was Harry\'s godfather. What is the same, and what is different?" STANCE LINE: "If something looks frightening, keep away: it\'s safer" or "Find out what it really is before you decide". ACTIVITY: 3 minutes. Each of you has 60 seconds to describe something that frightened you at first and turned out to be harmless, or even on your side. Ask: "What changed, the thing itself or the way you saw it?" Say: "Harry\'s fear came from a mistake. Kalaratri\'s fierceness is no mistake: it is real, and it protects."',
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 4 minutes)' },
      { kind: 'read', text: "Let's put the stories next to each other. There's no single right answer to any of these." },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'Kalaratri looks terrifying and is wholly good. Lupin looks gentle and is feared. Snape looks cold, and was both cruel and protective. Which of them matches their outside?',
          'Why might a tradition choose not to make Kalaratri smaller, the way Riddikulus makes a fear smaller?',
          'Is fear one of those things, like Raktabija, that grows when you fight it head-on?',
          'Does where fierceness lands matter more than how fierce it is?',
          "What's one difference between these stories we should never forget?",
        ],
      },
      {
        kind: 'parent',
        text: 'With the gentle alternative: "…The black dog looked like an omen of death and was Harry\'s godfather. Which of them matches their outside?"',
      },
      {
        kind: 'read',
        text: "Remember: Kalaratri is a Devi, and people worship her today. Lupin and Snape are characters in a book, and both are flawed. We're comparing a question, not the figures.",
      },
      { kind: 'parent', text: 'With the gentle alternative, say "Lupin and Sirius are characters in a book".' },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: 'Imagine someone in your year says you copied your project. You deny it in the group chat, and three more people start repeating it. Every reply seems to make it spread.',
      },
      {
        kind: 'read',
        text: 'Some people would say deny it everywhere, loudly, because silence looks like guilt. Some would stop replying, because a rumour needs attention to live. Some would talk privately to the person who started it. Some would show the teacher their drafts and let the facts speak. And some would make a joke of it.',
      },
      { kind: 'parent', text: 'PAUSE: ask, "Which of these feed the rumour, and which catch it before it lands?"' },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "Kalaratri is the darkest form, and she says \'do not fear\'. What does that hand mean to you?" and "Does protecting someone cancel being cruel to others?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "What\'s something that frightens one of us, and what would \'do not fear\' look like from the other?"',
      },
      { kind: 'read', text: "Tonight's word is fearlessness. Face the dark without becoming part of it." },
      {
        kind: 'read',
        text: 'And after the darkest night comes the light. Tomorrow, the Devi shines white and radiant after long effort: Mahagauri.',
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight.",
      },
    ],
    timing:
      "about 11 minutes for Part 1, 10 for Part 2 and 4 for Part 3, so about 25 minutes in all. A short evening takes about 16: the choices' set-ups and outcomes without the questions, one scene, two ladder questions, and no side by side.",
  },

  // The closing (Reflection.tsx draws it: the night lightens to the pearl
  // before dawn and the open hand becomes a spark).
  closing: {
    seconds: 13,
    // Bhupali: the pearl light before dawn, a hint that light returns (the brief's closing raga).
    raga: 'bhupali',
    captions: [
      { at: 0, text: 'a low flute phrase' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
