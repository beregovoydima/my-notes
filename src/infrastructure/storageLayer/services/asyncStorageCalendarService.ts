import {CalendarEventTaskType} from '@/core/interfaces';
import {AsyncStorageRepositoryContract} from '../asyncStorageRepository/contracts';
import {AsyncStorageCalendarServiceContract} from './contracts/asyncStorageCalendarService.contract';

export class AsyncStorageCalendarService
  implements AsyncStorageCalendarServiceContract
{
  readonly #calendarEvents = 'calendarEvents';

  constructor(
    private readonly asyncStorageRepository: AsyncStorageRepositoryContract,
  ) {}

  public async setCalendarEvents(
    events: CalendarEventTaskType[],
  ): Promise<void> {
    const response = await this.asyncStorageRepository.set(
      this.#calendarEvents,
      JSON.stringify(events),
    );

    return response;
  }

  public async getCollectionEvents(): Promise<CalendarEventTaskType[] | null> {
    const response = await this.asyncStorageRepository.get(
      this.#calendarEvents,
    );
    if (response) {
      return JSON.parse(response);
    }
    return null;
  }

  public async removeAllEvents(): Promise<void> {
    return await this.asyncStorageRepository.remove(this.#calendarEvents);
  }
}
