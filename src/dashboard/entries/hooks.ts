export const useEntryType = () => {
  const pathname = window.location.pathname;
  return pathname.includes("vehicle") ? "vehicle" : "provider";
};
