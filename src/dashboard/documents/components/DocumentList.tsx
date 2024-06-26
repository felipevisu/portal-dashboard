import React from "react";
import { useTranslation } from "react-i18next";

import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { DocumentFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatDate } from "@portal/utils/date";
import EmptyTable from "@portal/components/EmptyTable";

interface DocumentListProps extends ListActions {
  documents: DocumentFragment[];
  disabled: boolean;
}

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
  const { documentDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
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
          {!disabled && !documents.length && <EmptyTable colSpan={6} />}
          {renderCollection(documents, (document) => {
            const isSelected = document ? isChecked(document.id) : false;
            return (
              <TableRowLink
                key={document ? document.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                selected={isSelected}
                href={documentDetails(document.id)}
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
                  {document.expires
                    ? document.defaultFile?.expirationDate
                      ? formatDate(document.defaultFile?.expirationDate)
                      : "Não definido"
                    : "Não expirável"}
                </TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentList;
