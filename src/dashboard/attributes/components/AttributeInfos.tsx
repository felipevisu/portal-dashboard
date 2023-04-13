import React from "react";
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
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import {
  AttributeDetailsFragment,
  AttributeInputTypeEnum,
  ErrorFragment,
} from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import { getEntityTypeList, getInputTypeList } from "../utils";

import { AttributePageFormData } from "./AttributeCreatePage";

interface AttributeInfosProps {
  data: AttributePageFormData;
  instance?: AttributeDetailsFragment;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const AttributeInfos = ({
  data,
  instance,
  errors,
  onChange,
}: AttributeInfosProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(
    ["name", "slug", "inputType", "entityType", "valueRequired"],
    errors
  );

  const inputType = data.inputType || instance.inputType;

  return (
    <Card>
      <CardHeader title={t("generalInfo")} />
      <CardContent>
        <FormControl fullWidth>
          <TextField
            error={formErrors.name && true}
            fullWidth
            type="text"
            name="name"
            label={t("attribute.fields.name")}
            value={data.name}
            onChange={onChange}
            helperText={formErrors.name?.message}
          />
          <FormHelperText>{t("helperText.name")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={formErrors.slug && true}
            fullWidth
            type="text"
            name="slug"
            label={t("attribute.fields.slug")}
            value={data.slug}
            onChange={onChange}
            helperText={formErrors.slug?.message}
          />
          <FormHelperText>{t("attribute.helpers.slug")}</FormHelperText>
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <InputLabel error={formErrors.inputType && true}>
            {t("attribute.fields.inputType")}
          </InputLabel>
          <Select
            fullWidth
            name="inputType"
            label={t("attribute.fields.inputType")}
            value={data.inputType || instance.inputType}
            onChange={onChange}
            error={formErrors.inputType && true}
            disabled={!!instance}
          >
            {getInputTypeList(t).map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={formErrors.inputType && true}>
            {formErrors.inputType?.message}
          </FormHelperText>
          <FormHelperText>{t("attribute.helpers.inputType")}</FormHelperText>
        </FormControl>
        {inputType === AttributeInputTypeEnum.REFERENCE && (
          <>
            <FormSpacer />
            <FormControl fullWidth>
              <InputLabel error={formErrors.entityType && true}>
                {t("attribute.fields.entityType")}
              </InputLabel>
              <Select
                fullWidth
                name="entityType"
                label={t("attribute.fields.entityType")}
                value={data.entityType || instance?.entityType || null}
                onChange={onChange}
                error={formErrors.entityType && true}
                disabled={!!instance}
              >
                {getEntityTypeList(t).map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={formErrors.entityType && true}>
                {formErrors.entityType?.message}
              </FormHelperText>
            </FormControl>
          </>
        )}
        <FormSpacer />
        <FormControl fullWidth>
          <ControlledCheckbox
            label={t("attribute.fields.valueRequired")}
            name="valueRequired"
            checked={data.valueRequired}
            onChange={onChange}
          />
          <FormHelperText>
            {t("attribute.helpers.valueRequired")}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
