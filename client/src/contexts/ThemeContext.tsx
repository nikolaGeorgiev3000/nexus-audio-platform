import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component that manages theme state and persistence
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, default to dark if not set
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored || 'dark';
  });

  // Use useLayoutEffect to apply theme synchronously before browser paint
  // This prevents flash of unstyled content and ensures proper theme application
  useLayoutEffect(() => {
    const root = document.documentElement;

    // Remove both classes first to ensure clean state
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Persist theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
