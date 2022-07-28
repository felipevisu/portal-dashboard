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
  segment: string;
  isPublished: boolean;
};

interface ProviderFormProps
  extends Record<"segments", SingleAutocompleteChoiceType[]> {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: any) => void;
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

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginBottom: (theme) => theme.spacing(2) }}
    >
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
                onChange={onChange}
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
                onChange={() =>
                  onChange({
                    target: { name: "isPublished", value: !data.isPublished },
                  })
                }
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
