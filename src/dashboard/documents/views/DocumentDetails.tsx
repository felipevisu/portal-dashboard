import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import DocumentDetailsPage from "@portal/dashboard/documents/components/DocumentDetailsPage";
import {
  DocumentInput,
  useDocumentDeleteMutation,
  useDocumentDetailsQuery,
  useDocumentUpdateMutation,
  useLoadNewDocumentFromApiMutation,
  useRequestNewDocumentMutation,
} from "@portal/graphql";
import { useLinks, useModal } from "@portal/hooks";

import { useDocumentActions } from "./hooks";

export const DocumentDetails = () => {
  const { entry: type, id, documentId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading, refetch } = useDocumentDetailsQuery({
    fetchPolicy: "network-only",
    variables: { id: documentId },
  });
  const deleteModal = useModal();
  const requestModal = useModal();
  const [file, setFile] = useState<File | null>(null);

  const { entryDetails } = useLinks();

  const [updateDocument, updateDocumentResult] = useDocumentUpdateMutation({
    onCompleted: (data) => {
      if (!data?.documentUpdate.errors.length) {
        toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
        setFile(null);
        refetch();
      }
    },
  });

  const handleSubmit = async (data: DocumentInput) => {
    await updateDocument({ variables: { id: documentId, input: data } });
  };

  const [deleteDocument] = useDocumentDeleteMutation({
    onCompleted: () => navigate(entryDetails(type, id)),
  });

  const handleDocumentDelete = async () => {
    await deleteDocument({
      variables: { id: documentId },
    });
  };

  const [loadNewDocumentFromApi, loadNewDocumentFromApiResult] =
    useLoadNewDocumentFromApiMutation({
      onCompleted: (data) => {
        if (!data?.loadNewDocumentFromApi?.errors?.length) {
          toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
          refetch();
        }
      },
    });

  const handleLoadNewDocumentFromApi = async () => {
    await loadNewDocumentFromApi({ variables: { id: documentId } });
  };

  const [requestNewDocument, requestNewDocumentResult] =
    useRequestNewDocumentMutation({
      onCompleted: (data) => {
        if (!data?.requestNewDocument.errors.length) {
          toast(t("document.requestDialog.success"), {
            type: toast.TYPE.SUCCESS,
          });
          refetch();
          requestModal.closeModal();
        }
      },
    });

  const handleRequestNewDocument = async () => {
    await requestNewDocument({
      variables: { id: documentId },
    });
  };

  const { handleAction } = useDocumentActions({ callback: refetch });

  if (loading) return <CircularLoading />;

  if (!data?.document) return <NotFound />;

  return (
    <>
      <DocumentDetailsPage
        document={data.document}
        onSubmit={handleSubmit}
        file={file}
        setFile={setFile}
        onDelete={deleteModal.openModal}
        onRequest={requestModal.openModal}
        onLoadFromAPI={handleLoadNewDocumentFromApi}
        errors={updateDocumentResult.data?.documentUpdate.errors || []}
        loading={updateDocumentResult.loading}
        loadingFromAPI={loadNewDocumentFromApiResult.loading}
        onFileAction={handleAction}
      />
      <ActionDialog
        onClose={deleteModal.closeModal}
        onConfirm={handleDocumentDelete}
        open={deleteModal.isOpen}
        title={t("document.deleteDialog.title")}
        variant="delete"
      >
        <DialogContentText>
          {t("document.deleteDialog.description", {
            name: data.document.name,
          })}
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        onClose={requestModal.closeModal}
        onConfirm={handleRequestNewDocument}
        open={requestModal.isOpen}
        title={t("document.requestDialog.title")}
        loading={requestNewDocumentResult.loading}
      >
        <DialogContentText>
          {t("document.requestDialog.description", {
            entry: data.document.entry.name,
          })}
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default DocumentDetails;
