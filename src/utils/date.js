export const getHoursMinutesFromMinutes = minutes => {
  const dateString = new Date(minutes * 60 * 1000)
    .toISOString()
    .substring(11, 19);
  return dateString.substring(0, 1) === '0'
    ? dateString.substring(1)
    : dateString;
};
