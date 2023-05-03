import { pick, uniq } from "lodash";

import {
  EntryChannelListingUpdateMutationVariables,
  EntryDetailsFragment,
  EntryUpdateMutationVariables,
  PublishableChannelListingInput,
} from "@portal/graphql";

import { EntryUpdateData } from "../../components/EntryDetailsPage/form";

export const getEntryUpdateVariables = (
  entry: EntryDetailsFragment,
  data: EntryUpdateData
): EntryUpdateMutationVariables => {
  return {
    id: entry.id,
    input: {
      attributes: data.attributes,
      category: data.category,
      name: data.name,
      slug: data.slug,
      documentNumber: data.documentNumber,
      email: data.email,
    },
  };
};

export function inferEntryChannelsAfterUpdate(
  entry: EntryDetailsFragment,
  data: EntryUpdateData
) {
  const productChannelsIds = entry.channelListings.map(
    (listing) => listing.channel.id
  );
  const updatedChannelsIds =
    data.channels.updateChannels?.map((listing) => listing.channelId) || [];
  const removedChannelsIds = data.channels.removeChannels || [];

  return uniq([
    ...productChannelsIds.filter(
      (channelId) => !removedChannelsIds.includes(channelId)
    ),
    ...updatedChannelsIds,
  ]);
}

export function getEntryChannelsUpdateVariables(
  entry: EntryDetailsFragment,
  data: EntryUpdateData
): EntryChannelListingUpdateMutationVariables {
  const channels = inferEntryChannelsAfterUpdate(entry, data);

  const dataUpdated = new Map<string, PublishableChannelListingInput>();
  data.channels.updateChannels
    .map((listing) =>
      pick(listing, ["channelId", "isActive", "isPublished"] as Array<
        keyof PublishableChannelListingInput
      >)
    )
    .forEach((listing) => dataUpdated.set(listing.channelId, listing));

  const updateChannels = channels
    .filter((channelId) => dataUpdated.has(channelId))
    .map((channelId) => ({
      ...dataUpdated.get(channelId),
    }));

  return {
    id: entry.id,
    input: {
      ...data.channels,
      updateChannels,
    },
  };
}
