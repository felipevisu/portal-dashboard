import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader } from "@mui/material";

export const Channels = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t("channel.plural")} />
      <CardContent>{t("channel.createMessage")}</CardContent>
    </Card>
  );
};

export default Channels;
