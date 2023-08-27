import React from "react";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import {
  DocumentDetailsFragment,
  DocumentInput,
  DocumentLoadOptionsEnum,
  ErrorFragment,
} from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import { documentShoudlExpire } from "./utils";

export type FormProps = {
  name: string;
  description: string;
  expires: boolean;
  isPublished: boolean;
  expirationDate: Dayjs | null;
  beginDate: Dayjs | null;
  loadType: DocumentLoadOptionsEnum | null;
};

interface DocumentFormProps {
  instance?: DocumentDetailsFragment;
  data?: FormProps;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
  disabled: boolean;
}

export const generateSubmitData = (data: FormProps) => {
  const submit: DocumentInput = {
    name: data.name,
    description: data.description,
    expires: data.expires,
    isPublished: data.isPublished,
    expirationDate: data.expirationDate?.format("YYYY-MM-DD"),
    beginDate: data.beginDate?.format("YYYY-MM-DD"),
    loadType: data.loadType,
  };

  return submit;
};

export const DocumentForm = ({
  instance,
  data,
  errors,
  disabled,
  onChange,
}: DocumentFormProps) => {
  const formErrors = getFormErrors(
    ["name", "description", "beginDate", "expirationDate", "loadType"],
    errors
  );
  const { t } = useTranslation();

  const handleLoadTypeChange = (e: ChangeEvent) => {
    onChange(e);
    if (e.target.name === "loadType") {
      onChange({
        target: {
          name: "expires",
          value: documentShoudlExpire(e.target.value, false),
        },
      });
    }
  };

  return (
    <Card>
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
            disabled={disabled}
          />
          <FormHelperText>{t("helperText.name")}</FormHelperText>
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
            disabled={disabled}
          />
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <InputLabel error={formErrors.loadType && true}>
            {t("document.loadType.label")}
          </InputLabel>
          <Select
            fullWidth
            name="loadType"
            label={t("document.loadType.label")}
            value={data.loadType || ""}
            onChange={handleLoadTypeChange}
            error={formErrors.loadType && true}
            disabled={disabled}
          >
            <MenuItem value={DocumentLoadOptionsEnum.EMPTY}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.EMPTY}`)}
            </MenuItem>
            {Object.values(DocumentLoadOptionsEnum)
              .filter((value) => value !== DocumentLoadOptionsEnum.EMPTY)
              .map((value) => (
                <MenuItem key={value} value={value}>
                  {t(`document.loadType.${value}`)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
