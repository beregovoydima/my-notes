import React, {useState} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export function CreateEvent() {
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
        <TextInput style={styles.input} placeholder="Добавьте название" />
        <View style={styles.row}>
          <Text style={styles.label}>Задача</Text>
          <RadioButton
            value="task"
            status={eventType === 'task' ? 'checked' : 'unchecked'}
            onPress={() => setEventType('task')}
          />
          <Text style={styles.label}>Мероприятие</Text>
          <RadioButton
            value="meet"
            status={eventType === 'meet' ? 'checked' : 'unchecked'}
            onPress={() => setEventType('meet')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Весь день</Text>
          <Switch value={isAllDay} onValueChange={setIsAllDay} />
        </View>
        <View>
          <Button onPress={showDatepicker} title="Показать выбор даты">
            {'Показать выбор даты'}
          </Button>
          <Button onPress={showTimepicker} title="Показать выбор времени" />
          <Text>Выбрано: {moment(date).format('LLLL')}</Text>
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
