import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
};

interface CategoryFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const CategoryForm = ({ errors, data, onChange }: CategoryFormProps) => {
  const formErrors = getFormErrors(["name", "slug"], errors);
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
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
