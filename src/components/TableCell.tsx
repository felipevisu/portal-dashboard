import { styled, TableCell } from "@mui/material";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "14px",
}));

export default TableCellHeader;
