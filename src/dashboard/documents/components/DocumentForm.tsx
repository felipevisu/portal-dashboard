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
  DocumentInput,
  DocumentLoadOptionsEnum,
  ErrorFragment,
} from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

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
            onChange={onChange}
            error={formErrors.loadType && true}
            disabled={disabled}
          >
            <MenuItem value={DocumentLoadOptionsEnum.EMPTY}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.EMPTY}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.CND}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.CND}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.CNDT}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.CNDT}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.CNEP}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.CNEP}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.FGTS}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.FGTS}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.SEFAZ_MG}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.SEFAZ_MG}`)}
            </MenuItem>
            <MenuItem value={DocumentLoadOptionsEnum.SEFAZ_SP}>
              {t(`document.loadType.${DocumentLoadOptionsEnum.SEFAZ_SP}`)}
            </MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
