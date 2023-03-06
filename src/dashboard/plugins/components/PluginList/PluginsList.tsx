import React from "react";
import { useTranslation } from "react-i18next";

import { TableBody, TableCell, TableHead } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { PluginBaseFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";

import PluginChannelAvailabilityCell from "./PluginChannelAvailabilityCell";
import PluginChannelConfigurationCell from "./PluginChannelConfigurationCell";

interface PluginsListProps {
  plugins: PluginBaseFragment[];
}

export const PluginsList = ({ plugins }: PluginsListProps) => {
  const { t } = useTranslation();
  return (
    <ResponsiveTable>
      <TableHead>
        <TableCellHeader>{t("name")}</TableCellHeader>
        <TableCellHeader>{t("configurationType")}</TableCellHeader>
        <TableCellHeader>{t("status")}</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(plugins, (plugin) => {
          return (
            <TableRowLink
              key={plugin ? plugin.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              href={`details/${plugin.id}/`}
            >
              <TableCell>{plugin.name}</TableCell>
              <PluginChannelConfigurationCell plugin={plugin} />
              <PluginChannelAvailabilityCell plugin={plugin} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default PluginsList;
