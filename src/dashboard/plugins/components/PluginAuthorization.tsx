import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import {
  ConfigurationItemFragment,
  ConfigurationTypeFieldEnum,
} from "@portal/graphql";

import { isSecretField } from "../utils";

interface PluginAuthorizationProps {
  fields: ConfigurationItemFragment[];
  onClear: (field: string) => void;
  onEdit: (field: string) => void;
}

const PluginAuthorization: React.FC<PluginAuthorizationProps> = (props) => {
  const { t } = useTranslation();
  const { fields, onClear, onEdit } = props;

  const secretFields = fields.filter((field) =>
    isSecretField(fields, field.name)
  );

  return (
    <Card>
      <CardHeader title={t("plugin.authorization")} />
      <CardContent>
        {secretFields.map((field, fieldIndex) => (
          <React.Fragment key={field.name}>
            <div key={field.name}>
              {field.type === ConfigurationTypeFieldEnum.SECRET ||
              field.type === ConfigurationTypeFieldEnum.SECRETMULTILINE ? (
                <div>
                  <Typography variant="body1">{field.label}</Typography>
                  {field.value !== null && (
                    <Typography>**** {field.value}</Typography>
                  )}
                </div>
              ) : (
                <Typography variant="body1">{field.label}</Typography>
              )}
              <div />
              {field.value === null ? (
                <Button onClick={() => onEdit(field.name)}>Criar</Button>
              ) : (
                <>
                  <Button onClick={() => onClear(field.name)}>Limpar</Button>
                  <Button onClick={() => onEdit(field.name)}>Editar</Button>
                </>
              )}
            </div>
            {fieldIndex !== secretFields.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

PluginAuthorization.displayName = "PluginAuthorization";
export default PluginAuthorization;
