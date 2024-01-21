import {storeRepository} from '../repository';
import {NoteStoreServiceContract} from './contracts';
import {NoteStoreService} from './noteStoreService';

let storeServiceInstance: NoteStoreServiceContract;

function getStoreServiceInstance(): NoteStoreServiceContract {
  if (!storeServiceInstance) {
    storeServiceInstance = new NoteStoreService(storeRepository);
  }
  return storeServiceInstance;
}

export const noteStoreService: NoteStoreServiceContract =
  getStoreServiceInstance();
