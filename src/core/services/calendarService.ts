import {CalendarEventTaskType} from '../interfaces';
import {CalendarServiceContract} from '../contracts/calendarService.contract';
import {AsyncStorageCalendarServiceContract} from '@/infrastructure/storageLayer/services/contracts/asyncStorageCalendarService.contract';
import {CalendarStoreServiceContract} from '@/infrastructure/storeLayer/services/contracts/calendarStoreService.contract';

export class CalendarService implements CalendarServiceContract {
  constructor(
    private readonly asyncStorageCalendarService: AsyncStorageCalendarServiceContract,
    private readonly calendarStoreService: CalendarStoreServiceContract,
  ) {}

  public addCalendarEvent(event: CalendarEventTaskType) {
    this.storeAddCalendarEvent(event);
    const eventCollection = this.storeGetCalendarEventCollection();
    this.storageSetCalendarEvent(eventCollection);
  }

  public updateEvent(event: CalendarEventTaskType): void {
    const allEvents = this.storeGetCalendarEventCollection();
    const findEvent = allEvents.find(el => el.id === event.id);

    if (findEvent) {
      const changedEventCollection = allEvents.map(el =>
        el.id === event.id ? event : el,
      );
      this.storeSetCalendarEventCollection(changedEventCollection);
      this.storageSetCalendarEvent(changedEventCollection);
    }
  }

  private storeAddCalendarEvent(event: CalendarEventTaskType): void {
    this.calendarStoreService.setCalendarEvent(event);
  }

  public storeGetCalendarEventCollection(): CalendarEventTaskType[] {
    return this.calendarStoreService.getCalendarEventCollection();
  }

  private storeUpdateCalendarEvent(event: CalendarEventTaskType): void {
    this.calendarStoreService.updateCalendarEvent(event);
  }

  public storeSetCalendarEventCollection(event: CalendarEventTaskType[]): void {
    this.calendarStoreService.setCalendarEventCollection(event);
  }

  private async storageSetCalendarEvent(
    event: CalendarEventTaskType[],
  ): Promise<void> {
    await this.asyncStorageCalendarService.setCalendarEvents(event);
  }

  public async storageGetCalendarEventCollection(): Promise<
    CalendarEventTaskType[] | null
  > {
    return await this.asyncStorageCalendarService.getCollectionEvents();
  }

  public getEventById(id: string): CalendarEventTaskType | undefined {
    const response = this.storeGetCalendarEventCollection();

    return response.find(el => el.id === id);
  }

  public deleteCalendarEvent(id: string): void {
    const response = this.storeGetCalendarEventCollection();
    const filteredEvents = response.filter(el => el.id !== id);
    this.storeSetCalendarEventCollection(filteredEvents);
    this.storageSetCalendarEvent(filteredEvents);
  }
}
