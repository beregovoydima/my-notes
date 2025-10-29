import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, RadioButton, Divider} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';
import {useTheme} from '@/assets/config/colors';
import {ThemeMode} from '@/core/interfaces';

interface ThemeSelectorProps {
  selectedTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const themeOptions: {value: ThemeMode; label: string; description: string}[] = [
  {
    value: 'light',
    label: 'Светлая',
    description: 'Light theme',
  },
  {
    value: 'dark',
    label: 'Темная',
    description: 'Dark theme',
  },
  {
    value: 'system',
    label: 'Системная',
    description: 'System default',
  },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const getThemeLabel = (theme: ThemeMode) => {
    switch (theme) {
      case 'light':
        return t('theme.light');
      case 'dark':
        return t('theme.dark');
      case 'system':
        return t('theme.system');
      default:
        return theme;
    }
  };

  const getThemeDescription = (theme: ThemeMode) => {
    switch (theme) {
      case 'light':
        return t('theme.lightDescription');
      case 'dark':
        return t('theme.darkDescription');
      case 'system':
        return t('theme.systemDescription');
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {themeOptions.map((option, index) => {
          const getLeftIcon = () => (
            <RadioButton
              color={colors.accent}
              value={option.value}
              status={selectedTheme === option.value ? 'checked' : 'unchecked'}
              onPress={() => onThemeChange(option.value)}
            />
          );

          return (
            <React.Fragment key={option.value}>
              <List.Item
                title={getThemeLabel(option.value)}
                description={getThemeDescription(option.value)}
                left={getLeftIcon}
                onPress={() => onThemeChange(option.value)}
                titleStyle={{color: colors.text}}
                descriptionStyle={{color: colors.greyColor}}
                style={styles.themeItem}
              />
              {index < themeOptions.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Empty for now
  },
  themeItem: {
    paddingVertical: 8,
  },
});
