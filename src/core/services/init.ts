import {
  asyncStorageCalendarService,
  asyncStorageNotesService,
  asyncStorageSettingsService,
} from '@/infrastructure/storageLayer/services';
import {NotesServiceContract} from '../contracts/notesService.contract';
import {NotesService} from './notesService';
import {
  calendarStoreService,
  noteStoreService,
  settingsStoreService,
} from '@/infrastructure/storeLayer/services';
import {AppServiceContract} from '../contracts/appService.contract';
import {AppService} from './appService';
import {CalendarServiceContract} from '../contracts/calendarService.contract';
import {CalendarService} from './calendarService';

let notesServiceInstance: NotesServiceContract;
let appServiceInstance: AppServiceContract;
let calendarServiceInstance: CalendarServiceContract;

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

function getCalendarServiceInstance(): CalendarServiceContract {
  if (!calendarServiceInstance) {
    calendarServiceInstance = new CalendarService(
      asyncStorageCalendarService,
      calendarStoreService,
    );
  }
  return calendarServiceInstance;
}

export const notesService: NotesServiceContract = getNotesServiceInstance();
export const appService: AppServiceContract = getAppServiceInstance();
export const calendarService: CalendarServiceContract =
  getCalendarServiceInstance();
