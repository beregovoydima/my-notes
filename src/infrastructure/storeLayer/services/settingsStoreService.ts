import {SettingsStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';
import {StoreRepositoryContract} from '@/infrastructure/storeLayer/repository/contracts';
import {StateSettings} from '@/framework/store/settings';
import {ThemeMode} from '@/core/interfaces';

export class SettingsStoreService implements SettingsStoreServiceContract {
  constructor(private readonly storeRepository: StoreRepositoryContract) {}

  public getSettings(): StateSettings {
    return this.storeRepository.get('settings', 'settings');
  }

  public setStoreColors(colors: string[]): void {
    this.storeRepository.set('settings', 'setColors', colors);
  }

  public setStoreShowCardBackground(showCardBackground: boolean): void {
    this.storeRepository.set(
      'settings',
      'setShowCardBackground',
      showCardBackground,
    );
  }

  public setStoreThemeMode(themeMode: ThemeMode): void {
    this.storeRepository.set('settings', 'setThemeMode', themeMode);
  }
}
