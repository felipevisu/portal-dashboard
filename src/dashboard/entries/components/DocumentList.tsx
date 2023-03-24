/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentFragment, PageInfoFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { Paginator } from "@portal/types";
import { formatDate } from "@portal/utils/date";

interface DocumentListProps {
  documents: DocumentFragment[];
  paginator: Paginator;
  pageInfo: PageInfoFragment;
}

export const DocumentList = ({
  documents,
  paginator,
  pageInfo,
}: DocumentListProps) => {
  const { id: entryId } = useParams();
  const { t } = useTranslation();
  const { entry: type } = useParams();
  const { documentCreate, documentDetails } = useLinks();

  return (
    <Card>
      <CardHeader
        title={t("document.plural")}
        action={
          <Button variant="outlined" href={documentCreate(type, entryId)}>
            {t("add")}
          </Button>
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader sx={{ paddingLeft: 3 }}>
              {t("name")}
            </TableCellHeader>
            <TableCellHeader>{t("visibility")}</TableCellHeader>
            <TableCellHeader>{t("created")}</TableCellHeader>
            <TableCellHeader>{t("expiresIn")}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRowLink
              key={document.id}
              sx={{ cursor: "pointer" }}
              href={documentDetails(type, entryId, document.id)}
            >
              <TableCell sx={{ paddingLeft: 3 }}>{document.name}</TableCell>
              <TableCellWithStatus status={document.isPublished} />
              <TableCell>{formatDate(document.created)}</TableCell>
              <TableCell sx={{ color: document.expired ? "error.main" : "" }}>
                {document.expires
                  ? document.defaultFile?.expirationDate
                    ? formatDate(document.defaultFile.expirationDate)
                    : "Não definido"
                  : "Não expirável"}
              </TableCell>
            </TableRowLink>
          ))}
        </TableBody>
      </Table>
      <Pagination
        pageInfo={pageInfo}
        onClickNextPage={paginator.handleNextPage}
        onClickPreviousPage={paginator.handlePreviousPage}
      />
    </Card>
  );
};

export default DocumentList;
