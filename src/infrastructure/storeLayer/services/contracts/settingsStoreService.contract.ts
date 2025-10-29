import {StateSettings} from '@/framework/store/settings';
import {ThemeMode} from '@/core/interfaces';

export interface SettingsStoreServiceContract {
  getSettings(): StateSettings;
  setStoreColors(colors: string[]): void;
  setStoreShowCardBackground(showCardBackground: boolean): void;
  setStoreThemeMode(themeMode: ThemeMode): void;
}
