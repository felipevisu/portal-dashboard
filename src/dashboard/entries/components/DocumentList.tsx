/* eslint-disable @typescript-eslint/no-empty-function */
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
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentFragment, PageInfoFragment } from "@portal/graphql";
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
  const { t } = useTranslation();
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        title={t("document.title")}
        action={
          <Button variant="outlined" href="documents/create">
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
            <TableCellHeader>{t("status")}</TableCellHeader>
            <TableCellHeader>{t("uploadDate")}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRowLink
              key={document.id}
              sx={{ cursor: "pointer" }}
              href={`documents/${document.id}/details`}
            >
              <TableCell sx={{ paddingLeft: 3 }}>{document.name}</TableCell>
              <TableCellWithStatus
                status={document.isPublished}
                labels={{
                  published: t("published"),
                  unPublished: t("unpublished"),
                }}
              />
              <TableCellWithStatus
                status={!document.expired}
                labels={{ published: t("active"), unPublished: t("expired") }}
              />
              <TableCell sx={{ width: "150px" }}>
                {formatDate(document.created)}
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
