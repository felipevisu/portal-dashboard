import React from "react";
import { useTranslation } from "react-i18next";

import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { CategoryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
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
  const numberOfColumns = categories?.length === 0 ? 3 : 4;
  const { t } = useTranslation();
  const { categoryDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={categories}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader>{t("name")}</TableCellHeader>
          <TableCellHeader>{t("type")}</TableCellHeader>
          <TableCellHeader sx={{ width: 160, textAlign: "center" }}>
            {t("registrations")}
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
                href={categoryDetails(category.id)}
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
                <TableCellHeader>
                  {category.type === "VEHICLE"
                    ? t("vehicles.title")
                    : t("providers.title")}
                </TableCellHeader>
                <TableCell sx={{ width: 160, textAlign: "center" }}>
                  {category.totalEntries}
                </TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryList;
