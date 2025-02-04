import React from 'react';
import { useThemeMode } from '../context/hooks/useThemeMode';
import { Button } from '@mui/material';
const Header = () => {
  const { setIsDarkMode } = useThemeMode();
  return <Button onClick={() => setIsDarkMode((prev) => !prev)}>change theme</Button>;
};

export default Header;
