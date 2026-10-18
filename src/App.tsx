// The app's screens: the opening splash, the nine-night map, the parent prep
// sheet, the spoiler notice (once, before the series starts), the night
// player, and the night's closing.

import { useCallback, useEffect, useState } from 'react';
import { unlock, useSplashMusic } from './audio';
import { scores } from './audio/scores';
import { ClosingScreen } from './components/ClosingScreen';
import { NightMap } from './components/NightMap';
import { DisclaimerPage } from './components/DisclaimerPage';
import { NightPlayer } from './components/NightPlayer';
import { PrepSheet } from './components/PrepSheet';
import { SplashScreen } from './components/SplashScreen';
import { SpoilerScreen } from './components/SpoilerScreen';
import { mapStops } from './content/journey';
import { nights } from './content/nights';
import { defaultProgress, defaultSettings, type Settings, useSaved } from './state/progress';

type Screen =
  | { name: 'splash' }
  | { name: 'map' }
  | { name: 'prep' }
  | { name: 'disclaimer'; from: 'splash' | 'map' }
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

  // Calm music under the splash, the map and the prep sheet.
  useSplashMusic(settings, screen.name === 'splash' || screen.name === 'map' || screen.name === 'prep' || screen.name === 'disclaimer');

  const backToMap = useCallback(() => setScreen({ name: 'map' }), []);

  if (screen.name === 'splash') {
    return <SplashScreen settings={settings} onSettings={setSettings} reading={reading} onBegin={backToMap} onDisclaimer={() => setScreen({ name: 'disclaimer', from: 'splash' })} />;
  }

  if (screen.name === 'disclaimer') {
    const fromSplash = screen.from === 'splash';
    return <DisclaimerPage backLabel={fromSplash ? 'Back' : 'Back to the map'} onBack={() => setScreen(fromSplash ? { name: 'splash' } : { name: 'map' })} />;
  }

  if (screen.name === 'prep') {
    return <PrepSheet onBack={backToMap} />;
  }

  if (screen.name === 'closing') {
    return <ClosingScreen night={nights[screen.night]} captions={settings.captions} onDone={backToMap} />;
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
    const night = nights[screen.night];
    return (
      <NightPlayer
        night={night}
        score={scores}
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
      onPrep={() => setScreen({ name: 'prep' })}
      onDisclaimer={() => setScreen({ name: 'disclaimer', from: 'map' })}
      onOpen={(night) => setScreen(progress.seenSpoiler ? { name: 'night', night } : { name: 'notice', night })}
    />
  );
}
