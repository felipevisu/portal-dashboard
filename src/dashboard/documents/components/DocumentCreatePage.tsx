import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { useEntryType } from "@portal/dashboard/entries/hooks";
import { DocumentInput, ErrorFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";

interface DocumentCreatePageProps {
  onSubmit: (data: DocumentInput) => Promise<void>;
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
  const { id: entryId } = useParams();
  const navigate = useNavigate();
  const type = useEntryType();
  const { entryDetails } = useLinks();

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
    if (file) submitData.file = file;
    onSubmit({ ...submitData, entry: entryId });
  };

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={entryDetails(type, entryId)}>{t("back")}</Backlink>
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
              onCancel={() => navigate(entryDetails(type, entryId))}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentCreatePage;
