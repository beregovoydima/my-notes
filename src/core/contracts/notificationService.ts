import {PermissionStatus} from 'react-native-permissions';

export interface NotificationServiceContract {
  existCalendarChanel(): void;
  sendLocalNotification(info: {title: string; message: string}): void;
  sendSheduleNotification(info: {
    title: string;
    message: string;
    date: Date;
    id: string;
    eventDate?: string;
  }): void;
  requestNotificationPermission(): Promise<PermissionStatus | undefined>;
  cancelSheduleNotifications(notificationIds: string[]): void;
}
