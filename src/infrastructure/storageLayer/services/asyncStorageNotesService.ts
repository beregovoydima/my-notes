import {NotesItemList} from '@/core/interfaces';
import {AsyncStorageRepositoryContract} from '../asyncStorageRepository/contracts';
import {AsyncStorageNotesServiceContract} from './contracts';

export class AsyncStorageNotesService
  implements AsyncStorageNotesServiceContract
{
  constructor(
    private readonly asyncStorageRepository: AsyncStorageRepositoryContract,
  ) {}

  public async setNote(note: NotesItemList): Promise<void> {
    const notes = await this.getCollectionNote();
    if (notes) {
      return await this.asyncStorageRepository.set(
        'notes',
        JSON.stringify([...notes, note]),
      );
    } else {
      return await this.asyncStorageRepository.set(
        'notes',
        JSON.stringify([note]),
      );
    }
  }

  public async getCollectionNote(): Promise<NotesItemList[] | null> {
    const response = await this.asyncStorageRepository.get('notes');
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }

  public async removeNotes(): Promise<void> {
    return await this.asyncStorageRepository.remove('notes');
  }
}
