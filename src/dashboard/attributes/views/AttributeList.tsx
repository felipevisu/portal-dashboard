import React from "react";

import { useAttributesQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import AttributeListPage from "../components/AttributeListPage";

export const AttributeList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data } = useAttributesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
    },
  });

  return (
    <AttributeListPage
      attributes={mapEdgesToItems(data?.attributes)}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.attributes?.pageInfo}
    />
  );
};

export default AttributeList;
