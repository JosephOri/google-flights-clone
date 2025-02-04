import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5', // Off-white for paper elements
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#424242', // Dark gray secondary text
    },
    primary: {
      main: '#4285F4', // Example primary blue (Google uses various blues)
    },
    secondary: {
      main: '#EA4335', // Example secondary red (for errors, etc.)
    },
    // ... other color properties as needed
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Or Google's specific font if you know it
    // ... other typography settings
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark gray background
      paper: '#202124',   // Near-black for paper elements
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#E8EAED', // Light gray secondary text
    },
    primary: {
      main: '#8AB4F8', // Example desaturated blue
    },
    secondary: {
      main: '#F4B4AA', // Example desaturated red
    },
     // ... other color properties as needed
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Or Google's specific font if you know it
    // ... other typography settings
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
