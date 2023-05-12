import { splitDateTime } from "@portal/misc";

export const getDateFilterValue = (dateTime: string) => {
  const { date } = splitDateTime(dateTime);
  return date;
};
