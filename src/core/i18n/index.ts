import i18n from 'i18next';
import {
  initReactI18next,
  useTranslation as useReactI18next,
} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Импорт переводов
import {uk} from './locales/uk';
import {ru} from './locales/ru';
import {en} from './locales/en';
import {setMomentLocale} from '../utils/dateLocalization';

// Поддерживаемые языки
export const supportedLocales = ['uk', 'ru', 'en'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

// Интерфейс для переводов
export interface TranslationKeys {
  // Общие
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
    back: string;
    next: string;
    done: string;
    close: string;
    yes: string;
    no: string;
    ok: string;
    create: string;
    name: string;
    enterName: string;
    enterText: string;
    emptyList: string;
    selected: string;
    exit: string;
    continue: string;
    goTo: string;
    apply: string;
  };

  // Навигация
  navigation: {
    notes: string;
    calendar: string;
    settings: string;
    home: string;
    tasks: string;
    search: string;
    more: string;
  };

  // Заметки
  notes: {
    title: string;
    newNote: string;
    editNote: string;
    deleteNote: string;
    noteTitle: string;
    noteContent: string;
    saveNote: string;
    noteSaved: string;
    noteDeleted: string;
    noNotes: string;
    searchNotes: string;
    allNotes: string;
    favorites: string;
    categories: string;
    tags: string;
    createNote: string;
    createList: string;
    createFolder: string;
    enterNoteTitle: string;
    enterListTitle: string;
    enterFolderName: string;
    noteText: string;
    emptyNotesList: string;
  };

  // Списки
  lists: {
    title: string;
    newList: string;
    editList: string;
    deleteList: string;
    listTitle: string;
    saveList: string;
    listSaved: string;
    listDeleted: string;
    noLists: string;
    addItem: string;
    emptyListsList: string;
    enterListTitle: string;
    createList: string;
    noTitle: string;
  };

  // Папки
  folders: {
    title: string;
    newFolder: string;
    editFolder: string;
    deleteFolder: string;
    folderName: string;
    saveFolder: string;
    folderSaved: string;
    folderDeleted: string;
    noFolders: string;
    createFolder: string;
    enterFolderName: string;
    emptyFoldersList: string;
  };

  // Календарь
  calendar: {
    title: string;
    today: string;
    yesterday: string;
    tomorrow: string;
    thisWeek: string;
    nextWeek: string;
    thisMonth: string;
    nextMonth: string;
    events: string;
    tasks: string;
    allEvents: string;
    allTasks: string;
    createEvent: string;
    createTask: string;
    editEvent: string;
    editTask: string;
    deleteEvent: string;
    deleteTask: string;
    eventTitle: string;
    taskTitle: string;
    eventDescription: string;
    taskDescription: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    allDay: string;
    reminder: string;
    noReminder: string;
    date: string;
    time: string;
  };

  // Задачи
  tasks: {
    title: string;
    newTask: string;
    editTask: string;
    deleteTask: string;
    taskTitle: string;
    taskDescription: string;
    saveTask: string;
    taskSaved: string;
    taskDeleted: string;
    noTasks: string;
    createTask: string;
    enterTaskTitle: string;
    taskText: string;
  };

  // Настройки
  settings: {
    title: string;
    language: string;
    theme: string;
    notifications: string;
    about: string;
    version: string;
    support: string;
    privacy: string;
    terms: string;
    darkMode: string;
    lightMode: string;
    systemMode: string;
    enableNotifications: string;
    notificationSound: string;
    vibration: string;
    autoBackup: string;
    exportData: string;
    importData: string;
    clearData: string;
    donate: string;
  };

  // Донат
  donation: {
    title: string;
    supportProject: string;
    coffee: string;
    lunch: string;
    sponsor: string;
    thankYou: string;
    selectAmount: string;
    selectMethod: string;
    monobank: string;
    paypal: string;
    crypto: string;
  };

  // Ошибки
  errors: {
    networkError: string;
    saveError: string;
    deleteError: string;
    loadError: string;
    unknownError: string;
    permissionDenied: string;
  };

  // Уведомления
  notifications: {
    eventReminder: string;
    eventStarting: string;
    eventStarted: string;
    noteReminder: string;
    permissionRequired: string;
    selectTime: string;
    custom: string;
    dayBefore: string;
    twoDaysBefore: string;
    threeDaysBefore: string;
    weekBefore: string;
    thirtyMinutesBefore: string;
    hourBefore: string;
    twoHoursBefore: string;
  };

  // Валидация
  validation: {
    required: string;
    minLength: string;
    maxLength: string;
    invalidEmail: string;
    invalidDate: string;
  };

  // Сортировка
  sorting: {
    byCreationDate: string;
    byUpdateDate: string;
    byColor: string;
    byTitle: string;
    byFolderName: string;
    ascending: string;
    descending: string;
    oldToNew: string;
    newToOld: string;
    aToZ: string;
    zToA: string;
    byColorIndex: string;
    colorOrderInfo: string;
  };

  // Фильтры
  filters: {
    all: string;
    notes: string;
    lists: string;
    folders: string;
  };
}

