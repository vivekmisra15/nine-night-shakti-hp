// Night 8: Mahagauri, the great bright one.
//
// All text is copied from docs/nights/night-8.md. To change the wording,
// change the doc first, then copy it here.
// The `direction` values come from docs/direction/night-8.md.

import type { Night } from './types';

export const day8: Night = {
  number: 8,
  devi: 'Mahagauri',
  title: 'Mahagauri, the great bright one',
  summary:
    "Night 8 takes about 25 minutes, or about 17 as a short evening. Its question: how does someone become new again after a long, dark stretch, and who decides when they have changed? The night tells how a careless word sent the Devi into long tapas, and how she became Gauri, the bright one. Then come two Harry Potter scenes: Kreacher's tale and what follows it, and Ron's return in the Forest of Dean.",
  atAGlance: [
    {
      lead: 'Intensity',
      text: "gentle overall. Kreacher's tale includes Regulus Black's death in the cave (some peril). Ron's return has some peril: Harry nearly drowns, and the locket torments Ron. Short parent notes (the bell) come with both.",
    },
    {
      lead: 'Read first',
      text: 'the "For the parent" note in Beat 2 about skin colour. It is not optional. Some tellings of tonight\'s story go from dark to fair, and that needs saying plainly.',
    },
    {
      lead: 'Short evening (about 17 minutes)',
      text: "the opening, the story (Beats 2–8; each choice shows its set-up and what happened, without the question), the theme, Kreacher's tale with its Think it through (choose two of the six ladder questions; keep the activity), and Reflect. It leaves out the choice questions, the silver doe and its Think it through, and Side by side.",
    },
    {
      lead: 'Book only',
      text: "Kreacher's change is in the books, not the films. Retell it fully; a child who knows the films best may not know it at all.",
    },
    {
      lead: 'Labels',
      text: 'every beat carries one: *tradition*, *interpretation*, *contemporary*, *comparison*, *hogwarts* or *hypothetical*.',
    },
  ],

  // The short evening leaves out the silver doe, its Think it through, and
  // Side by side. (Every choice's question is left out on a short evening
  // anyway; its set-up and what happened are shown as story.)
  shortEveningLeavesOut: ['n8-b12', 'n8-b13', 'n8-b14'],

  beats: [
    // -----------------------------------------------------------------------
    {
      id: 'n8-b1',
      number: 1,
      type: 'opening',
      title: 'Before we begin',
      label: 'contemporary',
      minutes: 2,
      direction: {
        intensity: 2,
        palette: 'n8prabhasaCoast',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif'] },
      },
      // The night file has no heading line for this opening.
      points: [
        {
          lead: 'Last night',
          text: 'we met Kalaratri, the dark night. In the Devi Mahatmya (ch. 7–8) the Devi defeats Chanda and Munda, and then Raktabija, whose every drop of blood became a new demon. She is the fiercest of the nine forms, yet one of her hands says "do not fear".',
        },
        {
          lead: "Tonight's form (tradition)",
          text: 'Mahagauri, "the great bright one", worshipped on the eighth night, Ashtami. After the darkest night comes the calmest, brightest form: dressed in white, riding a white bull. Her story is about a long, slow renewal after a hurt.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b2',
      sourceRows: [0, 1, 11],
      number: 2,
      type: 'story',
      title: 'A name that stung',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'kailasa',
        camera: 'still', // then a slow drift
        music: { palette: 'indian', raga: 'bageshri', bpm: 60, layers: ['drone', 'motif'] },
        // Sentence numbers: the bracketed note and "Once, he says…" read as
        // one sentence (1), so "She did not hear it as one." is sentence 3.
        freezeAfterLine: [3],
      },
      intro:
        'The main telling follows the Skanda Purana, Prabhasa Khanda (Prabhasa-kshetra-mahatmya, ch. 68). Beat 7 gives the other tellings, including one that runs the opposite way.',
      // The bell pulses at the start, and again just before Shiva calls her
      // "Kali" (sentence 1, which begins with the bracketed note).
      parentNoteAgainAtLine: 1,
      parentNote: [
        'Tonight\'s story, in most tellings, goes from dark to fair. In a world of fairness creams and remarks about skin, a child can easily hear "fair is better" or "fair is purer". The story does not mean that, and you should say so out loud.',
        'Traditional readings are about inner purification: *tapas* literally means heat, the heat of discipline that burns away what clouds the mind. The brightness is a picture of clarity, not a skin colour.',
        "The texts themselves don't treat dark as lesser. Last night's Kalaratri is dark and worshipped with equal reverence. In the Devi Mahatmya (ch. 5) it is the other way round: Parvati *becomes* dark, as Kalika. Kali is among the most loved forms of the Devi, especially in Bengal. Rama and Krishna are described as dark, and Draupadi's name Krishnaa means \"the dark one\".",
        'In the Skanda Purana the hurt starts with a joke about her colour, and the story takes that hurt seriously. That is worth noticing too.',
        "Say plainly: the colour of someone's skin says nothing about their goodness, their cleverness or their beauty. If your child has heard comments about skin colour, at school or in the family, tonight is a good night to talk about it.",
      ],
      paragraphs: [
        'In the Skanda Purana it is Shiva himself who tells this story, to the Devi, about her own earlier life. (In that chapter she is Sati, in the birth before Parvati; other tellings place it in Parvati\'s life.) Once, he says, in a pleasant place, he called her "Kali", the dark one. He meant it as a joke. She did not hear it as one. She frowned, and she was angry, and she spoke harshly to him. (Skanda Purana, Prabhasa Khanda 68.1–6)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b3',
      sourceRows: [0],
      number: 3,
      type: 'choice',
      title: 'What would you do?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'kailasa',
        camera: 'still',
        music: { palette: 'indian', raga: 'bageshri', bpm: 56, layers: ['drone'] },
      },
      setup: 'someone who loves you makes a joke about you. They mean it lightly. It stings.',
      ask: 'if you were the Devi, what would you do?',
      options: [
        {
          text: "Laugh it off: he's only joking",
          acknowledgement: 'Jokes between people who love each other can be light. But a joke only works if both people are laughing.',
        },
        {
          text: 'Tell him straight that it hurt',
          acknowledgement: "Honest and direct. That is close to what she did: she spoke sharply and didn't hide it.",
        },
        {
          text: 'Go away and think',
          acknowledgement: 'Some hurts need distance before anything else. She does go, a long way.',
        },
        {
          text: 'Answer with a joke of your own',
          acknowledgement: 'Quick, and it makes you equal. Would it heal the hurt, or just add a second one?',
        },
      ],
      whatHappens:
        "she said that since she had been mocked as dark, she would go to a place where she would become Gauri, the bright one. She left with her companions for Prabhasa, the sacred coast near Somnath in today's Gujarat. (SkP 68.6–8)",
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b4',
      sourceRows: [0, 9],
      number: 4,
      type: 'story',
      title: 'The grove of tapas',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 3,
        palette: 'n8tapasSeasons',
        camera: 'still', // then a slow pull back
        music: { palette: 'indian', raga: 'bageshri', bpm: 52, layers: ['drone', 'strings'] },
        slowMo: { line: 6, seconds: 6 }, // "Season followed season."
      },
      paragraphs: [
        'At Prabhasa she set up a Shiva linga and worshipped it. Then she began tapas: the long, hard practice of discipline and prayer. She stood on one foot beside the linga, repeating sacred words. In summer she sat between five fires. In the rains she lay under the open sky. In early winter she stood in water. Season followed season. (SkP 68.8–10)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b5',
      sourceRows: [0],
      number: 5,
      type: 'story',
      title: 'Gauri',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 5,
        palette: 'n8gauriRadiance',
        camera: 'pushIn',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
        freezeAfterLine: [1], // "she shone in every limb"
      },
      paragraphs: [
        'Slowly, the radiance of her body grew. After a long time she shone in every limb. Then Shiva came. He laughed, and called her "Gauri, Gauri", the bright one, over and over. He asked her to get up and come home, and he offered her a boon: anything she wished. (SkP 68.11–13)',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b6',
      sourceRows: [2],
      number: 6,
      type: 'choice',
      title: 'What would you ask for?',
      label: 'hypothetical',
      minutes: 1.5,
      direction: {
        intensity: 3,
        palette: 'n8gauriRadiance',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone', 'motif'] },
      },
      ask: 'Shiva offers her any wish. He started all this with his joke. What would you ask for?',
      options: [
        {
          text: 'An apology',
          acknowledgement:
            "Fair: he started it. The text doesn't record one. But notice who is telling this story against himself: Shiva.",
        },
        { text: 'Nothing: I did this for me', acknowledgement: "The change is its own reward. That's a strong position." },
        { text: 'Something for other people', acknowledgement: 'Turning a hard time into help for others. Hold that thought.' },
        {
          text: 'Something so this is never forgotten',
          acknowledgement: 'A marker, so the moment means something. Hold that thought too.',
        },
      ],
      whatHappens:
        'her wishes were for others, and for a marker. She asked that anyone who came to see her in that grove would have good fortune. She asked that families who brought music and dance there would be free from misery. She asked that those who worshipped there would reach the highest realm. Her last wish was that Shiva be known in that place as Gaurishvara, "Lord of Gauri". He agreed, and stayed there. Her new name became part of his. (SkP 68.14–17)',
      shortEveningFrom: 'She asked that anyone who came to see her in that grove would have good fortune.',
    },

    // -----------------------------------------------------------------------
    // Beat 7 is about 230 words, so it is told over two screens.
    {
      id: 'n8-b7a',
      sourceRows: [3, 4, 5],
      number: 7,
      type: 'story',
      title: 'Other tellings',
      label: 'tradition',
      minutes: 0.75,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'pan',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      paragraphs: [
        "The story is told in several ways, and they don't all agree.",
        '**Kalika Purana (ch. 47, as summarised by the scholar R. C. Hazra):** Kali is offended at being called dark in front of the apsaras, the heavenly dancers. Shiva gives her a golden complexion by bathing her in the waters of the heavenly Ganga. Earlier, the sage Narada had foretold that she would be golden and known as Gauri.',
        // The doc has *to check* in italics inside the bold lead; the text
        // display cannot show italics inside bold, so they are left out here.
        '**Shiva Purana (as commonly summarised; section *to check*):** Parvati does tapas to the creator, Brahma. He asks her to help the gods against the demons Shumbha and Nishumbha. Her dark outer sheath comes away and becomes a goddess, Kaushiki, and Parvati is left bright.',
      ],
    },
    {
      id: 'n8-b7b',
      sourceRows: [6, 7],
      number: 7,
      type: 'story',
      title: 'Other tellings',
      label: 'tradition',
      minutes: 0.75,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'pan', // then still, as the tellings draw together
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      paragraphs: [
        "**Popular Navaratri telling:** after her long tapas to win Shiva (Night 2), Parvati's body is dark with dust, sun and ash. Shiva, pleased with her, washes her with Ganga water until she shines white like the moon. This is popular devotional tradition; we have not found it in a Purana.",
        "**Devi Mahatmya, ch. 5 (near the end; verses 40–41 in the hindupad.com text, numbered differently in other editions):** this runs the other way. When the gods praise the Devi, Ambika comes out of Parvati's body-sheath and is called Kaushiki. Parvati herself becomes dark, is called Kalika, and lives on the Himalaya. Kaushiki goes on to fight Shumbha and Nishumbha, and last night's Kali springs from her brow (ch. 7).",
        '**What the tellings share:** the same Devi, dark and bright, in different orders. No telling says one colour is worth more than the other.',
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b8',
      sourceRows: [8, 9, 10],
      number: 8,
      type: 'story',
      title: 'Mahagauri',
      label: 'tradition',
      minutes: 1,
      direction: {
        intensity: 4,
        palette: 'n8gauriRadiance',
        camera: 'crane',
        music: { palette: 'indian', raga: 'bhupali', bpm: 60, layers: ['drone', 'motif', 'resolution'] },
      },
      paragraphs: [
        'On the eighth night she is worshipped as Mahagauri: *maha*, great, and *gauri*, the bright or fair one. She wears only white, rides a white bull, and has four arms. She is the gentlest form after the fiercest.',
      ],
      hotspotsLabel: 'Hotspots (tap to learn), all labelled interpretation',
      hotspots: [
        {
          id: 'cloth',
          symbol: 'White clothing',
          meaning: 'Peace and purity of mind. One of her names is Shvetambaradhara, "she who wears white".',
          label: 'interpretation',
        },
        {
          id: 'bull',
          symbol: 'White bull',
          meaning:
            "Steadiness and calm strength. The bull was Shailaputri's on Night 1 too: the journey comes round to the same steady ground.",
          label: 'interpretation',
        },
        {
          id: 'trident',
          symbol: 'Trident (upper right)',
          meaning: 'Often read as the three qualities of nature, or as creation, preservation and dissolution.',
          label: 'interpretation',
        },
        {
          id: 'damaru',
          symbol: 'Damaru, a small drum (upper left)',
          meaning: "Shiva's drum, whose beat is linked with the rhythm of creation and with sound itself.",
          label: 'interpretation',
        },
        {
          id: 'abhaya',
          symbol: 'Abhaya mudra (lower right)',
          meaning: 'The open palm that says "do not fear": the same gesture Kalaratri shows last night.',
          label: 'interpretation',
        },
        {
          id: 'varada',
          symbol: 'Varada mudra (lower left)',
          meaning: 'The lowered hand that gives blessings. Some images show a rosary here instead.',
          label: 'interpretation',
        },
      ],
      didYouKnow: {
        lead: 'Did you know? (tradition, regional practice)',
        text: 'many families honour young girls on Ashtami or Navami as living forms of the Devi. In much of North India this is Kanya Puja: girls are welcomed, their feet are washed, and they are given food and small gifts. In Bengal, Kumari Puja on Maha Ashtami is famous, for example at Belur Math near Kolkata. Families keep these customs differently.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b9',
      number: 9,
      type: 'idea',
      title: 'The theme',
      label: 'interpretation',
      minutes: 1,
      direction: {
        intensity: 2,
        palette: 'n8prabhasaCoast',
        camera: 'still',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif'] },
      },
      theme: {
        word: 'Renewal',
        idea: 'After a hard time, you can begin again, clearer than before.',
        description:
          'In a common devotional telling, Parvati’s long tapas left her covered in the dust and darkness of years outdoors. When Shiva accepted her, he washed her with the waters of the Ganga, and she shone radiant: Mahagauri, “the greatly bright one”. She’s pictured calm, dressed in white, riding a bull, with hands of fearlessness and blessing. Renewal here doesn’t mean pretending the hard time never happened. The tapas made her who she is. What washes away is the weight; what stays is what you learned. She’s linked with calm, forgiveness and fresh starts.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b10',
      sourceRows: [12, 13, 14, 15, 16, 17, 18],
      number: 10,
      type: 'sceneIntro',
      title: "Kreacher's tale",
      label: 'hogwarts',
      minutes: 2,
      direction: {
        intensity: 5,
        palette: 'n8grimmauldKitchen',
        camera: 'drift', // then a push-in on the locket
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [5], // the locket given
      },
      // The bell pulses at the start, and again just before Kreacher tells of
      // the cave (sentence 2).
      parentNoteAgainAtLine: 2,
      parentNote: [
        "Kreacher's tale describes a cave, a poisoned potion, and Regulus Black being dragged under dark water by the dead. The book tells it briefly and without gore. Read it calmly.",
      ],
      reference:
        '*Deathly Hallows*, chapter 10, "Kreacher\'s Tale"; chapter 11, "The Bribe"; chapter 12, "Magic is Might". Background: *Order of the Phoenix*, chapter 37, "The Lost Prophecy"; and *Deathly Hallows*, chapter 36, "The Flaw in the Plan".',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above. The film scene is short and does not show the change, so the retelling below carries this beat.',
      },
      filmNote: 'because the change is book only, read the retelling in full even if your child knows the films well.',
      retelling: [
        "It's the summer after Dumbledore's death, and Harry is hiding at Grimmauld Place with the house-elf Kreacher, whose lies helped lure him to the Ministry, where Sirius died. Harry orders Kreacher to tell the truth about the locket, and Kreacher tells his story. Voldemort took him to a cave by the sea, made him drink a potion that filled him with horror, and left him to die. Later Regulus, Sirius's younger brother, went back with him, drank the potion himself, and ordered Kreacher to destroy the real locket, which he never could. Hermione explains that Regulus was kind to Kreacher, and Sirius was harsh. So Harry speaks to him differently, and gives him the fake locket Regulus left behind. Days later Kreacher comes back clean, with Regulus's locket on his chest, and the gloomy kitchen is scrubbed and gleaming. In the final battle, he leads the house-elves out to fight, calling out Regulus's name. (DH ch. 10–12, 36)",
      ],
      connection: {
        intro: "the theme, renewal, and the night's question of who decides when someone has changed.",
        similar:
          "someone darkened by long hurt becomes bright again. Kreacher's outward change, the scrubbed kitchen and the care he takes, shows an inner one. And in both stories, words started it: Shiva's careless joke, and years of contempt from Sirius and others.",
        different: [
          "The Devi changes herself, through her own tapas. Kreacher's change is sparked by someone else's kindness and respect.",
          'The Devi was hurt by one careless joke. Kreacher was used, abandoned and despised for years.',
          "Kreacher is still a servant at the end. The books leave the house-elves' servitude unresolved, which is a hard question in itself. The Devi is no one's servant.",
          "Kreacher's brightness is cleanliness and care. It has nothing to do with colour, and we never link the two.",
          "In Kreacher's story the key choice is Harry's: to listen, and to treat him differently. In the Devi's story the choice is hers alone.",
        ],
        whyItHelps:
          'it asks a question a pre-teen can test against their own life: can being treated differently change who someone is?',
        strength: { rating: 'partial to strong', text: 'The renewal matches; who causes it does not.' },
        themeLink:
          'after years of grief for Regulus and a task he could never finish, Kreacher begins again once Harry listens: the kitchen is scrubbed, the meals are cooked, and in the end he fights in Regulus\'s name. His hard years are not wiped away; his loyalty to Regulus is what he carries forward.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b11',
      sourceRows: [12, 16],
      number: 11,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 3,
      direction: {
        intensity: 1,
        palette: 'n8grimmauldKitchen',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did Harry do differently after hearing Kreacher\'s story? What did he give him?' },
        { step: 'Feel', question: "what do you think Kreacher felt when Harry handed him Regulus's locket?" },
        { step: 'Wonder', question: "why had nobody listened to Kreacher's story before?" },
        {
          step: 'Stretch',
          question: "Kreacher's lies helped lead to Sirius's death. Does what happened to him excuse that, explain it, or neither?",
        },
        {
          step: 'Turn it around',
          question: "tell the scene from Kreacher's side. What does Harry look like to him, before and after?",
        },
        {
          step: 'Connect',
          question:
            'the Devi changed through her own long effort. Kreacher changed when someone treated him with respect. Which kind of change do you think lasts longer?',
        },
      ],
      followUps: [
        { ifTheySay: 'Kreacher was just evil', tryAsking: 'Was he evil, or was he loyal to the wrong people? Can it be both?' },
        {
          ifTheySay: 'Harry was just being nice to get the locket',
          tryAsking: 'Does it matter why he was kind, if the kindness was real? Did Kreacher think it was a trick?',
        },
        { ifTheySay: "Now he's happy, so it's fine", tryAsking: "He's happier. Is he free? Is that the same thing?" },
        {
          ifTheySay: 'The Devi and Kreacher both got cleaned up',
          tryAsking:
            "Careful: the Devi's brightness is about her inside, and it's not about colour. What actually changed inside Kreacher?",
        },
      ],
      stance: {
        left: 'Kreacher changed because of how he was treated',
        right: 'Kreacher changed because of who he already was',
        note: 'Each person places a named marker, then explains it in one sentence.',
      },
      activity: {
        title: "Sirius's side, Kreacher's side",
        minutes: 3,
        text: 'One person defends Sirius for 60 seconds: Kreacher was spiteful, loyal to a family that hated Sirius, and betrayed him. The other defends Kreacher for 60 seconds: he was used, ignored and despised. Then, together, take 60 seconds to agree on one sentence both of you can accept.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b12',
      sourceRows: [19, 20, 21, 22],
      number: 12,
      type: 'sceneIntro',
      title: 'The silver doe',
      label: 'hogwarts',
      minutes: 1.5,
      direction: {
        intensity: 6,
        palette: 'n8forestOfDean',
        camera: 'lowAngle', // on the pool, then a pull back
        music: { palette: 'hogwarts', bpm: 64, layers: ['drone', 'motif', 'strings'] },
        freezeAfterLine: [3], // Ron hauls Harry out
        slowMo: { line: 5, seconds: 4 }, // the sword comes down
      },
      // The bell pulses at the start, and again just before the locket's
      // chain tightens (sentence 2).
      parentNoteAgainAtLine: 2,
      parentNote: [
        "Harry nearly drowns, held down by the locket's chain. The locket then torments Ron with his worst fears, including a cruel vision of Harry and Hermione together. It is brief and not graphic.",
      ],
      reference:
        '*Deathly Hallows*, chapter 15, "The Goblin\'s Revenge" (Ron leaves), and chapter 19, "The Silver Doe". Film: *Deathly Hallows Part 1* (2010).',
      findScene: {
        lead: 'Find the scene',
        text: 'there is no link. Find it yourselves in your own copy of the book or film, using the reference above.',
      },
      filmNote:
        "the film keeps the doe, the frozen pool, Ron's rescue, the locket's attack on Ron, and Hermione's fury. Ron's explanation of how the Deluminator led him back is also in the film *(to check the wording)*. The choices discussed are the same in both.",
      retelling: [
        "Weeks earlier, Ron walked out: the locket had made them all bitter, and he was cold, hungry and jealous. Now, in the snowy Forest of Dean, Harry follows a silver doe made of light to a frozen pool with the Sword of Gryffindor at the bottom. He dives in, and the locket's chain tightens round his neck and drags at him. Someone hauls him out: it's Ron, soaking wet, holding the sword. Harry insists that Ron should destroy the locket, and when it opens, Voldemort's voice goes straight for Ron's worst fears: that his mother wanted a daughter more, and that Hermione prefers Harry. Ron hesitates, Harry shouts at him to strike, and Ron brings the sword down. Back at the tent Hermione is furious; Ron explains that he tried to return almost at once, and a light from the Deluminator led him back. Harry forgives him quickly; Hermione takes much longer. (DH ch. 15, 19)",
      ],
      connection: {
        intro: "the theme, renewal after a long, dark stretch, and the night's question of who decides when someone has changed.",
        similar:
          'both stories start with a hurt about how someone is seen. The Devi is mocked for her colour; Ron fears he is second-best. Each goes away. Each comes back changed. And in both, a welcome follows: Shiva calls her by her new name, and Harry takes Ron back.',
        different: [
          'Ron did something wrong: he abandoned his friends. The Devi was the one wronged, and her tapas is not making up for anything.',
          "Ron's darkness came partly from the locket and partly from his own jealousy. The Devi's tapas was a discipline she chose.",
          "Ron needed help to come back: the Deluminator, and the doe (later revealed to be Snape's Patronus, DH ch. 33). The Devi's renewal came from her own effort.",
          "Ron has to face the very thing that darkened him, and destroy it. The Devi doesn't fight anything; she becomes something.",
        ],
        whyItHelps:
          "it brings the night's question down to a real friendship. When someone comes back, who decides they've changed: them, or the people they left?",
        strength: { rating: 'partial to strong', text: 'Leaving, returning and being renewed match; the reasons for leaving do not.' },
        themeLink:
          'after weeks away, Ron comes back and faces the very fears the locket fed on, and destroys it. He begins again with his friends, clearer about where he belongs, though Hermione needs longer to trust the new start.',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b13',
      sourceRows: [19, 20],
      number: 13,
      type: 'think',
      title: 'Think it through',
      label: 'comparison',
      minutes: 2.5,
      direction: {
        intensity: 1,
        palette: 'n8forestOfDean',
        camera: 'still',
        music: { palette: 'hogwarts', bpm: 60, layers: ['drone'] },
      },
      ladder: [
        { step: 'Notice', question: 'what did the locket say to Ron, and why do you think it chose those things?' },
        { step: 'Feel', question: 'what might Ron have felt walking back towards the tent?' },
        { step: 'Wonder', question: 'why did Harry forgive so fast, and Hermione so slowly?' },
        { step: 'Stretch', question: 'the locket made Ron worse. Is he still responsible for leaving?' },
        { step: 'Turn it around', question: "tell the return from Hermione's side. She stayed. What did those weeks cost her?" },
        {
          step: 'Connect',
          question:
            "the Devi went away hurt and came back bright. Ron went away angry and came back different. What made each one's change real?",
        },
      ],
      followUps: [
        {
          ifTheySay: "Ron was just under the locket's power",
          tryAsking: 'Then why did Harry and Hermione, who wore it too, stay?',
        },
        { ifTheySay: 'Hermione should just forgive him', tryAsking: 'Is forgiving quickly always kinder? Who is it kinder to?' },
        {
          ifTheySay: 'He saved Harry, so that makes up for it',
          tryAsking: 'Does one brave act cancel weeks of being gone? Or is it a start?',
        },
        {
          ifTheySay: 'The Devi and Ron both ran away',
          tryAsking: 'Did the Devi run away from something, or go towards something? What about Ron?',
        },
      ],
      stance: {
        left: 'Forgive quickly, like Harry',
        right: 'Make them earn it, like Hermione',
      },
      activity: {
        title: "Harry's case and Hermione's case",
        minutes: 2,
        text: 'One person argues for 30 seconds that Harry was right to forgive Ron at once. The other argues for 30 seconds that Hermione was right to stay angry. Then swap. Did either argument surprise you once you had to make it?',
      },
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b14',
      number: 14,
      type: 'comparison',
      title: 'Side by side',
      label: 'comparison',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'reflective',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone'] },
      },
      intro: 'Questions are revealed one at a time. None has a single right answer.',
      questions: [
        'The Devi changed through her own tapas. Kreacher changed when someone respected him. Ron changed by coming back and facing the locket. Which kind of change do you trust most?',
        "Each story starts with words that hurt: Shiva's joke, Sirius's contempt, the locket's whispers. How much power do words have over who someone becomes?",
        "Shiva welcomed the Devi by her new name. Harry welcomed Ron quickly; Hermione didn't. Who decides when someone has changed: the person, or the people around them?",
        'Kreacher is still a servant after his change. Does a change count if the unfair situation around it stays the same?',
        'Name one difference between these stories so big that we should never forget it.',
      ],
      doesntCompare:
        'the Devi is worshipped today, and her story is sacred. Her brightness is about inner clarity, never skin. Kreacher and Ron are fictional characters. We compare the renewal, not the people.',
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b15',
      number: 15,
      type: 'today',
      title: 'Today',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n8prabhasaCoast',
        camera: 'drift',
        music: { palette: 'indian', raga: 'yaman', bpm: 58, layers: ['drone', 'motif'] },
      },
      intro: 'One situation, with several perspectives a thoughtful person might hold. None is marked as the right answer.',
      situations: [
        {
          title: 'The nickname.',
          setup:
            'Last year you dropped an easy catch in a cricket match, and your friends started calling you "Butterfingers". Everyone, including them, thinks it\'s affectionate. You\'ve started to hate it.',
          perspectives: [
            '"Tell them plainly. Friends would want to know."',
            '"Laugh along. Making a fuss makes it stick."',
            '"Tell your closest friend privately, and let them help it fade."',
            '"Give it time. Nicknames die out on their own."',
            '"Turn it into a joke you own, so it can\'t sting."',
          ],
          ask: 'the Devi didn\'t laugh it off. When is it worth saying "that hurt", even to someone who meant well?',
        },
      ],
    },

    // -----------------------------------------------------------------------
    {
      id: 'n8-b16',
      sourceRows: [23],
      number: 16,
      type: 'reflection',
      title: 'Reflection',
      label: 'contemporary',
      minutes: 1.5,
      direction: {
        intensity: 2,
        palette: 'n8prabhasaCoast', // dawn arrives in the closing
        camera: 'pullBack',
        music: { palette: 'indian', raga: 'yaman', bpm: 56, layers: ['drone', 'motif', 'resolution'] },
      },
      intro: "Pick one or two questions; you don't need them all. The night ends on its theme.",
      forChild: [
        'Shiva said it was a joke. Why do you think it hurt so much?',
        'If you could ask for one wish after a long, hard effort, would it be for you or for someone else?',
      ],
      goDeeper: [
        'The Devi began her tapas because of a hurtful joke. Is changing yourself because of what someone said ever a good idea? Does it matter if the change becomes truly yours?',
        'Kreacher is kinder and happier, but still not free. Is kindness enough, when the system is unfair?',
        'In the final battle, Harry urges Voldemort to try to feel remorse, and Voldemort refuses (DH ch. 36; book only). Can anyone be renewed if they won\'t choose it?',
        'Some tellings of tonight\'s story go dark to bright, and the Devi Mahatmya goes bright to dark. Why might a tradition keep both?',
      ],
      together: 'is there something in our family that needs a fresh start? What would the first step be?',
      privateNote: 'one thing I want to remember from tonight is…',
      tomorrow: 'the last night: the Devi who gives every perfection, and then the victory of Vijayadashami.',
    },
  ],

  // -------------------------------------------------------------------------
  // "For the parent" (shown in the context and sources panel, C key)
  // -------------------------------------------------------------------------
  forTheParent: {
    remember: [
      'Say the skin-colour point out loud near the start: brightness in this story means inner clarity, never skin. Kalaratri, dark, was worshipped last night with equal reverence.',
      "The heart of the night is a question, not a moral: how does renewal happen, and who decides it's real?",
      "Kreacher's change is book only, so retell it in full. Don't let \"Kreacher got cleaned up\" stand in for \"the Devi became bright\". The link is renewal, not appearance.",
      'Ron did wrong and came back; the Devi was wronged. Keep that difference clear.',
    ],
    sources: [
      {
        claim: 'Shiva calls her "Kali" in jest; her anger; tapas at Prabhasa; she becomes Gauri',
        source: 'Skanda Purana, Prabhasa Khanda, Prabhasa-kshetra-mahatmya ch. 68, vv. 1–13 (Tagare translation)',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'In that chapter Shiva narrates, and the Devi is in her earlier birth as Sati',
        source: 'Skanda Purana, Prabhasa Khanda 68.1–5',
        label: 'Tradition',
        confidence: 'High (as translated)',
      },
      {
        claim: 'Her boons for visitors; Shiva known there as Gaurishvara',
        source: 'Skanda Purana, Prabhasa Khanda 68.14–17',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Shiva bathes Kali in the heavenly Ganga; Narada\'s prophecy of "Gauri"',
        source: "Kalika Purana ch. 47 (and ch. 42–46), from R. C. Hazra's summary",
        label: 'Tradition',
        confidence: 'Medium (secondary summary)',
      },
      {
        claim: 'Brahma, Shumbha and Nishumbha, and Kaushiki in the Shiva Purana version',
        source: 'Shiva Purana, as summarised on Wikipedia ("Mahagauri")',
        label: 'Tradition',
        confidence: 'Low to medium *(to check the section)*',
      },
      {
        claim: 'Shiva and Parvati quarrel in other Puranas',
        source: 'Matsya Purana, around ch. 156–157',
        label: 'Tradition',
        confidence: '*(To check)*',
      },
      {
        claim: "Ganga bath after Brahmacharini's tapas",
        source: 'Popular Navaratri telling',
        label: 'Tradition (popular)',
        confidence: 'Labelled as such; not found in a Purana',
      },
      {
        claim: 'Kaushiki emerges; Parvati becomes dark, Kalika',
        source: 'Devi Mahatmya ch. 5, vv. 40–41 (hindupad.com numbering)',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Mahagauri's white dress, bull, trident, damaru, abhaya and varada",
        source: 'Devotional iconography',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: 'Meanings of the symbols; tapas as purifying heat',
        source: 'Devotional readings',
        label: 'Interpretation',
        confidence: 'Medium',
      },
      {
        claim: 'Kanya Puja; Kumari Puja at Belur Math',
        source: 'Regional practice',
        label: 'Tradition (regional)',
        confidence: 'Medium; customs vary',
      },
      {
        claim: 'Rama and Krishna described as dark; Draupadi called Krishnaa',
        source: 'Ramayana; Mahabharata',
        label: 'Tradition',
        confidence: 'High',
      },
      {
        claim: "Kreacher's tale; Hermione's explanation; the fake locket given",
        source: '*Deathly Hallows* ch. 10',
        label: 'Hogwarts',
        confidence: 'High',
      },
      { claim: 'Kreacher returns with Mundungus', source: '*Deathly Hallows* ch. 11', label: 'Hogwarts', confidence: 'High' },
      { claim: 'The scrubbed kitchen and hot meals', source: '*Deathly Hallows* ch. 12', label: 'Hogwarts', confidence: 'High' },
      {
        claim: "Kreacher's towel and locket worn on his chest",
        source: '*Deathly Hallows* ch. 12',
        label: 'Hogwarts',
        confidence: 'Medium',
      },
      { claim: 'Dumbledore on Sirius and Kreacher', source: '*Order of the Phoenix* ch. 37', label: 'Hogwarts', confidence: 'High' },
      {
        claim: 'Kreacher leads the house-elves, calling on Regulus',
        source: '*Deathly Hallows* ch. 36',
        label: 'Hogwarts',
        confidence: 'High (leading); medium (what he calls out)',
      },
      {
        claim: "The films omit Kreacher's change",
        source: '*Deathly Hallows Part 1* (2010)',
        label: 'Hogwarts',
        confidence: 'Medium *(to check how much of the tale is shown)*',
      },
      { claim: 'Ron leaves', source: '*Deathly Hallows* ch. 15', label: 'Hogwarts', confidence: 'High' },
      {
        claim: "The doe, the pool, the rescue, the locket destroyed, Hermione's fury",
        source: '*Deathly Hallows* ch. 19; *Deathly Hallows Part 1*',
        label: 'Hogwarts',
        confidence: 'High (book); medium (film details)',
      },
      {
        claim: "Ron's way back through the Deluminator",
        source: '*Deathly Hallows* ch. 19',
        label: 'Hogwarts',
        confidence: 'Medium *(to check the film wording)*',
      },
      { claim: "The doe is Snape's Patronus", source: '*Deathly Hallows* ch. 33', label: 'Hogwarts', confidence: 'High' },
      {
        claim: 'Harry urges Voldemort to feel remorse',
        source: '*Deathly Hallows* ch. 36; book only',
        label: 'Hogwarts',
        confidence: 'High (book); medium (film omission)',
      },
    ],
    footnote: 'All Harry Potter lines are paraphrased; there are no direct quotations.',
  },

  // -------------------------------------------------------------------------
  // The read-aloud script (T key)
  // -------------------------------------------------------------------------
  readAloud: {
    intro:
      'Read it straight through, or use it alongside the app. It runs about 25 minutes with discussion, or about 17 as a short evening: on a short evening, skip the two choice questions (but still read what happens after each), the second scene (from "Now a second scene" to its stance line) and the side-by-side questions at the start of Part 3. Lines in **[brackets]** are for the parent and are not read aloud. All Harry Potter lines are paraphrased.',
    blocks: [
      { kind: 'heading', text: 'Part 1: Opening and the story (about 10 minutes)' },
      {
        kind: 'read',
        text: 'Last night we met Kalaratri, the dark night: the fiercest form of the Devi, who defeated Chanda, Munda and Raktabija. And yet one of her hands said, do not fear.',
      },
      {
        kind: 'read',
        text: 'Tonight is the eighth night, Ashtami. After the darkest night comes the brightest form. She is Mahagauri, the great bright one, dressed in white, riding a white bull.',
      },
      {
        kind: 'parent',
        text: 'For the parent: before the story, say this in your own words. Some tellings of tonight\'s story go from dark to fair. That does not mean fair is better or purer. "Bright" here means clear and calm inside. Last night\'s Kalaratri is dark and just as sacred, and in one old text the Devi goes from bright to dark instead. The colour of someone\'s skin says nothing about whether they\'re good, clever or beautiful.',
      },
      {
        kind: 'read',
        text: 'Before we start, one thing to say clearly. This story uses the words "dark" and "bright". In it, "bright" means something about the inside: clear, calm, at peace. It\'s not about skin. Remember, last night\'s Devi was dark, and she\'s every bit as sacred.',
      },
      { kind: 'parent', text: 'Pause: about 30 seconds. Let your child respond if they want to.' },
      {
        kind: 'read',
        text: "In one old text, the Skanda Purana, it's Shiva himself who tells this story, and it's a story against himself.",
      },
      {
        kind: 'read',
        text: 'Once, he says, in a lovely place, he called the Devi "Kali": the dark one. He meant it as a joke. She didn\'t hear it as one. She frowned. She was angry. And she told him so, sharply.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "If you were the Devi, what would you do? Laugh it off, tell him it hurt, go away and think, or answer with a joke of your own?" Listen to the reasons.',
      },
      {
        kind: 'read',
        text: "She said: since you mocked me as dark, I'll go somewhere I can become Gauri, the bright one. And she left, with her companions, for Prabhasa, a sacred stretch of coast near Somnath, in what is now Gujarat.",
      },
      {
        kind: 'read',
        text: 'There she set up a shrine to Shiva, and she began tapas: long, hard discipline and prayer. She stood on one foot, repeating sacred words. In summer she sat between five fires. In the rains she lay under the open sky. In early winter she stood in cold water. Season after season.',
      },
      {
        kind: 'read',
        text: 'The word tapas means heat. People often explain it as a heat that burns away whatever clouds the mind.',
      },
      { kind: 'read', text: 'Slowly, a radiance grew in her. After a long, long time, she shone all over.' },
      {
        kind: 'read',
        text: 'Then Shiva came. He laughed, and called her "Gauri, Gauri", the bright one, again and again. He asked her to come home. And he offered her a wish: anything she liked.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: Choice. Ask: "He started all this with his joke. What would you ask for? An apology, nothing at all, something for other people, or something so it\'s never forgotten?"',
      },
      {
        kind: 'read',
        text: 'She asked for things for other people. Good fortune for anyone who visited that grove. Freedom from sorrow for families who brought music and dance there. And her last wish was that Shiva himself be known in that place as Gaurishvara, the Lord of Gauri. He agreed, and he stayed there. Her new name became part of his.',
      },
      { kind: 'parent', text: 'Pause: ask, "Why do you think her wishes were mostly for other people?"' },
      {
        kind: 'read',
        text: "This story is told in other ways too. In one, Shiva bathes her in the heavenly river Ganga and she turns golden. In a popular Navaratri telling, after the long tapas we heard about on Night 2, she's covered in dust and ash, and Shiva washes her with Ganga water until she shines like the moon.",
      },
      {
        kind: 'read',
        text: "And in the Devi Mahatmya, the text behind so much of Navaratri, it goes the other way. A bright goddess, Kaushiki, comes out of Parvati, and Parvati herself becomes dark, and is called Kalika. So the stories don't agree on which way the colour goes. What they agree on is that it's the same Devi, and neither colour is worth more.",
      },
      {
        kind: 'read',
        text: "Tonight she is Mahagauri. She wears white, for peace. She rides a white bull, like Shailaputri on the very first night. She holds a trident and a small drum. And one hand is raised, palm open, saying do not fear: the same as Kalaratri's last night. Fierce, then gentle. The same Devi.",
      },
      { kind: 'parent', text: 'Pause: about 1 minute. Optional: "Which part of the story will you remember?"' },

      { kind: 'heading', text: 'Part 2: The theme and two Hogwarts scenes (about 10 minutes)' },
      { kind: 'read', text: "Tonight's word is renewal. After a hard time, you can begin again, clearer than before." },
      {
        kind: 'read',
        text: 'In a common devotional telling, Parvati’s long tapas left her covered in the dust and darkness of years outdoors. When Shiva accepted her, he washed her with the waters of the Ganga, and she shone radiant: Mahagauri, “the greatly bright one”. She’s pictured calm, dressed in white, riding a bull, with hands of fearlessness and blessing. Renewal here doesn’t mean pretending the hard time never happened. The tapas made her who she is. What washes away is the weight; what stays is what you learned. She’s linked with calm, forgiveness and fresh starts.',
      },
      {
        kind: 'read',
        text: "Now, Hogwarts. This one's from *Deathly Hallows*, chapters ten to twelve. Kreacher's story and his change aren't in the films, so listen closely even if you know them well.",
      },
      {
        kind: 'parent',
        text: 'For the parent: the next part mentions a cave and a poisoned potion. Read it calmly; the book tells it briefly.',
      },
      {
        kind: 'read',
        text: "It's the summer after Dumbledore's death, and Harry is hiding at Grimmauld Place with the house-elf Kreacher, whose lies helped lure him to the Ministry, where Sirius died. Harry orders Kreacher to tell the truth about the locket, and Kreacher tells his story. Voldemort took him to a cave by the sea, made him drink a potion that filled him with horror, and left him to die. Later Regulus, Sirius's younger brother, went back with him, drank the potion himself, and ordered Kreacher to destroy the real locket, which he never could. Hermione explains that Regulus was kind to Kreacher, and Sirius was harsh. So Harry speaks to him differently, and gives him the fake locket Regulus left behind. Days later Kreacher comes back clean, with Regulus's locket on his chest, and the gloomy kitchen is scrubbed and gleaming. In the final battle, he leads the house-elves out to fight, calling out Regulus's name.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did Harry do differently after hearing the story?',
          'Feel: what do you think Kreacher felt when Harry gave him the locket?',
          "Wonder: why had nobody listened to Kreacher's story before?",
          "Stretch: Kreacher's lies helped lead to Sirius's death. Does what happened to him excuse that, explain it, or neither?",
          'Connect: the Devi changed through her own effort. Kreacher changed when someone respected him. Which kind of change lasts longer?',
        ],
      },
      {
        kind: 'parent',
        text: 'If they say "Now he\'s happy, so it\'s fine", try: "He\'s happier. Is he free?" If they say "The Devi and Kreacher both got cleaned up", try: "Her brightness is about the inside, and it isn\'t about colour. What changed inside Kreacher?"',
      },
      {
        kind: 'parent',
        text: 'STANCE LINE: "Kreacher changed because of how he was treated" or "Kreacher changed because of who he already was". Each of you picks a spot and explains it in one sentence.',
      },
      {
        kind: 'parent',
        text: 'ACTIVITY: 3 minutes. One of you defends Sirius for 60 seconds, the other defends Kreacher for 60 seconds. Then take 60 seconds to agree one sentence you both accept.',
      },
      {
        kind: 'read',
        text: "One thing to hold on to: Kreacher's change is about how he was treated and how he lived. It has nothing to do with colour. What's similar is renewal. Who causes it is completely different: the Devi changed herself.",
      },
      {
        kind: 'read',
        text: 'Now a second scene, from *Deathly Hallows*, chapter nineteen, "The Silver Doe". It\'s in the first *Deathly Hallows* film too.',
      },
      {
        kind: 'parent',
        text: "For the parent: Harry nearly drowns here, and the locket torments Ron with a cruel vision of Harry and Hermione together. It's brief.",
      },
      {
        kind: 'read',
        text: "Weeks earlier, Ron walked out: the locket had made them all bitter, and he was cold, hungry and jealous. Now, in the snowy Forest of Dean, Harry follows a silver doe made of light to a frozen pool with the Sword of Gryffindor at the bottom. He dives in, and the locket's chain tightens round his neck and drags at him. Someone hauls him out: it's Ron, soaking wet, holding the sword. Harry insists that Ron should destroy the locket, and when it opens, Voldemort's voice goes straight for Ron's worst fears: that his mother wanted a daughter more, and that Hermione prefers Harry. Ron hesitates, Harry shouts at him to strike, and Ron brings the sword down. Back at the tent Hermione is furious; Ron explains that he tried to return almost at once, and a light from the Deluminator led him back. Harry forgives him quickly; Hermione takes much longer.",
      },
      {
        kind: 'read',
        text: "The Devi went away hurt, and came back bright. Ron went away angry, and came back changed. But the difference matters: Ron had done something wrong, and the Devi hadn't. Her tapas wasn't making up for anything.",
      },
      { kind: 'parent', text: 'PAUSE: Think it through. Choose two or three:' },
      {
        kind: 'parentList',
        items: [
          'Notice: what did the locket say to Ron, and why those things?',
          'Wonder: why did Harry forgive so fast, and Hermione so slowly?',
          'Stretch: the locket made Ron worse. Is he still responsible for leaving?',
          "Turn it around: tell it from Hermione's side. She stayed. What did those weeks cost her?",
          "Connect: what made the Devi's change real? What made Ron's?",
        ],
      },
      { kind: 'parent', text: 'STANCE LINE: "Forgive quickly, like Harry" or "Make them earn it, like Hermione".' },
      {
        kind: 'parent',
        text: 'ACTIVITY: 2 minutes. One of you argues for 30 seconds that Harry was right to forgive at once; the other argues for 30 seconds that Hermione was right to stay angry. Then swap.',
      },

      { kind: 'heading', text: 'Part 3: Side by side, today, and closing (about 5 minutes)' },
      { kind: 'read', text: "Let's put the stories next to each other. There's no single right answer to any of these." },
      { kind: 'parent', text: 'PAUSE: ask one or two, one at a time:' },
      {
        kind: 'parentList',
        items: [
          'The Devi changed through her own tapas, Kreacher through being respected, Ron by coming back and facing the locket. Which kind of change do you trust most?',
          'Each story starts with words that hurt. How much power do words have over who someone becomes?',
          'Who decides when someone has changed: the person, or the people around them?',
          "What's one difference between these stories we should never forget?",
        ],
      },
      { kind: 'read', text: 'Now, closer to home.' },
      {
        kind: 'read',
        text: 'Imagine you dropped an easy catch in a cricket match last year, and your friends started calling you "Butterfingers". They think it\'s affectionate. You\'ve started to hate it.',
      },
      {
        kind: 'read',
        text: 'Some people would say tell them plainly, because friends would want to know. Some would say laugh along, because making a fuss makes it stick. Some would tell their closest friend privately and let it fade. Some would wait for it to die out. And some would turn it into a joke they own, so it can\'t sting.',
      },
      {
        kind: 'parent',
        text: 'PAUSE: ask, "The Devi didn\'t laugh it off. When is it worth saying \'that hurt\', even to someone who meant well?"',
      },
      { kind: 'read', text: 'Last questions.' },
      {
        kind: 'parent',
        text: 'PAUSE: ask one question for your child, and one "go deeper" question if there\'s energy. Suggested: "If you could ask for one wish after a long, hard effort, would it be for you or for someone else?" and "Kreacher is happier, but still not free. Is kindness enough?"',
      },
      {
        kind: 'parent',
        text: 'TOGETHER: "Is there something in our family that needs a fresh start? What would the first step be?"',
      },
      { kind: 'read', text: "Tonight's word is renewal. After a hard time, you can begin again, clearer than before." },
      {
        kind: 'read',
        text: "Tomorrow is the last of the nine nights. We'll meet the Devi who gives every perfection, and then comes Vijayadashami: the day of victory.",
      },
      {
        kind: 'parent',
        text: "End. Optional: each of you says, or writes in the app's private note, one thing you want to remember from tonight.",
      },
    ],
    timing:
      'about 10 minutes for Part 1, 10 for Part 2 and 5 for Part 3, so about 25 minutes in all. A short evening takes about 17: no choice questions, one scene, two ladder questions, and no side by side.',
  },

  // The closing (Reflect.tsx draws it; Score.closing() plays it).
  closing: {
    seconds: 13,
    raga: 'bhairav', // Bhairav, the dawn raga: begin again (direction brief)
    captions: [
      { at: 0, text: 'the flute falls home' },
      { at: 4.2, text: 'a temple bell' },
      { at: 6, text: 'the drone fades to silence' },
    ],
  },
};
