import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import {
  ConfigurationItemFragment,
  ConfigurationItemInput,
  usePluginQuery,
  usePluginUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";
import useStateFromProps from "@portal/hooks/useStateFromProps";

import {
  PluginDetailsPageFormData,
  PluginsDetailsPage,
} from "../components/PluginsDetailsPage";
import PluginSecretFieldDialog from "../components/PluginSecretFieldDialog";
import { isSecretField } from "../utils";

import { getConfigByChannelId, isPluginGlobal } from "./utils";

export function getConfigurationInput(
  config: ConfigurationItemFragment[] | null,
  input: ConfigurationItemInput[] | null
): ConfigurationItemInput[] | null {
  if (config === null || input === null) {
    return null;
  }

  return input
    .filter((field) => !isSecretField(config, field.name))
    .map((field) => ({
      name: field.name,
      value: field.value.toString(),
    }));
}

export const PluginDetails = () => {
  const [fieldId, setFieldId] = useState<string | null>(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const clearModal = useModal();
  const fieldModal = useModal();

  const { data, loading } = usePluginQuery({
    variables: { id: id },
  });

  const plugin = data?.plugin;

  const initialSelectedChannelValue =
    plugin && !isPluginGlobal(plugin.globalConfiguration)
      ? plugin.channelConfigurations[0].channel.id
      : null;

  const [selectedChannelId, setSelectedChannelId] = useStateFromProps(
    initialSelectedChannelValue
  );

  const selectedConfig = isPluginGlobal(plugin?.globalConfiguration)
    ? plugin?.globalConfiguration
    : plugin?.channelConfigurations.find(
        getConfigByChannelId(selectedChannelId)
      );

  const [pluginUpdate, pluginUpdateOpts] = usePluginUpdateMutation({
    onCompleted: (data) => {
      if (data.pluginUpdate.errors.length === 0) {
        toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
        clearModal.closeModal();
        fieldModal.closeModal();
      }
    },
  });

  const formErrors = pluginUpdateOpts.data?.pluginUpdate.errors || [];

  const handleFieldUpdate = async (value: string) => {
    await pluginUpdate({
      variables: {
        channelId: selectedChannelId,
        id,
        input: {
          configuration: [
            {
              name: fieldId,
              value,
            },
          ],
        },
      },
    });
  };

  const handleSubmit = async (formData: PluginDetailsPageFormData) => {
    await pluginUpdate({
      variables: {
        channelId: selectedChannelId,
        id,
        input: {
          active: formData.active,
          configuration: getConfigurationInput(
            selectedConfig?.configuration,
            formData.configuration
          ),
        },
      },
    });
  };

  const handleFieldEdit = (id) => {
    setFieldId(id);
    fieldModal.openModal();
  };

  const handleFieldClear = (id) => {
    setFieldId(id);
    clearModal.openModal();
  };

  if (loading) return <CircularLoading />;

  return (
    <>
      <PluginsDetailsPage
        disabled={pluginUpdateOpts.loading}
        errors={formErrors}
        plugin={plugin}
        onClear={handleFieldClear}
        onEdit={handleFieldEdit}
        onSubmit={handleSubmit}
        selectedConfig={selectedConfig}
        setSelectedChannelId={setSelectedChannelId}
      />
      {selectedConfig && fieldId && (
        <>
          <ActionDialog
            open={clearModal.isOpen}
            title={"Authorization Field Delete"}
            onClose={clearModal.closeModal}
            onConfirm={() => handleFieldUpdate(null)}
          >
            <DialogContentText>
              The plugin may stop working after this field is cleared. Are you
              sure you want to proceed?
            </DialogContentText>
          </ActionDialog>
          <PluginSecretFieldDialog
            loading={pluginUpdateOpts.loading}
            field={selectedConfig?.configuration.find(
              (field) => field.name === fieldId
            )}
            onClose={fieldModal.closeModal}
            onConfirm={(formData) => handleFieldUpdate(formData.value)}
            open={fieldModal.isOpen}
          />
        </>
      )}
    </>
  );
};

export default PluginDetails;
