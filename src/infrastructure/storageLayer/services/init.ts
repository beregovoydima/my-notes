import {AsyncStorageNotesServiceContract} from '@/infrastructure/storageLayer/services/contracts';
import {asyncStorageRepository} from '@/infrastructure/storageLayer/asyncStorageRepository';
import {AsyncStorageNotesService} from '@/infrastructure/storageLayer/services/asyncStorageNotesService';

let asyncStorageServiceInstance: AsyncStorageNotesServiceContract;

function getAsyncStorageServiceInstance(): AsyncStorageNotesServiceContract {
  if (!asyncStorageServiceInstance) {
    asyncStorageServiceInstance = new AsyncStorageNotesService(
      asyncStorageRepository,
    );
  }
  return asyncStorageServiceInstance;
}

export const asyncStorageNotesService: AsyncStorageNotesServiceContract =
  getAsyncStorageServiceInstance();
