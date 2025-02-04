import { ThemeModeContext } from '../ThemeContext';
import { useAbstractContext } from './useAbstractContext';

export const useThemeMode = () => {
  return useAbstractContext(ThemeModeContext);
};
