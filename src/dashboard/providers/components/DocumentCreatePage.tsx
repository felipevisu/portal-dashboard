import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps } from "./DocumentForm";

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
  const [data, setData] = useState<FormProps>({
    name: "",
    description: "",
    isPublished: false,
    expires: false,
    expirationDate: "",
    beginDate: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!data.expires) {
      setData({ ...data, expirationDate: "", beginDate: "" });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const formData = {
      ...data,
    };
    if (!data.expirationDate) {
      delete formData.expirationDate;
    }
    if (!data.beginDate) {
      delete formData.beginDate;
    }
    onSubmit({ ...formData, provider: id, file: file });
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
