import React from "react";

import { PluginBaseFragment } from "@portal/graphql";

import PluginAvailabilityStatus from "./PluginAvailabilityStatus";

interface PluginChannelAvailabilityCellProps {
  plugin: PluginBaseFragment;
}

const PluginChannelAvailabilityCell: React.FC<
  PluginChannelAvailabilityCellProps
> = ({ plugin }) => {
  return <PluginAvailabilityStatus plugin={plugin} />;
};

export default PluginChannelAvailabilityCell;
