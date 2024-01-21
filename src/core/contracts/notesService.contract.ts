import {NotesFolderItem, NotesItemList} from '@/core/interfaces';

export interface NotesServiceContract {
  setNote(note: NotesItemList): Promise<void>;
  getCollectionNoteFromStorage(): Promise<NotesItemList[] | null>;
  removeNotes(): Promise<void>;
  setNotesInStore(notes: NotesItemList[]): void;
  getCollectionNote(): NotesItemList[];
  setNotesinStorage(notes: NotesItemList[]): Promise<void>;
  setFoldersInStorage(folders: NotesFolderItem[]): Promise<void>;
  getFoldersCollectionFromStorage(): Promise<NotesFolderItem[] | null>;
  removeFolder(id: number): Promise<void>;
  removeAllNotes(): Promise<void>;
  getFoldersCollection(): NotesFolderItem[];
  setFolders(folders: NotesFolderItem[]): void;
  setFolder(folder: NotesFolderItem): void;
}
