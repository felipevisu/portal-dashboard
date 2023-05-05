import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Card, CardHeader, Divider, Typography } from "@mui/material";
import { EventDetailsFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { formatDateTime } from "@portal/utils/date";

interface EventListProps {
  events: EventDetailsFragment[];
}

export const EventList = ({ events }: EventListProps) => {
  const { t } = useTranslation();
  const { documentDetails } = useLinks();

  return (
    <Card sx={{ paddingBottom: 2 }}>
      <CardHeader title="Últimos eventos" />
      {events.map((event) => (
        <Box
          key={event.id}
          sx={{
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          <Typography>{t(`events.${event.type}`)}</Typography>
          <Link to={documentDetails(event.document.id)}>
            <Typography
              fontSize="small"
              sx={{
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {event.document.entry.name} / {event.document.name}
            </Typography>
          </Link>
          <Typography fontSize="small">{event.user.email}</Typography>
          <Typography fontSize="small">{formatDateTime(event.date)}</Typography>
        </Box>
      ))}
    </Card>
  );
};

export default EventList;
