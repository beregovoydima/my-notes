import {NotesFolderItem, NotesItems, NotesListItem} from '@/core/interfaces';

export interface NotesServiceContract {
  storeSetNote(note: NotesItems): Promise<void>;
  storageSetNotes(notes: NotesItems[]): Promise<void>;
  storeSetNotes(notes: NotesItems[]): void;
  storageGetCollectionNote(): Promise<NotesItems[] | null>;
  storageRemoveNotes(): Promise<void>;
  storeGetCollectionNote(): NotesItems[];
  storageSetFolders(folders: NotesFolderItem[]): Promise<void>;
  storageGetFoldersCollection(): Promise<NotesFolderItem[] | null>;
  storageRemoveFolder(id: number): Promise<void>;
  storageRemoveAllNotes(): Promise<void>;
  storeGetFoldersCollection(): NotesFolderItem[];
  storeSetFolder(folder: NotesFolderItem): void;
  storeSetFolders(folders: NotesFolderItem[]): void;
  storeAddList(list: NotesListItem): void;
  storeGetListCollection(): NotesListItem[];
  storeUpdateList(list: NotesListItem): void;
  storeSetListCollection(lists: NotesListItem[]): void;
  storageSetLists(lists: NotesListItem[]): Promise<void>;
  storageGetListCollection(): Promise<NotesListItem[] | null>;
}
