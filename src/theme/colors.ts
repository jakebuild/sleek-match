export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  cleared: string;
  selectedBorder: string;
  selectedBackground: string;
};

export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#333333',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  accent: '#BB86FC',
  cleared: 'transparent',
  selectedBorder: '#BB86FC',
  selectedBackground: '#444444',
};

export const lightColors: ThemeColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  accent: '#6200EE',
  cleared: 'transparent',
  selectedBorder: '#6200EE',
  selectedBackground: '#E8DEF8',
};

// Backward-compat alias — removed after SettingsScreen migration in Task 2
export const colors = darkColors;
