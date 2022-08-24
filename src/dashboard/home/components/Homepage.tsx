import React from "react";

import { Box, Typography } from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import {
  CloseToExpireDocumentsQuery,
  ExpiredDocumentsQuery,
} from "@portal/graphql";
import { Paginator } from "@portal/types";
import { mapEdgesToItems } from "@portal/utils/maps";

import { DocumentList } from "./DocumentList";

interface HomepageProps {
  expired: ExpiredDocumentsQuery["documents"];
  closeToExpire: CloseToExpireDocumentsQuery["documents"];
  expiredPaginator: Paginator;
  closeToExpirePaginator: Paginator;
}

export const Homepage = ({
  expired,
  closeToExpire,
  expiredPaginator,
  closeToExpirePaginator,
}: HomepageProps) => {
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
        pageInfo={expired.pageInfo}
        paginator={expiredPaginator}
      />
      <FormSpacer />
      <DocumentList
        documents={mapEdgesToItems(closeToExpire)}
        title="Documentos Expirando"
        pageInfo={expired.pageInfo}
        paginator={closeToExpirePaginator}
      />
    </Box>
  );
};

export default Homepage;
