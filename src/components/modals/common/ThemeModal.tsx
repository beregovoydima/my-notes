import React, {useState} from 'react';
import {Portal, Button, Dialog} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';
import {ThemeSelector} from '@/components/settings/ThemeSelector';
import {useTheme} from '@/assets/config/colors';
import {useThemeMode} from '@/components/context/ThemeContext';
import {StyleSheet} from 'react-native';
import {ThemeMode} from '@/core/interfaces';

interface ThemeModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ThemeModal = ({visible, onDismiss}: ThemeModalProps) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {themeMode, setThemeMode} = useThemeMode();
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(themeMode);

  const handleApply = async () => {
    await setThemeMode(selectedTheme);
    onDismiss();
  };

  const handleCancel = () => {
    setSelectedTheme(themeMode); // Сброс к текущей теме
    onDismiss();
  };

  const handleThemeChange = (theme: ThemeMode) => {
    setSelectedTheme(theme);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleCancel}
        style={[
          styles.dialog,
          {
            backgroundColor: colors.dialogBackgroundColor,
            borderColor: colors.background,
          },
        ]}>
        <Dialog.Title>{t('more.theme')}</Dialog.Title>
        <Dialog.Content>
          <ThemeSelector
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={colors.accent} onPress={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button textColor={colors.accent} onPress={handleApply}>
            {t('common.apply')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderWidth: 0.5,
  },
});
