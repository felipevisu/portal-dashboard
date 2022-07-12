import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { ProviderFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";

interface ProviderListProps extends ListActions {
  providers: ProviderFragment[];
  disabled: boolean;
}

export const ProviderList = ({
  providers,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: ProviderListProps) => {
  const numberOfColumns = providers?.length === 0 ? 4 : 5;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={providers}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Nome</TableCellHeader>
        <TableCellHeader>Segmento</TableCellHeader>
        <TableCellHeader sx={{ textAlign: "center" }}>
          Documentos
        </TableCellHeader>
        <TableCellHeader>Status</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(providers, (provider) => {
          const isSelected = provider ? isChecked(provider.id) : false;
          return (
            <TableRowLink
              key={provider ? provider.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${provider.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(provider.id)}
                />
              </TableCell>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.segment.name}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {provider.documents.totalCount}
              </TableCell>
              <TableCellWithStatus status={provider.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default ProviderList;
