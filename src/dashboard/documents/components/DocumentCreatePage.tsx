import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  DocumentInput,
  DocumentLoadOptionsEnum,
  ErrorFragment,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";
import DocumentOrganization from "./DocumentOrganization";
import { documentShoudlExpire } from "./utils";

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
  const { entryTypeId, id: entryId } = useParams();
  const navigate = useNavigate();
  const { entryDetails } = useLinks();

  const initialData: FormProps = {
    name: "",
    description: "",
    isPublished: false,
    expires: false,
    expirationDate: null,
    beginDate: null,
    loadType: DocumentLoadOptionsEnum.EMPTY,
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
            <Backlink href={entryDetails(entryTypeId, entryId) + "?tab=1"}>
              {t("back")}
            </Backlink>
            <PageHeader title={t("document.create")} />
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Grid item xs={12} md={8}>
                <DocumentForm
                  errors={errors}
                  onChange={change}
                  data={data}
                  disabled={loading}
                />
                <DocumentFile
                  file={file}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile(e.target.files[0])
                  }
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DocumentOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() =>
                navigate(entryDetails(entryTypeId, entryId) + "?tab=1")
              }
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default DocumentCreatePage;
