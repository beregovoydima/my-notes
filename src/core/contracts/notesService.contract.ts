import {NotesFolderItem, NotesItems} from '@/core/interfaces';

export interface NotesServiceContract {
  setNote(note: NotesItems): Promise<void>;
  getCollectionNoteFromStorage(): Promise<NotesItems[] | null>;
  removeNotes(): Promise<void>;
  setNotesInStore(notes: NotesItems[]): void;
  getCollectionNote(): NotesItems[];
  setNotesinStorage(notes: NotesItems[]): Promise<void>;
  setFoldersInStorage(folders: NotesFolderItem[]): Promise<void>;
  getFoldersCollectionFromStorage(): Promise<NotesFolderItem[] | null>;
  removeFolder(id: number): Promise<void>;
  removeAllNotes(): Promise<void>;
  getFoldersCollection(): NotesFolderItem[];
  setFolders(folders: NotesFolderItem[]): void;
  setFolder(folder: NotesFolderItem): void;
}
