import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  ProviderBulkDeleteMutation,
  useProviderBulkDeleteMutation,
  useProvidersQuery,
} from "@portal/graphql";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useSegmentSearch from "@portal/searches/useSegmentSearch";
import { getChoices } from "@portal/utils/data";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import ProviderListPage from "../components/ProviderListPage";

import { getFilterOpts } from "./filter";

export const ProviderList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { result: searchSegmentOpts } = useSegmentSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const segments = getChoices(
    mapEdgesToItems(searchSegmentOpts?.data?.search) || []
  );

  const filterOpts = getFilterOpts(segments);

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useProvidersQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination, filter: { search, ...queryParameters } },
  });

  const handleProviderBulkDelete = (data: ProviderBulkDeleteMutation) => {
    if (data.providerBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [providerBulkDelete] = useProviderBulkDeleteMutation({
    onCompleted: handleProviderBulkDelete,
  });

  return (
    <>
      <ProviderListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        providers={mapEdgesToItems(data?.providers)}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onSearchChange={handleSearch}
        initialSearch={search}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.providers?.pageInfo}
        filterOpts={filterOpts}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          providerBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={"Excluir veículos"}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} veículos?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default ProviderList;
