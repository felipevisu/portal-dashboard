import React from "react";

import { useEntryTypesQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import EntryTypeListPage from "../components/EntryTypeListPage";
import NotFound from "@portal/components/NotFound";

export const EntryTypeList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, loading, error } = useEntryTypesQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination },
  });

  if (error) return <NotFound />;

  return (
    <>
      <EntryTypeListPage
        disabled={loading}
        entryTypes={mapEdgesToItems(data?.entryTypes)}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.entryTypes?.pageInfo}
      />
    </>
  );
};

export default EntryTypeList;
