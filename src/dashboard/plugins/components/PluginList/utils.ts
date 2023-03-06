import { PluginConfigurationBaseFragment } from "@portal/graphql";

export const getActiveChannelConfigsCount = (
  channelConfigurations: PluginConfigurationBaseFragment[]
) => channelConfigurations?.filter(({ active }) => !!active).length;
