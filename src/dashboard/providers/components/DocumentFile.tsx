import React, { useMemo, useRef } from "react";

import { AttachFile, FileUpload } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface DocumentFile {
  file?: File;
  fileName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentFile = ({ file, fileName, onChange }: DocumentFile) => {
  const fileRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    fileRef.current.click();
  };

  const documentName = useMemo(() => {
    if (file) return file.name;
    return fileName;
  }, [fileName, file]);

  return (
    <Card>
      <CardHeader
        title="Arquivo"
        action={<Button onClick={handleClick}>Adicionar arquivo</Button>}
      />
      <CardContent>
        <input type="file" ref={fileRef} onChange={onChange} hidden />
        {documentName ? (
          <Box sx={{ display: "flex" }}>
            <AttachFile />
            <Typography>{documentName}</Typography>
          </Box>
        ) : (
          <Box
            onClick={handleClick}
            sx={{ textAlign: "center", cursor: "pointer" }}
          >
            <FileUpload />
            <Typography>Clique aqui</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentFile;
