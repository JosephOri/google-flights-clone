import { CssBaseline, ThemeProvider } from '@mui/material';
import { StoreProvider } from './stores';
import { useStore } from './stores';
import ExampleComponent from './components/ExampleComponent';

const ThemedApp = () => {
  const { themeStore } = useStore();

  return (
    <ThemeProvider theme={themeStore.currentTheme}>
      <CssBaseline />
      <ExampleComponent />
    </ThemeProvider>
  );
};

function App() {
  return (
    <StoreProvider>
      <ThemedApp />
    </StoreProvider>
  );
}

export default App;
