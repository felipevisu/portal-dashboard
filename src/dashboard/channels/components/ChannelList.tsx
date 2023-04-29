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
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableRowLink from "@portal/components/TableRowLink";
import { ChannelFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";

interface ChannelListProps {
  channels: ChannelFragment[];
}

export const ChannelList = ({ channels }: ChannelListProps) => {
  const { t } = useTranslation();
  const { channelDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCellHeader>{t("name")}</TableCellHeader>
          <TableCellHeader>{t("isActive")}</TableCellHeader>
        </TableHead>
        <TableBody
          sx={{
            ".MuiTableRow-root:last-of-type .MuiTableCell-root": {
              border: "none",
            },
          }}
        >
          {renderCollection(channels, (channel) => {
            return (
              <TableRowLink
                key={channel ? channel.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                href={channelDetails(channel.id)}
              >
                <TableCell sx={{ paddingLeft: 3 }}>{channel.name}</TableCell>
                <TableCellWithStatus
                  status={channel.isActive}
                  labels={{
                    published: t("active"),
                    unPublished: t("inactive"),
                  }}
                />
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
