import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface EmptyTableProps {
  colSpan: number;
}

export const EmptyTable = ({ colSpan }: EmptyTableProps) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Typography align="center">{t("empty")}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTable;
