import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import { DialogContentText, IconButton } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import {
  DocumentBulkDeleteMutation,
  useDocumentBulkDeleteMutation,
  useDocumentsQuery,
} from "@portal/graphql";
import {
  useBulkActions,
  useModal,
  usePaginator,
  useSearch,
} from "@portal/hooks";
import { getQuery } from "@portal/utils/filters";
import { mapEdgesToItems } from "@portal/utils/maps";

import { DocumentListPage } from "../components/DocumentListPage";

import { getFilterOpts } from "./filter";

export const DocumentList = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { search, handleSearch } = useSearch();
  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();
  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(
    []
  );

  const { isOpen, openModal, closeModal } = useModal();

  const filterOpts = getFilterOpts();

  const queryParameters = useMemo(
    () => getQuery(filterOpts, searchParams),
    [searchParams]
  );

  const { data, loading, refetch } = useDocumentsQuery({
    fetchPolicy: "network-only",
    variables: { ...pagination, filter: { search, ...queryParameters } },
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
        onSearchChange={handleSearch}
        initialSearch={search}
        selected={listElements.length}
        isChecked={isSelected}
        toggle={toggle}
        toggleAll={toggleAll}
        filterOpts={filterOpts}
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
        title={t("document.delete")}
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir {listElements.length} documentos?
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default DocumentList;
