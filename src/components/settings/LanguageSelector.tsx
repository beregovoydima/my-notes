import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {List, RadioButton, Divider} from 'react-native-paper';
import {useTranslation, SupportedLocale} from '@/core/i18n';

interface LanguageSelectorProps {
  onLanguageChange: (locale: SupportedLocale) => void;
}

const languageOptions = [
  {code: 'uk', name: 'Ukrainian', nativeName: 'Українська'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский'},
  {code: 'en', name: 'English', nativeName: 'English'},
] as const;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const {locale} = useTranslation();
  const [selectedLanguage, changeSelectedLanguage] =
    useState<SupportedLocale>(locale);

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    onLanguageChange(newLocale);
    changeSelectedLanguage(newLocale);
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {languageOptions.map((option, index) => (
          <React.Fragment key={option.code}>
            <List.Item
              title={option.nativeName}
              description={option.name}
              // eslint-disable-next-line react/no-unstable-nested-components
              left={() => (
                <RadioButton
                  value={option.code}
                  status={
                    selectedLanguage === option.code ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    handleLanguageChange(option.code as SupportedLocale)
                  }
                />
              )}
              onPress={() =>
                handleLanguageChange(option.code as SupportedLocale)
              }
              style={styles.languageItem}
            />
            {index < languageOptions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //
  },
  languageItem: {
    paddingVertical: 8,
  },
});
