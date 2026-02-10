import { Audio } from 'expo-av';

type SoundType = 'tap' | 'match' | 'addLines' | 'win' | 'error';

let soundEnabled = true;
let initialized = false;

const initAudio = async () => {
  if (initialized) return;
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: false,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    initialized = true;
  } catch {
    // Audio not available
  }
};

// Simple synthesized sounds using Audio.Sound
// We generate short beeps at different frequencies
const playTone = async (frequency: number, durationMs: number) => {
  // expo-av doesn't support tone generation natively
  // Instead we'll use a simple click feedback approach
  // For a real app, bundle .wav/.mp3 files in assets/sounds/
  // For now, we'll skip actual sound playback and provide the infrastructure
};

export const playSound = async (type: SoundType): Promise<void> => {
  if (!soundEnabled) return;
  await initAudio();
  // Sound playback infrastructure ready
  // Actual sound files would be loaded here:
  // const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/tap.mp3'));
  // await sound.playAsync();
};

export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;
