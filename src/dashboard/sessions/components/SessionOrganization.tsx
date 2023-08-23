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
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { getFormErrors } from "@portal/utils/errors";

import { SessionFormProps } from "./SessionForm";

export const SessionOrganization = ({
  errors,
  data,
  onChange,
  disabled,
}: SessionFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["date", "channel"], errors);

  const channels = useAppChannel();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <FormControl fullWidth>
            <DateTimePicker
              label={t("date")}
              inputFormat="DD/MM/YYYY - HH:mm"
              value={data.date}
              disabled={disabled}
              onChange={(value) =>
                onChange({ target: { name: "date", value } })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formErrors.date && true}
                  helperText={formErrors.date?.message}
                />
              )}
            />
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
    </LocalizationProvider>
  );
};
