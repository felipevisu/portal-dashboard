import React from "react";
import { EditorState } from "draft-js";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ControledCheckbox from "@portal/components/ControledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import RichTextEditor from "@portal/components/Richtext/Richtext";
import { ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
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
  onChange: (e: ChangeEvent) => void;
}

export const SessionForm = ({ errors, data, onChange }: SessionFormProps) => {
  const formErrors = getFormErrors(["name", "slug", "content", "date"], errors);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            <CardHeader title="Visibilidade e data" />
            <CardContent>
              <FormControl>
                <DateTimePicker
                  label="Data"
                  inputFormat="dd/MM/yyyy - HH:mm"
                  value={data.date}
                  onChange={(val) =>
                    onChange({ target: { name: "date", value: val } })
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
                <ControledCheckbox
                  label="Publicado"
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
