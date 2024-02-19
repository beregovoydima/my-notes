import {StateSettings} from '@/framework/store/settings';

export interface AsyncStorageSettingsServiceContract {
  setSettings(settings: StateSettings): Promise<void>;
  getSettings(): Promise<StateSettings | null>;
}
