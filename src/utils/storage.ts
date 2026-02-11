import { createMMKV } from 'react-native-mmkv';
import type { MMKV } from 'react-native-mmkv';
import { Cell, HistoryEntry } from '../types/game';

let storage: MMKV | null = null;

const getStorage = (): MMKV | null => {
  if (storage) return storage;
  try {
    storage = createMMKV();
    return storage;
  } catch {
    return null;
  }
};

const KEYS = {
  GAME_STATE: 'game_state',
  HIGH_SCORE: 'high_score',
  THEME_PREFERENCE: 'theme_preference',
} as const;

interface SavedGameState {
  cells: Cell[];
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
  history: HistoryEntry[];
}

export const saveGameState = (state: SavedGameState): void => {
  try {
    const s = getStorage();
    if (!s) return;
    s.set(KEYS.GAME_STATE, JSON.stringify(state));
  } catch {
    // Silently fail — game still works without persistence
  }
};

export const loadGameState = (): SavedGameState | null => {
  try {
    const s = getStorage();
    if (!s) return null;
    const raw = s.getString(KEYS.GAME_STATE);
    if (!raw) return null;
    return JSON.parse(raw) as SavedGameState;
  } catch {
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    const s = getStorage();
    if (!s) return;
    s.remove(KEYS.GAME_STATE);
  } catch {
    // Silently fail
  }
};

export const saveHighScore = (score: number): void => {
  try {
    const s = getStorage();
    if (!s) return;
    s.set(KEYS.HIGH_SCORE, score);
  } catch {
    // Silently fail
  }
};

export const loadHighScore = (): number => {
  try {
    const s = getStorage();
    if (!s) return 0;
    return s.getNumber(KEYS.HIGH_SCORE) ?? 0;
  } catch {
    return 0;
  }
};

export const saveThemePreference = (pref: string): void => {
  try {
    getStorage()?.set(KEYS.THEME_PREFERENCE, pref);
  } catch {
    // Silently fail — app still works with default theme
  }
};

export const loadThemePreference = (): string | null => {
  try {
    return getStorage()?.getString(KEYS.THEME_PREFERENCE) ?? null;
  } catch {
    return null;
  }
};
