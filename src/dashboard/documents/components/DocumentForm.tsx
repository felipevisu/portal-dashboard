import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ControledCheckbox from "@portal/components/ControledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { DocumentInput, ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  description: string;
  expires: boolean;
  isPublished: boolean;
  expirationDate?: Date;
  beginDate?: Date;
};

interface DocumentFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
  fileUpload: React.ReactNode;
}

export const generateSubmitData = (data: FormProps) => {
  const submitData: DocumentInput = {
    name: data.name,
    description: data.description,
    expires: data.expires,
    isPublished: data.isPublished,
  };
  if (data.expirationDate) {
    submitData.expirationDate = data.expirationDate.toISOString().split("T")[0];
  }
  if (data.beginDate) {
    submitData.beginDate = data.beginDate.toISOString().split("T")[0];
  }
  return submitData;
};

export const DocumentForm = ({
  data,
  errors,
  onChange,
  fileUpload,
}: DocumentFormProps) => {
  const formErrors = getFormErrors(
    ["name", "description", "beginDate", "expirationDate"],
    errors
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card sx={{ marginBottom: 2 }}>
          <CardHeader title="Informações gerais" />
          <CardContent>
            <FormControl fullWidth>
              <TextField
                error={!!formErrors.name}
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
                error={!!formErrors.description}
                label="Descrição"
                name="description"
                multiline
                rows={2}
                value={data.description}
                onChange={onChange}
                helperText={formErrors.description?.message || "(Opcional)"}
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
            <FormControl fullWidth>
              <ControledCheckbox
                label="Publicado"
                name="isPublished"
                checked={data.isPublished}
                onChange={onChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <ControledCheckbox
                label="Expirável"
                name="expires"
                checked={data.expires}
                onChange={onChange}
              />
            </FormControl>
            {data.expires && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormSpacer />
                <FormControl fullWidth>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={data.beginDate}
                    label="Data de início"
                    onChange={(value) => {
                      onChange({
                        target: {
                          name: "beginDate",
                          value: value,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} error={!!formErrors.beginDate} />
                    )}
                  />
                </FormControl>
                <FormSpacer />
                <FormControl fullWidth>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={data.expirationDate}
                    label="Data de expiração"
                    onChange={(value) => {
                      onChange({
                        target: {
                          name: "expirationDate",
                          value: value,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!formErrors.expirationDate}
                        helperText={formErrors.expirationDate?.message}
                      />
                    )}
                  />
                </FormControl>
              </LocalizationProvider>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DocumentForm;
