import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  DocumentCreateMutation,
  DocumentInput,
  useDocumentCreateMutation,
} from "@portal/graphql";

import DocumentCreatePage from "../components/DocumentCreatePage";

export const DocumentCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = (data: DocumentCreateMutation) => {
    if (!data?.documentCreate.errors.length) {
      navigate(
        `/admin/providers/details/${id}/documents/${data?.documentCreate.document.id}/details`
      );
    }
  };

  const [createDocument, createDocumentResult] = useDocumentCreateMutation({
    onCompleted: handleSuccess,
  });

  const handleSubmit = async (data: DocumentInput) => {
    await createDocument({ variables: { input: data } });
  };

  return (
    <DocumentCreatePage
      onSubmit={handleSubmit}
      errors={createDocumentResult.data?.documentCreate.errors || []}
      loading={createDocumentResult.loading}
    />
  );
};

export default DocumentCreate;
