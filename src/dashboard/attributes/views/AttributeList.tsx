import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useAttributesQuery } from "@portal/graphql";
import { usePaginator, useSearch } from "@portal/hooks";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import AttributeListPage from "../components/AttributeListPage";

import { getFilterOpts } from "./filters";

export const AttributeList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const filterOpts = getFilterOpts();

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading } = useAttributesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
      filter: { ...queryParameters },
    },
  });

  return (
    <AttributeListPage
      disabled={loading}
      search={search}
      attributes={mapEdgesToItems(data?.attributes)}
      onSearchChange={handleSearch}
      filterOpts={filterOpts}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.attributes?.pageInfo}
    />
  );
};

export default AttributeList;
