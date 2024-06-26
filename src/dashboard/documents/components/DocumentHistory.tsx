import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  Chip,
  ChipProps,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellHeader from "@portal/components/TableCell";
import { DocumentFileFragment } from "@portal/graphql";
import { formatDate } from "@portal/utils/date";

import FileMenu from "./DocumentFileMenu";

interface DocumentHistoryProps {
  files: DocumentFileFragment[];
  onFileAction: (id: string, actionName: string) => Promise<void>;
}

const variant: Record<string, ChipProps["color"]> = {
  APPROVED: "default",
  WAITING: "warning",
  REFUSED: "error",
};

const label = {
  APPROVED: "Finalizado",
  WAITING: "Em aprovação",
  REFUSED: "Recusado",
};

export const DocumentHistory = ({
  files,
  onFileAction,
}: DocumentHistoryProps) => {
  const { t } = useTranslation();

  if (!files.length) return null;

  return (
    <Card>
      <CardHeader title={t("filesHistory")} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellHeader>{t("file.title")}</TableCellHeader>
              <TableCellHeader>{t("expirationDate")}</TableCellHeader>
              <TableCellHeader>{t("status")}</TableCellHeader>
              <TableCellHeader align="right">{t("actions")}</TableCellHeader>
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
                <TableCell>
                  {file.expirationDate ? formatDate(file.expirationDate) : "-"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={label[file.status]}
                    color={variant[file.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <FileMenu documentFile={file} onFileAction={onFileAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DocumentHistory;
