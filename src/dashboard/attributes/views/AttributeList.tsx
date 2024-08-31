import React from "react";

import { useAttributesQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import AttributeListPage from "../components/AttributeListPage";
import NotFound from "@portal/components/NotFound";

export const AttributeList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, loading, error } = useAttributesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ...pagination,
    },
  });

  if (error) return <NotFound />;

  return (
    <AttributeListPage
      loading={loading}
      attributes={mapEdgesToItems(data?.attributes)}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.attributes?.pageInfo}
    />
  );
};

export default AttributeList;
