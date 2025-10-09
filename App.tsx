import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme} from './src/assets/config/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appearance, StyleSheet, View, ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NoteEditPage} from './src/components/pages/notes/NoteEditPage';
import {ListEditPage} from './src/components/pages/notes/ListEditPage';
import {Provider} from 'react-redux';
import store from './src/framework/store/store';
import {NavBar} from './src/components/navigation/Navbar';
import {CalendarEvent} from './src/components/pages/calendar/CalendarEvent';
import {SnackbarProvider} from './src/components/ui/snackbar/Snackbar';
import {ModalProvider} from './src/components/context/modals/ModalProvider';
import './src/core/i18n';
import {appService} from './src/core/services';
import {initI18n} from './src/core/i18n';
const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initI18n();
        await appService.initializeApp();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Показываем загрузочный экран пока i18n не готов
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={60} color="#3F51B5" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PaperProvider theme={isDarkMode ? lightTheme : lightTheme}>
          <SnackbarProvider>
            <ModalProvider>
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
            </ModalProvider>
          </SnackbarProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default App;
