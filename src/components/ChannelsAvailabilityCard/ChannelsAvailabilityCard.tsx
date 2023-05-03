import React from "react";

import {
  Channel as ChannelList,
  ChannelData,
} from "@portal/dashboard/channels/utils";
import { ChannelOpts } from "@portal/dashboard/entries/components/EntryDetailsPage/formChannels";
import { EntryChannelListingErrorFragment } from "@portal/graphql";
import { RequireOnlyOne } from "@portal/misc";

import ChannelAvailabilityItemContent from "./ChannelAvailabilityItemContent";
import ChannelAvailabilityItemWrapper from "./ChannelAvailabilityItemWrapper";
import ChannelsAvailabilityWrapper, {
  ChannelsAvailabilityWrapperProps,
} from "./ChannelsAvailabilityCardWrapper";

export interface ChannelsAvailability
  extends Omit<
    ChannelsAvailabilityWrapperProps,
    "children" | "selectedChannelsCount"
  > {
  channels: ChannelData[];
  channelsList: ChannelList[];
  errors?: EntryChannelListingErrorFragment[];
  disabled?: boolean;
  onChange?: (id: string, data: ChannelOpts) => void;
}

export type ChannelsAvailabilityCardProps = RequireOnlyOne<
  ChannelsAvailability,
  "channels" | "channelsList"
>;

export const ChannelsAvailabilityCard = ({
  channelsList,
  errors = [],
  allChannelsCount = 0,
  channels,
  onChange,
  openModal,
}: ChannelsAvailabilityCardProps) => {
  return (
    <ChannelsAvailabilityWrapper
      selectedChannelsCount={(channels ?? channelsList).length ?? 0}
      allChannelsCount={allChannelsCount}
      openModal={openModal}
    >
      {channels &&
        channels.map((data) => {
          const channelErrors =
            errors?.filter((error) => error.channels.includes(data.id)) || [];

          return (
            <ChannelAvailabilityItemWrapper key={data.id} data={data}>
              <ChannelAvailabilityItemContent
                data={data}
                onChange={onChange}
                errors={channelErrors}
              />
            </ChannelAvailabilityItemWrapper>
          );
        })}
    </ChannelsAvailabilityWrapper>
  );
};

export default ChannelsAvailabilityCard;
