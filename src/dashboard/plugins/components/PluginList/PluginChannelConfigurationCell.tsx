import React from "react";
import { useTranslation } from "react-i18next";

import { TableCell } from "@mui/material";
import { PluginBaseFragment } from "@portal/graphql";

import { isPluginGlobal } from "../../views/utils";

interface PluginChannelConfigurationCellProps {
  plugin: PluginBaseFragment;
}

const PluginChannelConfigurationCell: React.FC<
  PluginChannelConfigurationCellProps
> = ({ plugin }) => {
  const { t } = useTranslation();
  const message = isPluginGlobal(plugin.globalConfiguration)
    ? t("plugin.type.global")
    : t("plugin.type.channel");

  return <TableCell>{message}</TableCell>;
};

export default PluginChannelConfigurationCell;
