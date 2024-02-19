import {
  asyncStorageNotesService,
  asyncStorageSettingsService,
} from '@/infrastructure/storageLayer/services';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {NotesService} from './notesService';
import {
  noteStoreService,
  settingsStoreService,
} from '@/infrastructure/storeLayer/services';
import {AppServiceContract} from '../contracts/appService.contract';
import {AppService} from './appService';

let notesServiceInstance: NotesServiceContract;
let appServiceInstance: AppServiceContract;

function getNotesServiceInstance(): NotesServiceContract {
  if (!notesServiceInstance) {
    notesServiceInstance = new NotesService(
      asyncStorageNotesService,
      noteStoreService,
    );
  }
  return notesServiceInstance;
}

function getAppServiceInstance(): AppServiceContract {
  if (!appServiceInstance) {
    appServiceInstance = new AppService(
      asyncStorageSettingsService,
      settingsStoreService,
    );
  }
  return appServiceInstance;
}

export const notesService: NotesServiceContract = getNotesServiceInstance();
export const appService: AppServiceContract = getAppServiceInstance();
