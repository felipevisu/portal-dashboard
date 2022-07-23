import React from "react";

import { Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import { ItemCreateInput } from "@portal/graphql";
import { formatMoney } from "@portal/utils/money";

interface InvestmentItemsProps {
  onCreateItem: () => void;
  onDeleteItem: (item: number) => void;
  items: ItemCreateInput[];
}

export const InvestmentItems = ({
  onCreateItem,
  onDeleteItem,
  items,
}: InvestmentItemsProps) => {
  return (
    <Card>
      <CardHeader
        title="Investimentos"
        action={
          <Button color="primary" variant="outlined" onClick={onCreateItem}>
            Adicionar item
          </Button>
        }
      />
      <CardContent>
        <ResponsiveTable>
          <TableHead>
            <TableCellHeader>Nome</TableCellHeader>
            <TableCellHeader>Valor</TableCellHeader>
            <TableCellHeader align="right">Excluir</TableCellHeader>
          </TableHead>
          <TableBody>
            {!items.length && (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                  Nenhum valor adicionado
                </TableCell>
              </TableRow>
            )}
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatMoney(item.value)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteItem(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

export default InvestmentItems;
