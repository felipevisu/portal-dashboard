import { TableRow, TableRowTypeMap } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { isExternalURL } from "@portal/utils/urls";
import clsx from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type MaterialTableRowPropsType = TableRowTypeMap["props"];

export interface TableRowLinkProps
  extends Omit<MaterialTableRowPropsType, "onClick"> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  linkClassName?: string;
}

const useStyles = makeStyles(
  {
    link: {
      all: "inherit",
      display: "contents",
    },
  },
  { name: "TableRowLink" }
);

const TableRowLink = ({
  href,
  children,
  linkClassName,
  ...props
}: TableRowLinkProps) => {
  const classes = useStyles();

  if (!href || isExternalURL(href)) {
    return <TableRow {...props}>{children}</TableRow>;
  }

  return (
    <TableRow {...props}>
      <Link className={clsx(classes.link, linkClassName)} to={href}>
        {children}
      </Link>
    </TableRow>
  );
};

TableRowLink.displayName = "TableRowLink";
export default TableRowLink;
