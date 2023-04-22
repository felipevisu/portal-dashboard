import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "@portal/components/Pagination";
import TableCellHeader from "@portal/components/TableCell";
import { ItemFragment } from "@portal/graphql";
import { formatMoney } from "@portal/utils/money";

interface InvestmentItemsProps {
  onDeleteItem: () => void;
  tollbar: React.ReactNode;
  items: ItemFragment[];
}

export const InvestmentItems = ({
  onDeleteItem,
  tollbar,
  items,
}: InvestmentItemsProps) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const handleItemDelete = (id: string) => {
    setSearchParams({ id });
    onDeleteItem();
  };

  return (
    <Card>
      <CardHeader title={t("investment.plural")} action={tollbar} />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellHeader>{t("name")}</TableCellHeader>
              <TableCellHeader>{t("value")}</TableCellHeader>
              <TableCellHeader align="right">{t("delete")}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {!items.length && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "center", height: "64px" }}
                >
                  {t("empty")}
                </TableCell>
              </TableRow>
            )}
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ paddingLeft: 3 }}>{item.name}</TableCell>
                <TableCell>{formatMoney(item.value)}</TableCell>
                <TableCell align="right" sx={{ paddingRight: 3 }}>
                  <IconButton onClick={() => handleItemDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        pageInfo={{
          __typename: "PageInfo",
          endCursor: "",
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "",
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClickNextPage={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClickPreviousPage={() => {}}
      />
    </Card>
  );
};

export default InvestmentItems;
