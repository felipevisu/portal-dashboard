import React from "react";
import { useTranslation } from "react-i18next";

import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { SessionFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatDate } from "@portal/utils/date";
import EmptyTable from "@portal/components/EmptyTable";

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
  const { t } = useTranslation();
  const numberOfColumns = sessions?.length === 0 ? 4 : 5;

  return (
    <TableContainer>
      <Table>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={sessions}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader>{t("name")}</TableCellHeader>
          <TableCellHeader>{t("channel.title")}</TableCellHeader>
          <TableCellHeader>{t("date")}</TableCellHeader>
          <TableCellHeader>{t("visibility")}</TableCellHeader>
        </TableHead>
        <TableBody>
          {!disabled && !sessions?.length && <EmptyTable colSpan={5} />}
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
                <TableCell>{session.channel?.name}</TableCell>
                <TableCell>{formatDate(session.date)}</TableCell>
                <TableCellWithStatus status={session.isPublished} />
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionList;
