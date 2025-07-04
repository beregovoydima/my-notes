/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {CalnedarEventTimeType} from '@/core/interfaces';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Portal, Text, Dialog, Button, Icon} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

export const NotificationDialog = ({
  visible,
  cancel,
  apply,
  startTime,
  eventType,
}: {
  visible: boolean;
  cancel: () => void;
  apply: (notificationTyme: Date) => void;
  startTime: string;
  eventType: CalnedarEventTimeType;
}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState(moment(startTime).format());

  const timeType =
    eventType === 'day'
      ? [
          {
            name: t('notifications.dayBefore'),
            value: moment(startTime)
              .set({hours: 9, minute: 0})
              .subtract(1, 'day')
              .toDate(),
          },
          {
            name: t('notifications.twoDaysBefore'),
            value: moment(startTime)
              .set({hours: 9, minute: 0})
              .subtract(2, 'day')
              .toDate(),
          },
          {
            name: t('notifications.threeDaysBefore'),
            value: moment(startTime)
              .set({hours: 9, minute: 0})
              .subtract(3, 'day')
              .toDate(),
          },
          {
            name: t('notifications.weekBefore'),
            value: moment(startTime)
              .set({hours: 9, minute: 0})
              .subtract(1, 'week')
              .toDate(),
          },
        ]
      : [
          {
            name: t('notifications.thirtyMinutesBefore'),
            value: moment(startTime).subtract(30, 'minute').toDate(),
          },
          {
            name: t('notifications.hourBefore'),
            value: moment(startTime).subtract(1, 'hour').toDate(),
          },
          {
            name: t('notifications.twoHoursBefore'),
            value: moment(startTime).subtract(2, 'hour').toDate(),
          },
          {
            name: t('notifications.dayBefore'),
            value: moment(startTime).subtract(1, 'day').toDate(),
          },
          {
            name: t('notifications.weekBefore'),
            value: moment(startTime).subtract(1, 'week').toDate(),
          },
        ];

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setCustomDate(
      moment(customDate)
        .set({
          year: new Date(
            selectedDate ? selectedDate : new Date(),
          ).getFullYear(),
          month: new Date(selectedDate ? selectedDate : new Date()).getMonth(),
          date: new Date(selectedDate ? selectedDate : new Date()).getDate(),
        })
        .format('YYYY-MM-DD HH:mm'),
    );
  };

  const onStartTimeChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setCustomDate(
      moment(customDate)
        .set({
          hours: new Date(selectedDate ? selectedDate : new Date()).getHours(),
          minutes: new Date(
            selectedDate ? selectedDate : new Date(),
          ).getMinutes(),
        })
        .format('YYYY-MM-DD HH:mm'),
    );
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(customDate),
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(customDate),
      onChange: onStartTimeChange,
      mode: 'time',
      is24Hour: true,
    });
  };

  const updateTime = (time: Date) => {
    apply(time);
  };

  const closeDialog = () => {
    cancel();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title style={{fontSize: 20}}>
          {t('notifications.selectTime')}
        </Dialog.Title>

        {isCustomDate && (
          <Dialog.Content style={{paddingBottom: 0}}>
            <View
              style={{
                display: 'flex',
                width: '100%',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                style={{width: '45%'}}
                mode="text"
                textColor={colors.text}
                onPress={showDatePicker}>
                {moment(customDate).format('ll')}
              </Button>

              <Button
                style={{width: '45%'}}
                mode="text"
                textColor={colors.text}
                onPress={showTimePicker}>
                {moment(customDate).format('HH:mm')}
              </Button>
            </View>
          </Dialog.Content>
        )}

        <Dialog.Content>
          {!isCustomDate && (
            <>
              {timeType.map(el => (
                <TouchableOpacity
                  key={el.name}
                  onPress={() => updateTime(el.value)}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon source="checkbox-blank-circle-outline" size={18} />
                      <Text variant="titleMedium" style={{marginLeft: 10}}>
                        {el.name}
                      </Text>
                    </View>
                    <Text variant="titleMedium" style={{marginLeft: 15}}>
                      ({moment(el.value).format('DD.MM.YY HH.mm')})
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setIsCustomDate(true)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Icon source="checkbox-blank-circle-outline" size={18} />
                  <Text variant="titleMedium" style={{marginLeft: 10}}>
                    {t('notifications.custom')}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Dialog.Content>

        {isCustomDate && (
          <Dialog.Actions>
            <Button onPress={() => setIsCustomDate(false)}>
              {t('common.cancel')}
            </Button>
            <Button onPress={() => updateTime(moment(customDate).toDate())}>
              {t('common.apply')}
            </Button>
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};
