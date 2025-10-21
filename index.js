/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App, {navigationRef} from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    // Обработка клика на уведомление
    if (notification.userInteraction) {
      const eventDate = notification.data?.eventDate;

      // Даем время на инициализацию навигации
      setTimeout(() => {
        if (navigationRef.current && eventDate) {
          navigationRef.current.navigate('Main', {
            screen: 'Calendar',
            params: {selectedDate: eventDate},
          });
        }
      }, 500);
    }

    // Обязательно вызываем finish для iOS
    if (notification.finish) {
      notification.finish('UIBackgroundFetchResultNoData');
    }
  },

  requestPermissions: Platform.OS === 'ios',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
});

AppRegistry.registerComponent(appName, () => App);
