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

export const ProviderFormInfos = ({
  errors,
  data,
  onChange,
}: ProviderFormProps) => {
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

export const ProviderFormStatus = ({
  errors,
  data,
  segments,
  onChange,
}: ProviderFormProps) => {
  const formErrors = getFormErrors(["segment", "isPublished"], errors);

  return (
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
