import React from "react";

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
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader title="Plugin Information and Status" />
      <CardContent>
        <Typography variant="h6">Plugin Name</Typography>
        <Typography>{name}</Typography>
        {description && <Typography>{description}</Typography>}
        <FormSpacer />
        <Typography>Status</Typography>
        <ControlledCheckbox
          name={"active" as keyof PluginDetailsPageFormData}
          label="Set plugin as active"
          checked={data.active}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
PluginInfo.displayName = "PluginInfo";
export default PluginInfo;
