import {
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  Typography,
  TableHeadProps as MuiTableHeadProps,
  styled,
} from "@mui/material";
import React from "react";

import { Node } from "../types";
import Checkbox from "./Checkbox";

const Container = styled("div")(() => ({
  alignItems: "center",
  display: "flex",
  padding: 0,
  height: "20px",
}));

const Spacer = styled("div")(() => ({ flex: 1 }));

const Toolbar = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

export interface TableHeadProps extends MuiTableHeadProps {
  colSpan: number;
  disabled: boolean;
  dragRows?: boolean;
  selected?: number;
  items: Node[];
  toolbar?: React.ReactNode | React.ReactNodeArray;
  toggleAll?: (items: Node[], selected: number) => void;
}

function getColSpan(colSpan: number, dragRows: boolean): number {
  if (dragRows) {
    return colSpan - 2;
  }
  return colSpan - 1;
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const {
    children,
    colSpan,
    disabled,
    dragRows,
    items,
    selected,
    toggleAll,
    toolbar,
    ...muiTableHeadProps
  } = props;

  return (
    <MuiTableHead {...muiTableHeadProps}>
      <TableRow>
        {dragRows && (items === undefined || items.length > 0) && <TableCell />}
        {(items === undefined || items.length > 0) && (
          <TableCell padding="checkbox" sx={{ height: 56 }}>
            <Checkbox
              indeterminate={items && items.length > selected && selected > 0}
              checked={selected !== 0}
              disabled={disabled}
              onChange={() => toggleAll(items, selected)}
            />
          </TableCell>
        )}
        {selected ? (
          <TableCell
            colSpan={getColSpan(colSpan, dragRows)}
            sx={{ height: 56 }}
          >
            <Container>
              {selected && (
                <Typography>{selected} items selecionados</Typography>
              )}
              <Spacer />
              {toolbar && <Toolbar>{toolbar}</Toolbar>}
            </Container>
          </TableCell>
        ) : (
          children
        )}
      </TableRow>
    </MuiTableHead>
  );
};

TableHead.displayName = "TableHead";
export default TableHead;
