import React from "react";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  SegmentBulkDeleteMutation,
  useSegmentBulkDeleteMutation,
  useSegmentsQuery,
} from "@portal/graphql";
import {
  useBulkActions,
  useModal,
  usePaginator,
  useSearch,
} from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import SegmentListPage from "../components/SegmentListPage";

export const SegmentList = () => {
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useSegmentsQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first },
  });

  const handleSegmentBulkDelete = (data: SegmentBulkDeleteMutation) => {
    if (data.segmentBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [segmentBulkDelete] = useSegmentBulkDeleteMutation({
    onCompleted: handleSegmentBulkDelete,
  });

  return (
    <>
      <SegmentListPage
        disabled={loading}
        toggle={toggle}
        toggleAll={toggleAll}
        segments={mapEdgesToItems(data?.segments)}
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
        pageInfo={data?.segments?.pageInfo}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          segmentBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={"Excluir segmentos"}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} segmentos?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default SegmentList;
