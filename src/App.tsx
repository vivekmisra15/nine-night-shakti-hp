// The app's screens: the opening splash, the nine-night map, the spoiler
// notice (once, before the series starts), the night player, and the
// night's closing.

import { useCallback, useEffect, useState } from 'react';
import { unlock, useSplashMusic } from './audio';
import { day1Score } from './audio/day1Score';
import type { BeatScore } from './audio/score';
import { ClosingScreen } from './components/ClosingScreen';
import { NightMap } from './components/NightMap';
import { NightPlayer } from './components/NightPlayer';
import { SplashScreen } from './components/SplashScreen';
import { SpoilerScreen } from './components/SpoilerScreen';
import { day1 } from './content/day1';
import { mapStops } from './content/journey';
import type { Night } from './content/types';
import { defaultProgress, defaultSettings, type Settings, useSaved } from './state/progress';

// Built nights, by number, each with its score plan. Add day2 here once
// Night 2 is approved and built.
const nights: Record<number, { night: Night; score: Record<string, BeatScore> }> = {
  1: { night: day1, score: day1Score },
};

type Screen =
  | { name: 'splash' }
  | { name: 'map' }
  | { name: 'notice'; night: number }
  | { name: 'night'; night: number }
  | { name: 'closing'; night: number };

// True when the device asks for reduced motion; updates if the setting changes.
function useDeviceReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return;
    const onChange = () => setReduced(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'splash' });
  const [saved, setSettings] = useSaved<Settings>('settings', defaultSettings);
  // Settings saved by an older version may be missing newer choices.
  const settings: Settings = { ...defaultSettings, ...saved, volumes: { ...defaultSettings.volumes, ...saved.volumes } };
  const [savedProgress, setProgress] = useSaved('progress', defaultProgress);
  const progress = { ...defaultProgress, ...savedProgress, lastStep: savedProgress.lastStep ?? {} };
  const deviceReducedMotion = useDeviceReducedMotion();
  const reading = settings.readingMode ?? deviceReducedMotion;

  // Browsers allow sound only after the user taps, clicks or presses a key,
  // so the first one anywhere unlocks it.
  useEffect(() => {
    const onGesture = () => unlock();
    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
    return () => {
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
    };
  }, []);

  // Calm music under the splash and the map.
  useSplashMusic(settings, screen.name === 'splash' || screen.name === 'map');

  const backToMap = useCallback(() => setScreen({ name: 'map' }), []);

  if (screen.name === 'splash') {
    return <SplashScreen settings={settings} onSettings={setSettings} reading={reading} onBegin={backToMap} />;
  }

  if (screen.name === 'closing') {
    const idea = nights[screen.night].night.beats.find((b) => b.type === 'idea');
    const theme = idea?.type === 'idea' ? idea.theme : { word: '', idea: '' };
    return <ClosingScreen theme={theme} captions={settings.captions} onDone={backToMap} />;
  }

  if (screen.name === 'notice') {
    return (
      <SpoilerScreen
        onBack={backToMap}
        onContinue={() => {
          setProgress({ ...progress, seenSpoiler: true });
          setScreen({ name: 'night', night: screen.night });
        }}
      />
    );
  }

  if (screen.name === 'night') {
    const { night, score } = nights[screen.night];
    return (
      <NightPlayer
        night={night}
        score={score}
        stop={mapStops[night.number - 1]}
        startStepId={progress.lastStep[night.number]}
        settings={settings}
        onSettings={setSettings}
        reading={reading}
        deviceReducedMotion={deviceReducedMotion}
        onStepChange={(id) => setProgress((p) => ({ ...p, lastStep: { ...(p.lastStep ?? {}), [night.number]: id } }))}
        onFinish={() => {
          // Light this night's diya and start from the beginning next time.
          setProgress((p) => ({
            ...p,
            completedNights: p.completedNights.includes(night.number) ? p.completedNights : [...p.completedNights, night.number],
            lastStep: { ...(p.lastStep ?? {}), [night.number]: '' },
          }));
          // The closing animation, unless Reading mode is on.
          setScreen(reading ? { name: 'map' } : { name: 'closing', night: night.number });
        }}
        onExit={backToMap}
      />
    );
  }

  return (
    <NightMap
      completed={progress.completedNights}
      settings={settings}
      onSettings={setSettings}
      onOpen={(night) => setScreen(progress.seenSpoiler ? { name: 'night', night } : { name: 'notice', night })}
    />
  );
}
