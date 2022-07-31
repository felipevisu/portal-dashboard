import React from "react";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, styled } from "@mui/material";

import Container from "./Container";

interface SavebarProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  onDelete?: () => void;
  loading: boolean;
}

const Root = styled("div")(() => ({
  position: "sticky",
  height: "70px",
  left: 0,
  right: 0,
  bottom: 0,
}));

export const Savebar = ({
  onCancel,
  onSubmit,
  onDelete,
  loading,
}: SavebarProps) => {
  return (
    <Root>
      <Container>
        <Card
          sx={{ borderRadius: "8px 8px 0 0", paddingBottom: "0 !important" }}
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
      </Container>
    </Root>
  );
};
