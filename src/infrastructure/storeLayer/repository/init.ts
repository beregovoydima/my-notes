import store from '@/framework/store/store';
import {StoreRepositoryContract} from './contracts';
import {StoreRepository} from './storeRepository';

let storeRepositoryInstance: StoreRepositoryContract;

function getStoreRepositoryInstance(): StoreRepositoryContract {
  if (!storeRepositoryInstance) {
    storeRepositoryInstance = new StoreRepository(store);
  }
  return storeRepositoryInstance;
}

export const storeRepository: StoreRepositoryContract =
  getStoreRepositoryInstance();
