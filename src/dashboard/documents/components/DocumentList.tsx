import React from "react";
import { useTranslation } from "react-i18next";

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
  const id = document.entry.id;
  const path = document.entry.type === "PROVIDER" ? "providers" : "vehicles";
  return (
    "/" + [path, "details", id, "documents", document.id, "details"].join("/")
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
  const { t } = useTranslation();

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
        <TableCellHeader>{t("name")}</TableCellHeader>
        <TableCellHeader>{t("entryTypes")}</TableCellHeader>
        <TableCellHeader>{t("visibility")}</TableCellHeader>
        <TableCellHeader>{t("created")}</TableCellHeader>
        <TableCellHeader>{t("expiresIn")}</TableCellHeader>
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
              <TableCell>{document.entry.name}</TableCell>
              <TableCellWithStatus status={document.isPublished} />
              <TableCell>{formatDate(document.created)}</TableCell>
              <TableCell sx={{ color: document.expired ? "error.main" : "" }}>
                {document.defaultFile.expirationDate
                  ? formatDate(document.defaultFile.expirationDate)
                  : "Não expirável"}
              </TableCell>
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default DocumentList;
