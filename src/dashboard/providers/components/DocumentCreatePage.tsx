import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { DocumentInput, ErrorFragment } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";

interface DocumentCreatePageProps {
  onSubmit: (data: DocumentInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const DocumentCreatePage = ({
  onSubmit,
  errors,
  loading,
}: DocumentCreatePageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const initialData = {
    name: "",
    description: "",
    isPublished: false,
    expires: false,
    expirationDate: null,
    beginDate: null,
  };

  const handleSubmit = (data: FormProps) => {
    const submitDate = generateSubmitData(data);
    onSubmit({ ...submitDate, provider: id, file: file });
  };

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={`/admin/providers/details/${id}`}>Voltar</Backlink>
            <PageHeader title="Adicionar documento" />
            <DocumentForm
              errors={errors}
              onChange={change}
              data={data}
              fileUpload={
                <DocumentFile
                  file={file}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile(e.target.files[0])
                  }
                />
              }
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(`/admin/providers/details/${id}`)}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentCreatePage;
