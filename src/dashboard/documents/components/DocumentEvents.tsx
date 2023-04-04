import React from "react";
import { t } from "i18next";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import { Box } from "@mui/material";
import { EventFragment } from "@portal/graphql";
import { formatDateTime } from "@portal/utils/date";

interface DocumentEventsProps {
  events: EventFragment[];
}

export const DocumentEvents = ({ events }: DocumentEventsProps) => {
  if (!events.length) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {events.map((event, index) => (
          <TimelineItem key={event.id} sx={{ minHeight: "50px" }}>
            <TimelineSeparator>
              <TimelineDot />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>{t(`events.${event.type}`)}</span>{" "}
                <span>{formatDateTime(event.date)}</span>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default DocumentEvents;
