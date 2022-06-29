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
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getFormErrors } from "@portal/utils/errors";
import React from "react";
import FormSpacer from "@portal/components/FormSpacer";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export type FormProps = {
  name: string;
  slug: string;
  documentNumber: string;
  segment: string;
  isPublished: boolean;
};

interface ProviderFormProps
  extends Record<"segments", SingleAutocompleteChoiceType[]> {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: ({ name, value }) => void;
}

export const ProviderForm = ({
  errors,
  data,
  segments,
  onChange,
}: ProviderFormProps) => {
  const formErrors = getFormErrors(
    ["name", "slug", "documentNumber", "segment", "isPublished"],
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
            <FormControl fullWidth error={formErrors.segment && true}>
              <InputLabel>Segmento</InputLabel>
              <Select
                fullWidth
                name="segment"
                label="Segmento"
                value={data.segment}
                onChange={handleChange}
              >
                {segments.map((segment) => (
                  <MenuItem key={segment.value} value={segment.value}>
                    {segment.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.segment?.message}</FormHelperText>
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

export default ProviderForm;
