import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Tooltip,
} from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { EntryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatDate } from "@portal/utils/date";
import EmptyTable from "@portal/components/EmptyTable";

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
  const numberOfColumns = entries?.length === 0 ? 4 : 5;
  const { t } = useTranslation();
  const { entryTypeId } = useParams();
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
          <TableCellHeader>{t("visibility")}</TableCellHeader>
          <TableCellHeader>{t("created")}</TableCellHeader>
        </TableHead>
        <TableBody>
          {!disabled && !entries.length && <EmptyTable colSpan={5} />}
          {renderCollection(entries, (entry) => {
            const isSelected = entry ? isChecked(entry.id) : false;
            return (
              <TableRowLink
                key={entry ? entry.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                selected={isSelected}
                href={entryDetails(entryTypeId, entry.id)}
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
                <TableCell>
                  <Tooltip
                    title={
                      <Box>
                        {entry.channelListings.map((item) => (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              m: 1,
                              gap: 1,
                            }}
                            key={item.channel.id}
                          >
                            {item.isPublished ? (
                              <CheckCircle fontSize="small" />
                            ) : (
                              <Cancel fontSize="small" />
                            )}
                            <span>{item.channel.name}</span>
                          </Box>
                        ))}
                      </Box>
                    }
                    placement="left"
                  >
                    <Chip
                      label={t("channel.visibility", {
                        count: entry.channelListings.length,
                      })}
                      size="small"
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{formatDate(entry.created)}</TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntryList;
