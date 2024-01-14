import React from "react";

import { useEntryTypesQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import EntryTypeListPage from "../components/EntryTypeListPage";

export const EntryTypeList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, loading } = useEntryTypesQuery({
    fetchPolicy: "network-only",
    variables: { ...pagination },
  });

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
