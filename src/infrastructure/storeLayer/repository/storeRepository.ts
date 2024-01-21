// storeRepository.ts
import {PayloadAction, Store} from '@reduxjs/toolkit';
import {StoreRepositoryContract} from './contracts';
import {RootState} from '@/framework/store/store';

export class StoreRepository<T> implements StoreRepositoryContract {
  constructor(private readonly store: Store<RootState>) {}

  get(namespace: keyof RootState, key?: string): any {
    if (key && key in this.store.getState()[namespace]) {
      const state = this.store.getState()[namespace];
      return state[key as keyof typeof state];
    }
    return this.store.getState()[namespace];
  }

  set(
    namespace: keyof RootState,
    action: PayloadAction<T>['type'],
    payload?: any,
  ): void {
    this.store.dispatch({
      type: `${namespace}/${action}`,
      payload,
    });
  }
}
