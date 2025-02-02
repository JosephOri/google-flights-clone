import { CssBaseline, ThemeProvider } from '@mui/material';
import { StoreProvider } from './stores';
import { useStore } from './stores';

const ThemedApp = () => {
  const { themeStore } = useStore();

  return (
    <ThemeProvider theme={themeStore.currentTheme}>
      <CssBaseline />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <ThemedApp />
    </StoreProvider>
  );
};

export default App;
