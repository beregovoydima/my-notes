import React, {createContext, useContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import {appService} from '@/core/services';
import {ThemeMode} from '@/core/interfaces';

interface ThemeContextType {
  isDarkMode: boolean;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemIsDark, setSystemIsDark] = useState(
    Appearance.getColorScheme() === 'dark',
  );

  // Вычисляем итоговый isDarkMode
  const isDarkMode =
    themeMode === 'system' ? systemIsDark : themeMode === 'dark';

  useEffect(() => {
    // Загружаем сохраненную тему при старте
    const loadTheme = async () => {
      const settings = await appService.getStorageSettings();
      if (settings?.themeMode) {
        setThemeModeState(settings.themeMode);
      } else {
        // Если нет сохраненной темы, загружаем из store
        const storeSettings = appService.getStoreSettings();
        if (storeSettings?.themeMode) {
          setThemeModeState(storeSettings.themeMode);
        }
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    // Отслеживаем изменения системной темы
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setSystemIsDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    // Сохраняем в store и в storage
    appService.setStoreThemeMode(mode);
    await appService.setStorageThemeMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        themeMode,
        toggleTheme,
        setThemeMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};
