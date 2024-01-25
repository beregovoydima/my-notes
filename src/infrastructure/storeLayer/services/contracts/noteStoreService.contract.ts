import {NotesFolderItem, NotesItems} from '@/core/interfaces';

export interface NoteStoreServiceContract {
  setNotesCollection(notes: NotesItems[]): void;
  setNote(note: NotesItems): void;
  getNotesCollection(): NotesItems[];
  getFoldersCollection(): NotesFolderItem[];
  setFoldersCollection(folders: NotesFolderItem[]): void;
  setFolder(folder: NotesFolderItem): void;
  updateFolder(folder: NotesFolderItem): void;
}
