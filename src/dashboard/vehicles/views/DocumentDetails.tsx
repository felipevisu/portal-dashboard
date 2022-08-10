import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import CircularLoading from "@portal/components/Circular";
import NotFound from "@portal/components/NotFound";
import {
  DocumentInput,
  useDocumentDeleteMutation,
  useDocumentDetailsQuery,
  useDocumentUpdateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import DocumentDetailsPage from "../components/DocumentDetailsPage";

export const DocumentDetails = () => {
  const { id, documentId } = useParams();
  const navigate = useNavigate();
  const { data, loading, refetch } = useDocumentDetailsQuery({
    variables: { id: documentId },
  });
  const { isOpen, openModal, closeModal } = useModal();
  const [updateDocument, updateDocumentResult] = useDocumentUpdateMutation();

  const handleSubmit = async (data: DocumentInput) => {
    await updateDocument({ variables: { id: documentId, input: data } });
    refetch();
  };

  const [deleteDocument] = useDocumentDeleteMutation({
    onCompleted: () => navigate(`/admin/vehicles/details/${id}`),
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
        title="Excluir veículo"
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
