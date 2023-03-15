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
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  month?: number;
  year?: number;
  isPublished: boolean;
};

interface InvestmentFormProps {
  data: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const InvestmentForm = ({
  errors,
  data,
  onChange,
}: InvestmentFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["month", "year", "isPublished"], errors);

  return (
    <Card>
      <CardHeader title={t("generalInfo")} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth error={formErrors.month && true}>
              <InputLabel>Mês</InputLabel>
              <Select
                value={data.month || ""}
                label={t("month")}
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
                label={t("year")}
                value={data.year || ""}
                onChange={onChange}
                helperText={formErrors.year?.message}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormSpacer />
        <FormControl>
          <ControlledCheckbox
            label={t("published")}
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
