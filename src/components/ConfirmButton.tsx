import {
  ConfirmButton as MacawConfirmButton,
  ConfirmButtonLabels,
  ConfirmButtonProps as MacawConfirmButtonProps,
} from "@saleor/macaw-ui";
import React from "react";

export interface ConfirmButtonProps
  extends Omit<MacawConfirmButtonProps, "labels"> {
  labels?: Partial<ConfirmButtonLabels>;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  labels = {},
  ...rest
}) => {
  const defaultLabels: ConfirmButtonLabels = {
    confirm: "Salvar",
    error: "Error",
  };
  const componentLabels: ConfirmButtonLabels = {
    ...defaultLabels,
    ...labels,
  };

  return <MacawConfirmButton labels={componentLabels} {...rest} />;
};
ConfirmButton.displayName = "ConfirmButton";
export default ConfirmButton;
