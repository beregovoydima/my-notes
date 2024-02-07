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

const Tab = createBottomTabNavigator();

const CalendarPage = ({route}: {route: RouteProp<ParamListBase>}) => (
  <Text>{route.name}</Text>
);

const SettingsPage = ({route}: {route: RouteProp<ParamListBase>}) => {
  return <Text>{route.name}</Text>;
};
export function NavBar({route}: {route: RouteProp<ParamListBase>}) {
  const {colors} = useTheme();

  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  const getNoteIcon = (focused: boolean, color: string) => {
    if (focused) {
      return <SimpleIcon name="note" color={colors.primary} size={20} />;
    }
    return <SimpleIcon name="note" color={color} size={20} />;
  };

  const getNoteLabel = (focused: boolean, color: string) => {
    if (focused) {
      return (
        <Text style={[{color: colors.primary}, styles.navbarLabel]}>
          Заметки
        </Text>
      );
    }
    return <Text style={[{color: color}, styles.navbarLabel]}>Заметки</Text>;
  };

  const getCalendarIcon = (focused: boolean, color: string) => {
    if (focused) {
      return <SimpleIcon name="calendar" color={colors.primary} size={20} />;
    }
    return <SimpleIcon name="calendar" color={color} size={20} />;
  };

  const getCalendarLabel = (focused: boolean, color: string) => {
    if (focused) {
      return (
        <Text style={[{color: colors.primary}, styles.navbarLabel]}>
          Календарь
        </Text>
      );
    }
    return <Text style={[{color: color}, styles.navbarLabel]}>Календарь</Text>;
  };

  const getProfileIcon = (focused: boolean, color: string) => {
    if (focused) {
      return <SimpleIcon name="menu" color={colors.primary} size={20} />;
    }
    return <SimpleIcon name="menu" color={color} size={20} />;
  };

  const getProfileLabel = (focused: boolean, color: string) => {
    if (focused) {
      return (
        <Text style={[{color: colors.primary}, styles.navbarLabel]}>
          Больше
        </Text>
      );
    }
    return <Text style={[{color: color}, styles.navbarLabel]}>Больше</Text>;
  };

  const getTasksIcon = (focused: boolean, color: string) => {
    if (focused) {
      return <SimpleIcon name="notebook" color={colors.primary} size={20} />;
    }
    return <SimpleIcon name="notebook" color={color} size={20} />;
  };

  const getTasksLabel = (focused: boolean, color: string) => {
    if (focused) {
      return (
        <Text style={[{color: colors.primary}, styles.navbarLabel]}>
          Задачи
        </Text>
      );
    }
    return <Text style={[{color: color}, styles.navbarLabel]}>Задачи</Text>;
  };

  const getSearchIcon = (item: any) => {
    const {focused, color} = item;
    return (
      <SimpleIcon
        name="magnifier"
        color={focused ? colors.primary : color}
        size={20}
      />
    );
  };

  const getSearchLabel = (focused: boolean, color: string) => {
    if (focused) {
      return (
        <Text style={[{color: colors.primary}, styles.navbarLabel]}>Поиск</Text>
      );
    }
    return <Text style={[{color: color}, styles.navbarLabel]}>Поиск</Text>;
  };

  return (
    <Tab.Navigator
      initialRouteName="Notes"
      sceneContainerStyle={styles.page}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55,
          paddingBottom: 5,
        },
        tabBarActiveBackgroundColor: colors.greyDarkFill,
      }}>
      <Tab.Screen
        name="Notes"
        component={NotesPage}
        options={{
          tabBarLabel: ({focused, color}) => getNoteLabel(focused, color),
          tabBarIcon: ({focused, color}) => getNoteIcon(focused, color),
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
          tabBarLabel: ({focused, color}) => getCalendarLabel(focused, color),
          tabBarIcon: ({focused, color}) => getCalendarIcon(focused, color),
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
      <Tab.Screen
        name="Tasks"
        component={CalendarPage}
        options={{
          tabBarLabel: ({focused, color}) => getTasksLabel(focused, color),
          tabBarIcon: ({focused, color}) => getTasksIcon(focused, color),
          tabBarItemStyle: {
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              focusedRouteName === 'Tasks'
                ? colors.lineGreyColor
                : 'transparent',
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={CalendarPage}
        options={{
          tabBarLabel: ({focused, color}) => getSearchLabel(focused, color),
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
          tabBarLabel: ({focused, color}) => getProfileLabel(focused, color),
          tabBarIcon: ({focused, color}) => getProfileIcon(focused, color),
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
