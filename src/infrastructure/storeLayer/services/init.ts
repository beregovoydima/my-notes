import {storeRepository} from '../repository';
import {CalendarStoreService} from './calendarStoreService';
import {
  NoteStoreServiceContract,
  SettingsStoreServiceContract,
} from './contracts';
import {CalendarStoreServiceContract} from './contracts/calendarStoreService.contract';
import {NoteStoreService} from './noteStoreService';
import {SettingsStoreService} from './settingsStoreService';

let storeServiceInstance: NoteStoreServiceContract;
let settingsStoreInstance: SettingsStoreServiceContract;
let calendarStoreInstance: CalendarStoreServiceContract;

function getStoreServiceInstance(): NoteStoreServiceContract {
  if (!storeServiceInstance) {
    storeServiceInstance = new NoteStoreService(storeRepository);
  }
  return storeServiceInstance;
}

function getSettingsStoreServiceInstance(): SettingsStoreServiceContract {
  if (!settingsStoreInstance) {
    settingsStoreInstance = new SettingsStoreService(storeRepository);
  }
  return settingsStoreInstance;
}

function getCalendarStoreServiceInstance(): CalendarStoreServiceContract {
  if (!calendarStoreInstance) {
    calendarStoreInstance = new CalendarStoreService(storeRepository);
  }
  return calendarStoreInstance;
}

export const noteStoreService: NoteStoreServiceContract =
  getStoreServiceInstance();
export const settingsStoreService: SettingsStoreServiceContract =
  getSettingsStoreServiceInstance();
export const calendarStoreService: CalendarStoreServiceContract =
  getCalendarStoreServiceInstance();
