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
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  isActive: boolean;
};

interface ChannelFormProps {
  disabled: boolean;
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const ChannelForm = ({
  errors,
  data,
  disabled,
  onChange,
}: ChannelFormProps) => {
  const formErrors = getFormErrors(["name", "slug", "isActive"], errors);
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t("generalInfo")} />
      <CardContent>
        <FormControl fullWidth>
          <TextField
            error={formErrors.name && true}
            fullWidth
            type="text"
            name="name"
            label={t("name")}
            value={data.name}
            onChange={onChange}
            helperText={formErrors.name?.message}
            disabled={disabled}
          />
          <FormHelperText>{t("helperText.name")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.slug && true}
            fullWidth
            type="text"
            name="slug"
            label={t("slug")}
            value={data.slug}
            onChange={onChange}
            helperText={formErrors.slug?.message}
            disabled={disabled}
          />
          <FormHelperText>{t("helperText.slug")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl>
          <ControlledCheckbox
            label={t("published")}
            name="isActive"
            checked={data.isActive}
            onChange={onChange}
            disabled={disabled}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ChannelForm;
