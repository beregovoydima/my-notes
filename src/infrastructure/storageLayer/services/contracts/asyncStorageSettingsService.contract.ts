import {StateSettings} from '@/framework/store/settings';
import {ThemeMode} from '@/core/interfaces';

export interface AsyncStorageSettingsServiceContract {
  setSettings(settings: StateSettings): Promise<void>;
  getSettings(): Promise<StateSettings | null>;
  setShowCardBackground(showCardBackground: boolean): Promise<void>;
  setThemeMode(themeMode: ThemeMode): Promise<void>;
}
