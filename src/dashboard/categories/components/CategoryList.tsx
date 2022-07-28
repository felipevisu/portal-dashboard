import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { CategoryFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";

interface CategoryListProps extends ListActions {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryList = ({
  categories,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: CategoryListProps) => {
  const numberOfColumns = categories?.length === 0 ? 2 : 3;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={categories}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader sx={{ width: "auto" }}>Nome</TableCellHeader>
        <TableCellHeader sx={{ width: 160, textAlign: "center" }}>
          Veículos
        </TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(categories, (category) => {
          const isSelected = category ? isChecked(category.id) : false;
          return (
            <TableRowLink
              key={category ? category.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${category.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(category.id)}
                />
              </TableCell>
              <TableCell sx={{ width: "auto" }}>{category.name}</TableCell>
              <TableCell sx={{ width: 160, textAlign: "center" }}>
                {category.vehicles.totalCount}
              </TableCell>
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default CategoryList;