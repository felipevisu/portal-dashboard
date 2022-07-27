import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";

import DocumentFile from "./DocumentFile";
import DocumentForm from "./DocumentForm";

interface DocumentCreatePageProps {
  onSubmit: (data) => Promise<void>;
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
  const [data, setData] = useState({
    name: "",
    slug: "",
    isPublished: false,
    expires: false,
  });
  const [file, setFile] = useState(null);

  const handleChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit({ ...data, provider: id, file });
  };

  return (
    <>
      <Container>
        <Backlink href={`/admin/providers/details/${id}`}>Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader title="Adicionar documento" />
        <DocumentForm
          errors={errors}
          onChange={handleChange}
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
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/providers/details/${id}`)}
        loading={loading}
      />
    </>
  );
};

export default DocumentCreatePage;
