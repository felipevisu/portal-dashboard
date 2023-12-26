import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { useEntryTypesQuery } from "@portal/graphql";
import { usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import { mapEdgesToItems } from "@portal/utils/maps";

import EntryTypeListPage from "../components/EntryTypeListPage";

export const EntryTypeList = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useEntryTypesQuery({
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
