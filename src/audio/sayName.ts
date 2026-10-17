// Says a Devi's name aloud when the speaker button beside it is tapped.
//
// It uses the device's own Hindi voice (for example Lekha on a Mac or
// iPad) reading the Devanagari spelling, so the vowels and stresses come out
// as they would in Hindi and Sanskrit. An English voice reading "Shailaputri"
// would get them wrong.
//
// Only voices that run on the device itself (`localService`) are used, so
// nothing is sent anywhere. Some browsers also offer online voices; those are
// skipped. If the device has no offline Hindi voice, the button is hidden.

import { useEffect, useState } from 'react';

const supported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function findHindiVoice(): SpeechSynthesisVoice | undefined {
  if (!supported()) return undefined;
  const onDevice = speechSynthesis.getVoices().filter((v) => v.localService);
  const lang = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();
  return onDevice.find((v) => lang(v) === 'hi-in') ?? onDevice.find((v) => lang(v).startsWith('hi'));
}

// The device's offline Hindi voice, or undefined if there is none. Browsers
// load their list of voices a moment after the page opens, so this listens
// for it.
export function useHindiVoice() {
  const [voice, setVoice] = useState(findHindiVoice);
  useEffect(() => {
    if (!supported()) return;
    const update = () => setVoice(findHindiVoice());
    speechSynthesis.addEventListener('voiceschanged', update);
    update();
    return () => speechSynthesis.removeEventListener('voiceschanged', update);
  }, []);
  return voice;
}

export function sayName(devanagari: string, voice: SpeechSynthesisVoice) {
  speechSynthesis.cancel(); // a second tap starts again rather than queueing
  const utterance = new SpeechSynthesisUtterance(devanagari);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.8; // a little slower than normal speech, so a child can repeat it
  speechSynthesis.speak(utterance);
}
