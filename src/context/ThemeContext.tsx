import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes';

interface ThemeModeContextType {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: typeof lightTheme;
}

export const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = theme.palette.background.default;
  }, [isDarkMode]);

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
