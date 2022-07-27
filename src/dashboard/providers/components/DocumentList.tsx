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
import { DocumentFragment } from "@portal/graphql";
import { formatDate } from "@portal/utils/date";

export const DocumentList = ({
  documents,
}: {
  documents: DocumentFragment[];
}) => {
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
            <TableCellHeader sx={{ paddingLeft: (theme) => theme.spacing(3) }}>
              Nome
            </TableCellHeader>
            <TableCellHeader>Expirado</TableCellHeader>
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
              <TableCell sx={{ paddingLeft: (theme) => theme.spacing(3) }}>
                {document.name}
              </TableCell>
              <TableCellWithStatus
                status={true}
                labels={{ published: "Ativo", unPublished: "Expirado" }}
              />
              <TableCell sx={{ width: "240px" }}>
                {formatDate(document.created)}
              </TableCell>
            </TableRowLink>
          ))}
        </TableBody>
      </Table>
      <Pagination
        pageInfo={{
          __typename: "PageInfo",
          endCursor: "",
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "",
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClickNextPage={() => {}}
        onClickPreviousPage={() => {}}
      />
    </Card>
  );
};

export default DocumentList;
