import {ApiRepositoryContract} from '@/infrastructure/httpLayer/apiRepository/contracts';
import {ApiRepository} from '@/infrastructure/httpLayer/apiRepository/apiRepository';
import {coreApiInstance} from '@/framework/axios';

let apiRepositoryInstance: ApiRepositoryContract;

function getApiRepository(): ApiRepositoryContract {
  if (!apiRepositoryInstance) {
    apiRepositoryInstance = new ApiRepository(coreApiInstance);
  }
  return apiRepositoryInstance;
}

export const apiRepository: ApiRepositoryContract = getApiRepository();
