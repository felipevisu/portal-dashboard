export const useEntryType = () => {
  const pathname = window.location.pathname;
  return pathname.includes("vehicles") ? "vehicle" : "provider";
};

export default useEntryType;
