import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";

import { Button } from "../Button";

export interface ChannelsAvailabilityWrapperProps {
  selectedChannelsCount: number;
  allChannelsCount: number;
  children: React.ReactNode;
  openModal: () => void;
}

export const ChannelsAvailabilityWrapper = ({
  selectedChannelsCount,
  allChannelsCount,
  children,
  openModal,
}: ChannelsAvailabilityWrapperProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader
        title="Anunciantes"
        action={
          <Button onClick={openModal} color="primary" variant="outlined">
            {t("manage")}
          </Button>
        }
      />
      <CardContent>
        <Typography>
          {t("channel.availability", {
            available: selectedChannelsCount,
            total: allChannelsCount,
          })}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
};

export default ChannelsAvailabilityWrapper;
