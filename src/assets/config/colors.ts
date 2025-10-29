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
  accent: '#6B52AE',
  success: '#4CAF50', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // Синий (дополнительный)
  error: '#E53935',
  background: '#f1f1f1', // Светлый серый
  text: '#2c3e50', // Темный серый
  navbar: '#e5e5e5', // Белый
  whiteColor: '#ffffff',
  greyColor: '#909399',
  lineGreyColor: '#d9dde0',
  blueColor: '#2a6b77',
  deepOrangeColor: '#FF5722',
  orangeColor: '#FF9800',
  redColor: '#bf2f13',
  greyDarkFill: '#F0F2F5',
  greyIconColor: '#616161',
  primaryContainer: '#E8EAF6',
  // onPrimaryContainer: '#DEE4F0',
  purpleDeep: '#673AB7',
  yellowAccent: '#FFD600',
  cian: '#00BCD4',
  lime: '#C0CA33',
  greenAccent: '#7CB342',
  blueGrey: '#546E7A',
  secondaryContainer: '#DEE4F0', //background top active button tabs
  cardBackgroundColor: '#ffffff',
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
  selectedTextColor: '#E8EAF6',
  dialogBackgroundColor: '#ffffff',
  black: '#000000',
};

export const darkColors = {
  primary: '#6B52AE', // Основной фиолетовый
  accent: '#bfa7dd',
  success: '#26A69A', // Зеленый
  warning: '#f39c12', // Оранжевый
  info: '#3498db', // #f7f8fa#2c3e50', // Темно-синий
  background: '#f7f8fa', // Светлый серый
  text: '#ecf0f1', // Светлый серый
  navbar: '#292929', // Темно-синий
  whiteColor: '#ffffff',
  greyColor: '#909399',
  lineGreyColor: '#d9dde0',
  blueColor: '#2a6b77',
  orangeColor: '#d68f00',
  redColor: '#bf2f13',
  greyDarkFill: '#F0F2F5',
  greyIconColor: '#d4d4d4',
  primaryContainer: '#E8EAF6',
  onPrimaryContainer: '#DEE4F0',
  purpleDeep: '#673AB7',
  yellowAccent: '#FFD600',
  cian: '#00BCD4',
  lime: '#C0CA33',
  greenAccent: '#7CB342',
  blueGrey: '#546E7A',
  secondaryContainer: '#DEE4F0',
  cardBackgroundColor: '#292929',
  selectedTextColor: '#a882cd',
  dialogBackgroundColor: '#292929',
  black: '#000000',
};

export const lightTheme = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    whiteColor: lightColors.whiteColor,
    greyIconColor: lightColors.greyIconColor,
    text: lightColors.text,
    greyColor: lightColors.greyColor,
    lime: lightColors.lime,
    lineGreyColor: lightColors.lineGreyColor,
    greyDarkFill: lightColors.greyDarkFill,
    primary: lightColors.primary,
    cardBackgroundColor: lightColors.cardBackgroundColor,
    background: lightColors.background,
    menuBackgroundColor: lightColors.whiteColor,
    navbar: lightColors.navbar,
    accent: lightColors.accent,
    selectedTextColor: lightColors.selectedTextColor,
    dialogBackgroundColor: lightColors.dialogBackgroundColor,
    activeChipColor: MD3LightTheme.colors.secondaryContainer,
    inactiveChipColor: lightColors.cardBackgroundColor,
    black: lightColors.black,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3DarkTheme.colors,
    whiteColor: darkColors.whiteColor,
    greyIconColor: darkColors.greyIconColor,
    text: darkColors.text,
    greyColor: darkColors.greyColor,
    lime: darkColors.lime,
    lineGreyColor: darkColors.lineGreyColor,
    greyDarkFill: darkColors.greyDarkFill,
    primary: darkColors.primary,
    cardBackgroundColor: darkColors.cardBackgroundColor,
    menuBackgroundColor: MD3DarkTheme.colors.background,
    navbar: darkColors.cardBackgroundColor,
    accent: darkColors.accent,
    selectedTextColor: darkColors.selectedTextColor,
    dialogBackgroundColor: darkColors.dialogBackgroundColor,
    activeChipColor: MD3DarkTheme.colors.secondary,
    inactiveChipColor: darkColors.cardBackgroundColor,
    black: darkColors.black,
  },
};

type MyTheme = typeof lightTheme | typeof darkTheme;

export function useTheme() {
  const theme = _useTheme<MyTheme>();
  return theme;
}