// Функция для получения текущей локали устройства
export const getDeviceLocale = (): SupportedLocale => {
  const locale = getLocales()[0];
  const languageCode = locale?.languageCode.toLowerCase();

  if (supportedLocales.includes(languageCode as SupportedLocale)) {
    return languageCode as SupportedLocale;
  }

  // Fallback на английский
  return 'en';
};

// Функция для получения локали из AsyncStorage или устройства
export const getCurrentLocale = async (): Promise<SupportedLocale> => {
  try {
    const savedLocale = await AsyncStorage.getItem('userLocale');
    if (
      savedLocale &&
      supportedLocales.includes(savedLocale as SupportedLocale)
    ) {
      return savedLocale as SupportedLocale;
    }
    return getDeviceLocale();
  } catch (error) {
    console.warn('Error getting current locale:', error);
    return 'en';
  }
};

// Инициализация i18next
const initializeI18n = async () => {
  const currentLocale = await getCurrentLocale();

  return new Promise<void>((resolve, reject) => {
    i18n.use(initReactI18next).init({
      resources: {
        uk: {
          translation: uk,
        },
        ru: {
          translation: ru,
        },
        en: {
          translation: en,
        },
      },
      lng: currentLocale, // используем сохраненную локаль
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React уже экранирует значения
      },
      react: {
        useSuspense: false, // Отключаем Suspense для React Native
      },
      compatibilityJSON: 'v3', // Добавляем для совместимости
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Состояние инициализации
let isInitialized = false;
let initPromise: Promise<void> | null = null;

// Функция для инициализации
export const initI18n = async (): Promise<void> => {
  if (initPromise) {
    return initPromise;
  }
  
  initPromise = initializeI18n()
    .then(() => {
      isInitialized = true;
    })
    .catch((error) => {
      console.error('i18n initialization failed:', error);
      throw error;
    });
    
  return initPromise;
};

// Проверка готовности
export const isI18nReady = (): boolean => {
  return isInitialized && i18n.isInitialized;
};

// Инициализируем i18n при импорте модуля
initI18n().catch(console.error);

// Функция для изменения локали
export const setLocale = async (locale: SupportedLocale): Promise<void> => {
  try {
    await i18n.changeLanguage(locale);
    await AsyncStorage.setItem('userLocale', locale);
    await setMomentLocale(locale);
  } catch (error) {
    console.warn('Error setting locale:', error);
  }
};

// Хук для использования переводов
export const useTranslation = () => {
  const {t, i18n: i18next} = useReactI18next();

  // Проверяем готовность i18n
  if (!isI18nReady()) {
    console.warn('i18n is not ready yet, translations may not work properly');
  }

  return {
    t: (key: string, params?: Record<string, any>): string => {
      // Если i18n не готов, возвращаем ключ как fallback
      if (!isI18nReady()) {
        return key;
      }
      return t(key, params);
    },
    locale: i18next.language as SupportedLocale,
    setLocale,
    supportedLocales,
    isReady: isI18nReady(),
  };
};

// Экспорт для прямого использования
export const t = (key: string, params?: Record<string, any>): string => {
  return i18n.t(key, params);
};

export default i18n;
