import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@portal/config";
import { filterable } from "@portal/dashboard/attributes/utils/data";
import {
  AttributeTypeEnum,
  EntryBulkDeleteMutation,
  useEntriesQuery,
  useEntryBulkDeleteMutation,
  useEntryTypeDetailsQuery,
  useInitialEntryFilterAttributesQuery,
  useInitialEntryFilterCategoriesQuery,
} from "@portal/graphql";
import { useBulkActions, useFilterHandler, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import useAttributeValueSearch from "@portal/searches/useAttributeValueSearch";
import useCategorySearch from "@portal/searches/useCategorySearch";
import { mapEdgesToItems, mapNodeToChoice } from "@portal/utils/maps";

import { EntryListPage } from "../../components/EntryListPage";

import { getFilterOpts, getFilterVariables } from "./filters";
import NotFound from "@portal/components/NotFound";
import CircularLoading from "@portal/components/Circular";

export const VehicleList = () => {
  const [searchParams] = useSearchParams();
  const [focusedAttribute, setFocusedAttribute] = useState<string>();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { entryTypeId } = useParams();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );
  const { t } = useTranslation();

  const { isOpen, openModal, closeModal } = useModal();

  const entryType = useEntryTypeDetailsQuery({
    variables: { id: entryTypeId },
  });

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
    },
  });

  const searchAttributeValues = useAttributeValueSearch({
    variables: {
      id: focusedAttribute,
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 10,
    },
    skip: !focusedAttribute,
  });

  const { availableChannels } = useAppChannel();
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const attributes = (entryType?.data?.entryType?.entryAttributes || []).filter(
    filterable
  );

  const entries = useEntriesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
      channel: searchParams.get("channel"),
      filter: {
        entryTypes: [entryTypeId],
        ...getFilterVariables(searchParams, attributes),
      },
    },
  });

  const handleEntryBulkDelete = (data: EntryBulkDeleteMutation) => {
    if (data.entryBulkDelete.errors.length === 0) {
      entries.refetch();
      reset();
      closeModal();
    }
  };

  const [entryBulkDelete] = useEntryBulkDeleteMutation({
    onCompleted: handleEntryBulkDelete,
  });

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandler();

  const filterOpts = getFilterOpts(
    searchParams,
    attributes,
    searchAttributeValues,
    {
      initial: mapEdgesToItems(initialFilterCategories?.categories) || [],
      search: searchCategories,
    },
    channelOpts
  );

  return (
    <>
      <EntryListPage
        disabled={entryType.loading || entries.loading}
        toggle={toggle}
        toggleAll={toggleAll}
        entries={mapEdgesToItems(entries?.data?.entries)}
        entryType={entryType?.data?.entryType}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={entries?.data?.entries?.pageInfo}
        filterOpts={filterOpts}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onFilterReset={resetFilters}
        onFilterAttributeFocus={setFocusedAttribute}
        initialSearch={searchParams.get("search") || ""}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() => entryBulkDelete({ variables: { ids: listElements } })}
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
