import React from "react";

import { DocumentInput, useDocumentCreateMutation } from "@portal/graphql";

import DocumentCreatePage from "../components/DocumentCreatePage";

export const DocumentCreate = () => {
  const [createDocument, createDocumentResult] = useDocumentCreateMutation();

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
