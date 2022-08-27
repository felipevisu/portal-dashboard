import React from "react";

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
import ControledCheckbox from "@portal/components/ControledCheckbox";
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
};

interface VehicleFormProps
  extends Record<"categories", SingleAutocompleteChoiceType[]> {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const VehicleFormInfos = ({
  errors,
  data,
  onChange,
}: VehicleFormProps) => {
  const formErrors = getFormErrors(["name", "slug", "documentNumber"], errors);

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
            label="Nome"
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
            label="Atalho"
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
            label="CNPJ"
            value={data.documentNumber}
            onChange={onChange}
            helperText={formErrors.documentNumber?.message}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export const VehicleFormStatus = ({
  errors,
  data,
  categories,
  onChange,
}: VehicleFormProps) => {
  const formErrors = getFormErrors(["category", "isPublished"], errors);

  return (
    <Card>
      <CardHeader title="Visibilidade e categoria" />
      <CardContent>
        <FormControl fullWidth error={formErrors.category && true}>
          <InputLabel>Categoria</InputLabel>
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
          <ControledCheckbox
            label="Publicado"
            name="isPublished"
            checked={data.isPublished}
            onChange={onChange}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};
