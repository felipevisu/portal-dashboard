import React, { useMemo } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Button } from "@portal/components/Button";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  DocumentDetailsFragment,
  DocumentInput,
  DocumentLoadOptionsEnum,
  ErrorFragment,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import DocumentEvents from "./DocumentEvents";
import DocumentFile from "./DocumentFile";
import DocumentForm, { FormProps, generateSubmitData } from "./DocumentForm";
import DocumentHistory from "./DocumentHistory";
import DocumentOrganization from "./DocumentOrganization";

interface DocumentDetailsPageProps {
  document: DocumentDetailsFragment;
  onSubmit: (data: DocumentInput) => Promise<void>;
  onDelete: () => void;
  onRequest: () => void;
  onLoadFromAPI: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  loadingFromAPI: boolean;
  file?: File;
  setFile: (file: File) => void;
  onFileAction: (id: string, actionName: string) => Promise<void>;
}

export const DocumentDetailsPage = ({
  document,
  onSubmit,
  onDelete,
  onRequest,
  onLoadFromAPI,
  file,
  setFile,
  errors,
  loading,
  loadingFromAPI,
  onFileAction,
}: DocumentDetailsPageProps) => {
  const { t } = useTranslation();
  const { entryDetails } = useLinks();
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
    loadType: document.loadType,
  };

  const handleSubmit = (data: FormProps) => {
    const submitData = generateSubmitData(data);
    if (file) submitData.file = file;
    onSubmit({ ...submitData });
  };

  const entryDetailsURL = useMemo(() => {
    const type = document.entry.type === "VEHICLE" ? "vehicles" : "providers";
    return entryDetails(type, document.entry.id) + "?tab=1";
  }, [document]);

  return (
    <Form initial={initialData} onSubmit={handleSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={entryDetailsURL}>{t("back")}</Backlink>
            <PageHeader
              title={`${t("document.title")}: ${document.name}`}
              limitText={document.entry.name}
            />
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Grid item xs={12} md={8}>
                <DocumentForm
                  data={data}
                  errors={errors}
                  onChange={change}
                  disabled={loading}
                />
                <DocumentFile
                  file={file}
                  fileName={document.defaultFile?.file?.url || ""}
                  fileUrl={document.defaultFile?.file?.url || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile(e.target.files[0])
                  }
                />
                {document.expires && (
                  <DocumentHistory
                    files={document.files.filter(
                      (file) => file.id !== document.defaultFile?.id
                    )}
                    onFileAction={onFileAction}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title={t("document.requestCard.title")} />
                  <CardContent>
                    <Typography>
                      {t("document.requestCard.description")}
                    </Typography>
                    <FormHelperText>
                      {t("document.requestCard.helper")}
                    </FormHelperText>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={loading}
                      onClick={onRequest}
                      variant="contained"
                      fullWidth
                    >
                      {t("document.requestCard.button")}
                    </Button>
                  </CardActions>
                </Card>
                {document.loadType !== DocumentLoadOptionsEnum.EMPTY && (
                  <Card>
                    <CardHeader title={t("document.loadCard.title")} />
                    <CardContent>
                      <Typography>
                        {t("document.loadCard.description")}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <LoadingButton
                        disabled={loading}
                        loading={loadingFromAPI}
                        onClick={onLoadFromAPI}
                        variant="contained"
                        fullWidth
                      >
                        {t("document.loadCard.button")}
                      </LoadingButton>
                    </CardActions>
                  </Card>
                )}
                <DocumentOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  expires={false}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={8}>
                <DocumentEvents events={document.events} />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(entryDetailsURL)}
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
