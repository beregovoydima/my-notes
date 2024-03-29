import {NotesListItem} from '@/core/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateFolders {
  list: NotesListItem[];
}

const initialState: StateFolders = {
  list: [],
};

const notesSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<NotesListItem[]>) => {
      state.list = [...action.payload];
    },
    removeListById: (state, action: PayloadAction<string>) => {
      state.list = [...state.list.filter(el => el.id !== action.payload)];
    },
    setList: (state, action: PayloadAction<NotesListItem>) => {
      state.list = [...state.list, action.payload];
    },
    updateList: (state, action: PayloadAction<NotesListItem>) => {
      state.list = state.list.map(list =>
        list.id === action.payload.id ? {...action.payload} : list,
      );
    },
    updateListField: (state, action: PayloadAction<NotesListItem>) => {
      const {items, id} = action.payload;

      state.list = state.list.map(list =>
        list.id === id ? {...list, items: [...items]} : list,
      );
    },
  },
});

export const {setLists, removeListById, setList, updateList} =
  notesSlice.actions;
export default notesSlice.reducer;
