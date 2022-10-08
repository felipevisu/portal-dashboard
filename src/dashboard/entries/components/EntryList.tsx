import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { EntryFragment } from "@portal/graphql";
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
  const numberOfColumns = entries?.length === 0 ? 3 : 4;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={entries}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Nome</TableCellHeader>
        <TableCellHeader>Categoria</TableCellHeader>
        <TableCellHeader>Visibilidade</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(entries, (entry) => {
          const isSelected = entry ? isChecked(entry.id) : false;
          return (
            <TableRowLink
              key={entry ? entry.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${entry.id}/`}
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
              <TableCell>{entry.category.name}</TableCell>
              <TableCellWithStatus status={entry.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default EntryList;
