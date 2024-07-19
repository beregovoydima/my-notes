import React, {useEffect} from 'react';
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
import {CalendarEvent} from './src/components/pages/calendar/CalendarEvent';
import {SnackbarProvider} from './src/components/ui/snackbar/Snackbar'; // путь к вашему контексту
import {notificationService} from './src/core/services';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  useEffect(() => {
    notificationService.existCalendarChanelChanel();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={isDarkMode ? lightTheme : lightTheme}>
          <SnackbarProvider>
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
                <Stack.Screen
                  name="CalendarEvent"
                  component={CalendarEvent}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </GestureHandlerRootView>
          </SnackbarProvider>
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
