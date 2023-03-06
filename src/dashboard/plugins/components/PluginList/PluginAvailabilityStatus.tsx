import React from "react";

import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import { PluginBaseFragment } from "@portal/graphql";

import { isPluginGlobal } from "../../views/utils";

import { getActiveChannelConfigsCount } from "./utils";

interface PluginAvailabilityStatusProps {
  plugin: PluginBaseFragment;
}

const PluginAvailabilityStatus: React.FC<PluginAvailabilityStatusProps> = ({
  plugin: { globalConfiguration, channelConfigurations },
}) => {
  const isGlobalPlugin = isPluginGlobal(globalConfiguration);

  const activeChannelsCount = getActiveChannelConfigsCount(
    channelConfigurations
  );

  const isStatusActive = isGlobalPlugin
    ? globalConfiguration.active
    : !!activeChannelsCount;

  return <TableCellWithStatus status={isStatusActive} />;
};

export default PluginAvailabilityStatus;
