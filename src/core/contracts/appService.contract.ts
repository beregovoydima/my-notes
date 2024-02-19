import {StateSettings} from '@/framework/store/settings';

export interface AppServiceContract {
  getStoreSettings(): StateSettings;
  setStoreColors(colors: string[]): void;
  getStorageSettings(): Promise<StateSettings | null>;
  setStorageColors(colors: string[]): Promise<void>;
}
