import React from "react";
import { useTranslation } from "react-i18next";

import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ControlledSwitch from "@portal/components/ControlledSwitch";
import {
  ConfigurationItemFragment,
  ConfigurationTypeFieldEnum,
} from "@portal/graphql";
import { getFieldError } from "@portal/utils/errors";

import { PluginDetailsPageFormData } from "./PluginsDetailsPage";

interface PluginSettingsProps {
  data: PluginDetailsPageFormData;
  errors: any[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  fields: ConfigurationItemFragment[];
}
const PluginSettings: React.FC<PluginSettingsProps> = ({
  data,
  disabled,
  errors,
  onChange,
  fields,
}) => {
  const { t } = useTranslation();
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader title={t("plugin.settings")} />
      <CardContent>
        {data.configuration.map((field) => {
          const fieldData = fields.find(
            (configField) => configField.name === field.name
          );

          return (
            <Box key={field.name}>
              {fieldData.type === ConfigurationTypeFieldEnum.BOOLEAN ? (
                <>
                  <ControlledSwitch
                    name={field.name}
                    label={fieldData.label}
                    checked={
                      typeof field.value !== "boolean"
                        ? field.value === "true"
                        : field.value
                    }
                    onChange={onChange}
                    disabled={disabled}
                  />
                  {fieldData.helpText && (
                    <Tooltip
                      title={
                        <Typography variant="body2">
                          {fieldData.helpText}
                        </Typography>
                      }
                    >
                      <InfoIcon />
                    </Tooltip>
                  )}
                </>
              ) : (
                <FormControl fullWidth sx={{ marginBottom: 3 }}>
                  <TextField
                    disabled={disabled}
                    error={!!getFieldError(errors, "name")}
                    helperText={fieldData.helpText}
                    label={fieldData.label}
                    name={field.name}
                    multiline={
                      fieldData.type === ConfigurationTypeFieldEnum.MULTILINE
                    }
                    InputProps={{
                      maxRows: 6,
                      readOnly:
                        fieldData.type === ConfigurationTypeFieldEnum.OUTPUT,
                    }}
                    onFocus={(event) => {
                      if (
                        fieldData.type === ConfigurationTypeFieldEnum.OUTPUT
                      ) {
                        event.target.select();
                      }
                    }}
                    fullWidth
                    value={field.value}
                    onChange={onChange}
                  />
                </FormControl>
              )}
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
PluginSettings.displayName = "PluginSettings";
export default PluginSettings;
