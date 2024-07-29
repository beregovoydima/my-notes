export type CalendarEventType = 'task' | 'meet';

export type CalnedarEventTimeType = 'day' | 'time';

export type CalendarEventTaskType = {
  title: string;
  startDate: string;
  endDate: string;
  dateType: CalnedarEventTimeType;
  type: CalendarEventType;
  color: string;
  info: string;
  created: Date | string;
  updated: Date | string | null;
  id: string;
  notificationIds?: string[];
};

export type CalendarEventDotType = {
  [key: string]: {
    dots?: CalendarDotsType[];
    selected?: boolean;
    selectedColor?: string;
    disableTouchEvent?: boolean;
  };
};

export type CalendarDotsType = {
  key: string;
  color: string;
  selectedDotColor: string;
};
