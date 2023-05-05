import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";
import { DocumentFragment, EventDetailsFragment } from "@portal/graphql";

import { DocumentList } from "./DocumentList";
import EventList from "./EventList";

interface HomepageProps {
  events: EventDetailsFragment[];
  expired: DocumentFragment[];
  closeToExpire: DocumentFragment[];
  expiredFilter: string;
  closeToExpireFilter: string;
}

export const Homepage = ({
  events,
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <DocumentList
            documents={expired}
            title={t("expired")}
            href={expiredFilter}
          />
          <DocumentList
            documents={closeToExpire}
            title={t("expiring")}
            href={closeToExpireFilter}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <EventList events={events} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
