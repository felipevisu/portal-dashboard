export const getDates = () => {
  const date = new Date();

  const today = date.toISOString().split("T")[0];

  const tomorrow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  )
    .toISOString()
    .split("T")[0];

  const nextWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7
  )
    .toISOString()
    .split("T")[0];

  return { today, tomorrow, nextWeek };
};
