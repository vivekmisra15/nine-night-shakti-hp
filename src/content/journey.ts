// Series-wide text: the app title, the nine stops on the map, and the two
// notices shown once before Night 1 (copied from docs/nights/night-1.md, Beat 1).
// Night names, and their Devanagari spellings, come from docs/NINE_NIGHTS_CONTENT.md.

export const appTitle = 'Nine Nights - The Story of Shakti';

export interface MapStop {
  night: number;
  devi: string;
  devanagari: string; // the name in Devanagari: shown beside it once the night is built, and read aloud by the speaker button
  meaning: string;
  built: boolean; // unbuilt nights read "being written" on the map
}

export const mapStops: MapStop[] = [
  { night: 1, devi: 'Shailaputri', devanagari: 'शैलपुत्री', meaning: 'daughter of the mountain', built: true },
  { night: 2, devi: 'Brahmacharini', devanagari: 'ब्रह्मचारिणी', meaning: 'the one who practises', built: false },
  { night: 3, devi: 'Chandraghanta', devanagari: 'चन्द्रघण्टा', meaning: 'the moon-bell', built: false },
  { night: 4, devi: 'Kushmanda', devanagari: 'कूष्माण्डा', meaning: 'the warm cosmic egg', built: false },
  { night: 5, devi: 'Skandamata', devanagari: 'स्कन्दमाता', meaning: 'mother of Skanda', built: false },
  { night: 6, devi: 'Katyayani', devanagari: 'कात्यायनी', meaning: "born of the gods' combined fury", built: false },
  { night: 7, devi: 'Kalaratri', devanagari: 'कालरात्रि', meaning: 'the dark night', built: false },
  { night: 8, devi: 'Mahagauri', devanagari: 'महागौरी', meaning: 'radiant and white', built: false },
  { night: 9, devi: 'Siddhidatri', devanagari: 'सिद्धिदात्री', meaning: 'the giver of perfection', built: false },
];

export const unbuiltText = 'being written';

// The opening splash: four questions that fade in one at a time. Each is
// copied from the Recurring themes table in docs/NINE_NIGHTS_CONTENT.md.
export const splashQuestions = [
  'Are you who your family made you, or who you choose to be?',
  'What does protecting someone cost the protector, and the protected?',
  'When should you stand against your own side?',
  'Can anyone begin again, and must they choose to?',
];

export const beginLabel = 'Begin the journey';

// Shown small on the splash and with "How we compare". Copied from
// docs/NINE_NIGHTS_CONTENT.md (draft wording, for Supriya to review).
export const hpDisclaimer =
  'The Harry Potter books and films were not written with Navaratri or the Devi in mind. The links we draw between them are our own interpretation.';

// Shown once, before the series starts.
export const spoilerNotice = {
  title: 'Spoiler notice',
  text: "These nine nights discuss the whole Harry Potter series, all seven books and all eight films, including the biggest twists and the deaths of important characters. If you haven't finished the series yet, you may want to wait.",
};

// Shown once, straight after the spoiler notice.
export const howWeCompare = {
  title: 'How we compare',
  text: 'Harry Potter is a story one author wrote. The Devi is worshipped by millions of people today. We are not saying any character *is* a Devi, or that the two stories mean the same thing. We look for moments where someone faces a similar choice, and then we look just as hard at what is different.',
};
