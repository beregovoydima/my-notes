/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@/assets/config/colors';
import {ColorPicker} from '@/components/modals/ui/ColorPicker';
import {getUuid, hex2rgba} from '@/core/utils';
import {ListEditMenu} from '@/components/ui/menu/ListEditMenu';
import {
  Divider,
  RadioButton,
  Button,
  Text,
  Icon,
  Checkbox,
  TextInput,
} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EditableText} from '@/components/ui/list/EditableText';
import moment from 'moment';
import {CalendarEventType, CalendarTaskType} from '@/core/interfaces';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export function CalendarEvent({route}: {route: any}) {
  const {colors} = useTheme();

  // const [eventType, setEventType] = useState<CalendarEventType>('task');

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [event, setEvent] = useState<CalendarTaskType>({
    title: '',
    startDate: moment().format(),
    endDate: moment().endOf('day').format(),
    type: 'task',
    color: colors.lime,
    info: '',
    id: getUuid(),
    dateType: 'day',
  });

  const [date, setDate] = useState(new Date());

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    console.log(selectedDate);

    setEvent({
      ...event,
      startDate: moment(selectedDate).startOf('day').format('YYYY-MM-DD HH:mm'),
      endDate:
        event.dateType === 'day'
          ? moment(selectedDate).endOf('day').format('YYYY-MM-DD HH:mm')
          : moment(selectedDate).format('YYYY-MM-DD HH:mm'),
    });
  };

  const showMode = (currentMode: any | undefined) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const changeColor = (color: string) => {
    setEvent({...event, color: color});
    setShowColorPicker(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ColorPicker
        visible={showColorPicker}
        hideModal={() => setShowColorPicker(false)}
        changeColor={changeColor}
      />
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
            customText="Введите название задачи"
            isChecked={false}
            saveText={val => {
              setEvent({...event, title: val});
            }}
          />
          <TouchableOpacity onPress={() => setShowColorPicker(true)}>
            <View
              style={[
                {
                  backgroundColor: event.color ? event.color : colors.primary,
                },
                styles.colorPicker,
              ]}
            />
          </TouchableOpacity>

          {/* <View>
            <Icon
              name="share-variant"
              size={24}
              color={colors.greyIconColor}
              style={styles.ml10}
              onPress={() => {}}
            />
          </View> */}

          <ListEditMenu deleteList={() => {}} saveList={() => {}} />
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
              <Text>Весь день: </Text>
              <Checkbox
                status={event.dateType === 'day' ? 'checked' : 'unchecked'}
                color={event.color}
                onPress={() =>
                  setEvent({
                    ...event,
                    dateType: event.dateType === 'day' ? 'time' : 'day',
                  })
                }
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              width: '100%',
              margin: 20,
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <Button
              style={{width: '45%'}}
              textColor={event.color}
              onPress={showDatepicker}>
              {moment(event.startDate).locale('ru').format('ll')}
            </Button>
            {event.dateType === 'time' && (
              <Button
                style={{width: '45%'}}
                textColor={event.color}
                onPress={showTimepicker}>
                {moment(event.endDate).locale('ru').format('HH:mm')}
              </Button>
            )}
          </View>
          <Divider />
          <TextInput
            label="Заметка"
            value={event.info}
            onChangeText={text => setEvent({...event, info: text})}
            selectionColor={event.color}
            underlineColor={event.color}
            multiline
            activeOutlineColor={event.color}
            contentStyle={{backgroundColor: 'white', padding: 5}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
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
