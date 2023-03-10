import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DocumentCreatePage from "@portal/dashboard/documents/components/DocumentCreatePage";
import {
  DocumentCreateMutation,
  DocumentInput,
  useDocumentCreateMutation,
} from "@portal/graphql";

export const DocumentCreate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const link = window.location.pathname.includes("vehicle")
    ? "vehicles"
    : "providers";

  const handleCreateDocument = (data: DocumentCreateMutation) => {
    if (!data?.documentCreate?.errors?.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(
        `/${link}/details/${id}/documents/${data?.documentCreate.document.id}/details`
      );
    }
    if (data?.documentCreate?.errors?.some((error) => error.field === "file")) {
      toast(t("Você precisa adicionar um arquivo"), { type: toast.TYPE.ERROR });
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
