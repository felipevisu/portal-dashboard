import { styled } from "@mui/material";
import React from "react";

const ContainerDiv = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: theme.breakpoints.values.lg,
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 3),
  },
  padding: theme.spacing(0, 1),
  position: "relative",
}));

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = (props) => {
  const { className, ...rest } = props;

  return <ContainerDiv className={className} {...rest} />;
};
Container.displayName = "Container";
export default Container;
