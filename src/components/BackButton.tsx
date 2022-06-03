import { Button } from "./Button";
import { ButtonProps } from "@saleor/macaw-ui";
import React from "react";

const BackButton: React.FC<ButtonProps> = (props) => (
  <Button data-test-id="back" variant="secondary" color="text" {...props}>
    Voltar
  </Button>
);

BackButton.displayName = "BackButton";
export default BackButton;
