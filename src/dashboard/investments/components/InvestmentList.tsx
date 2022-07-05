import React from "react";
import { TableCell, TableBody } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import { InvestmentFragment } from "@portal/graphql";
import TableHead from "@portal/components/TableHead";
import { renderCollection } from "@portal/misc";
import TableRowLink from "@portal/components/TableRowLink";
import { ListActions } from "@portal/types";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";

interface InvestmentListProps extends ListActions {
  investments: InvestmentFragment[];
  disabled: boolean;
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
  const numberOfColumns = investments?.length === 0 ? 4 : 5;

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
                {investment.month}/{investment.year}
              </TableCell>
              <TableCellWithStatus status={investment.isPublished} />
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default InvestmentList;
