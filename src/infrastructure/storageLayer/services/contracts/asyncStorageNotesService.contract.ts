import {NotesFolderItem, NotesItemList} from '@/core/interfaces';

export interface AsyncStorageNotesServiceContract {
  setNotes(note: NotesItemList[]): Promise<void>;
  getCollectionNote(): Promise<NotesItemList[] | null>;
  removeAllNotes(): Promise<void>;
  setFolders(folders: NotesFolderItem[]): Promise<void>;
  getFoldersCollection(): Promise<NotesFolderItem[] | null>;
  removeAllNotes(): Promise<void>;
}
