import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import EntryListPage from "@portal/dashboard/entries/components/EntryListPage";
import {
  EntryBulkDeleteMutation,
  useEntriesQuery,
  useEntryBulkDeleteMutation,
} from "@portal/graphql";
import { useBulkActions, usePaginator } from "@portal/hooks";
import useModal from "@portal/hooks/useModal";
import { mapEdgesToItems } from "@portal/utils/maps";

import { mapType } from "./utils";

export const VehicleList = () => {
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { entry: type } = useParams();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );
  const { t } = useTranslation();

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useEntriesQuery({
    fetchPolicy: "network-only",
    variables: {
      ...pagination,
      filter: { type: mapType[type] },
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
