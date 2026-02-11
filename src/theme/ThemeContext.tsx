import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ThemeColors } from './colors';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  const value = useMemo(() => {
    let isDark: boolean;
    if (preference === 'system') {
      isDark = systemScheme !== 'light'; // fallback to dark if null
    } else {
      isDark = preference === 'dark';
    }

    return {
      colors: isDark ? darkColors : lightColors,
      isDark,
    };
  }, [preference, systemScheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
