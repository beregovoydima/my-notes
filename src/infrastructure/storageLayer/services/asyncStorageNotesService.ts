import {NotesFolderItem, NotesItems, NotesListItem} from '@/core/interfaces';
import {AsyncStorageRepositoryContract} from '../asyncStorageRepository/contracts';
import {AsyncStorageNotesServiceContract} from './contracts';

export class AsyncStorageNotesService
  implements AsyncStorageNotesServiceContract
{
  readonly #notes = 'notes';
  readonly #folders = 'folders';
  readonly #list = 'list';

  constructor(
    private readonly asyncStorageRepository: AsyncStorageRepositoryContract,
  ) {}

  public async setNotes(notes: NotesItems[]): Promise<void> {
    const response = await this.asyncStorageRepository.set(
      this.#notes,
      JSON.stringify(notes),
    );

    return response;
  }

  public async getCollectionNote(): Promise<NotesItems[] | null> {
    const response = await this.asyncStorageRepository.get(this.#notes);
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }

  public async removeAllNotes(): Promise<void> {
    return await this.asyncStorageRepository.remove(this.#notes);
  }

  public async setFolders(folders: NotesFolderItem[]): Promise<void> {
    return await this.asyncStorageRepository.set(
      this.#folders,
      JSON.stringify(folders),
    );
  }

  public async getFoldersCollection(): Promise<NotesFolderItem[] | null> {
    const response = await this.asyncStorageRepository.get(this.#folders);
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }

  public async setLists(list: NotesListItem[]): Promise<void> {
    return await this.asyncStorageRepository.set(
      this.#list,
      JSON.stringify(list),
    );
  }

  public async getListCollection(): Promise<NotesListItem[] | null> {
    const response = await this.asyncStorageRepository.get(this.#list);
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }
}
