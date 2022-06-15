import { ErrorFragment } from "@portal/graphql";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { getFormErrors } from "@portal/utils/errors";
import React from "react";
import FormSpacer from "@portal/components/FormSpacer";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

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
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const VehicleForm = ({
  errors,
  data,
  categories,
  onChange,
}: VehicleFormProps) => {
  const formErrors = getFormErrors(
    ["name", "slug", "documentNumber", "category", "isPublished"],
    errors
  );

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
        <FormSpacer />
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
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
