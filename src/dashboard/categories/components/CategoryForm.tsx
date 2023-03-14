import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { EntryTypeEnum, ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  type: EntryTypeEnum | null;
};

interface CategoryFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const CategoryForm = ({ errors, data, onChange }: CategoryFormProps) => {
  const formErrors = getFormErrors(["name", "slug", "type"], errors);
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
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
              />
              <FormHelperText>{t("helperText.slug")}</FormHelperText>
            </FormControl>
            <FormSpacer />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Classificação" />
          <CardContent>
            <FormControl fullWidth>
              <InputLabel error={formErrors.type && true}>
                {t("type")}
              </InputLabel>
              <Select
                fullWidth
                name="type"
                label={t("type")}
                value={data.type}
                onChange={onChange}
                error={formErrors.type && true}
              >
                {[
                  { value: "VEHICLE", label: t("vehicle.title") },
                  { value: "PROVIDER", label: t("provider.title") },
                ].map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={formErrors.type && true}>
                {formErrors.type?.message}
              </FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CategoryForm;
