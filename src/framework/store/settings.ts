import {lightColors} from '@/assets/config/colors';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateSettings {
  colors: string[];
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
  ],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = [...action.payload];
    },
  },
});

export const {setColors} = settingsSlice.actions;
export default settingsSlice.reducer;
