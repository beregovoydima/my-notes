import {NotesItemList} from '../interfaces';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {AsyncStorageNotesServiceContract} from '@/infrastructure/storageLayer/services/contracts';

export class NotesService implements NotesServiceContract {
  constructor(
    private readonly asyncStorageNotesService: AsyncStorageNotesServiceContract,
  ) {}

  public async setNote(note: NotesItemList): Promise<void> {
    return await this.asyncStorageNotesService.setNote(note);
  }

  public async getCollectionNote(): Promise<NotesItemList[] | null> {
    return await this.asyncStorageNotesService.getCollectionNote();
  }

  public async removeNotes(): Promise<void> {
    return await this.removeNotes();
  }
}
