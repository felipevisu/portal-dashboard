import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import DocumentFile from "@portal/dashboard/documents/components/DocumentFile";
import DocumentForm, {
  FormProps,
} from "@portal/dashboard/documents/components/DocumentForm";
import { ErrorFragment } from "@portal/graphql";

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
    expirationDate: null,
    beginDate: null,
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
    const formData = { ...data };
    if (!data.expirationDate) delete formData.expirationDate;
    if (!data.beginDate) delete formData.beginDate;
    onSubmit({ ...formData, vehicle: id, file: file });
  };

  return (
    <>
      <Backlink href={`/admin/vehicles/details/${id}`}>Voltar</Backlink>
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
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/vehicles/details/${id}`)}
        loading={loading}
      />
    </>
  );
};

export default DocumentCreatePage;
