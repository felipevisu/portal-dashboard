import React from "react";

import { Box, FormControl } from "@mui/material";
import { ChannelData } from "@portal/dashboard/channels/utils";
import { ChannelOpts } from "@portal/dashboard/entries/components/EntryDetailsPage/formChannels";
import { EntryChannelListingErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

import ControlledCheckbox from "../ControlledCheckbox";
import FormSpacer from "../FormSpacer";

export interface ChannelAvailabilityItemContentProps {
  disabled?: boolean;
  data: ChannelData;
  errors: EntryChannelListingErrorFragment[];
  onChange: (id: string, data: ChannelOpts) => void;
}

export const ChannelAvailabilityItemContent = ({
  data,
  disabled,
  errors,
  onChange,
}: ChannelAvailabilityItemContentProps) => {
  const formData = { isPublished: data.isPublished, isActive: data.isActive };
  const formErrors = getFormErrors(["isActive", "isPublished"], errors);

  return (
    <Box sx={{ paddingLeft: 3, paddingBottom: 1 }}>
      <FormControl>
        <ControlledCheckbox
          label="Publicado"
          name="isPublished"
          checked={data.isPublished}
          onChange={(e) =>
            onChange(data.id, {
              ...formData,
              isPublished: !data.isPublished,
            })
          }
        />
      </FormControl>
      <div />
      <FormControl>
        <ControlledCheckbox
          label="Ativo"
          name="isActive"
          checked={data.isActive}
          onChange={(e) =>
            onChange(data.id, {
              ...formData,
              isActive: !data.isActive,
            })
          }
        />
      </FormControl>
    </Box>
  );
};

export default ChannelAvailabilityItemContent;
