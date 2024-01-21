import {NoteStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';
import {StoreRepositoryContract} from '@/infrastructure/storeLayer/repository/contracts';
import {NotesFolderItem, NotesItemList} from '@/core/interfaces';

export class NoteStoreService implements NoteStoreServiceContract {
  constructor(private readonly storeRepository: StoreRepositoryContract) {}

  public setNotesCollection(notes: NotesItemList[]): void {
    this.storeRepository.set('notes', 'setNotes', notes);
  }

  public getNotesCollection(): NotesItemList[] {
    return this.storeRepository.get('notes', 'notes');
  }

  public setNote(note: NotesItemList): void {
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
}
