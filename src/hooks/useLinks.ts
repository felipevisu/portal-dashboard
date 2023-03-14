type EntryType = "vehicle" | "provider";

export const useLinks = () => {
  const homepage = () => "/";
  const categoryList = () => "/activities";
  const categoryCreate = () => "/activities/create";
  const categoryDetails = (id: string) => `/activities/details/${id}`;
  const vehicleList = () => "/vehicles";
  const providerList = () => "/providers";
  const entryList = (type: EntryType) =>
    type === "vehicle" ? "/vehicles" : "/providers";
  const entryCreate = (type: EntryType) =>
    type === "vehicle" ? "/vehicles/create" : "/providers/create";
  const entryDetails = (type: EntryType, id: string) =>
    type === "vehicle" ? `/vehicles/details/${id}` : `/providers/details/${id}`;
  const documentList = () => "/documents";
  const documentCreate = (type: EntryType, entry: string) =>
    type === "vehicle"
      ? `/vehicles/details/${entry}/documents/create`
      : `/providers/details/${entry}/documents/create`;
  const documentDetails = (type: EntryType, entry: string, id: string) =>
    type === "vehicle"
      ? `/vehicles/details/${entry}/documents/${id}/details`
      : `/providers/details/${entry}/documents/${id}/details`;

  return {
    homepage,
    categoryList,
    categoryCreate,
    categoryDetails,
    vehicleList,
    providerList,
    entryList,
    entryCreate,
    entryDetails,
    documentList,
    documentCreate,
    documentDetails,
  };
};

export default useLinks;
