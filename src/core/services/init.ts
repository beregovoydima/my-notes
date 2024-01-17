import {asyncStorageNotesService} from '@/infrastructure/storageLayer/services';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {NotesService} from './notesService';

let notesServiceInstance: NotesServiceContract;

function getNotesServiceInstance(): NotesServiceContract {
  if (!notesServiceInstance) {
    notesServiceInstance = new NotesService(asyncStorageNotesService);
  }
  return notesServiceInstance;
}

export const notesService: NotesServiceContract = getNotesServiceInstance();
