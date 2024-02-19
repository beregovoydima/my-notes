import {SettingsStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';
import {StoreRepositoryContract} from '@/infrastructure/storeLayer/repository/contracts';
import {StateSettings} from '@/framework/store/settings';

export class SettingsStoreService implements SettingsStoreServiceContract {
  constructor(private readonly storeRepository: StoreRepositoryContract) {}

  public getSettings(): StateSettings {
    return this.storeRepository.get('settings', 'settings');
  }

  public setStoreColors(colors: string[]): void {
    this.storeRepository.set('settings', 'setColors', colors);
  }
}
