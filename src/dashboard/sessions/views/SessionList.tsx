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
import { useBulkActions, useModal, usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import SessionListPage from "../components/SessionListPage";

export const SessionList = () => {
  const { t } = useTranslation();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useSessionsQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination },
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
