import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import EntryListPage from "@portal/dashboard/entries/components/EntryListPage";
import {
  EntryBulkDeleteMutation,
  EntryTypeEnum,
  useEntriesQuery,
  useEntryBulkDeleteMutation,
} from "@portal/graphql";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { getChoices } from "@portal/utils/data";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import { getFilterOpts } from "./filter";

export const ProviderList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { result: searchCategoryOpts } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const categories = getChoices(
    mapEdgesToItems(searchCategoryOpts?.data?.search) || []
  );

  const filterOpts = getFilterOpts(categories);

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useEntriesQuery({
    variables: {
      ...pagination,
      filter: { type: EntryTypeEnum.PROVIDER, search, ...queryParameters },
    },
  });

  const handleProviderBulkDelete = (data: EntryBulkDeleteMutation) => {
    if (data.entryBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [vehicleBulkDelete] = useEntryBulkDeleteMutation({
    onCompleted: handleProviderBulkDelete,
  });

  return (
    <>
      <EntryListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        entries={mapEdgesToItems(data?.entries)}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onSearchChange={handleSearch}
        initialSearch={search}
        filterOpts={filterOpts}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.entries?.pageInfo}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          vehicleBulkDelete({ variables: { ids: listElements } })
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
