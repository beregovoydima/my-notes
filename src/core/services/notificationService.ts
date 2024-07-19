import {NotificationServiceContract} from '../contracts/notificationService';
import PushNotification from 'react-native-push-notification';
import {CALENDAR_CHANEL_ID} from '@/core/utils';

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
  }): void {
    PushNotification.localNotificationSchedule({
      message: info.message,
      title: info.title,
      channelId: CALENDAR_CHANEL_ID,
      date: info.date,
      id: info.id,
    });
  }

  public existCalendarChanelChanel(): void {
    PushNotification.channelExists(CALENDAR_CHANEL_ID, exist => {
      if (exist) {
        return;
      }
      this.createChanel();
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
