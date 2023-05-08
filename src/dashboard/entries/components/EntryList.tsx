import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { EntryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";

interface EntryListProps extends ListActions {
  entries: EntryFragment[];
  disabled: boolean;
}

export const EntryList = ({
  entries,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: EntryListProps) => {
  const numberOfColumns = entries?.length === 0 ? 2 : 3;
  const { t } = useTranslation();
  const { entry: type } = useParams();
  const { entryDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={entries}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader>{t("name")}</TableCellHeader>
          <TableCellHeader>{t("category.title")}</TableCellHeader>
        </TableHead>
        <TableBody>
          {renderCollection(entries, (entry) => {
            const isSelected = entry ? isChecked(entry.id) : false;
            return (
              <TableRowLink
                key={entry ? entry.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                selected={isSelected}
                href={entryDetails(type, entry.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(entry.id)}
                  />
                </TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>
                  {entry.categories.map((category) => category.name).join(", ")}
                </TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntryList;
