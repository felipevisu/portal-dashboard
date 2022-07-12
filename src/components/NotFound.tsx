import * as React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function NotFound() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="primary">
          404
        </Typography>
        <Typography variant="h5" color="primary">
          Página não encontrada
        </Typography>
      </Box>
    </Box>
  );
}
