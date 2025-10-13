/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Appbar, Text, List, Divider, Switch} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';
import {getAppVersion} from '@/core/utils';
import {LanguageModal} from '@/components/modals/common/LanguageModal';
import {ColorPicker} from '@/components/modals/ui/ColorPicker';
import {appService} from '@/core/services';

export function MorePage() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [showCardBackground, setShowCardBackground] = useState(true);

  // Получаем версию приложения
  const appVersion = getAppVersion();

  const showLanguageModal = () => setLanguageModalVisible(true);
  const hideLanguageModal = () => setLanguageModalVisible(false);
  const showColorPicker = () => setColorPickerVisible(true);
  const hideColorPicker = () => setColorPickerVisible(false);

  // Загружаем настройки при монтировании компонента
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await appService.getStorageSettings();
      if (settings) {
        setShowCardBackground(settings.showCardBackground);
      } else {
        // Если настроек нет, используем значение из store
        const storeSettings = appService.getStoreSettings();
        setShowCardBackground(storeSettings.showCardBackground);
      }
    };
    loadSettings();
  }, []);

  const handleShowCardBackgroundChange = async (value: boolean) => {
    setShowCardBackground(value);
    appService.setStoreShowCardBackground(value);
    await appService.setStorageShowCardBackground(value);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://beregovoydima.github.io/Private-policy/');
  };

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
        {/* НАСТРОЙКИ */}
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, {color: colors.text}]}>
          {t('more.settings')}
        </Text>

        <List.Item
          title={t('more.language')}
          left={props => <List.Icon {...props} icon="translate" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={showLanguageModal}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title={t('more.showCardBackground')}
          description={t('more.showCardBackgroundDescription')}
          left={props => <List.Icon {...props} icon="palette" />}
          right={() => (
            <Switch
              value={showCardBackground}
              onValueChange={handleShowCardBackgroundChange}
              color={colors.primary}
            />
          )}
          titleStyle={{color: colors.text}}
          descriptionStyle={{color: colors.greyColor}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title={t('sorting.colorSortOrder')}
          left={props => <List.Icon {...props} icon="sort" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={showColorPicker}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        {/* ИНФОРМАЦИЯ */}
        {/* <Text
          variant="titleMedium"
          style={[styles.sectionTitle, {color: colors.text}]}>
          {t('more.information')}
        </Text>

        <List.Item
          title={t('more.about')}
          left={props => <List.Icon {...props} icon="information-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title={t('more.help')}
          left={props => <List.Icon {...props} icon="help-circle-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title={t('more.feedback')}
          left={props => <List.Icon {...props} icon="message-text-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />

        <Divider style={styles.divider} /> */}

        {/* КОНФИДЕНЦИАЛЬНОСТЬ */}
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, {color: colors.text}]}>
          {t('more.privacy')}
        </Text>

        <List.Item
          title={t('more.privacyPolicy')}
          left={props => <List.Icon {...props} icon="shield-check-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={openPrivacyPolicy}
          titleStyle={{color: colors.text}}
          style={styles.listItem}
        />

        {/* Информация о версии в конце */}
        <View style={styles.versionContainer}>
          <Text variant="bodySmall" style={{color: colors.greyColor}}>
            {t('more.version')}: {appVersion}
          </Text>
          <Text variant="bodySmall" style={{color: colors.greyColor}}>
            Free Notes - Free Forever
          </Text>
        </View>
      </View>

      {/* Модальное окно выбора языка */}
      <LanguageModal
        visible={languageModalVisible}
        onDismiss={hideLanguageModal}
      />

      {/* Модальное окно порядка сортировки цветов */}
      <ColorPicker
        visible={colorPickerVisible}
        hideModal={hideColorPicker}
        changeColor={() => {}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  listItem: {
    backgroundColor: 'transparent',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
});
