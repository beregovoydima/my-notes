import {NotificationServiceContract} from '../contracts/notificationService';
import PushNotification from 'react-native-push-notification';
import {CALENDAR_CHANEL_ID} from '@/core/utils';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export class NotificationService implements NotificationServiceContract {
  constructor() {}

  public sendLocalNotification(info: {title: string; message: string}) {
    PushNotification.localNotification({
      message: info.message,
      title: info.title,
      channelId: CALENDAR_CHANEL_ID,
    });
  }

  public sendSheduleNotification(info: {
    title: string;
    message: string;
    date: Date;
    id: string;
    eventDate?: string;
  }): void {
    const {message, title, date, id, eventDate} = info;

    PushNotification.localNotificationSchedule({
      message: message,
      title: title,
      channelId: CALENDAR_CHANEL_ID,
      date: date,
      id: id,
      userInfo: {eventDate: eventDate || date.toISOString().split('T')[0]},
    });
  }

  public existCalendarChanel(): void {
    PushNotification.channelExists(CALENDAR_CHANEL_ID, exist => {
      if (exist) {
        return;
      }
      this.createChanel();
    });
  }

  public async requestNotificationPermission() {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

      return result;
    }
  }

  public cancelSheduleNotifications(notificationIds: string[]): void {
    notificationIds.forEach(el => {
      PushNotification.cancelLocalNotification(el);
    });
  }

  private createChanel(): void {
    PushNotification.createChannel(
      {
        channelId: CALENDAR_CHANEL_ID,
        channelName: 'Calendars Notification',
        channelDescription: 'Получайте уведомления о запланированых событиях',
        importance: 4,
        vibrate: true,
      },
      chanel => {
        console.log('chanel created' + ' ' + chanel);
      },
    );
  }
}
