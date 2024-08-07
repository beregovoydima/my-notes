// store.js
import {
  Action,
  ThunkAction,
  ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit';
import notesSlice from './notes';
import foldersSlice from './folders';
import listSlice from './list';
import settingsSlice from './settings';
import calendarEventSlice from './calendarEvents';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    notes: notesSlice,
    folders: foldersSlice,
    list: listSlice,
    settings: settingsSlice,
    calendarEvents: calendarEventSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;
