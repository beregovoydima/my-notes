/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@/assets/config/colors';
import {ColorMenu} from '@/components/ui/menu/ColorMenu';
import {getUuid, hex2rgba} from '@/core/utils';
import {
  Button,
  Text,
  Icon,
  Switch,
  TextInput,
  Divider,
} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EditableText} from '@/components/ui/list/EditableText';
import moment from 'moment';
import {CalendarEventTaskType, ScreenNavigationProp} from '@/core/interfaces';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {calendarService, notificationService} from '@/core/services';
import {AcceptDialog} from '@/components/modals/common/AcceptDialog';
import {NotificationDialog} from '@/components/modals/calendar/NotificationDialog';
import {useNavigation} from '@react-navigation/native';
import {CalendarEventEditMenu} from '@/components/ui/menu/CalendarEventMenu';
import {
  PermissionStatus,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {OpenNotificationSettings} from '@/components/modals/common/OpenNotificationSettings';
import PushNotification from 'react-native-push-notification';
import {useTranslation} from '@/core/i18n';

export function CalendarEvent({route}: {route: any}) {
  const {colors} = useTheme();
  const {t, locale} = useTranslation();

  const navigation: ScreenNavigationProp = useNavigation();
  // const [eventType, setEventType] = useState<CalendarEventType>('task');

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [settigsVisible, setSettigsVisible] = useState(false);
  const [notificationDialogVisible, setNotificationDialogVisible] =
    useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [event, setEvent] = useState<CalendarEventTaskType>({
    title: '',
    created: moment().format(),
    startDate: moment().startOf('hour').add(1, 'hour').format(),
    endDate: moment().startOf('hour').add(2, 'hour').format(),
    type: 'task',
    color: colors.lime,
    info: '',
    id: getUuid(),
    updated: null,
    dateType: 'time',
  });
  const [notificationTime, setNotificationTime] = useState<Date[]>([]);

  const setEventById = (id: string) => {
    const data = calendarService.getEventById(id);

    if (data) {
      setEvent(data);
    }

    if (data?.notificationIds?.length) {
      PushNotification.getScheduledLocalNotifications(notification => {
        const searchNotification: Date[] = [];
        data.notificationIds?.forEach(el => {
          const findNotification = notification.find(n => n.id === el);
          if (findNotification) {
            searchNotification.push(new Date(findNotification.date));
          }
        });
        setNotificationTime([...searchNotification]);
      });
    }
  };

  const handleResult = (result: PermissionStatus | undefined) => {
    switch (result) {
      case RESULTS.GRANTED:
        setNotificationDialogVisible(true);
        break;
      case RESULTS.DENIED:
        setSettigsVisible(true);
        break;
      case RESULTS.BLOCKED:
        setSettigsVisible(true);
        break;
    }
  };

  const openMobileSettings = () => {
    setSettigsVisible(false);
    openSettings();
  };

  const addNotification = async () => {
    const result = await notificationService.requestNotificationPermission();

    handleResult(result);
  };

  const deleteEvent = () => {
    calendarService.deleteCalendarEvent(event.id);

    if (event.notificationIds) {
      notificationService.cancelSheduleNotifications(event.notificationIds);
    }

    navigation.goBack();
  };

  useEffect(() => {
    if (route.params.eventId) {
      setEventById(route.params.eventId);
    }
    if (route.params.selectedDate && !route.params.eventId) {
      const selectedMoment = moment(route.params.selectedDate);
      const time = moment().startOf('hour').add(1, 'hour').get('hour');
      setEvent({
        ...event,
        startDate: selectedMoment.set({hour: time}).format(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDateChange = (selectedDate: Date) => {
    setEvent({
      ...event,
      startDate: moment(event.startDate)
        .set({
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth(),
          date: selectedDate.getDate(),
        })
        .format('YYYY-MM-DD HH:mm'),
      endDate: moment(event.endDate)
        .set({
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth(),
          date: selectedDate.getDate(),
        })
        .format('YYYY-MM-DD HH:mm'),
    });
  };

  const onStartTimeChange = (selectedDate: Date) => {
    setEvent({
      ...event,
      startDate: moment(event.startDate)
        .set({
          hours: selectedDate.getHours(),
          minutes: selectedDate.getMinutes(),
        })
        .format('YYYY-MM-DD HH:mm'),
    });
  };

  const onEndTimeChange = (selectedDate: Date) => {
    setEvent({
      ...event,
      endDate: moment(event.endDate)
        .set({
          hours: selectedDate.getHours(),
          minutes: selectedDate.getMinutes(),
        })
        .format('YYYY-MM-DD HH:mm'),
    });
  };

  const saveEvent = () => {
    // Не сохранять событие, если оно полностью пустое
    if (!event.title.trim() && !event.info.trim()) {
      navigation.goBack();
      return;
    }

    if (event.dateType === 'day') {
      setEvent({
        ...event,
        startDate: moment(event.startDate).format('YYYY-MM-DD HH:mm'),
        endDate: moment(event.endDate).endOf('day').format('YYYY-MM-DD HH:mm'),
      });
    }

    const updateEvent = {
      ...event,
      notificationIds: [
        ...notificationTime.map((el, i) =>
          (Date.now() + i).toString().slice(7),
        ),
      ],
    };

    setEvent(updateEvent);

    notificationTime.forEach((el, i) => {
      if (updateEvent.notificationIds) {
        notificationService.sendSheduleNotification({
          title: event.title,
          message: event.info,
          date: el,
          id: updateEvent.notificationIds[i],
          eventDate: moment(event.startDate).format('YYYY-MM-DD'),
        });
      }
    });

    if (route.params.eventId) {
      calendarService.updateEvent({
        ...updateEvent,
        updated: moment().format(),
      });
    } else {
      calendarService.addCalendarEvent({...updateEvent});
    }

    navigation.goBack();
  };

  // PushNotification.cancelAllLocalNotifications();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Если событие пустое, просто выходим
        if (!event.title.trim() && !event.info.trim()) {
          navigation.goBack();
        } else {
          // Если событие не пустое, показываем диалог
          setDialogVisible(!dialogVisible);
        }

        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [dialogVisible, event.title, event.info, navigation]);

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  // const showEndTimePicker = () => {
  //   setEndTimePickerVisible(true);
  // };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const changeColor = (color: string) => {
    setEvent({...event, color: color});
    setShowColorPicker(false);
  };

  const setNotification = (time: Date) => {
    setNotificationTime([...notificationTime, time]);
    setNotificationDialogVisible(false);
  };

  return (
    <>
      <AcceptDialog
        visible={dialogVisible}
        apply={() => {
          saveEvent();
          setDialogVisible(false);
        }}
        exitWithoutSaving={() => {
          setDialogVisible(false);
          navigation.goBack();
        }}
        cancel={() => setDialogVisible(false)}
        content={t('calendar.unsavedChangesWarning')}
      />
      {notificationDialogVisible && (
        <NotificationDialog
          visible={notificationDialogVisible}
          apply={setNotification}
          cancel={() => setNotificationDialogVisible(false)}
          startTime={event.startDate}
          eventType={event.dateType}
        />
      )}
      <OpenNotificationSettings
        visible={settigsVisible}
        cancel={() => setSettigsVisible(false)}
        apply={openMobileSettings}
      />
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View
          style={[
            styles.view,
            // {
            //   backgroundColor: hex2rgba(
            //     event.color ? event.color : colors.primary,
            //     0.04,
            //   ),
            // },
          ]}>
          <View
            style={[
              styles.content,
              {
                backgroundColor: hex2rgba(
                  event.color ? event.color : colors.primary,
                  0.05,
                ),
              },
            ]}>
            <EditableText
              style={styles.header}
              label={event.title}
              customText={t('tasks.enterTaskTitle')}
              isChecked={false}
              autofocus={!route.params.eventId}
              saveText={val => {
                setEvent({...event, title: val});
              }}
            />
            <ColorMenu
              visible={showColorPicker}
              onDismiss={() => setShowColorPicker(false)}
              onSelectColor={changeColor}
              anchorComponent={
                <TouchableOpacity onPress={() => setShowColorPicker(true)}>
                  <View
                    style={[
                      {
                        backgroundColor: event.color
                          ? event.color
                          : colors.primary,
                      },
                      styles.colorPicker,
                    ]}
                  />
                </TouchableOpacity>
              }
            />

            <CalendarEventEditMenu
              deleteEvent={deleteEvent}
              saveEvent={saveEvent}
            />
          </View>
          <ScrollView>
            <View
              style={{
                display: 'flex',
                margin: 20,
                marginTop: 40,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon source="clock-outline" size={24} />
              <View
                style={{
                  display: 'flex',
                  width: '90%',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text>{t('calendar.allDay')}: </Text>
                <Switch
                  value={event.dateType === 'day'}
                  onValueChange={() =>
                    setEvent({
                      ...event,
                      dateType: event.dateType === 'day' ? 'time' : 'day',
                    })
                  }
                  color={event.color}
                />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                margin: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button textColor={event.color} onPress={showDatePicker}>
                {moment(event.startDate).format('ll')}
              </Button>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {event.dateType === 'time' && (
                  <Button
                    style={{width: '20%'}}
                    textColor={event.color}
                    onPress={showStartTimePicker}>
                    {moment(event.startDate).format('HH:mm')}
                  </Button>
                )}
                {/* {event.dateType === 'time' && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}>
                    <Text style={{color: event.color, marginHorizontal: 5}}>
                      {t('calendar.to')}
                    </Text>
                    <Button
                      style={{width: '20%'}}
                      textColor={event.color}
                      onPress={showEndTimePicker}>
                      {moment(event.endDate).format('HH:mm')}
                    </Button>
                  </View>
                )} */}
              </View>
            </View>

            <Divider />
            <View
              style={{
                display: 'flex',
                margin: 20,
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <Icon source="bell-outline" size={24} />
              <View
                style={{
                  display: 'flex',
                  width: '90%',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{display: 'flex'}}>
                  {!!notificationTime.length &&
                    notificationTime.map((el, index) => (
                      <View
                        key={el.toISOString() + index}
                        style={{
                          display: 'flex',
                          width: '100%',
                          // borderWidth: 1,
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          variant="titleMedium"
                          style={{
                            padding: 5,
                            paddingTop: 0,
                            paddingBottom: 15,
                          }}>
                          {moment(el).format('DD.MM.YY HH:mm')}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            setNotificationTime(
                              notificationTime.filter(val => val !== el),
                            )
                          }>
                          <Icon source="close" size={18} />
                        </TouchableOpacity>
                      </View>
                    ))}

                  <TouchableOpacity onPress={addNotification}>
                    <Text
                      variant="titleSmall"
                      style={{padding: 5, paddingTop: 0}}>
                      {t('calendar.addNotification')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View>
                <Text>qweqwe</Text>
                <Text>qweqwe</Text>
                <Text>qweqwe</Text>
              </View> */}
            </View>
            <Divider />
            {/* <Divider /> */}
            <TextInput
              placeholder={t('tasks.taskText')}
              value={event.info}
              onChangeText={text => setEvent({...event, info: text})}
              selectionColor={colors.greyColor}
              underlineColor={colors.outlineVariant}
              activeOutlineColor={colors.greyColor}
              activeUnderlineColor={colors.greyColor}
              outlineColor={colors.outlineVariant}
              multiline
              style={{
                backgroundColor: colors.background,
              }}
              contentStyle={{
                padding: 5,
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Date Picker Modal */}
      <DatePickerModal
        locale={locale}
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={new Date(event.startDate)}
        onConfirm={params => {
          if (params.date) {
            onDateChange(params.date);
          }
          setDatePickerVisible(false);
        }}
        label={t('calendar.selectDate')}
        saveLabel={t('common.confirm')}
      />

      {/* Start Time Picker Modal */}
      <TimePickerModal
        locale={locale}
        visible={startTimePickerVisible}
        onDismiss={() => setStartTimePickerVisible(false)}
        onConfirm={({hours, minutes}) => {
          const date = new Date(event.startDate);
          date.setHours(hours);
          date.setMinutes(minutes);
          onStartTimeChange(date);
          setStartTimePickerVisible(false);
        }}
        hours={new Date(event.startDate).getHours()}
        minutes={new Date(event.startDate).getMinutes()}
        label={t('calendar.selectStartTime')}
        confirmLabel={t('datePicker.confirm')}
        cancelLabel={t('datePicker.cancel')}
      />

      {/* End Time Picker Modal */}
      <TimePickerModal
        locale={locale}
        visible={endTimePickerVisible}
        onDismiss={() => setEndTimePickerVisible(false)}
        onConfirm={({hours, minutes}) => {
          const date = new Date(event.endDate);
          date.setHours(hours);
          date.setMinutes(minutes);
          onEndTimeChange(date);
          setEndTimePickerVisible(false);
        }}
        hours={new Date(event.endDate).getHours()}
        minutes={new Date(event.endDate).getMinutes()}
        label={t('calendar.selectEndTime')}
        confirmLabel={t('datePicker.confirm')}
        cancelLabel={t('datePicker.cancel')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  view: {
    display: 'flex',
    flex: 1,
  },
  content: {
    minHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPicker: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    maxWidth: '40%',
    marginLeft: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  chips: {
    maxHeight: 40,
    minHeight: 40,
    padding: 4,
    marginBottom: 10,
  },
});
