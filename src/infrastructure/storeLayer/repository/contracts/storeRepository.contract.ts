import {RootState} from '@/framework/store/store';

export interface StoreRepositoryContract {
  get(namespace: keyof RootState, key?: string): any;
  set(namespace: keyof RootState, action: string, payload?: any): void;
}
