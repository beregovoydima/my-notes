import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useTheme as _useTheme} from 'react-native-paper';

// export const lightColors = {
//   success: '#67C23A',
//   warning: '#E6A23C',
//   danger: '#F56C6C',
//   info: '#909399',
//   primary: '#daff59',
//   lightGrey: '#e9eef2',
//   background: '#ecf0f1',
//   navbar: '#e9eef2',
// };

// export const darkColors = {
//   success: '#67C23A',
//   warning: '#E6A23C',
//   danger: '#F56C6C',
//   info: '#909399',
//   primary: '#daff59',
//   lightGrey: '#e9eef2',
//   background: '#ecf0f1',
//   navbar: '#e9eef2',
// };

// primary: string;
// primaryContainer: string;
// secondary: string;
// secondaryContainer: string;
// tertiary: string;
// tertiaryContainer: string;
// surface: string;
// surfaceVariant: string;
// surfaceDisabled: string;
// background: string;
// error: string;
// errorContainer: string;
// onPrimary: string;
// onPrimaryContainer: string;
// onSecondary: string;
// onSecondaryContainer: string;
// onTertiary: string;
// onTertiaryContainer: string;
// onSurface: string;
// onSurfaceVariant: string;
// onSurfaceDisabled: string;
// onError: string;
// onErrorContainer: string;
// onBackground: string;
// outline: string;
// outlineVariant: string;
// inverseSurface: string;
// inverseOnSurface: string;
// inversePrimary: string;
// shadow: string;
// scrim: string;
// backdrop: string;
// elevation: MD3ElevationColors;

export const lightColors = {
  primary: '#6B52AE', // Основной фиолетовый
  accent: '#8f5db7',
  success: '#2ecc71', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // Синий (дополнительный)
  background: '#f7f8fa', // Светлый серый
  text: '#2c3e50', // Темный серый
  navbar: '#ffffff', // Белый
  whiteColor: '#ffffff',
  greyColor: '#6D7693',
  lineGreyColor: '#d9dde0',
  // primaryContainer: '#d9dde0',
  // secondaryContainer: '#ecf0f1',
};

export const darkColors = {
  primary: '#6B52AE', // Основной фиолетовый
  accent: '#8f5db7',
  success: '#2ecc71', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // #f7f8fa#2c3e50', // Темно-синий
  background: '#f7f8fa', // Светлый серый
  text: '#ecf0f1', // Светлый серый
  navbar: '#34495e', // Темно-синий
  whiteColor: '#ffffff',
  greyColor: '#6D7693',
  lineGreyColor: '#d9dde0',
  // primaryContainer: '#d9dde0',
  // secondaryContainer: 'red',
};

export const lightTheme = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

type MyTheme = typeof lightTheme | typeof darkTheme;

export function useTheme() {
  const theme = _useTheme<MyTheme>();
  return theme;
}
