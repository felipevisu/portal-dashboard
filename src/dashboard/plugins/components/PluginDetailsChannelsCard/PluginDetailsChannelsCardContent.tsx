import React from "react";
import { useTranslation } from "react-i18next";

import { CardContent, Typography } from "@mui/material";
import CollectionWithDividers from "@portal/components/CollectionWithDividers";
import { PluginsDetailsFragment } from "@portal/graphql";

import { isPluginGlobal } from "../../views/utils";

export interface PluginDetailsChannelsCardProps {
  setSelectedChannelId: (channelId: string) => void;
  selectedChannelId: string;
  plugin: PluginsDetailsFragment;
}

const PluginDetailsChannelsCardContent: React.FC<
  PluginDetailsChannelsCardProps
> = ({ plugin, selectedChannelId, setSelectedChannelId }) => {
  const { t } = useTranslation();
  if (!plugin) {
    return null;
  }

  if (isPluginGlobal(plugin.globalConfiguration)) {
    return (
      <CardContent>
        <Typography>{t("plugin.commomConfiguration")}</Typography>
      </CardContent>
    );
  }

  const isChannelSelected = (channelId: string) =>
    selectedChannelId === channelId;

  return (
    <>
      <CollectionWithDividers
        collection={plugin.channelConfigurations}
        renderItem={({ channel }) => (
          <div
            data-test-id="channel"
            key={channel.id}
            onClick={() => setSelectedChannelId(channel.id)}
          >
            {isChannelSelected(channel.id) && <div></div>}
            <CardContent>
              <Typography>{channel.name}</Typography>
            </CardContent>
          </div>
        )}
      />
    </>
  );
};

export default PluginDetailsChannelsCardContent;
