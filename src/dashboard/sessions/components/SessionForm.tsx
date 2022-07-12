import React from "react";
import { EditorState } from "draft-js";

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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormSpacer from "@portal/components/FormSpacer";
import RichTextEditor from "@portal/components/Richtext/Richtext";
import { ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

export type FormProps = {
  name: string;
  slug: string;
  content: EditorState;
  date: Date | null;
  isPublished: boolean;
};

interface SessionFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: ({ name, value }) => void;
}

export const SessionForm = ({ errors, data, onChange }: SessionFormProps) => {
  const formErrors = getFormErrors(["name", "slug", "content", "date"], errors);

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ marginBottom: (theme) => theme.spacing(3) }}>
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
          <Card>
            <CardHeader title="Conteúdo" />
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
            <CardHeader title="Status" />
            <CardContent>
              <FormControl>
                <DateTimePicker
                  label="Data"
                  inputFormat="yyyy/MM/dd - HH:mm"
                  value={data.date}
                  onChange={(value) => onChange({ name: "date", value: value })}
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
                <FormControlLabel
                  label="Publicado"
                  onChange={handleChange}
                  control={
                    <Checkbox name="isPublished" checked={data.isPublished} />
                  }
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
