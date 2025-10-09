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
  primary: '#3F51B5', // Основной фиолетовый
  accent: '#8f5db7',
  success: '#4CAF50', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // Синий (дополнительный)
  error: '#E53935',
  background: '#f7f8fa', // Светлый серый
  text: '#2c3e50', // Темный серый
  navbar: '#ffffff', // Белый
  whiteColor: '#ffffff',
  greyColor: '#6D7693',
  lineGreyColor: '#d9dde0',
  blueColor: '#2a6b77',
  deepOrangeColor: '#FF5722',
  orangeColor: '#FF9800',
  redColor: '#bf2f13',
  greyDarkFill: '#F0F2F5',
  greyIconColor: '#6D7693',
  primaryContainer: '#E8EAF6',
  // onPrimaryContainer: '#DEE4F0',
  purpleDeep: '#673AB7',
  yellowAccent: '#FFD600',
  cian: '#00BCD4',
  lime: '#C0CA33',
  greenAccent: '#7CB342',
  blueGrey: '#546E7A',
  secondaryContainer: '#DEE4F0', //background top active button tabs
  elevation: {
    level0: 'transparent',
    // Note: Color values with transparency cause RN to transfer shadows to children nodes
    // instead of View component in Surface. Providing solid background fixes the issue.
    // Opaque color values generated with `palette.primary99` used as background
    level1: '#f5f6fb', // palette.primary40, alpha 0.05
    level2: '#eff1f9', // palette.primary40, alpha 0.08
    level3: '#e9ebf6', // palette.primary40, alpha 0.11
    level4: '#e7eaf6', // palette.primary40, alpha 0.12
    level5: '#e4e6f4', // palette.primary40, alpha 0.14
  },
};

export const darkColors = {
  primary: '#6B52AE', // Основной фиолетовый
  accent: '#8f5db7',
  success: '#26A69A', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // #f7f8fa#2c3e50', // Темно-синий
  background: '#f7f8fa', // Светлый серый
  text: '#ecf0f1', // Светлый серый
  navbar: '#34495e', // Темно-синий
  whiteColor: '#ffffff',
  greyColor: '#6D7693',
  lineGreyColor: '#d9dde0',
  blueColor: '#2a6b77',
  orangeColor: '#d68f00',
  redColor: '#bf2f13',
  greyDarkFill: '#F0F2F5',
  greyIconColor: '#6D7693',
  primaryContainer: '#E8EAF6',
  onPrimaryContainer: '#DEE4F0',
  purpleDeep: '#673AB7',
  yellowAccent: '#FFD600',
  cian: '#00BCD4',
  lime: '#C0CA33',
  greenAccent: '#7CB342',
  blueGrey: '#546E7A',
  secondaryContainer: '#DEE4F0',
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
