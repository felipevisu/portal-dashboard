import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CircularLoading from "@portal/components/Circular";
import {
  DocumentUpdateByEntryInput,
  DocumentUpdateByEntryMutation,
  useDocumentUpdateByEntryMutation,
  useValidateTokenMutation,
} from "@portal/graphql";

import DocumentPublicUpdatePage from "../components/DocumentPublicUpdatePage";
import SuccessMessage from "../components/SuccessMessage";

export const DocumentPublicUpdate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { token } = useParams();
  const [file, setFile] = useState<File | null>(null);

  const [validateToken, validateTokenResult] = useValidateTokenMutation();

  const handleUpdate = (data: DocumentUpdateByEntryMutation) => {
    if (!data?.documentUpdateByEntry?.errors?.length) {
      setSuccess(true);
    }
  };

  const [update, updateResult] = useDocumentUpdateByEntryMutation({
    onCompleted: handleUpdate,
  });

  const handleValidation = async () => {
    await validateToken({ variables: { token } });
  };

  const handleSubmit = async (data: DocumentUpdateByEntryInput) => {
    await update({ variables: { token, input: data } });
  };

  useEffect(() => {
    handleValidation();
  }, [token]);

  if (!validateTokenResult.called || validateTokenResult.loading) {
    return <CircularLoading />;
  }

  if (
    validateTokenResult.called &&
    !validateTokenResult.data?.validateToken?.document
  ) {
    return null;
  }

  if (success) {
    return <SuccessMessage />;
  }

  return (
    <DocumentPublicUpdatePage
      document={validateTokenResult.data.validateToken.document}
      errors={updateResult.data?.documentUpdateByEntry?.errors || []}
      file={file}
      setFile={setFile}
      onSubmit={handleSubmit}
      loading={updateResult.loading}
    />
  );
};

export default DocumentPublicUpdate;
