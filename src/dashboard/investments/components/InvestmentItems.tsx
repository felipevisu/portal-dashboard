import React from "react";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemDelete = (id: string) => {
    setSearchParams({ id });
    onDeleteItem();
  };

  return (
    <Card>
      <CardHeader title="Investimentos" action={tollbar} />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableCellHeader>Nome</TableCellHeader>
            <TableCellHeader>Valor</TableCellHeader>
            <TableCellHeader align="right">Excluir</TableCellHeader>
          </TableHead>
          <TableBody>
            {!items.length && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "center", height: "64px" }}
                >
                  Nenhum valor adicionado
                </TableCell>
              </TableRow>
            )}
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatMoney(item.value)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleItemDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvestmentItems;
