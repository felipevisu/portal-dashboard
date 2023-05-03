import React, { createContext } from "react";

import { useUser } from "@portal/dashboard/auth";
import { ChannelFragment, useBaseChannelsQuery } from "@portal/graphql";

interface UseAppChannel {
  availableChannels: ChannelFragment[];
  refreshChannels: () => void;
}

const AppChannelContext = createContext({
  availableChannels: [],
  refreshChannels: () => undefined,
});

export const AppChannelProvider: React.FC = ({ children }) => {
  const { authenticated, user } = useUser();
  const { data: channelData, refetch } = useBaseChannelsQuery({
    skip: !authenticated || !user,
  });

  const availableChannels = channelData?.channels || [];

  return (
    <AppChannelContext.Provider
      value={{
        availableChannels,
        refreshChannels: refetch,
      }}
    >
      {children}
    </AppChannelContext.Provider>
  );
};

const useAppChannel = (): UseAppChannel => {
  const data = React.useContext(AppChannelContext);
  return data;
};

export default useAppChannel;
