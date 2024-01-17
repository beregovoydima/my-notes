import {NotesItemList} from '@/core/interfaces';

export interface NotesServiceContract {
  setNote(note: NotesItemList): Promise<void>;
  getCollectionNote(): Promise<NotesItemList[] | null>;
  removeNotes(): Promise<void>;
}
