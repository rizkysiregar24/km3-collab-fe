/* eslint-disable no-underscore-dangle */
export const _today = new Date();

export const today = new Date().toISOString().split('T')[0];

export const tomorrow = new Date(_today.getTime() + 1 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

export const dayAfterTomorrow = new Date(_today.getTime() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

export const historyStartDate = localStorage.getItem('historyStartDate');

export const returnDate = localStorage.getItem('historyReturnDate');

export const isLessThanToday = (date) => {
  const history = localStorage.getItem('historyStartDate');
  const start = new Date(date).getTime();
  const end = new Date().getTime();
  if (start < end) {
    return today;
  }
  return history;
};

export const startDateFromHistory = isLessThanToday(historyStartDate);
