import React from "react";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { EntryTypeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";
import EmptyTable from "@portal/components/EmptyTable";

interface EntryTypeListProps {
  entryTypes: EntryTypeFragment[];
  disabled: boolean;
}

export const EntryTypeList = ({ entryTypes, disabled }: EntryTypeListProps) => {
  const numberOfColumns = 1;
  const { t } = useTranslation();
  const { entryTypeDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCellHeader>{t("name")}</TableCellHeader>
        </TableHead>
        <TableBody>
          {!disabled && !entryTypes.length && <EmptyTable colSpan={4} />}
          {renderCollection(entryTypes, (entryType) => {
            return (
              <TableRowLink
                key={entryType ? entryType.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                href={entryTypeDetails(entryType.id)}
              >
                <TableCell>{entryType.name}</TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntryTypeList;
