import React from "react";

import {
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { buildLink } from "@portal/dashboard/documents/components/DocumentList";
import { DocumentFragment } from "@portal/graphql";
import { formatDate } from "@portal/utils/date";

interface DocumentListProps {
  title: string;
  documents: DocumentFragment[];
}

export const DocumentList = ({ title, documents }: DocumentListProps) => {
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
      <Toolbar>
        <Button disabled={documents.length === 0}>Ver todos</Button>
      </Toolbar>
    </Card>
  );
};
