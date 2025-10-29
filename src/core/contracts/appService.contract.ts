import {StateSettings} from '@/framework/store/settings';
import {ThemeMode} from '@/core/interfaces';

export interface AppServiceContract {
  getStoreSettings(): StateSettings;
  getStoreColors(): string[];
  setStoreColors(colors: string[]): void;
  getStorageSettings(): Promise<StateSettings | null>;
  setStorageColors(colors: string[]): Promise<void>;
  setStoreShowCardBackground(showCardBackground: boolean): void;
  setStorageShowCardBackground(showCardBackground: boolean): Promise<void>;
  setStoreThemeMode(themeMode: ThemeMode): void;
  setStorageThemeMode(themeMode: ThemeMode): Promise<void>;
  initializeSettings(): Promise<void>;
  initializeApp(): Promise<void>;
}
