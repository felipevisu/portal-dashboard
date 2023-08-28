import React from "react";
import { useTranslation } from "react-i18next";

import { Table, TableBody, TableCell, TableContainer } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";
import TableCellWithStatus from "@portal/components/TableCellWithStatus";
import TableHead from "@portal/components/TableHead";
import TableRowLink from "@portal/components/TableRowLink";
import { InvestmentFragment } from "@portal/graphql";
import { renderCollection } from "@portal/misc";
import { ListActions } from "@portal/types";
import { toMonthName } from "@portal/utils/date";
import { formatMoney } from "@portal/utils/money";

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
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={investments}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader>{t("date")}</TableCellHeader>
          <TableCellHeader>{t("channel.title")}</TableCellHeader>
          <TableCellHeader>{t("total")}</TableCellHeader>
          <TableCellHeader>{t("visibility")}</TableCellHeader>
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
                <TableCell>{investment.channel?.name}</TableCell>
                <TableCell>{formatMoney(investment.total)}</TableCell>
                <TableCellWithStatus status={investment.isPublished} />
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvestmentList;
