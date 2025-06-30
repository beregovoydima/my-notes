/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {CalendarEventDotType, ScreenNavigationProp} from '@/core/interfaces';
import {calendarService} from '@/core/services';
import {hex2rgba} from '@/core/utils';
import {useTranslation} from '@/core/i18n';
import {setMomentLocale, formatDate} from '@/core/utils/dateLocalization';
import moment from 'moment';
import React, {Fragment, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, CalendarProvider, LocaleConfig} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip, Icon, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FabAddCalendarEventButton} from '../ui/fab/FabAddCalendarEventButton';
import {CalendarEventCard} from './CalendarEventCard';

// Локали для календаря
const calendarLocales = {
  uk: {
    monthNames: [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ],
    monthNamesShort: [
      'Січ.',
      'Лют.',
      'Бер.',
      'Квіт.',
      'Трав.',
      'Черв.',
      'Лип.',
      'Серп.',
      'Вер.',
      'Жовт.',
      'Лист.',
      'Груд.',
    ],
    dayNames: [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      "П'ятниця",
      'Субота',
    ],
    dayNamesShort: ['Нд.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
    today: 'Сьогодні',
  },
  ru: {
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
  },
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: 'Today',
  },
};

export const CalendarItemLocalized = () => {
  const {colors} = useTheme();
  const {t, locale} = useTranslation();
  const INITIAL_DATE = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const navigation: ScreenNavigationProp = useNavigation();

  const calendarEvents = useSelector(() =>
    calendarService.storeGetCalendarEventCollection(),
  );

  // Установка локали для moment и календаря
  useEffect(() => {
    setMomentLocale(locale);

    // Настройка локали для react-native-calendars
    LocaleConfig.locales[locale] = calendarLocales[locale];
    LocaleConfig.defaultLocale = locale;
  }, [locale]);

  const onDayPress = (day: any) => {
    setSelected(day.dateString);
  };

  const onDayLongPress = (day: any) => {
    navigation.push('CalendarEvent', {selectedDate: day.dateString});
  };

  const marked = useMemo(() => {
    if (calendarEvents.length) {
      return calendarEvents.reduce((acc: CalendarEventDotType, cur) => {
        const date = moment(cur.startDate).format('YYYY-MM-DD');
        if (acc[date] && acc[date].dots) {
          if (acc[date].dots.length < 2) {
            acc[date].dots.push({
              key: cur.id,
              color: hex2rgba(cur.color),
              selectedDotColor: colors.whiteColor,
            });
          }
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
      }, {});
    }

    return {
      [selected]: {
        selected: true,
        selectedColor: hex2rgba(colors.primary, 0.85),
        disableTouchEvent: true,
      },
    };
  }, [calendarEvents, colors.primary, colors.whiteColor, selected]);

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
      <CalendarProvider date={selected}>
        <Calendar
          initialPosition={Positions.OPEN}
          closeOnDayPress={false}
          enableSwipeMonths
          current={currentMonth}
          renderArrow={renderArrow}
          showSixWeeks={true}
          hideKnob={false}
          removeClippedSubviews
          onVisibleMonthsChange={(months: any) => {
            console.log('now these months are visible', months);
          }}
          theme={{
            todayTextColor: colors.primary,
            todayBackgroundColor: 'transparent',
          }}
          firstDay={1}
          onDayPress={onDayPress}
          onDayLongPress={onDayLongPress}
          markedDates={marked}
          markingType={'multi-dot'}
          onMonthChange={() => setSelected(selected)}
        />
        <FabAddCalendarEventButton selectDate={selected} />
        <View style={styles.dateBlock}>
          <Text variant="labelMedium" style={{color: colors.greyColor}}>
            {formatDate(selected, 'L', locale)}
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
            {t('calendar.today')}
          </Chip>
        </View>
        <ScrollView style={{paddingBottom: 10}}>
          {calendarEvents
            .filter(
              el => moment(el.startDate).format('YYYY-MM-DD') === selected,
            )
            .map(el => {
              return <CalendarEventCard key={el.id} item={el} />;
            })}
        </ScrollView>
      </CalendarProvider>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: 'red',
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
