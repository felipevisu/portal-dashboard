import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { getFormErrors } from "@portal/utils/errors";

import { InvestmentFormProps } from "./InvestmentForm";

export const InvestmentOrganization = ({
  errors,
  data,
  onChange,
  disabled,
}: InvestmentFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["isPublished", "channel"], errors);
  const channels = useAppChannel();

  return (
    <Card>
      <CardHeader title={t("visibility")} />
      <CardContent>
        <FormControl fullWidth error={formErrors.channel && true}>
          <InputLabel>{t("channel.title")}</InputLabel>
          <Select
            value={data.channel || ""}
            label={t("channel.title")}
            name="channel"
            onChange={onChange}
            disabled={disabled}
          >
            {channels.availableChannels.map((channel) => (
              <MenuItem key={channel.id} value={channel.id}>
                {channel.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formErrors.channel?.message}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl>
          <ControlledCheckbox
            label={t("published")}
            name="isPublished"
            checked={data.isPublished}
            onChange={onChange}
            disabled={disabled}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default InvestmentOrganization;
