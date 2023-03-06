import React from "react";
import { Dayjs } from "dayjs";
import { EditorState } from "draft-js";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import RichTextEditor from "@portal/components/Richtext/Richtext";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  content: EditorState;
  date: Dayjs | null;
  isPublished: boolean;
};

interface SessionFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const SessionForm = ({ errors, data, onChange }: SessionFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["name", "slug", "content", "date"], errors);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  label={t("name")}
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
                  label={t("slug")}
                  value={data.slug}
                  onChange={onChange}
                  helperText={formErrors.slug?.message}
                />
              </FormControl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title={t("content")} />
            <CardContent>
              <RichTextEditor
                name="content"
                editorState={data.content}
                onChange={onChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title={t("visibility")} />
            <CardContent>
              <FormControl fullWidth>
                <DateTimePicker
                  label={t("date")}
                  inputFormat="DD/MM/YYYY - HH:mm"
                  value={data.date}
                  onChange={(value) =>
                    onChange({ target: { name: "date", value } })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formErrors.date && true}
                      helperText={formErrors.date?.message}
                    />
                  )}
                />
              </FormControl>
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
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SessionForm;
