import {CalendarEventTaskType} from '@/core/interfaces';

export interface CalendarStoreServiceContract {
  setCalendarEvent(events: CalendarEventTaskType): void;
  getCalendarEventCollection(): CalendarEventTaskType[];
  setCalendarEventCollection(events: CalendarEventTaskType[]): void;
  updateCalendarEvent(event: CalendarEventTaskType): void;
}
