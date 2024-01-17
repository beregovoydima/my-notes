import {AsyncStorageRepositoryContract} from '@/infrastructure/storageLayer/asyncStorageRepository/contracts';
import {AsyncStorageRepository} from '@/infrastructure/storageLayer/asyncStorageRepository/asyncStorageRepository';

let asyncStorageRepositoryInstance: AsyncStorageRepositoryContract;

function getAsyncStorageRepository(): AsyncStorageRepositoryContract {
  if (!asyncStorageRepositoryInstance) {
    asyncStorageRepositoryInstance = new AsyncStorageRepository();
  }
  return asyncStorageRepositoryInstance;
}

export const asyncStorageRepository: AsyncStorageRepositoryContract =
  getAsyncStorageRepository();
