import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { DocumentDetailsFragment, ErrorFragment } from "@portal/graphql";
import { ChangeEvent } from "@portal/types";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";

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
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    name: document.name,
    description: document.description,
    isPublished: document.isPublished,
    expires: document.expires,
    expirationDate: document.expirationDate,
    beginDate: document.beginDate,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e: ChangeEvent) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const submitData = generateSubmitData(data);
    if (file) submitData.file = file;
    onSubmit({ ...submitData, entry: id });
    setFile(null);
  };

  const link = window.location.pathname.includes("vehicle")
    ? "vehicles"
    : "providers";

  return (
    <>
      <Backlink href={`/admin/${link}/details/${id}`}>{t("back")}</Backlink>
      <PageHeader title={document.name} limitText={document.entry.name} />
      <DocumentForm
        errors={errors}
        onChange={handleChange}
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
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/entries/details/${id}`)}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};

export default DocumentDetailsPage;
