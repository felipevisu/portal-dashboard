import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import {
  AttributeCreateInput,
  AttributeDetailsFragment,
  AttributeTypeEnum,
  ErrorFragment,
} from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import { getEntryTypeList, mapEntryType, mapType } from "../utils";

interface AttributeOrganizationProps {
  data: AttributeCreateInput;
  instance?: AttributeDetailsFragment;
  errors: ErrorFragment[];
  onChange: (e: ChangeEvent) => void;
}

export const AttributeOrganization = ({
  data,
  instance,
  errors,
  onChange,
}: AttributeOrganizationProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["type", "entryType"], errors);

  return (
    <Card>
      <CardHeader title="Organização" />
      <CardContent>
        {instance && (
          <>
            {instance.type !== AttributeTypeEnum.ENTRY && (
              <Typography>
                {t("attribute.fields.type")}: {mapType(t)[instance.type]}
              </Typography>
            )}
            {instance.type === AttributeTypeEnum.ENTRY && (
              <Typography>
                {t("attribute.fields.entryType")}:{" "}
                {mapEntryType(t)[instance.entryType]}
              </Typography>
            )}
          </>
        )}
        {!instance && (
          <FormControl>
            <FormLabel>{t("attribute.fields.type")}</FormLabel>
            <RadioGroup value={data.type} name="type" onChange={onChange}>
              <FormControlLabel
                value={AttributeTypeEnum.ENTRY}
                control={<Radio />}
                label={t("attribute.enums.type.entry")}
              />
              <FormControlLabel
                value={AttributeTypeEnum.DOCUMENT}
                control={<Radio />}
                label={t("attribute.enums.type.document")}
              />
            </RadioGroup>
          </FormControl>
        )}
        {!instance && data.type === AttributeTypeEnum.ENTRY && (
          <>
            <FormSpacer />
            <FormControl fullWidth>
              <InputLabel error={formErrors.entryType && true}>
                {t("attribute.fields.entryType")}
              </InputLabel>
              <Select
                fullWidth
                name="entryType"
                label={t("attribute.fields.entryType")}
                value={data.entryType}
                onChange={onChange}
                error={formErrors.entryType && true}
              >
                {getEntryTypeList(t).map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={formErrors.entryType && true}>
                {formErrors.entryType?.message}
              </FormHelperText>
            </FormControl>
          </>
        )}
        <FormSpacer />
        <FormControl fullWidth>
          <ControlledCheckbox
            label={t("attribute.fields.visibleInWebsite")}
            name="visibleInWebsite"
            checked={data.visibleInWebsite}
            onChange={onChange}
          />
          <FormHelperText>
            {t("attribute.helpers.visibleInWebsite")}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default AttributeOrganization;
