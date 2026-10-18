// The disclaimer and statement of intent, shown on the app's Disclaimer page.
// All text is copied from docs/DISCLAIMER.md. To change the wording, change
// the doc first, then copy it here.

export type DisclaimerBlock = { kind: 'p'; text: string } | { kind: 'list'; items: string[] };

export const disclaimerTitle = "Disclaimer and statement of intent";

// The one sentence shown at the bottom of the splash screen, with a link to the page.
export const disclaimerSentence =
  "*Nine Nights* is an independent family project, not affiliated with J.K. Rowling or Warner Bros.; the links it draws between the stories are our own interpretation.";

export const disclaimerSections: { heading: string; blocks: DisclaimerBlock[] }[] = [
  {
    heading: "No affiliation with J.K. Rowling, Warner Bros. or the Harry Potter publishers",
    blocks: [
      { kind: 'p', text: "This project, *Nine Nights - The Story of Shakti*, is an independent, non-commercial, educational work. It is not affiliated with, endorsed by, sponsored by or in any way connected to J.K. Rowling, Warner Bros. Entertainment Inc., Wizarding World Digital, the books' publishers (including Bloomsbury Publishing and Scholastic), or any of their subsidiaries or affiliates." },
      { kind: 'p', text: "Harry Potter character names, book and film titles and related marks referenced in this project (including *Harry Potter and the Philosopher's Stone*, *Chamber of Secrets*, *Prisoner of Azkaban*, *Goblet of Fire*, *Order of the Phoenix* and *Deathly Hallows*, in book and film) are trademarks and/or copyrighted works of J.K. Rowling and Warner Bros. Entertainment Inc. All rights in those works, marks, characters and stories remain with their respective owners." },
    ],
  },
  {
    heading: "No copyrighted material is reproduced",
    blocks: [
      { kind: 'p', text: "This project does not contain, embed, display, reproduce or transmit any:" },
      {
        kind: 'list',
        items: [
          "images, screenshots or stills from any Harry Potter film, or cover art from any Harry Potter book;",
          "video clips or audio recordings from any Harry Potter production;",
          "text from the books, or dialogue from the films, beyond a few words of a scene's best-known line; or",
          "crests, logos, film typography or any other asset owned by the rights holders.",
        ],
      },
      { kind: 'p', text: "The app contains no links to streaming or video-sharing platforms, and makes no attempt to replace or get around access to the books or films." },
    ],
  },
  {
    heading: "The references: paraphrase, commentary and original illustration",
    blocks: [
      { kind: 'p', text: "Where a Harry Potter scene is referenced, the following always applies:" },
      {
        kind: 'list',
        items: [
          "**Paraphrase only.** Every scene is retold in our own words, in a few sentences. No passage of the books or the films is reproduced.",
          "**Original illustrations.** Every picture is an original, abstract artwork drawn in code (SVG). Harry Potter scenes are shown only through objects, light and places: no characters, actors, crests or film imagery. They are not traced from, derived from or meant to resemble any frame of any film.",
          "**Commentary and interpretation.** Each reference identifies a scene as an example of a choice or idea (for example rootedness, courage or renewal) and invites a family to discuss it. This is educational commentary, not reproduction.",
          "**Find the scene yourselves.** For each scene the app gives only the book, chapter and film, and asks families to find it in their own copy of the book or film. It derives no benefit from this.",
        ],
      },
    ],
  },
  {
    heading: "Educational and non-commercial purpose",
    blocks: [
      { kind: 'p', text: "*Nine Nights* is made for personal, family and educational use. It is free, and no revenue is made from it. Its purpose is to help families explore the nine nights of Navaratri through traditional Hindu stories and their sources, including the Devi Mahatmya, the Shiva Purana, the Bhagavata Purana, the Devi Bhagavata Purana, the Skanda Purana, the Kena Upanishad and the Yoga Sutras, and to connect the ideas in them with stories that children may already know. The Harry Potter references serve only as prompts for comparison and discussion; the project has no relationship, commercial or otherwise, with Harry Potter or its rights holders." },
    ],
  },
  {
    heading: "Respect for a living tradition",
    blocks: [
      { kind: 'p', text: "The Devi and the Hindu deities in these stories are sacred figures in a living religion, worshipped by millions of people today. Harry Potter characters are fictional. The project never presents a character as a Devi or a version of her, and it states the differences between the two as clearly as the similarities. Out of respect, the Devi and the gods are shown only as light, never as drawn figures." },
    ],
  },
  {
    heading: "The interpretations are our own",
    blocks: [
      { kind: 'p', text: "All interpretations of the traditional stories and of the Harry Potter scenes are the authors' own. They do not represent the official position, theology or teaching of any religious tradition, institution or community, or of any rights holder. The Harry Potter books and films were not written with Navaratri or the Devi in mind, and the links we draw between them are our own. We make no claim that they reflect the intentions of J.K. Rowling or of the films' writers and directors. Each traditional account is labelled with its source, and modern readings are labelled as such." },
    ],
  },
  {
    heading: "Privacy",
    blocks: [
      { kind: 'p', text: "The app collects no personal data. Progress, private notes and the names on the stance lines are saved only in your own browser, and nothing is sent anywhere." },
    ],
  },
  {
    heading: "Statement of good faith",
    blocks: [
      { kind: 'p', text: "This project is offered in good faith, in the sincere belief that its references to the Harry Potter books and films are fair commentary and educational use. If any rights holder believes that any part of it infringes their rights, that part will be looked at and addressed promptly." },
    ],
  },
];
