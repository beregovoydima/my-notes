import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme} from './src/assets/config/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appearance, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NoteEditPage} from './src/components/pages/notes/NoteEditPage';
import {ListEditPage} from './src/components/pages/notes/ListEditPage';
import {Provider} from 'react-redux';
import store from './src/framework/store/store';
import {NavBar} from './src/components/navigation/Navbar';

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

  // const [pages] = useState<{name: PagesType; component: any}[]>([
  //   {name: 'Notes', component: NotesPage},
  //   {name: 'Calendar', component: CalendarPage},
  //   {name: 'Tasks', component: TasksPage},
  //   {name: 'Search', component: SearchPage},
  //   {name: 'More', component: MorePage},
  // ]);

  // const [activePage, setActivePage] = useState<PagesType>('Notes');

  // const changeActivePage = (page: PagesType) => {
  //   setActivePage(page);
  // };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={isDarkMode ? lightTheme : lightTheme}>
          <GestureHandlerRootView style={styles.main}>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={NavBar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NoteEdit"
                component={NoteEditPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ListEdit"
                component={ListEditPage}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
            {/* <TabMenu
              activePage={activePage}
              changeActivePage={changeActivePage}
            /> */}
          </GestureHandlerRootView>
        </PaperProvider>
      </Provider>
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
