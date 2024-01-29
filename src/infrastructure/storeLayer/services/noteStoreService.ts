import {NoteStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';
import {StoreRepositoryContract} from '@/infrastructure/storeLayer/repository/contracts';
import {NotesFolderItem, NotesItems, NotesListItem} from '@/core/interfaces';

export class NoteStoreService implements NoteStoreServiceContract {
  constructor(private readonly storeRepository: StoreRepositoryContract) {}

  public setNotesCollection(notes: NotesItems[]): void {
    this.storeRepository.set('notes', 'setNotes', notes);
  }

  public getNotesCollection(): NotesItems[] {
    return this.storeRepository.get('notes', 'notes');
  }

  public setNote(note: NotesItems): void {
    this.storeRepository.set('notes', 'setNote', note);
  }

  public getFoldersCollection(): NotesFolderItem[] {
    return this.storeRepository.get('folders', 'folders');
  }

  public setFoldersCollection(folders: NotesFolderItem[]): void {
    this.storeRepository.set('folders', 'setFolders', folders);
  }

  public setFolder(folder: NotesFolderItem): void {
    this.storeRepository.set('folders', 'setFolder', folder);
  }

  public updateFolder(folder: NotesFolderItem): void {
    this.storeRepository.set('folders', 'updateFolder', folder);
  }

  public setList(list: NotesListItem): void {
    this.storeRepository.set('list', 'setList', list);
  }

  public getListCollection(): NotesListItem[] {
    return this.storeRepository.get('list', 'list');
  }

  public setListCollection(lists: NotesListItem[]): void {
    this.storeRepository.set('list', 'setLists', lists);
  }

  public updateList(list: NotesListItem): void {
    this.storeRepository.set('list', 'updateList', list);
  }
}
