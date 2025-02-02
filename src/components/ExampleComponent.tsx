import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';
import { useStore } from '../stores';

const ExampleComponent = observer(() => {
  const { themeStore } = useStore();
  const theme = themeStore.currentTheme;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        {theme.palette.mode === 'light' ? 'Light' : 'Dark'} Theme
      </Typography>

      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Primary Button
      </Button>

      <Button variant="outlined" color="secondary">
        Secondary Button
      </Button>

      <Box sx={{ mt: 4, p: 2, border: `2px solid ${theme.custom.accentColor}` }}>
        <Typography sx={{ color: theme.custom.accentColor }}>Custom Accent Color Section</Typography>
      </Box>

      <Button onClick={themeStore.toggleTheme}>toggle theme</Button>
    </Box>
  );
});

export default ExampleComponent;
