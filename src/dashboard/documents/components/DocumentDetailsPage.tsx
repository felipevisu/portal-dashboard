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
import DocumentHistory from "./DocumentHistory";

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
    expirationDate: document.defaultFile?.expirationDate || null,
    beginDate: document.defaultFile?.beginDate || null,
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
      <Backlink href={`/${link}/details/${id}`}>{t("back")}</Backlink>
      <PageHeader
        title={`${t("document.title")}: ${document.name}`}
        limitText={document.entry.name}
      />
      <DocumentForm
        errors={errors}
        onChange={handleChange}
        data={data}
        fileUpload={
          <DocumentFile
            file={file}
            fileName={document.defaultFile?.file.url}
            fileUrl={document.defaultFile?.file.url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files[0])
            }
          />
        }
        fileHistory={
          document.expires && (
            <DocumentHistory
              files={document.files.filter(
                (file) => file.id !== document.defaultFile.id
              )}
            />
          )
        }
      />
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/entries/details/${id}`)}
        onDelete={onDelete}
        loading={loading}
      />
    </>
  );
};

export default DocumentDetailsPage;
