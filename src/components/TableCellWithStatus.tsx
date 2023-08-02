import React from "react";

import { CheckCircle } from "@mui/icons-material";
import { TableCell } from "@mui/material";
import { Box } from "@mui/system";

type Labels = {
  published: string;
  unPublished: string;
};

interface TableCellWithStatusProps {
  status: boolean;
  labels?: Labels;
}

export const TableCellWithStatus = ({
  status,
  labels = { published: "Publicado", unPublished: "Despublicado" },
}: TableCellWithStatusProps) => {
  return (
    <TableCell>
      {status ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            color: "success.main",
            alignItems: "center",
          }}
        >
          <CheckCircle color="success" fontSize="small" />
          {labels.published}
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
          {labels.unPublished}
        </Box>
      )}
    </TableCell>
  );
};

export default TableCellWithStatus;
