import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellHeader from "@portal/components/TableCell";
import { DocumentFileFragment } from "@portal/graphql";
import { formatDate } from "@portal/utils/date";

interface DocumentHistoryProps {
  files: DocumentFileFragment[];
}

export const DocumentHistory = ({ files }: DocumentHistoryProps) => {
  const { t } = useTranslation();

  if (!files.length) return null;

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardHeader title={t("filesHistory")} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>{t("file.title")}</TableCellHeader>
            <TableCellHeader>{t("created")}</TableCellHeader>
            <TableCellHeader>{t("expired")}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            ".MuiTableRow-root:last-of-type .MuiTableCell-root": {
              border: "none",
            },
          }}
        >
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell sx={{ paddingLeft: 3 }}>
                <Link href={file.file.url} target="_blank" rel="noreferrer">
                  {file.file.url.split("/").reverse()[0]}
                </Link>
              </TableCell>
              <TableCell>{formatDate(file.created)}</TableCell>
              <TableCell>{formatDate(file.expirationDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DocumentHistory;
