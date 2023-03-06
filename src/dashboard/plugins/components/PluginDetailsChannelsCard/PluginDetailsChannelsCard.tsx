import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader } from "@mui/material";

import PluginDetailsChannelsCardContent, {
  PluginDetailsChannelsCardProps,
} from "./PluginDetailsChannelsCardContent";

const PluginDetailsChannelsCard: React.FC<PluginDetailsChannelsCardProps> = (
  props
) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader title={t("channel.plural")} />
      <PluginDetailsChannelsCardContent {...props} />
    </Card>
  );
};

export default PluginDetailsChannelsCard;
