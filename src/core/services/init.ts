import {asyncStorageNotesService} from '@/infrastructure/storageLayer/services';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {NotesService} from './notesService';
import {noteStoreService} from '@/infrastructure/storeLayer/services';

let notesServiceInstance: NotesServiceContract;

function getNotesServiceInstance(): NotesServiceContract {
  if (!notesServiceInstance) {
    notesServiceInstance = new NotesService(
      asyncStorageNotesService,
      noteStoreService,
    );
  }
  return notesServiceInstance;
}

export const notesService: NotesServiceContract = getNotesServiceInstance();
