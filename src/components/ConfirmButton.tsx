import React from "react";

export const ConfirmButton: React.FC<any> = ({ labels = {}, ...rest }) => {
  const defaultLabels: any = {
    confirm: "Salvar",
    error: "Error",
  };
  const componentLabels: any = {
    ...defaultLabels,
    ...labels,
  };

  return <span>Botões</span>;
};
ConfirmButton.displayName = "ConfirmButton";
export default ConfirmButton;
