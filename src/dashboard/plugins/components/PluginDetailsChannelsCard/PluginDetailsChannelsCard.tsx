import React from "react";

import { Card, CardHeader } from "@mui/material";

import PluginDetailsChannelsCardContent, {
  PluginDetailsChannelsCardProps,
} from "./PluginDetailsChannelsCardContent";

const PluginDetailsChannelsCard: React.FC<PluginDetailsChannelsCardProps> = (
  props
) => {
  return (
    <Card>
      <CardHeader title="Canais" />
      <PluginDetailsChannelsCardContent {...props} />
    </Card>
  );
};

export default PluginDetailsChannelsCard;
