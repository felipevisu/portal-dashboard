import React from "react";

import { TableBody, TableCell } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { InvestmentFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { formatMoney } from "@portal/utils/money";

interface InvestmentListProps extends ListActions {
  investments: InvestmentFragment[];
  disabled: boolean;
}

function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  const month = date.toLocaleString("pt-BR", {
    month: "long",
  });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

export const InvestmentList = ({
  investments,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: InvestmentListProps) => {
  const numberOfColumns = investments?.length === 0 ? 3 : 4;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={investments}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader>Data</TableCellHeader>
        <TableCellHeader>Total</TableCellHeader>
        <TableCellHeader>Status</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(investments, (investment) => {
          const isSelected = investment ? isChecked(investment.id) : false;
          return (
            <TableRowLink
              key={investment ? investment.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${investment.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(investment.id)}
                />
              </TableCell>
              <TableCell>
                {toMonthName(investment.month)} de {investment.year}
              </TableCell>
              <TableCell>{formatMoney(0)}</TableCell>
              <TableCellWithStatus status={investment.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default InvestmentList;
