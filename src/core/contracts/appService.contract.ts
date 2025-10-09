import {StateSettings} from '@/framework/store/settings';

export interface AppServiceContract {
  getStoreSettings(): StateSettings;
  setStoreColors(colors: string[]): void;
  getStorageSettings(): Promise<StateSettings | null>;
  setStorageColors(colors: string[]): Promise<void>;
  setStoreShowCardBackground(showCardBackground: boolean): void;
  setStorageShowCardBackground(showCardBackground: boolean): Promise<void>;
  initializeSettings(): Promise<void>;
  initializeApp(): Promise<void>;
}
