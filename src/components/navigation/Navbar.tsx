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
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {CalendarPage} from '../pages/calendar/CalendarPage';
import {SearchPage} from '../pages/search/SearchPage';

const Tab = createBottomTabNavigator();

const SettingsPage = ({route}: {route: RouteProp<ParamListBase>}) => {
  return <Text>{route.name}</Text>;
};
export function NavBar({route}: {route: RouteProp<ParamListBase>}) {
  const {colors} = useTheme();

  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  const getNoteIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="note"
        color={focused ? colors.primary : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getNoteLabel = (focused: boolean) => {
    return (
      <Text
        style={[
          {color: focused ? colors.primary : colors.greyIconColor},
          styles.navbarLabel,
        ]}>
        Заметки
      </Text>
    );
  };

  const getCalendarIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="calendar"
        color={focused ? colors.primary : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getCalendarLabel = (focused: boolean) => {
    return (
      <Text
        style={[
          {color: focused ? colors.primary : colors.greyIconColor},
          styles.navbarLabel,
        ]}>
        Календарь
      </Text>
    );
  };

  const getProfileIcon = (focused: boolean) => {
    return (
      <SimpleIcon
        name="menu"
        color={focused ? colors.primary : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getProfileLabel = (focused: boolean) => {
    return (
      <Text
        style={[
          {color: focused ? colors.primary : colors.greyIconColor},
          styles.navbarLabel,
        ]}>
        Больше
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
        color={focused ? colors.primary : colors.greyIconColor}
        size={20}
      />
    );
  };

  const getSearchLabel = (focused: boolean) => {
    return (
      <Text
        style={[
          {color: focused ? colors.primary : colors.greyIconColor},
          styles.navbarLabel,
        ]}>
        Поиск
      </Text>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Notes"
      sceneContainerStyle={styles.page}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveBackgroundColor: colors.greyDarkFill,
      }}>
      <Tab.Screen
        name="Notes"
        component={NotesPage}
        options={{
          tabBarLabel: ({focused}) => getNoteLabel(focused),
          tabBarIcon: ({focused}) => getNoteIcon(focused),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Notes'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{
          tabBarLabel: ({focused}) => getCalendarLabel(focused),
          tabBarIcon: ({focused}) => getCalendarIcon(focused),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Calendar'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      />
      {/* <Tab.Screen
        name="Tasks"
        component={SettingsPage}
        options={{
          tabBarLabel: ({focused}) => getTasksLabel(focused),
          tabBarIcon: ({focused}) => getTasksIcon(focused),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Tasks'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      /> */}
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: ({focused}) => getSearchLabel(focused),
          tabBarIcon: item => getSearchIcon(item),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Search'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarLabel: ({focused}) => getProfileLabel(focused),
          tabBarIcon: ({focused}) => getProfileIcon(focused),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Settings'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbarLabel: {
    fontSize: 12,
  },
  page: {
    backgroundColor: '#ffffff',
  },
});
