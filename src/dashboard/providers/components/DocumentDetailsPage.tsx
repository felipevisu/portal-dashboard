import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { DocumentDetailsFragment, ErrorFragment } from "@portal/graphql";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps } from "./DocumentForm";

interface DocumentDetailsPageProps {
  document: DocumentDetailsFragment;
  onSubmit: (data) => Promise<void>;
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
  const [data, setData] = useState<FormProps>({
    name: document.name,
    description: document.description,
    isPublished: document.isPublished,
    expires: document.expires,
    expirationDate: document.expirationDate || "",
    beginDate: document.beginDate || "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!data.expires) {
      setData({ ...data, expirationDate: "", beginDate: "" });
    }
  }, [data.expires]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const formData = { ...data, file };
    if (!data.expirationDate) delete formData.expirationDate;
    if (!data.beginDate) delete formData.beginDate;
    if (!file) delete formData.file;
    onSubmit({ ...formData, provider: id });
    setFile(null);
  };

  return (
    <>
      <Container>
        <Backlink href={`/admin/providers/details/${id}`}>Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title={document.name} />
        <DocumentForm
          errors={errors}
          onChange={handleChange}
          data={data}
          fileUpload={
            <DocumentFile
              file={file}
              fileName={document.file}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files[0])
              }
            />
          }
        />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/providers/details/${id}`)}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};

export default DocumentDetailsPage;
