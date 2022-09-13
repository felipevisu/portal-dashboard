import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import FormSpacer from "./FormSpacer";

type DataProps = {
  email?: string;
  phone?: string;
  address?: string;
};

interface ContactInfosFormProps<D> {
  data: D & DataProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const ContactInfosForm = <D,>({
  data,
  errors,
  onChange,
}: ContactInfosFormProps<D>) => {
  const formErrors = getFormErrors(["email", "phone", "address"], errors);

  return (
    <Card sx={{ position: "relative", zIndex: 0 }}>
      <CardHeader title="Informações de contato" />
      <CardContent>
        <FormControl fullWidth>
          <TextField
            error={formErrors.email && true}
            fullWidth
            type="text"
            name="email"
            label="Email"
            value={data.email}
            onChange={onChange}
            helperText={formErrors.email?.message}
          />
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.phone && true}
            fullWidth
            type="text"
            name="phone"
            label="Telefone"
            value={data.phone}
            onChange={onChange}
            helperText={formErrors.phone?.message}
          />
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.address && true}
            fullWidth
            type="text"
            name="address"
            label="Endereço"
            value={data.address}
            onChange={onChange}
            helperText={formErrors.address?.message}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default ContactInfosForm;
