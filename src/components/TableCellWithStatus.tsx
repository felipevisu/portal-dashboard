import React from "react";

import { CheckCircle } from "@mui/icons-material";
import { TableCell } from "@mui/material";
import { Box } from "@mui/system";

export const TableCellWithStatus = ({ status }: { status: boolean }) => {
  return (
    <TableCell>
      {status ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            color: "primary.main",
            alignItems: "center",
          }}
        >
          <CheckCircle color="primary" fontSize="small" />
          Publicado
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            color: "error.main",
            alignItems: "center",
          }}
        >
          <CheckCircle color="error" fontSize="small" />
          Despublicado
        </Box>
      )}
    </TableCell>
  );
};

export default TableCellWithStatus;
