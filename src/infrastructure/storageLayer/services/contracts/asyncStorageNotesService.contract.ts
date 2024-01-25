import {NotesFolderItem, NotesItems} from '@/core/interfaces';

export interface AsyncStorageNotesServiceContract {
  setNotes(note: NotesItems[]): Promise<void>;
  getCollectionNote(): Promise<NotesItems[] | null>;
  removeAllNotes(): Promise<void>;
  setFolders(folders: NotesFolderItem[]): Promise<void>;
  getFoldersCollection(): Promise<NotesFolderItem[] | null>;
  removeAllNotes(): Promise<void>;
}
