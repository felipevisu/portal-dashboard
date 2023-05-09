import React from "react";

import { usePluginsQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import PluginsListPage from "../components/PluginsListPage";

export const PluginsList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data } = usePluginsQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
    },
  });

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
