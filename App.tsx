import React, {useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme, darkTheme} from './src/assets/config/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appearance, StyleSheet, View} from 'react-native';
import {TabMenu} from './src/components/navigation/TabMenu';
import {PagesType} from './src/core/interfaces';
import {NotesPage} from './src/pages/notes/NotesPage';
import {CalendarPage} from './src/pages/calendar/CalendarPage';
import {TasksPage} from './src/pages/tasks/TasksPage';
import {SearchPage} from './src/pages/search/SearchPage';
import {MorePage} from './src/pages/more/MorePage';
// type HomeScreenProps = NativeStackScreenProps<any, 'Home'>;

// const HomeScreen: React.FC<HomeScreenProps> = props => {
//   console.log(props);

//   return (
//     <SafeAreaView>
//       <Text>qweqweqwe</Text>
//     </SafeAreaView>
//   );
// };

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const [pages] = useState<{name: PagesType; component: any}[]>([
    {name: 'Notes', component: NotesPage},
    {name: 'Calendar', component: CalendarPage},
    {name: 'Tasks', component: TasksPage},
    {name: 'Search', component: SearchPage},
    {name: 'More', component: MorePage},
  ]);

  const [activePage, setActivePage] = useState<PagesType>('Notes');

  const changeActivePage = (page: PagesType) => {
    setActivePage(page);
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <View style={styles.main}>
          <Stack.Navigator>
            {pages.map(el => {
              return (
                <Stack.Screen
                  key={el.name}
                  name={el.name}
                  component={el.component}
                  options={{headerShown: false}}
                />
              );
            })}
          </Stack.Navigator>
          <TabMenu
            activePage={activePage}
            changeActivePage={changeActivePage}
          />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
