import React from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { Form } from "@portal/components/Form";
import DocumentFile from "@portal/dashboard/documents/components/DocumentFile";
import {
  DocumentUpdateByEntryInput,
  ErrorFragment,
  ValidateTokenMutation,
} from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

import DocumentPublicUpdateForm, {
  FormProps,
} from "./DocumentPublicUpdateForm";

interface DocumentPublicUpdatePageProps {
  document: ValidateTokenMutation["validateToken"]["document"];
  file?: File;
  errors: ErrorFragment[];
  setFile: (file: File) => void;
  onSubmit: (data: DocumentUpdateByEntryInput) => Promise<void>;
  loading: boolean;
}

export const generateSubmitData = (
  data: FormProps
): Partial<DocumentUpdateByEntryInput> => {
  const submit = {
    expirationDate: data.expirationDate?.format("YYYY-MM-DD"),
    beginDate: data.beginDate?.format("YYYY-MM-DD"),
  };
  return submit;
};

export const DocumentPublicUpdatePage = ({
  document,
  errors,
  file,
  setFile,
  onSubmit,
  loading,
}: DocumentPublicUpdatePageProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["file"], errors);

  const initial = {
    beginDate: null,
    expirationDate: null,
  };

  const handleSubmit = (data: FormProps) => {
    const submitData = generateSubmitData(data);
    onSubmit({ ...submitData, file });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ paddingY: 3 }}>
        <Typography fontSize={24} fontWeight={700}>
          {t("documentUpdate.title")}
        </Typography>
        <Typography>
          {t("documentUpdate.record")}: {document.entry.name}
        </Typography>
        <Typography>
          {t("documentUpdate.document")}: <b>{document.name}</b>
        </Typography>
      </Box>
      <Form initial={initial} onSubmit={handleSubmit}>
        {({ change, submit, data }) => {
          return (
            <>
              <Card>
                <CardHeader title="Período de validade" />
                <CardContent>
                  <DocumentPublicUpdateForm
                    data={data}
                    change={change}
                    errors={errors}
                  />
                </CardContent>
              </Card>
              <DocumentFile
                file={file}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files[0])
                }
                error={formErrors.file?.message}
              />
              <Box sx={{ textAlign: "center" }}>
                <LoadingButton
                  loading={loading}
                  fullWidth
                  variant="contained"
                  onClick={submit}
                >
                  {t("documentUpdate.submit")}
                </LoadingButton>
              </Box>
            </>
          );
        }}
      </Form>
    </Container>
  );
};

export default DocumentPublicUpdatePage;
