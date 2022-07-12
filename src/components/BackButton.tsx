import React from "react";

import { ButtonProps } from "@mui/material";

import { Button } from "./Button";

const BackButton: React.FC<ButtonProps> = (props) => (
  <Button color="info" variant="outlined" {...props}>
    Voltar
  </Button>
);

BackButton.displayName = "BackButton";
export default BackButton;
