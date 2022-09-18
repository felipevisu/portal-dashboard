import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  DocumentDetailsFragment,
  DocumentInput,
  ErrorFragment,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";

interface DocumentDetailsPageProps {
  document: DocumentDetailsFragment;
  onSubmit: (data: DocumentInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
}

export const DocumentDetailsPage = ({
  document,
  onSubmit,
  onDelete,
  errors,
  loading,
}: DocumentDetailsPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const initialData = {
    name: document.name,
    description: document.description,
    isPublished: document.isPublished,
    expires: document.expires,
    expirationDate: document.expirationDate,
    beginDate: document.beginDate,
  };

  const handleSubmit = (data: FormProps) => {
    const submitData = generateSubmitData(data);
    if (file) submitData.file = file;
    onSubmit({ ...submitData, provider: id });
    setFile(null);
  };

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={`/admin/providers/details/${id}`}>Voltar</Backlink>
            <PageHeader
              title={document.name}
              limitText={document.provider.name}
            />
            <DocumentForm
              errors={errors}
              onChange={change}
              data={data}
              fileUpload={
                <DocumentFile
                  file={file}
                  fileName={document.file.url}
                  fileUrl={document.file.url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile(e.target.files[0])
                  }
                />
              }
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(`/admin/providers/details/${id}`)}
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentDetailsPage;
