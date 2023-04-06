import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import { FormProps } from "./DocumentForm";

interface DocumentOrganizationProps {
  data?: FormProps;
  errors: ErrorFragment[];
  expires: boolean;
  onChange: (e: ChangeEvent) => void;
}

export const DocumentOrganization = ({
  data,
  onChange,
  expires,
  errors,
}: DocumentOrganizationProps) => {
  const formErrors = getFormErrors(
    ["isPublished", "expires", "beginDate", "expirationDate"],
    errors
  );
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t("status")} />
      <CardContent>
        <FormControl fullWidth>
          <ControlledCheckbox
            label={t("published")}
            name="isPublished"
            checked={data.isPublished}
            onChange={onChange}
          />
          <FormHelperText>{t("helperText.isPublished")}</FormHelperText>
        </FormControl>
        {expires && (
          <>
            <FormSpacer />
            <FormControl fullWidth>
              <ControlledCheckbox
                label={t("expires")}
                name="expires"
                checked={data.expires}
                onChange={onChange}
              />
              <FormHelperText>{t("helperText.expires")}</FormHelperText>
            </FormControl>
          </>
        )}
        {data.expires && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormSpacer />
            <FormControl fullWidth>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={data.beginDate}
                label={t("initialDate")}
                onChange={(value) => {
                  onChange({
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
                  onChange({
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
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentOrganization;
