import React from "react";
import { useTranslation } from "react-i18next";

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
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  month?: number;
  year?: number;
  isPublished: boolean;
  channel?: string;
};

export interface InvestmentFormProps {
  data: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
  disabled: boolean;
}

export const InvestmentForm = ({
  errors,
  data,
  onChange,
  disabled,
}: InvestmentFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["month", "year"], errors);

  return (
    <Card>
      <CardHeader title={t("generalInfo")} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth error={formErrors.month && true}>
              <InputLabel>{t("month")}</InputLabel>
              <Select
                value={data.month || ""}
                label={t("month")}
                name="month"
                onChange={onChange}
                disabled={disabled}
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
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <TextField
                error={formErrors.year && true}
                fullWidth
                name="year"
                label={t("year")}
                value={data.year || ""}
                onChange={onChange}
                helperText={formErrors.year?.message}
                disabled={disabled}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
