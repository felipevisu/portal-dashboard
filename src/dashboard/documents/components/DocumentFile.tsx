import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import { FileUpload, Loop } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

interface DocumentFileProps {
  file?: File;
  fileName?: string;
  fileUrl?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: ErrorFragment[];
}

export const DocumentFile = ({
  file,
  fileName,
  fileUrl,
  onChange,
  errors,
}: DocumentFileProps) => {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    fileRef.current.click();
  };

  const formErrors = getFormErrors(["file"], errors);

  return (
    <Card>
      <CardHeader
        title={t("file.title")}
        action={<Button onClick={handleClick}>{t("file.create")}</Button>}
      />
      <CardContent>
        {formErrors.file && (
          <Alert color="error" icon={false} sx={{ marginBottom: 3 }}>
            {formErrors.file.message}
          </Alert>
        )}
        <input type="file" ref={fileRef} onChange={onChange} hidden />
        {file || fileName ? (
          <Stack direction="row" spacing={1}>
            {fileName && (
              <Typography>
                <Link href={fileUrl} target="_blank" rel="noreferrer">
                  {fileName.split("/").reverse()[0]}
                </Link>
              </Typography>
            )}
            {fileName && file && <Loop />}
            {file && <Typography color="primary">{file.name}</Typography>}
          </Stack>
        ) : (
          <Box
            onClick={handleClick}
            sx={{ textAlign: "center", cursor: "pointer", width: "100%" }}
          >
            <FileUpload />
            <Typography>{t("clickHere")}</Typography>
          </Box>
        )}
        <FormHelperText
          sx={{ marginTop: 2, textAlign: fileName ? "left" : "center" }}
        >
          {t("helperText.file")}
        </FormHelperText>
      </CardContent>
    </Card>
  );
};

export default DocumentFile;
