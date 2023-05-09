import React from "react";
import { useTranslation } from "react-i18next";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  DocumentBulkDeleteMutation,
  useDocumentBulkDeleteMutation,
  useDocumentsQuery,
} from "@portal/graphql";
import { useBulkActions, useModal, usePaginator } from "@portal/hooks";
import { mapEdgesToItems } from "@portal/utils/maps";

import { DocumentListPage } from "../components/DocumentListPage";

export const DocumentList = () => {
  const { t } = useTranslation();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const { data, loading, refetch } = useDocumentsQuery({
    fetchPolicy: "network-only",
    variables: { ...pagination },
  });

  const handleDocumentBulkDelete = (data: DocumentBulkDeleteMutation) => {
    if (data.documentBulkDelete.errors.length === 0) {
      refetch();
      reset();
      closeModal();
    }
  };

  const [documentBulkDelete] = useDocumentBulkDeleteMutation({
    onCompleted: handleDocumentBulkDelete,
  });

  return (
    <>
      <DocumentListPage
        disabled={loading}
        documents={mapEdgesToItems(data?.documents)}
        pageInfo={data?.documents?.pageInfo}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        selected={listElements.length}
        isChecked={isSelected}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton color="primary" onClick={openModal}>
            <Delete />
          </IconButton>
        }
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={() =>
          documentBulkDelete({ variables: { ids: listElements } })
        }
        open={isOpen}
        title={t("document.deleteDialogList.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("document.deleteDialogList.description")}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default DocumentList;
