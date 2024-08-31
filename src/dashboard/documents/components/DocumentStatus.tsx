import { Typography } from "@mui/material";
import { DocumentFragment } from "@portal/graphql";

const getDocumentStatus = (document: DocumentFragment) => {
  if (!document.defaultFile || !document.defaultFile.file)
    return { color: "", text: "Sem arquivo" };
  if (document.defaultFile.status === "WAITING")
    return { color: "warning.main", text: "Aguardando" };
  if (document.defaultFile.status === "REFUSED")
    return { color: "error.main", text: "Recusado" };
  if (document.expired) return { color: "red", text: "Expirado" };
  return { color: "success.main", text: "Válido" };
};

export const DocumentStatus = ({
  document,
}: {
  document: DocumentFragment;
}) => {
  const status = getDocumentStatus(document);
  return <Typography color={status.color}>{status.text}</Typography>;
};
