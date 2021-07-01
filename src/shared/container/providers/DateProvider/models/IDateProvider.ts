interface IDateProvider {
  diffHours(start_date: Date, end_date: Date): number;
  diffInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  now(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}

export { IDateProvider };
