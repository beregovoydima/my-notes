import {NotesItems} from '@/core/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateNotes {
  notes: NotesItems[];
}

const initialState: StateNotes = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NotesItems[]>) => {
      state.notes = [...action.payload];
    },
    removeNoteById: (state, action: PayloadAction<string>) => {
      state.notes = [...state.notes.filter(el => el.id !== action.payload)];
    },
    setNote: (state, action: PayloadAction<NotesItems>) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

export const {setNotes, removeNoteById, setNote} = notesSlice.actions;
export default notesSlice.reducer;
