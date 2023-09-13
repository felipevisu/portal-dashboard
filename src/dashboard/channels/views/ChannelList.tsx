import React from "react";

import { useChannelsQuery } from "@portal/graphql";

import ChannelListPage from "../components/ChannelListPage";

export const ChannelList = () => {
  const { data, loading } = useChannelsQuery({
    fetchPolicy: "network-only",
  });

  return <ChannelListPage loading={loading} channels={data?.channels || []} />;
};

export default ChannelList;
