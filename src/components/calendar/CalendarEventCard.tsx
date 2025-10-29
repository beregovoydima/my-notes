import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@/assets/config/colors';
import {CalendarEventTaskType, ScreenNavigationProp} from '@/core/interfaces';
import {useNavigation} from '@react-navigation/native';
import {getHighlightedParts, hex2rgba} from '@/core/utils';
import {useTranslation} from '@/core/i18n';
import {useCardBackground} from '@/core/hooks';
import {CalendarEventCardMenu} from '@/components/ui/menu/CalendarEventCardMenu';
import {calendarService, notificationService} from '@/core/services';
import {useThemeMode} from '@/components/context/ThemeContext';

interface CalendarEventCardProps {
  item: CalendarEventTaskType;
  searchQuery?: string;
}

export const CalendarEventCard = ({
  item,
  searchQuery,
}: CalendarEventCardProps) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation: ScreenNavigationProp = useNavigation();
  const showCardBackground = useCardBackground();
  const {isDarkMode} = useThemeMode();
  const openCalendarEvent = (id: string) => {
    navigation.push('CalendarEvent', {eventId: id});
  };

  const handleEdit = (id: string) => {
    navigation.push('CalendarEvent', {eventId: id});
  };

  const handleDelete = (id: string) => {
    calendarService.deleteCalendarEvent(id);

    if (item.notificationIds) {
      notificationService.cancelSheduleNotifications(item.notificationIds);
    }
  };

  const cardBackgroundColor = (color: string | undefined | null) => {
    if (isDarkMode) {
      return colors.cardBackgroundColor;
    }

    return hex2rgba(color || colors.primary, 0.08);
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

  const rightContent = () => (
    <CalendarEventCardMenu
      eventId={item.id}
      editEvent={handleEdit}
      deleteEvent={handleDelete}
    />
  );

  return (
    <Card style={[styles.card]} onPress={() => openCalendarEvent(item.id)}>
      <Card.Title
        style={[
          showCardBackground && {
            backgroundColor: cardBackgroundColor(item.color),
          },
          !showCardBackground && {
            backgroundColor: colors.cardBackgroundColor,
            borderTopColor: colors.cardBackgroundColor,
          },
          styles.topBorder,
        ]}
        title={
          searchQuery ? (
            <Text numberOfLines={2} ellipsizeMode="tail">
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
            item.title || t('lists.noTitle')
          )
        }
        titleNumberOfLines={2}
        left={props => leftContent(props)}
        right={rightContent}
      />
      <Card.Content
        style={[
          showCardBackground && {
            backgroundColor: cardBackgroundColor(item.color),
          },
          !showCardBackground && {
            backgroundColor: colors.cardBackgroundColor,
            borderTopColor: colors.cardBackgroundColor,
          },
          styles.bottomBorder,
        ]}>
        {item.info ? (
          <Text numberOfLines={2} ellipsizeMode="tail">
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
              {item.dateType === 'day'
                ? t('calendar.date')
                : t('calendar.time')}
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
                : moment(item.startDate).format('YYYY-MM-DD HH:mm')}
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
  topBorder: {
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
    borderColor: 'transparent',
  },
  bottomBorder: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
