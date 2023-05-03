import React from "react";
import difference from "lodash/difference";
import intersection from "lodash/intersection";
import { useTranslation } from "react-i18next";

import ChannelsAvailabilityDialog from "@portal/components/ChannelsAvailabilityDialog/ChannelsAvailabilityDialog";
import { ChannelFragment } from "@portal/graphql";
import useStateFromProps from "@portal/hooks/useStateFromProps";
import { DialogProps } from "@portal/types";
import { toggle } from "@portal/utils/lists";

import { EntryUpdateData } from "./form";

export const arrayDiff = (before: string[], after: string[]) => ({
  added: difference(after, before),
  removed: difference(before, after),
  common: intersection(before, after),
});

export type EntryChannelsListingDialogSubmit = (
  update: Record<"added" | "removed", string[]>
) => void;

export interface EntryChannelsListingsDialogProps extends DialogProps {
  channels: ChannelFragment[];
  data: Pick<EntryUpdateData, "channels">;
  onConfirm: EntryChannelsListingDialogSubmit;
}

export const EntryChannelsListingsDialog = ({
  channels,
  data,
  open,
  onClose,
  onConfirm,
}: EntryChannelsListingsDialogProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useStateFromProps(
    data.channels.updateChannels.map((listing) => listing.channelId)
  );

  const handleConfirm = () => {
    onConfirm(
      arrayDiff(
        data.channels.updateChannels.map(({ channelId }) => channelId),
        selected
      )
    );
    onClose();
  };

  const handleToggleAll = () =>
    selected.length !== channels.length
      ? setSelected(channels.map(({ id }) => id))
      : setSelected([]);

  return (
    <ChannelsAvailabilityDialog
      toggleAll={handleToggleAll}
      isSelected={({ id }) => selected.includes(id)}
      channels={channels}
      onChange={({ id }) =>
        setSelected(toggle(id, selected, (a, b) => a === b))
      }
      onClose={onClose}
      open={open}
      title={t("channel.dialog.title")}
      selected={selected.length}
      onConfirm={handleConfirm}
    />
  );
};

export default EntryChannelsListingsDialog;
