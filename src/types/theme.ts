export type ThemeName = 'vs-dark' | 'github-dark' | 'dracula' | 'nord';

export interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
} 