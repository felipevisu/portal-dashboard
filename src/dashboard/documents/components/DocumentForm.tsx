import React from "react";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@portal/components/Button";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { DocumentInput, ErrorFragment, EventFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import DocumentEvents from "./DocumentEvents";

export type FormProps = {
  name: string;
  description: string;
  expires: boolean;
  isPublished: boolean;
  expirationDate: Dayjs | null;
  beginDate: Dayjs | null;
};

interface DocumentFormProps {
  data?: FormProps;
  expires: boolean;
  errors: ErrorFragment[];
  fileUpload: React.ReactNode;
  fileHistory?: React.ReactNode;
  documentEvents?: React.ReactNode;
  onChange: (e: ChangeEvent) => void;
  onRequest?: () => void;
}

export const generateSubmitData = (data: FormProps) => {
  const submit: DocumentInput = {
    name: data.name,
    description: data.description,
    expires: data.expires,
    isPublished: data.isPublished,
    expirationDate: data.expirationDate?.format("YYYY-MM-DD"),
    beginDate: data.beginDate?.format("YYYY-MM-DD"),
  };

  return submit;
};

export const DocumentForm = ({
  data,
  expires,
  errors,
  onChange,
  fileUpload,
  fileHistory,
  documentEvents,
  onRequest,
}: DocumentFormProps) => {
  const formErrors = getFormErrors(
    ["name", "description", "beginDate", "expirationDate"],
    errors
  );
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card sx={{ marginBottom: 2 }}>
          <CardHeader title={t("generalInfo")} />
          <CardContent>
            <FormControl fullWidth>
              <TextField
                error={!!formErrors.name}
                fullWidth
                type="text"
                name="name"
                label={t("name")}
                value={data.name}
                onChange={onChange}
                helperText={formErrors.name?.message}
              />
            </FormControl>
            <FormSpacer />
            <FormControl fullWidth>
              <TextField
                error={!!formErrors.description}
                label={t("description")}
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
        {fileHistory}
        {documentEvents}
      </Grid>
      <Grid item xs={4}>
        {onRequest && (
          <Card sx={{ marginBottom: 2 }}>
            <CardHeader title={t("document.requestCard.title")} />
            <CardContent>
              <Typography>{t("document.requestCard.description")}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={onRequest} variant="contained" fullWidth>
                {t("document.requestCard.button")}
              </Button>
            </CardActions>
          </Card>
        )}
        <Card>
          <CardHeader title="Status e publicação" />
          <CardContent>
            <FormControl fullWidth>
              <ControlledCheckbox
                label={t("published")}
                name="isPublished"
                checked={data.isPublished}
                onChange={onChange}
              />
            </FormControl>
            {expires && (
              <FormControl fullWidth>
                <ControlledCheckbox
                  label={t("expires")}
                  name="expires"
                  checked={data.expires}
                  onChange={onChange}
                />
              </FormControl>
            )}
            {data.expires && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormSpacer />
                <FormControl fullWidth>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    value={data.beginDate}
                    label={t("initialDate")}
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
                    inputFormat="DD/MM/YYYY"
                    value={data.expirationDate}
                    label={t("expirationDate")}
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
