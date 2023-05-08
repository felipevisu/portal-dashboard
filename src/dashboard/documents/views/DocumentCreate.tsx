import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DocumentCreatePage from "@portal/dashboard/documents/components/DocumentCreatePage";
import {
  DocumentCreateMutation,
  DocumentInput,
  useDocumentCreateMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

export const DocumentCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const { documentDetails } = useLinks();

  const handleCreateDocument = (data: DocumentCreateMutation) => {
    if (!data?.documentCreate?.errors?.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(documentDetails(data?.documentCreate.document.id));
    }
  };

  const [createDocument, createDocumentResult] = useDocumentCreateMutation({
    onCompleted: handleCreateDocument,
  });

  const handleSubmit = async (data: DocumentInput) => {
    await createDocument({ variables: { input: data } });
  };

  return (
    <DocumentCreatePage
      onSubmit={handleSubmit}
      errors={createDocumentResult.data?.documentCreate.errors || []}
      loading={createDocumentResult.loading}
      file={file}
      setFile={setFile}
    />
  );
};

export default DocumentCreate;
