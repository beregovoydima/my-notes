import {CalendarEventTaskType} from '@/core/interfaces';

export interface AsyncStorageCalendarServiceContract {
  setCalendarEvents(events: CalendarEventTaskType[]): Promise<void>;
  getCollectionEvents(): Promise<CalendarEventTaskType[] | null>;
  removeAllEvents(): Promise<void>;
}
