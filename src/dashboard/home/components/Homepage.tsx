import React from "react";

import { Box, Typography } from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import {
  CloseToExpireDocumentsQuery,
  ExpiredDocumentsQuery,
} from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";

import { DocumentList } from "./DocumentList";

interface HomepageProps {
  expired: ExpiredDocumentsQuery["documents"];
  closeToExpire: CloseToExpireDocumentsQuery["documents"];
}

export const Homepage = ({ expired, closeToExpire }: HomepageProps) => {
  if (!expired || !closeToExpire) return null;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} marginBottom={1}>
        Bem vindo
      </Typography>
      <Typography variant="body1" marginBottom={3}>
        Aqui estão algumas informações importantes sobre seu sistema.
      </Typography>
      <DocumentList
        documents={mapEdgesToItems(expired)}
        title="Documentos Expirados"
      />
      <FormSpacer />
      <DocumentList
        documents={mapEdgesToItems(closeToExpire)}
        title="Documentos Expirando"
      />
    </Box>
  );
};

export default Homepage;
