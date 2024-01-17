import {NotesItemList} from '@/core/interfaces';

export interface AsyncStorageNotesServiceContract {
  setNote(note: NotesItemList): Promise<void>;
  getCollectionNote(): Promise<NotesItemList[] | null>;
  removeNotes(): Promise<void>;
}
