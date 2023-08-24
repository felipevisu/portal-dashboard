import { DocumentLoadOptionsEnum } from "@portal/graphql";

const DOCUMENT_EXPIRATION_MAP = {
  [DocumentLoadOptionsEnum.CND]: true,
  [DocumentLoadOptionsEnum.CNDT]: true,
  [DocumentLoadOptionsEnum.CNEP]: true,
  [DocumentLoadOptionsEnum.CNPJ]: false,
  [DocumentLoadOptionsEnum.FGTS]: true,
  [DocumentLoadOptionsEnum.JUCESP]: false,
  [DocumentLoadOptionsEnum.SEFAZ_MG]: true,
  [DocumentLoadOptionsEnum.SEFAZ_SP]: true,
  [DocumentLoadOptionsEnum.TCU]: true,
};

export const documentShoudlExpire = (
  type: DocumentLoadOptionsEnum | null,
  expires: boolean
) => {
  if (type === DocumentLoadOptionsEnum.EMPTY) return expires;
  return DOCUMENT_EXPIRATION_MAP[type] || expires;
};
