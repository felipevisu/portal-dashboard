import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment } from "@portal/graphql";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";

interface DocumentCreatePageProps {
  onSubmit: (data) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
  file?: File;
  setFile: (file: File) => void;
}

export const DocumentCreatePage = ({
  onSubmit,
  errors,
  loading,
  file,
  setFile,
}: DocumentCreatePageProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData: FormProps = {
    name: "",
    description: "",
    isPublished: false,
    expires: false,
    expirationDate: null,
    beginDate: null,
  };

  const handleSubmit = (data: FormProps) => {
    const submitData = generateSubmitData(data);
    onSubmit({ ...submitData, entry: id, file: file });
  };

  const link = window.location.pathname.includes("vehicle")
    ? "vehicles"
    : "providers";

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={`/${link}/details/${id}`}>{t("back")}</Backlink>
            <PageHeader title={t("document.create")} />
            <DocumentForm
              errors={errors}
              onChange={change}
              expires={true}
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
              onCancel={() => navigate(`/entries/details/${id}`)}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentCreatePage;
