import React from "react";
import { useTranslation } from "react-i18next";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  SessionBulkDeleteMutation,
  useSessionBulkDeleteMutation,
  useSessionsQuery,
} from "@portal/graphql";
import {
  useBulkActions,
  useFilterHandler,
  useModal,
  usePaginator,
} from "@portal/hooks";
import { mapEdgesToItems, mapNodeToChoice } from "@portal/utils/maps";

import SessionListPage from "../../components/SessionListPage";
import { getFilterOpts, getFilterVariables } from "./filter";
import { useSearchParams } from "react-router-dom";
import useAppChannel from "@portal/components/AppLayout/AppChannelContext";

export const SessionList = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { availableChannels } = useAppChannel();
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;

  const { data, loading, refetch } = useSessionsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      ...pagination,
      channel: searchParams.get("channel"),
      filter: {
        ...getFilterVariables(searchParams),
      },
    },
  });

  const handleSessionBulkDelete = (data: SessionBulkDeleteMutation) => {
    if (data.sessionBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [sessionBulkDelete] = useSessionBulkDeleteMutation({
    onCompleted: handleSessionBulkDelete,
  });

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandler();

  const filterOpts = getFilterOpts(searchParams, channelOpts);

  return (
    <>
      <SessionListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        sessions={mapEdgesToItems(data?.sessions)}
        selected={listElements.length}
        isChecked={isSelected}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        pageInfo={data?.sessions?.pageInfo}
        filterOpts={filterOpts}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onFilterReset={resetFilters}
        initialSearch={searchParams.get("search") || ""}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          sessionBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={t("session.delete")}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} sessões?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default SessionList;
