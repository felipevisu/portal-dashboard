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
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
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
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const EntryFormInfos = ({ errors, data, onChange }: EntryFormProps) => {
  const formErrors = getFormErrors(
    ["name", "slug", "documentNumber", "email"],
    errors
  );
  const { t } = useTranslation();

  return (
    <Card sx={{ marginBottom: 2 }}>
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
          />
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
          />
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
          />
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
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export const EntryFormStatus = ({
  errors,
  data,
  categories,
  onChange,
}: EntryFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["category", "isPublished"], errors);

  return (
    <Card>
      <CardHeader title={t("visibility")} />
      <CardContent>
        <FormControl fullWidth error={formErrors.category && true}>
          <InputLabel>{t("category.title")}</InputLabel>
          <Select
            fullWidth
            name="category"
            label="Categoria"
            value={data.category}
            onChange={onChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formErrors.category?.message}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl>
          <ControlledCheckbox
            label={t("published")}
            name="isPublished"
            checked={data.isPublished}
            onChange={onChange}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};
