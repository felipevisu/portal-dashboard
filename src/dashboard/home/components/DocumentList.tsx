import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { formatDate } from "@portal/utils/date";

interface DocumentListProps {
  title: string;
  documents: DocumentFragment[];
  href: string;
}

export const DocumentList = ({ title, documents, href }: DocumentListProps) => {
  const { t } = useTranslation();
  const { documentDetails } = useLinks();

  return (
    <Card>
      <CardHeader title={title} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader sx={{ paddingLeft: 3 }}>
              {t("name")}
            </TableCellHeader>
            <TableCellHeader>{t("entryTypes")}</TableCellHeader>
            <TableCellHeader>{t("validUntil")}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRowLink
              key={document.id}
              sx={{ cursor: "pointer" }}
              href={documentDetails(document.id)}
            >
              <TableCell sx={{ paddingLeft: 3 }}>{document.name}</TableCell>
              <TableCell>{document.entry.name}</TableCell>
              <TableCell>
                {formatDate(document.defaultFile.expirationDate)}
              </TableCell>
            </TableRowLink>
          ))}
        </TableBody>
      </Table>
      <Toolbar>
        <Button href={href} disabled={documents.length === 0}>
          {t("seeAll")}
        </Button>
      </Toolbar>
    </Card>
  );
};
