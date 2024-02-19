import {storeRepository} from '../repository';
import {
  NoteStoreServiceContract,
  SettingsStoreServiceContract,
} from './contracts';
import {NoteStoreService} from './noteStoreService';
import {SettingsStoreService} from './settingsStoreService';

let storeServiceInstance: NoteStoreServiceContract;
let settingsStoreInstance: SettingsStoreServiceContract;

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

export const noteStoreService: NoteStoreServiceContract =
  getStoreServiceInstance();
export const settingsStoreService: SettingsStoreServiceContract =
  getSettingsStoreServiceInstance();
