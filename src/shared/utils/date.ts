export const formatDateToISO = (date?: Date): string | undefined => {
  if (!date) return undefined;
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};


export const isDateWithinRange = (
  selectedDate: string | undefined,
  startDate: string,
  endDate: string,
): boolean => {
  if (!selectedDate) return false;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const selected = new Date(selectedDate);

  return selected >= start && selected <= end;
};