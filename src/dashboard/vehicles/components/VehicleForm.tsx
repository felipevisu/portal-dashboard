import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
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
  onChange: ({ name, value }) => void;
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

  const handleChange = (e: React.ChangeEvent<any>) => {
    switch (e.target.type) {
      case "checkbox":
        onChange({ name: e.target.name, value: e.target.checked });
        break;
      default:
        onChange({ name: e.target.name, value: e.target.value });
        break;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                helperText={formErrors.documentNumber?.message}
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Associação" />
          <CardContent>
            <FormControl fullWidth error={formErrors.category && true}>
              <InputLabel>Categoria</InputLabel>
              <Select
                fullWidth
                name="category"
                label="Categoria"
                value={data.category}
                onChange={handleChange}
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
              <FormControlLabel
                label="Publicado"
                onChange={handleChange}
                control={
                  <Checkbox name="isPublished" checked={data.isPublished} />
                }
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VehicleForm;
