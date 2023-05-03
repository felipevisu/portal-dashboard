import { useCallback, useRef } from "react";
import { uniq, uniqBy } from "lodash";

import {
  EntryChannelListingUpdateInput,
  EntryDetailsFragment,
  PublishableChannelListingInput,
} from "@portal/graphql";
import useStateFromProps from "@portal/hooks/useStateFromProps";

export interface ChannelOpts {
  isPublished: boolean;
  isActive: boolean;
}

const emptyListing: Omit<PublishableChannelListingInput, "channelId"> = {
  isPublished: false,
  isActive: false,
};

export const updateChannelsInput = (
  input: EntryChannelListingUpdateInput,
  data: ChannelOpts,
  id: string
) => {
  const mergeListings = (listing: PublishableChannelListingInput) => {
    if (listing.channelId === id) {
      return {
        ...listing,
        ...data,
      };
    }
    return listing;
  };
  return {
    ...input,
    updateChannels: input.updateChannels.map(mergeListings),
  };
};

export const useEntryChannelListingsForm = (entry: EntryDetailsFragment) => {
  const [channels, setChannels] =
    useStateFromProps<EntryChannelListingUpdateInput>({
      removeChannels: [],
      updateChannels:
        entry?.channelListings.map((listing) => ({
          channelId: listing.channel.id,
          ...listing,
        })) ?? [],
    });

  const touched = useRef<string[]>([]);

  const touch = (id: string) => {
    touched.current = uniq([...touched.current, id]);
  };

  const handleChannelChange = useCallback(
    (id: string, data: ChannelOpts) => {
      setChannels((input) => updateChannelsInput(input, data, id));
      touch(id);
    },
    [setChannels]
  );

  const handleChannelListUpdate = useCallback(
    ({ added, removed }) => {
      setChannels((prevData) => ({
        ...prevData,
        updateChannels: uniqBy(
          [
            ...prevData.updateChannels,
            ...added.map((id) => ({
              channelId: id,
              ...emptyListing,
            })),
          ],
          "channelId"
        ).filter(({ channelId }) => !removed.includes(channelId)),
        removeChannels: uniq([...prevData.removeChannels, ...removed]).filter(
          (id) => !added.includes(id)
        ),
      }));
      added.forEach((id) => touch(id));
    },
    [entry]
  );

  return {
    channels,
    handleChannelChange,
    handleChannelListUpdate,
    touched,
  };
};
