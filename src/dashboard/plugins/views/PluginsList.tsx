import React from "react";

import { usePluginsQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import PluginsListPage from "../components/PluginsListPage";
import NotFound from "@portal/components/NotFound";

export const PluginsList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, error } = usePluginsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ...pagination,
    },
  });

  if (error) return <NotFound />;

  return (
    <PluginsListPage
      plugins={mapEdgesToItems(data?.plugins)}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.plugins?.pageInfo}
    />
  );
};

export default PluginsList;
