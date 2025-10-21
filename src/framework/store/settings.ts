import {lightColors} from '@/assets/config/colors';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateSettings {
  colors: string[];
  showCardBackground: boolean;
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
  },
});

export const {setColors, setShowCardBackground} = settingsSlice.actions;
export default settingsSlice.reducer;
