import React from "react";
import { TableCell, TableBody } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import { SessionFragment } from "@portal/graphql";
import TableHead from "@portal/components/TableHead";
import { renderCollection } from "@portal/misc";
import TableRowLink from "@portal/components/TableRowLink";
import { ListActions } from "@portal/types";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";

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
  const numberOfColumns = sessions?.length === 0 ? 2 : 3;

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
        <TableCellHeader>Status</TableCellHeader>
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
              <TableCell>{session.date}</TableCell>
              <TableCellWithStatus status={session.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default SessionList;
