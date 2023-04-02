import React from "react";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";

export const DocumentPublicUpdatePage = () => {
  return (
    <Container>
      <Card>
        <CardHeader title="Atualização de Documento" />
        <CardContent></CardContent>
        <CardActions>
          <LoadingButton variant="contained">Enviar</LoadingButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default DocumentPublicUpdatePage;
