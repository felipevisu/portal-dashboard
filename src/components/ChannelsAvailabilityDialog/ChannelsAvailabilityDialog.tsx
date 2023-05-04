import React from "react";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Channel } from "@portal/dashboard/channels/utils";

import ActionDialog from "../ActionDialog";

import ChannelsAvailabilityContent from "./ChannelsAvailabilityDialogChannelsList";

export interface ChannelsAvailabilityDialogProps {
  isSelected: (option: Channel) => boolean;
  channels: Channel[];
  contentType?: string;
  disabled?: boolean;
  open: boolean;
  onClose: () => void;
  onChange: (option: Channel) => void;
  onConfirm: () => void;
  selected?: number;
  title: string;
  toggleAll?: (items: Channel[], selected: number) => void;
}

export const ChannelsAvailabilityDialog: React.FC<
  ChannelsAvailabilityDialogProps
> = ({
  isSelected,
  channels,
  contentType,
  disabled,
  open,
  onClose,
  onChange,
  onConfirm,
  selected,
  title,
  toggleAll,
}) => {
  const hasChannels = channels.length > 0;

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      disabled={disabled}
    >
      {hasChannels ? (
        <>
          <FormControl>
            <FormControlLabel
              label="Selecione todos"
              control={
                <Checkbox
                  indeterminate={
                    channels && channels.length > selected && selected > 0
                  }
                  checked={selected !== 0}
                  disabled={disabled}
                  onChange={() => toggleAll(channels, selected)}
                />
              }
            />
          </FormControl>
          <Divider />
          <ChannelsAvailabilityContent
            channels={channels}
            isChannelSelected={isSelected}
            onChange={onChange}
          />
        </>
      ) : (
        <div />
      )}
    </ActionDialog>
  );
};

export default ChannelsAvailabilityDialog;
