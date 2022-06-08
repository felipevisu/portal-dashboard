import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
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
    },
  }),
  {
    name: "Container",
  }
);

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles(props);

  return <div className={classNames(classes.root, className)} {...rest} />;
};
Container.displayName = "Container";
export default Container;
