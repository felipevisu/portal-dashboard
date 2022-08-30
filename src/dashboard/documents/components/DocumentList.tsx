import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatDate } from "@portal/utils/date";

interface DocumentListProps extends ListActions {
  documents: DocumentFragment[];
  disabled: boolean;
}

export const buildLink = (document: DocumentFragment): string => {
  const id = document.vehicle?.id || document.provider?.id;
  const path = document.vehicle ? "vehicles" : "providers";
  return (
    "/admin/" +
    [path, "details", id, "documents", document.id, "details"].join("/")
  );
};

export const DocumentList = ({
  documents,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: DocumentListProps) => {
  const numberOfColumns = documents?.length === 0 ? 5 : 6;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={documents}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Nome</TableCellHeader>
        <TableCellHeader>Veículo/Prestador</TableCellHeader>
        <TableCellHeader>Visibilidade</TableCellHeader>
        <TableCellHeader>Expira em</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(documents, (document) => {
          const isSelected = document ? isChecked(document.id) : false;
          return (
            <TableRowLink
              key={document ? document.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={buildLink(document)}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(document.id)}
                />
              </TableCell>
              <TableCell>{document.name}</TableCell>
              <TableCell>
                {document.vehicle?.name || document.provider?.name}
              </TableCell>
              <TableCellWithStatus status={document.isPublished} />
              <TableCell sx={{ color: document.expired ? "error.main" : "" }}>
                {document.expirationDate
                  ? formatDate(document.expirationDate)
                  : "-"}
              </TableCell>
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default DocumentList;