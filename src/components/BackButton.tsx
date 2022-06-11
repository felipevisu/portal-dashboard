import { Button } from "./Button";
import { ButtonProps } from "@mui/material";
import React from "react";

const BackButton: React.FC<ButtonProps> = (props) => (
  <Button color="secondary" variant="contained" {...props}>
    Voltar
  </Button>
);

BackButton.displayName = "BackButton";
export default BackButton;
