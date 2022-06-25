import React, { useMemo } from "react";
import { DialogContentText, IconButton } from "@mui/material";
import {
  useBulkActions,
  usePaginator,
  useSearch,
  useModal,
} from "@portal/hooks";
import {
  useSessionsQuery,
  useSessionBulkDeleteMutation,
  SessionBulkDeleteMutation,
} from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import SessionListPage, {
  SessionListFilterOpts,
} from "../components/SessionListPage";
import ActionDialog from "@portal/components/ActionDialog";
import { Delete } from "@mui/icons-material";
import { getFilterOpts } from "./filter";
import { getQuery } from "@portal/utils/filters";
import { useSearchParams } from "react-router-dom";

export const SessionList = () => {
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const filterOpts = getFilterOpts();

  const queryParameters = useMemo(
    () => getQuery<SessionListFilterOpts>(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useSessionsQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first, ...queryParameters },
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
        onSearchChange={handleSearch}
        initialSearch={search}
        filterOpts={filterOpts}
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
        title={"Excluir sessões"}
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
