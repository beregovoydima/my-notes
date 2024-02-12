import {useTheme} from '@/assets/config/colors';
import {hex2rgba} from '@/core/utils';
import moment from 'moment';
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Chip, Icon, Text} from 'react-native-paper';

export const CalendarItem = () => {
  const {colors} = useTheme();
  const INITIAL_DATE = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [INITIAL_DATE]: {
        textColor: colors.primary,
      },
      '2024-02-11': {marked: true, dotColor: colors.primary},
      '2024-02-15': {marked: true, dotColor: colors.primary},
      '2024-02-16': {marked: true, dotColor: colors.primary},
      '2024-02-21': {
        startingDay: true,
        color: colors.primary,
        textColor: colors.whiteColor,
      },
      '2024-02-22': {
        color: hex2rgba(colors.primary, 0.4),
        textColor: colors.whiteColor,
      },
      '2024-02-23': {
        color: hex2rgba(colors.primary, 0.4),
        textColor: colors.whiteColor,
        marked: true,
        dotColor: colors.whiteColor,
      },
      '2024-02-24': {
        color: hex2rgba(colors.primary, 0.4),
        textColor: colors.whiteColor,
      },
      '2024-02-25': {
        endingDay: true,
        color: colors.primary,
        textColor: colors.whiteColor,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        customContainerStyle: {
          backgroundColor: hex2rgba(colors.primary, 0.85),
        },
      },
    };
  }, [INITIAL_DATE, colors.primary, colors.whiteColor, selected]);

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
        firstDay={1}
        onDayPress={onDayPress}
        markedDates={marked}
        markingType={'period'}
      />
      <View style={styles.dateBlock}>
        <Text variant="labelMedium" style={{color: colors.greyColor}}>
          {moment(selected).format('YYYY-MM-DD HH:mm')}
        </Text>
        <Chip
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
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
});
