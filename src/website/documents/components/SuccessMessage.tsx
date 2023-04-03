import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, Container, Typography } from "@mui/material";

export const SuccessMessage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginY: 3 }}>
        <CardContent>
          <Typography fontWeight={700} fontSize={24} sx={{ marginBottom: 2 }}>
            {t("documentUpdate.success.title")}
          </Typography>
          <Typography fontWeight={700}>
            {t("documentUpdate.success.body1")}
          </Typography>
          <Typography>{t("documentUpdate.success.body2")}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SuccessMessage;
