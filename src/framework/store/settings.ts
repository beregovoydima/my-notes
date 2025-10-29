import {lightColors} from '@/assets/config/colors';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '@/core/interfaces';

export interface StateSettings {
  colors: string[];
  showCardBackground: boolean;
  themeMode?: ThemeMode;
}

const initialState: StateSettings = {
  colors: [
    lightColors.purpleDeep,
    lightColors.deepOrangeColor,
    lightColors.yellowAccent,
    lightColors.lime,
    lightColors.cian,
    lightColors.success,
    lightColors.info,
    lightColors.orangeColor,
    lightColors.blueGrey,
    lightColors.primary,
    lightColors.accent,
    lightColors.error,
  ],
  showCardBackground: false,
  themeMode: 'system',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = [...action.payload];
    },
    setShowCardBackground: (state, action: PayloadAction<boolean>) => {
      state.showCardBackground = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const {setColors, setShowCardBackground, setThemeMode} =
  settingsSlice.actions;
export default settingsSlice.reducer;
