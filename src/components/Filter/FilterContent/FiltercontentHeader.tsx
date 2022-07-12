import React from "react";

import { Button, styled, Typography } from "@mui/material";

const Header = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

interface FilterContentHeaderProps {
  onClickApply: () => void;
  onClickClear: () => void;
}

export const FilterContentHeader = ({
  onClickApply,
  onClickClear,
}: FilterContentHeaderProps) => {
  return (
    <Header>
      <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
        Filtros
      </Typography>
      <Button size="small" onClick={onClickClear}>
        Limpar
      </Button>
      <Button variant="contained" size="small" onClick={onClickApply}>
        Aplicar
      </Button>
    </Header>
  );
};

export default FilterContentHeader;
