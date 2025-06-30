import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

export const TranslationTest: React.FC = () => {
  const {t, locale, setLocale} = useTranslation();

  const handleLanguageChange = async (newLocale: 'uk' | 'ru' | 'en') => {
    await setLocale(newLocale);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Translation Test" />
        <Card.Content>
          <Text variant="bodyMedium">
            Current locale: {locale}
          </Text>
          <Text variant="bodyMedium">
            Navigation notes: {t('navigation.notes')}
          </Text>
          <Text variant="bodyMedium">
            Notes title: {t('notes.title')}
          </Text>
          <Text variant="bodyMedium">
            Empty list: {t('notes.emptyNotesList')}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => handleLanguageChange('uk')}
          style={styles.button}>
          Українська
        </Button>
        <Button
          mode="contained"
          onPress={() => handleLanguageChange('ru')}
          style={styles.button}>
          Русский
        </Button>
        <Button
          mode="contained"
          onPress={() => handleLanguageChange('en')}
          style={styles.button}>
          English
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
