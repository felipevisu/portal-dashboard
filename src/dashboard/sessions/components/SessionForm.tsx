import React from "react";
import { Dayjs } from "dayjs";
import { EditorState } from "draft-js";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";
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
  channel?: string;
};

export interface SessionFormProps {
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
  disabled: boolean;
}

export const SessionForm = ({
  errors,
  data,
  onChange,
  disabled,
}: SessionFormProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["name", "slug", "content"], errors);

  return (
    <>
      <Card>
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
              disabled={disabled}
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
              disabled={disabled}
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
    </>
  );
};

export default SessionForm;
