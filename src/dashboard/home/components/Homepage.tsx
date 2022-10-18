import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { DocumentsQuery } from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";

import { DocumentList } from "./DocumentList";

interface HomepageProps {
  expired: DocumentsQuery["documents"];
  closeToExpire: DocumentsQuery["documents"];
  expiredFilter: string;
  closeToExpireFilter: string;
}

export const Homepage = ({
  expired,
  closeToExpire,
  expiredFilter,
  closeToExpireFilter,
}: HomepageProps) => {
  if (!expired || !closeToExpire) return null;

  const { t } = useTranslation("translation", { keyPrefix: "dashboard.home" });

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} marginBottom={1}>
        {t("title")}
      </Typography>
      <Typography variant="body1" marginBottom={3}>
        {t("message")}
      </Typography>
      <DocumentList
        documents={mapEdgesToItems(expired)}
        title={t("expired")}
        href={expiredFilter}
      />
      <FormSpacer />
      <DocumentList
        documents={mapEdgesToItems(closeToExpire)}
        title={t("expiring")}
        href={closeToExpireFilter}
      />
    </Box>
  );
};

export default Homepage;
