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
import { Pagination } from "@portal/components/Pagination";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentHomeFragment, PageInfoFragment } from "@portal/graphql";
import { Paginator } from "@portal/types";
import { formatDate } from "@portal/utils/date";

interface DocumentListProps {
  title: string;
  documents: DocumentHomeFragment[];
  paginator: Paginator;
  pageInfo: PageInfoFragment;
}

const buildLink = (document: DocumentHomeFragment): string => {
  const id = document.vehicle?.id || document.provider?.id;
  const path = document.vehicle ? "vehicles" : "providers";
  return [path, "details", id, "documents", document.id, "details"].join("/");
};

export const DocumentList = ({
  title,
  documents,
  paginator,
  pageInfo,
}: DocumentListProps) => {
  return (
    <Card>
      <CardHeader title={title} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader sx={{ paddingLeft: 3 }}>Nome</TableCellHeader>
            <TableCellHeader>Veículo/Fornecedor</TableCellHeader>
            <TableCellHeader>Valido até</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRowLink
              key={document.id}
              sx={{ cursor: "pointer" }}
              href={buildLink(document)}
            >
              <TableCell sx={{ paddingLeft: 3 }}>{document.name}</TableCell>
              <TableCell>
                {document.vehicle?.name || document.provider?.name}
              </TableCell>
              <TableCell>{formatDate(document.expirationDate)}</TableCell>
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
