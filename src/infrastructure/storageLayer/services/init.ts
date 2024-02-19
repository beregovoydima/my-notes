import {
  AsyncStorageNotesServiceContract,
  AsyncStorageSettingsServiceContract,
} from '@/infrastructure/storageLayer/services/contracts';
import {asyncStorageRepository} from '@/infrastructure/storageLayer/asyncStorageRepository';
import {AsyncStorageNotesService} from '@/infrastructure/storageLayer/services/asyncStorageNotesService';
import {AsyncStorageSettingsService} from './asyncStorageSettingsService';

let asyncStorageServiceInstance: AsyncStorageNotesServiceContract;
let asyncStorageSettingsServiceInstance: AsyncStorageSettingsServiceContract;

function getAsyncStorageServiceInstance(): AsyncStorageNotesServiceContract {
  if (!asyncStorageServiceInstance) {
    asyncStorageServiceInstance = new AsyncStorageNotesService(
      asyncStorageRepository,
    );
  }
  return asyncStorageServiceInstance;
}

function getAsyncStorageSettingsServiceInstance(): AsyncStorageSettingsServiceContract {
  if (!asyncStorageSettingsServiceInstance) {
    asyncStorageSettingsServiceInstance = new AsyncStorageSettingsService(
      asyncStorageRepository,
    );
  }
  return asyncStorageSettingsServiceInstance;
}

export const asyncStorageNotesService: AsyncStorageNotesServiceContract =
  getAsyncStorageServiceInstance();
export const asyncStorageSettingsService: AsyncStorageSettingsServiceContract =
  getAsyncStorageSettingsServiceInstance();
