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

import TableRowLink from "@portal/components/TableRowLink";
import { CategoryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";

import EmptyTable from "@portal/components/EmptyTable";

interface CategoryListProps {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryList = ({ categories, disabled }: CategoryListProps) => {
  const { t } = useTranslation();
  const { categoryDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCellHeader>{t("name")}</TableCellHeader>
          <TableCellHeader sx={{ width: 160, textAlign: "center" }}>
            {t("registrations")}
          </TableCellHeader>
        </TableHead>
        <TableBody>
          {!disabled && !categories.length && <EmptyTable colSpan={4} />}
          {renderCollection(categories, (category) => {
            return (
              <TableRowLink
                key={category ? category.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                href={categoryDetails(category.id)}
              >
                <TableCell>{category.name}</TableCell>
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
