import {AsyncStorageRepositoryContract} from '../asyncStorageRepository/contracts';
import {AsyncStorageSettingsServiceContract} from './contracts';
import {StateSettings} from '@/framework/store/settings';
import {ThemeMode} from '@/core/interfaces';

export class AsyncStorageSettingsService
  implements AsyncStorageSettingsServiceContract
{
  readonly #settings = 'settings';

  constructor(
    private readonly asyncStorageRepository: AsyncStorageRepositoryContract,
  ) {}

  public async setSettings(settings: StateSettings): Promise<void> {
    const response = await this.asyncStorageRepository.set(
      this.#settings,
      JSON.stringify(settings),
    );

    return response;
  }

  public async getSettings(): Promise<StateSettings | null> {
    const response = await this.asyncStorageRepository.get(this.#settings);
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }

  public async setShowCardBackground(
    showCardBackground: boolean,
  ): Promise<void> {
    const settings = await this.getSettings();
    if (settings) {
      const updatedSettings = {
        ...settings,
        showCardBackground,
      };
      return await this.setSettings(updatedSettings);
    }
  }

  public async setThemeMode(themeMode: ThemeMode): Promise<void> {
    const settings = await this.getSettings();
    if (settings) {
      const updatedSettings = {
        ...settings,
        themeMode,
      };
      return await this.setSettings(updatedSettings);
    }
  }
}
