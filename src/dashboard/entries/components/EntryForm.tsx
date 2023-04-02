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
import FormSpacer from "@portal/components/FormSpacer";
import { EntryErrorWithAttributesFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  documentNumber: string;
  category: string;
  isPublished: boolean;
  email?: string;
  phone?: string;
  address?: string;
};

interface EntryFormProps
  extends Record<"categories", SingleAutocompleteChoiceType[]> {
  data?: FormProps;
  errors: EntryErrorWithAttributesFragment[];
  onChange: (e: ChangeEvent) => void;
  disabled: boolean;
}

export const EntryFormInfos = ({
  errors,
  data,
  onChange,
  disabled,
}: EntryFormProps) => {
  const formErrors = getFormErrors(
    ["name", "slug", "documentNumber", "email"],
    errors
  );
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title="Informações gerais" />
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
        <FormControl fullWidth>
          <TextField
            error={formErrors.documentNumber && true}
            fullWidth
            type="text"
            name="documentNumber"
            label={t("documentNumber")}
            value={data.documentNumber}
            onChange={onChange}
            helperText={formErrors.documentNumber?.message}
            disabled={disabled}
          />
          <FormHelperText>{t("helperText.documentNumber")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.email && true}
            fullWidth
            type="text"
            name="email"
            label={t("email")}
            value={data.email}
            onChange={onChange}
            helperText={formErrors.email?.message}
            disabled={disabled}
          />
          <FormHelperText>{t("helperText.email")}</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
