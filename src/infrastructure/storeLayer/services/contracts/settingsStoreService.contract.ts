import {StateSettings} from '@/framework/store/settings';

export interface SettingsStoreServiceContract {
  getSettings(): StateSettings;
  setStoreColors(colors: string[]): void;
  setStoreShowCardBackground(showCardBackground: boolean): void;
}
