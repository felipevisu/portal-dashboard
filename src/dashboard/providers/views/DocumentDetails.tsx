import React from "react";
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
  DocumentUpdateMutation,
  useDocumentDeleteMutation,
  useDocumentDetailsQuery,
  useDocumentUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

export const DocumentDetails = () => {
  const { id, documentId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading, refetch } = useDocumentDetailsQuery({
    variables: { id: documentId },
  });
  const { isOpen, openModal, closeModal } = useModal();

  const handleUpdateDocument = (data: DocumentUpdateMutation) => {
    if (!data?.documentUpdate.errors.length) {
      toast(t("messages.update.success"), { type: toast.TYPE.SUCCESS });
    }
  };

  const [updateDocument, updateDocumentResult] = useDocumentUpdateMutation({
    onCompleted: handleUpdateDocument,
  });

  const handleSubmit = async (data: DocumentInput) => {
    await updateDocument({ variables: { id: documentId, input: data } });
    refetch();
  };

  const [deleteDocument] = useDocumentDeleteMutation({
    onCompleted: () => navigate(`/vehicles/details/${id}`),
  });

  const handleDocumentDelete = async () => {
    await deleteDocument({
      variables: { id: documentId },
    });
  };

  if (loading) return <CircularLoading />;

  if (!data?.document) return <NotFound />;

  return (
    <>
      <DocumentDetailsPage
        document={data.document}
        onSubmit={handleSubmit}
        onDelete={openModal}
        errors={updateDocumentResult.data?.documentUpdate.errors || []}
        loading={updateDocumentResult.loading}
      />
      <ActionDialog
        onClose={closeModal}
        onConfirm={handleDocumentDelete}
        open={isOpen}
        title="Excluir documento"
        variant="delete"
      >
        <DialogContentText>
          Tem certeza que deseja excluir o documento{" "}
          <b>{data?.document?.name}</b>
          <br />
          Lembre-se esta ação não é reversível
        </DialogContentText>
      </ActionDialog>
    </>
  );
};

export default DocumentDetails;
