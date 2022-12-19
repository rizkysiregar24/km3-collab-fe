export const today = new Date();
export const tomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];
export const formattedToday = new Date().toISOString().split('T')[0];
