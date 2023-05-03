import React from "react";

import { Divider, FormControl } from "@mui/material";
import { Channel } from "@portal/dashboard/channels/utils";

import ControlledCheckbox from "../ControlledCheckbox";

export interface ChannelsAvailabilityContentProps {
  isChannelSelected: (channel: Channel) => boolean;
  channels: Channel[];
  onChange: (option: Channel) => void;
}

export const ChannelsAvailabilityContent: React.FC<
  ChannelsAvailabilityContentProps
> = ({ isChannelSelected, channels, onChange }) => {
  return (
    <>
      {channels.map((option) => (
        <FormControl fullWidth key={option.id} data-test-id="channel-row">
          <ControlledCheckbox
            checked={isChannelSelected(option)}
            name={option.name}
            label={option.name}
            onChange={() => onChange(option)}
          />
        </FormControl>
      ))}
    </>
  );
};

export default ChannelsAvailabilityContent;
