import {useTranslation as useI18nTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import {
  getCurrentLocale,
  setLocale,
  SupportedLocale,
  supportedLocales,
} from '../i18n';

export const useLocalization = () => {
  const {t} = useI18nTranslation();
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('uk');

  useEffect(() => {
    const loadLocale = async () => {
      const locale = await getCurrentLocale();
      setCurrentLocale(locale);
    };
    loadLocale();
  }, []);

  const changeLocale = async (locale: SupportedLocale) => {
    await setLocale(locale);
    setCurrentLocale(locale);
  };

  return {
    t,
    locale: currentLocale,
    setLocale: changeLocale,
    supportedLocales,
  };
};
