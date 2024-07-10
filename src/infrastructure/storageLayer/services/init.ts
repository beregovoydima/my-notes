import {
  AsyncStorageNotesServiceContract,
  AsyncStorageSettingsServiceContract,
} from '@/infrastructure/storageLayer/services/contracts';
import {asyncStorageRepository} from '@/infrastructure/storageLayer/asyncStorageRepository';
import {AsyncStorageNotesService} from '@/infrastructure/storageLayer/services/asyncStorageNotesService';
import {AsyncStorageSettingsService} from './asyncStorageSettingsService';
import {AsyncStorageCalendarServiceContract} from './contracts/asyncStorageCalendarService.contract';
import {AsyncStorageCalendarService} from './asyncStorageCalendarService';

let asyncStorageServiceInstance: AsyncStorageNotesServiceContract;
let asyncStorageSettingsServiceInstance: AsyncStorageSettingsServiceContract;
let asyncStorageCalendarServiceInstance: AsyncStorageCalendarServiceContract;

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

function getAsyncStorageCalendarServiceInstance(): AsyncStorageCalendarServiceContract {
  if (!asyncStorageCalendarServiceInstance) {
    asyncStorageCalendarServiceInstance = new AsyncStorageCalendarService(
      asyncStorageRepository,
    );
  }
  return asyncStorageCalendarServiceInstance;
}

export const asyncStorageNotesService: AsyncStorageNotesServiceContract =
  getAsyncStorageServiceInstance();
export const asyncStorageSettingsService: AsyncStorageSettingsServiceContract =
  getAsyncStorageSettingsServiceInstance();
export const asyncStorageCalendarService: AsyncStorageCalendarServiceContract =
  getAsyncStorageCalendarServiceInstance();
