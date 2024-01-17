import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageRepositoryContract} from '@/infrastructure/storageLayer/asyncStorageRepository/contracts';
import {KeyValuePair} from '@react-native-async-storage/async-storage/lib/typescript/types';

export class AsyncStorageRepository implements AsyncStorageRepositoryContract {
  public async get(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      // Обработка ошибки, например, запись в лог или выброс исключения
      console.error('Error while getting from AsyncStorage:', error);
      throw error;
    }
  }

  public async set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error while setting in AsyncStorage:', error);
      throw error;
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error while removing from AsyncStorage:', error);
      throw error;
    }
  }

  public async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error while clearing AsyncStorage:', error);
      throw error;
    }
  }

  public async getAllKeys(): Promise<readonly string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error while getting all keys from AsyncStorage:', error);
      throw error;
    }
  }

  public async multiGet(keys: string[]): Promise<readonly KeyValuePair[]> {
    try {
      const keyValues = await AsyncStorage.multiGet(keys);
      return keyValues;
    } catch (error) {
      console.error(
        'Error while getting multiple values from AsyncStorage:',
        error,
      );
      throw error;
    }
  }

  public async multiSet(keyValues: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValues);
    } catch (error) {
      console.error(
        'Error while setting multiple values in AsyncStorage:',
        error,
      );
      throw error;
    }
  }

  public async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error(
        'Error while removing multiple values from AsyncStorage:',
        error,
      );
      throw error;
    }
  }
}
