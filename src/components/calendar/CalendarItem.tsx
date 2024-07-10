/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {calendarService} from '@/core/services';
import {hex2rgba} from '@/core/utils';
import moment from 'moment';
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Card, Chip, Icon, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

export const CalendarItem = () => {
  const {colors} = useTheme();
  const INITIAL_DATE = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const calendarEvents = useSelector(() =>
    calendarService.storeGetCalendarEventCollection(),
  );

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

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
    if (calendarEvents.length) {
      return calendarEvents.reduce(
        (
          acc: {
            [key: string]: {
              dots?: any[];
              selected?: boolean;
              selectedColor?: string;
              disableTouchEvent?: boolean;
            };
          },
          cur,
        ) => {
          const date = moment(cur.endDate).format('YYYY-MM-DD');
          if (acc[date] && acc[date].dots) {
            acc[date].dots.push({
              key: cur.id,
              color: hex2rgba(cur.color),
              selectedDotColor: colors.whiteColor,
            });
          } else {
            acc[date] = {
              dots: [
                {
                  key: cur.title,
                  color: hex2rgba(cur.color),
                  selectedDotColor: colors.whiteColor,
                },
              ],
            };
          }
          acc[selected] = {
            selected: true,
            selectedColor: hex2rgba(colors.primary, 0.85),
            disableTouchEvent: true,
          };

          return acc;
        },
        {},
      );
    }

    return {
      [selected]: {
        selected: true,
        selectedColor: hex2rgba(colors.primary, 0.85),
        disableTouchEvent: true,
      },
    };
    //   '2024-02-20': {
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
    //   [selected]: {
    //     selected: true,
    //     selectedColor: hex2rgba(colors.primary, 0.85),
    //     disableTouchEvent: true,
    //   },
    // };
  }, [calendarEvents, colors.primary, colors.whiteColor, selected]);

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
  LocaleConfig.locales.ru = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Янв.',
      'Фев.',
      'Март',
      'Апр.',
      'Май',
      'Июнь',
      'Июль',
      'Авг.',
      'Сен.',
      'Окт.',
      'Ноя.',
      'Дек.',
    ],
    dayNames: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
    today: 'Сегодня',
  };

  LocaleConfig.defaultLocale = 'ru';

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
        onVisibleMonthsChange={(months: any) => {
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
      <ScrollView style={{paddingBottom: 10}}>
        {calendarEvents.map(el => {
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
                      {moment(el.startDate).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{
                        color: colors.greyColor,
                      }}>
                      {moment(el.endDate).format('YYYY-MM-DD HH:mm')}
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
      </ScrollView>
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
