import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ConfigurationItemInput,
  ErrorFragment,
  PluginConfigurationExtendedFragment,
  PluginsDetailsFragment,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { ChangeEvent } from "@portal/types";

import { isSecretField } from "../utils";

import PluginAuthorization from "./PluginAuthorization";
import PluginDetailsChannelsCard from "./PluginDetailsChannelsCard";
import PluginInfo from "./PluginInfo";
import PluginSettings from "./PluginSettings";

export interface PluginDetailsPageFormData {
  active: boolean;
  configuration: ConfigurationItemInput[];
}

export interface PluginsDetailsPageProps {
  disabled: boolean;
  errors: ErrorFragment[];
  plugin?: PluginsDetailsFragment;
  onClear: (field: string) => void;
  onEdit: (field: string) => void;
  onSubmit: (data: PluginDetailsPageFormData) => SubmitPromise;
  selectedConfig?: PluginConfigurationExtendedFragment;
}

export const PluginsDetailsPage = ({
  disabled,
  errors,
  plugin,
  onClear,
  onEdit,
  onSubmit,
  selectedConfig,
}: PluginsDetailsPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialFormData: PluginDetailsPageFormData = {
    active: selectedConfig?.active,
    configuration: selectedConfig?.configuration
      ?.filter(
        (field) =>
          !isSecretField(selectedConfig?.configuration || [], field.name)
      )
      .map((field) => ({
        ...field,
        value: field.value || "",
      })),
  };

  return (
    <Form initial={initialFormData} onSubmit={onSubmit}>
      {({ data, submit, set }) => {
        const onChange = (event: ChangeEvent) => {
          const { name, value } = event.target;
          const newData = {
            active: name === "active" ? value : data.active,
            configuration: data.configuration.map((configItem) =>
              configItem.name === name
                ? {
                    ...configItem,
                    value,
                  }
                : configItem
            ),
          };

          set(newData);
        };
        return (
          <>
            <Backlink href={"/plugins"}>{t("back")}</Backlink>
            <PageHeader title={plugin.name} />
            <PluginInfo
              data={data}
              description={plugin?.description || ""}
              errors={errors}
              name={plugin?.name || ""}
              onChange={onChange}
            />
            {data.configuration && (
              <Box>
                <PluginSettings
                  data={data}
                  fields={selectedConfig?.configuration || []}
                  errors={errors}
                  disabled={disabled}
                  onChange={onChange}
                />
                {selectedConfig?.configuration.some((field) =>
                  isSecretField(selectedConfig?.configuration, field.name)
                ) && (
                  <PluginAuthorization
                    fields={selectedConfig.configuration}
                    onClear={onClear}
                    onEdit={onEdit}
                  />
                )}
              </Box>
            )}
            <Savebar
              loading={disabled}
              onCancel={() => navigate("/plugins")}
              onSubmit={submit}
            />
          </>
        );
      }}
    </Form>
  );
};

export default PluginsDetailsPage;
