export const useLinks = () => {
  const homepage = () => "/";
  const categoryList = () => "/activities";
  const categoryCreate = () => "/activities/create";
  const categoryDetails = (id: string) => `/activities/details/${id}`;
  const vehicleList = () => "/vehicles";
  const providerList = () => "/providers";
  const entryList = (type: string) => `/entries/${type}`;
  const entryCreate = (type: string) => `/entries/${type}/create`;
  const entryDetails = (type: string, id: string) =>
    `/entries/${type}/details/${id}`;
  const documentList = () => "/documents";
  const documentCreate = (type: string, entryId: string) =>
    `/entries/${type}/details/${entryId}/documents/create`;
  const documentDetails = (type: string, entryId: string, id: string) =>
    `/entries/${type}/details/${entryId}/documents/${id}/details`;

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