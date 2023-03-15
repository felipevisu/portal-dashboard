import React from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  DocumentDetailsFragment,
  DocumentInput,
  ErrorFragment,
} from "@portal/graphql";
import { useEntryType, useLinks } from "@portal/hooks";

import DocumentEvents from "./DocumentEvents";
import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";
import DocumentHistory from "./DocumentHistory";

interface DocumentDetailsPageProps {
  document: DocumentDetailsFragment;
  onSubmit: (data: DocumentInput) => Promise<void>;
  onDelete: () => void;
  onRequest: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  file?: File;
  setFile: (file: File) => void;
  onFileAction: (id: string, actionName: string) => Promise<void>;
}

export const DocumentDetailsPage = ({
  document,
  onSubmit,
  onDelete,
  onRequest,
  file,
  setFile,
  errors,
  loading,
  onFileAction,
}: DocumentDetailsPageProps) => {
  const { t } = useTranslation();
  const { id: entryId } = useParams();
  const { entryDetails } = useLinks();
  const type = useEntryType();
  const navigate = useNavigate();

  const initialData: FormProps = {
    name: document.name,
    description: document.description,
    isPublished: document.isPublished,
    expires: document.expires,
    expirationDate: document.defaultFile?.expirationDate
      ? dayjs(document.defaultFile.expirationDate)
      : null,
    beginDate: document.defaultFile?.beginDate
      ? dayjs(document.defaultFile?.beginDate)
      : null,
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
            <PageHeader
              title={`${t("document.title")}: ${document.name}`}
              limitText={document.entry.name}
            />
            <DocumentForm
              errors={errors}
              onChange={change}
              onRequest={onRequest}
              data={data}
              expires={false}
              fileUpload={
                <DocumentFile
                  file={file}
                  fileName={document.defaultFile?.file?.url || ""}
                  fileUrl={document.defaultFile?.file?.url || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile(e.target.files[0])
                  }
                />
              }
              fileHistory={
                document.expires && (
                  <DocumentHistory
                    files={document.files.filter(
                      (file) => file.id !== document.defaultFile?.id
                    )}
                    onFileAction={onFileAction}
                  />
                )
              }
              documentEvents={<DocumentEvents events={document.events} />}
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(entryDetails(type, entryId))}
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentDetailsPage;
