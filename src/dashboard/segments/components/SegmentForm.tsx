import { ErrorFragment } from "@portal/graphql";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormControl,
} from "@mui/material";
import { getFormErrors } from "@portal/utils/errors";
import React from "react";
import FormSpacer from "@portal/components/FormSpacer";

export type FormProps = {
  name: string;
  slug: string;
};

interface SegmentFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const SegmentForm = ({ errors, data, onChange }: SegmentFormProps) => {
  const formErrors = getFormErrors(["name", "slug"], errors);

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
      </CardContent>
    </Card>
  );
};

export default SegmentForm;
