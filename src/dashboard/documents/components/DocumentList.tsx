/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

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
  return (
    <Card>
      <CardHeader
        title="Documentos"
        action={
          <Button variant="outlined" href="documents/create">
            Adicionar
          </Button>
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader sx={{ paddingLeft: 3 }}>Nome</TableCellHeader>
            <TableCellHeader>Status</TableCellHeader>
            <TableCellHeader>Data de upload</TableCellHeader>
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
                labels={{ published: "Ativo", unPublished: "Inativo" }}
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
