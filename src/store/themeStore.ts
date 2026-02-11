import { create } from 'zustand';
import { loadThemePreference, saveThemePreference } from '../utils/storage';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeState {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
}

const getInitialPreference = (): ThemePreference => {
  const saved = loadThemePreference();
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
};

export const useThemeStore = create<ThemeState>((set) => ({
  preference: getInitialPreference(),
  setPreference: (pref: ThemePreference) => {
    saveThemePreference(pref);
    set({ preference: pref });
  },
}));
