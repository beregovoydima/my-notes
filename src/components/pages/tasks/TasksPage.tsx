import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';

export function TasksPage() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <>
      <View>
        <Appbar.Header style={{backgroundColor: colors.background}}>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title={t('navigation.tasks')} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
      </View>
    </>
  );
}
