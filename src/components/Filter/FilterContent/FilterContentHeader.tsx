import React from "react";

import { styled, Typography } from "@mui/material";
import { Button } from "@portal/components/Button";

interface FilterContentHeaderProps {
  onClear: () => void;
}

const Root = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const FilterContentHeader = ({ onClear }: FilterContentHeaderProps) => {
  return (
    <Root>
      <Typography fontWeight={600} sx={{ flexGrow: 1 }}>
        Filtros
      </Typography>
      <Button size="small" onClick={onClear}>
        Limpar
      </Button>
      <Button variant="contained" size="small" type="submit">
        Aplicar
      </Button>
    </Root>
  );
};
