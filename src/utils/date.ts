import moment from 'moment';

export const getUnixTimestamp = (digits: number = 10): number => {
  return Math.floor(Date.now() / Math.pow(10, 13 - digits));
}

export const formatDate = (date: moment.MomentInput = undefined, format: string = 'YYYY-MM-DD'): string => {
  return moment(date).format(format);
}

export const addDays = (date: moment.MomentInput = undefined, days: number = 0): string => {
  return moment(date).add(days, 'days').format('YYYY-MM-DD');
}

export const getLastDayOfMonth = (date: moment.MomentInput = undefined): string => {
  return moment(date).endOf('month').format('YYYY-MM-DD');
}

export const getFirstDayOfMonth = (date: moment.MomentInput = undefined): string => {
  return moment(date).startOf('month').format('YYYY-MM-DD');
}

export const formatTimeFromMinutes = (minutes: number): string => {
  return moment.utc(minutes * 60000).format('HH:mm');
}

export const getDaysBetweenDates = (startDate: moment.MomentInput, endDate: moment.MomentInput): number => {
  return moment(endDate).diff(moment(startDate), 'days');
}

export const isDateBetween = (date: moment.MomentInput, startDate: moment.MomentInput, endDate: moment.MomentInput): boolean => {
  return moment(date).isBetween(startDate, endDate, null, '[]');
}
