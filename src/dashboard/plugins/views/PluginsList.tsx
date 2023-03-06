import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { usePluginsQuery } from "@portal/graphql";
import { usePaginator, useSearch } from "@portal/hooks";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import PluginsListPage from "../components/PluginsListPage";

import { getFilterOpts } from "./filter";

export const PluginsList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const filterOpts = getFilterOpts();

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = usePluginsQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
      filter: { search, ...queryParameters },
    },
  });

  return (
    <PluginsListPage
      plugins={mapEdgesToItems(data?.plugins)}
      onSearchChange={handleSearch}
      initialSearch={search}
      filterOpts={filterOpts}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.plugins?.pageInfo}
    />
  );
};

export default PluginsList;
