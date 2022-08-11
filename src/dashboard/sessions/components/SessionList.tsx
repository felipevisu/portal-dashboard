import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { SessionFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatDate } from "@portal/utils/date";

interface SessionListProps extends ListActions {
  sessions: SessionFragment[];
  disabled: boolean;
}

export const SessionList = ({
  sessions,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: SessionListProps) => {
  const numberOfColumns = sessions?.length === 0 ? 3 : 4;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={sessions}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Nome</TableCellHeader>
        <TableCellHeader>Data</TableCellHeader>
        <TableCellHeader>Visibilidade</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(sessions, (session) => {
          const isSelected = sessions ? isChecked(session.id) : false;
          return (
            <TableRowLink
              key={session ? session.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${session.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(session.id)}
                />
              </TableCell>
              <TableCell>{session.name}</TableCell>
              <TableCell>{formatDate(session.date)}</TableCell>
              <TableCellWithStatus status={session.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default SessionList;
