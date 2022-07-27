import React, { useRef } from "react";

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentFile = ({ file, onChange }: DocumentFile) => {
  const fileRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    fileRef.current.click();
  };

  return (
    <Card>
      <CardHeader
        title="Arquivo"
        action={<Button onClick={handleClick}>Adicionar arquivo</Button>}
      />
      <CardContent>
        <input type="file" ref={fileRef} onChange={onChange} hidden />
        {file ? (
          <Box sx={{ display: "flex" }}>
            <AttachFile />
            <Typography>{file.name}</Typography>
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
