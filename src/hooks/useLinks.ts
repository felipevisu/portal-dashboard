export const useLinks = () => {
  const homepage = () => "/";
  const attributeList = () => "/attributes";
  const attributeCreate = () => "/attributes/create";
  const attributeDetails = (id: string) => `/attributes/details/${id}`;
  const categoryList = () => "/activities";
  const categoryCreate = () => "/activities/create";
  const categoryDetails = (id: string) => `/activities/details/${id}`;
  const vehicleList = () => "/vehicles";
  const providerList = () => "/providers";
  const entryList = (type: string) => `/entries/${type}`;
  const entryCreate = (type: string) => `/entries/${type}/create`;
  const entryDetails = (type: string, id: string) =>
    `/entries/${type}/details/${id}`;
  const entryTypeList = () => `/entryTypes/`;
  const entryTypeCreate = () => `/entryTypes/create`;
  const entryTypeDetails = (id: string) => `/entryTypes/details/${id}`;
  const documentList = () => "/documents";
  const documentCreate = (type: string, entryId: string) =>
    `/entries/${type}/details/${entryId}/documents/create`;
  const documentDetails = (id: string) => `/documents/details/${id}`;
  const channelList = () => "/channels";
  const channelCreate = () => "/channels/create";
  const channelDetails = (id: string) => `/channels/details/${id}`;
  const investmentList = () => "/investments";
  const investmentCreate = () => "/investments/create";
  const investmentDetails = (id: string) => `/investments/details/${id}`;

  return {
    homepage,
    attributeList,
    attributeCreate,
    attributeDetails,
    categoryList,
    categoryCreate,
    categoryDetails,
    vehicleList,
    providerList,
    entryList,
    entryCreate,
    entryDetails,
    entryTypeList,
    entryTypeCreate,
    entryTypeDetails,
    documentList,
    documentCreate,
    documentDetails,
    channelList,
    channelCreate,
    channelDetails,
    investmentList,
    investmentCreate,
    investmentDetails,
  };
};

export default useLinks;
