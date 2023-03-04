import { styled, TableCell } from "@mui/material";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "14px",
  "&:first-of-type": {
    paddingLeft: "24px",
  },
  "&:last-of-type": {
    paddingRight: "24px",
  },
}));

export default TableCellHeader;
