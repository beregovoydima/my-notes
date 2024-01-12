// import React from 'react';
// import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
// import {Text} from 'react-native-paper';
// import {useTheme} from '@/assets/config/colors';
// import {NotesPage} from '@/pages/notification/NotesPage';
// import {StyleSheet} from 'react-native';

// const CalendarPage = ({route}) => <Text>{route.name}</Text>;

// const SettingsPage = ({route}) => {
//   console.log(route);

//   return <Text>{route.name}</Text>;
// };
// export function NavBar() {
//   const {colors} = useTheme();

//   const getNoteIcon = (focused: boolean, color: string) => {
//     if (focused) {
//       return <SimpleIcon name="note" color={colors.primary} size={26} />;
//     }
//     return <SimpleIcon name="note" color={color} size={26} />;
//   };

//   const getNoteLabel = (focused: boolean, color: string) => {
//     if (focused) {
//       return (
//         <Text style={[{color: colors.primary}, styles.navbarLabel]}>
//           Заметки
//         </Text>
//       );
//     }
//     return <Text style={[{color: color}, styles.navbarLabel]}>Заметки</Text>;
//   };

//   const getCalendarIcon = (focused: boolean, color: string) => {
//     if (focused) {
//       return <SimpleIcon name="calendar" color={colors.primary} size={26} />;
//     }
//     return <SimpleIcon name="calendar" color={color} size={26} />;
//   };

//   const getCalendarLabel = (focused: boolean, color: string) => {
//     if (focused) {
//       return (
//         <Text style={[{color: colors.primary}, styles.navbarLabel]}>
//           Календарь
//         </Text>
//       );
//     }
//     return <Text style={[{color: color}, styles.navbarLabel]}>Календарь</Text>;
//   };

//   const getProfileIcon = (focused: boolean, color: string) => {
//     if (focused) {
//       return <SimpleIcon name="menu" color={colors.primary} size={26} />;
//     }
//     return <SimpleIcon name="menu" color={color} size={26} />;
//   };

//   const getProfileLabel = (focused: boolean, color: string) => {
//     if (focused) {
//       return (
//         <Text style={[{color: colors.primary}, styles.navbarLabel]}>
//           Больше
//         </Text>
//       );
//     }
//     return <Text style={[{color: color}, styles.navbarLabel]}>Больше</Text>;
//   };

//   const getTasksIcon = (focused: boolean, color: string) => {
//     if (focused) {
//       return <SimpleIcon name="notebook" color={colors.primary} size={26} />;
//     }
//     return <SimpleIcon name="notebook" color={color} size={26} />;
//   };

//   const getTasksLabel = (focused: boolean, color: string) => {
//     if (focused) {
//       return (
//         <Text style={[{color: colors.primary}, styles.navbarLabel]}>
//           Задачи
//         </Text>
//       );
//     }
//     return <Text style={[{color: color}, styles.navbarLabel]}>Задачи</Text>;
//   };

//   const getSearchIcon = (focused: boolean, color: string) => {
//     if (focused) {
//       return <SimpleIcon name="magnifier" color={colors.primary} size={26} />;
//     }
//     return <SimpleIcon name="magnifier" color={color} size={26} />;
//   };

//   const getSearchLabel = (focused: boolean, color: string) => {
//     if (focused) {
//       return (
//         <Text style={[{color: colors.primary}, styles.navbarLabel]}>Поиск</Text>
//       );
//     }
//     return <Text style={[{color: color}, styles.navbarLabel]}>Поиск</Text>;
//   };

//   return (
//     <Tab.Navigator
//       initialRouteName="Calendar"
//       sceneContainerStyle={styles.page}
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: 60,
//           paddingBottom: 5,
//         },
//       }}>
//       <Tab.Screen
//         name="Notes"
//         component={NotesPage}
//         options={{
//           tabBarLabel: ({focused, color}) => getNoteLabel(focused, color),
//           tabBarIcon: ({focused, color}) => getNoteIcon(focused, color),
//         }}
//       />
//       <Tab.Screen
//         name="Calendar"
//         component={CalendarPage}
//         options={{
//           tabBarLabel: ({focused, color}) => getCalendarLabel(focused, color),
//           tabBarIcon: ({focused, color}) => getCalendarIcon(focused, color),
//         }}
//       />
//       <Tab.Screen
//         name="Tasks"
//         component={CalendarPage}
//         options={{
//           tabBarLabel: ({focused, color}) => getTasksLabel(focused, color),
//           tabBarIcon: ({focused, color}) => getTasksIcon(focused, color),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={CalendarPage}
//         options={{
//           tabBarLabel: ({focused, color}) => getSearchLabel(focused, color),
//           tabBarIcon: ({focused, color}) => getSearchIcon(focused, color),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingsPage}
//         options={{
//           tabBarLabel: ({focused, color}) => getProfileLabel(focused, color),
//           tabBarIcon: ({focused, color}) => getProfileIcon(focused, color),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   navbarLabel: {
//     fontSize: 12,
//   },
//   page: {
//     backgroundColor: '#ffffff',
//   },
// });
