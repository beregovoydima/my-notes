import React, {useState} from 'react';
import {Portal, Button, Dialog} from 'react-native-paper';
import {useTranslation, SupportedLocale, setLocale} from '@/core/i18n';
import {LanguageSelector} from '@/components/settings/LanguageSelector';

interface LanguageModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const LanguageModal = ({visible, onDismiss}: LanguageModalProps) => {
  const {t, locale} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLocale>(locale);

  const handleApply = async () => {
    await setLocale(selectedLanguage);
    onDismiss();
  };

  const handleCancel = () => {
    onDismiss();
  };

  const handleLanguageChange = (customlocale: SupportedLocale) => {
    setSelectedLanguage(customlocale);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleCancel}>
        <Dialog.Title>{t('more.selectLanguage')}</Dialog.Title>
        <Dialog.Content>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>{t('common.cancel')}</Button>
          <Button onPress={handleApply}>{t('common.apply')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
