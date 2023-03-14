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
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import FormSpacer from "./FormSpacer";

type DataProps = {
  email?: string;
  phone?: string;
  address?: string;
};

interface ContactInfosFormProps<D> {
  data: D & DataProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const ContactInfosForm = <D,>({
  data,
  errors,
  onChange,
}: ContactInfosFormProps<D>) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["phone", "address"], errors);

  return (
    <Card sx={{ position: "relative", zIndex: 0 }}>
      <CardHeader title={t("contactInfo")} />
      <CardContent>
        <FormControl fullWidth>
          <TextField
            error={formErrors.phone && true}
            fullWidth
            type="text"
            name="phone"
            label={t("phone")}
            value={data.phone}
            onChange={onChange}
            helperText={formErrors.phone?.message}
          />
          <FormHelperText>{t("helperText.optional")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.address && true}
            fullWidth
            type="text"
            name="address"
            label={t("address")}
            value={data.address}
            onChange={onChange}
            helperText={formErrors.address?.message}
          />
          <FormHelperText>{t("helperText.optional")}</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ContactInfosForm;
