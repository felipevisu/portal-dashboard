import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment } from "@portal/graphql";

import { PluginDetailsPageFormData } from "./PluginsDetailsPage";

interface PluginInfoProps {
  data: PluginDetailsPageFormData;
  description: string;
  errors: ErrorFragment[];
  name: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const PluginInfo: React.FC<PluginInfoProps> = ({
  data,
  description,
  errors,
  name,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader title={t("plugin.info")} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        {description && <Typography>{description}</Typography>}
        <FormSpacer />
        <Typography>{t("status")}</Typography>
        <ControlledCheckbox
          name={"active" as keyof PluginDetailsPageFormData}
          label={t("plugin.setActive")}
          checked={data.active}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
PluginInfo.displayName = "PluginInfo";
export default PluginInfo;
