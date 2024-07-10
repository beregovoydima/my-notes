import {CalendarEventTaskType} from '@/core/interfaces';

export interface CalendarServiceContract {
  addCalendarEvent(event: CalendarEventTaskType): void;
  updateEvent(event: CalendarEventTaskType): void;
  storageGetCalendarEventCollection(): Promise<CalendarEventTaskType[] | null>;
  storeSetCalendarEventCollection(lists: CalendarEventTaskType[]): void;
  storeGetCalendarEventCollection(): CalendarEventTaskType[];
  // storeAddCalendarEvent(event: CalendarEventTaskType): void;
  // storeUpdateCalendarEvent(list: CalendarEventTaskType): void;
  // storageSetCalendarEvent(lists: CalendarEventTaskType[]): Promise<void>;
}
