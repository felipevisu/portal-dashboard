import React from "react";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { FormControl, FormHelperText, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

export interface FormProps {
  beginDate: Dayjs | null;
  expirationDate: Dayjs | null;
}

interface DocumentPublicUpdateFormProps {
  data: FormProps;
  change: (e) => void;
  errors: ErrorFragment[];
}

export const DocumentPublicUpdateForm = ({
  data,
  change,
  errors,
}: DocumentPublicUpdateFormProps) => {
  const formErrors = getFormErrors(["beginDate", "expirationDate"], errors);
  const { t } = useTranslation();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl fullWidth>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            value={data.beginDate}
            label={t("initialDate")}
            onChange={(value) => {
              change({
                target: {
                  name: "beginDate",
                  value: value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField {...params} error={!!formErrors.beginDate} />
            )}
          />
          <FormHelperText>{t("helperText.beginDate")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            value={data.expirationDate}
            label={t("expirationDate")}
            onChange={(value) => {
              change({
                target: {
                  name: "expirationDate",
                  value: value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!formErrors.expirationDate}
                helperText={formErrors.expirationDate?.message}
              />
            )}
          />
          <FormHelperText>{t("helperText.expirationDate")}</FormHelperText>
        </FormControl>
      </LocalizationProvider>
    </>
  );
};

export default DocumentPublicUpdateForm;
