import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ControledCheckbox from "@portal/components/ControledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  month: number;
  year: number;
  isPublished: boolean;
};

interface InvestmentFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: any) => void;
}

export const InvestmentForm = ({
  errors,
  data,
  onChange,
}: InvestmentFormProps) => {
  const formErrors = getFormErrors(["month", "year", "isPublished"], errors);

  return (
    <Card sx={{ marginBottom: (theme) => theme.spacing(3) }}>
      <CardHeader title="Informações gerais" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth error={formErrors.month && true}>
              <InputLabel>Mês</InputLabel>
              <Select
                value={data.month}
                label="Mês"
                name="month"
                onChange={onChange}
              >
                <MenuItem value="1">Janeiro</MenuItem>
                <MenuItem value="2">Fevereiro</MenuItem>
                <MenuItem value="3">Março</MenuItem>
                <MenuItem value="4">Abril</MenuItem>
                <MenuItem value="5">Maio</MenuItem>
                <MenuItem value="6">Junho</MenuItem>
                <MenuItem value="7">Julho</MenuItem>
                <MenuItem value="8">Agosto</MenuItem>
                <MenuItem value="9">Setembro</MenuItem>
                <MenuItem value="10">Outubro</MenuItem>
                <MenuItem value="11">Novembro</MenuItem>
                <MenuItem value="12">Dezembro</MenuItem>
              </Select>
              <FormHelperText>{formErrors.month?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                error={formErrors.year && true}
                fullWidth
                name="year"
                label="Ano"
                value={data.year}
                onChange={onChange}
                helperText={formErrors.year?.message}
              />
            </FormControl>
          </Grid>
        </Grid>
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

export default InvestmentForm;
