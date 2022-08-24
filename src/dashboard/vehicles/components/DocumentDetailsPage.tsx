import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Typography } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import DocumentFile from "@portal/dashboard/documents/components/DocumentFile";
import DocumentForm, {
  FormProps,
} from "@portal/dashboard/documents/components/DocumentForm";
import { DocumentDetailsFragment, ErrorFragment } from "@portal/graphql";

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
    onSubmit({ ...formData, vehicle: id });
    setFile(null);
  };

  return (
    <>
      <Backlink href={`/admin/vehicles/details/${id}`}>Voltar</Backlink>
      <PageHeader title={document.name} limitText={document.vehicle.name} />
      <DocumentForm
        errors={errors}
        onChange={handleChange}
        data={data}
        fileUpload={
          <DocumentFile
            file={file}
            fileName={document.fileName}
            fileUrl={document.fileUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files[0])
            }
          />
        }
      />
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/vehicles/details/${id}`)}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};

export default DocumentDetailsPage;
