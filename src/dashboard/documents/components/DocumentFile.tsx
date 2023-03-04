import React, { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { FileUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
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

  const documentName = useMemo(() => {
    if (file) return file.name;
    if (fileName) return fileName.split("/").reverse()[0];
    return null;
  }, [fileName, file]);

  return (
    <Card>
      <CardHeader
        title={t("file.title")}
        action={<Button onClick={handleClick}>{t("file.create")}</Button>}
      />
      <CardContent>
        <input type="file" ref={fileRef} onChange={onChange} hidden />
        {documentName ? (
          <Box>
            {fileUrl ? (
              <Typography>
                <Link href={fileUrl} target="_blank" rel="noreferrer">
                  {documentName}
                </Link>
              </Typography>
            ) : (
              <Typography>{documentName}</Typography>
            )}
          </Box>
        ) : (
          <Box
            onClick={handleClick}
            sx={{ textAlign: "center", cursor: "pointer", width: "100%" }}
          >
            <FileUpload />
            <Typography>{t("clickHere")}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentFile;
