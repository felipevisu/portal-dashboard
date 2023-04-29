import React from "react";

import { useChannelsQuery } from "@portal/graphql";

import ChannelListPage from "../components/ChannelListPage";

export const ChannelList = () => {
  const { data } = useChannelsQuery({
    fetchPolicy: "network-only",
  });

  return <ChannelListPage channels={data?.channels || []} />;
};

export default ChannelList;
