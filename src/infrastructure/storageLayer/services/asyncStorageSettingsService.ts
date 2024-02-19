import {AsyncStorageRepositoryContract} from '../asyncStorageRepository/contracts';
import {AsyncStorageSettingsServiceContract} from './contracts';
import {StateSettings} from '@/framework/store/settings';

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
}
