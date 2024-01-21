// store.js
import {
  Action,
  ThunkAction,
  ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit';
import notesSlice from './notes';
import foldersSlice from './folders';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    notes: notesSlice,
    folders: foldersSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;