import React from "react";

import { useChannelsQuery } from "@portal/graphql";

import ChannelListPage from "../components/ChannelListPage";
import NotFound from "@portal/components/NotFound";

export const ChannelList = () => {
  const { data, loading, error } = useChannelsQuery({
    fetchPolicy: "cache-and-network",
  });

  if (error) return <NotFound />;

  return <ChannelListPage loading={loading} channels={data?.channels || []} />;
};

export default ChannelList;
