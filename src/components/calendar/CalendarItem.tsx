/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {CalendarEventDotType, ScreenNavigationProp} from '@/core/interfaces';
import {calendarService} from '@/core/services';
import {hex2rgba, ruCalendarLocale} from '@/core/utils';
import {calendarLocales} from '@/core/utils/calendarLocales';
import moment from 'moment';
import React, {Fragment, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, CalendarProvider, LocaleConfig} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FabAddCalendarEventButton} from '../ui/fab/FabAddCalendarEventButton';
import {CalendarEventCard} from './CalendarEventCard';
import {useTranslation} from '@/core/i18n';
import {useThemeMode} from '@/components/context/ThemeContext';
import {ActiveChip} from '@/components/ui/chips/ActiveChip';

export const CalendarItem = ({
  initialSelectedDate,
}: {
  initialSelectedDate?: string;
}) => {
  const {colors} = useTheme();
  const {t, locale} = useTranslation();
  const {isDarkMode} = useThemeMode();
  const INITIAL_DATE = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(initialSelectedDate || INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(
    initialSelectedDate || INITIAL_DATE,
  );
  const navigation: ScreenNavigationProp = useNavigation();

  const calendarEvents = useSelector(() =>
    calendarService.storeGetCalendarEventCollection(),
  );

  useMemo(() => {
    if (locale === 'uk') {
      LocaleConfig.locales.uk = calendarLocales.uk;
      LocaleConfig.defaultLocale = 'uk';
    } else if (locale === 'ru') {
      LocaleConfig.locales.ru = ruCalendarLocale;
      LocaleConfig.defaultLocale = 'ru';
    } else {
      LocaleConfig.locales.en = calendarLocales.en;
      LocaleConfig.defaultLocale = 'en';
    }
  }, [locale]);

  useEffect(() => {
    if (initialSelectedDate) {
      setSelected(initialSelectedDate);
      setCurrentMonth(initialSelectedDate);
    }
  }, [initialSelectedDate]);

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
          key={`${locale}-${isDarkMode}`}
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
            backgroundColor: colors.cardBackgroundColor,
            calendarBackground: colors.cardBackgroundColor,
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.whiteColor,
            todayTextColor: colors.primary,
            dayTextColor: colors.text,
            textDisabledColor: colors.greyColor,
            dotColor: colors.primary,
            selectedDotColor: colors.whiteColor,
            arrowColor: colors.primary,
            monthTextColor: colors.text,
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontWeight: '500',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
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
            {moment(selected).format('YYYY-MM-DD')}
          </Text>
          <ActiveChip
            icon="calendar-today"
            label={t('calendar.today')}
            active={selected === INITIAL_DATE}
            onPress={() => {
              setSelected(INITIAL_DATE);
              setCurrentMonth(INITIAL_DATE);
            }}
          />
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
    // height: 350,
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
