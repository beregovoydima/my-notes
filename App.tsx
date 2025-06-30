import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme} from './src/assets/config/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appearance, StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NoteEditPage} from './src/components/pages/notes/NoteEditPage';
import {ListEditPage} from './src/components/pages/notes/ListEditPage';
import {Provider} from 'react-redux';
import store from './src/framework/store/store';
import {NavBar} from './src/components/navigation/Navbar';
import {CalendarEvent} from './src/components/pages/calendar/CalendarEvent';
import {SnackbarProvider} from './src/components/ui/snackbar/Snackbar';
import {ModalProvider} from './src/components/context/modals/ModalProvider';
// Импорт i18n для инициализации переводов
import './src/core/i18n';
import {initI18n, isI18nReady} from './src/core/i18n';
// import moment from 'moment';
// import {ruMomentLocale} from './src/core/utils/calendar';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initI18n();
        setIsI18nReady(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Даже если i18n не инициализировался, продолжаем работу
        setIsI18nReady(true);
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
        <Text style={styles.loadingText}>Loading translations...</Text>
      </View>
    );
  }

  // try {
  //   moment.updateLocale('ru', ruMomentLocale);
  // } catch (e) {
  //   Alert.alert(e);
  // }

  return (
    <NavigationContainer>
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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
