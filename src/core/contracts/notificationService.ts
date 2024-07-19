export interface NotificationServiceContract {
  existCalendarChanelChanel(): void;
  sendLocalNotification(info: {title: string; message: string}): void;
  sendSheduleNotification(info: {
    title: string;
    message: string;
    date: Date;
    id: string;
  }): void;
}
