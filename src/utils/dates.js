/* eslint-disable no-underscore-dangle */
export const _today = new Date();

export const today = new Date().toISOString().split('T')[0];

export const tomorrow = new Date(_today.getTime() + 1 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

export const dayAfterTomorrow = new Date(_today.getTime() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

const historySearch = JSON.parse(localStorage.getItem('historySearch'));

export const { startDate: historyDate, returnDate: historyReturnDate } = historySearch ?? {
  startDate: new Date().toISOString().substring(0, 10),
  returnDate: new Date().toISOString().substring(0, 10)
};

export const isLessThanToday = (date) => {
  const history =
    JSON.parse(localStorage.getItem('historySearch'))?.startDate ??
    new Date().toISOString().substring(0, 10);
  const start = new Date(date).getTime();
  const end = new Date().getTime();
  if (start < end) {
    return today;
  }
  return history;
};

export const startDateFromHistory = isLessThanToday(historyDate);
