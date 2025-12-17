import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { COLORS } from '../constants/theme';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useTheme = () => {
  const themeMode = useAppSelector(state => state.theme?.mode || 'light');
  const isDark = themeMode === 'dark';
  
  return {
    colors: isDark ? COLORS.dark : COLORS.light,
    isDark,
    mode: themeMode,
  };
};
