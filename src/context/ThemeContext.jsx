import { createContext, useContext, useState } from 'react';

/**
 * ThemeContext - Theme state provider
 * Phase 1: Shell only — always returns 'dark' theme
 */
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme] = useState('dark');

  const value = {
    theme,
    // Phase 2: toggleTheme, setTheme functions
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
