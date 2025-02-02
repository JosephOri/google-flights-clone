import { makeAutoObservable } from 'mobx';
import { lightTheme, darkTheme } from '../themes';

type ThemeName = 'light' | 'dark';

class ThemeStore {
  currentThemeName: ThemeName = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  get currentTheme() {
    return this.currentThemeName === 'light' ? lightTheme : darkTheme;
  }

  toggleTheme = () => {
    this.currentThemeName = this.currentThemeName === 'light' ? 'dark' : 'light';
  };
}

export default ThemeStore;
