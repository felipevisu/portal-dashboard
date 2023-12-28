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

  return (
    <Card>
      <CardHeader title="Organização" />
      <CardContent>
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
