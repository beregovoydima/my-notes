import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from '@/assets/config/colors';
import {CalendarItem} from '@/components/calendar/CalendarItem';
import {FabCalendarButton} from '@/components/ui/fab/FabCalendarButton';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {calendarService} from '@/core/services';

export function CalendarPage() {
  const {colors} = useTheme();

  const getEventCollection = async () => {
    const response = await calendarService.storageGetCalendarEventCollection();
    if (response) {
      calendarService.storeSetCalendarEventCollection(response);
    }
  };

  getEventCollection();

  return (
    <SafeAreaView style={styles.page}>
      <Appbar.Header
        style={[styles.header, {backgroundColor: colors.background}]}>
        <Appbar.Content title={'Календарь'} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <CalendarItem />
        <FabCalendarButton />
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
