import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
} from 'react-native';
import {Button, Divider, RadioButton, Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CalendarEventTaskType} from '@/core/interfaces';
import {calendarService} from '@/core/services';
import {getUuid} from '@/core/utils';
import moment from 'moment';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useTranslation} from '@/core/i18n';

export function CreateEvent() {
  const {t} = useTranslation();
  const [eventType, setEventType] = useState('task');
  const [isAllDay, setIsAllDay] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (currentMode === 'date') {
      setShowDatePicker(true);
    } else {
      setShowTimePicker(true);
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput style={styles.input} placeholder={t('calendar.addTitle')} />
        <View style={styles.row}>
          <Text style={styles.label}>{t('tasks.title')}</Text>
          <RadioButton
            value="task"
            status={eventType === 'task' ? 'checked' : 'unchecked'}
            onPress={() => setEventType('task')}
          />
          <Text style={styles.label}>{t('calendar.title')}</Text>
          <RadioButton
            value="meet"
            status={eventType === 'meet' ? 'checked' : 'unchecked'}
            onPress={() => setEventType('meet')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{t('calendar.allDay')}</Text>
          <Switch value={isAllDay} onValueChange={setIsAllDay} />
        </View>
        <View>
          <Button onPress={showDatepicker}>{t('calendar.eventDate')}</Button>
          <Button onPress={showTimepicker}>{t('calendar.eventTime')}</Button>
          <Text>
            {t('common.selected')}: {moment(date).format('LLLL')}
          </Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
      <Divider />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  input: {
    fontSize: 18,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
  },
});
