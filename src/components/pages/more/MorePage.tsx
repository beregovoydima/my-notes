/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Card, Text, List, Divider} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';
import {getAppVersion} from '@/core/utils';
import {LanguageModal} from '@/components/modals/common/LanguageModal';

export function MorePage() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  // Получаем версию приложения
  const appVersion = getAppVersion();

  const showLanguageModal = () => setLanguageModalVisible(true);
  const hideLanguageModal = () => setLanguageModalVisible(false);

  return (
    <>
      <View>
        <Appbar.Header style={{backgroundColor: colors.background}}>
          {/* <Appbar.BackAction onPress={() => {}} /> */}
          <Appbar.Content title={t('navigation.more')} />
          {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        </Appbar.Header>
      </View>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {/* Информация о версии */}
        <Card
          style={[styles.versionCard, {backgroundColor: colors.whiteColor}]}>
          <Card.Content>
            <View style={styles.versionContainer}>
              <Text variant="titleMedium" style={{color: colors.text}}>
                {t('more.version')}
              </Text>
              <Text variant="bodyMedium" style={{color: colors.greyColor}}>
                {appVersion}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Настройки */}
        <Card
          style={[styles.settingsCard, {backgroundColor: colors.whiteColor}]}>
          <Card.Content style={styles.cardContent}>
            <List.Item
              title={t('more.language')}
              left={props => <List.Icon {...props} icon="translate" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={showLanguageModal}
              titleStyle={{color: colors.text}}
            />
            {/* <Divider />
            <List.Item
              title={t('more.settings')}
              left={props => <List.Icon {...props} icon="cog" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              titleStyle={{color: colors.text}}
            /> */}
          </Card.Content>
        </Card>

        {/* <Divider style={styles.divider} /> */}

        {/* Информация и поддержка */}
        {/* <Card style={[styles.infoCard, {backgroundColor: colors.whiteColor}]}>
          <Card.Content style={styles.cardContent}>
            <List.Item
              title={t('more.about')}
              left={props => <List.Icon {...props} icon="information" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              titleStyle={{color: colors.text}}
            />
            <Divider />
            <List.Item
              title={t('more.help')}
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              titleStyle={{color: colors.text}}
            />
            <Divider />
            <List.Item
              title={t('more.feedback')}
              left={props => <List.Icon {...props} icon="message-text" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
              titleStyle={{color: colors.text}}
            />
          </Card.Content>
        </Card> */}
      </View>

      {/* Модальное окно выбора языка */}
      <LanguageModal
        visible={languageModalVisible}
        onDismiss={hideLanguageModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  versionCard: {
    marginBottom: 8,
    elevation: 2,
  },
  settingsCard: {
    marginBottom: 8,
    elevation: 2,
  },
  infoCard: {
    marginBottom: 8,
    elevation: 2,
  },
  cardContent: {
    paddingVertical: 0,
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 8,
  },
});
