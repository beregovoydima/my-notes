import {NotesFolderItem, NotesItems, NotesListItem} from '../interfaces';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {AsyncStorageNotesServiceContract} from '@/infrastructure/storageLayer/services/contracts';
import {NoteStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';

export class NotesService implements NotesServiceContract {
  constructor(
    private readonly asyncStorageNotesService: AsyncStorageNotesServiceContract,
    private readonly notesStoreService: NoteStoreServiceContract,
  ) {}

  public async storeSetNote(note: NotesItems): Promise<void> {
    const notes = this.notesStoreService.getNotesCollection();
    this.storeSetNotes([...notes, note]);
    return await this.asyncStorageNotesService.setNotes([...notes, note]);
  }

  public async storageSetNotes(notes: NotesItems[]): Promise<void> {
    return await this.asyncStorageNotesService.setNotes([...notes]);
  }

  public storeSetNotes(notes: NotesItems[]): void {
    this.notesStoreService.setNotesCollection(notes);
  }

  public async storageGetCollectionNote(): Promise<NotesItems[] | null> {
    return await this.asyncStorageNotesService.getCollectionNote();
  }

  public async storageRemoveNotes(): Promise<void> {
    return await this.asyncStorageNotesService.removeAllNotes();
  }

  public storeGetCollectionNote(): NotesItems[] {
    return this.notesStoreService.getNotesCollection();
  }

  public async storageSetFolders(folders: NotesFolderItem[]): Promise<void> {
    await this.asyncStorageNotesService.setFolders([...folders]);
  }

  public async storageGetFoldersCollection(): Promise<
    NotesFolderItem[] | null
  > {
    return await this.asyncStorageNotesService.getFoldersCollection();
  }

  public async storageRemoveFolder(id: number): Promise<void> {
    console.log(id);

    // this.asyncStorageNotesService.
  }

  public async storageRemoveAllNotes(): Promise<void> {
    return await this.asyncStorageNotesService.removeAllNotes();
  }

  public storeGetFoldersCollection(): NotesFolderItem[] {
    return this.notesStoreService.getFoldersCollection();
  }

  public storeSetFolder(folder: NotesFolderItem): void {
    this.notesStoreService.setFolder(folder);
  }

  public storeSetFolders(folders: NotesFolderItem[]): void {
    this.notesStoreService.setFoldersCollection(folders);
  }

  public storeAddList(list: NotesListItem): void {
    this.notesStoreService.setList(list);
  }

  public storeGetListCollection(): NotesListItem[] {
    return this.notesStoreService.getListCollection();
  }

  public storeUpdateList(list: NotesListItem): void {
    this.notesStoreService.updateList(list);
  }

  public storeSetListCollection(lists: NotesListItem[]): void {
    this.notesStoreService.setListCollection(lists);
  }

  public async storageSetLists(lists: NotesListItem[]): Promise<void> {
    this.asyncStorageNotesService.setLists(lists);
  }

  public async storageGetListCollection(): Promise<NotesListItem[] | null> {
    return await this.asyncStorageNotesService.getListCollection();
  }
}
