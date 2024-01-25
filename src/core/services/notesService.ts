import {NotesFolderItem, NotesItems} from '../interfaces';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {AsyncStorageNotesServiceContract} from '@/infrastructure/storageLayer/services/contracts';
import {NoteStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';

export class NotesService implements NotesServiceContract {
  constructor(
    private readonly asyncStorageNotesService: AsyncStorageNotesServiceContract,
    private readonly notesStoreService: NoteStoreServiceContract,
  ) {}

  public async setNote(note: NotesItems): Promise<void> {
    const notes = this.notesStoreService.getNotesCollection();
    this.setNotesInStore([...notes, note]);
    return await this.asyncStorageNotesService.setNotes([...notes, note]);
  }

  public async setNotesinStorage(notes: NotesItems[]): Promise<void> {
    return await this.asyncStorageNotesService.setNotes([...notes]);
  }

  public setNotesInStore(notes: NotesItems[]): void {
    this.notesStoreService.setNotesCollection(notes);
  }

  public async getCollectionNoteFromStorage(): Promise<NotesItems[] | null> {
    return await this.asyncStorageNotesService.getCollectionNote();
  }

  public async removeNotes(): Promise<void> {
    return await this.removeNotes();
  }

  public getCollectionNote(): NotesItems[] {
    return this.notesStoreService.getNotesCollection();
  }

  public async setFoldersInStorage(folders: NotesFolderItem[]): Promise<void> {
    await this.asyncStorageNotesService.setFolders([...folders]);
  }

  public async getFoldersCollectionFromStorage(): Promise<
    NotesFolderItem[] | null
  > {
    return await this.asyncStorageNotesService.getFoldersCollection();
  }

  public removeFolder(id: number): Promise<void> {}

  public removeAllNotes(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public getFoldersCollection(): NotesFolderItem[] {
    return this.notesStoreService.getFoldersCollection();
  }

  public setFolder(folder: NotesFolderItem): void {
    this.notesStoreService.setFolder(folder);
  }

  public setFolders(folders: NotesFolderItem[]): void {
    this.notesStoreService.setFoldersCollection(folders);
  }
}
