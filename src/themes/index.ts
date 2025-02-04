import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#424242',
    },
    primary: {
      main: '#4285F4',
    },
    secondary: {
      main: '#EA4335',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#202124',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E8EAED',
    },
    primary: {
      main: '#8AB4F8',
    },
    secondary: {
      main: '#F4B4AA',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
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
