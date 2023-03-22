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
  Typography,
} from "@mui/material";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import {
  AttributeCreateInput,
  AttributeDetailsFragment,
  ErrorFragment,
} from "@portal/graphql";
import { ChangeEvent } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

import { getTypeList, mapType } from "../utils";

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
  const formErrors = getFormErrors(["type"], errors);

  return (
    <Card>
      <CardHeader title="Organização" />
      <CardContent>
        {instance && (
          <>
            <Typography>
              {t("attribute.fields.type")}: {mapType(t)[instance.type]}
            </Typography>
          </>
        )}
        {!instance && (
          <>
            <FormSpacer />
            <FormControl fullWidth>
              <InputLabel error={formErrors.type && true}>
                {t("attribute.fields.type")}
              </InputLabel>
              <Select
                fullWidth
                name="type"
                label={t("attribute.fields.type")}
                value={data.type}
                onChange={onChange}
                error={formErrors.type && true}
              >
                {getTypeList(t).map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={formErrors.type && true}>
                {formErrors.type?.message}
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
