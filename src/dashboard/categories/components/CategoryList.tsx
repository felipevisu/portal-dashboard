import React from "react";
import { TableCell, TableBody } from "@material-ui/core";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import { CategoryFragment } from "@portal/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import TableHead from "@portal/components/TableHead";
import { renderCollection } from "@portal/misc";
import TableRowLink from "@portal/components/TableRowLink";
import { ListActions } from "@portal/types";
import Checkbox from "@portal/components/Checkbox";

const useStyles = makeStyles(
  () => ({
    tableRow: {
      cursor: "pointer",
    },
  }),
  { name: "CategoryList" }
);

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
  const classes = useStyles();
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
        <TableCell>Nome</TableCell>
        <TableCell>Veículos</TableCell>
      </TableHead>
      <TableBody>
        {renderCollection(categories, (category) => {
          const isSelected = category ? isChecked(category.id) : false;
          return (
            <TableRowLink
              key={category ? category.id : "skeleton"}
              className={classes.tableRow}
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
              <TableCell>{category.name}</TableCell>
              <TableCell>0</TableCell>
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default CategoryList;
