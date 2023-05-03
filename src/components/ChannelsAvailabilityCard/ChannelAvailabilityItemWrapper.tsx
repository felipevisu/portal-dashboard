import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { ChannelData } from "@portal/dashboard/channels/utils";

export interface ChannelAvailabilityItemWrapperProps {
  data: ChannelData;
  children: React.ReactNode;
}

export const ChannelAvailabilityItemWrapper = ({
  data,
  children,
}: ChannelAvailabilityItemWrapperProps) => {
  return (
    <Accordion disableGutters elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={data.id}
        id={data.id}
        sx={{ paddingLeft: 3 }}
      >
        <Typography>{data.name}</Typography>
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default ChannelAvailabilityItemWrapper;
