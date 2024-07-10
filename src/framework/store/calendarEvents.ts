import {CalendarEventTaskType} from '@/core/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateFolders {
  events: CalendarEventTaskType[];
}

const initialState: StateFolders = {
  events: [],
};

const calendarEventSlice = createSlice({
  name: 'calendarEvents',
  initialState,
  reducers: {
    setCalendarEventsCollection: (
      state,
      action: PayloadAction<CalendarEventTaskType[]>,
    ) => {
      state.events = [...action.payload];
    },
    removeCalendarEventById: (state, action: PayloadAction<string>) => {
      state.events = [...state.events.filter(el => el.id !== action.payload)];
    },
    setCalendarEvent: (state, action: PayloadAction<CalendarEventTaskType>) => {
      state.events = [...state.events, action.payload];
    },
    updateCalendarEvent: (
      state,
      action: PayloadAction<CalendarEventTaskType>,
    ) => {
      state.events = state.events.map(event =>
        event.id === action.payload.id ? {...action.payload} : event,
      );
    },
  },
});

export const {
  setCalendarEventsCollection,
  removeCalendarEventById,
  updateCalendarEvent,
  setCalendarEvent,
} = calendarEventSlice.actions;
export default calendarEventSlice.reducer;
