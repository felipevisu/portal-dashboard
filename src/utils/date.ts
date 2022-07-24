function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/") +
    " - " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

export function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  const month = date.toLocaleString("pt-BR", {
    month: "long",
  });
  return month.charAt(0).toUpperCase() + month.slice(1);
}
