// The parent prep sheet: every Harry Potter scene in the nine nights, so a
// parent can find them in their own books and films before each night.
//
// All text is copied from docs/PARENT_PREP.md. To change the wording, change
// the doc first, then copy it here.

export type Intensity = 'Gentle' | 'Some peril' | 'Intense';

export interface PrepScene {
  scene: string;
  book: string;
  film: string;
  intensity: Intensity;
  note?: string;
}

export interface PrepNight {
  night: number; // the Devi's name comes from mapStops in journey.ts
  scenes: PrepScene[];
}

export const prepTitle = 'Parent prep sheet';

export const prepIntro = [
  'One page listing every Harry Potter scene in the nine nights, so you can find them in your own copies of the books and films before each night. The app has no video links.',
  'Every reference is copied from the night files. Chapter numbers follow the UK editions. On a **short evening**, only the first scene of each night is used.',
];

export const prepIntensityNote =
  '*gentle*, *some peril* or *intense* (a death, killing or deep grief). Intense scenes have a note for the parent in the app; read it before the night.';

export const prepNights: PrepNight[] = [
  {
    night: 1,
    scenes: [
      {
        scene: "Aunt Marge's dinner",
        book: '*Prisoner of Azkaban*, ch. 2, "Aunt Marge\'s Big Mistake"',
        film: '*Prisoner of Azkaban* (2004), opening scenes',
        intensity: 'Gentle',
      },
      {
        scene: 'The Sorting',
        book: '*Philosopher\'s Stone*, ch. 7, "The Sorting Hat"; *Chamber of Secrets*, ch. 18, "Dobby\'s Reward"',
        film: "*Philosopher's Stone* (2001), the Sorting; *Chamber of Secrets* (2002), Dumbledore's office at the end",
        intensity: 'Gentle',
      },
    ],
  },
  {
    night: 2,
    scenes: [
      {
        scene: 'The Patronus lessons',
        book: '*Prisoner of Azkaban*, ch. 12, "The Patronus"; ch. 13, "Gryffindor versus Ravenclaw"; ch. 20, "The Dementor\'s Kiss"; ch. 21, "Hermione\'s Secret"',
        film: '*Prisoner of Azkaban* (2004)',
        intensity: 'Some peril',
        note: 'The film squeezes weeks of lessons into one scene; the book shows the effort better.',
      },
      {
        scene: 'Occlumency',
        book: '*Order of the Phoenix*, ch. 24, "Occlumency"; ch. 26, "Seen and Unforeseen"; ch. 28, "Snape\'s Worst Memory"; ch. 31–32, "O.W.L.s" and "Out of the Fire"; ch. 37, "The Lost Prophecy"',
        film: '*Order of the Phoenix* (2007)',
        intensity: 'Intense',
        note: 'Leads to Sirius\'s death. Gentle alternative: the Summoning Charm, *Goblet of Fire*, ch. 20, "The First Task".',
      },
    ],
  },
  {
    night: 3,
    scenes: [
      {
        scene: 'Neville stands in the way',
        book: '*Philosopher\'s Stone*, ch. 16, "Through the Trapdoor"; ch. 17, "The Man with Two Faces"',
        film: "*Philosopher's Stone* (2001), the common room at night, and the end-of-year feast",
        intensity: 'Gentle',
      },
      {
        scene: "Molly's duel",
        book: '*Deathly Hallows*, ch. 36, "The Flaw in the Plan"',
        film: '*Deathly Hallows – Part 2* (2011), the final battle',
        intensity: 'Intense',
        note: 'A killing in battle. Gentle alternative: Harry saves Dudley, *Order of the Phoenix*, ch. 1, "Dudley Demented", and ch. 2, "A Peck of Owls"; *Order of the Phoenix* (2007), the opening (some peril).',
      },
    ],
  },
  {
    night: 4,
    scenes: [
      {
        scene: "Hagrid's cake at midnight",
        book: '*Philosopher\'s Stone*, ch. 3, "The Letters from No One"; ch. 4, "The Keeper of the Keys"',
        film: "*Philosopher's Stone* (2001), the hut on the rock",
        intensity: 'Gentle',
      },
      {
        scene: 'The Christmas jumper',
        book: '*Philosopher\'s Stone*, ch. 12, "The Mirror of Erised", with ch. 6, "The Journey from Platform Nine and Three-Quarters"',
        film: "*Philosopher's Stone* (2001), Christmas morning",
        intensity: 'Gentle',
        note: 'The film keeps the jumpers but not the explanation.',
      },
    ],
  },
  {
    night: 5,
    scenes: [
      {
        scene: 'The argument at Grimmauld Place',
        book: '*Order of the Phoenix*, ch. 5, "The Order of the Phoenix"',
        film: '*Order of the Phoenix* (2007), the dinner scene at Grimmauld Place',
        intensity: 'Gentle',
        note: 'The film keeps the argument in a much shorter form.',
      },
      {
        scene: "Narcissa's lie",
        book: '*Deathly Hallows*, ch. 36, "The Flaw in the Plan" (the opening pages)',
        film: '*Deathly Hallows: Part 2* (2011), in the forest',
        intensity: 'Some peril',
      },
    ],
  },
  {
    night: 6,
    scenes: [
      {
        scene: "Dumbledore's Army",
        book: '*Order of the Phoenix*, ch. 15, "The Hogwarts High Inquisitor"; ch. 16, "In the Hog\'s Head"; ch. 17, "Educational Decree Number Twenty-Four"; ch. 18, "Dumbledore\'s Army"',
        film: '*Order of the Phoenix* (2007)',
        intensity: 'Gentle',
      },
      {
        scene: 'Through the trapdoor',
        book: '*Philosopher\'s Stone*, ch. 16, "Through the Trapdoor", with the feast in ch. 17, "The Man with Two Faces"',
        film: "*Philosopher's Stone* (2001), the final obstacles",
        intensity: 'Gentle',
        note: "The film leaves out the troll and Snape's potion riddle.",
      },
    ],
  },
  {
    night: 7,
    scenes: [
      {
        scene: 'The boggart in the wardrobe',
        book: '*Prisoner of Azkaban*, ch. 7, "The Boggart in the Wardrobe"; ch. 8, "Flight of the Fat Lady"',
        film: "*Prisoner of Azkaban* (2004), Lupin's first lesson and a later talk with Harry",
        intensity: 'Some peril',
      },
      {
        scene: "The Prince's Tale",
        book: '*Deathly Hallows*, ch. 33, "The Prince\'s Tale", following ch. 32, "The Elder Wand"',
        film: '*Deathly Hallows Part 2* (2011), the Pensieve sequence',
        intensity: 'Intense',
        note: "Follows Snape's death. Gentle alternative: the Grim is Sirius, *Prisoner of Azkaban*, ch. 17–19; *Prisoner of Azkaban* (2004).",
      },
    ],
  },
  {
    night: 8,
    scenes: [
      {
        scene: "Kreacher's tale",
        book: '*Deathly Hallows*, ch. 10, "Kreacher\'s Tale"; ch. 11, "The Bribe"; ch. 12, "Magic is Might"',
        film: 'Book only',
        intensity: 'Some peril',
        note: "Includes Regulus Black's death in the cave.",
      },
      {
        scene: 'The silver doe',
        book: '*Deathly Hallows*, ch. 15, "The Goblin\'s Revenge" (Ron leaves); ch. 19, "The Silver Doe"',
        film: '*Deathly Hallows Part 1* (2010)',
        intensity: 'Some peril',
      },
    ],
  },
  {
    night: 9,
    scenes: [
      {
        scene: 'The Elder Wand',
        book: '*Deathly Hallows*, ch. 35, "King\'s Cross", and the end of ch. 36, "The Flaw in the Plan"',
        film: '*Deathly Hallows Part 2* (2011), the closing scenes before the epilogue',
        intensity: 'Gentle',
        note: 'The film differs: Harry snaps the Elder Wand and throws it away. In the book he mends his own wand with it and decides to return it. Use the book.',
      },
      {
        scene: 'The Mirror and the Stone',
        book: '*Philosopher\'s Stone*, ch. 12, "The Mirror of Erised"; ch. 17, "The Man with Two Faces"',
        film: "*Philosopher's Stone* (2001), the Mirror at Christmas, the final chamber, and the hospital wing",
        intensity: 'Gentle',
      },
    ],
  },
];
