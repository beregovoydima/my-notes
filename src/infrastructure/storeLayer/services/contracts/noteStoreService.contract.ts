import {NotesFolderItem, NotesItemList} from '@/core/interfaces';

export interface NoteStoreServiceContract {
  setNotesCollection(notes: NotesItemList[]): void;
  setNote(note: NotesItemList): void;
  getNotesCollection(): NotesItemList[];
  getFoldersCollection(): NotesFolderItem[];
  setFoldersCollection(folders: NotesFolderItem[]): void;
  setFolder(folder: NotesFolderItem): void;
  updateFolder(folder: NotesFolderItem): void;
}
