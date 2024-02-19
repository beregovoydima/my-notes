import {NotesFolderItem} from '@/core/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StateFolders {
  folders: NotesFolderItem[];
}

const initialState: StateFolders = {
  folders: [],
};

const notesSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<NotesFolderItem[]>) => {
      state.folders = [...action.payload];
    },
    removeFolderById: (state, action: PayloadAction<string>) => {
      state.folders = [...state.folders.filter(el => el.id !== action.payload)];
    },
    setFolder: (state, action: PayloadAction<NotesFolderItem>) => {
      state.folders = [...state.folders, action.payload];
    },
    updateFolder: (state, action: PayloadAction<NotesFolderItem>) => {
      state.folders = state.folders.map(folder =>
        folder.id === action.payload.id ? {...action.payload} : folder,
      );
    },
  },
});

export const {setFolders, removeFolderById} = notesSlice.actions;
export default notesSlice.reducer;
