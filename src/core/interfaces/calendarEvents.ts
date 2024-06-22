export type CalendarEventType = 'task' | 'meet';

export type CalnedarEventTimeType = 'day' | 'time';

export type CalendarTaskType = {
  title: string;
  startDate: string;
  endDate: string;
  dateType: CalnedarEventTimeType;
  type: CalendarEventType;
  color: string;
  info: string;
  id: string;
};
