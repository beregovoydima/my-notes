import React from 'react';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesPage} from '@/components/pages/notes/NotesPage';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  RouteProp,
  // getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {CalendarPage} from '../pages/calendar/CalendarPage';
import {SearchPage} from '../pages/search/SearchPage';
import {MorePage} from '../pages/more/MorePage';
import {useTranslation} from '@/core/i18n';

const Tab = createBottomTabNavigator();

export function NavBar({}: {route: RouteProp<ParamListBase>}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  // const focusedRouteName = getFocusedRouteNameFromRoute(route);

  const getNoteIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="note"
        color={focused ? colors.accent : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getNoteLabel = (focused: boolean) => {
    return (
      <Text
        numberOfLines={1}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: focused ? colors.accent : colors.greyIconColor,
            fontWeight: focused ? '700' : '400',
          },
          styles.navbarLabel,
        ]}>
        {t('navigation.notes')}
      </Text>
    );
  };

  const getCalendarIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="calendar"
        color={focused ? colors.accent : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getCalendarLabel = (focused: boolean) => {
    return (
      <Text
        numberOfLines={1}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: focused ? colors.accent : colors.greyIconColor,
            fontWeight: focused ? '700' : '400',
          },
          styles.navbarLabel,
        ]}>
        {t('navigation.calendar')}
      </Text>
    );
  };

  const getProfileIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="menu"
        color={focused ? colors.accent : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getProfileLabel = (focused: boolean) => {
    return (
      <Text
        numberOfLines={1}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: focused ? colors.accent : colors.greyIconColor,
            fontWeight: focused ? '700' : '400',
          },
          styles.navbarLabel,
        ]}>
        {t('navigation.more')}
      </Text>
    );
  };

  // const getTasksIcon = (focused: boolean) => {
  //   return (
  //     <SimpleIcon
  //       name="notebook"
  //       color={focused ? colors.primary : colors.greyIconColor}
  //       size={20}
  //     />
  //   );
  // };

  // const getTasksLabel = (focused: boolean) => {
  //   return (
  //     <Text
  //       style={[
  //         {color: focused ? colors.primary : colors.greyIconColor},
  //         styles.navbarLabel,
  //       ]}>
  //       Задачи
  //     </Text>
  //   );
  // };

  const getSearchIcon = (item: any) => {
    const {focused} = item;
    return (
      <SimpleIcon
        name="magnifier"
        color={focused ? colors.accent : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getSearchLabel = (focused: boolean) => {
    return (
      <Text
        numberOfLines={1}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: focused ? colors.accent : colors.greyIconColor,
            fontWeight: focused ? '700' : '400',
          },
          styles.navbarLabel,
        ]}>
        {t('navigation.search')}
      </Text>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Notes"
      sceneContainerStyle={{backgroundColor: colors.navbar}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.navbar,
          height: 55,
          paddingBottom: 6,
          borderTopColor: 'transparent',
        },
        tabBarActiveBackgroundColor: colors.navbar,
        tabBarInactiveBackgroundColor: colors.navbar,
      }}>
      <Tab.Screen
        name="Notes"
        component={NotesPage}
        options={{
          tabBarLabel: ({focused}) => getNoteLabel(focused),
          tabBarIcon: ({focused}) => getNoteIcon(focused),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{
          tabBarLabel: ({focused}) => getCalendarLabel(focused),
          tabBarIcon: ({focused}) => getCalendarIcon(focused),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: ({focused}) => getSearchLabel(focused),
          tabBarIcon: item => getSearchIcon(item),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MorePage}
        options={{
          tabBarLabel: ({focused}) => getProfileLabel(focused),
          tabBarIcon: ({focused}) => getProfileIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbarLabel: {
    fontSize: 12,
  },
});
