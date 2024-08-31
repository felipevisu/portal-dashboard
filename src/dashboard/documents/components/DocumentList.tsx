import React from "react";
import { useTranslation } from "react-i18next";

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
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
import { DocumentStatus } from "./DocumentStatus";
import { FileLink } from "./FileLink";

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
          <TableCellHeader>{t("visibility")}</TableCellHeader>
          <TableCellHeader>{t("document.status")}</TableCellHeader>
          <TableCellHeader>{t("expiresIn")}</TableCellHeader>
          <TableCellHeader>{t("file.title")}</TableCellHeader>
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
                <TableCell>
                  {document.name}
                  <br />
                  <Typography fontSize="small">
                    {document.entry.name}
                  </Typography>
                </TableCell>

                <TableCellWithStatus status={document.isPublished} />
                <TableCell>
                  <DocumentStatus document={document} />
                </TableCell>
                <TableCell sx={{ color: document.expired ? "error.main" : "" }}>
                  {document.expires
                    ? document.defaultFile?.expirationDate
                      ? formatDate(document.defaultFile?.expirationDate)
                      : "Não definido"
                    : "Não expirável"}
                </TableCell>
                <TableCell align="center">
                  <FileLink document={document} />
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
