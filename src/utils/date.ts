import dayjs from "dayjs";

export function formatDateTime(dateString: string) {
  return dayjs(dateString).format("DD/MM/YYYY h:mm A");
}

export function formatDate(dateString: string) {
  return dayjs(dateString).format("DD/MM/YYYY");
}

export function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  const month = date.toLocaleString("pt-BR", {
    month: "long",
  });
  return month.charAt(0).toUpperCase() + month.slice(1);
}
