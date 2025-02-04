import React from 'react';
import { ThemeProviderWrapper } from './context/ThemeContext';
import Header from './components/Header';

const App = () => {
  return (
    <ThemeProviderWrapper>
      <Header />
    </ThemeProviderWrapper>
  );
};

export default App;
