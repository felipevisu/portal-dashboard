import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import { Task } from "@portal/containers/BackgroundTasks/types";
import {
  DocumentInput,
  useDocumentDeleteMutation,
  useDocumentDetailsQuery,
  useDocumentUpdateMutation,
  useLoadNewDocumentFromApiMutation,
  useRequestNewDocumentMutation,
} from "@portal/graphql";
import { useLinks, useModal } from "@portal/hooks";
import useBackgroundTask from "@portal/hooks/useBackgroundTask";

import DocumentDetailsPage from "../components/DocumentDetailsPage";

import { useDocumentActions } from "./hooks";

export const DocumentDetails = () => {
  const { entryTypeId, id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading, refetch, error } = useDocumentDetailsQuery({
    fetchPolicy: "cache-and-network",
    variables: { id: id },
  });
  const deleteModal = useModal();
  const requestModal = useModal();
  const { queue } = useBackgroundTask();
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
    await updateDocument({ variables: { id, input: data } });
  };

  const [deleteDocument] = useDocumentDeleteMutation({
    onCompleted: () => navigate(entryDetails(entryTypeId, id)),
  });

  const handleDocumentDelete = async () => {
    await deleteDocument({
      variables: { id },
    });
  };

  const [loadNewDocumentFromApi, loadNewDocumentFromApiResult] =
    useLoadNewDocumentFromApiMutation({
      onCompleted: (data) => {
        if (!data.loadNewDocumentFromApi?.errors?.length) {
          toast(t("document.messages.updating"), { type: toast.TYPE.WARNING });
          queue(
            Task.DOCUMENT_LOAD,
            {
              loadDocument: {
                id: data.loadNewDocumentFromApi.documentLoad.id,
              },
            },
            refetch
          );
        } else {
          const message = data.loadNewDocumentFromApi?.errors[0]?.message;
          toast(message, { type: toast.TYPE.ERROR });
        }
      },
    });

  const handleLoadNewDocumentFromApi = async () => {
    await loadNewDocumentFromApi({ variables: { id } });
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
      variables: { id },
    });
  };

  const { handleAction } = useDocumentActions({ callback: refetch });

  if (error) return <NotFound />;
  if (loading) return <CircularLoading />;

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
