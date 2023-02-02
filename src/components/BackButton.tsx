import React from "react";
import { useTranslation } from "react-i18next";

import { ButtonProps } from "@mui/material";

import { Button } from "./Button";

const BackButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Button color="info" variant="outlined" {...props}>
      {t("back")}
    </Button>
  );
};

BackButton.displayName = "BackButton";
export default BackButton;
