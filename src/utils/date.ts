import dayjs from "dayjs";

export function formatDateTime(dateString: string) {
  return dayjs(dateString).format("DD/MM/YYYY h:mm A");
}

export function formatDate(dateString: string) {
  return dayjs(dateString).format("DD/MM/YYYY");
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function toMonthName(monthNumber: number) {
  return months[monthNumber - 1];
}
