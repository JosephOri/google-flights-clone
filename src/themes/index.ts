import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  custom: {
    accentColor: '#ff4081',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: '#000',
    },
    secondary: {
      main: '#f48fb1',
      contrastText: '#000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  custom: {
    accentColor: '#ff80ab',
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      accentColor: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      accentColor?: string;
    };
  }
}