import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme} from '@/assets/config/colors';
import {CalendarItem} from '@/components/calendar/CalendarItem';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {calendarService, notificationService} from '@/core/services';
import {useTranslation} from '@/core/i18n';

export function CalendarPage() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const getEventCollection = async () => {
    const response = await calendarService.storageGetCalendarEventCollection();
    if (response) {
      calendarService.storeSetCalendarEventCollection(response);
    }
  };

  getEventCollection();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    notificationService.existCalendarChanel();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => {}}>
          <Dialog.Content>
            <Text variant="titleSmall">{t('common.cancel')}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>
              {t('common.exit')}
            </Button>
            <Button onPress={() => {}}>{t('common.continue')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* <Appbar.Header
        style={[styles.header, {backgroundColor: colors.background}]}>
        <Appbar.Content title={t('navigation.calendar')} />
        <Appbar.Action icon="magnify" />
      </Appbar.Header> */}
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <CalendarItem />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'flex-end',
  },
  container: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
});
