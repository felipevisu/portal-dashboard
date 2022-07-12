import React from "react";

import { styled } from "@mui/material";

const Spacer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

interface FormSpacerProps {
  children?: React.ReactNode;
}

export const FormSpacer: React.FC<FormSpacerProps> = (props) => {
  const { children } = props;

  return <Spacer>{children}</Spacer>;
};

FormSpacer.displayName = "FormSpacer";
export default FormSpacer;
