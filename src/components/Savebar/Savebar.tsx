import React from "react";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, Portal, styled } from "@mui/material";

import { useSavebar } from "./context";

interface SavebarProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  onDelete?: () => void;
  loading: boolean;
}

export const Savebar = ({
  onCancel,
  onSubmit,
  onDelete,
  loading,
}: SavebarProps) => {
  const anchor = useSavebar();

  if (!anchor.current) {
    return null;
  }

  return (
    <Portal container={anchor.current}>
      <Card
        sx={{
          borderRadius: "8px 8px 0 0",
          paddingBottom: "0 !important",
          marginTop: 2,
        }}
      >
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {onDelete && (
              <Button variant="contained" color="error" onClick={onDelete}>
                Excluir
              </Button>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {onCancel && (
              <Button variant="outlined" color="info" onClick={onCancel}>
                Voltar
              </Button>
            )}
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={onSubmit}
            >
              Enviar
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Portal>
  );
};
