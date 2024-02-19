/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {getUuid, hex2rgba} from '@/core/utils';
import moment from 'moment';
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Avatar, Card, Chip, Icon, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const CalendarItem = () => {
  const {colors} = useTheme();
  const INITIAL_DATE = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  const customEvents = [
    {
      title: 'Задача',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'task',
      color: colors.lime,
      info: '',
      id: getUuid(),
    },
    {
      title: 'Задача',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'task',
      color: null,
      info: '',
      id: getUuid(),
    },
    {
      title: 'Test',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'task',
      color: null,
      info: '',
      id: getUuid(),
    },
    {
      title: 'Test',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'task',
      color: null,
      info: '',
      id: getUuid(),
    },
    {
      title: 'Встреча',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'meet',
      color: colors.lime,
      info: '',
      id: getUuid(),
    },
    {
      title: 'Test',
      startDate: moment().format(),
      endDate: moment().endOf('day').format(),
      type: 'meet',
      color: null,
      info: '',
      id: getUuid(),
    },
  ];

  // const events = {
  //   '2024-02-20': {
  //     type: 'task',
  //     dots: [
  //       {
  //         key: 'vacation',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //       {
  //         key: 'massage',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //       {
  //         key: 'workout',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //     ],
  //   },
  //   '2024-02-21': {
  //     dots: [
  //       {
  //         key: 'vacation',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //       {
  //         key: 'massage',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //     ],
  //   },
  //   '2024-02-22': {
  //     dots: [
  //       {
  //         key: 'vacation',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //       {
  //         key: 'workout',
  //         color: hex2rgba(colors.primary, 0.85),
  //         selectedDotColor: colors.whiteColor,
  //       },
  //     ],
  //   },
  // };

  const marked = useMemo(() => {
    return {
      '2024-02-20': {
        dots: [
          {
            key: 'vacation',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
          {
            key: 'massage',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
          {
            key: 'workout',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
        ],
      },
      '2024-02-21': {
        dots: [
          {
            key: 'vacation',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
          {
            key: 'massage',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
        ],
      },
      '2024-02-22': {
        dots: [
          {
            key: 'vacation',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
          {
            key: 'workout',
            color: hex2rgba(colors.primary, 0.85),
            selectedDotColor: colors.whiteColor,
          },
        ],
      },
      [selected]: {
        selected: true,
        selectedColor: hex2rgba(colors.primary, 0.85),
        disableTouchEvent: true,
      },
    };
  }, [colors.primary, colors.whiteColor, selected]);

  // const selectedDayEvents = useMemo(() => {
  //   return events[selected] || [];
  // }, [events, selected]);

  const leftContent = (props: {size: number}, item: any) => {
    return (
      <Avatar.Icon
        {...props}
        style={{backgroundColor: item.color ? item.color : colors.primary}}
        color={colors.whiteColor}
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => (
          <MaterialIcons
            size={26}
            color={colors.whiteColor}
            name={item.type === 'task' ? 'task-alt' : 'event'}
          />
        )}
      />
    );
  };

  const renderArrow = (direction: 'left' | 'right') => {
    return (
      <Icon
        source={`chevron-${direction}`}
        size={24}
        color={colors.greyColor}
      />
    );
  };
  return (
    <Fragment>
      <Calendar
        enableSwipeMonths
        current={currentMonth}
        style={styles.calendar}
        renderArrow={renderArrow}
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        theme={{
          todayTextColor: colors.primary, // Цвет текста для текущей даты
          todayBackgroundColor: 'transparent',
        }}
        firstDay={1}
        onDayPress={onDayPress}
        markedDates={marked}
        markingType={'multi-dot'}
      />
      <View style={styles.dateBlock}>
        <Text variant="labelMedium" style={{color: colors.greyColor}}>
          {moment(selected).format('YYYY-MM-DD')}
        </Text>
        <Chip
          style={[
            {
              borderColor:
                selected === INITIAL_DATE ? 'transparent' : colors.greyColor,
              backgroundColor:
                selected === INITIAL_DATE
                  ? colors.primaryContainer
                  : colors.whiteColor,
            },

            styles.chip,
          ]}
          icon="calendar-today"
          mode={selected === INITIAL_DATE ? 'flat' : 'outlined'}
          onPress={() => {
            setSelected(INITIAL_DATE);
            setCurrentMonth(INITIAL_DATE);
          }}>
          Сегодня
        </Chip>
      </View>
      <View style={{paddingBottom: 10}}>
        {customEvents.map(el => {
          return (
            <Card
              key={el.id}
              style={{backgroundColor: colors.whiteColor, margin: 4}}>
              <Card.Title
                title={el.title}
                left={props => leftContent(props, el)}
              />
              <Card.Content>
                <View style={styles.footer}>
                  <View style={styles.item}>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: colors.greyColor,
                      }}>
                      Начало
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: colors.greyColor,
                      }}>
                      Конец
                    </Text>
                  </View>
                  <View style={styles.item}>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: colors.greyColor,
                      }}>
                      {moment().format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: colors.greyColor,
                      }}>
                      {moment().format('YYYY-MM-DD HH:mm')}
                    </Text>
                  </View>
                  {/* <Text
              variant="labelSmall"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: colors.greyColor,
                marginLeft: item.updated ? 4 : 0,
              }}>
              {item.folder?.name}
            </Text> */}
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 350,
  },
  dateBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  chip: {
    borderWidth: 1,
  },
  footer: {
    display: 'flex',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
