import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import { FileUpload, Loop } from "@mui/icons-material";
import {
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

interface DocumentFileProps {
  file?: File;
  fileName?: string;
  fileUrl?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentFile = ({
  file,
  fileName,
  fileUrl,
  onChange,
}: DocumentFileProps) => {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    fileRef.current.click();
  };

  return (
    <Card>
      <CardHeader
        title={t("file.title")}
        action={<Button onClick={handleClick}>{t("file.create")}</Button>}
      />
      <CardContent>
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
