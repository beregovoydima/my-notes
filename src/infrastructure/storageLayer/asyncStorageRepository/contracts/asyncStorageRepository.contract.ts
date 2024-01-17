import {KeyValuePair} from '@react-native-async-storage/async-storage/lib/typescript/types';

export interface AsyncStorageRepositoryContract {
  get(name: string): Promise<string | null>;
  set(name: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<readonly string[]>;
  multiGet(keys: string[]): Promise<readonly KeyValuePair[]>;
  multiSet(keyValues: [string, string][]): Promise<void>;
  multiRemove(keys: string[]): Promise<void>;
}
