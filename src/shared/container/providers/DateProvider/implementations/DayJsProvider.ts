import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../models/IDateProvider';

dayjs.extend(utc);

class DayJsProvider implements IDateProvider {
  diffHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const differenceInHours = dayjs(end_date_utc).diff(start_date_utc, 'hours');

    return differenceInHours;
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  now(): Date {
    return dayjs().toDate();
  }

  diffInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const diffDays = dayjs(end_date_utc).diff(start_date_utc, 'days');

    return diffDays;
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }
}

export { DayJsProvider };
