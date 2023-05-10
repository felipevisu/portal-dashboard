import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import {
  EntryBulkDeleteMutation,
  useEntriesQuery,
  useEntryBulkDeleteMutation,
  useInitialEntryFilterCategoriesQuery,
} from "@portal/graphql";
import { useBulkActions, useFilterHandler, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems, mapNodeToChoice } from "@portal/utils/maps";

import { EntryListPage } from "../../components/EntryListPage";
import { mapType } from "../utils";

import { getFilterOpts, getFilterVariables } from "./filters";

export const VehicleList = () => {
  const [searchParams] = useSearchParams();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { entry: type } = useParams();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );
  const { t } = useTranslation();

  const { isOpen, openModal, closeModal } = useModal();

  const { data: initialFilterCategories } =
    useInitialEntryFilterCategoriesQuery({
      variables: {
        categories: searchParams.getAll("categories"),
      },
      skip: !searchParams.getAll("categories")?.length,
    });

  const searchCategories = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
      type: mapType[type],
    },
  });

  const { availableChannels } = useAppChannel();
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const { data, loading, refetch } = useEntriesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
      channel: searchParams.get("channel"),
      filter: { type: mapType[type], ...getFilterVariables(searchParams) },
    },
  });

  const handleVehicleBulkDelete = (data: EntryBulkDeleteMutation) => {
    if (data.entryBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [vehicleBulkDelete] = useEntryBulkDeleteMutation({
    onCompleted: handleVehicleBulkDelete,
  });

  const [changeFilters, , handleSearchChange] = useFilterHandler();

  const filterOpts = getFilterOpts(
    searchParams,
    {
      initial: mapEdgesToItems(initialFilterCategories?.categories) || [],
      search: searchCategories,
    },
    channelOpts
  );

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
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.entries?.pageInfo}
        filterOpts={filterOpts}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        initialSearch={searchParams.get("search") || ""}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          vehicleBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={t("entry.deleteDialogList.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("entry.deleteDialogList.description")}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default VehicleList;
