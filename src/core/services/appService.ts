import {AsyncStorageSettingsServiceContract} from '@/infrastructure/storageLayer/services/contracts';
import {SettingsStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts';
import {AppServiceContract} from '../contracts/appService.contract';
import {StateSettings} from '@/framework/store/settings';

export class AppService implements AppServiceContract {
  constructor(
    private readonly asyncStorageSettingsService: AsyncStorageSettingsServiceContract,
    private readonly settingsStoreService: SettingsStoreServiceContract,
  ) {}

  public getStoreSettings(): StateSettings {
    return this.settingsStoreService.getSettings();
  }

  public setStoreColors(colors: string[]): void {
    return this.settingsStoreService.setStoreColors(colors);
  }

  public async getStorageSettings(): Promise<StateSettings | null> {
    return await this.asyncStorageSettingsService.getSettings();
  }

  public async setStorageColors(colors: string[]): Promise<void> {
    const settings = this.getStoreSettings();

    return await this.asyncStorageSettingsService.setSettings({
      ...settings,
      colors: [...colors],
    });
  }

  public setStoreShowCardBackground(showCardBackground: boolean): void {
    return this.settingsStoreService.setStoreShowCardBackground(
      showCardBackground,
    );
  }

  public async setStorageShowCardBackground(
    showCardBackground: boolean,
  ): Promise<void> {
    const settings = this.getStoreSettings();

    return await this.asyncStorageSettingsService.setSettings({
      ...settings,
      showCardBackground,
    });
  }

  public async initializeSettings(): Promise<void> {
    const settings = await this.getStorageSettings();
    if (settings) {
      // Загружаем настройки в Redux store
      this.setStoreColors(settings.colors);
      this.setStoreShowCardBackground(settings.showCardBackground);
    }
  }

  public async initializeApp(): Promise<void> {
    await this.initializeSettings();
  }
}
