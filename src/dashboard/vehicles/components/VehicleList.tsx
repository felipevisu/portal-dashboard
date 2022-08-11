import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { VehicleFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";

interface VehicleListProps extends ListActions {
  vehicles: VehicleFragment[];
  disabled: boolean;
}

export const VehicleList = ({
  vehicles,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: VehicleListProps) => {
  const numberOfColumns = vehicles?.length === 0 ? 3 : 4;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={vehicles}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Nome</TableCellHeader>
        <TableCellHeader>Categoria</TableCellHeader>
        <TableCellHeader>Visibilidade</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(vehicles, (vehicle) => {
          const isSelected = vehicle ? isChecked(vehicle.id) : false;
          return (
            <TableRowLink
              key={vehicle ? vehicle.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${vehicle.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(vehicle.id)}
                />
              </TableCell>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.category.name}</TableCell>
              <TableCellWithStatus status={vehicle.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default VehicleList;
