import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  expires: boolean;
  isPublished: boolean;
};

interface DocumentFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: ({ name, value }) => void;
  fileUpload: React.ReactNode;
}

export const DocumentForm = ({
  data,
  errors,
  onChange,
  fileUpload,
}: DocumentFormProps) => {
  const formErrors = getFormErrors(["name", "slug"], errors);

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
        <Card sx={{ marginBottom: (theme) => theme.spacing(2) }}>
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
          </CardContent>
        </Card>
        {fileUpload}
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Status e publicação" />
          <CardContent>
            <FormControl sx={{ display: "block" }}>
              <FormControlLabel
                label="Publicado"
                onChange={handleChange}
                control={
                  <Checkbox name="isPublished" checked={data.isPublished} />
                }
              />
            </FormControl>
            <FormControl sx={{ display: "block" }}>
              <FormControlLabel
                label="Expirável"
                onChange={handleChange}
                control={<Checkbox name="expires" checked={data.expires} />}
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DocumentForm;
