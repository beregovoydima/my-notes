import {NotesFolderItem, NotesItems, NotesListItem} from '@/core/interfaces';

export interface NoteStoreServiceContract {
  setNotesCollection(notes: NotesItems[]): void;
  setNote(note: NotesItems): void;
  getNotesCollection(): NotesItems[];
  getFoldersCollection(): NotesFolderItem[];
  setFoldersCollection(folders: NotesFolderItem[]): void;
  setFolder(folder: NotesFolderItem): void;
  updateFolder(folder: NotesFolderItem): void;
  setList(list: NotesListItem): void;
  getListCollection(): NotesListItem[];
  setListCollection(lists: NotesListItem[]): void;
  updateList(list: NotesListItem): void;
}
