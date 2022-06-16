import { Button, styled, Typography } from "@mui/material";
import React from "react";

const Header = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const FilterContentHeader = () => {
  return (
    <Header>
      <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
        Filtros
      </Typography>
      <Button size="small">Limpar</Button>
      <Button variant="contained" size="small">
        Aplicar
      </Button>
    </Header>
  );
};

export default FilterContentHeader;
