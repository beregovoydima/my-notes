import {StoreRepositoryContract} from '@/infrastructure/storeLayer/repository/contracts';
import {CalendarEventTaskType} from '@/core/interfaces';
import {CalendarStoreServiceContract} from './contracts/calendarStoreService.contract';

export class CalendarStoreService implements CalendarStoreServiceContract {
  constructor(private readonly storeRepository: StoreRepositoryContract) {}

  public setCalendarEvent(event: CalendarEventTaskType): void {
    this.storeRepository.set('calendarEvents', 'setCalendarEvent', event);
  }

  public getCalendarEventCollection(): CalendarEventTaskType[] {
    return this.storeRepository.get('calendarEvents', 'events');
  }

  public setCalendarEventCollection(event: CalendarEventTaskType[]): void {
    this.storeRepository.set(
      'calendarEvents',
      'setCalendarEventsCollection',
      event,
    );
  }

  public updateCalendarEvent(event: CalendarEventTaskType): void {
    this.storeRepository.set('calendarEvents', 'updateCalendarEvent', event);
  }
}
