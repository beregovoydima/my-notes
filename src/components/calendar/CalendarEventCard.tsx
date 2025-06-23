import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@/assets/config/colors';
import {CalendarEventTaskType, ScreenNavigationProp} from '@/core/interfaces';
import {useNavigation} from '@react-navigation/native';
import {getHighlightedParts} from '@/core/utils';

interface CalendarEventCardProps {
  item: CalendarEventTaskType;
  searchQuery?: string;
}

export const CalendarEventCard = ({
  item,
  searchQuery,
}: CalendarEventCardProps) => {
  const {colors} = useTheme();
  const navigation: ScreenNavigationProp = useNavigation();

  const openCalendarEvent = (id: string) => {
    navigation.push('CalendarEvent', {eventId: id});
  };

  const leftContent = (props: {size: number}) => {
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

  return (
    <Card
      style={{backgroundColor: colors.whiteColor, margin: 4}}
      onPress={() => openCalendarEvent(item.id)}>
      <Card.Title
        title={
          searchQuery ? (
            <Text>
              {getHighlightedParts(item.title, searchQuery).map(
                (part, index) => (
                  <Text
                    key={index}
                    style={
                      part.highlight
                        ? {backgroundColor: colors.primaryContainer}
                        : {}
                    }>
                    {part.text}
                  </Text>
                ),
              )}
            </Text>
          ) : (
            item.title
          )
        }
        left={props => leftContent(props)}
      />
      <Card.Content>
        {item.info ? (
          <Text>
            {searchQuery
              ? getHighlightedParts(item.info, searchQuery).map(
                  (part, index) => (
                    <Text
                      key={index}
                      style={
                        part.highlight
                          ? {backgroundColor: colors.primaryContainer}
                          : {}
                      }>
                      {part.text}
                    </Text>
                  ),
                )
              : item.info}
          </Text>
        ) : null}
        <View style={styles.footer}>
          <View style={styles.item}>
            <Text
              variant="labelSmall"
              style={{
                color: colors.greyColor,
              }}>
              {item.dateType === 'day' ? 'Дата' : 'Время'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              variant="labelSmall"
              style={{
                color: colors.greyColor,
              }}>
              {item.dateType === 'day'
                ? moment(item.startDate).format('YYYY-MM-DD')
                : moment(item.startDate).format('YYYY-MM-DD HH:mm') +
                  ' - ' +
                  moment(item.endDate).format('HH:mm')}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
